import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';

const PILLARS = [
  { title: 'Premium Quality', desc: 'Thoughtfully sourced materials' },
  { title: 'Rooted in Tradition', desc: "Inspired by India's textile heritage" },
  { title: 'For Every Creator', desc: 'Designers, boutiques, tailors & DIY' },
  { title: 'Timeless Designs', desc: 'Traditional craft, modern aesthetics' },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        title="A Legacy Woven with Love"
        subtitle="ARC LEGACY celebrates India's textile heritage through premium laces, latkans and trims"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Our Story' }]}
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.title} className="rounded-xl border border-neutral-200 bg-white p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold">✦</div>
              <h3 className="font-serif text-maroon">{p.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-cream-dark py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
          <img src="/images/product-5.jpg" alt="Craftsmanship" className="rounded-2xl shadow-card" />
          <div>
            <h2 className="font-serif text-3xl text-maroon">From Passion to Purpose</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              What began as a love for intricate trims grew into India&apos;s first dedicated lace brand — serving creators who believe the finishing touch matters as much as the fabric itself.
            </p>
            <Link to="/category/laces" className="btn-primary mt-6 inline-flex text-xs">Explore Our Process →</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-14 text-center">
        <h2 className="font-serif text-2xl text-maroon">To Keep the Legacy Alive</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600">
          Every meter we sell carries forward the skill of artisans and the trust of thousands of creators across India.
        </p>
        <Link to="/new-arrivals" className="btn-primary mt-8 inline-flex">Shop Our Collection →</Link>
      </section>
    </>
  );
}
