import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: String,
    content: String,
    coverImage: String,
    author: { type: String, default: 'ARC LEGACY' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: Date,
  },
  { timestamps: true }
);

export const BlogPost = mongoose.model('BlogPost', blogPostSchema);
