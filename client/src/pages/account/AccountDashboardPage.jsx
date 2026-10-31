import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';

const RECENT_ORDERS = [
  {
    id: 'AL12345',
    number: 'Order #AL12345',
    date: '12 Oct 2026',
    status: 'Delivered',
    statusClass: 'bg-[#E6F5EA] text-[#2F7D46]',
    total: 1240,
    image: '/images/product-2.jpg',
  },
  {
    id: 'AL12344',
    number: 'Order #AL12344',
    date: '05 Oct 2026',
    status: 'Shipped',
    statusClass: 'bg-[#E5F0FF] text-[#2B6CB0]',
    total: 890,
    image: '/images/provided-floral-lace.jpg',
  },
  {
    id: 'AL12343',
    number: 'Order #AL12343',
    date: '28 Sep 2026',
    status: 'Processing',
    statusClass: 'bg-[#FFF4DB] text-[#B7791F]',
    total: 1560,
    image: '/images/product-4.jpg',
  },
  {
    id: 'AL12342',
    number: 'Order #AL12342',
    date: '15 Sep 2026',
    status: 'Delivered',
    statusClass: 'bg-[#E6F5EA] text-[#2F7D46]',
    total: 720,
    image: '/images/product-12.jpg',
  },
];

const SAVED_ADDRESSES = [
  {
    id: 'addr-1',
    label: 'Home',
    isDefault: true,
    name: 'Ananya Sharma',
    lines: ['123, Shree Residency,', 'Bodakdev, Ahmedabad,', 'Gujarat 380054, India'],
    phone: '+91 98765 43210',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#7A1C24]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'addr-2',
    label: 'Office',
    isDefault: false,
    name: 'Ananya Sharma',
    lines: ['A-502, Signature Tower,', 'Prahlad Nagar, Ahmedabad,', 'Gujarat 380015, India'],
    phone: '+91 98765 43210',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#7A1C24]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <line x1="9" y1="6" x2="9.01" y2="6" />
        <line x1="15" y1="6" x2="15.01" y2="6" />
        <line x1="9" y1="10" x2="9.01" y2="10" />
        <line x1="15" y1="10" x2="15.01" y2="10" />
        <line x1="9" y1="14" x2="9.01" y2="14" />
        <line x1="15" y1="14" x2="15.01" y2="14" />
        <path d="M9 22v-4h6v4" />
      </svg>
    ),
  },
  {
    id: 'addr-3',
    label: 'Other',
    isDefault: false,
    name: 'Ananya Sharma',
    lines: ['B-12, Lake View Apartments,', 'Thaltej, Ahmedabad,', 'Gujarat 380059, India'],
    phone: '+91 98765 43210',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#7A1C24]" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
      </svg>
    ),
  },
];

const DASHBOARD_WISHLIST = [
  {
    _id: 'dw-1',
    slug: 'pearl-beaded-bridal-lace',
    title: 'Pearl Beaded Gold Lace',
    size: '(2.5 cm)',
    price: 320,
    unit: 'Meter',
    rating: 4.9,
    reviewCount: 96,
    image: '/images/provided-pearl-lace.jpg',
    images: [{ url: '/images/provided-pearl-lace.jpg', isMain: true }],
  },
  {
    _id: 'dw-2',
    slug: 'mirror-work-border',
    title: 'Mirror Work Lace',
    size: '(4 cm)',
    price: 280,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 82,
    image: '/images/product-9.jpg',
    images: [{ url: '/images/product-9.jpg', isMain: true }],
  },
  {
    _id: 'dw-3',
    slug: 'golden-tassel-fringe-trim',
    title: 'Golden Tassel Trim',
    size: '(6 cm)',
    price: 450,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 60,
    image: '/images/provided-crystal-fringe.jpg',
    images: [{ url: '/images/provided-crystal-fringe.jpg', isMain: true }],
  },
  {
    _id: 'dw-4',
    slug: 'multicolour-pom-pom-lace',
    title: 'Pom Pom Trim',
    size: '(3 cm)',
    price: 290,
    unit: 'Meter',
    rating: 4.7,
    reviewCount: 52,
    image: '/images/product-4.jpg',
    images: [{ url: '/images/product-4.jpg', isMain: true }],
  },
];

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
      <span className="text-[10px] text-neutral-500">({count})</span>
    </div>
  );
}

