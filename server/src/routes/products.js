import { Router } from 'express';
import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import { authRequired, adminRequired } from '../middleware/auth.js';
import { slugify } from '../utils/slugify.js';

const router = Router();

function buildProductFilter(query) {
  const filter = { isActive: true };
  const {
    category,
    subCategory,
    q,
    minPrice,
    maxPrice,
    material,
    color,
    style,
    inStock,
    featured,
    newArrivals,
  } = query;

  if (category) filter.category = category;
  if (subCategory) filter.subCategory = subCategory;
  if (featured === 'true') filter.isFeatured = true;
  if (newArrivals === 'true') filter.isNewArrival = true;
  if (inStock === 'true') filter.stock = { $gt: 0 };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  if (material) {
    const list = String(material).split(',').map((s) => s.trim());
    filter.material = { $in: list };
  }
  if (color) {
    const list = String(color).split(',').map((s) => s.trim());
    filter.colors = { $in: list };
  }
  if (style) {
    const list = String(style).split(',').map((s) => s.trim());
    filter.styles = { $in: list };
  }
  if (q) {
    filter.$text = { $search: q };
  }
  return filter;
}

// Helper to resolve Category ID from ID, slug, or name
async function resolveCategoryDoc(val, isSub = false, parentId = null) {
  if (!val) return null;
  if (mongoose.isValidObjectId(val)) {
    const doc = await Category.findById(val);
    if (doc) return doc;
  }
  let query = { slug: String(val).toLowerCase(), isActive: { $ne: false } };
  if (parentId) query.parent = parentId;
  let doc = await Category.findOne(query);
  if (!doc) {
    query = { name: new RegExp(`^${val}$`, 'i'), isActive: { $ne: false } };
    if (parentId) query.parent = parentId;
    doc = await Category.findOne(query);
  }
  return doc;
}

router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(48, Math.max(1, Number(req.query.limit) || 12));
    const skip = (page - 1) * limit;
    const sort = req.query.sort === 'price-asc'
      ? { price: 1 }
      : req.query.sort === 'price-desc'
        ? { price: -1 }
        : req.query.sort === 'featured'
          ? { isFeatured: -1, createdAt: -1 }
          : { createdAt: -1 };

    let filter = buildProductFilter(req.query);

    if (req.query.categorySlug) {
      const cat = await Category.findOne({ slug: req.query.categorySlug });
      if (!cat) return res.json({ products: [], pagination: { page, limit, total: 0, pages: 0 } });
      filter = { ...filter, category: cat._id };
      delete filter.$text;
      if (req.query.q) {
        filter.$or = [
          { title: new RegExp(req.query.q, 'i') },
          { shortDescription: new RegExp(req.query.q, 'i') },
        ];
      }
    } else if (req.query.q && !filter.$text) {
      filter.$or = [
        { title: new RegExp(req.query.q, 'i') },
        { shortDescription: new RegExp(req.query.q, 'i') },
      ];
    }

    if (req.query.subCategorySlug) {
      const subCat = await Category.findOne({ slug: req.query.subCategorySlug });
      if (subCat) filter.subCategory = subCat._id;
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug image')
        .populate('subCategory', 'name slug image')
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter),
    ]);

    res.json({
      products,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

router.get('/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true })
      .populate('category', 'name slug image')
      .populate('subCategory', 'name slug image');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug image')
      .populate('subCategory', 'name slug image');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

// Admin Create Product
router.post('/', authRequired, adminRequired, async (req, res) => {
  try {
    const data = req.body;
    if (!data.title || data.price === undefined || !data.category) {
      return res.status(400).json({ message: 'Title, price, and category are required' });
    }

    // Resolve Category
    const categoryDoc = await resolveCategoryDoc(data.category);
    if (!categoryDoc) {
      return res.status(400).json({ message: 'Valid category is required' });
    }

    // Resolve and validate Subcategory if provided
    let subCategoryDoc = null;
    if (data.subCategory) {
      subCategoryDoc = await resolveCategoryDoc(data.subCategory, true, categoryDoc._id);
      if (!subCategoryDoc) {
        return res.status(400).json({
          message: 'The selected subcategory does not belong to the selected category.',
        });
      }
      if (
        !subCategoryDoc.parent ||
        subCategoryDoc.parent.toString() !== categoryDoc._id.toString()
      ) {
        return res.status(400).json({
          message: 'The selected subcategory does not belong to the selected category.',
        });
      }
    }

    const slug = data.slug ? slugify(data.slug) : slugify(data.title);
    const existing = await Product.findOne({ slug });
    const finalSlug = existing ? `${slug}-${Date.now().toString(36)}` : slug;

    const product = await Product.create({
      ...data,
      slug: finalSlug,
      category: categoryDoc._id,
      subCategory: subCategoryDoc ? subCategoryDoc._id : null,
    });

    const populated = await Product.findById(product._id)
      .populate('category', 'name slug image')
      .populate('subCategory', 'name slug image');

    res.status(201).json({ product: populated });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(409).json({ message: 'Slug already exists' });
    res.status(500).json({ message: 'Failed to create product' });
  }
});

// Admin Update Product
router.put('/:id', authRequired, adminRequired, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) return res.status(404).json({ message: 'Product not found' });

    const data = { ...req.body };

    // Resolve Category if updated or existing
    const categoryVal = data.category || existingProduct.category;
    const categoryDoc = await resolveCategoryDoc(categoryVal);
    if (!categoryDoc) {
      return res.status(400).json({ message: 'Valid category is required' });
    }
    data.category = categoryDoc._id;

    // Validate Subcategory if provided
    if (data.subCategory !== undefined) {
      if (!data.subCategory || data.subCategory === 'null' || data.subCategory === '') {
        data.subCategory = null;
      } else {
        const subCategoryDoc = await resolveCategoryDoc(data.subCategory, true, categoryDoc._id);
        if (
          !subCategoryDoc ||
          !subCategoryDoc.parent ||
          subCategoryDoc.parent.toString() !== categoryDoc._id.toString()
        ) {
          return res.status(400).json({
            message: 'The selected subcategory does not belong to the selected category.',
          });
        }
        data.subCategory = subCategoryDoc._id;
      }
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    })
      .populate('category', 'name slug image')
      .populate('subCategory', 'name slug image');

    res.json({ product: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

router.delete('/:id', authRequired, adminRequired, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

export default router;
