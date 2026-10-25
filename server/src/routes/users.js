import { Router } from 'express';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';
import { authRequired } from '../middleware/auth.js';
import { serializeUser } from '../utils/userSerializer.js';

const router = Router();

router.use(authRequired);

router.get('/profile', async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user: serializeUser(user, { full: true }) });
});

router.patch('/profile', async (req, res) => {
  const { name, phone, marketingOptIn } = req.body;
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (name) user.name = name;
  if (phone !== undefined) user.phone = phone;
  if (marketingOptIn !== undefined) user.marketingOptIn = Boolean(marketingOptIn);
  await user.save();
  res.json({ user: serializeUser(user, { full: true }) });
});

router.patch('/password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({ message: 'Valid current and new password (8+ chars) required' });
  }
  const user = await User.findById(req.userId).select('+password');
  if (!user || !(await user.comparePassword(currentPassword))) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }
  user.password = newPassword;
  await user.save();
  res.json({ message: 'Password updated' });
});

router.patch('/notifications', async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.notificationPreferences = {
    ...user.notificationPreferences,
    ...req.body,
  };
  await user.save();
  res.json({ notificationPreferences: user.notificationPreferences });
});

// Addresses
router.post('/addresses', async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const addr = req.body;
  if (addr.isDefault) {
    user.addresses.forEach((a) => {
      a.isDefault = false;
    });
  }
  user.addresses.push(addr);
  if (user.addresses.length === 1) user.addresses[0].isDefault = true;
  await user.save();
  res.status(201).json({ addresses: user.addresses });
});

router.put('/addresses/:addressId', async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const addr = user.addresses.id(req.params.addressId);
  if (!addr) return res.status(404).json({ message: 'Address not found' });
  Object.assign(addr, req.body);
  if (req.body.isDefault) {
    user.addresses.forEach((a) => {
      a.isDefault = a._id.toString() !== req.params.addressId;
    });
    addr.isDefault = true;
  }
  await user.save();
  res.json({ addresses: user.addresses });
});

router.delete('/addresses/:addressId', async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const addr = user.addresses.id(req.params.addressId);
  if (!addr) return res.status(404).json({ message: 'Address not found' });
  const wasDefault = addr.isDefault;
  addr.deleteOne();
  if (wasDefault && user.addresses.length) user.addresses[0].isDefault = true;
  await user.save();
  res.json({ addresses: user.addresses });
});

// Wishlist
router.get('/wishlist', async (req, res) => {
  const user = await User.findById(req.userId).populate({
    path: 'wishlist',
    match: { isActive: true },
  });
  const products = (user?.wishlist || []).filter(Boolean);
  res.json({ products });
});

router.post('/wishlist/:productId', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.productId, isActive: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const user = await User.findById(req.userId);
  const id = product._id.toString();
  if (!user.wishlist.some((w) => w.toString() === id)) {
    user.wishlist.push(product._id);
    await user.save();
  }
  res.json({ wishlistIds: user.wishlist.map((w) => w.toString()) });
});

router.delete('/wishlist/:productId', async (req, res) => {
  const user = await User.findById(req.userId);
  user.wishlist = user.wishlist.filter((w) => w.toString() !== req.params.productId);
  await user.save();
  res.json({ wishlistIds: user.wishlist.map((w) => w.toString()) });
});

router.put('/wishlist/sync', async (req, res) => {
  const { productIds } = req.body;
  if (!Array.isArray(productIds)) {
    return res.status(400).json({ message: 'productIds array required' });
  }
  const valid = await Product.find({ _id: { $in: productIds }, isActive: true }).select('_id');
  const user = await User.findById(req.userId);
  const merged = new Set([...user.wishlist.map((w) => w.toString()), ...valid.map((p) => p._id.toString())]);
  user.wishlist = [...merged];
  await user.save();
  res.json({ wishlistIds: user.wishlist.map((w) => w.toString()) });
});

export default router;
