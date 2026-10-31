import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';
import ProductGrid from '../components/ProductGrid.jsx';
import HeroCarousel from '../components/HeroCarousel.jsx';
import HomeTrustStrip from '../components/home/HomeTrustStrip.jsx';
import HomeSectionHeader from '../components/home/HomeSectionHeader.jsx';
import HomeManufacturingStory from '../components/home/HomeManufacturingStory.jsx';
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
    imageUrl: '/images/hero-finishing.jpg',
    body: 'Explore our exclusive collection of laces, latkans, trims and embellishments for ethnic fashion, custom outfits and home décor.',
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
              <div className="mx-auto aspect-square w-[92px] overflow-hidden rounded-full border border-gold/40 shadow-sm sm:w-[112px]">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-maroon sm:text-xs">
                {cat.label}
              </div>
              <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-neutral-500 group-hover:text-maroon">
                Shop Now
                <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M6 3l5 5-5 5" />
                </svg>
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
          <h2 className="mt-2 max-w-md font-serif text-3xl leading-tight text-maroon md:text-4xl">
            {promo?.title || 'Traditional Trims for Modern Designs'}
          </h2>
          <p className="mt-3 max-w-md text-sm text-neutral-700">
            Perfect for lehengas, blouses, dupattas, home décor and more.
          </p>
          <Link
            to={promo?.ctaLink || '/category/trims-borders'}
            className="btn-primary mt-6 w-fit text-xs inline-flex items-center gap-1.5"
          >
            <span>{promo?.ctaLabel || 'Explore Collection'}</span>
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-14">
        <HomeSectionHeader title="Bestsellers" viewAllTo="/category/laces" />
        <ProductGrid products={featured.length ? featured : newArrivals} columns={6} variant="home" />
      </section>

      {/* Our Manufacturing & Brand Story */}
      <HomeManufacturingStory storyCtaLink={story?.ctaLink} />

      {/* Find the perfect finish */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <p className="text-center text-[11px] uppercase tracking-[0.28em] text-gold">Explore Our Collection</p>
        <h2 className="mt-2 text-center font-serif text-2xl text-maroon md:text-3xl">Find the Perfect Finish</h2>
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
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-maroon hover:border-maroon transition"
                onClick={() => setGalleryPage((p) => Math.min(galleryPages, p + 1))}
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M6 3l5 5-5 5" />
                </svg>
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
