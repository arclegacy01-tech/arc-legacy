import { TRUST_ITEMS } from '../data/nav.js';

function TrustIcon({ title }) {
  if (title === 'Premium Quality') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    );
  }
  if (title === 'Pan India Delivery') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
        <circle cx="7" cy="17.5" r="1.5" />
        <circle cx="17" cy="17.5" r="1.5" />
      </svg>
    );
  }
  if (title === 'Secure Payments') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3L4.5 6.5v5.5c0 5 3.2 9.2 7.5 10 4.3-.8 7.5-5 7.5-10V6.5L12 3z" />
        <path d="M9 12l2 2 4-4" strokeWidth="1.8" />
      </svg>
    );
  }
  // Dedicated Support
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 13a8 8 0 0 1 16 0" />
      <rect x="3" y="13" width="4" height="6" rx="1" />
      <rect x="17" y="13" width="4" height="6" rx="1" />
      <path d="M12 19v1.5" />
    </svg>
  );
}

export default function TrustBar() {
  return (
    <section className="border-y border-neutral-200 bg-cream-dark">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4">
        {TRUST_ITEMS.map((item) => (
          <div key={item.title} className="text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold bg-[#FAF4EB]/60">
              <TrustIcon title={item.title} />
            </div>
            <div className="font-serif text-sm font-semibold text-maroon">{item.title}</div>
            <div className="text-xs text-neutral-600">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
