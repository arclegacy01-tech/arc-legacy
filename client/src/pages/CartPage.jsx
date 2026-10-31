import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, DEFAULT_CART_ITEMS } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

const YOU_MAY_ALSO_LIKE = [
  {
    _id: 'rec-1',
    slug: 'mirror-work-border',
    title: 'Mirror Work Gold Lace',
    size: '3 cm',
    price: 310,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 74,
    image: '/images/product-7.jpg',
    images: [{ url: '/images/product-7.jpg', isMain: true }],
  },
  {
    _id: 'rec-2',
    slug: 'pearl-beaded-fringe-trim',
    title: 'Golden Tassel Fringe Trim',
    size: '6 cm',
    price: 450,
    unit: 'Meter',
    rating: 4.9,
    reviewCount: 60,
    image: '/images/provided-crystal-fringe.jpg',
    images: [{ url: '/images/provided-crystal-fringe.jpg', isMain: true }],
  },
  {
    _id: 'rec-3',
    slug: 'multi-thread-embroidered-border',
    title: 'Multicolor Embroidered Lace',
    size: '4 cm',
    price: 280,
    unit: 'Meter',
    rating: 4.7,
    reviewCount: 49,
    image: '/images/product-3.jpg',
    images: [{ url: '/images/product-3.jpg', isMain: true }],
  },
  {
    _id: 'rec-4',
    slug: 'golden-gota-patti-lace',
    title: 'Gota Patti Lace',
    size: '2.5 cm',
    price: 270,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 63,
    image: '/images/product-6.jpg',
    images: [{ url: '/images/product-6.jpg', isMain: true }],
  },
  {
    _id: 'rec-5',
    slug: 'kundan-latkan',
    title: 'Kundan Latkan',
    size: '1 Piece',
    price: 320,
    unit: 'Piece',
    rating: 4.7,
    reviewCount: 39,
    image: '/images/product-8.jpg',
    images: [{ url: '/images/product-8.jpg', isMain: true }],
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

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, addItem, setItems } = useCart();
  const { user } = useAuth();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  // Keep track of selected items (all selected by default)
  const [selectedIds, setSelectedIds] = useState(() => new Set(items.map((i) => i.productId)));

  useEffect(() => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      for (const item of items) {
        if (!next.has(item.productId)) next.add(item.productId);
      }
      // Remove stale IDs
      for (const id of [...next]) {
        if (!items.some((i) => i.productId === id)) next.delete(id);
      }
      return next;
    });
  }, [items.length]);

  const allSelected = items.length > 0 && selectedIds.size === items.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map((i) => i.productId)));
    }
  };

  const toggleSelectOne = (productId) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  const removeSelected = () => {
    if (!selectedIds.size) return;
    setItems((prev) => prev.filter((i) => !selectedIds.has(i.productId)));
    setSelectedIds(new Set());
  };

  const selectedItems = useMemo(
    () => items.filter((i) => selectedIds.has(i.productId)),
    [items, selectedIds]
  );

  const selectedSubtotal = useMemo(
    () => selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [selectedItems]
  );

  const shipping = selectedSubtotal >= 999 || selectedSubtotal === 0 ? 0 : 99;
  const total = selectedSubtotal + shipping;

  const checkout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="bg-cream">
      {/* ── Top Cart Hero Banner ── */}
      <section className="relative overflow-hidden border-b border-neutral-200/70 bg-[#FAF3EB]">
        <img
          src="/images/home-mfg-rolls.jpg"
          alt="Your Cart"
          className="absolute right-0 top-0 h-full w-full object-cover object-right md:w-[58%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF3EB] from-[35%] via-[#FAF3EB]/92 via-[55%] to-transparent to-[88%]" />
        <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-full w-28 opacity-45" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-9 md:px-10 md:py-11">
          <p className="text-xs font-medium text-maroon">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-1.5 text-neutral-400">/</span>
            <span>Your Cart</span>
          </p>
          <h1 className="mt-2 font-serif text-3xl font-medium text-maroon md:text-4xl">
            Your Cart
          </h1>
          <p className="mt-1.5 text-sm font-medium text-neutral-700">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
          <p className="mt-0.5 text-xs text-neutral-600 sm:text-sm">
            Review your selected items and proceed to checkout.
          </p>
        </div>
      </section>

      {/* ── Main Two-Column Cart Layout ── */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid items-start gap-7 lg:grid-cols-[1fr_360px]">
          {/* Left Card: Cart Items List */}
          <div className="rounded-xl border border-neutral-200/80 bg-[#FFFCF9] p-5 shadow-xs sm:p-6">
            {items.length === 0 ? (
              <div className="py-14 text-center">
                <p className="font-serif text-xl text-maroon">Your cart is currently empty</p>
                <p className="mt-1 text-xs text-neutral-500">
                  Explore our handcrafted laces, latkans, borders, and embellishments.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <Link to="/new-arrivals" className="btn-primary text-xs">
                    Continue Shopping →
                  </Link>
                  <button
                    type="button"
                    onClick={() => setItems(DEFAULT_CART_ITEMS)}
                    className="rounded-md border border-maroon/40 px-4 py-2 text-xs font-medium text-maroon hover:bg-maroon hover:text-white"
                  >
                    Restore Sample Cart
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Top Select All & Remove Selected Bar */}
                <div className="flex items-center justify-between border-b border-neutral-200/80 pb-4">
                  <label className="flex cursor-pointer items-center gap-3 text-xs font-semibold text-neutral-800 sm:text-sm">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded border-neutral-300 accent-maroon"
                    />
                    <span>Select All ({items.length} items)</span>
                  </label>

                  <button
                    type="button"
                    onClick={removeSelected}
                    className="flex items-center gap-1.5 text-xs font-medium text-maroon transition hover:underline"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                    Remove Selected
                  </button>
                </div>

                {/* Cart Item Rows */}
                <div className="divide-y divide-neutral-200/70">
                  {items.map((item) => {
                    const checked = selectedIds.has(item.productId);
                    const unitStr = item.unit
                      ? item.unit.charAt(0).toUpperCase() + item.unit.slice(1)
                      : 'Meter';

                    return (
                      <div
                        key={item.productId}
                        className="grid grid-cols-[auto_88px_1fr] items-center gap-4 py-5 sm:grid-cols-[auto_96px_1fr_auto_auto]"
                      >
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleSelectOne(item.productId)}
                          aria-label={`Select ${item.title}`}
                          className="h-4 w-4 cursor-pointer rounded border-neutral-300 accent-maroon"
                        />

                        {/* Product Thumbnail */}
                        <Link
                          to={`/product/${item.slug}`}
                          className="aspect-square w-22 overflow-hidden rounded-lg border border-neutral-200/80 bg-[#FAF5EF] sm:w-24"
                        >
                          <img
                            src={item.image || '/images/product-1.jpg'}
                            alt={item.title}
                            className="h-full w-full object-cover transition duration-300 hover:scale-105"
                          />
                        </Link>

                        {/* Product Details */}
                        <div className="min-w-0">
                          <Link
                            to={`/product/${item.slug}`}
                            className="block truncate text-sm font-semibold text-neutral-900 hover:text-maroon sm:text-[15px]"
                          >
                            {item.title}
                          </Link>
                          <p className="mt-0.5 text-xs text-neutral-500">
                            ({item.size || '3 cm'})
                          </p>
                          <p className="mt-1 text-xs font-bold text-maroon sm:text-sm">
                            ₹{item.price} / {unitStr}
                          </p>
                          <StarRow rating={item.rating || 4.8} count={item.reviewCount || 82} />
                        </div>

                        {/* Quantity Box + Unit Label */}
                        <div className="col-start-2 sm:col-start-auto flex flex-col items-center">
                          <div className="flex items-center rounded border border-neutral-300 bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="px-2.5 py-1 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-maroon"
                            >
                              −
                            </button>
                            <span className="min-w-8 text-center text-xs font-semibold text-neutral-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="px-2.5 py-1 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-maroon"
                            >
                              +
                            </button>
                          </div>
                          <span className="mt-1 text-[11px] text-neutral-500">{unitStr}</span>
                        </div>

                        {/* Line Total + Remove X */}
                        <div className="col-start-3 sm:col-start-auto flex items-center justify-end gap-5 sm:min-w-[110px]">
                          <span className="text-base font-bold text-neutral-900">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            aria-label={`Remove ${item.title}`}
                            className="p-1 text-neutral-400 transition hover:text-maroon"
                          >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Footer Bar: Continue Shopping + Clear Cart */}
                <div className="mt-2 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200/80 pt-5">
                  <Link
                    to="/new-arrivals"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-maroon transition hover:underline sm:text-sm"
                  >
                    <span>←</span> Continue Shopping
                  </Link>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="inline-flex items-center gap-1.5 rounded-md border border-maroon/40 bg-white px-4 py-2 text-xs font-semibold text-maroon transition hover:bg-maroon hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right Card: Order Summary */}
          <aside className="rounded-xl border border-neutral-200/80 bg-[#FAF3EB] p-6 shadow-xs">
            <h2 className="border-b border-neutral-200/80 pb-3.5 font-serif text-xl font-medium text-maroon">
              Order Summary
            </h2>

            <dl className="mt-4 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-neutral-700">
                <dt>Subtotal ({selectedItems.length} items)</dt>
                <dd className="font-semibold text-neutral-900">
                  ₹{selectedSubtotal.toLocaleString('en-IN')}
                </dd>
              </div>

              <div className="flex items-center justify-between text-neutral-700">
                <dt>Shipping Charges</dt>
                <dd className="flex items-center gap-1.5">
                  <span className="text-neutral-600">₹{shipping}</span>
                  {shipping === 0 && (
                    <span className="rounded bg-[#D7EEDB] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2E6F40]">
                      FREE
                    </span>
                  )}
                </dd>
              </div>

              <div className="border-t border-neutral-200/90 pt-3.5">
                <div className="flex items-baseline justify-between">
                  <dt className="text-sm font-semibold text-maroon">Total Amount</dt>
                  <dd className="font-serif text-2xl font-bold text-maroon">
                    ₹{total.toLocaleString('en-IN')}
                  </dd>
                </div>
                <p className="mt-0.5 text-right text-[11px] text-neutral-500">
                  Inclusive of all taxes
                </p>
              </div>
            </dl>

            {/* Primary Checkout Button */}
            <button
              type="button"
              disabled={!selectedItems.length}
              onClick={checkout}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-maroon py-3 text-xs font-semibold tracking-wide text-white shadow-xs transition hover:bg-maroon-dark disabled:opacity-50 sm:text-sm"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Proceed to Checkout
            </button>

            {/* OR Divider */}
            <div className="my-3 flex items-center gap-3 text-[11px] text-neutral-400">
              <div className="h-px flex-1 bg-neutral-200" />
              <span>OR</span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            {/* Secondary Razorpay Button */}
            <button
              type="button"
              disabled={!selectedItems.length}
              onClick={checkout}
              className="flex w-full items-center justify-center gap-1.5 rounded-md border border-neutral-200 bg-white py-2.5 text-xs font-semibold text-neutral-700 shadow-2xs transition hover:border-maroon disabled:opacity-50"
            >
              <span>Checkout with</span>
              <span className="font-sans text-sm font-extrabold italic tracking-tight text-[#0C2651]">
                Razorpay
              </span>
            </button>

            {/* 4 Vertical Trust & Support Items */}
            <div className="mt-6 space-y-4 border-t border-neutral-200/80 pt-5">
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <div>
                  <div className="text-xs font-bold text-neutral-800">100% Secure Payments</div>
                  <p className="text-[11px] text-neutral-500">Your transactions are safe with us.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="1" y="4" width="14" height="12" />
                  <polygon points="15 8 19 8 22 11 22 16 15 16 15 8" />
                  <circle cx="5.5" cy="18" r="2" />
                  <circle cx="18.5" cy="18" r="2" />
                </svg>
                <div>
                  <div className="text-xs font-bold text-neutral-800">Pan India Delivery</div>
                  <p className="text-[11px] text-neutral-500">Reliable &amp; fast shipping across India.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                <div>
                  <div className="text-xs font-bold text-neutral-800">Easy Returns</div>
                  <p className="text-[11px] text-neutral-500">Hassle-free returns within 7 days.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
                <div>
                  <div className="text-xs font-bold text-neutral-800">Need Help?</div>
                  <p className="text-[11px] text-neutral-500">Our team is here to assist you.</p>
                  <Link
                    to="/contact"
                    className="mt-1 inline-block text-[11px] font-semibold text-maroon underline hover:text-maroon-dark"
                  >
                    Contact Support →
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── You May Also Like Section (5-Column Product Carousel) ── */}
      <section className="relative mx-auto max-w-7xl px-4 pb-12 pt-4">
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-maroon" fill="currentColor">
            <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
          </svg>
          <h2 className="font-serif text-2xl font-medium text-maroon">
            You May Also Like
          </h2>
        </div>

        <div className="relative mt-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {YOU_MAY_ALSO_LIKE.map((product) => {
              const wished = isWishlisted(product._id);
              return (
                <article
                  key={product._id}
                  className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200/80 bg-white shadow-xs transition hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF5EF]">
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
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-maroon shadow-xs transition hover:scale-105"
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

                  <div className="flex flex-1 flex-col justify-between p-3">
                    <div>
                      <Link
                        to={`/product/${product.slug}`}
                        className="block truncate text-xs font-semibold text-neutral-900 hover:text-maroon sm:text-sm"
                      >
                        {product.title}
                      </Link>
                      <p className="text-[11px] text-neutral-500">({product.size})</p>
                      <p className="mt-1 text-xs font-bold text-maroon sm:text-sm">
                        ₹{product.price} / {product.unit}
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

          {/* Left & Right Carousel Buttons */}
          <button
            type="button"
            aria-label="Previous recommendation"
            className="absolute -left-3.5 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-maroon shadow-md transition hover:bg-maroon hover:text-white lg:flex"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next recommendation"
            className="absolute -right-3.5 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-maroon shadow-md transition hover:bg-maroon hover:text-white lg:flex"
          >
            ›
          </button>
        </div>
      </section>
    </div>
  );
}
