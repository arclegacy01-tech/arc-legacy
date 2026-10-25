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

const app = express();

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
const extraOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const allowedOrigins = [clientUrl, 'http://localhost:5173', vercelUrl, ...extraOrigins].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(morgan(process.env.VERCEL ? 'tiny' : 'dev'));

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'arc-legacy-api' });
});

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

export default app;
