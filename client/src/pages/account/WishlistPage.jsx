import { Link, NavLink } from 'react-router-dom';
import { useWishlist, DEFAULT_WISHLIST_ITEMS } from '../../context/WishlistContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const RECENTLY_VIEWED_WISHLIST = [
  {
    _id: 'w-rv-1',
    slug: 'golden-zari-embroidered-border',
    title: 'Zari Border Trim',
    price: 260,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 48,
    image: '/images/product-1.jpg',
    images: [{ url: '/images/product-1.jpg', isMain: true }],
  },
  {
    _id: 'w-rv-2',
    slug: 'kundan-latkan',
    title: 'Kundan Latkan',
    price: 320,
    unit: 'Pair',
    rating: 4.7,
    reviewCount: 39,
    image: '/images/product-8.jpg',
    images: [{ url: '/images/product-8.jpg', isMain: true }],
  },
  {
    _id: 'w-rv-3',
    slug: 'sequin-lace-border',
    title: 'Sequence Border Trim',
    price: 230,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 71,
    image: '/images/product-10.jpg',
    images: [{ url: '/images/product-10.jpg', isMain: true }],
  },
  {
    _id: 'w-rv-4',
    slug: 'mirror-work-border',
    title: 'Mirror Lace Border',
    price: 250,
    unit: 'Meter',
    rating: 4.7,
    reviewCount: 49,
    image: '/images/product-3.jpg',
    images: [{ url: '/images/product-3.jpg', isMain: true }],
  },
  {
    _id: 'w-rv-5',
    slug: 'golden-gota-patti-lace',
    title: 'Gota Patti Lace',
    price: 270,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 63,
    image: '/images/product-2.jpg',
    images: [{ url: '/images/product-2.jpg', isMain: true }],
  },
];

const SIDEBAR_MENU = [
  {
    to: '/account',
    label: 'My Account',
    end: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    to: '/account/orders',
    label: 'My Orders',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    to: '/wishlist',
    label: 'My Wishlist',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
      </svg>
    ),
  },
  {
    to: '/account/addresses',
    label: 'My Addresses',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    to: '/account/settings',
    label: 'Account Settings',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    to: '/account/notifications',
    label: 'Notifications',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    to: '/account/help',
    label: 'Help & Support',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
];

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

function StarRow({ rating = 4.8, count = 80 }) {
  return (
    <div className="mt-1 flex items-center gap-1">
      <div className="flex items-center text-[#D49A1A]">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className="h-3 w-3"
            fill={i <= Math.round(rating) ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <polygon points="10,1.5 12.6,6.8 18.5,7.6 14.2,11.8 15.2,17.6 10,14.8 4.8,17.6 5.8,11.8 1.5,7.6 7.4,6.8" />
          </svg>
        ))}
      </div>
      <span className="text-[11px] text-neutral-500">({count})</span>
    </div>
  );
}

