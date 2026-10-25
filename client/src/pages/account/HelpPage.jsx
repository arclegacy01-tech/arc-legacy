import { Link } from 'react-router-dom';

export default function HelpPage() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <h2 className="font-serif text-2xl text-maroon">Help & Support</h2>
      <p className="mt-2 text-sm text-neutral-600">Mon–Sat, 9:00 AM – 6:00 PM IST</p>
      <ul className="mt-6 space-y-3 text-sm">
        <li>
          <strong>Email:</strong>{' '}
          <a href="mailto:support@arclegacy.in" className="text-maroon underline">support@arclegacy.in</a>
        </li>
        <li><strong>Phone / WhatsApp:</strong> +91 98765 43210</li>
        <li><strong>Office:</strong> Surat, Gujarat (Textile Market area)</li>
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/contact" className="btn-primary text-xs">Contact us</Link>
        <Link to="/track-order" className="btn-outline text-xs">Track order</Link>
        <Link to="/policies/shipping" className="btn-outline text-xs">Shipping policy</Link>
        <Link to="/policies/returns" className="btn-outline text-xs">Returns policy</Link>
      </div>
    </div>
  );
}
