import { useState } from 'react';
import { Link } from 'react-router-dom';
import WholesaleEnquiryForm from '../components/WholesaleEnquiryForm.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import {
  WHOLESALE_CATEGORIES,
  WHOLESALE_TRENDING_PRODUCTS,
  WHOLESALE_GALLERY,
} from '../data/wholesaleData.js';

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
    </svg>
  );
}

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

function WholesaleProductCard({ product, onEnquire }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wished = isWishlisted(product._id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200/80 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3.3] w-full overflow-hidden bg-[#FAF5EF]">
        <Link to={`/product/${product.slug}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label="Add to Wishlist"
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-maroon shadow-sm transition hover:bg-white"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill={wished ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between p-2.5">
        <div>
          <Link
            to={`/product/${product.slug}`}
            className="line-clamp-1 text-xs font-semibold text-neutral-900 hover:text-maroon"
          >
            {product.title}
          </Link>
          <p className="mt-1 text-xs font-bold text-maroon">
            ₹{product.price}{' '}
            <span className="font-normal text-neutral-600">/ {product.unit}</span>
          </p>
          <p className="text-[10px] text-neutral-500">(Wholesale Price)</p>
        </div>

        <button
          type="button"
          onClick={() => onEnquire(product)}
          className="mt-2.5 flex w-full items-center justify-center gap-1 rounded bg-maroon py-1.5 text-[11px] font-medium text-white transition hover:bg-maroon-dark active:scale-[0.99]"
        >
          Enquire Now →
        </button>
      </div>
    </article>
  );
}

export default function WholesalePage() {
  const [enquiryModalProduct, setEnquiryModalProduct] = useState(null);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [wishedCats, setWishedCats] = useState({});

  const openEnquiry = (product = null) => {
    setEnquiryModalProduct(product);
    setShowEnquiryModal(true);
  };

  return (
    <div className="bg-cream">
      {/* ── Hero Banner ── */}
      <section className="relative min-h-[380px] overflow-hidden bg-cream md:min-h-[450px]">
        <img
          src="/images/wholesale/hero_bg.jpg"
          alt="Premium Trims for Your Business"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f1ea] from-[10%] via-[#f7f1ea]/92 via-[40%] to-transparent to-[68%]" />
        <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-full w-28 opacity-45 md:w-36" />
        <div className="relative z-10 mx-auto flex max-w-7xl items-center px-8 py-14 md:min-h-[450px] md:px-14">
          <div className="max-w-md">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              WHOLESALE COLLECTION
            </p>
            <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-maroon md:text-5xl">
              Premium Trims
              <br />
              for Your Business
            </h1>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-neutral-600 sm:text-sm">
              High-quality laces, latkans, trims, gota patti and embellishments at wholesale prices.
              Perfect for boutiques, designers, tailors and resellers.
            </p>
            <button
              type="button"
              onClick={() => openEnquiry(null)}
              className="btn-primary mt-7 inline-flex px-5 py-2.5 text-[11px] tracking-[0.14em]"
            >
              ENQUIRE FOR WHOLESALE →
            </button>
          </div>
        </div>
      </section>

      {/* ── 4 Trust Badges Strip ── */}
      <section className="mx-auto max-w-7xl px-4 pt-6 pb-2">
        <div className="grid grid-cols-2 gap-4 rounded-lg border border-neutral-200/70 bg-[#F7F1E8] px-6 py-5 lg:grid-cols-4 lg:divide-x lg:divide-neutral-300/60">
          {[
            {
              title: 'Bulk Pricing',
              desc: 'Special rates for bulk orders',
              icon: (
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="9" r="6" />
                  <path d="M9 14.5 7.5 21 12 18.5 16.5 21 15 14.5" />
                </svg>
              ),
            },
            {
              title: 'Pan India Delivery',
              desc: 'Reliable & Fast Shipping',
              icon: (
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="14" height="12" />
                  <polygon points="15 8 19 8 22 11 22 16 15 16 15 8" />
                  <circle cx="5.5" cy="18" r="2" />
                  <circle cx="18.5" cy="18" r="2" />
                </svg>
              ),
            },
            {
              title: 'Consistent Quality',
              desc: 'Same design & finish always',
              icon: (
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              ),
            },
            {
              title: 'Dedicated Support',
              desc: 'For business enquiries',
              icon: (
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              ),
            },
          ].map((b, i) => (
            <div key={b.title} className={`flex items-center gap-3.5 ${i > 0 ? 'lg:pl-6' : ''}`}>
              <div className="shrink-0">{b.icon}</div>
              <div>
                <div className="text-xs font-bold text-neutral-900 sm:text-sm">{b.title}</div>
                <div className="text-[11px] text-neutral-600">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Wholesale Categories (6 Cards) ── */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-center justify-center gap-3">
          <OrnamentalDivider />
          <h2 className="text-center font-serif text-2xl text-maroon md:text-3xl">
            Wholesale Categories
          </h2>
          <OrnamentalDivider flip />
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {WHOLESALE_CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200/80 bg-[#FAF5EF] shadow-xs transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Link to={cat.to} className="relative aspect-[4/3.6] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </Link>
              <button
                type="button"
                onClick={() => setWishedCats((prev) => ({ ...prev, [cat.label]: !prev[cat.label] }))}
                aria-label={`Bookmark ${cat.label}`}
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-maroon shadow-xs transition hover:bg-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill={wishedCats[cat.label] ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
                </svg>
              </button>
              <Link to={cat.to} className="py-3 text-center">
                <div className="text-xs font-bold uppercase tracking-wider text-maroon">
                  {cat.label}
                </div>
                <span className="mt-0.5 inline-block text-[11px] font-medium text-maroon/80 group-hover:text-maroon">
                  Wholesale →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Choose ARC LEGACY Wholesale? (Maroon Banner) ── */}
      <section className="relative overflow-hidden bg-maroon text-white">
        <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-full w-20 opacity-20" />
        <BotanicalLineart className="pointer-events-none absolute right-0 top-0 h-full w-20 -scale-x-100 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-7">
          <div className="grid items-center gap-6 lg:grid-cols-[280px_1fr]">
            <div>
              <h2 className="font-serif text-2xl leading-snug text-white md:text-[26px]">
                Why Choose
                <br />
                ARC LEGACY Wholesale?
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
              {[
                {
                  title: 'Wide Variety',
                  desc: '1000+ designs',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold-light" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="6 3 18 3 22 9 12 21 2 9 6 3" />
                      <line x1="2" y1="9" x2="22" y2="9" />
                    </svg>
                  ),
                },
                {
                  title: 'Competitive Rates',
                  desc: 'Best wholesale pricing',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold-light" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="8" width="14" height="12" rx="1" />
                      <path d="M7 8V6a3 3 0 0 1 6 0v2" />
                    </svg>
                  ),
                },
                {
                  title: 'Consistent Stock',
                  desc: 'Ready for bulk supply',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold-light" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                  ),
                },
                {
                  title: 'Pan India Delivery',
                  desc: 'Safe & timely shipping',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold-light" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="14" height="12" />
                      <polygon points="15 8 19 8 22 11 22 16 15 16 15 8" />
                      <circle cx="5.5" cy="18" r="2" />
                      <circle cx="18.5" cy="18" r="2" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div key={item.title} className={`flex items-center gap-3 ${i > 0 ? 'lg:pl-5' : ''}`}>
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <div className="text-xs font-bold text-white sm:text-sm">{item.title}</div>
                    <div className="text-[11px] text-white/75">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trending Wholesale Products (12 Cards in 2x6 Grid) ── */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="relative flex items-center justify-center">
          <div className="flex items-center gap-3">
            <OrnamentalDivider />
            <h2 className="text-center font-serif text-2xl text-maroon md:text-3xl">
              Trending Wholesale Products
            </h2>
            <OrnamentalDivider flip />
          </div>
          <Link
            to="/new-arrivals"
            className="absolute right-0 hidden text-xs font-semibold text-maroon hover:underline sm:inline-block"
          >
            View All →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {WHOLESALE_TRENDING_PRODUCTS.map((product) => (
            <WholesaleProductCard
              key={product._id}
              product={product}
              onEnquire={openEnquiry}
            />
          ))}
        </div>
      </section>

      {/* ── How to Place a Wholesale Order ── */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="rounded-xl bg-[#FAF1EC] px-6 py-10">
          <div className="flex items-center justify-center gap-3">
            <OrnamentalDivider />
            <h2 className="text-center font-serif text-2xl text-maroon md:text-3xl">
              How to Place a Wholesale Order
            </h2>
            <OrnamentalDivider flip />
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: '1',
                title: 'Send Inquiry',
                desc: 'Share the products, quantity and requirements.',
                topIcon: (
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-maroon" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="13" y2="17" />
                  </svg>
                ),
              },
              {
                num: '2',
                title: 'Get a Quote',
                desc: 'Receive best wholesale pricing and availability.',
                topIcon: (
                  <span className="font-serif text-xl font-bold text-maroon">₹</span>
                ),
              },
              {
                num: '3',
                title: 'Confirm Order',
                desc: 'Finalize designs, quantity and payment details.',
                topIcon: (
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-maroon" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                ),
              },
              {
                num: '4',
                title: 'Fast Delivery',
                desc: 'We pack and ship your order safely.',
                topIcon: (
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-maroon" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="1" y="4" width="14" height="12" />
                    <polygon points="15 8 19 8 22 11 22 16 15 16 15 8" />
                    <circle cx="5.5" cy="18" r="2" />
                    <circle cx="18.5" cy="18" r="2" />
                  </svg>
                ),
              },
            ].map((step, idx) => (
              <div key={step.num} className="relative flex flex-col items-center text-center">
                {idx < 3 && (
                  <span
                    className="pointer-events-none absolute -right-4 top-8 hidden text-2xl font-light text-maroon/40 lg:block"
                    aria-hidden="true"
                  >
                    ›
                  </span>
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3DCD4]">
                  {step.topIcon}
                </div>
                <div className="mt-3 font-serif text-base font-semibold text-maroon sm:text-lg">
                  <span className="mr-1 font-bold">{step.num}</span> {step.title}
                </div>
                <p className="mt-1.5 max-w-[200px] text-xs leading-relaxed text-neutral-600">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Perfect for Your Business + Let's Grow Together Split Section ── */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Left Panel: Perfect for Your Business */}
          <div className="relative overflow-hidden rounded-xl border border-neutral-200/70 bg-[#F7F1E8] p-7">
            <BotanicalLineart className="pointer-events-none absolute bottom-0 right-0 h-36 w-24 -scale-x-100 opacity-35" />
            <h2 className="text-center font-serif text-2xl text-maroon md:text-[26px]">
              Perfect for Your Business
            </h2>

            {/* Top 4 items */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                {
                  label: 'Boutiques\n& Stores',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M3 9l2-5h14l2 5" />
                      <path d="M4 9v11h16V9" />
                      <path d="M9 20v-6h6v6" />
                    </svg>
                  ),
                },
                {
                  label: 'Fashion\nDesigners',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 3l4 6-4 12-4-12 4-6z" />
                      <circle cx="12" cy="9" r="1.5" />
                    </svg>
                  ),
                },
                {
                  label: 'Tailors\n& Resellers',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="6" cy="6" r="3" />
                      <circle cx="6" cy="18" r="3" />
                      <line x1="20" y1="4" x2="8.12" y2="15.88" />
                      <line x1="14.47" y1="14.48" x2="20" y2="20" />
                    </svg>
                  ),
                },
                {
                  label: 'Online\nSellers',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                  ),
                },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-white shadow-2xs">
                    {b.icon}
                  </div>
                  <div className="mt-2 whitespace-pre-line text-xs font-medium leading-snug text-neutral-800">
                    {b.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom 2 items */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-10">
              {[
                {
                  label: 'Event & Wedding\nDecorators',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                    </svg>
                  ),
                },
                {
                  label: 'DIY & Craft\nBusinesses',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="12" cy="12" r="8" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ),
                },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-white shadow-2xs">
                    {b.icon}
                  </div>
                  <div className="whitespace-pre-line text-xs font-medium leading-snug text-neutral-800">
                    {b.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Let's Grow Together */}
          <div className="relative min-h-[250px] overflow-hidden rounded-xl border border-gold/30 shadow-sm">
            <img
              src="/images/wholesale/grow_bg.jpg"
              alt="Let's Grow Together"
              className="absolute inset-0 h-full w-full object-cover object-left"
            />
            <div className="relative z-10 flex h-full items-center justify-end p-5 sm:p-7">
              <div className="max-w-xs rounded-lg bg-[#FAF3EB]/95 p-5 shadow-md backdrop-blur-2xs">
                <h3 className="font-serif text-xl font-medium text-maroon sm:text-2xl">
                  Let&apos;s Grow Together
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-700">
                  Partner with ARC LEGACY and get access to our exclusive wholesale collection with
                  premium quality and attractive rates.
                </p>
                <button
                  type="button"
                  onClick={() => openEnquiry(null)}
                  className="btn-primary mt-4 inline-flex px-5 py-2 text-[11px] tracking-wider"
                >
                  ENQUIRE NOW →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Wholesale Collection (7-Image Bottom Gallery) ── */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="flex items-center justify-center gap-3">
          <OrnamentalDivider />
          <h2 className="text-center font-serif text-2xl text-maroon md:text-3xl">
            Our Wholesale Collection
          </h2>
          <OrnamentalDivider flip />
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {WHOLESALE_GALLERY.map((item) => (
            <Link
              key={item.image}
              to={item.to}
              className="group aspect-square overflow-hidden rounded-lg border border-neutral-200/80 bg-[#FAF5EF] shadow-xs"
            >
              <img
                src={item.image}
                alt={item.label}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Wholesale Enquiry Modal ── */}
      {showEnquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white p-2 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowEnquiryModal(false)}
              aria-label="Close modal"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-maroon hover:text-white"
            >
              ✕
            </button>
            <WholesaleEnquiryForm
              productTitle={enquiryModalProduct?.title}
              productId={enquiryModalProduct?._id}
              onSuccess={() => setTimeout(() => setShowEnquiryModal(false), 1800)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
