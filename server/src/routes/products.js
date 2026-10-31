import { Router } from 'express';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import { authRequired, adminRequired } from '../middleware/auth.js';
import { slugify } from '../utils/slugify.js';

const router = Router();

function buildProductFilter(query) {
  const filter = { isActive: true };
  const {
    category,
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

    const [products, total] = await Promise.all([
      Product.find(filter).populate('category', 'name slug').sort(sort).skip(skip).limit(limit),
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
  const product = await Product.findOne({ slug: req.params.slug, isActive: true }).populate(
    'category',
    'name slug'
  );
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ product });
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name slug');
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ product });
});

// Admin
router.post('/', authRequired, adminRequired, async (req, res) => {
  try {
    const data = req.body;
    if (!data.title || !data.price || !data.category) {
      return res.status(400).json({ message: 'Title, price, and category are required' });
    }
    const slug = data.slug || slugify(data.title);
    const product = await Product.create({ ...data, slug });
    res.status(201).json({ product });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(409).json({ message: 'Slug already exists' });
    res.status(500).json({ message: 'Failed to create product' });
  }
});

router.put('/:id', authRequired, adminRequired, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

router.delete('/:id', authRequired, adminRequired, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ product });
});

export default router;
