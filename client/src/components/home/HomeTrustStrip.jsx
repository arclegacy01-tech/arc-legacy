const ITEMS = [
  {
    title: 'Premium Quality',
    desc: 'Handpicked Collections',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 3l2.2 5.2L20 9l-4 3.6L17.2 19 12 16.2 6.8 19 8 12.6 4 9l5.8-.8z" />
      </svg>
    ),
  },
  {
    title: 'Pan India Delivery',
    desc: 'Reliable & Fast Shipping',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
        <circle cx="7" cy="17.5" r="1.4" />
        <circle cx="17" cy="17.5" r="1.4" />
      </svg>
    ),
  },
  {
    title: 'Secure Payments',
    desc: '100% Safe Checkout',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Dedicated Support',
    desc: "We're Here to Help",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 13a8 8 0 0 1 16 0" />
        <rect x="3" y="13" width="4" height="6" rx="1" />
        <rect x="17" y="13" width="4" height="6" rx="1" />
        <path d="M12 19v1.5" />
      </svg>
    ),
  },
];

export default function HomeTrustStrip() {
  return (
    <section className="border-y border-neutral-200/80 bg-[#fbf7f1]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 md:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.title} className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold">
              {item.icon}
            </div>
            <div className="font-serif text-sm font-semibold text-maroon md:text-base">{item.title}</div>
            <div className="mt-1 text-xs text-neutral-500">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
