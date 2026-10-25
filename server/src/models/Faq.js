import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    category: { type: String, default: 'General' },
    sortOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
);

export const Faq = mongoose.model('Faq', faqSchema);
