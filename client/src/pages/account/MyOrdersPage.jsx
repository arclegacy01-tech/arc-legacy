import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';

const STATUS_TABS = [
  { id: 'all', label: 'All Orders (12)', status: null },
  { id: 'processing', label: 'Processing (2)', status: 'Processing' },
  { id: 'shipped', label: 'Shipped (3)', status: 'Shipped' },
  { id: 'delivered', label: 'Delivered (6)', status: 'Delivered' },
  { id: 'cancelled', label: 'Cancelled (1)', status: 'Cancelled' },
];

const ORDERS_DATA = [
  {
    id: 'AL12345',
    orderNumber: 'Order #AL12345',
    placedAt: 'Placed on 12 Oct 2026, 10:24 AM',
    status: 'Delivered',
    statusClass: 'bg-[#E6F5EA] text-[#2F7D46]',
    total: 2280,
    itemCount: 4,
    primaryAction: 'buy-again',
    secondaryAction: 'track',
    items: [
      {
        id: 'o1-i1',
        slug: 'pearl-beaded-bridal-lace',
        title: 'Pearl Beaded Gold Lace',
        size: '(2.5 cm)',
        qty: 2,
        price: 320,
        unit: 'Meter',
        image: '/images/provided-pearl-lace.jpg',
      },
      {
        id: 'o1-i2',
        slug: 'mirror-work-border',
        title: 'Mirror Work Lace',
        size: '(4 cm)',
        qty: 1,
        price: 310,
        unit: 'Meter',
        image: '/images/product-6.jpg',
      },
      {
        id: 'o1-i3',
        slug: 'multicolour-pom-pom-lace',
        title: 'Pom Pom Trim',
        size: '(3 cm)',
        qty: 3,
        price: 290,
        unit: 'Meter',
        image: '/images/product-4.jpg',
      },
      {
        id: 'o1-i4',
        slug: 'golden-tassel-fringe-trim',
        title: 'Golden Tassel Fringe Trim',
        size: '(6 cm)',
        qty: 1,
        price: 450,
        unit: 'Meter',
        image: '/images/provided-crystal-fringe.jpg',
      },
    ],
  },
  {
    id: 'AL12344',
    orderNumber: 'Order #AL12344',
    placedAt: 'Placed on 05 Oct 2026, 02:15 PM',
    status: 'Shipped',
    statusClass: 'bg-[#E5F0FF] text-[#2B6CB0]',
    total: 890,
    itemCount: 3,
    primaryAction: 'track',
    secondaryAction: 'buy-again',
    items: [
      {
        id: 'o2-i1',
        slug: 'floral-zari-border-trim',
        title: 'Floral Zari Border Trim',
        size: '(4 cm)',
        qty: 1,
        price: 350,
        unit: 'Meter',
        image: '/images/provided-floral-lace.jpg',
      },
      {
        id: 'o2-i2',
        slug: 'kundan-latkan',
        title: 'Designer Latkan',
        size: '(1 Piece)',
        qty: 2,
        price: 155,
        unit: 'Piece',
        image: '/images/product-8.jpg',
      },
      {
        id: 'o2-i3',
        slug: 'sequin-lace-border',
        title: 'Sequence Border Trim',
        size: '(3 cm)',
        qty: 1,
        price: 230,
        unit: 'Meter',
        image: '/images/product-10.jpg',
      },
    ],
  },
  {
    id: 'AL12343',
    orderNumber: 'Order #AL12343',
    placedAt: 'Placed on 28 Sep 2026, 11:40 AM',
    status: 'Processing',
    statusClass: 'bg-[#FFF4DB] text-[#B7791F]',
    total: 1560,
    itemCount: 3,
    primaryAction: 'details',
    secondaryAction: 'cancel',
    items: [
      {
        id: 'o3-i1',
        slug: 'multicolour-embroidered-border',
        title: 'Multicolor Embroidered Lace',
        size: '(4 cm)',
        qty: 2,
        price: 420,
        unit: 'Meter',
        image: '/images/product-9.jpg',
      },
      {
        id: 'o3-i2',
        slug: 'stone-work-border',
        title: 'Stone Work Lace',
        size: '(3 cm)',
        qty: 1,
        price: 340,
        unit: 'Meter',
        image: '/images/product-2.jpg',
      },
      {
        id: 'o3-i3',
        slug: 'velvet-zari-border',
        title: 'Velvet Embroidered Border',
        size: '(4 cm)',
        qty: 1,
        price: 380,
        unit: 'Meter',
        image: '/images/product-12.jpg',
      },
    ],
  },
  {
    id: 'AL12342',
    orderNumber: 'Order #AL12342',
    placedAt: 'Placed on 15 Sep 2026, 09:30 AM',
    status: 'Delivered',
    statusClass: 'bg-[#E6F5EA] text-[#2F7D46]',
    total: 720,
    itemCount: 4,
    primaryAction: 'buy-again',
    secondaryAction: 'details',
    items: [
      {
        id: 'o4-i1',
        slug: 'golden-gota-patti-lace',
        title: 'Gota Patti Lace',
        size: '(2.5 cm)',
        qty: 1,
        price: 260,
        unit: 'Meter',
        image: '/images/product-3.jpg',
      },
      {
        id: 'o4-i2',
        slug: 'pearl-hanging-latkan',
        title: 'Pearl Latkan',
        size: '(1 Piece)',
        qty: 2,
        price: 110,
        unit: 'Piece',
        image: '/images/product-5.jpg',
      },
      {
        id: 'o4-i3',
        slug: 'golden-zari-embroidered-border',
        title: 'Zari Border Trim',
        size: '(3 cm)',
        qty: 1,
        price: 130,
        unit: 'Meter',
        image: '/images/provided-crystal-fringe.jpg',
      },
      {
        id: 'o4-i4',
        slug: 'multicolour-pom-pom-lace',
        title: 'Pom Pom Trim',
        size: '(3 cm)',
        qty: 1,
        price: 110,
        unit: 'Meter',
        image: '/images/product-4.jpg',
      },
    ],
  },
];

