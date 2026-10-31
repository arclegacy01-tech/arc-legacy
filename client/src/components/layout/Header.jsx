import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import BrandLogo from '../BrandLogo.jsx';
import { NAV_LINKS } from '../../data/nav.js';

const DROPDOWN_LABELS = new Set(['Laces', 'Latkans', 'Trims & Borders']);

function HeaderSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  function onSubmit(event) {
    event.preventDefault();
    const q = query.trim() || 'gold lace';
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-[16rem] items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 shadow-sm lg:max-w-xs">
      <button type="submit" aria-label="Search" className="text-neutral-400">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16.5 20.5 21" />
        </svg>
      </button>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for laces, latkans, trims..."
        aria-label="Search"
        className="min-w-0 flex-1 bg-transparent text-sm text-neutral-700 outline-none placeholder:text-neutral-400"
      />
    </form>
  );
}

function IconLabel({ to, label, badge, children }) {
  return (
    <Link to={to} className="flex flex-col items-center gap-0.5 text-[11px] font-medium text-neutral-600 hover:text-maroon">
      <span className="relative text-neutral-700">
        {children}
        {badge > 0 && (
          <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-maroon px-1 text-[9px] font-bold leading-none text-white">
            {badge}
          </span>
        )}
      </span>
      {label}
    </Link>
  );
}

export default function Header() {
  const { user } = useAuth();
  const { count } = useCart();
  const { count: wishlistCount } = useWishlist();

  return (
    <header className="relative z-30 bg-[#fbf7f1]">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-3">
        <div className="flex justify-start">
          <HeaderSearch />
        </div>
        <BrandLogo size="header" />
        <div className="flex items-center justify-end gap-5 md:gap-8">
          <IconLabel to={user ? '/account' : '/login'} label="Account">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5 19.5c1.4-3 3.8-4.5 7-4.5s5.6 1.5 7 4.5" />
            </svg>
          </IconLabel>
          <IconLabel to="/wishlist" label="Wishlist" badge={wishlistCount}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M12 19s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" />
            </svg>
          </IconLabel>
          <IconLabel to="/cart" label="Cart" badge={count}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M6.5 8h11l-.8 11.5h-9.4z" />
              <path d="M9 8V6.8A3 3 0 0 1 12 3.8 3 3 0 0 1 15 6.8V8" />
            </svg>
          </IconLabel>
        </div>
      </div>
      <nav className="border-y border-neutral-200/80" aria-label="Shop">
        <ul className="mx-auto flex max-w-7xl items-stretch justify-between gap-1 overflow-x-auto px-3">
          {NAV_LINKS.map((link) => (
            <li key={link.to} className="shrink-0">
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-1 whitespace-nowrap px-1.5 py-3 text-[11px] font-medium uppercase tracking-[0.14em] ${
                    isActive
                      ? 'border-b-2 border-maroon text-maroon'
                      : 'border-b-2 border-transparent text-neutral-700 hover:text-maroon'
                  }`
                }
              >
                {link.label}
                {DROPDOWN_LABELS.has(link.label) && (
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                    <path d="M2.5 4.5 6 8l3.5-3.5" />
                  </svg>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
