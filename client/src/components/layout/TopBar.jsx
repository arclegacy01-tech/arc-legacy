const FALLBACK = [
  'FREE SHIPPING ON ORDERS ABOVE ₹999',
  'PREMIUM QUALITY TRIMS',
  'PAN INDIA DELIVERY',
];

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
      <circle cx="7" cy="17.5" r="1.5" />
      <circle cx="17" cy="17.5" r="1.5" />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 16h16M5 16l1.2-8 3.8 3.6L12 4l2 7.6 3.8-3.6L19 16" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 3.5 19 6.2v5.6c0 4.2-2.8 7.2-7 8.7-4.2-1.5-7-4.5-7-8.7V6.2L12 3.5z" />
    </svg>
  );
}

const ICONS = [TruckIcon, CrownIcon, ShieldIcon];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M12.04 3.5A8.5 8.5 0 0 0 4.7 16.3L3.6 20.4l4.2-1.1A8.5 8.5 0 1 0 12.04 3.5zm4.9 12.05c-.2.58-1.18 1.1-1.64 1.16-.42.06-.96.08-1.55-.1-.36-.1-.82-.26-1.42-.52-2.5-1.08-4.12-3.6-4.24-3.77-.12-.17-1-1.33-1-2.54s.63-1.8.86-2.05c.22-.24.48-.3.64-.3h.46c.15 0 .34-.05.53.4.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.24-.1.47.14.22.62 1.02 1.33 1.66.92.82 1.69 1.07 1.93 1.19.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.16z" />
    </svg>
  );
}

const SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com', Icon: InstagramIcon },
  { label: 'WhatsApp', href: 'https://wa.me/', Icon: WhatsAppIcon },
];

export default function TopBar() {
  const items = FALLBACK;

  return (
    <div className="bg-maroon text-[10px] tracking-[0.08em] text-white sm:text-[11px]">
      <div className="relative mx-auto flex max-w-7xl items-center px-4 py-2">
        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-8 gap-y-1 md:justify-evenly md:pr-16">
          {items.slice(0, 3).map((text, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <span key={`${text}-${i}`} className="inline-flex items-center gap-1.5 whitespace-nowrap uppercase">
                <Icon />
                <span>{text}</span>
              </span>
            );
          })}
        </div>
        <div className="absolute right-4 hidden items-center gap-3 md:flex">
          {SOCIAL.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-gold-light" aria-label={s.label}>
              <s.Icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
