import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: String,
    imageUrl: { type: String, required: true },
    ctaLabel: { type: String, default: 'Shop Now' },
    ctaLink: { type: String, default: '/' },
    placement: {
      type: String,
      enum: ['homepage-hero', 'homepage-promo', 'wholesale'],
      default: 'homepage-hero',
    },
    sortOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published', 'scheduled'], default: 'draft' },
    publishAt: Date,
  },
  { timestamps: true }
);

export const Banner = mongoose.model('Banner', bannerSchema);
