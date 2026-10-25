import { Router } from 'express';
import { WholesaleEnquiry } from '../models/WholesaleEnquiry.js';
import { authRequired, adminRequired } from '../middleware/auth.js';

const router = Router();

router.post('/enquiries', async (req, res) => {
  try {
    const data = req.body;
    if (!data.companyName || !data.contactName || !data.email || !data.phone) {
      return res.status(400).json({ message: 'Company, contact name, email, and phone are required' });
    }
    const enquiry = await WholesaleEnquiry.create({
      ...data,
      user: req.userId || undefined,
    });
    res.status(201).json({ message: 'Enquiry submitted. Our team will contact you shortly.', enquiry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit enquiry' });
  }
});

router.get('/enquiries', authRequired, adminRequired, async (_req, res) => {
  const enquiries = await WholesaleEnquiry.find().sort({ createdAt: -1 }).limit(200);
  res.json({ enquiries });
});

router.patch('/enquiries/:id/status', authRequired, adminRequired, async (req, res) => {
  const { status } = req.body;
  const enquiry = await WholesaleEnquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!enquiry) return res.status(404).json({ message: 'Not found' });
  res.json({ enquiry });
});

export default router;
