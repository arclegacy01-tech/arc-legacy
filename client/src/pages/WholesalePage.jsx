import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';
import PageHero from '../components/PageHero.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import WholesaleEnquiryForm from '../components/WholesaleEnquiryForm.jsx';
import { NAV_LINKS } from '../data/nav.js';
import { TRUST_ITEMS } from '../data/nav.js';

const STEPS = [
  { title: 'Send inquiry', desc: 'Share products, quantities, and requirements.' },
  { title: 'Get a quote', desc: 'Receive wholesale pricing and availability.' },
  { title: 'Confirm order', desc: 'Finalize designs, quantity, and payment.' },
  { title: 'Fast delivery', desc: 'We pack and ship your order safely.' },
];

export default function WholesalePage() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    api('/products?featured=true&limit=8').then((d) => setProducts(d.products));
  }, []);

  const categories = NAV_LINKS.filter((l) => l.to.startsWith('/category'));

  return (
    <>
      <PageHero
        title="Premium Trims for Your Business"
        subtitle="Wholesale collection for boutiques, designers, and resellers across India"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Wholesale' }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="text-center">
          <button type="button" className="btn-primary" onClick={() => setShowForm(true)}>Enquire for wholesale →</button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {TRUST_ITEMS.map((t) => (
            <div key={t.title} className="text-center text-sm">
              <div className="font-medium text-maroon">{t.title}</div>
              <div className="text-neutral-600">{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream-dark py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center font-serif text-2xl text-maroon">Wholesale categories</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c, i) => (
              <Link key={c.to} to={c.to} className="rounded-xl bg-white p-4 text-center shadow-card">
                <img src={`/images/product-${(i % 12) + 1}.jpg`} alt="" className="mx-auto h-16 w-16 rounded-full object-cover" />
                <div className="mt-2 text-sm font-medium text-maroon">{c.label}</div>
                <span className="text-xs text-neutral-500">Wholesale →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="font-serif text-2xl text-maroon">Trending wholesale products</h2>
        <p className="text-sm text-neutral-600">Tap Enquire on any product or use the form below.</p>
        <div className="mt-6">
          <ProductGrid products={products} />
        </div>
      </section>

      <section className="bg-maroon py-14 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center font-serif text-2xl">How to place a wholesale order</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="rounded-xl bg-white/10 p-5 text-center">
                <div className="text-gold-light font-serif text-2xl">{i + 1}</div>
                <div className="mt-2 font-medium">{s.title}</div>
                <p className="mt-1 text-sm text-white/80">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14">
        {showForm && <WholesaleEnquiryForm onSuccess={() => setShowForm(false)} />}
        {!showForm && (
          <div className="text-center">
            <button type="button" className="btn-outline" onClick={() => setShowForm(true)}>Open enquiry form</button>
          </div>
        )}
      </section>
    </>
  );
}
