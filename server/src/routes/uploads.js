import { Router } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { authRequired, adminRequired } from '../middleware/auth.js';

const router = Router();

function configureCloudinary() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return false;
  }
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  return true;
}

router.get('/config', authRequired, adminRequired, (_req, res) => {
  const enabled = configureCloudinary();
  if (!enabled) {
    return res.json({ enabled: false });
  }
  res.json({
    enabled: true,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder: process.env.CLOUDINARY_FOLDER || 'arc-legacy',
  });
});

router.post('/sign', authRequired, adminRequired, (req, res) => {
  if (!configureCloudinary()) {
    return res.status(503).json({ message: 'Cloudinary is not configured' });
  }
  const folder = process.env.CLOUDINARY_FOLDER || 'arc-legacy';
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = { timestamp, folder };
  const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);
  res.json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    folder,
  });
});

export default router;
