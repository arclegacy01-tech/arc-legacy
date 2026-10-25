import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../data/nav.js';
import BrandLogo from '../BrandLogo.jsx';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="mt-auto bg-maroon text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr_1fr_1fr]">
          <div className="hidden lg:block">
            <BrandLogo linked={false} size="footer" />
            <p className="mt-3 max-w-xs text-sm text-white/75">Crafted details. Timeless traditions.</p>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gold-light">Stay in the Loop</h4>
            <p className="mt-2 text-sm text-white/80">New arrivals, offers & inspiration — straight to your inbox.</p>
            <form
              className="mt-4 flex overflow-hidden rounded-full border border-white/20 bg-white/10"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail('');
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="bg-gold px-4 font-bold text-maroon">→</button>
            </form>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-light">Shop Categories</h4>
            <ul className="space-y-2 text-sm text-white/85">
              {NAV_LINKS.filter((l) => l.to.startsWith('/category') || l.to === '/new-arrivals').map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-gold-light">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-light">Customer Care</h4>
            <ul className="space-y-2 text-sm text-white/85">
              <li><Link to="/track-order" className="hover:text-gold-light">Track Order</Link></li>
              <li><Link to="/policies/shipping" className="hover:text-gold-light">Shipping Policy</Link></li>
              <li><Link to="/policies/returns" className="hover:text-gold-light">Returns & Refunds</Link></li>
              <li><Link to="/contact" className="hover:text-gold-light">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-gold-light">Contact Us</Link></li>
            </ul>
            <div className="mt-6 rounded-lg border border-white/15 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase text-gold-light">Wholesale Enquiry</p>
              <p className="mt-1 text-xs text-white/80">Bulk orders for boutiques & designers.</p>
              <Link to="/wholesale" className="btn-outline mt-3 inline-flex border-gold-light px-4 py-1.5 text-[10px] text-gold-light hover:bg-gold-light hover:text-maroon">
                Enquire Now
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/70 md:flex-row">
          <p>© {new Date().getFullYear()} ARC LEGACY. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/policies/privacy" className="hover:text-gold-light">Privacy Policy</Link>
            <Link to="/policies/terms" className="hover:text-gold-light">Terms & Conditions</Link>
            <Link to="/policies/shipping" className="hover:text-gold-light">Shipping Policy</Link>
            <Link to="/policies/returns" className="hover:text-gold-light">Return Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
