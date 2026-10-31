import mongoose from 'mongoose';

const mediaAssetSchema = new mongoose.Schema(
  {
    publicId: { type: String, required: true, unique: true, trim: true },
    secureUrl: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    folder: { type: String, required: true },
    tag: { type: String, required: true },
    format: { type: String, required: true },
    bytes: { type: Number, required: true },
    resourceType: { type: String, default: 'image' },
  },
  { timestamps: true }
);

export const MediaAsset = mongoose.model('MediaAsset', mediaAssetSchema);
