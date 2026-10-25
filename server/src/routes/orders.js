import { Router } from 'express';
import { Order } from '../models/Order.js';
import { authRequired, adminRequired } from '../middleware/auth.js';
import { createOrder } from '../services/orderService.js';

const router = Router();

router.post('/', authRequired, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, customerName, customerPhone, customerEmail } = req.body;
    const order = await createOrder({
      userId: req.userId,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: paymentMethod === 'paid' ? 'paid' : 'pending',
      customerName,
      customerEmail,
      customerPhone,
    });
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
  order.status = 'cancelled';
  await order.save();
  res.json({ order });
});

router.get('/', authRequired, adminRequired, async (req, res) => {
  const status = req.query.status;
  const filter = status ? { status } : {};
  const orders = await Order.find(filter).sort({ createdAt: -1 }).limit(200);
  res.json({ orders });
});

router.patch('/:id/status', authRequired, adminRequired, async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json({ order });
});

export default router;