export default function MyOrdersPage() {
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('All Time');
  const [sortBy, setSortBy] = useState('Latest First');
  const [toast, setToast] = useState('');

  const handleBuyAgain = (order) => {
    order.items.forEach((item) => {
      addItem(
        {
          _id: item.id,
          slug: item.slug,
          title: item.title,
          price: item.price,
          unit: item.unit,
          images: [{ url: item.image, isMain: true }],
        },
        item.qty
      );
    });
    setToast(`Added ${order.items.length} items from ${order.orderNumber} to your cart!`);
    setTimeout(() => setToast(''), 3000);
  };

  const selectedStatus = STATUS_TABS.find((t) => t.id === activeTab)?.status;

  const filteredOrders = ORDERS_DATA.filter((order) => {
    if (selectedStatus && order.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = order.orderNumber.toLowerCase().includes(q);
      const matchItem = order.items.some((i) => i.title.toLowerCase().includes(q));
      return matchId || matchItem;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* 1. Top Status Filter Tabs */}
      <div className="overflow-x-auto rounded-xl border border-[#ECE2D8] bg-[#FDF9F6] px-3 shadow-2xs">
        <div className="flex min-w-max items-center justify-between gap-2">
          {STATUS_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3.5 text-xs font-medium transition ${
                  isActive
                    ? 'border-[#7A1C24] font-semibold text-[#7A1C24]'
                    : 'border-transparent text-neutral-600 hover:text-[#7A1C24]'
                }`}
              >
                {tab.id === 'all' && (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                )}
                {tab.id === 'processing' && (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                )}
                {tab.id === 'shipped' && (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="1" y="3" width="15" height="13" rx="1" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                )}
                {tab.id === 'delivered' && (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                )}
                {tab.id === 'cancelled' && (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Search, Date Range & Sort Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-neutral-400">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, Product Name..."
            className="w-full rounded-xl border border-[#ECE2D8] bg-white py-2.5 pl-10 pr-4 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-[#7A1C24] focus:outline-none"
          />
        </div>

        {/* Date Range Dropdown */}
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-500">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-xl border border-[#ECE2D8] bg-white py-2.5 pl-9 pr-8 text-xs font-medium text-neutral-700 focus:border-[#7A1C24] focus:outline-none"
          >
            <option value="All Time">Date Range</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="2026">2026</option>
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 rounded-xl border border-[#ECE2D8] bg-white px-3 py-2">
          <span className="text-xs text-neutral-500">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-xs font-semibold text-neutral-800 focus:outline-none"
          >
            <option value="Latest First">Latest First</option>
            <option value="Oldest First">Oldest First</option>
            <option value="Amount: High to Low">Amount: High to Low</option>
          </select>
        </div>
      </div>

      {toast && (
        <div className="rounded-xl border border-[#7A1C24]/25 bg-[#FCECEF] px-4 py-2.5 text-xs font-medium text-[#7A1C24]">
          {toast}
        </div>
      )}

      {/* 3. Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-[#ECE2D8] bg-white p-5 shadow-sm"
          >
            {/* Order Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F2EAE1] pb-3.5">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">{order.orderNumber}</h3>
                <p className="mt-0.5 text-[11px] text-neutral-500">{order.placedAt}</p>
              </div>

              <div className="flex items-center gap-6">
                <span
                  className={`rounded-md px-3 py-1 text-xs font-semibold ${order.statusClass}`}
                >
                  {order.status}
                </span>

                <Link
                  to="/track-order"
                  className="text-xs font-semibold text-[#7A1C24] hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>

            {/* Order Items & Right Summary */}
            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_210px] lg:items-center">
              {/* Left 4-Column Product Strip */}
              <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
                {order.items.map((item) => (
                  <div key={item.id} className="group">
                    <Link
                      to={`/product/${item.slug}`}
                      className="block aspect-[4/3] overflow-hidden rounded-lg border border-[#ECE2D8] bg-[#F5EFE6]"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <Link
                      to={`/product/${item.slug}`}
                      className="mt-2 block line-clamp-1 text-xs font-semibold text-neutral-900 hover:text-[#7A1C24]"
                    >
                      {item.title}
                    </Link>
                    <p className="text-[11px] text-neutral-500">{item.size}</p>
                    <p className="text-[11px] text-neutral-600">Qty: {item.qty}</p>
                  </div>
                ))}
              </div>

              {/* Right Total & Action Buttons */}
              <div className="border-t border-[#F2EAE1] pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <p className="text-[11px] text-neutral-500">Total Amount</p>
                <p className="font-serif text-2xl font-bold text-[#7A1C24]">
                  ₹{order.total.toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-neutral-500">({order.itemCount} items)</p>

                <div className="mt-3 space-y-2">
                  {order.primaryAction === 'buy-again' && (
                    <button
                      type="button"
                      onClick={() => handleBuyAgain(order)}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#7A1C24] py-2 text-xs font-semibold text-white transition hover:bg-[#61151C]"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      <span>Buy Again</span>
                    </button>
                  )}

                  {order.primaryAction === 'track' && (
                    <Link
                      to="/track-order"
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#7A1C24] py-2 text-xs font-semibold text-white transition hover:bg-[#61151C]"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="3" width="15" height="13" rx="1" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                      <span>Track Order</span>
                    </Link>
                  )}

                  {order.primaryAction === 'details' && (
                    <Link
                      to="/track-order"
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#7A1C24] py-2 text-xs font-semibold text-white transition hover:bg-[#61151C]"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span>View Details</span>
                    </Link>
                  )}

                  {order.secondaryAction === 'track' && (
                    <Link
                      to="/track-order"
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#B06A70]/60 bg-white py-2 text-xs font-semibold text-[#7A1C24] transition hover:bg-[#FCECEF]"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="3" width="15" height="13" rx="1" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                      <span>Track Order</span>
                    </Link>
                  )}

                  {order.secondaryAction === 'buy-again' && (
                    <button
                      type="button"
                      onClick={() => handleBuyAgain(order)}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#B06A70]/60 bg-white py-2 text-xs font-semibold text-[#7A1C24] transition hover:bg-[#FCECEF]"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      <span>Buy Again</span>
                    </button>
                  )}

                  {order.secondaryAction === 'cancel' && (
                    <button
                      type="button"
                      onClick={() => {
                        setToast(`Cancellation request submitted for ${order.orderNumber}.`);
                        setTimeout(() => setToast(''), 3000);
                      }}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#B06A70]/60 bg-white py-2 text-xs font-semibold text-[#7A1C24] transition hover:bg-[#FCECEF]"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                      <span>Cancel Order</span>
                    </button>
                  )}

                  {order.secondaryAction === 'details' && (
                    <Link
                      to="/track-order"
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#B06A70]/60 bg-white py-2 text-xs font-semibold text-[#7A1C24] transition hover:bg-[#FCECEF]"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span>View Details</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
