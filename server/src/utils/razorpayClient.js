import Razorpay from 'razorpay';
import crypto from 'crypto';

export function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

export function isRazorpayEnabled() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

export function verifyRazorpaySignature({ orderId, paymentId, signature }) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const body = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
  return expected === signature;
}
