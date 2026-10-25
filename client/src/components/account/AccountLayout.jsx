import { Link, NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import PageHero from '../PageHero.jsx';

const MENU = [
  { to: '/account', label: 'My Account', end: true },
  { to: '/account/orders', label: 'My Orders' },
  { to: '/wishlist', label: 'My Wishlist' },
  { to: '/account/addresses', label: 'My Addresses' },
  { to: '/account/settings', label: 'Account Settings' },
  { to: '/account/notifications', label: 'Notifications' },
  { to: '/account/help', label: 'Help & Support' },
];

const HERO = {
  '/account': {
    title: 'My Account',
    subtitle: 'Manage your orders, addresses, wishlist and account details',
    breadcrumb: [{ label: 'Home', to: '/' }, { label: 'My Account' }],
  },
  '/wishlist': {
    title: 'My Wishlist',
    subtitle: 'Your favorite trims, laces and embellishments — all in one place',
    breadcrumb: [{ label: 'Home', to: '/' }, { label: 'My Wishlist' }],
  },
};

export default function AccountLayout() {
  const { user, loading, logout } = useAuth();
  const { pathname } = useLocation();
  const hero = HERO[pathname] || HERO['/account'];

  if (loading) return <p className="py-20 text-center">Loading…</p>;
  if (!user) return <Navigate to="/login" replace />;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <PageHero title={hero.title} subtitle={hero.subtitle} breadcrumb={hero.breadcrumb} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-xl border border-neutral-200 bg-blush/50 p-5">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-maroon text-lg font-semibold text-white">
              {initials}
            </div>
            <div className="mt-3 font-medium">{user.name}</div>
            <div className="text-xs text-neutral-600">{user.email}</div>
            <Link to="/account/settings" className="btn-outline mt-4 px-4 py-1.5 text-xs">
              Edit Profile
            </Link>
          </div>
          <nav className="mt-6 space-y-1">
            {MENU.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm ${
                    isActive ? 'bg-white font-medium text-maroon shadow-sm' : 'text-neutral-700 hover:bg-white/60'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={logout}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm text-neutral-600 hover:bg-white/60"
            >
              Logout
            </button>
          </nav>
        </aside>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
