import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    title: String,
    image: String,
    unit: String,
    price: Number,
    quantity: { type: Number, required: true, min: 1 },
    variationId: mongoose.Schema.Types.ObjectId,
    variationLabel: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    items: [orderItemSchema],
    subtotal: Number,
    shipping: { type: Number, default: 0 },
    total: Number,
    paymentMethod: { type: String, enum: ['paid', 'cod', 'razorpay'], default: 'cod' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: {
      fullName: String,
      phone: String,
      line1: String,
      line2: String,
      city: String,
      state: String,
      pincode: String,
    },
    notes: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);
