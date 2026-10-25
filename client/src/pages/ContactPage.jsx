import { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import PageHero from '../components/PageHero.jsx';
import FaqAccordion from '../components/FaqAccordion.jsx';

const SUBJECTS = ['General enquiry', 'Order & shipping', 'Wholesale', 'Product question', 'Other'];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    api('/cms/public/faqs').then((d) => setFaqs(d.faqs));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api('/contact', { method: 'POST', body: JSON.stringify(form) });
      setSent(true);
      setForm({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <PageHero
        title="We'd Love to Hear from You"
        subtitle="Questions about products, bulk orders, or your purchase — we're here to help"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2">
        <form onSubmit={submit} className="rounded-xl border border-neutral-200 bg-white p-6 shadow-card">
          <h2 className="font-serif text-xl text-maroon">Send us a message</h2>
          {sent && <p className="mt-3 text-sm text-green-700">Message sent! We&apos;ll reply soon.</p>}
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <label className="mt-4 block text-sm">
            Your name *
            <input className="input-field mt-1" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="mt-3 block text-sm">
            Email *
            <input className="input-field mt-1" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="mt-3 block text-sm">
            Phone
            <input className="input-field mt-1" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </label>
          <label className="mt-3 block text-sm">
            Subject *
            <select className="input-field mt-1" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
              {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label className="mt-3 block text-sm">
            Message *
            <textarea className="input-field mt-1" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </label>
          <button type="submit" className="btn-primary mt-6">Send Message →</button>
        </form>
        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-blush/40 p-6">
            <h3 className="font-serif text-lg text-maroon">Contact details</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><strong>Phone / WhatsApp:</strong> +91 98765 43210</li>
              <li><strong>Email:</strong> support@arclegacy.in</li>
              <li><strong>Office:</strong> Surat, Gujarat — Textile Market</li>
              <li><strong>Hours:</strong> Mon–Sat, 9 AM – 6 PM</li>
            </ul>
          </div>
          <img src="/images/product-8.jpg" alt="ARC LEGACY trims" className="rounded-xl object-cover w-full max-h-64" />
        </div>
      </div>
      <FaqAccordion faqs={faqs} />
    </>
  );
}
