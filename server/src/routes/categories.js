import { Router } from 'express';
import mongoose from 'mongoose';
import { Category } from '../models/Category.js';
import { Product } from '../models/Product.js';
import { MediaAsset } from '../models/MediaAsset.js';
import { authRequired, adminRequired } from '../middleware/auth.js';
import { slugify } from '../utils/slugify.js';
import { validateCategoryName } from '../utils/mediaOrganization.js';

const router = Router();

// GET /api/categories
router.get('/', async (req, res, next) => {
  try {
    const { mainOnly, parent, includeSubcategories } = req.query;
    const filter = { isActive: true };

    if (mainOnly === 'true' || parent === 'null' || parent === '') {
      filter.parent = null;
    } else if (parent) {
      if (mongoose.isValidObjectId(parent)) {
        filter.parent = parent;
      } else {
        const parentDoc = await Category.findOne({ slug: parent, isActive: true });
        if (parentDoc) {
          filter.parent = parentDoc._id;
        } else {
          return res.json({ categories: [] });
        }
      }
    }

    if (includeSubcategories === 'true') {
      // Return tree of main categories with subcategories attached
      const [mainCats, subCats] = await Promise.all([
        Category.find({ parent: null, isActive: true }).sort({ sortOrder: 1, name: 1 }).lean(),
        Category.find({ parent: { $ne: null }, isActive: true }).sort({ sortOrder: 1, name: 1 }).lean(),
      ]);

      const subMap = {};
      subCats.forEach((s) => {
        const pid = s.parent.toString();
        if (!subMap[pid]) subMap[pid] = [];
        subMap[pid].push(s);
      });

      const categories = mainCats.map((m) => ({
        ...m,
        subcategories: subMap[m._id.toString()] || [],
      }));

      return res.json({ categories });
    }

    const categories = await Category.find(filter)
      .populate('parent', 'name slug')
      .sort({ sortOrder: 1, name: 1 });

    res.json({ categories });
  } catch (err) {
    next(err);
  }
});

// GET /api/categories/main - convenience endpoint
router.get('/main', async (_req, res, next) => {
  try {
    const categories = await Category.find({ parent: null, isActive: true })
      .sort({ sortOrder: 1, name: 1 });
    res.json({ categories });
  } catch (err) {
    next(err);
  }
});

// GET /api/categories/manage (admin list)
router.get('/manage', authRequired, adminRequired, async (_req, res, next) => {
  try {
    const categories = await Category.find()
      .populate('parent', 'name slug')
      .sort({ sortOrder: 1, name: 1 });
    res.json({ categories });
  } catch (err) {
    next(err);
  }
});

// GET /api/categories/:idOrSlug/subcategories
router.get('/:idOrSlug/subcategories', async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    let category = null;

    if (mongoose.isValidObjectId(idOrSlug)) {
      category = await Category.findById(idOrSlug);
    }
    if (!category) {
      category = await Category.findOne({ slug: String(idOrSlug).toLowerCase(), isActive: { $ne: false } });
    }
    if (!category) {
      // Try case-insensitive name match
      category = await Category.findOne({
        name: new RegExp(`^${idOrSlug}$`, 'i'),
        parent: null,
      });
    }
    if (!category) {
      category = await Category.findOne({
        name: new RegExp(`^${idOrSlug}$`, 'i'),
      });
    }

    if (!category) {
      return res.status(404).json({ message: 'Category not found', subcategories: [] });
    }

    const subcategories = await Category.find({
      parent: category._id,
      isActive: { $ne: false },
    }).sort({ sortOrder: 1, name: 1 });

    res.json({
      category: {
        _id: category._id,
        name: category.name,
        slug: category.slug,
      },
      subcategories,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/categories
router.post('/', authRequired, adminRequired, async (req, res, next) => {
  try {
    const checked = validateCategoryName(req.body?.name);
    if (!checked.ok) return res.status(400).json({ message: checked.message });
    const slug = slugify(checked.name);
    if (!slug) return res.status(400).json({ message: 'Invalid category name' });
    const duplicate = await Category.findOne({ slug });
    if (duplicate) return res.status(409).json({ message: 'Category already exists' });

    let parentId = null;
    if (req.body.parent) {
      if (mongoose.isValidObjectId(req.body.parent)) {
        const parentDoc = await Category.findById(req.body.parent);
        if (parentDoc) parentId = parentDoc._id;
      } else {
        const parentDoc = await Category.findOne({ slug: req.body.parent });
        if (parentDoc) parentId = parentDoc._id;
      }
    }

    const last = await Category.findOne({ parent: parentId }).sort({ sortOrder: -1 }).select('sortOrder');
    const category = await Category.create({
      name: checked.name,
      slug,
      parent: parentId,
      sortOrder: (last?.sortOrder || 0) + 1,
      isActive: true,
    });
    res.status(201).json({ category });
  } catch (err) {
    if (err?.code === 11000) return res.status(409).json({ message: 'Category already exists' });
    next(err);
  }
});

// PATCH /api/categories/:id
router.patch('/:id', authRequired, adminRequired, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const updateData = {};
    if (req.body.name) {
      const checked = validateCategoryName(req.body.name);
      if (!checked.ok) return res.status(400).json({ message: checked.message });
      const slug = slugify(checked.name);
      if (!slug) return res.status(400).json({ message: 'Invalid category name' });
      const duplicate = await Category.findOne({ slug, _id: { $ne: req.params.id } });
      if (duplicate) return res.status(409).json({ message: 'Category already exists' });
      updateData.name = checked.name;
      updateData.slug = slug;
    }

    if (req.body.parent !== undefined) {
      if (!req.body.parent || req.body.parent === 'null') {
        updateData.parent = null;
      } else if (mongoose.isValidObjectId(req.body.parent)) {
        updateData.parent = req.body.parent;
      }
    }

    if (req.body.sortOrder !== undefined) {
      updateData.sortOrder = Number(req.body.sortOrder);
    }
    if (req.body.isActive !== undefined) {
      updateData.isActive = Boolean(req.body.isActive);
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ category });
  } catch (err) {
    if (err?.code === 11000) return res.status(409).json({ message: 'Category already exists' });
    next(err);
  }
});

// DELETE /api/categories/:id
router.delete('/:id', authRequired, adminRequired, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const [products, subcategories, media] = await Promise.all([
      Product.countDocuments({ $or: [{ category: req.params.id }, { subCategory: req.params.id }] }),
      Category.countDocuments({ parent: req.params.id }),
      MediaAsset.countDocuments({ category: req.params.id }),
    ]);
    if (products || media || subcategories) {
      return res.status(409).json({
        message: 'Cannot delete: products, subcategories, or media are linked to this category.',
      });
    }
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// GET /api/categories/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true })
      .populate('parent', 'name slug');
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ category });
  } catch (err) {
    next(err);
  }
});

export default router;
