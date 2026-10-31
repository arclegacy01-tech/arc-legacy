import { useState } from 'react';
import { Link } from 'react-router-dom';

const NOTIFICATION_ITEMS = [
  {
    id: 'n-1',
    title: 'Your Order Has Been Delivered!',
    desc: 'Order #AL12345 has been delivered successfully.',
    time: '2 hours ago',
    unread: true,
    to: '/account/orders',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: 'n-2',
    title: 'New Arrivals',
    desc: 'Explore our latest collection of laces and latkans.',
    time: '5 hours ago',
    unread: true,
    to: '/new-arrivals',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    id: 'n-3',
    title: 'Exclusive Offer Just for You!',
    desc: 'Get 10% OFF on your next purchase. Use code: ARC10',
    time: '1 day ago',
    unread: false,
    to: '/category/laces',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    id: 'n-4',
    title: 'Your Order Has Shipped',
    desc: 'Order #AL12344 is on the way.',
    time: '2 days ago',
    unread: false,
    to: '/account/orders',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: 'n-5',
    title: 'Items in Your Wishlist are Back in Stock',
    desc: 'The items you saved are now available.',
    time: '3 days ago',
    unread: false,
    to: '/wishlist',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
      </svg>
    ),
  },
  {
    id: 'n-6',
    title: 'Festive Collection Live Now',
    desc: 'Discover our handcrafted festive trims and embellishments.',
    time: '5 days ago',
    unread: false,
    to: '/category/gota-patti',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: 'n-7',
    title: 'Price Drop Alert',
    desc: 'An item in your wishlist is now at a lower price.',
    time: '10 Sep 2026',
    unread: false,
    to: '/wishlist',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    id: 'n-8',
    title: 'Account Update',
    desc: 'Your account information has been updated successfully.',
    time: '08 Sep 2026',
    unread: false,
    to: '/account/settings',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
  {
    id: 'n-9',
    title: 'Your Order is Confirmed',
    desc: 'Thank you for shopping with ARC LEGACY! Order #AL12343 confirmed.',
    time: '06 Sep 2026',
    unread: false,
    to: '/account/orders',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 'n-10',
    title: 'Welcome to ARC LEGACY!',
    desc: 'Stay tuned for exclusive offers, new arrivals and crafting inspiration.',
    time: '05 Sep 2026',
    unread: false,
    to: '/',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('center');
  const [currentPage, setCurrentPage] = useState(1);
  const [prefs, setPrefs] = useState({
    orderUpdates: true,
    newArrivals: true,
    offers: false,
    wishlistAlerts: true,
  });

  const togglePref = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4">
      {/* 1. Top 2-Tab Bar */}
      <div className="rounded-xl border border-[#ECE2D8] bg-[#FDF9F6] px-4 shadow-2xs">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => setActiveTab('center')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3.5 text-xs font-medium transition ${
              activeTab === 'center'
                ? 'border-[#7A1C24] font-semibold text-[#7A1C24]'
                : 'border-transparent text-neutral-600 hover:text-[#7A1C24]'
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span>Notification Center</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preferences')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3.5 text-xs font-medium transition ${
              activeTab === 'preferences'
                ? 'border-[#7A1C24] font-semibold text-[#7A1C24]'
                : 'border-transparent text-neutral-600 hover:text-[#7A1C24]'
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span>Notification Preferences</span>
          </button>
        </div>
      </div>

      {/* 2. Top Blush Banner Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#F3DCE0] bg-[#FDF2F4] px-6 py-4 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7DCE0] text-[#7A1C24]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold text-[#7A1C24]">Notification Preferences</h2>
            <p className="text-xs text-neutral-500">Choose what updates you want to receive.</p>
          </div>
        </div>

        <Link
          to="/account/settings"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#7A1C24] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#61151C]"
        >
          <span>Manage Preferences</span>
          <span>→</span>
        </Link>
      </div>

      {activeTab === 'center' ? (
        <>
          {/* 3. Notification Feed Cards */}
          <div className="space-y-3">
            {NOTIFICATION_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className="group flex items-center justify-between gap-4 rounded-xl border border-[#ECE2D8] bg-white px-5 py-4 shadow-2xs transition hover:border-[#7A1C24]/40 hover:shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#7A1C24]">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-neutral-900 group-hover:text-[#7A1C24] md:text-sm">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-neutral-500">{item.desc}</p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3 text-xs text-neutral-500">
                  <span>{item.time}</span>
                  {item.unread && (
                    <span className="h-2.5 w-2.5 rounded-full bg-[#7A1C24]" aria-label="Unread" />
                  )}
                  <span className="text-base text-neutral-400 group-hover:text-[#7A1C24]">›</span>
                </div>
              </Link>
            ))}
          </div>

          {/* 4. Bottom Pagination */}
          <div className="flex items-center justify-center gap-1.5 pt-4">
            {[1, 2, 3, 4].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setCurrentPage(p)}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition ${
                  currentPage === p
                    ? 'bg-[#7A1C24] text-white shadow-2xs'
                    : 'text-neutral-600 hover:bg-[#F5ECE4] hover:text-[#7A1C24]'
                }`}
              >
                {p}
              </button>
            ))}
            <span className="px-1 text-xs text-neutral-400">...</span>
            <button
              type="button"
              onClick={() => setCurrentPage(8)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition ${
                currentPage === 8
                  ? 'bg-[#7A1C24] text-white shadow-2xs'
                  : 'text-neutral-600 hover:bg-[#F5ECE4] hover:text-[#7A1C24]'
              }`}
            >
              8
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(8, p + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ECE2D8] bg-white text-xs text-neutral-600 transition hover:border-[#7A1C24] hover:text-[#7A1C24]"
            >
              ›
            </button>
          </div>
        </>
      ) : (
        /* Notification Preferences Tab Content */
        <div className="grid gap-4 rounded-2xl border border-[#ECE2D8] bg-white p-6 shadow-sm sm:grid-cols-2">
          {[
            {
              key: 'orderUpdates',
              title: 'Order Updates',
              desc: 'Get notified about your order status, shipping and delivery updates.',
            },
            {
              key: 'newArrivals',
              title: 'New Arrivals',
              desc: 'Be the first to know about new collections and trending trims.',
            },
            {
              key: 'offers',
              title: 'Offers & Discounts',
              desc: 'Receive exclusive offers, festive deals and member-only discounts.',
            },
            {
              key: 'wishlistAlerts',
              title: 'Wishlist Alerts',
              desc: 'Get notified when wishlist items are back in stock or on sale.',
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between gap-4 rounded-xl border border-[#F2EAE1] bg-[#FDFBF9] p-4"
            >
              <div>
                <h3 className="text-xs font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-500">{item.desc}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={prefs[item.key]}
                onClick={() => togglePref(item.key)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  prefs[item.key] ? 'bg-[#7A1C24]' : 'bg-[#D1CBC5]'
                }`}
              >
                <span
                  className={`block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition ${
                    prefs[item.key] ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
