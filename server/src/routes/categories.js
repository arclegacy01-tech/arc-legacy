import { Router } from 'express';
import mongoose from 'mongoose';
import { Category } from '../models/Category.js';
import { Product } from '../models/Product.js';
import { MediaAsset } from '../models/MediaAsset.js';
import { authRequired, adminRequired } from '../middleware/auth.js';
import { slugify } from '../utils/slugify.js';
import { validateCategoryName } from '../utils/mediaOrganization.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1, name: 1 });
    res.json({ categories });
  } catch (err) {
    next(err);
  }
});

router.get('/manage', authRequired, adminRequired, async (_req, res, next) => {
  try {
    const categories = await Category.find().sort({ sortOrder: 1, name: 1 });
    res.json({ categories });
  } catch (err) {
    next(err);
  }
});

router.post('/', authRequired, adminRequired, async (req, res, next) => {
  try {
    const checked = validateCategoryName(req.body?.name);
    if (!checked.ok) return res.status(400).json({ message: checked.message });
    const slug = slugify(checked.name);
    if (!slug) return res.status(400).json({ message: 'Invalid category name' });
    const duplicate = await Category.findOne({ slug });
    if (duplicate) return res.status(409).json({ message: 'Category already exists' });
    const last = await Category.findOne().sort({ sortOrder: -1 }).select('sortOrder');
    const category = await Category.create({
      name: checked.name,
      slug,
      sortOrder: (last?.sortOrder || 0) + 1,
      isActive: true,
    });
    res.status(201).json({ category });
  } catch (err) {
    if (err?.code === 11000) return res.status(409).json({ message: 'Category already exists' });
    next(err);
  }
});

router.patch('/:id', authRequired, adminRequired, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const checked = validateCategoryName(req.body?.name);
    if (!checked.ok) return res.status(400).json({ message: checked.message });
    const slug = slugify(checked.name);
    if (!slug) return res.status(400).json({ message: 'Invalid category name' });
    const duplicate = await Category.findOne({ slug, _id: { $ne: req.params.id } });
    if (duplicate) return res.status(409).json({ message: 'Category already exists' });
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: checked.name, slug },
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ category });
  } catch (err) {
    if (err?.code === 11000) return res.status(409).json({ message: 'Category already exists' });
    next(err);
  }
});

router.delete('/:id', authRequired, adminRequired, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const [products, media] = await Promise.all([
      Product.countDocuments({ category: req.params.id }),
      MediaAsset.countDocuments({ category: req.params.id }),
    ]);
    if (products || media) {
      return res.status(409).json({ message: 'Remove products and media in this category before deleting it' });
    }
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ category });
  } catch (err) {
    next(err);
  }
});

export default router;
