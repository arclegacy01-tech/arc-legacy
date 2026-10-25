import mongoose from 'mongoose';

const variationSchema = new mongoose.Schema(
  {
    name: String,
    sku: String,
    attributes: {
      width: String,
      color: String,
    },
    price: Number,
    comparePrice: Number,
    stock: { type: Number, default: 0 },
    image: String,
    isActive: { type: Boolean, default: true },
  },
  { _id: true }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    sku: { type: String, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    shortDescription: String,
    description: String,
    images: [{ url: String, isMain: { type: Boolean, default: false } }],
    price: { type: Number, required: true },
    comparePrice: Number,
    costPrice: Number,
    unit: { type: String, enum: ['meter', 'pair', 'piece', 'pack'], default: 'meter' },
    stock: { type: Number, default: 0 },
    lowStockAlert: { type: Number, default: 10 },
    trackStock: { type: Boolean, default: true },
    material: [String],
    colors: [String],
    styles: [String],
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    variations: [variationSchema],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    metaTitle: String,
    metaDescription: String,
  },
  { timestamps: true }
);

productSchema.index({ title: 'text', shortDescription: 'text' });
productSchema.index({ category: 1, isActive: 1 });

export const Product = mongoose.model('Product', productSchema);
