import { Router } from 'express';
import { Banner } from '../models/Banner.js';
import { Announcement } from '../models/Announcement.js';
import { Faq } from '../models/Faq.js';
import { HomepageSection } from '../models/HomepageSection.js';
import { BlogPost } from '../models/BlogPost.js';
import { authRequired, adminRequired } from '../middleware/auth.js';
import { publishedContentFilter, activeAnnouncementFilter } from '../utils/cmsPublish.js';
import { slugify } from '../utils/slugify.js';

const router = Router();

// ——— Public ———
router.get('/public/homepage', async (_req, res) => {
  const now = new Date();
  const heroFilter = {
    placement: 'homepage-hero',
    status: 'published',
    $or: [{ publishAt: null }, { publishAt: { $exists: false } }, { publishAt: { $lte: now } }],
  };
  const [heroBanners, promoBanners, announcements, sections] = await Promise.all([
    Banner.find(heroFilter).sort({ sortOrder: 1 }),
    Banner.find({ placement: 'homepage-promo', ...publishedContentFilter() }).sort({ sortOrder: 1 }),
    Announcement.find(activeAnnouncementFilter()).sort({ sortOrder: 1 }),
    HomepageSection.find({ enabled: true }),
  ]);
  const sectionMap = {};
  sections.forEach((s) => {
    sectionMap[s.key] = s;
  });
  res.json({
    heroBanners,
    promoBanner: promoBanners[0] || null,
    announcements,
    sections: sectionMap,
  });
});

router.get('/public/announcements', async (_req, res) => {
  const items = await Announcement.find(activeAnnouncementFilter()).sort({ sortOrder: 1 });
  res.json({ announcements: items });
});

router.get('/public/faqs', async (_req, res) => {
  const faqs = await Faq.find({ status: 'published' }).sort({ sortOrder: 1 });
  res.json({ faqs });
});

router.get('/public/blogs', async (_req, res) => {
  const posts = await BlogPost.find({ status: 'published' }).sort({ publishedAt: -1 }).limit(20);
  res.json({ posts });
});

router.get('/public/blogs/:slug', async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug, status: 'published' });
  if (!post) return res.status(404).json({ message: 'Article not found' });
  res.json({ post });
});

// ——— Admin helpers ———
const admin = [authRequired, adminRequired];

async function crudList(Model, sort, res) {
  const items = await Model.find().sort(sort);
  res.json({ items });
}

// Banners
router.get('/banners', ...admin, (req, res) => crudList(Banner, { sortOrder: 1 }, res));
router.post('/banners', ...admin, async (req, res) => {
  const item = await Banner.create(req.body);
  res.status(201).json({ item });
});
router.put('/banners/:id', ...admin, async (req, res) => {
  const item = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ item });
});
router.delete('/banners/:id', ...admin, async (req, res) => {
  await Banner.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// Announcements
router.get('/announcements', ...admin, (req, res) => crudList(Announcement, { sortOrder: 1 }, res));
router.post('/announcements', ...admin, async (req, res) => {
  const item = await Announcement.create(req.body);
  res.status(201).json({ item });
});
router.put('/announcements/:id', ...admin, async (req, res) => {
  const item = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ item });
});
router.delete('/announcements/:id', ...admin, async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// FAQs
router.get('/faqs', ...admin, (req, res) => crudList(Faq, { sortOrder: 1 }, res));
router.post('/faqs', ...admin, async (req, res) => {
  const item = await Faq.create(req.body);
  res.status(201).json({ item });
});
router.put('/faqs/:id', ...admin, async (req, res) => {
  const item = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ item });
});
router.delete('/faqs/:id', ...admin, async (req, res) => {
  await Faq.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// Homepage sections
router.get('/homepage-sections', ...admin, async (_req, res) => {
  const items = await HomepageSection.find().sort({ key: 1 });
  res.json({ items });
});
router.put('/homepage-sections/:key', ...admin, async (req, res) => {
  const item = await HomepageSection.findOneAndUpdate(
    { key: req.params.key },
    req.body,
    { new: true, upsert: true, runValidators: true }
  );
  res.json({ item });
});

// Blogs
router.get('/blogs', ...admin, (req, res) => crudList(BlogPost, { createdAt: -1 }, res));
router.post('/blogs', ...admin, async (req, res) => {
  const data = req.body;
  if (!data.slug) data.slug = slugify(data.title);
  const item = await BlogPost.create(data);
  res.status(201).json({ item });
});
router.put('/blogs/:id', ...admin, async (req, res) => {
  const item = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ item });
});
router.delete('/blogs/:id', ...admin, async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// Content stats for admin dashboard
router.get('/stats', ...admin, async (_req, res) => {
  const [banners, announcements, faqs, blogs, publishedBanners] = await Promise.all([
    Banner.countDocuments(),
    Announcement.countDocuments(),
    Faq.countDocuments(),
    BlogPost.countDocuments(),
    Banner.countDocuments({ status: 'published' }),
  ]);
  res.json({
    total: banners + announcements + faqs + blogs,
    published: publishedBanners + (await Announcement.countDocuments({ status: 'published' })),
    banners,
    faqs,
    blogs,
  });
});

export default router;
