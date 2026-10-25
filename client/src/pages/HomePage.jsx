import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';
import ProductGrid from '../components/ProductGrid.jsx';
import HeroCarousel from '../components/HeroCarousel.jsx';
import HomeTrustStrip from '../components/home/HomeTrustStrip.jsx';
import HomeSectionHeader from '../components/home/HomeSectionHeader.jsx';
import { HOME_CATEGORY_DISPLAY, HOME_GALLERY_FILTERS } from '../data/homeCategories.js';

export default function HomePage() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [galleryProducts, setGalleryProducts] = useState([]);
  const [galleryFilter, setGalleryFilter] = useState('');
  const [galleryPage, setGalleryPage] = useState(1);
  const [galleryPages, setGalleryPages] = useState(1);
  const [cms, setCms] = useState(null);

  useEffect(() => {
    api('/products?newArrivals=true&limit=6').then((d) => setNewArrivals(d.products));
    api('/products?featured=true&limit=6').then((d) => setFeatured(d.products));
    api('/cms/public/homepage').then(setCms).catch(() => setCms(null));
  }, []);

  useEffect(() => {
    const q = new URLSearchParams({ limit: '8', page: String(galleryPage) });
    if (galleryFilter) q.set('categorySlug', galleryFilter);
    api(`/products?${q}`).then((d) => {
      setGalleryProducts(d.products);
      setGalleryPages(d.pagination?.pages || 1);
    });
  }, [galleryFilter, galleryPage]);

  const promo = cms?.promoBanner;
  const story = cms?.sections?.['story-teaser'];

  const heroFallback = {
    title: 'The Finishing Touch to Your Creations',
    subtitle: 'Premium Laces & Latkans',
    imageUrl: '/images/hero-home.jpg',
    body: 'Discover handcrafted laces, latkans and trims for ethnic wear, home décor, and boutique collections.',
    ctaLabel: 'Shop Now',
    ctaLink: '/category/latkans',
  };

  return (
    <div className="bg-cream">
      <HeroCarousel banners={cms?.heroBanners} fallback={heroFallback} />

      {/* Category circles */}
      <section className="bg-cream px-4 pb-4 pt-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {HOME_CATEGORY_DISPLAY.map((cat) => (
            <Link key={cat.slug} to={`/category/${cat.slug}`} className="group text-center">
              <div className="mx-auto aspect-square w-[88px] overflow-hidden rounded-full border-2 border-gold/35 shadow-sm sm:w-[100px]">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-maroon sm:text-xs">
                {cat.label}
              </div>
              <span className="mt-1 inline-block text-[11px] text-neutral-500 group-hover:text-maroon">
                Shop Now →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <HomeTrustStrip />

      {/* New Arrivals */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-14">
        <HomeSectionHeader title="New Arrivals" viewAllTo="/new-arrivals" />
        <ProductGrid products={newArrivals} columns={6} variant="home" />
      </section>

      {/* Lifestyle promo banner */}
      <section className="relative mx-4 mb-4 overflow-hidden rounded-sm md:mx-auto md:max-w-7xl">
        <img
          src={promo?.imageUrl || '/images/product-4.jpg'}
          alt=""
          className="aspect-[21/9] w-full object-cover md:aspect-[3/1]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14">
          <p className="text-xs uppercase tracking-[0.25em] text-maroon/80">
            {promo?.subtitle || 'Celebrate Creativity'}
          </p>
          <h2 className="mt-2 max-w-md font-serif text-2xl text-maroon md:text-3xl">
            {promo?.title || 'Traditional Trims for Modern Designs'}
          </h2>
          <Link
            to={promo?.ctaLink || '/category/trims-borders'}
            className="btn-primary mt-6 w-fit text-xs"
          >
            {promo?.ctaLabel || 'Explore Collection'} →
          </Link>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-14">
        <HomeSectionHeader title="Bestsellers" viewAllTo="/category/laces" />
        <ProductGrid products={featured.length ? featured : newArrivals} columns={6} variant="home" />
      </section>

      {/* Our Manufacturing */}
      <section className="border-y border-neutral-200/80 bg-white py-14 md:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
          <div className="grid grid-cols-3 gap-2">
            <img src="/images/product-7.jpg" alt="" className="col-span-2 row-span-2 h-full min-h-[200px] w-full rounded-lg object-cover" />
            <img src="/images/product-8.jpg" alt="" className="h-full min-h-[96px] w-full rounded-lg object-cover" />
            <img src="/images/product-9.jpg" alt="" className="h-full min-h-[96px] w-full rounded-lg object-cover" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500">Our Manufacturing</p>
            <h2 className="mt-2 font-serif text-2xl text-maroon md:text-3xl">
              Crafted With Care, Finished With Perfection
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              From sourcing premium materials to final quality checks, every meter of lace and every latkan is made to
              meet the standards your creations deserve.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { title: 'Craftsmanship', desc: 'Skilled artisans at work' },
                { title: 'Quality Checks', desc: 'Inspected before dispatch' },
                { title: 'Consistent Finishing', desc: 'Same design, every batch' },
              ].map((f) => (
                <div key={f.title} className="text-center sm:text-left">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold sm:mx-0">
                    ✦
                  </div>
                  <div className="text-sm font-semibold text-maroon">{f.title}</div>
                  <div className="text-xs text-neutral-500">{f.desc}</div>
                </div>
              ))}
            </div>
            <Link to="/our-story" className="btn-outline mt-8 inline-flex text-xs">Explore Our Process →</Link>
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <img src="/images/product-2.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-maroon/75" />
        <div className="relative mx-auto max-w-3xl px-4 text-center text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-light">Our Brand Story</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">A Legacy Woven with Love</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/90">
            {story?.body ||
              "ARC LEGACY celebrates India's textile heritage — India's first lace brand trusted by designers, boutiques, and creators nationwide."}
          </p>
          <Link
            to={story?.ctaLink || '/our-story'}
            className="btn-outline mt-8 border-gold-light text-gold-light hover:bg-gold-light hover:text-maroon"
          >
            {story?.ctaLabel || 'Discover Our Process'} →
          </Link>
        </div>
      </section>

      {/* Find the perfect finish */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <h2 className="text-center font-serif text-2xl text-maroon md:text-3xl">Find the Perfect Finish</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {HOME_GALLERY_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => {
                setGalleryFilter(f.key);
                setGalleryPage(1);
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                galleryFilter === f.key
                  ? 'bg-maroon text-white'
                  : 'border border-neutral-300 bg-white text-neutral-700 hover:border-maroon'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="mt-10">
          <ProductGrid products={galleryProducts} columns={4} variant="home" />
        </div>
        {galleryPages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: Math.min(galleryPages, 6) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setGalleryPage(p)}
                className={`flex h-9 min-w-9 items-center justify-center rounded-full text-sm ${
                  galleryPage === p ? 'bg-maroon text-white' : 'border border-neutral-200 bg-white'
                }`}
              >
                {p}
              </button>
            ))}
            {galleryPage < galleryPages && (
              <button
                type="button"
                className="px-3 text-sm text-maroon"
                onClick={() => setGalleryPage((p) => Math.min(galleryPages, p + 1))}
              >
                →
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
