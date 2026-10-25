import mongoose from 'mongoose';

const wholesaleEnquirySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    contactName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    city: String,
    businessType: String,
    productInterest: String,
    quantity: String,
    message: String,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productTitle: String,
    status: { type: String, enum: ['new', 'contacted', 'quoted', 'closed'], default: 'new' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const WholesaleEnquiry = mongoose.model('WholesaleEnquiry', wholesaleEnquirySchema);
