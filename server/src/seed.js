import 'dotenv/config';
import { connectDB } from './config/db.js';
import { User } from './models/User.js';
import { Category } from './models/Category.js';
import { Product } from './models/Product.js';
import { Order } from './models/Order.js';
import { slugify } from './utils/slugify.js';
import { seedCms } from './seedCms.js';

const categories = [
  { name: 'Laces', slug: 'laces', sortOrder: 1 },
  { name: 'Latkans', slug: 'latkans', sortOrder: 2 },
  { name: 'Trims & Borders', slug: 'trims-borders', sortOrder: 3 },
  { name: 'Pom Pom Trims', slug: 'pom-pom-trims', sortOrder: 4 },
  { name: 'Gota Patti', slug: 'gota-patti', sortOrder: 5 },
  { name: 'Embellishments', slug: 'embellishments', sortOrder: 6 },
];

const sampleProducts = [
  {
    title: 'Silver Hanging Latkan Trim',
    categorySlug: 'latkans',
    price: 350,
    comparePrice: 420,
    unit: 'pair',
    material: ['Metal', 'Beads'],
    colors: ['Silver'],
    styles: ['Bridal'],
    isFeatured: true,
    isNewArrival: true,
    image: '/images/product-1.jpg',
  },
  {
    title: 'Pearl Beaded Gold Lace',
    categorySlug: 'laces',
    price: 320,
    comparePrice: 399,
    unit: 'meter',
    material: ['Pearl', 'Thread'],
    colors: ['Gold'],
    styles: ['Traditional'],
    isFeatured: true,
    image: '/images/product-2.jpg',
  },
  {
    title: 'Floral Zari Border Trim',
    categorySlug: 'trims-borders',
    price: 350,
    unit: 'meter',
    material: ['Fabric', 'Thread'],
    colors: ['Gold', 'Red'],
    styles: ['Traditional'],
    image: '/images/product-3.jpg',
  },
  {
    title: 'Pom Pom Trim Multicolor',
    categorySlug: 'pom-pom-trims',
    price: 290,
    unit: 'meter',
    material: ['Fabric'],
    colors: ['Multicolor'],
    styles: ['Contemporary'],
    isNewArrival: true,
    image: '/images/product-4.jpg',
  },
  {
    title: 'Designer Gold Latkan Trim',
    categorySlug: 'latkans',
    price: 420,
    unit: 'pair',
    material: ['Metal', 'Fabric'],
    colors: ['Gold'],
    styles: ['Designer'],
    image: '/images/product-5.jpg',
  },
  {
    title: 'Gota Patti Embroidered Lace',
    categorySlug: 'gota-patti',
    price: 280,
    unit: 'meter',
    material: ['Fabric'],
    colors: ['Gold'],
    styles: ['Traditional'],
    isFeatured: true,
    image: '/images/product-6.jpg',
  },
  {
    title: 'Mirror Work Gold Lace',
    categorySlug: 'laces',
    price: 380,
    unit: 'meter',
    material: ['Mirror Work', 'Thread'],
    colors: ['Gold'],
    styles: ['Bridal'],
    image: '/images/product-7.jpg',
  },
  {
    title: 'Red Bridal Fabric Latkan',
    categorySlug: 'latkans',
    price: 220,
    unit: 'pair',
    material: ['Fabric', 'Beads'],
    colors: ['Red'],
    styles: ['Bridal'],
    stock: 8,
    image: '/images/product-8.jpg',
  },
  {
    title: 'Kundan Latkan Set',
    categorySlug: 'embellishments',
    price: 450,
    unit: 'pair',
    material: ['Metal', 'Beads'],
    colors: ['Gold'],
    styles: ['Designer'],
    image: '/images/product-9.jpg',
  },
  {
    title: 'Golden Zari Lace Trim',
    categorySlug: 'laces',
    price: 180,
    comparePrice: 250,
    unit: 'meter',
    material: ['Thread'],
    colors: ['Gold'],
    styles: ['Traditional'],
    sku: 'GT-1023',
    image: '/images/product-10.jpg',
  },
  {
    title: 'Beaded Tassel Latkan',
    categorySlug: 'latkans',
    price: 310,
    unit: 'pair',
    material: ['Beads', 'Thread'],
    colors: ['Rose Gold'],
    styles: ['Tassel'],
    image: '/images/product-11.jpg',
  },
  {
    title: 'Embroidered Gota Border',
    categorySlug: 'gota-patti',
    price: 240,
    unit: 'meter',
    material: ['Fabric'],
    colors: ['Antique Gold'],
    styles: ['Traditional'],
    image: '/images/product-12.jpg',
  },
];

async function seed() {
  await connectDB();

  await Promise.all([Order.deleteMany({}), Product.deleteMany({}), Category.deleteMany({})]);

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@arclegacy.in';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin@12345';

  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({
      name: 'ARC Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
      phone: '+91 98765 43210',
    });
    console.log('Created admin:', adminEmail);
  } else {
    admin.role = 'admin';
    await admin.save();
    console.log('Admin exists:', adminEmail);
  }

  const categoryMap = {};
  for (const c of categories) {
    const doc = await Category.create(c);
    categoryMap[c.slug] = doc._id;
  }
  console.log('Categories seeded');

  for (const p of sampleProducts) {
    const slug = slugify(p.title);
    await Product.create({
      title: p.title,
      slug,
      sku: p.sku,
      category: categoryMap[p.categorySlug],
      shortDescription: `Premium ${p.title.toLowerCase()} from ARC LEGACY.`,
      description: `<p>Handcrafted trim for ethnic wear, home décor, and boutique collections.</p>`,
      images: [{ url: p.image, isMain: true }],
      price: p.price,
      comparePrice: p.comparePrice,
      unit: p.unit,
      stock: p.stock ?? 42,
      material: p.material,
      colors: p.colors,
      styles: p.styles,
      rating: 4.6 + Math.random() * 0.3,
      reviewCount: Math.floor(20 + Math.random() * 80),
      isFeatured: Boolean(p.isFeatured),
      isNewArrival: Boolean(p.isNewArrival),
      isActive: true,
    });
  }
  console.log('Products seeded:', sampleProducts.length);
  await seedCms();
  console.log('Done.');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