export default function AccountDashboardPage() {
  const { user } = useAuth();
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [notifs, setNotifs] = useState({
    orderUpdates: true,
    newArrivals: true,
    offers: true,
    wishlistAlerts: true,
  });

  const firstName = (user?.name || 'Ananya Sharma').split(' ')[0];

  const toggleNotif = (key) => {
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Welcome Banner Card */}
      <div className="relative overflow-hidden rounded-2xl border border-[#ECE2D8] bg-[#FDF2F4] shadow-sm">
        <div className="grid items-center md:grid-cols-[1fr_auto]">
          {/* Left Greeting with Subtle Lace Image Backdrop */}
          <div className="relative overflow-hidden p-6">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-56 opacity-85">
              <img
                src="/images/home-story-lace.jpg"
                alt=""
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FDF2F4] via-[#FDF2F4]/60 to-transparent" />
            </div>

            <div className="relative z-10">
              <h2 className="font-serif text-2xl font-semibold text-[#7A1C24] md:text-3xl">
                Hello, {firstName}!
              </h2>
              <p className="mt-1 text-xs font-medium text-neutral-800 md:text-sm">
                Welcome back to ARC LEGACY
              </p>
              <p className="mt-1 text-[11px] text-neutral-500">
                Explore your recent orders, saved wishlist trims and account preferences.
              </p>
            </div>
          </div>

          {/* Right 3 Stats Strip */}
          <div className="grid grid-cols-3 divide-x divide-[#EAD5D8] border-t border-[#EAD5D8] bg-[#FCECEF]/90 px-4 py-4 md:border-l md:border-t-0 md:px-6">
            <div className="flex flex-col items-center px-4 text-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#7A1C24]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              <span className="mt-1.5 font-serif text-xl font-bold text-[#7A1C24]">12</span>
              <span className="text-[11px] text-neutral-600">Total Orders</span>
            </div>

            <div className="flex flex-col items-center px-4 text-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#7A1C24]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
              </svg>
              <span className="mt-1.5 font-serif text-xl font-bold text-[#7A1C24]">8</span>
              <span className="text-[11px] text-neutral-600">Wishlist Items</span>
            </div>

            <div className="flex flex-col items-center px-4 text-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#7A1C24]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="mt-1.5 font-serif text-xl font-bold text-[#7A1C24]">3</span>
              <span className="text-[11px] text-neutral-600">Saved Addresses</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Recent Orders Section */}
      <div className="rounded-2xl border border-[#ECE2D8] bg-[#FDFBF9] p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#7A1C24]" fill="currentColor">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
            <h3 className="font-serif text-lg font-semibold text-[#7A1C24]">Recent Orders</h3>
          </div>
          <Link to="/account/orders" className="text-xs font-semibold text-[#7A1C24] hover:underline">
            View All Orders →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
          {RECENT_ORDERS.map((order) => (
            <div
              key={order.id}
              className="flex gap-3 rounded-xl border border-[#ECE2D8] bg-white p-3 shadow-2xs"
            >
              <img
                src={order.image}
                alt={order.number}
                className="h-28 w-20 shrink-0 rounded-lg object-cover"
              />
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <h4 className="truncate text-xs font-semibold text-neutral-900">{order.number}</h4>
                  <p className="text-[10px] text-neutral-500">{order.date}</p>
                  <span
                    className={`mt-1.5 inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${order.statusClass}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#7A1C24]">
                    ₹{order.total.toLocaleString('en-IN')}
                  </p>
                  <Link
                    to="/account/orders"
                    className="mt-1.5 inline-block w-full rounded-md bg-[#7A1C24] py-1.5 text-center text-[10px] font-semibold text-white transition hover:bg-[#61151C]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Saved Addresses Section */}
      <div className="rounded-2xl border border-[#ECE2D8] bg-[#FDFBF9] p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#7A1C24]" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
            <h3 className="font-serif text-lg font-semibold text-[#7A1C24]">Saved Addresses</h3>
          </div>
          <Link to="/account/addresses" className="text-xs font-semibold text-[#7A1C24] hover:underline">
            View All Addresses →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SAVED_ADDRESSES.map((addr) => (
            <div
              key={addr.id}
              className="flex flex-col justify-between rounded-xl border border-[#ECE2D8] bg-white p-4 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {addr.icon}
                    <span className="text-xs font-semibold text-neutral-900">{addr.label}</span>
                    {addr.isDefault && (
                      <span className="rounded bg-[#FCECEF] px-2 py-0.5 text-[10px] font-semibold text-[#7A1C24]">
                        Default
                      </span>
                    )}
                  </div>
                  <button type="button" className="text-neutral-400 hover:text-neutral-700" aria-label="More options">
                    ⋮
                  </button>
                </div>

                <div className="mt-3 space-y-0.5 text-[11px] leading-relaxed text-neutral-600">
                  <p className="font-semibold text-neutral-900">{addr.name}</p>
                  {addr.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                  <p className="pt-0.5 text-neutral-700">{addr.phone}</p>
                </div>
              </div>

              <Link
                to="/account/addresses"
                className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#B06A70]/50 bg-white py-1.5 text-xs font-medium text-[#7A1C24] transition hover:bg-[#FCECEF]"
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span>Edit</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 4. My Wishlist Section */}
      <div className="rounded-2xl border border-[#ECE2D8] bg-[#FDFBF9] p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#7A1C24]" fill="currentColor">
              <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
            </svg>
            <h3 className="font-serif text-lg font-semibold text-[#7A1C24]">My Wishlist</h3>
          </div>
          <Link to="/wishlist" className="text-xs font-semibold text-[#7A1C24] hover:underline">
            View Wishlist →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {DASHBOARD_WISHLIST.map((item) => {
            const wished = isWishlisted(item._id);
            return (
              <div
                key={item._id}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#ECE2D8] bg-white p-2.5 shadow-2xs transition hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#F5EFE6]">
                  <Link to={`/product/${item.slug}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(item)}
                    aria-label="Toggle wishlist"
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#7A1C24] shadow-sm"
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

                <div className="mt-2.5 flex flex-1 flex-col">
                  <Link
                    to={`/product/${item.slug}`}
                    className="line-clamp-1 text-xs font-semibold text-neutral-900 hover:text-[#7A1C24]"
                  >
                    {item.title}
                  </Link>
                  <span className="text-[11px] text-neutral-500">{item.size}</span>
                  <div className="mt-1 text-xs font-bold text-[#7A1C24]">
                    ₹{item.price} <span className="font-normal text-neutral-600">/ {item.unit}</span>
                  </div>
                  <StarRow rating={item.rating} count={item.reviewCount} />
                  <button
                    type="button"
                    onClick={() => addItem(item, 1)}
                    className="mt-2.5 w-full rounded-md bg-[#7A1C24] py-1.5 text-[11px] font-semibold text-white transition hover:bg-[#61151C]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Bottom 2-Column Row: Account Settings + Notifications */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Left: Account Settings Quick Links */}
        <div className="rounded-2xl border border-[#ECE2D8] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2 border-b border-[#F2EAE1] pb-3">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#7A1C24]" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <h3 className="font-serif text-lg font-semibold text-[#7A1C24]">Account Settings</h3>
          </div>

          <div className="divide-y divide-[#F2EAE1]">
            <Link
              to="/account/settings"
              className="flex items-center justify-between py-3 transition hover:text-[#7A1C24]"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#7A1C24]">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-semibold text-neutral-900">Personal Information</p>
                  <p className="text-[11px] text-neutral-500">Update your name, email and phone number</p>
                </div>
              </div>
              <span className="text-sm text-neutral-400">›</span>
            </Link>

            <Link
              to="/account/settings"
              className="flex items-center justify-between py-3 transition hover:text-[#7A1C24]"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#7A1C24]">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-semibold text-neutral-900">Change Password</p>
                  <p className="text-[11px] text-neutral-500">Update your account password</p>
                </div>
              </div>
              <span className="text-sm text-neutral-400">›</span>
            </Link>

            <Link
              to="/account/settings"
              className="flex items-center justify-between py-3 transition hover:text-[#7A1C24]"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#7A1C24]">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-semibold text-neutral-900">Email Preferences</p>
                  <p className="text-[11px] text-neutral-500">Choose what updates you want to receive</p>
                </div>
              </div>
              <span className="text-sm text-neutral-400">›</span>
            </Link>

            <Link
              to="/account/settings"
              className="flex items-center justify-between py-3 transition hover:text-[#7A1C24]"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#7A1C24]">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-semibold text-neutral-900">Delete Account</p>
                  <p className="text-[11px] text-neutral-500">Permanently delete your account</p>
                </div>
              </div>
              <span className="text-sm text-neutral-400">›</span>
            </Link>
          </div>
        </div>

        {/* Right: Notifications Quick Toggles */}
        <div className="rounded-2xl border border-[#ECE2D8] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2 border-b border-[#F2EAE1] pb-3">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#7A1C24]" fill="currentColor">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <h3 className="font-serif text-lg font-semibold text-[#7A1C24]">Notifications</h3>
          </div>

          <div className="divide-y divide-[#F2EAE1]">
            {[
              {
                key: 'orderUpdates',
                title: 'Order Updates',
                desc: 'Get notified about your order status',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                ),
              },
              {
                key: 'newArrivals',
                title: 'New Arrivals',
                desc: 'Be the first to know about new collections',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="20 12 20 22 4 22 4 12" />
                    <rect x="2" y="7" width="20" height="5" />
                  </svg>
                ),
              },
              {
                key: 'offers',
                title: 'Offers & Discounts',
                desc: 'Receive exclusive offers and deals',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                ),
              },
              {
                key: 'wishlistAlerts',
                title: 'Wishlist Alerts',
                desc: 'Get notified when wishlist items are on sale',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
                  </svg>
                ),
              },
            ].map((row) => (
              <div key={row.key} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="text-[#7A1C24]">{row.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-neutral-900">{row.title}</p>
                    <p className="text-[11px] text-neutral-500">{row.desc}</p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifs[row.key]}
                  onClick={() => toggleNotif(row.key)}
                  className={`relative h-5 w-10 shrink-0 rounded-full transition ${
                    notifs[row.key] ? 'bg-[#7A1C24]' : 'bg-[#D1CBC5]'
                  }`}
                >
                  <span
                    className={`block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition ${
                      notifs[row.key] ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
