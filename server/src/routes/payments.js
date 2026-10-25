import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { PaymentIntent } from '../models/PaymentIntent.js';
import { buildOrderFromItems, createOrder } from '../services/orderService.js';
import { getRazorpay, isRazorpayEnabled, verifyRazorpaySignature } from '../utils/razorpayClient.js';

const router = Router();

router.get('/config', (_req, res) => {
  res.json({
    enabled: isRazorpayEnabled(),
    keyId: process.env.RAZORPAY_KEY_ID || '',
  });
});

router.post('/razorpay/prepare', authRequired, async (req, res) => {
  try {
    const razorpay = getRazorpay();
    if (!razorpay) {
      return res.status(503).json({ message: 'Razorpay is not configured on the server' });
    }

    const { items, shippingAddress, customerName, customerEmail, customerPhone } = req.body;
    const { subtotal, shipping, total } = await buildOrderFromItems(items);

    const receipt = `arc_${Date.now()}`;
    const rzOrder = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: 'INR',
      receipt,
    });

    const intent = await PaymentIntent.create({
      user: req.userId,
      items,
      shippingAddress,
      customerName,
      customerEmail,
      customerPhone,
      subtotal,
      shipping,
      total,
      razorpayOrderId: rzOrder.id,
    });

    res.json({
      intentId: intent._id,
      razorpayOrderId: rzOrder.id,
      amount: rzOrder.amount,
      currency: rzOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message || 'Failed to prepare payment' });
  }
});

router.post('/razorpay/verify', authRequired, async (req, res) => {
  try {
    const { intentId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    if (!verifyRazorpaySignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    })) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    const intent = await PaymentIntent.findOne({ _id: intentId, user: req.userId, status: 'pending' });
    if (!intent || intent.razorpayOrderId !== razorpayOrderId) {
      return res.status(404).json({ message: 'Payment session not found' });
    }

    const order = await createOrder({
      userId: req.userId,
      items: intent.items,
      shippingAddress: intent.shippingAddress,
      paymentMethod: 'razorpay',
      paymentStatus: 'paid',
      customerName: intent.customerName,
      customerEmail: intent.customerEmail,
      customerPhone: intent.customerPhone,
      razorpayOrderId,
      razorpayPaymentId,
    });

    intent.status = 'completed';
    await intent.save();

    res.json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Payment verification failed' });
  }
});

export default router;
