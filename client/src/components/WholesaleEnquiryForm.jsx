import { useState } from 'react';
import { api } from '../api/client.js';

const BUSINESS_TYPES = ['Boutique', 'Fashion Designer', 'Tailor', 'Online Seller', 'Event Decorator', 'Other'];

export default function WholesaleEnquiryForm({ productTitle, productId, onSuccess }) {
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    businessType: BUSINESS_TYPES[0],
    productInterest: productTitle || '',
    quantity: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api('/wholesale/enquiries', {
        method: 'POST',
        body: JSON.stringify({ ...form, productId, productTitle }),
      });
      setDone(true);
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    }
  };

  if (done) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-sm text-green-800">
        Thank you! Our wholesale team will contact you within 1–2 business days.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3 rounded-xl border border-neutral-200 bg-white p-6">
      <h3 className="font-serif text-lg text-maroon">Wholesale enquiry</h3>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ['companyName', 'Company name *'],
          ['contactName', 'Contact name *'],
          ['email', 'Email *'],
          ['phone', 'Phone *'],
          ['city', 'City'],
          ['quantity', 'Estimated quantity'],
        ].map(([key, label]) => (
          <label key={key} className="block text-sm">
            {label}
            <input
              className="input-field mt-1"
              required={label.includes('*')}
              type={key === 'email' ? 'email' : 'text'}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </label>
        ))}
      </div>
      <label className="block text-sm">
        Business type
        <select className="input-field mt-1" value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })}>
          {BUSINESS_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="block text-sm">
        Product interest
        <input className="input-field mt-1" value={form.productInterest} onChange={(e) => setForm({ ...form, productInterest: e.target.value })} />
      </label>
      <label className="block text-sm">
        Message
        <textarea className="input-field mt-1" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </label>
      <button type="submit" className="btn-primary">Submit enquiry →</button>
    </form>
  );
}
