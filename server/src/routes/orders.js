import { Router } from 'express';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { authRequired, adminRequired } from '../middleware/auth.js';
import { createOrder } from '../services/orderService.js';
import { broadcastAdminEvent } from '../utils/realtime.js';

const router = Router();

// Place order
router.post('/', async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, customerName, customerPhone, customerEmail } = req.body;
    const order = await createOrder({
      userId: req.userId || undefined,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: paymentMethod === 'paid' ? 'paid' : 'pending',
      customerName,
      customerEmail,
      customerPhone,
    });

    // Real-time broadcast
    broadcastAdminEvent('order_created', {
      orderId: order._id,
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      total: order.total,
    });
    broadcastAdminEvent('inventory_updated', { reason: 'order_placed' });

    res.status(201).json({ order });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message || 'Failed to place order' });
  }
});

router.get('/track', async (req, res) => {
  const { orderNumber, email } = req.query;
  if (!orderNumber || !email) {
    return res.status(400).json({ message: 'Order number and email are required' });
  }
  const order = await Order.findOne({
    orderNumber: String(orderNumber).trim(),
    customerEmail: String(email).trim().toLowerCase(),
  });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json({ order });
});

router.get('/my', authRequired, async (req, res) => {
  const status = req.query.status;
  const filter = { user: req.userId };
  if (status) filter.status = status;
  const orders = await Order.find(filter).sort({ createdAt: -1 });
  res.json({ orders });
});

router.get('/my/:id', authRequired, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.userId });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json({ order });
});

router.patch('/my/:id/cancel', authRequired, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.userId });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (!['pending', 'processing'].includes(order.status)) {
    return res.status(400).json({ message: 'This order cannot be cancelled' });
  }

  // Restore inventory
  for (const item of order.items || []) {
    if (item.product) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity || 1 } });
    }
  }

  order.status = 'cancelled';
  await order.save();

  broadcastAdminEvent('order_updated', { orderId: order._id, status: 'cancelled' });
  broadcastAdminEvent('inventory_updated', { reason: 'order_cancelled' });

  res.json({ order });
});

// Admin orders endpoint with real filtering
router.get('/', async (req, res) => {
  try {
    const { status, q } = req.query;
    const filter = {};

    if (status && status !== 'All Status' && status !== 'all') {
      filter.status = status.toLowerCase();
    }

    if (q) {
      filter.$or = [
        { orderNumber: new RegExp(q, 'i') },
        { customerName: new RegExp(q, 'i') },
        { customerEmail: new RegExp(q, 'i') },
        { customerPhone: new RegExp(q, 'i') },
      ];
    }

    const orders = await Order.find(filter)
      .populate('user', 'name email phone')
      .populate('items.product', 'title images price sku')
      .sort({ createdAt: -1 })
      .limit(200);

    // Compute breakdown metrics
    const allOrders = await Order.find().select('status total paymentStatus').lean();
    let totalRevenue = 0;
    const counts = {
      all: allOrders.length,
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
      returns: 0,
    };

    allOrders.forEach((o) => {
      const s = (o.status || 'pending').toLowerCase();
      if (counts[s] !== undefined) counts[s]++;
      if (s !== 'cancelled' && (o.paymentStatus === 'paid' || s === 'delivered')) {
        totalRevenue += Number(o.total || 0);
      }
    });

    res.json({ orders, counts, totalRevenue });
  } catch (err) {
    console.error('[Admin Orders GET]', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Admin order status update
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const prevStatus = order.status;
    order.status = status;

    // Handle stock restoration if cancelled
    if (status === 'cancelled' && prevStatus !== 'cancelled') {
      for (const item of order.items || []) {
        if (item.product) {
          await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity || 1 } });
        }
      }
      broadcastAdminEvent('inventory_updated', { reason: 'order_cancelled' });
    }

    // Mark paid if delivered
    if (status === 'delivered') {
      order.paymentStatus = 'paid';
    }

    await order.save();

    broadcastAdminEvent('order_updated', {
      orderId: order._id,
      orderNumber: order.orderNumber,
      status: order.status,
      paymentStatus: order.paymentStatus,
    });

    res.json({ order });
  } catch (err) {
    console.error('[Admin Order Status PATCH]', err);
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

export default router;
