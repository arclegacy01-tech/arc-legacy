import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api/client.js';
import CategoryFilters from '../components/CategoryFilters.jsx';
import HomeTrustStrip from '../components/home/HomeTrustStrip.jsx';
import {
  NEW_ARRIVALS_CIRCLES,
  NEW_ARRIVALS_PRODUCTS,
  NEW_ARRIVALS_TRENDING,
  NEW_ARRIVALS_CELEBRATIONS,
  NEW_ARRIVALS_FILTER_CONFIG,
} from '../data/newArrivalsData.js';

const EMPTY_FILTERS = {
  material: [],
  style: [],
  type: [],
  color: [],
  width: [],
  usage: [],
  inStock: undefined,
  priceRange: null,
};

function BotanicalLineart({ className }) {
  return (
    <svg viewBox="0 0 220 400" className={className} fill="none" aria-hidden="true">
      <path d="M110 380 C110 380 60 320 40 250 C20 180 50 120 90 80 C130 40 160 20 180 10" stroke="#C9A227" strokeWidth="0.6" opacity="0.35" />
      <path d="M110 380 C110 380 160 320 180 250 C200 180 170 110 130 80 C90 50 60 30 40 20" stroke="#C9A227" strokeWidth="0.6" opacity="0.35" />
      <ellipse cx="90" cy="180" rx="28" ry="14" transform="rotate(-30 90 180)" stroke="#C9A227" strokeWidth="0.5" opacity="0.3" />
      <ellipse cx="130" cy="200" rx="28" ry="14" transform="rotate(30 130 200)" stroke="#C9A227" strokeWidth="0.5" opacity="0.3" />
      <ellipse cx="75" cy="240" rx="22" ry="11" transform="rotate(-45 75 240)" stroke="#C9A227" strokeWidth="0.5" opacity="0.25" />
      <ellipse cx="145" cy="155" rx="22" ry="11" transform="rotate(45 145 155)" stroke="#C9A227" strokeWidth="0.5" opacity="0.25" />
      <circle cx="110" cy="100" r="6" stroke="#C9A227" strokeWidth="0.6" opacity="0.4" />
      <circle cx="80" cy="290" r="4" stroke="#C9A227" strokeWidth="0.5" opacity="0.3" />
      <circle cx="140" cy="310" r="4" stroke="#C9A227" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

function NewArrivalProductCard({ product }) {
  const image = product.images?.find((i) => i.isMain)?.url || product.images?.[0]?.url || product.image || '/images/new-arrivals/prod_1.jpg';
  const rating = product.rating ?? 4.8;
  const [wished, setWished] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-neutral-200/80 bg-white shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/product/${product.slug}`} className="relative aspect-[4/3] overflow-hidden bg-[#FAF5EF]">
        <button
          type="button"
          className={`absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-xs transition hover:scale-110 ${wished ? 'text-maroon' : 'text-neutral-400 hover:text-maroon'}`}
          onClick={(e) => {
            e.preventDefault();
            setWished(!wished);
          }}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill={wished ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={wished ? '0' : '1.8'}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <img
          src={image}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <Link to={`/product/${product.slug}`} className="truncate text-xs font-semibold text-neutral-800 hover:text-maroon sm:text-sm">
          {product.title}
        </Link>
        <div className="mt-1 text-xs sm:text-sm font-bold text-maroon">
          ₹{product.price}{' '}
          <span className="text-xs font-normal text-neutral-500">/ {product.unit || 'Meter'}</span>
        </div>
        {/* Star rating */}
        <div className="mt-1 flex items-center gap-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={star <= Math.round(rating) ? '#C9A227' : 'none'}
                  stroke="#C9A227"
                  strokeWidth="1"
                />
              </svg>
            ))}
          </div>
          <span className="text-[10px] text-neutral-500">({rating})</span>
        </div>
        <button
          type="button"
          className="btn-primary mt-2.5 inline-flex w-full items-center justify-center gap-1.5 py-1.5 text-[11px] sm:py-2"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default function NewArrivalsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState('newest');
  const page = Number(searchParams.get('page')) || 1;
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    setLoading(true);
    api('/products?newArrivals=true&limit=12')
      .then((data) => {
        const prods = data.products || [];
        const hasOldImages = prods.some((p) => p.images?.some((img) => img.url?.includes('product-')));
        if (prods.length >= 12 && !hasOldImages) {
          setProducts(prods);
        } else {
          setProducts(NEW_ARRIVALS_PRODUCTS);
        }
      })
      .catch(() => setProducts(NEW_ARRIVALS_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (filters.priceRange) {
      list = list.filter((p) => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max);
    }
    if (filters.color?.length) list = list.filter((p) => filters.color.includes(p.color));
    if (filters.type?.length) list = list.filter((p) => filters.type.includes(p.type));
    if (filters.material?.length) list = list.filter((p) => filters.material.includes(p.material));
    if (filters.inStock !== undefined && filters.inStock !== null) {
      list = list.filter((p) => p.inStock === filters.inStock);
    }
    return list;
  }, [products, filters]);

  const totalProducts = 286;
  const totalPages = 24;
  const start = (page - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(page * ITEMS_PER_PAGE, totalProducts);

  const applyFilters = (next) => {
    setFilters(next);
    setSearchParams({});
  };

  const renderPagination = () => {
    const visiblePages = [1, 2, 3, 4, 5];
    return (
      <div className="flex items-center gap-1.5">
        {visiblePages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setSearchParams({ page: String(p) })}
            className={`h-8 w-8 rounded-md text-xs font-medium transition ${
              p === page
                ? 'bg-maroon text-white shadow-sm'
                : 'border border-neutral-200 bg-white text-neutral-700 hover:border-maroon hover:text-maroon'
            }`}
          >
            {p}
          </button>
        ))}
        <span className="px-1 text-xs text-neutral-400">…</span>
        <button
          type="button"
          onClick={() => setSearchParams({ page: String(totalPages) })}
          className="h-8 w-8 rounded-md border border-neutral-200 bg-white text-xs text-neutral-700 hover:border-maroon hover:text-maroon"
        >
          {totalPages}
        </button>
        <button
          type="button"
          onClick={() => setSearchParams({ page: String(Math.min(totalPages, page + 1)) })}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-neutral-600 hover:border-maroon hover:text-maroon"
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    );
  };

  return (
    <div className="bg-cream">
      {/* ── Hero ── */}
      <section className="relative min-h-[400px] overflow-hidden bg-cream md:min-h-[460px]">
        <img
          src="/images/new-arrivals/hero_bg.jpg"
          alt="Fresh Finds. Timeless Details."
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f1ea] from-[8%] via-[#f7f1ea]/92 via-[38%] to-transparent to-[65%]" />
        <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-full w-28 opacity-45 md:w-36" />
        <div className="relative z-10 mx-auto flex max-w-7xl items-center px-8 py-14 md:min-h-[460px] md:px-14">
          <div className="max-w-md">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              NEW ARRIVALS
            </p>
            <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-maroon md:text-5xl">
              Fresh Finds.
              <br />
              Timeless Details.
            </h1>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-neutral-600 sm:text-sm">
              Discover the latest arrivals in laces, latkans, trims, gota patti and embellishments. Handpicked designs to add elegance to your creations.
            </p>
            <a href="#collection" className="btn-primary mt-7 inline-flex px-5 py-2.5 text-[11px] tracking-[0.14em]">
              SHOP NEW ARRIVALS →
            </a>
          </div>
        </div>
        {/* Carousel indicator dots */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-maroon" />
          <span className="h-2 w-2 rounded-full border border-maroon/40 bg-white/70" />
          <span className="h-2 w-2 rounded-full border border-maroon/40 bg-white/70" />
        </div>
      </section>

      {/* ── Category Circles ── */}
      <section className="px-4 pb-6 pt-10">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-6 sm:grid-cols-6">
          {NEW_ARRIVALS_CIRCLES.map((item) => (
            <Link key={item.label} to={`/category/${item.slug}`} className="group text-center">
              <div className="mx-auto aspect-square w-[90px] overflow-hidden rounded-full border-2 border-gold/60 shadow-md transition duration-300 group-hover:border-gold group-hover:shadow-lg sm:w-[110px]">
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-maroon leading-tight">
                {item.label}
              </div>
              <span className="mt-1 inline-block text-[10px] text-neutral-400 group-hover:text-maroon transition">
                Shop Now →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <HomeTrustStrip />

      {/* ── Collection Grid ── */}
      <section id="collection" className="mx-auto max-w-7xl px-4 py-10">
        {/* Collection header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-center font-serif text-2xl text-maroon sm:text-left md:text-3xl">
            <span className="text-gold mr-2 text-lg">✦</span>
            Just Arrived at ARC LEGACY
            <span className="text-gold ml-2 text-lg">✦</span>
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
            <span>Showing {start}–{end} of {totalProducts} products</span>
            <label className="flex items-center gap-2">
              Sort by:
              <select
                className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-700 focus:outline-none focus:ring-1 focus:ring-maroon"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>

        {/* Sidebar + Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
          <CategoryFilters
            filters={filters}
            onChange={applyFilters}
            onClear={() => applyFilters(EMPTY_FILTERS)}
            variant="new-arrivals"
            config={NEW_ARRIVALS_FILTER_CONFIG}
          />

          <div>
            {loading ? (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="aspect-[4/3] animate-pulse rounded-md bg-neutral-100" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <NewArrivalProductCard key={product._id} product={product} />
                ))}
                {filteredProducts.length === 0 && (
                  <p className="col-span-4 py-16 text-center text-sm text-neutral-500">
                    No products match your filters.{' '}
                    <button className="text-maroon underline" onClick={() => applyFilters(EMPTY_FILTERS)}>
                      Clear filters
                    </button>
                  </p>
                )}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-10 flex items-center justify-center">
              {renderPagination()}
            </div>
          </div>
        </div>
      </section>

      {/* ── Promo Banner ── */}
      <section className="relative mx-4 mb-2 min-h-[240px] overflow-hidden md:mx-auto md:max-w-7xl md:min-h-[280px]">
        <img
          src="/images/new-arrivals/promo_bg.jpg"
          alt="The Details Everyone Will Love"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f6efe6] via-[#f6efe6]/88 to-transparent to-[70%]" />
        <div className="relative flex min-h-[240px] flex-col justify-center px-8 py-10 md:min-h-[280px] md:px-14">
          <span className="inline-block w-fit rounded-sm bg-maroon px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            NEW THIS WEEK
          </span>
          <h2 className="mt-3 max-w-md font-serif text-3xl leading-tight text-maroon md:text-4xl">
            The Details
            <br />
            Everyone Will Love
          </h2>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-neutral-600 sm:text-sm">
            Explore our latest laces, latkans and trims, designed to bring charm, tradition and elegance to every creation.
          </p>
          <a href="#collection" className="btn-primary mt-6 w-fit px-5 py-2.5 text-[11px] tracking-[0.14em]">
            SHOP THE NEW COLLECTION →
          </a>
        </div>
      </section>

      {/* ── Trending Now ── */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between">
          <div className="w-full text-center">
            <h2 className="font-serif text-2xl text-maroon sm:text-3xl">
              <span className="text-gold mr-2 text-lg">✦</span>
              Trending Now
              <span className="text-gold ml-2 text-lg">✦</span>
            </h2>
          </div>
          <a href="#collection" className="hidden shrink-0 text-xs font-medium text-maroon hover:underline sm:inline-block">
            View All →
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {NEW_ARRIVALS_TRENDING.map((item) => (
            <NewArrivalProductCard key={item._id} product={item} />
          ))}
        </div>
      </section>

      {/* ── Made for Every Celebration ── */}
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-4">
        <h2 className="text-center font-serif text-2xl text-maroon sm:text-3xl">
          <span className="text-gold mr-2 text-lg">✦</span>
          Made for Every Celebration
          <span className="text-gold ml-2 text-lg">✦</span>
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {NEW_ARRIVALS_CELEBRATIONS.map((item) => (
            <a key={item.label} href="#collection" className="group">
              <div className="overflow-hidden rounded-md border border-gold/25 shadow-xs transition duration-300 group-hover:shadow-md">
                <img
                  src={item.image}
                  alt={item.label}
                  className="aspect-[16/11] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-2.5 text-sm font-serif font-semibold text-maroon">{item.label}</div>
              <span className="text-[11px] text-neutral-500 group-hover:text-maroon transition">
                Explore Now →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Artisan Story ── */}
      <section className="relative overflow-hidden bg-white py-16">
        <svg className="absolute right-0 top-0 h-full w-72 opacity-5 pointer-events-none" viewBox="0 0 300 600" fill="none" aria-hidden="true">
          <circle cx="150" cy="150" r="140" stroke="#6B1E2E" strokeWidth="1" />
          <circle cx="150" cy="150" r="100" stroke="#C9A227" strokeWidth="0.8" />
          <circle cx="150" cy="450" r="140" stroke="#6B1E2E" strokeWidth="1" />
          <path d="M10 300 L290 300" stroke="#C9A227" strokeWidth="0.5" />
          <path d="M150 10 L150 590" stroke="#6B1E2E" strokeWidth="0.5" />
        </svg>

        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* 3-image collage */}
            <div className="grid grid-cols-3 gap-3">
              {[
                '/images/new-arrivals/story_1.jpg',
                '/images/new-arrivals/story_2.jpg',
                '/images/new-arrivals/story_3.jpg',
              ].map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-44 w-full rounded-lg object-cover shadow-sm sm:h-56"
                />
              ))}
            </div>

            {/* Text */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                THE MAKING OF ARC LEGACY
              </p>
              <h2 className="mt-2 font-serif text-3xl text-maroon md:text-4xl leading-tight">
                New Season. Enduring Craft.
              </h2>
              <p className="mt-5 text-xs sm:text-sm leading-relaxed text-neutral-600">
                At ARC LEGACY, every piece is thoughtfully sourced and crafted with attention to detail. Our new arrivals celebrate traditional Indian craftsmanship with contemporary designs, made to add beauty and timeless elegance to your creations.
              </p>
              <Link
                to="/our-story"
                className="btn-primary mt-8 inline-flex text-xs"
              >
                DISCOVER OUR STORY →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Wholesale B2B Banner ── */}
      <section className="border-y border-neutral-200/60 bg-[#FAF4EE]">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr_1.1fr] items-center">
            {/* Left Column */}
            <div>
              <h2 className="font-serif text-3xl leading-tight text-maroon md:text-4xl">
                Stock the Latest Styles<br />Partner with ARC LEGACY
              </h2>
              <p className="mt-3 max-w-sm text-xs sm:text-sm text-neutral-600">
                Special pricing for boutiques, designers, tailors and resellers.
                Wide range, consistent quality and reliable supply.
              </p>
              <Link
                to="/wholesale"
                className="btn-primary mt-6 inline-flex px-5 py-2.5 text-xs font-semibold tracking-wider"
              >
                ENQUIRE FOR WHOLESALE →
              </Link>
            </div>

            {/* Center Image */}
            <div className="overflow-hidden rounded-lg border border-gold/30 shadow-sm">
              <img
                src="/images/new-arrivals/wholesale_center.jpg"
                alt="ARC LEGACY Bulk New Arrivals"
                className="aspect-[16/10] w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>

            {/* Right Column: 4 Badges */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  ),
                  title: 'Bulk Pricing',
                  desc: 'Competitive rates',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  ),
                  title: 'Wide Range',
                  desc: 'Latest designs',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  ),
                  title: 'Reliable Supply',
                  desc: 'Pan India Delivery',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                  title: 'Dedicated Support',
                  desc: 'For Business Enquiries',
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold bg-cream">
                    {icon}
                  </span>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-neutral-800">{title}</div>
                    <p className="text-[11px] text-neutral-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
