import { useEffect, useState } from 'react';
import { api } from '../../api/client.js';

const FALLBACK = [
  'FREE SHIPPING ON ORDERS ABOVE ₹999',
  'PREMIUM QUALITY TRIMS',
  'PAN INDIA DELIVERY',
];

const SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
];

export default function TopBar() {
  const [items, setItems] = useState(FALLBACK);

  useEffect(() => {
    api('/cms/public/announcements')
      .then((d) => {
        if (d.announcements?.length) {
          setItems(d.announcements.map((a) => a.text));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-maroon-dark text-[11px] text-white/95">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:justify-start">
          {items.map((text, i) => (
            <span key={i} className="flex items-center gap-4">
              {i > 0 && <span className="hidden text-white/40 sm:inline">•</span>}
              <span>{typeof text === 'string' ? text : text}</span>
            </span>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <span className="text-white/70">Follow Us</span>
          {SOCIAL.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-gold-light" aria-label={s.label}>
              ○
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
