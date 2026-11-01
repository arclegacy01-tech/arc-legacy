import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/categories.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import userRoutes from './routes/users.js';
import contactRoutes from './routes/contact.js';
import cmsRoutes from './routes/cms.js';
import paymentRoutes from './routes/payments.js';
import wholesaleRoutes from './routes/wholesale.js';
import uploadRoutes from './routes/uploads.js';
import adminRoutes from './routes/admin.js';
import { ensureCategoriesAndSubcategories } from './utils/categorySeed.js';
import { ensureAdminBaselineData } from './utils/ensureAdminData.js';

let dataInitialized = false;

const app = express();

const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : 'http://localhost:5173';
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
const extraOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((o) => o.trim().replace(/\/$/, ''))
  .filter(Boolean);

const allowedOrigins = new Set([clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173', vercelUrl, ...extraOrigins].filter(Boolean));

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }
    // Allow any Vercel preview or production deployment domain
    if (/^https:\/\/([a-zA-Z0-9-]+\.)*vercel\.app$/.test(origin)) {
      callback(null, true);
      return;
    }
    callback(null, false);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '2mb' }));
app.use(morgan(process.env.VERCEL ? 'tiny' : 'dev'));

app.get(['/api/health', '/health'], async (req, res) => {
  const payload = { ok: true, service: 'arc-legacy-api' };
  if (!process.env.MONGODB_URI) {
    return res.status(503).json({ ...payload, ok: false, db: 'MONGODB_URI not set' });
  }
  try {
    await connectDB();
    res.json({ ...payload, db: 'connected' });
  } catch (err) {
    console.error('Health DB check failed:', err.message);
    res.status(503).json({ ...payload, ok: false, db: 'connection failed' });
  }
});

app.use(async (req, res, next) => {
  try {
    await connectDB();
    if (!dataInitialized) {
      dataInitialized = true;
      ensureCategoriesAndSubcategories().catch((e) => console.warn('Category sync:', e.message));
      ensureAdminBaselineData().catch((e) => console.warn('Admin data sync:', e.message));
    }
    next();
  } catch (err) {
    next(err);
  }
});

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/wholesale', wholesaleRoutes);
app.use('/api/uploads', uploadRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: process.env.VERCEL ? 'Server error' : err.message || 'Server error',
  });
});

export default app;
