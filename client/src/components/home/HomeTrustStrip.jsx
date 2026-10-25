import { TRUST_ITEMS } from '../../data/nav.js';

export default function HomeTrustStrip() {
  return (
    <section className="border-y border-neutral-200/80 bg-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 md:grid-cols-4">
        {TRUST_ITEMS.map((item) => (
          <div key={item.title} className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
              <span className="text-lg">✦</span>
            </div>
            <div className="font-serif text-sm font-semibold text-maroon">{item.title}</div>
            <div className="mt-1 text-xs text-neutral-600">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
