import { useState } from 'react';
import { Link } from 'react-router-dom';

const HELP_TOPICS = [
  {
    id: 'track',
    title: 'Track My Order',
    desc: 'Check the status of your order',
    to: '/track-order',
    badgeClass: 'bg-[#FCECEF] text-[#7A1C24]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    desc: 'Easy return process and refund policy',
    to: '/policies/returns',
    badgeClass: 'bg-[#EAF5E6] text-[#4E8C3A]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
        <polyline points="7.5 19.79 7.5 14.6 3 12" />
      </svg>
    ),
  },
  {
    id: 'shipping',
    title: 'Shipping & Delivery',
    desc: 'Delivery time, charges and tracking',
    to: '/policies/shipping',
    badgeClass: 'bg-[#FCECEF] text-[#7A1C24]',
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
    id: 'payments',
    title: 'Payments',
    desc: 'Payment methods, coupons and offers',
    to: '/cart',
    badgeClass: 'bg-[#EAF5E6] text-[#4E8C3A]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    id: 'product',
    title: 'Product Information',
    desc: 'Details, size, material and usage',
    to: '/category/laces',
    badgeClass: 'bg-[#FCECEF] text-[#7A1C24]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: 'wishlist',
    title: 'Wishlist & Save Items',
    desc: 'Manage your wishlist and notifications',
    to: '/wishlist',
    badgeClass: 'bg-[#FCECEF] text-[#7A1C24]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
      </svg>
    ),
  },
  {
    id: 'account',
    title: 'Account & Profile',
    desc: 'Login, account settings and personal details',
    to: '/account/settings',
    badgeClass: 'bg-[#FCECEF] text-[#7A1C24]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 'technical',
    title: 'Website & Technical',
    desc: 'Site issues, errors and troubleshooting',
    to: '/contact',
    badgeClass: 'bg-[#EAF5E6] text-[#4E8C3A]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

const FAQS = [
  {
    q: 'How can I track my order?',
    a: 'You can track your order anytime from the "My Orders" section in your account or via the Track Order page using your Order ID and registered phone number.',
  },
  {
    q: 'What is your return and refund policy?',
    a: 'We offer a hassle-free 7-day return and exchange policy for unused, uncut trims and laces in their original packaging. Refunds are processed within 5–7 business days.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Standard Pan-India delivery takes 3–6 business days. Express shipping to metro cities typically arrives within 2–3 business days.',
  },
  {
    q: 'Do you offer Cash on Delivery (COD)?',
    a: 'Yes! Cash on Delivery (COD) is available across India on eligible retail orders up to ₹10,000.',
  },
  {
    q: 'How can I apply a coupon code?',
    a: 'Enter your promo or coupon code in the "Apply Coupon" box on the Cart or Checkout page before completing your payment.',
  },
  {
    q: 'Can I change or cancel my order?',
    a: 'Orders can be modified or cancelled within 12 hours of placement or before dispatch from our Surat studio. Contact our support team for quick assistance.',
  },
  {
    q: 'How do I contact customer support?',
    a: 'You can reach us via Live Chat, email at support@arclegacy.in, phone at +91 98765 43210, or WhatsApp Monday to Saturday between 10:00 AM and 6:00 PM IST.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept UPI (GPay, PhonePe, Paytm), Credit & Debit Cards, Net Banking, Wallets via Razorpay, and Cash on Delivery.',
  },
];

const HELP_RESOURCES = [
  {
    title: 'Return Policy',
    desc: 'Learn about our easy return process',
    to: '/policies/returns',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15l-2-2 2-2" />
        <path d="M7 13h6a2 2 0 0 1 0 4h-1" />
      </svg>
    ),
  },
  {
    title: 'Shipping Policy',
    desc: 'Delivery timelines and shipping charges',
    to: '/policies/shipping',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Terms & Conditions',
    desc: 'Read our store policies and guidelines',
    to: '/policies/terms',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Privacy Policy',
    desc: 'Your data and privacy are safe with us',
    to: '/policies/privacy',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const filteredFaqs = searchQuery.trim()
    ? FAQS.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : FAQS;

  return (
    <div className="space-y-7">
      {/* 1. "How can we help you?" Search Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-[#F3DCE0] bg-[#FDF2F4] p-6 shadow-sm">
        {/* Decorative Botanical Sprig on Top Right */}
        <svg
          viewBox="0 0 140 100"
          className="pointer-events-none absolute right-0 top-0 h-28 w-36 text-[#7A1C24]/25"
          fill="none"
          aria-hidden="true"
        >
          <path d="M140 10 C105 25, 75 45, 45 85" stroke="currentColor" strokeWidth="1.2" />
          <ellipse cx="95" cy="24" rx="14" ry="6" transform="rotate(-25 95 24)" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="75" cy="40" rx="14" ry="6" transform="rotate(-35 75 40)" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="110" cy="38" rx="13" ry="5" transform="rotate(20 110 38)" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="88" cy="56" rx="13" ry="5" transform="rotate(15 88 56)" stroke="currentColor" strokeWidth="1" />
        </svg>

        <div className="relative flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#7A1C24] shadow-sm">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-[#7A1C24]">How can we help you?</h2>
            <p className="text-xs text-neutral-500">Search for answers to your questions</p>
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative mt-4 flex overflow-hidden rounded-xl border border-[#EAD5D8] bg-white shadow-sm"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for topics like orders, returns, shipping, payments..."
            className="w-full bg-transparent px-4 py-3 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none md:text-sm"
          />
          <button
            type="submit"
            className="flex shrink-0 items-center gap-2 bg-[#7A1C24] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#61151C]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span>Search</span>
          </button>
        </form>
      </div>

      {/* 2. Popular Help Topics */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-[#7A1C24]">Popular Help Topics</h2>
          <Link to="/contact" className="text-xs font-semibold text-[#7A1C24] hover:underline">
            View All Topics →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HELP_TOPICS.map((topic) => (
            <Link
              key={topic.id}
              to={topic.to}
              className="group flex flex-col justify-between rounded-xl border border-[#ECE2D8] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#7A1C24]/40 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${topic.badgeClass}`}>
                  {topic.icon}
                </div>
              </div>
              <div className="mt-3 flex items-end justify-between gap-2">
                <div>
                  <h3 className="text-xs font-semibold text-neutral-900 group-hover:text-[#7A1C24]">
                    {topic.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">{topic.desc}</p>
                </div>
                <span className="text-sm font-semibold text-neutral-400 group-hover:text-[#7A1C24]">›</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Frequently Asked Questions + Still Need Help? */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-[#7A1C24]">Frequently Asked Questions</h2>
          <Link to="/contact" className="text-xs font-semibold text-[#7A1C24] hover:underline">
            View All FAQs →
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_330px] lg:items-start">
          {/* Left Accordion List */}
          <div className="divide-y divide-[#F0E6DC] rounded-2xl border border-[#ECE2D8] bg-white shadow-sm">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between px-5 py-3.5 text-left text-xs font-medium text-neutral-800 transition hover:bg-[#FAF6F0] hover:text-[#7A1C24]"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`ml-3 text-sm text-neutral-400 transition-transform ${
                        isOpen ? 'rotate-90 text-[#7A1C24]' : ''
                      }`}
                    >
                      ›
                    </span>
                  </button>
                  {isOpen && (
                    <div className="bg-[#FDFBF9] px-5 pb-4 pt-1 text-xs leading-relaxed text-neutral-600">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right "Still Need Help?" Card */}
          <div className="rounded-2xl border border-[#F3DCE0] bg-[#FDF2F4] p-5 shadow-sm">
            <h3 className="font-serif text-lg font-semibold text-[#7A1C24]">Still Need Help?</h3>
            <p className="mt-0.5 text-xs text-neutral-600">Our support team is happy to assist you.</p>

            <div className="mt-4 divide-y divide-[#F2DCE0]">
              {/* Live Chat */}
              <div className="flex items-center justify-between gap-3 py-3.5 first:pt-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#7A1C24] shadow-sm">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-900">Live Chat</h4>
                    <p className="text-[10px] text-neutral-500">Chat with our support team</p>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-[#B06A70]/60 bg-white px-3 py-1.5 text-[11px] font-semibold text-[#7A1C24] transition hover:bg-[#7A1C24] hover:text-white"
                >
                  <span>Start Chat</span>
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </Link>
              </div>

              {/* Email Support */}
              <div className="flex items-center justify-between gap-3 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#7A1C24] shadow-sm">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-900">Email Support</h4>
                    <p className="text-[10px] text-neutral-500">Write to us anytime</p>
                  </div>
                </div>
                <a
                  href="mailto:support@arclegacy.in"
                  className="shrink-0 rounded-lg border border-[#B06A70]/60 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-[#7A1C24] transition hover:bg-[#7A1C24] hover:text-white"
                >
                  support@arclegacy.in
                </a>
              </div>

              {/* Call Us */}
              <div className="flex items-center justify-between gap-3 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#7A1C24] shadow-sm">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-900">Call Us</h4>
                    <p className="text-[10px] text-neutral-500">Mon - Sat, 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <a
                  href="tel:+919876543210"
                  className="shrink-0 rounded-lg border border-[#B06A70]/60 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-[#7A1C24] transition hover:bg-[#7A1C24] hover:text-white"
                >
                  +91 98765 43210
                </a>
              </div>

              {/* WhatsApp Support */}
              <div className="flex items-center justify-between gap-3 py-3.5 last:pb-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#7A1C24] shadow-sm">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-900">WhatsApp Support</h4>
                    <p className="text-[10px] text-neutral-500">Get quick help on WhatsApp</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-lg border border-[#B06A70]/60 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-[#7A1C24] transition hover:bg-[#7A1C24] hover:text-white"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Help Resources */}
      <div>
        <h2 className="mb-4 font-serif text-xl font-semibold text-[#7A1C24]">Help Resources</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HELP_RESOURCES.map((res) => (
            <Link
              key={res.title}
              to={res.to}
              className="group flex items-center justify-between gap-3 rounded-xl border border-[#ECE2D8] bg-white p-4 shadow-sm transition hover:border-[#7A1C24]/40 hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FCECEF] text-[#7A1C24]">
                  {res.icon}
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-neutral-900 group-hover:text-[#7A1C24]">
                    {res.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] leading-snug text-neutral-500">{res.desc}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-neutral-400 group-hover:text-[#7A1C24]">›</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
