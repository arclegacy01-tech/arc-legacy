import { TRUST_ITEMS } from '../data/nav.js';

export default function TrustBar() {
  return (
    <section className="border-y border-neutral-200 bg-cream-dark">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4">
        {TRUST_ITEMS.map((item) => (
          <div key={item.title} className="text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold">
              ✦
            </div>
            <div className="font-serif text-sm font-semibold text-maroon">{item.title}</div>
            <div className="text-xs text-neutral-600">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
