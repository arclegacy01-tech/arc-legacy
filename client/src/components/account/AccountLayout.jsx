import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export const ACCOUNT_SIDEBAR_MENU = [
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
  {
    to: '/account/logout',
    label: 'Logout',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
  },
];

const HERO_META = {
  '/account': {
    title: 'My Account',
    subtitle: 'Manage your orders, addresses, wishlist and account details.',
    breadcrumb: 'My Account',
  },
  '/account/orders': {
    title: 'My Orders',
    subtitle: 'Track, manage and view all your orders in one place.',
    breadcrumb: 'My Orders',
  },
  '/account/addresses': {
    title: 'My Addresses',
    subtitle: 'Manage your saved shipping and billing addresses for faster checkout.',
    breadcrumb: 'My Addresses',
  },
  '/account/settings': {
    title: 'Account Settings',
    subtitle: 'Manage your personal information, security, notifications and preferences.',
    breadcrumb: 'Account Settings',
  },
  '/account/notifications': {
    title: 'Notifications',
    subtitle: 'Stay updated with your orders, offers, new arrivals and more.',
    breadcrumb: 'Notifications',
  },
  '/account/help': {
    title: 'Help & Support',
    subtitle: "We're here to help! Find answers, get support, and shop with confidence.",
    breadcrumb: 'Help & Support',
  },
  '/account/logout': {
    title: 'Logout',
    subtitle: 'Are you sure you want to log out from your account?',
    breadcrumb: 'Logout',
  },
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
    </svg>
  );
}

export default function AccountLayout() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const hero = HERO_META[pathname] || HERO_META['/account'];

  const displayName = user?.name || 'Ananya Sharma';
  const displayEmail = user?.email || 'ananya.sharma@gmail.com';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative overflow-hidden bg-[#FAF6F0] text-neutral-900">
      {/* Decorative Botanical Line Art */}
      <BotanicalLineart className="pointer-events-none absolute bottom-20 left-0 z-0 hidden h-[340px] w-[190px] lg:block" />
      <BotanicalLineart className="pointer-events-none absolute bottom-20 right-0 z-0 hidden h-[340px] w-[190px] scale-x-[-1] lg:block" />

      {/* Top Hero Banner */}
      <section className="relative overflow-hidden border-b border-[#EADFD2] bg-[#F7EFE6]">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[58%]">
          <img
            src="/images/home-mfg-rolls.jpg"
            alt={hero.title}
            className="h-full w-full object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7EFE6] via-[#F7EFE6]/75 to-transparent" />
        </div>

        {/* Left filigree ornament */}
        <svg
          viewBox="0 0 160 160"
          className="pointer-events-none absolute -left-8 top-0 h-44 w-44 text-[#C9A227]/30"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="80" cy="80" r="68" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx="80" cy="80" r="50" stroke="currentColor" strokeWidth="0.7" />
          <path d="M80 12 C95 45, 115 65, 148 80 C115 95, 95 115, 80 148 C65 115, 45 95, 12 80 C45 65, 65 45, 80 12 Z" stroke="currentColor" strokeWidth="0.7" />
        </svg>

        <div className="relative mx-auto max-w-7xl px-4 py-7 md:py-9">
          <nav className="text-xs font-medium text-[#7A1C24]/80">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-1.5 text-neutral-400">/</span>
            <span className="text-[#7A1C24]">{hero.breadcrumb}</span>
          </nav>
          <h1 className="mt-1.5 font-serif text-3xl font-semibold tracking-tight text-[#7A1C24] md:text-4xl">
            {hero.title}
          </h1>
          <p className="mt-1 text-xs text-neutral-600 md:text-sm">
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Area: Left Account Sidebar + Right Page Outlet */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-7 lg:grid-cols-[250px_1fr] lg:items-start">
          {/* Left Account Sidebar */}
          <aside className="rounded-2xl border border-[#ECE2D8] bg-[#FDF9F6] p-5 shadow-sm">
            <div className="flex flex-col items-center border-b border-[#EFE6DD] pb-5 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F4D9DC] font-serif text-xl font-semibold text-[#7A1C24]">
                {initials}
              </div>
              <h2 className="mt-3 text-sm font-semibold text-neutral-900">{displayName}</h2>
              <p className="mt-0.5 text-[11px] text-neutral-500">{displayEmail}</p>
              <Link
                to="/account/settings"
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-[#B06A70]/60 bg-white px-4 py-1.5 text-xs font-medium text-[#7A1C24] transition hover:bg-[#FCECEF]"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                Edit Profile
              </Link>
            </div>

            <nav className="mt-4 space-y-1">
              {ACCOUNT_SIDEBAR_MENU.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-medium transition ${
                      isActive
                        ? 'bg-[#F9E8EA] font-semibold text-[#7A1C24]'
                        : 'text-neutral-700 hover:bg-[#F5ECE4]'
                    }`
                  }
                >
                  <span className="text-current">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </aside>

          {/* Right Active Page Content */}
          <div>
            <Outlet />
          </div>
        </div>
      </section>

      {/* Bottom 4-Badge Trust Strip */}
      <section className="relative z-10 border-t border-[#EADFD2] bg-[#FDFBF8] py-7">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
          <div className="flex items-center gap-3.5 md:justify-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F9EFE2] text-[#B8860B]">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 3h12l4 6-10 12L2 9z" />
                <path d="M2 9h20" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-900 md:text-sm">Premium Quality</h4>
              <p className="text-[11px] text-neutral-500">Handpicked Collections</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 md:border-l md:border-[#EADFD2] md:pl-6 md:justify-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F9EFE2] text-[#B8860B]">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="1" y="3" width="15" height="13" rx="1" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-900 md:text-sm">Pan India Delivery</h4>
              <p className="text-[11px] text-neutral-500">Reliable & Fast Shipping</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 md:border-l md:border-[#EADFD2] md:pl-6 md:justify-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F9EFE2] text-[#B8860B]">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-900 md:text-sm">Secure Payments</h4>
              <p className="text-[11px] text-neutral-500">100% Safe Checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 md:border-l md:border-[#EADFD2] md:pl-6 md:justify-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F9EFE2] text-[#B8860B]">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-900 md:text-sm">Dedicated Support</h4>
              <p className="text-[11px] text-neutral-500">We're Here to Help</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
