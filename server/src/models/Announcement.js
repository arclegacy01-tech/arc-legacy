import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    linkUrl: String,
    placement: { type: String, enum: ['top-bar'], default: 'top-bar' },
    sortOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    startAt: Date,
    endAt: Date,
  },
  { timestamps: true }
);

export const Announcement = mongoose.model('Announcement', announcementSchema);
