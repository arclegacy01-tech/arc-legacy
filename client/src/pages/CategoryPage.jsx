import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { api } from '../api/client.js';
import { useCart } from '../context/CartContext.jsx';
import CategoryFilters from '../components/CategoryFilters.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import HomeTrustStrip from '../components/home/HomeTrustStrip.jsx';
import { categoryPageContent } from '../data/categoryPages.js';
import { EMBELLISHMENTS_PRODUCTS, EMBELLISHMENT_FILTER_CONFIG } from '../data/embellishmentsData.js';
import { LATKANS_PRODUCTS, LATKANS_FAVOURITES, LATKAN_FILTER_CONFIG } from '../data/latkansData.js';
import { POM_POM_PRODUCTS, POM_POM_FILTER_CONFIG } from '../data/pomPomData.js';
import { TRIMS_BORDERS_PRODUCTS, TRIMS_BORDERS_FILTER_CONFIG } from '../data/trimsBordersData.js';
import { GOTA_PATTI_PRODUCTS, GOTA_PATTI_FILTER_CONFIG } from '../data/gotaPattiData.js';

const EMPTY_FILTERS = {
  material: [],
  style: [],
  type: [],
  color: [],
  width: [],
  usage: [],
  inStock: false,
  priceRange: null,
};

const PRICE_RANGES = [
  { label: 'Under ₹200', min: 0, max: 200 },
  { label: '₹200 – ₹350', min: 200, max: 350 },
  { label: '₹350 – ₹500', min: 350, max: 500 },
  { label: '₹500 – ₹800', min: 500, max: 800 },
  { label: 'Above ₹800', min: 800, max: 99999 },
];

/* ── Ornamental Gold Divider SVG ── */
function OrnamentalDivider({ flip = false }) {
  return (
    <svg
      viewBox="0 0 60 12"
      className={`h-3 w-12 text-gold sm:w-16 ${flip ? 'scale-x-[-1]' : ''}`}
      fill="none"
      aria-hidden="true"
    >
      <line x1="0" y1="6" x2="42" y2="6" stroke="currentColor" strokeWidth="0.9" />
      <polygon points="48,2 53,6 48,10 43,6" fill="currentColor" />
      <circle cx="57" cy="6" r="1.5" fill="currentColor" />
    </svg>
  );
}

/* ── Embellishments-only hero botanical SVG ── */
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

