import { Link } from 'react-router-dom';

export default function PageHero({ title, subtitle, breadcrumb = [] }) {
  return (
    <div className="relative overflow-hidden bg-neutral-900 py-14 text-white">
      <img src="/images/product-2.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4">
        {breadcrumb.length > 0 && (
          <p className="text-xs text-white/80">
            {breadcrumb.map((b, i) => (
              <span key={i}>
                {b.to ? <Link to={b.to} className="hover:text-gold-light">{b.label}</Link> : b.label}
                {i < breadcrumb.length - 1 ? ' / ' : ''}
              </span>
            ))}
          </p>
        )}
        <h1 className="mt-2 font-serif text-3xl md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-sm text-white/85">{subtitle}</p>}
      </div>
    </div>
  );
}