export default function WishlistPage() {
  const { products, removeFromWishlist, toggleWishlist, isWishlisted, setProducts } = useWishlist();
  const { addItem } = useCart();
  const { user, logout } = useAuth();

  const displayName = user?.name || 'Ananya Sharma';
  const displayEmail = user?.email || 'ananya.sharma@gmail.com';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const moveAllToCart = () => {
    products.forEach((p) => addItem(p, 1));
  };

  return (
    <div className="bg-cream">
      {/* ── Top Hero Banner ── */}
      <section className="relative overflow-hidden border-b border-neutral-200/80 bg-[#FAF3EB]">
        <img
          src="/images/home-mfg-rolls.jpg"
          alt="My Wishlist"
          className="absolute right-0 top-0 h-full w-full object-cover object-right md:w-[55%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF3EB] from-[38%] via-[#FAF3EB]/92 via-[58%] to-transparent to-[90%]" />
        <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-full w-28 opacity-45" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-9 md:px-10 md:py-12">
          <p className="text-xs font-medium text-maroon">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-1.5 text-neutral-400">/</span>
            <span>My Wishlist</span>
          </p>
          <h1 className="mt-2 font-serif text-3xl font-medium text-maroon md:text-4xl">
            My Wishlist
          </h1>
          <p className="mt-1.5 text-xs text-neutral-600 sm:text-sm">
            Your favorite trims, laces and embellishments — all in one place.
          </p>
        </div>
      </section>

      {/* ── Main Two-Column Section: Account Sidebar + Wishlist Grid ── */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid items-start gap-7 lg:grid-cols-[245px_1fr]">
          {/* Left Account Navigation Sidebar */}
          <aside className="rounded-2xl border border-neutral-200/80 bg-[#FFFCF9] p-5 shadow-2xs">
            <div className="flex flex-col items-center border-b border-neutral-200/70 pb-5 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F3DDDA] font-serif text-xl font-semibold text-maroon">
                {initials}
              </div>
              <div className="mt-3 text-sm font-bold text-neutral-900">{displayName}</div>
              <div className="mt-0.5 text-xs text-neutral-500">{displayEmail}</div>
            </div>

            <nav className="mt-4 space-y-1">
              {SIDEBAR_MENU.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-medium transition sm:text-sm ${
                      isActive
                        ? 'bg-[#F8E7E7] font-semibold text-maroon'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-maroon'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}

              <NavLink
                to="/account/logout"
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-xs font-medium transition sm:text-sm ${
                    isActive
                      ? 'bg-[#F8E7E7] font-semibold text-maroon'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-maroon'
                  }`
                }
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Logout</span>
              </NavLink>
            </nav>
          </aside>

          {/* Right Wishlist Grid Area */}
          <div>
            {/* Header Bar */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-maroon" fill="currentColor">
                  <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
                </svg>
                <h2 className="font-serif text-xl font-medium text-maroon sm:text-2xl">
                  My Wishlist ({products.length} items)
                </h2>
              </div>

              {products.length > 0 && (
                <button
                  type="button"
                  onClick={moveAllToCart}
                  className="inline-flex items-center gap-1.5 rounded-md border border-maroon/40 bg-white px-4 py-2 text-xs font-semibold text-maroon shadow-2xs transition hover:bg-maroon hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Move All to Cart
                </button>
              )}
            </div>

            {products.length === 0 ? (
              <div className="rounded-xl border border-dashed border-neutral-300 bg-[#FFFCF9] py-14 text-center">
                <p className="font-serif text-xl text-maroon">Your wishlist is empty</p>
                <p className="mt-1 text-xs text-neutral-500">
                  Save your favorite laces, latkans, trims, and embellishments here.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <Link to="/new-arrivals" className="btn-primary text-xs">
                    Explore Collection →
                  </Link>
                  <button
                    type="button"
                    onClick={() => setProducts(DEFAULT_WISHLIST_ITEMS)}
                    className="rounded-md border border-maroon/40 bg-white px-4 py-2 text-xs font-semibold text-maroon hover:bg-maroon hover:text-white"
                  >
                    Restore Sample Wishlist
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => {
                  const image =
                    product.image ||
                    product.images?.find((i) => i.isMain)?.url ||
                    product.images?.[0]?.url ||
                    '/images/product-1.jpg';

                  return (
                    <article
                      key={product._id}
                      className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200/80 bg-white p-2.5 shadow-2xs transition hover:shadow-md"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#FAF5EF]">
                        <Link to={`/product/${product.slug}`} className="block h-full w-full">
                          <img
                            src={image}
                            alt={product.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(product._id)}
                          aria-label="Remove from wishlist"
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-maroon shadow-xs transition hover:scale-110"
                        >
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                            <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-2.5 flex flex-1 flex-col justify-between">
                        <div>
                          <Link
                            to={`/product/${product.slug}`}
                            className="block truncate text-xs font-semibold text-neutral-900 hover:text-maroon sm:text-sm"
                          >
                            {product.title}
                          </Link>
                          <p className="text-[11px] text-neutral-500">({product.size || '3 cm'})</p>
                          <p className="mt-1 text-xs font-bold text-maroon sm:text-sm">
                            ₹{product.price}{' '}
                            <span className="font-normal text-neutral-500">/ {product.unit || 'Meter'}</span>
                          </p>
                          <StarRow rating={product.rating || 4.8} count={product.reviewCount || 82} />
                        </div>

                        <div className="mt-3 space-y-1.5">
                          <button
                            type="button"
                            onClick={() => addItem(product, 1)}
                            className="flex w-full items-center justify-center gap-1.5 rounded bg-maroon py-2 text-xs font-medium text-white transition hover:bg-maroon-dark active:scale-[0.99]"
                          >
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                              <circle cx="9" cy="21" r="1" />
                              <circle cx="20" cy="21" r="1" />
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            Add to Cart
                          </button>

                          <button
                            type="button"
                            onClick={() => removeFromWishlist(product._id)}
                            className="w-full rounded border border-neutral-300 bg-white py-1.5 text-xs font-medium text-maroon transition hover:border-maroon hover:bg-maroon/5"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Recently Viewed (5-Column Grid) ── */}
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-maroon" fill="currentColor">
              <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
            </svg>
            <h2 className="font-serif text-xl font-medium text-maroon sm:text-2xl">
              Recently Viewed
            </h2>
          </div>
          <Link to="/new-arrivals" className="text-xs font-semibold text-maroon hover:underline">
            View All →
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {RECENTLY_VIEWED_WISHLIST.map((product) => {
            const wished = isWishlisted(product._id);
            return (
              <article
                key={product._id}
                className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200/80 bg-white p-2.5 shadow-2xs transition hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#FAF5EF]">
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
                    aria-label="Toggle wishlist"
                    className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-maroon shadow-xs"
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

                <div className="mt-2.5 flex flex-1 flex-col justify-between">
                  <div>
                    <Link
                      to={`/product/${product.slug}`}
                      className="block truncate text-xs font-semibold text-neutral-900 hover:text-maroon sm:text-sm"
                    >
                      {product.title}
                    </Link>
                    <p className="mt-1 text-xs font-bold text-maroon sm:text-sm">
                      ₹{product.price}{' '}
                      <span className="font-normal text-neutral-500">/ {product.unit}</span>
                    </p>
                    <StarRow rating={product.rating} count={product.reviewCount} />
                  </div>

                  <button
                    type="button"
                    onClick={() => addItem(product, 1)}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded bg-maroon py-2 text-xs font-medium text-white transition hover:bg-maroon-dark active:scale-[0.99]"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Still Exploring? Bottom Promo Banner ── */}
      <section className="relative overflow-hidden border-t border-neutral-200/70 bg-[#FAF3EB]">
        <img
          src="/images/home-mfg-rolls.jpg"
          alt="Still Exploring?"
          className="absolute right-0 top-0 h-full w-full object-cover object-right md:w-[55%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF3EB] from-[38%] via-[#FAF3EB]/92 via-[58%] to-transparent to-[90%]" />
        <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-full w-24 opacity-45" />

        <div className="relative z-10 mx-auto max-w-7xl px-8 py-9 md:px-14 md:py-11">
          <h2 className="font-serif text-2xl font-medium text-maroon md:text-3xl">
            Still Exploring?
          </h2>
          <p className="mt-1.5 max-w-md text-xs leading-relaxed text-neutral-600 sm:text-sm">
            Discover more premium laces, trims and embellishments to complete your collection.
          </p>
          <Link
            to="/new-arrivals"
            className="btn-primary mt-4 inline-flex px-5 py-2.5 text-xs tracking-wider"
          >
            Shop New Arrivals →
          </Link>
        </div>
      </section>
    </div>
  );
}
