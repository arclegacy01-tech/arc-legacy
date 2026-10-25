import mongoose from 'mongoose';

const paymentIntentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ productId: String, quantity: Number }],
    shippingAddress: Object,
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    subtotal: Number,
    shipping: Number,
    total: Number,
    razorpayOrderId: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 30 * 60 * 1000) },
  },
  { timestamps: true }
);

export const PaymentIntent = mongoose.model('PaymentIntent', paymentIntentSchema);
