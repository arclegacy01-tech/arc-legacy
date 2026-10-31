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
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="bg-gold px-4 text-maroon hover:bg-gold-light transition flex items-center justify-center shrink-0"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 10h12M11 5l5 5-5 5" />
                </svg>
              </button>
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
          <div className="flex items-center gap-4">
            <span className="uppercase tracking-wider text-gold-light text-[11px] font-semibold">Follow Us</span>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white/80 hover:text-gold-light transition" aria-label="Instagram">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white/80 hover:text-gold-light transition" aria-label="Facebook">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-white/80 hover:text-gold-light transition" aria-label="YouTube">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.35 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27z" />
              </svg>
            </a>
          </div>
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
