import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { authRequired } from '../middleware/auth.js';
import { isFirebaseAdminConfigured, verifyFirebaseIdToken } from '../config/firebase.js';

const router = Router();

function signToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
}

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, marketingOptIn } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const user = await User.create({
      name,
      email,
      phone,
      password,
      marketingOptIn: Boolean(marketingOptIn),
    });
    const token = signToken(user);
    res.status(201).json({ token, user: publicUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user?.password) {
      return res.status(401).json({
        message: 'This account uses Google sign-in. Please continue with Google.',
      });
    }
    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = signToken(user);
    res.json({ token, user: publicUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

router.post('/google', async (req, res) => {
  try {
    if (!isFirebaseAdminConfigured()) {
      return res.status(503).json({ message: 'Google sign-in is not configured on the server' });
    }
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: 'Missing Google ID token' });
    }

    const decoded = await verifyFirebaseIdToken(idToken);
    const email = decoded.email?.toLowerCase();
    if (!email) {
      return res.status(400).json({ message: 'Google account must include an email address' });
    }

    const displayName = decoded.name || email.split('@')[0];
    let user = await User.findOne({ $or: [{ firebaseUid: decoded.uid }, { email }] });

    if (!user) {
      user = await User.create({
        name: displayName,
        email,
        firebaseUid: decoded.uid,
        authProvider: 'google',
      });
    } else {
      if (!user.firebaseUid) user.firebaseUid = decoded.uid;
      if (!user.name && displayName) user.name = displayName;
      if (!user.password) user.authProvider = 'google';
      await user.save();
    }

    const token = signToken(user);
    res.json({ token, user: publicUser(user) });
  } catch (err) {
    console.error('Google auth error:', err);
    const message =
      process.env.NODE_ENV === 'production'
        ? 'Google sign-in failed'
        : err.message || 'Google sign-in failed';
    res.status(401).json({ message });
  }
});

router.get('/me', authRequired, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user: publicUser(user) });
});

export default router;
