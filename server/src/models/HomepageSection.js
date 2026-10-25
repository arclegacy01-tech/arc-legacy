import mongoose from 'mongoose';

const homepageSectionSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      enum: ['hero-fallback', 'promo-banner', 'story-teaser'],
    },
    title: String,
    subtitle: String,
    body: String,
    imageUrl: String,
    ctaLabel: String,
    ctaLink: String,
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const HomepageSection = mongoose.model('HomepageSection', homepageSectionSchema);