/* ── Embellishments Page ── */
function EmbellishmentsPage({ content }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState('featured');
  const page = Number(searchParams.get('page')) || 1;
  const ITEMS_PER_PAGE = 12;

  // Load backend products, fallback to mock data
  useEffect(() => {
    setLoading(true);
    api('/products?categorySlug=embellishments&limit=12')
      .then((data) => {
        const prods = data.products || [];
        const hasOldImages = prods.some((p) => p.images?.some((img) => img.url?.includes('product-')));
        if (prods.length >= 12 && !hasOldImages) {
          setProducts(prods);
        } else {
          setProducts(EMBELLISHMENTS_PRODUCTS);
        }
      })
      .catch(() => setProducts(EMBELLISHMENTS_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  // Apply client-side filters to mock products
  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (filters.priceRange) {
      list = list.filter((p) => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max);
    }
    if (filters.color?.length) list = list.filter((p) => filters.color.includes(p.color));
    if (filters.type?.length) list = list.filter((p) => filters.type.includes(p.type));
    if (filters.material?.length) list = list.filter((p) => filters.material.includes(p.material));
    if (filters.usage?.length) list = list.filter((p) => filters.usage.includes(p.usage));
    return list;
  }, [products, filters]);

  const totalProducts = 356;
  const totalPages = 12;
  const start = (page - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(page * ITEMS_PER_PAGE, totalProducts);

  const applyFilters = (next) => {
    setFilters(next);
    setSearchParams({});
  };

  // Pagination render with ellipsis
  const renderPagination = () => {
    const pages = [];
    const visiblePages = [1, 2, 3, 4, 5];
    visiblePages.forEach((p) => {
      pages.push(
        <button
          key={p}
          type="button"
          onClick={() => setSearchParams({ page: String(p) })}
          className={`h-9 w-9 rounded-full text-sm font-medium transition ${
            p === page
              ? 'bg-maroon text-white shadow-sm'
              : 'border border-neutral-200 bg-white text-neutral-700 hover:border-maroon hover:text-maroon'
          }`}
        >
          {p}
        </button>
      );
    });
    pages.push(<span key="ellipsis" className="px-1 text-neutral-400">…</span>);
    pages.push(
      <button
        key={totalPages}
        type="button"
        onClick={() => setSearchParams({ page: String(totalPages) })}
        className="h-9 w-9 rounded-full border border-neutral-200 bg-white text-sm text-neutral-700 hover:border-maroon hover:text-maroon"
      >
        {totalPages}
      </button>
    );
    pages.push(
      <button
        key="next"
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-maroon hover:text-maroon"
        onClick={() => setSearchParams({ page: String(page + 1) })}
        aria-label="Next page"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    );
    return pages;
  };

  return (
    <div className="bg-cream">
      {/* ── Hero ── */}
      <section className="relative min-h-[420px] overflow-hidden bg-cream md:min-h-[500px]">
        <img
          src={content.heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f1ea] from-[6%] via-[#f7f1ea]/92 via-[36%] to-transparent to-[62%]" />
        <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-full w-28 opacity-50 md:w-40" />
        <div className="relative z-10 mx-auto flex max-w-7xl items-center px-8 py-16 md:min-h-[500px] md:px-14">
          <div className="max-w-md">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-maroon/80">
              {content.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-maroon md:text-5xl">
              Little Details
              <br />
              Make Grand Creations
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600">
              {content.body}
            </p>
            <a href="#collection" className="btn-primary mt-7 inline-flex px-5 py-2.5 text-[11px] tracking-[0.14em]">
              {content.cta} →
            </a>
          </div>
        </div>
      </section>

      {/* ── Category Circles ── */}
      <section className="px-4 pb-6 pt-10">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-6 sm:grid-cols-6">
          {content.circles.map((item) => (
            <a key={item.label} href="#collection" className="group text-center">
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
            </a>
          ))}
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <HomeTrustStrip />

      {/* ── Collection Grid ── */}
      <section id="collection" className="mx-auto max-w-7xl px-4 py-10">
        {/* Breadcrumb */}
        <p className="text-xs text-neutral-500">
          <Link to="/" className="hover:text-maroon transition">Home</Link>
          <span className="mx-2 text-neutral-300">›</span>
          <span className="text-maroon font-medium">Embellishments</span>
        </p>

        {/* Collection header */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-center font-serif text-2xl text-maroon sm:text-left md:text-3xl">
            <span className="text-gold mr-2 text-lg">✦</span>
            Explore Our Embellishments Collection
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
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </div>
        </div>

        {/* Sidebar + Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* Sidebar filters */}
          <CategoryFilters
            filters={filters}
            onChange={applyFilters}
            onClear={() => applyFilters(EMPTY_FILTERS)}
            variant="embellishments"
            config={EMBELLISHMENT_FILTER_CONFIG}
          />

          {/* Product grid */}
          <div>
            {loading ? (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="aspect-square animate-pulse rounded-lg bg-neutral-100" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <EmbellishmentProductCard key={product._id} product={product} />
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
            <div className="mt-10 flex items-center justify-center gap-2">
              {renderPagination()}
            </div>
          </div>
        </div>
      </section>

      {/* ── Promo Banner ── */}
      <section className="relative mx-4 mb-2 min-h-[240px] overflow-hidden md:mx-auto md:max-w-7xl md:min-h-[280px]">
        <img src={content.promo.image} alt="" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f6efe6] via-[#f6efe6]/88 to-transparent to-[70%]" />
        <div className="relative flex min-h-[240px] flex-col justify-center px-8 py-12 md:min-h-[280px] md:px-14">
          <h2 className="max-w-md font-serif text-3xl leading-tight text-maroon md:text-4xl">
            Turn Fabric into
            <br />
            Art with Embellishments
          </h2>
          <p className="mt-3 max-w-sm text-sm text-neutral-600">{content.promo.body}</p>
          <a href="#collection" className="btn-primary mt-6 w-fit px-5 py-2.5 text-[11px] tracking-[0.14em]">
            {content.promo.cta} →
          </a>
        </div>
      </section>

      {/* ── Shop by Category ── */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-center font-serif text-3xl text-maroon">
          <span className="text-gold mr-2 text-lg">✦</span>
          Shop by Category
          <span className="text-gold ml-2 text-lg">✦</span>
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {content.occasions.map((item) => (
            <a key={item.label} href="#collection" className="group text-center">
              <div className="overflow-hidden rounded-lg border border-gold/20 shadow-sm transition duration-300 group-hover:shadow-md group-hover:border-gold/50">
                <img
                  src={item.image}
                  alt={item.label}
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-2 text-xs font-semibold text-maroon">{item.label}</div>
              <span className="text-[10px] text-neutral-400 group-hover:text-maroon transition">
                Explore Now →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Artisan Story ── */}
      <section className="relative overflow-hidden bg-white py-16">
        {/* Decorative linework */}
        <svg className="absolute right-0 top-0 h-full w-72 opacity-5 pointer-events-none" viewBox="0 0 300 600" fill="none" aria-hidden="true">
          <circle cx="150" cy="150" r="140" stroke="#6B1E2E" strokeWidth="1" />
          <circle cx="150" cy="150" r="100" stroke="#C9A227" strokeWidth="0.8" />
          <circle cx="150" cy="450" r="140" stroke="#6B1E2E" strokeWidth="1" />
          <path d="M10 300 L290 300" stroke="#C9A227" strokeWidth="0.5" />
          <path d="M150 10 L150 590" stroke="#6B1E2E" strokeWidth="0.5" />
        </svg>

        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
            {content.heritageEyebrow}
          </p>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            {/* 3-image collage */}
            <div className="grid grid-cols-3 gap-3">
              {(content.storyCollage || [content.heritageImage, content.heritageImage, content.heritageImage]).map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className={`h-40 w-full rounded-lg object-cover shadow-sm sm:h-52 ${index === 1 ? 'object-center' : 'object-center'}`}
                />
              ))}
            </div>

            {/* Text */}
            <div>
              <h2 className="font-serif text-3xl text-maroon md:text-4xl leading-tight">
                {content.heritageTitle}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-neutral-600">
                {content.heritageBody}
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
                Buying in Bulk?<br />Partner with ARC LEGACY
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
                src="/images/embellishments/wholesale_center.jpg"
                alt="ARC LEGACY Bulk Embellishments"
                className="aspect-[16/10] w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>

            {/* Right Column: 4 Badges in 2x2 */}
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
                  title: 'Wide Variety',
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
                  desc: 'Here to help',
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

/* ── Embellishment Product Card ── */
function EmbellishmentProductCard({ product }) {
  const { addItem } = useCart();
  const image = product.images?.find((i) => i.isMain)?.url || product.images?.[0]?.url || '/images/embellishments/prod_1.jpg';
  const rating = product.rating ?? 4.8;
  const [wished, setWished] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-neutral-200/80 bg-white shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/product/${product.slug}`} className="relative aspect-[4/3] overflow-hidden bg-[#FAF5EF]">
        <button
          type="button"
          className={`absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-xs transition hover:scale-110 ${wished ? 'text-maroon' : 'text-neutral-400 hover:text-maroon'}`}
          onClick={(e) => { e.preventDefault(); setWished(!wished); }}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={wished ? '0' : '1.8'} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
          <span className="text-xs font-normal text-neutral-500">/ {product.unit || 'Piece'}</span>
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
          onClick={() => addItem(product, 1)}
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

/* ── Latkans Page ── */
function LatkansPage({ content }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState('featured');
  const page = Number(searchParams.get('page')) || 1;
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    setLoading(true);
    api('/products?categorySlug=latkans&limit=12')
      .then((data) => {
        const prods = data.products || [];
        const hasOldImages = prods.some((p) => p.images?.some((img) => img.url?.includes('product-')));
        if (prods.length >= 12 && !hasOldImages) {
          setProducts(prods);
        } else {
          setProducts(LATKANS_PRODUCTS);
        }
      })
      .catch(() => setProducts(LATKANS_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (filters.priceRange) {
      list = list.filter((p) => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max);
    }
    if (filters.color?.length) list = list.filter((p) => filters.color.includes(p.color));
    if (filters.material?.length) list = list.filter((p) => filters.material.includes(p.material));
    if (filters.style?.length) list = list.filter((p) => filters.style.includes(p.style));
    if (filters.inStock !== undefined && filters.inStock !== false && filters.inStock !== null) {
      list = list.filter((p) => p.inStock === filters.inStock);
    }
    return list;
  }, [products, filters]);

  const totalProducts = 128;
  const totalPages = 5;
  const start = (page - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(page * ITEMS_PER_PAGE, totalProducts);

  const applyFilters = (next) => {
    setFilters(next);
    setSearchParams({});
  };

  const renderPagination = () => {
    const pages = [1, 2, 3, 4, 5];
    return (
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setSearchParams({ page: String(Math.max(1, page - 1)) })}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-xs text-neutral-600 hover:border-maroon hover:text-maroon"
          aria-label="Previous page"
        >
          ‹
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setSearchParams({ page: String(p) })}
            className={`h-8 w-8 rounded-full text-xs font-medium transition ${
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
          onClick={() => setSearchParams({ page: String(Math.min(totalPages, page + 1)) })}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-xs text-neutral-600 hover:border-maroon hover:text-maroon"
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
          src={content.heroImage}
          alt="Latkans for Every Creation"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f1ea] from-[10%] via-[#f7f1ea]/92 via-[40%] to-transparent to-[65%]" />
        <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-full w-28 opacity-40 md:w-36" />
        <div className="relative z-10 mx-auto flex max-w-7xl items-center px-8 py-14 md:min-h-[460px] md:px-14">
          <div className="max-w-md">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-maroon/80">
              {content.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-maroon md:text-5xl">
              Latkans for
              <br />
              Every Creation
            </h1>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-neutral-600 sm:text-sm">
              {content.body}
            </p>
            <a href="#collection" className="btn-primary mt-7 inline-flex px-5 py-2.5 text-[11px] tracking-[0.14em]">
              {content.cta} →
            </a>
          </div>
        </div>
      </section>

      {/* ── Category Circles ── */}
      <section className="px-4 pb-6 pt-10">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-6 sm:grid-cols-6">
          {content.circles.map((item) => (
            <a key={item.label} href="#collection" className="group text-center">
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
            </a>
          ))}
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <HomeTrustStrip />

      {/* ── Collection Grid ── */}
      <section id="collection" className="mx-auto max-w-7xl px-4 py-10">
        {/* Breadcrumb */}
        <p className="text-xs text-neutral-500">
          <Link to="/" className="hover:text-maroon transition">Home</Link>
          <span className="mx-2 text-neutral-300">›</span>
          <span className="text-maroon font-medium">Latkans</span>
        </p>

        {/* Collection header */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-center font-serif text-2xl text-maroon sm:text-left md:text-3xl">
            <span className="text-gold mr-2 text-lg">✦</span>
            Explore Our Latkan Collection
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
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
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
            variant="latkans"
            config={LATKAN_FILTER_CONFIG}
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
                  <LatkanProductCard key={product._id} product={product} />
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
      <section className="relative mx-4 mb-2 min-h-[220px] overflow-hidden md:mx-auto md:max-w-7xl md:min-h-[260px]">
        <img
          src={content.promo.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f6efe6] via-[#f6efe6]/88 to-transparent to-[70%]" />
        <div className="relative flex min-h-[220px] flex-col justify-center px-8 py-10 md:min-h-[260px] md:px-14">
          <h2 className="max-w-md font-serif text-3xl leading-tight text-maroon md:text-4xl">
            The Perfect
            <br />
            Finishing Touch
          </h2>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-neutral-600 sm:text-sm">
            {content.promo.body}
          </p>
          <a href="#collection" className="btn-primary mt-6 w-fit px-5 py-2.5 text-[11px] tracking-[0.14em]">
            {content.promo.cta} →
          </a>
        </div>
      </section>

      {/* ── Bridal & Festive Favourites ── */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex items-center justify-between">
          <div className="w-full text-center">
            <h2 className="font-serif text-2xl text-maroon sm:text-3xl">
              <span className="text-gold mr-2 text-lg">✦</span>
              Bridal & Festive Favourites
              <span className="text-gold ml-2 text-lg">✦</span>
            </h2>
          </div>
          <a href="#collection" className="hidden shrink-0 text-xs font-medium text-maroon hover:underline sm:inline-block">
            View All →
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {LATKANS_FAVOURITES.map((item) => (
            <article key={item._id} className="group flex flex-col overflow-hidden rounded-md border border-neutral-200/80 bg-white shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
              <Link to={`/product/${item.slug}`} className="relative aspect-[4/3] overflow-hidden bg-[#FAF5EF]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col p-3">
                <Link to={`/product/${item.slug}`} className="truncate text-xs font-semibold text-neutral-800 hover:text-maroon sm:text-sm">
                  {item.title}
                </Link>
                <div className="mt-1 text-xs sm:text-sm font-bold text-maroon">
                  ₹{item.price}{' '}
                  <span className="text-xs font-normal text-neutral-500">/ {item.unit}</span>
                </div>
                {/* Rating */}
                <div className="mt-1 flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                          fill="#C9A227"
                          stroke="#C9A227"
                          strokeWidth="1"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[10px] text-neutral-500">({item.rating})</span>
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
              {(content.storyCollage || []).map((src) => (
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
                {content.heritageEyebrow}
              </p>
              <h2 className="mt-2 font-serif text-3xl text-maroon md:text-4xl leading-tight">
                {content.heritageTitle}
              </h2>
              <p className="mt-5 text-xs sm:text-sm leading-relaxed text-neutral-600">
                {content.heritageBody}
              </p>
              <Link
                to="/our-story"
                className="btn-primary mt-8 inline-flex text-xs"
              >
                EXPLORE OUR STORY →
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
                Buying in Bulk?<br />Partner with ARC LEGACY
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
                src="/images/latkans/wholesale_center.jpg"
                alt="ARC LEGACY Bulk Latkans"
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

/* ── Latkan Product Card ── */
function LatkanProductCard({ product }) {
  const { addItem } = useCart();
  const image = product.images?.find((i) => i.isMain)?.url || product.images?.[0]?.url || '/images/latkans/prod_1.jpg';
  const rating = product.rating ?? 4.8;
  const [wished, setWished] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-neutral-200/80 bg-white shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/product/${product.slug}`} className="relative aspect-[4/3] overflow-hidden bg-[#FAF5EF]">
        <button
          type="button"
          className={`absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-xs transition hover:scale-110 ${wished ? 'text-maroon' : 'text-neutral-400 hover:text-maroon'}`}
          onClick={(e) => { e.preventDefault(); setWished(!wished); }}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={wished ? '0' : '1.8'} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
          <span className="text-xs font-normal text-neutral-500">/ {product.unit || 'Pair'}</span>
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
          onClick={() => addItem(product, 1)}
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

/* ── Pom Pom Trims Page ── */
function PomPomPage({ content }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState('featured');
  const page = Number(searchParams.get('page')) || 1;
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    setLoading(true);
    api('/products?categorySlug=pom-pom-trims&limit=12')
      .then((data) => {
        const prods = data.products || [];
        const hasOldImages = prods.some((p) => p.images?.some((img) => img.url?.includes('product-')));
        if (prods.length >= 12 && !hasOldImages) {
          setProducts(prods);
        } else {
          setProducts(POM_POM_PRODUCTS);
        }
      })
      .catch(() => setProducts(POM_POM_PRODUCTS))
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
    if (filters.style?.length) list = list.filter((p) => filters.style.includes(p.style));
    if (filters.inStock !== undefined && filters.inStock !== false && filters.inStock !== null) {
      list = list.filter((p) => p.inStock === filters.inStock);
    }
    return list;
  }, [products, filters]);

  const totalProducts = 186;
  const totalPages = 8;
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
          src={content.heroImage}
          alt="Pom Pom Trims for Every Creation"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f1ea] from-[8%] via-[#f7f1ea]/92 via-[38%] to-transparent to-[65%]" />
        <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-full w-28 opacity-45 md:w-36" />
        <div className="relative z-10 mx-auto flex max-w-7xl items-center px-8 py-14 md:min-h-[460px] md:px-14">
          <div className="max-w-md">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              {content.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-maroon md:text-5xl">
              Pom Pom Trims
              <br />
              for Every Creation
            </h1>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-neutral-600 sm:text-sm">
              {content.body}
            </p>
            <a href="#collection" className="btn-primary mt-7 inline-flex px-5 py-2.5 text-[11px] tracking-[0.14em]">
              {content.cta} →
            </a>
          </div>
        </div>
      </section>

      {/* ── Category Circles ── */}
      <section className="px-4 pb-6 pt-10">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-6 sm:grid-cols-6">
          {content.circles.map((item) => (
            <a key={item.label} href="#collection" className="group text-center">
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
            </a>
          ))}
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <HomeTrustStrip />

      {/* ── Collection Grid ── */}
      <section id="collection" className="mx-auto max-w-7xl px-4 py-10">
        {/* Breadcrumb */}
        <p className="text-xs text-neutral-500">
          <Link to="/" className="hover:text-maroon transition">Home</Link>
          <span className="mx-2 text-neutral-300">›</span>
          <span className="text-maroon font-medium">Pom Pom Trims</span>
        </p>

        {/* Collection header */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-center font-serif text-2xl text-maroon sm:text-left md:text-3xl">
            <span className="text-gold mr-2 text-lg">✦</span>
            Explore Our Pom Pom Trim Collection
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
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
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
            variant="pom-pom-trims"
            config={POM_POM_FILTER_CONFIG}
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
                  <LatkanProductCard key={product._id} product={product} />
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
      <section className="relative mx-4 mb-2 min-h-[220px] overflow-hidden md:mx-auto md:max-w-7xl md:min-h-[260px]">
        <img
          src={content.promo.image}
          alt="A Pop of Colour. A Touch of Tradition."
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f6efe6] via-[#f6efe6]/88 to-transparent to-[70%]" />
        <div className="relative flex min-h-[220px] flex-col justify-center px-8 py-10 md:min-h-[260px] md:px-14">
          <h2 className="max-w-md font-serif text-3xl leading-tight text-maroon md:text-4xl">
            A Pop of Colour.
            <br />
            A Touch of Tradition.
          </h2>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-neutral-600 sm:text-sm">
            {content.promo.body}
          </p>
          <a href="#collection" className="btn-primary mt-6 w-fit px-5 py-2.5 text-[11px] tracking-[0.14em]">
            {content.promo.cta} →
          </a>
        </div>
      </section>

      {/* ── Made for Every Creation ── */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-center font-serif text-2xl text-maroon sm:text-3xl">
          <span className="text-gold mr-2 text-lg">✦</span>
          Made for Every Creation
          <span className="text-gold ml-2 text-lg">✦</span>
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {content.occasions.map((item) => (
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
              {(content.storyCollage || []).map((src) => (
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
                {content.heritageEyebrow}
              </p>
              <h2 className="mt-2 font-serif text-3xl text-maroon md:text-4xl leading-tight">
                Thoughtfully Selected.
                <br />
                Beautifully Finished.
              </h2>
              <p className="mt-5 text-xs sm:text-sm leading-relaxed text-neutral-600">
                {content.heritageBody}
              </p>
              <Link
                to="/our-story"
                className="btn-primary mt-8 inline-flex text-xs"
              >
                EXPLORE OUR CRAFT →
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
                Buying in Bulk?<br />Partner with ARC LEGACY
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
                src="/images/pom-pom-trims/wholesale_center.jpg"
                alt="ARC LEGACY Bulk Pom Pom Trims"
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

/* ── Dedicated Trims & Borders Category Page ── */
function TrimsBordersPage({ content }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(TRIMS_BORDERS_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState('featured');

  const page = Number(searchParams.get('page')) || 1;
  const ITEMS_PER_PAGE = 24;

  useEffect(() => {
    setLoading(true);
    api('/products?categorySlug=trims-borders&limit=48')
      .then((data) => {
        if (data.products && data.products.length >= 12) {
          setProducts(data.products);
        } else {
          setProducts(TRIMS_BORDERS_PRODUCTS);
        }
      })
      .catch(() => setProducts(TRIMS_BORDERS_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (filters.priceRange) {
      list = list.filter((p) => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max);
    }
    if (filters.color?.length) {
      list = list.filter((p) => (p.colors || [p.color]).some((c) => filters.color.includes(c)));
    }
    if (filters.type?.length) {
      list = list.filter((p) => filters.type.includes(p.type));
    }
    if (filters.material?.length) {
      list = list.filter((p) => {
        const mats = Array.isArray(p.material) ? p.material : [p.material];
        return mats.some((m) => filters.material.includes(m));
      });
    }
    if (filters.usage?.length) {
      list = list.filter((p) => (p.usage || []).some((u) => filters.usage.includes(u)));
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, filters, sort]);

  const totalProducts = 312;
  const totalPages = 13;
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
          src={content.heroImage}
          alt="Elegant Borders for Every Creation"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f1ea] from-[8%] via-[#f7f1ea]/92 via-[38%] to-transparent to-[65%]" />
        <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-full w-28 opacity-45 md:w-36" />
        <div className="relative z-10 mx-auto flex max-w-7xl items-center px-8 py-14 md:min-h-[460px] md:px-14">
          <div className="max-w-md">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              {content.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-maroon md:text-5xl">
              Elegant Borders
              <br />
              for Every Creation
            </h1>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-neutral-600 sm:text-sm">
              {content.body}
            </p>
            <a href="#collection" className="btn-primary mt-7 inline-flex px-5 py-2.5 text-[11px] tracking-[0.14em]">
              {content.cta} →
            </a>
          </div>
        </div>
      </section>

      {/* ── 6 Circular Subcategories ── */}
      <section className="px-4 pb-5 pt-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {content.circles.map((item) => (
            <a key={item.label} href="#collection" className="group text-center">
              <div className="mx-auto aspect-square w-[105px] overflow-hidden rounded-full border-2 border-gold/40 shadow-md transition-transform duration-300 group-hover:scale-105 sm:w-[118px]">
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="mt-3 text-[11px] font-bold uppercase tracking-wider text-maroon">
                {item.label}
              </div>
              <span className="mt-0.5 inline-block text-[11px] text-neutral-500 group-hover:text-maroon">
                Shop Now →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <HomeTrustStrip />

      {/* ── Main Collection Grid with Sidebar Filters ── */}
      <section id="collection" className="mx-auto max-w-7xl px-4 py-10">
        {/* Breadcrumb */}
        <p className="text-xs text-neutral-500">
          <Link to="/" className="hover:text-maroon">Home</Link>
          <span className="mx-1.5">›</span>
          <span className="font-medium text-neutral-700">Trims &amp; Borders</span>
        </p>

        {/* Centered Ornamental Heading + Right Sort Bar */}
        <div className="mt-3 flex flex-col items-center justify-between gap-4 border-b border-neutral-200/80 pb-5 lg:flex-row">
          <div className="hidden lg:block lg:w-48" />
          <div className="flex items-center gap-3 text-center">
            <OrnamentalDivider />
            <h2 className="font-serif text-2xl text-maroon sm:text-3xl md:text-[32px]">
              Trims &amp; Borders Collection
            </h2>
            <OrnamentalDivider flip />
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
            <span>Showing {start}–{end} of {totalProducts} products</span>
            <label className="flex items-center gap-1.5">
              <span className="text-neutral-600">Sort by:</span>
              <select
                className="rounded border border-neutral-300 bg-white px-2.5 py-1 text-xs font-medium text-neutral-800 focus:border-maroon focus:outline-none"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setSearchParams({});
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>

        {/* Sidebar + 4-Col Product Grid */}
        <div className="mt-7 grid gap-8 lg:grid-cols-[220px_1fr]">
          <CategoryFilters
            filters={filters}
            onChange={applyFilters}
            onClear={() => applyFilters(EMPTY_FILTERS)}
            config={TRIMS_BORDERS_FILTER_CONFIG}
          />

          <div>
            {loading ? (
              <p className="py-20 text-center text-neutral-500">Loading products…</p>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.slice(0, 12).map((product) => (
                  <EmbellishmentProductCard key={product._id || product.slug} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-10 flex justify-center">
              {renderPagination()}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mid-page Promo Banner ("Borders that Complete the Look") ── */}
      <section className="relative overflow-hidden bg-cream">
        <div className="relative mx-auto max-w-7xl overflow-hidden">
          <img
            src={content.promo.image}
            alt="Borders that Complete the Look"
            className="h-[260px] w-full object-cover object-right md:h-[310px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f1ea] from-[20%] via-[#f7f1ea]/90 via-[48%] to-transparent to-[75%]" />
          <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-full w-24 opacity-45" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14">
            <h2 className="max-w-md font-serif text-3xl leading-[1.15] text-maroon md:text-4xl">
              Borders that
              <br />
              Complete the Look
            </h2>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-neutral-600 sm:text-sm">
              {content.promo.body}
            </p>
            <a
              href="#collection"
              className="btn-primary mt-5 w-fit px-5 py-2.5 text-[11px] tracking-[0.14em]"
            >
              {content.promo.cta} →
            </a>
          </div>
        </div>
      </section>

      {/* ── Shop by Style (6 Overlay Cards) ── */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-center gap-3">
          <OrnamentalDivider />
          <h2 className="text-center font-serif text-2xl text-maroon md:text-3xl">
            Shop by Style
          </h2>
          <OrnamentalDivider flip />
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
          {(content.stylesShowcase || []).map((item) => (
            <a
              key={item.label}
              href="#collection"
              className="group relative aspect-[4/4.3] overflow-hidden rounded-lg border border-gold/30 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.label.replace('\n', ' ')}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E0A0C]/90 via-[#1E0A0C]/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                <div className="whitespace-pre-line font-serif text-sm font-medium leading-snug sm:text-base">
                  {item.label}
                </div>
                <span className="mt-1 inline-block text-[11px] text-white/85 group-hover:text-gold-light">
                  Shop Now →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Our Trims in Real Creations ── */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid items-stretch gap-3.5 lg:grid-cols-[260px_1fr]">
          {/* Left Title Panel */}
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg bg-[#F5EFE6] px-6 py-10 text-center">
            <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-full w-24 opacity-45" />
            <h2 className="relative z-10 font-serif text-2xl leading-snug text-maroon md:text-[28px]">
              Our Trims in
              <br />
              Real Creations
            </h2>
            <div className="relative z-10 mt-3">
              <OrnamentalDivider />
            </div>
          </div>

          {/* Right 5-Image Carousel Strip */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {(content.realCreations || []).map((item) => (
                <a
                  key={item.label}
                  href="#collection"
                  className="group relative aspect-[4/4.6] overflow-hidden rounded-lg border border-neutral-200/80 bg-[#FAF5EF] shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </a>
              ))}
            </div>
            {/* Left & Right Carousel Buttons */}
            <button
              type="button"
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Previous creation"
              className="absolute -left-3.5 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-maroon shadow-md transition hover:bg-maroon hover:text-white lg:flex"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Next creation"
              className="absolute -right-3.5 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-maroon shadow-md transition hover:bg-maroon hover:text-white lg:flex"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* ── Bottom 4 Feature Highlights Strip ── */}
      <section className="relative overflow-hidden border-t border-neutral-200/70 bg-[#F7F1E8]">
        <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-full w-20 opacity-35" />
        <BotanicalLineart className="pointer-events-none absolute right-0 top-0 h-full w-20 -scale-x-100 opacity-35" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-6">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:divide-x lg:divide-neutral-300/70">
            {[
              {
                title: 'Wide Variety',
                sub: '1000+ Designs',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ),
              },
              {
                title: 'Custom Orders',
                sub: 'Available',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="13" y2="17" />
                  </svg>
                ),
              },
              {
                title: 'Wholesale Pricing',
                sub: 'For Boutiques & Designers',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="12" width="7" height="8" rx="1" />
                    <rect x="14" y="12" width="7" height="8" rx="1" />
                    <rect x="8.5" y="4" width="7" height="8" rx="1" />
                  </svg>
                ),
              },
              {
                title: 'Fast Dispatch',
                sub: 'Across India',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                ),
              },
            ].map((b, i) => (
              <div key={b.title} className={`flex items-center gap-3.5 ${i > 0 ? 'lg:pl-6' : ''}`}>
                <div className="shrink-0">{b.icon}</div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 sm:text-sm">{b.title}</div>
                  <div className="text-[11px] text-neutral-600">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Dedicated Gota Patti Category Page ── */
function GotaPattiPage({ content }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(GOTA_PATTI_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState('featured');

  const page = Number(searchParams.get('page')) || 1;
  const ITEMS_PER_PAGE = 24;

  useEffect(() => {
    setLoading(true);
    api('/products?categorySlug=gota-patti&limit=48')
      .then((data) => {
        const prods = data.products || [];
        const hasOldImages = prods.some((p) => p.images?.some((img) => img.url?.includes('product-')));
        if (prods.length >= 12 && !hasOldImages) {
          setProducts(prods);
        } else {
          setProducts(GOTA_PATTI_PRODUCTS);
        }
      })
      .catch(() => setProducts(GOTA_PATTI_PRODUCTS))
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
    if (filters.style?.length) list = list.filter((p) => filters.style.includes(p.style));
    if (filters.inStock !== undefined && filters.inStock !== false && filters.inStock !== null) {
      list = list.filter((p) => p.inStock === filters.inStock);
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, filters, sort]);

  const totalProducts = 186;
  const totalPages = 8;
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
          src={content.heroImage}
          alt="A Golden Touch for Every Creation"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f1ea] from-[8%] via-[#f7f1ea]/92 via-[38%] to-transparent to-[65%]" />
        <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-full w-28 opacity-45 md:w-36" />
        <div className="relative z-10 mx-auto flex max-w-7xl items-center px-8 py-14 md:min-h-[460px] md:px-14">
          <div className="max-w-md">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              {content.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-maroon md:text-5xl">
              A Golden Touch
              <br />
              for Every Creation
            </h1>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-neutral-600 sm:text-sm">
              {content.body}
            </p>
            <a href="#collection" className="btn-primary mt-7 inline-flex px-5 py-2.5 text-[11px] tracking-[0.14em]">
              {content.cta} →
            </a>
          </div>
        </div>
      </section>

      {/* ── 6 Circular Subcategories ── */}
      <section className="px-4 pb-5 pt-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {content.circles.map((item) => (
            <a key={item.label} href="#collection" className="group text-center">
              <div className="mx-auto aspect-square w-[105px] overflow-hidden rounded-full border-2 border-gold/40 shadow-md transition-transform duration-300 group-hover:scale-105 sm:w-[118px]">
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="mt-3 text-[11px] font-bold uppercase tracking-wider text-maroon">
                {item.label}
              </div>
              <span className="mt-0.5 inline-block text-[11px] text-neutral-500 group-hover:text-maroon">
                Shop Now →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <HomeTrustStrip />

      {/* ── Main Collection Grid with Sidebar Filters ── */}
      <section id="collection" className="mx-auto max-w-7xl px-4 py-10">
        {/* Breadcrumb */}
        <p className="text-xs text-neutral-500">
          <Link to="/" className="hover:text-maroon">Home</Link>
          <span className="mx-1.5">›</span>
          <span className="font-medium text-neutral-700">Gota Patti</span>
        </p>

        {/* Centered Ornamental Heading + Right Sort Bar */}
        <div className="mt-3 flex flex-col items-center justify-between gap-4 border-b border-neutral-200/80 pb-5 lg:flex-row">
          <div className="hidden lg:block lg:w-48" />
          <div className="flex items-center gap-3 text-center">
            <OrnamentalDivider />
            <h2 className="font-serif text-2xl text-maroon sm:text-3xl md:text-[32px]">
              Explore Our Gota Patti Collection
            </h2>
            <OrnamentalDivider flip />
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
            <span>Showing {start}–{end} of {totalProducts} products</span>
            <label className="flex items-center gap-1.5">
              <span className="text-neutral-600">Sort by:</span>
              <select
                className="rounded border border-neutral-300 bg-white px-2.5 py-1 text-xs font-medium text-neutral-800 focus:border-maroon focus:outline-none"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setSearchParams({});
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>

        {/* Sidebar + 4-Col Product Grid */}
        <div className="mt-7 grid gap-8 lg:grid-cols-[220px_1fr]">
          <CategoryFilters
            filters={filters}
            onChange={applyFilters}
            onClear={() => applyFilters(EMPTY_FILTERS)}
            config={GOTA_PATTI_FILTER_CONFIG}
          />

          <div>
            {loading ? (
              <p className="py-20 text-center text-neutral-500">Loading products…</p>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.slice(0, 12).map((product) => (
                  <EmbellishmentProductCard key={product._id || product.slug} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-10 flex justify-center">
              {renderPagination()}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mid-page Promo Banner ("Tradition, Woven in Gold") ── */}
      <section className="relative overflow-hidden bg-cream">
        <div className="relative mx-auto max-w-7xl overflow-hidden">
          <img
            src={content.promo.image}
            alt="Tradition, Woven in Gold"
            className="h-[260px] w-full object-cover object-right md:h-[310px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f1ea] from-[20%] via-[#f7f1ea]/90 via-[48%] to-transparent to-[75%]" />
          <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-full w-24 opacity-45" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14">
            <h2 className="max-w-md font-serif text-3xl leading-[1.15] text-maroon md:text-4xl">
              Tradition,
              <br />
              Woven in Gold
            </h2>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-neutral-600 sm:text-sm">
              {content.promo.body}
            </p>
            <a
              href="#collection"
              className="btn-primary mt-5 w-fit px-5 py-2.5 text-[11px] tracking-[0.14em]"
            >
              {content.promo.cta} →
            </a>
          </div>
        </div>
      </section>

      {/* ── Made for Every Celebration ── */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-center gap-3">
          <OrnamentalDivider />
          <h2 className="text-center font-serif text-2xl text-maroon md:text-3xl">
            Made for Every Celebration
          </h2>
          <OrnamentalDivider flip />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {content.occasions.map((item) => (
            <a key={item.label} href="#collection" className="group relative">
              <div className="relative overflow-hidden rounded-md border border-gold/25 shadow-xs transition duration-300 group-hover:shadow-md">
                <img
                  src={item.image}
                  alt={item.label}
                  className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-maroon shadow-xs">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
                  </svg>
                </span>
              </div>
              <div className="mt-2.5 font-serif text-sm font-semibold text-maroon">{item.label}</div>
              <span className="text-[11px] text-neutral-500 transition group-hover:text-maroon">
                Explore Now →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── The Art of Gota Patti (3-Image Collage + Editorial Block) ── */}
      <section className="relative overflow-hidden bg-white py-14">
        <svg className="pointer-events-none absolute right-0 top-0 h-full w-72 opacity-5" viewBox="0 0 300 600" fill="none" aria-hidden="true">
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
              {(content.storyCollage || []).map((src) => (
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
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                {content.heritageEyebrow}
              </p>
              <h2 className="mt-2 font-serif text-3xl leading-tight text-maroon md:text-4xl">
                {content.heritageTitle}
              </h2>
              <p className="mt-4 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                {content.heritageBody}
              </p>
              <Link
                to="/our-story"
                className="btn-primary mt-7 inline-flex px-5 py-2.5 text-xs tracking-wider"
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
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr_1.1fr]">
            {/* Left Column */}
            <div>
              <h2 className="font-serif text-3xl leading-tight text-maroon md:text-4xl">
                Buying in Bulk?<br />Partner with ARC LEGACY
              </h2>
              <p className="mt-3 max-w-sm text-xs text-neutral-600 sm:text-sm">
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
                src="/images/home-mfg-shelves.jpg"
                alt="ARC LEGACY Bulk Gota Patti"
                className="aspect-[16/10] w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>

            {/* Right Column: 4 Badges */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  ),
                  title: 'Bulk Pricing',
                  desc: 'Competitive Rates',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  ),
                  title: 'Wide Range',
                  desc: 'Latest Designs',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  ),
                  title: 'Reliable Supply',
                  desc: 'Pan India Delivery',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-cream text-gold">
                    {icon}
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-neutral-800 sm:text-sm">{title}</div>
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

/* ── Generic Category Page (unchanged for other slugs) ── */
function GenericCategoryPage({ slug, content }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState('featured');

  const page = Number(searchParams.get('page')) || 1;

  const queryString = useMemo(() => {
    const q = new URLSearchParams();
    q.set('categorySlug', slug);
    q.set('page', String(page));
    q.set('limit', '9');
    q.set('sort', sort);
    if (filters.inStock) q.set('inStock', 'true');
    if (filters.priceRange) {
      q.set('minPrice', String(filters.priceRange.min));
      q.set('maxPrice', String(filters.priceRange.max));
    }
    if (filters.material?.length) q.set('material', filters.material.join(','));
    if (filters.style?.length) q.set('style', filters.style.join(','));
    if (filters.color?.length) q.set('color', filters.color.join(','));
    return q.toString();
  }, [slug, page, filters, sort]);

  useEffect(() => {
    setFilters(EMPTY_FILTERS);
    setSort('featured');
    setSearchParams({}, { replace: true });
    api(`/categories/${slug}`)
      .then((data) => setCategoryName(data.category?.name || ''))
      .catch(() => setCategoryName(''));
    api(`/products?categorySlug=${slug}&limit=48`)
      .then((data) => setCatalog(data.products || []))
      .catch(() => setCatalog([]));
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    api(`/products?${queryString}`)
      .then((data) => {
        setProducts(data.products);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }, [queryString]);

  const counts = useMemo(() => {
    const price = {};
    const material = {};
    const style = {};
    for (const range of PRICE_RANGES) {
      price[range.label] = catalog.filter((p) => p.price >= range.min && p.price <= range.max).length;
    }
    for (const product of catalog) {
      for (const item of product.material || []) material[item] = (material[item] || 0) + 1;
      for (const item of product.styles || []) style[item] = (style[item] || 0) + 1;
    }
    return { price, material, style };
  }, [catalog]);

  const label = categoryName || content.eyebrow.replace(/^Premium\s/i, '');
  const start = pagination.total ? (pagination.page - 1) * 9 + 1 : 0;
  const end = pagination.total ? Math.min(pagination.page * 9, pagination.total) : 0;

  const applyFilters = (next) => {
    setFilters(next);
    setSearchParams({});
  };

  return (
    <div className="bg-cream">
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-maroon/80">{content.eyebrow}</p>
            <h1 className="mt-3 font-display text-5xl leading-[1.05] text-maroon md:text-6xl">{content.title}</h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-700">{content.body}</p>
            <a href="#collection" className="btn-primary mt-8 inline-flex text-xs tracking-widest">
              {content.cta} →
            </a>
          </div>
          <img src={content.heroImage} alt="" className="aspect-[5/4] w-full rounded-sm object-cover" />
        </div>
      </section>

      <section className="px-4 pb-4 pt-6">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {content.circles.map((item) => (
            <a key={item.label} href="#collection" className="group text-center">
              <div className="mx-auto aspect-square w-[92px] overflow-hidden rounded-full border border-gold/40 shadow-sm sm:w-[108px]">
                <img src={item.image} alt={item.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              </div>
              <div className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-maroon">{item.label}</div>
              <span className="mt-1 inline-block text-[11px] text-neutral-500 group-hover:text-maroon">Shop Now →</span>
            </a>
          ))}
        </div>
      </section>

      <HomeTrustStrip />

      <section id="collection" className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-sm text-neutral-500">
          <Link to="/" className="hover:text-maroon">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-maroon">{label}</span>
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-serif text-3xl italic text-maroon md:text-4xl">Explore Our {label}</h2>
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
            <span>Showing {start}–{end} of {pagination.total || 0} products</span>
            <label className="flex items-center gap-2">
              Sort by
              <select className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-sm" value={sort} onChange={(e) => { setSort(e.target.value); setSearchParams({}); }}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
          <CategoryFilters filters={filters} counts={counts} onChange={applyFilters} onClear={() => applyFilters(EMPTY_FILTERS)} />
          <div>
            {loading ? (
              <p className="py-20 text-center text-neutral-500">Loading products…</p>
            ) : (
              <ProductGrid products={products} columns={3} variant="home" />
            )}
            {pagination.pages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button type="button" className="h-9 w-9 rounded-full border border-neutral-200 bg-white" disabled={page <= 1} onClick={() => setSearchParams({ page: String(page - 1) })} aria-label="Previous page">‹</button>
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                  <button key={p} type="button" onClick={() => setSearchParams({ page: String(p) })} className={`h-9 w-9 rounded-full text-sm ${p === pagination.page ? 'bg-maroon text-white' : 'border border-neutral-200 bg-white'}`}>{p}</button>
                ))}
                <button type="button" className="h-9 w-9 rounded-full border border-neutral-200 bg-white" disabled={page >= pagination.pages} onClick={() => setSearchParams({ page: String(page + 1) })} aria-label="Next page">›</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative mx-4 mb-4 overflow-hidden md:mx-auto md:max-w-7xl">
        <img src={content.promo.image} alt="" className="aspect-[21/9] w-full object-cover md:aspect-[3/1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14">
          <p className="text-xs uppercase tracking-[0.25em] text-maroon/80">{content.promo.eyebrow}</p>
          <h2 className="mt-2 max-w-md font-serif text-3xl text-maroon md:text-4xl">{content.promo.title}</h2>
          <p className="mt-3 max-w-md text-sm text-neutral-700">{content.promo.body}</p>
          <a href="#collection" className="btn-primary mt-6 w-fit text-xs">{content.promo.cta} →</a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-center font-serif text-3xl italic text-maroon">Made for Every Celebration</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {content.occasions.map((item) => (
            <a key={item.label} href="#collection" className="group text-center">
              <img src={item.image} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
              <div className="mt-3 text-sm font-medium text-maroon">{item.label}</div>
              <span className="text-xs text-neutral-500 group-hover:text-maroon">Explore Now →</span>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
          <img src={content.heritageImage} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{content.heritageEyebrow}</p>
            <h2 className="mt-2 font-serif text-3xl text-maroon md:text-4xl">{content.heritageTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">{content.heritageBody}</p>
            <Link to="/our-story" className="btn-primary mt-8 inline-flex text-xs">Discover Our Story →</Link>
          </div>
        </div>
      </section>

      <section className="bg-maroon text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-serif text-3xl">Buying in Bulk? Partner with ARC LEGACY</h2>
            <p className="mt-3 max-w-xl text-sm text-white/80">Special pricing for boutiques, designers, fashion and resellers. Wide range, consistent quality and reliable dispatch.</p>
            <Link to="/wholesale" className="btn-outline mt-6 inline-flex border-gold-light text-xs text-gold-light hover:bg-gold-light hover:text-maroon">Enquire for Wholesale</Link>
          </div>
          <div className="grid gap-4 text-sm sm:grid-cols-3">
            <div><div className="font-medium text-gold-light">Bulk Pricing</div><p className="mt-1 text-white/75">Competitive rates for larger orders.</p></div>
            <div><div className="font-medium text-gold-light">Reliable Supply</div><p className="mt-1 text-white/75">Repeat designs kept consistent.</p></div>
            <div><div className="font-medium text-gold-light">Wide Range</div><p className="mt-1 text-white/75">Laces, trims and latkans together.</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Route Entry Point ── */
export default function CategoryPage() {
  const { slug } = useParams();
  const [categoryName, setCategoryName] = useState('');
  const content = categoryPageContent(slug, categoryName);

  useEffect(() => {
    api(`/categories/${slug}`)
      .then((data) => setCategoryName(data.category?.name || ''))
      .catch(() => setCategoryName(''));
  }, [slug]);

  if (slug === 'embellishments') {
    return <EmbellishmentsPage content={content} />;
  }
  if (slug === 'latkans') {
    return <LatkansPage content={content} />;
  }
  if (slug === 'pom-pom-trims') {
    return <PomPomPage content={content} />;
  }
  if (slug === 'trims-borders') {
    return <TrimsBordersPage content={content} />;
  }
  if (slug === 'gota-patti') {
    return <GotaPattiPage content={content} />;
  }
  return <GenericCategoryPage slug={slug} content={content} />;
}
