import { Router } from 'express';
import { ContactMessage } from '../models/ContactMessage.js';
import { authRequired, adminRequired } from '../middleware/auth.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Name, email, subject, and message are required' });
    }
    const doc = await ContactMessage.create({ name, email, phone, subject, message });
    res.status(201).json({ message: 'Thank you! We will get back to you soon.', id: doc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

router.get('/', authRequired, adminRequired, async (_req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(100);
  res.json({ messages });
});

export default router;
