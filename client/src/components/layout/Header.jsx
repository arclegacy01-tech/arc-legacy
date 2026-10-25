import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { NAV_LINKS } from '../../data/nav.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import BrandLogo from '../BrandLogo.jsx';

function NavItem({ to, children, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `block px-3 py-2 transition ${
          isActive
            ? 'font-semibold text-maroon underline decoration-maroon decoration-2 underline-offset-8'
            : 'text-neutral-700 hover:text-maroon'
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { count } = useCart();
  const { count: wishlistCount } = useWishlist();

  const onSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="border-b border-neutral-200/60 bg-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-4 py-4 md:grid-cols-[1fr_auto_1fr] md:py-5">
        <form onSubmit={onSearch} className="order-2 w-full md:order-1 md:max-w-md">
          <div className="flex overflow-hidden rounded-full border border-neutral-300 bg-white shadow-sm">
            <input
              type="search"
              placeholder="Search for laces, latkans, trims..."
              className="min-w-0 flex-1 px-4 py-2.5 text-sm outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="bg-maroon px-5 text-white" aria-label="Search">
              <span className="text-sm">⌕</span>
            </button>
          </div>
        </form>

        <div className="order-1 flex justify-center md:order-2">
          <BrandLogo size="header" />
        </div>

        <div className="order-3 flex items-center justify-center gap-6 text-[11px] font-medium uppercase tracking-wider text-neutral-700 md:justify-end">
          <Link to={user ? '/account' : '/login'} className="hover:text-maroon">
            Account
          </Link>
          <Link to="/wishlist" className="relative inline-flex items-center hover:text-maroon">
            Wishlist
            {wishlistCount > 0 && (
              <span className="ml-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-maroon px-1 text-[10px] font-bold leading-none text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative inline-flex items-center hover:text-maroon">
            Cart
            {count > 0 && (
              <span className="ml-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-maroon px-1 text-[10px] font-bold leading-none text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="border-t border-neutral-200/50 bg-cream">
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center px-2 py-1 text-[11px] font-medium uppercase tracking-wider sm:text-xs">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavItem to={link.to} end={link.to === '/'}>
                {link.label}
              </NavItem>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
