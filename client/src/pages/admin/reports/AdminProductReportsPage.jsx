import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Cotton Lace Trim (5m)',
    sku: 'AL2761',
    category: 'Lace Trims',
    price: 200,
    unitsSold: 420,
    revenue: '84,000',
    views: '2,450',
    stock: 120,
    status: 'Active',
    image: '/images/product-1.jpg',
  },
  {
    id: 2,
    name: 'Embroidered Lace (3m)',
    sku: 'AL2760',
    category: 'Embroidered Laces',
    price: 240,
    unitsSold: 310,
    revenue: '74,400',
    views: '3,820',
    stock: 85,
    status: 'Active',
    image: '/images/product-2.jpg',
  },
  {
    id: 3,
    name: 'Zari Lace (5m)',
    sku: 'AL2759',
    category: 'Zari Laces',
    price: 220,
    unitsSold: 260,
    revenue: '62,400',
    views: '2,100',
    stock: 8,
    status: 'Active',
    image: '/images/product-3.jpg',
  },
  {
    id: 4,
    name: 'Crochet Lace (4m)',
    sku: 'AL2758',
    category: 'Crochet Laces',
    price: 200,
    unitsSold: 232,
    revenue: '46,400',
    views: '1,950',
    stock: 46,
    status: 'Active',
    image: '/images/product-4.jpg',
  },
  {
    id: 5,
    name: 'Designer Lace Trim (5m)',
    sku: 'AL2757',
    category: 'Lace Trims',
    price: 250,
    unitsSold: 210,
    revenue: '52,500',
    views: '1,840',
    stock: 34,
    status: 'Active',
    image: '/images/product-5.jpg',
  },
];

const TABS = [
  'Overview',
  'Top Products',
  'Category Performance',
  'Low Performing Products',
  'Inventory Status',
];

export default function AdminProductReportsPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [brandFilter, setBrandFilter] = useState('All Brands');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [stockStatusFilter, setStockStatusFilter] = useState('All Stock Statuses');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((p) => {
      const matchSearch =
        !effectiveSearch ||
        p.name.toLowerCase().includes(effectiveSearch) ||
        p.sku.toLowerCase().includes(effectiveSearch) ||
        p.category.toLowerCase().includes(effectiveSearch);

      const matchCategory =
        categoryFilter === 'All Categories' || p.category === categoryFilter;

      const matchStatus =
        statusFilter === 'All Statuses' || p.status === statusFilter;

      const matchStock =
        stockStatusFilter === 'All Stock Statuses' ||
        (stockStatusFilter === 'Low Stock' && p.stock <= 10) ||
        (stockStatusFilter === 'In Stock' && p.stock > 10);

      return matchSearch && matchCategory && matchStatus && matchStock;
    });
  }, [effectiveSearch, categoryFilter, statusFilter, stockStatusFilter]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setCategoryFilter('All Categories');
    setBrandFilter('All Brands');
    setStatusFilter('All Statuses');
    setStockStatusFilter('All Stock Statuses');
    setSearchQuery('');
    triggerToast('Product filters reset');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F6] p-4 sm:p-6 lg:p-8 font-sans text-gray-800">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-[#800020] px-4 py-2.5 text-sm font-medium text-white shadow-xl flex items-center gap-2 animate-fade-in">
          <AdminIcon name="check" size={16} strokeWidth={2} />
          {toastMsg}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <Link to="/admin" className="hover:text-[#800020] transition-colors">
          Admin
        </Link>
        <span>›</span>
        <Link to="/admin/wholesale" className="hover:text-[#800020] transition-colors">
          Wholesale
        </Link>
        <span>›</span>
        <Link to="/admin/reports" className="hover:text-[#800020] transition-colors">
          Reports
        </Link>
        <span>›</span>
        <span className="font-semibold text-[#800020]">Product Reports</span>
      </div>

      {/* Header Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0F3] text-[#800020] shadow-sm border border-[#FFE4E8]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] tracking-tight">
              Product Reports
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Detailed insights about your products, including sales, inventory, views, and performance.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:border-[#800020] transition-colors">
            <AdminIcon name="calendar" size={16} className="text-gray-500" strokeWidth={1.75} />
            <span>01 Oct 2026 - 31 Oct 2026</span>
            <AdminIcon name="chevronDown" size={14} className="text-gray-400" strokeWidth={1.75} />
          </div>

          <button
            onClick={() => triggerToast('Exporting Product Report...')}
            className="flex items-center gap-2 rounded-xl bg-[#800020] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#660019] transition-all"
          >
            <AdminIcon name="download" size={16} strokeWidth={1.75} />
            <span>Export Report</span>
            <AdminIcon name="chevronDown" size={14} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
        {/* Card 1 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Products</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">1,842</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 19%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Products Sold</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ECFDF5] text-emerald-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 3h2.5l2.2 11.2a2 2 0 002 1.6h8.8a2 2 0 001.9-1.4L22 7H6" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">1,260</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 28%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Product Views</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F3E8FF] text-purple-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">24,580</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 32%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Top Product Revenue</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FEF3C7] text-amber-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">₹84,000</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 40%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-500 truncate">Cotton Lace Trim (5m)</p>
        </div>

        {/* Card 5 */}
        <div className="col-span-2 sm:col-span-1 rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Low Stock Products</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FEE2E2] text-red-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">24</span>
            <span className="flex items-center text-xs font-semibold text-rose-600">
              ↓ 14%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">need attention</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
              activeTab === tab
                ? 'bg-[#800020] text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-[#FFF0F3] hover:text-[#800020] border border-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Grid: Dashboard Area (xl:9) + Sidebar (xl:3) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column (9 cols) */}
        <div className="xl:col-span-9 space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart 1: Sales & Views Trend (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF0F3] text-[#800020]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-gray-900">
                      Sales & Views Trend
                    </h2>
                    <p className="text-[11px] text-gray-500">
                      Compare product views and sales over time
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1.5 font-medium text-gray-600">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FB7185]"></span>
                      Product Views
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-gray-600">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]"></span>
                      Products Sold
                    </span>
                  </div>
                  <select className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 outline-none focus:border-[#800020]">
                    <option>Last 30 Days</option>
                    <option>Last 7 Days</option>
                    <option>This Month</option>
                  </select>
                </div>
              </div>

              {/* Chart SVG */}
              <div className="relative h-64 w-full pt-4">
                <svg className="h-full w-full overflow-visible" viewBox="0 0 540 200">
                  {/* Grid lines */}
                  <line x1="40" y1="20" x2="520" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="40" y1="60" x2="520" y2="60" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="40" y1="100" x2="520" y2="100" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="40" y1="140" x2="520" y2="140" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="40" y1="180" x2="520" y2="180" stroke="#e2e8f0" />

                  {/* Y Axis Labels */}
                  <text x="32" y="24" textAnchor="end" className="text-[10px] fill-gray-400">4K</text>
                  <text x="32" y="64" textAnchor="end" className="text-[10px] fill-gray-400">3K</text>
                  <text x="32" y="104" textAnchor="end" className="text-[10px] fill-gray-400">2K</text>
                  <text x="32" y="144" textAnchor="end" className="text-[10px] fill-gray-400">1K</text>
                  <text x="32" y="184" textAnchor="end" className="text-[10px] fill-gray-400">0</text>

                  {/* Bar Chart Columns (Product Views) */}
                  {[
                    { x: 55, h: 50 }, { x: 75, h: 58 }, { x: 95, h: 65 }, { x: 115, h: 62 },
                    { x: 135, h: 70 }, { x: 155, h: 78 }, { x: 175, h: 75 }, { x: 195, h: 86 },
                    { x: 215, h: 90 }, { x: 235, h: 85 }, { x: 255, h: 98 }, { x: 275, h: 105 },
                    { x: 295, h: 96 }, { x: 315, h: 110 }, { x: 335, h: 118 }, { x: 355, h: 112 },
                    { x: 375, h: 126 }, { x: 395, h: 134 }, { x: 415, h: 128 }, { x: 435, h: 142 },
                    { x: 455, h: 148 }, { x: 475, h: 156 }, { x: 495, h: 162 },
                  ].map((bar, i) => (
                    <rect
                      key={i}
                      x={bar.x}
                      y={180 - bar.h}
                      width="10"
                      height={bar.h}
                      rx="3"
                      fill="#FDA4AF"
                      className="hover:fill-[#FB7185] transition-colors cursor-pointer"
                    />
                  ))}

                  {/* Line Chart (Products Sold) */}
                  <path
                    d="M 55 145 Q 120 135, 180 120 T 300 88 T 420 48 T 495 24"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Line Nodes */}
                  <circle cx="55" cy="145" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="120" cy="135" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="180" cy="120" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="240" cy="105" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="300" cy="88" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="360" cy="68" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="420" cy="48" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="495" cy="24" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />

                  {/* X Axis Labels */}
                  <text x="55" y="196" textAnchor="middle" className="text-[10px] fill-gray-400">1 Oct</text>
                  <text x="135" y="196" textAnchor="middle" className="text-[10px] fill-gray-400">5 Oct</text>
                  <text x="215" y="196" textAnchor="middle" className="text-[10px] fill-gray-400">10 Oct</text>
                  <text x="295" y="196" textAnchor="middle" className="text-[10px] fill-gray-400">15 Oct</text>
                  <text x="375" y="196" textAnchor="middle" className="text-[10px] fill-gray-400">20 Oct</text>
                  <text x="445" y="196" textAnchor="middle" className="text-[10px] fill-gray-400">25 Oct</text>
                  <text x="500" y="196" textAnchor="middle" className="text-[10px] fill-gray-400">31 Oct</text>
                </svg>
              </div>
            </div>

            {/* Chart 2: Products by Category (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF0F3] text-[#800020]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-gray-900">% Products by Category</h2>
                </div>
                <p className="text-[11px] text-gray-500 mb-4">Distribution of products across store categories.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-2">
                {/* Donut Graphic */}
                <div className="relative flex items-center justify-center h-44 w-44 shrink-0">
                  <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                    {/* Lace Trims 28% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#FB7185"
                      strokeWidth="14"
                      strokeDasharray="67 238"
                      strokeDashoffset="0"
                    />
                    {/* Embroidered Laces 20% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#A855F7"
                      strokeWidth="14"
                      strokeDasharray="48 238"
                      strokeDashoffset="-67"
                    />
                    {/* Cotton Laces 15% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#38BDF8"
                      strokeWidth="14"
                      strokeDasharray="36 238"
                      strokeDashoffset="-115"
                    />
                    {/* Zari Laces 12% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="14"
                      strokeDasharray="29 238"
                      strokeDashoffset="-151"
                    />
                    {/* Crochet Laces 10% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#14B8A6"
                      strokeWidth="14"
                      strokeDasharray="24 238"
                      strokeDashoffset="-180"
                    />
                    {/* Others 15% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="14"
                      strokeDasharray="34 238"
                      strokeDashoffset="-204"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-bold text-gray-900 leading-tight">1,842</span>
                    <span className="text-[10px] font-medium text-gray-400">Total Products</span>
                  </div>
                </div>

                {/* Legend list */}
                <div className="space-y-1.5 text-xs w-full sm:w-auto">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#FB7185]"></span> Lace Trims
                    </span>
                    <span className="text-gray-900 font-semibold">28% (520)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#A855F7]"></span> Embroidered Laces
                    </span>
                    <span className="text-gray-900 font-semibold">20% (368)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#38BDF8]"></span> Cotton Laces
                    </span>
                    <span className="text-gray-900 font-semibold">15% (276)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#F59E0B]"></span> Zari Laces
                    </span>
                    <span className="text-gray-900 font-semibold">12% (221)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#14B8A6]"></span> Crochet Laces
                    </span>
                    <span className="text-gray-900 font-semibold">10% (184)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#94A3B8]"></span> Others
                    </span>
                    <span className="text-gray-900 font-semibold">15% (273)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Highlight Cards in a row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Top Performing */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500">Top Performing Product</span>
                <AdminIcon name="star" size={14} className="text-amber-500" strokeWidth={1.75} />
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/images/product-1.jpg"
                  alt="Cotton Lace Trim"
                  className="h-12 w-12 shrink-0 rounded-xl object-cover border border-gray-100"
                />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-tight">Cotton Lace Trim (5m)</h4>
                  <p className="text-[11px] text-gray-400">SKU: AL2761</p>
                  <p className="text-xs font-semibold text-gray-800 mt-0.5">
                    420 <span className="font-normal text-gray-500">Units</span> · <strong className="text-gray-900">₹84,000</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Most Viewed */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500">Most Viewed Product</span>
                <AdminIcon name="eye" size={14} className="text-purple-500" strokeWidth={1.75} />
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/images/product-2.jpg"
                  alt="Embroidered Lace"
                  className="h-12 w-12 shrink-0 rounded-xl object-cover border border-gray-100"
                />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-tight">Embroidered Lace (3m)</h4>
                  <p className="text-[11px] text-gray-400">SKU: AL2760</p>
                  <p className="text-xs font-bold text-purple-700 mt-0.5">
                    3,820 <span className="font-normal text-gray-500">Product Views</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Highest Margin */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500">% Highest Margin Product</span>
                <AdminIcon name="zap" size={14} className="text-emerald-500" strokeWidth={1.75} />
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/images/product-3.jpg"
                  alt="Designer Lace Trim"
                  className="h-12 w-12 shrink-0 rounded-xl object-cover border border-gray-100"
                />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-tight">Designer Lace Trim (5m)</h4>
                  <p className="text-[11px] text-gray-400">SKU: AL2757</p>
                  <p className="text-xs font-bold text-emerald-700 mt-0.5">
                    52% <span className="font-normal text-gray-500">Profit Margin</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: Low Stock */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500">Low Stock Product</span>
                <AdminIcon name="clock" size={14} className="text-rose-500" strokeWidth={1.75} />
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/images/product-4.jpg"
                  alt="Zari Lace"
                  className="h-12 w-12 shrink-0 rounded-xl object-cover border border-gray-100"
                />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-tight">Zari Lace (5m)</h4>
                  <p className="text-[11px] text-gray-400">SKU: AL2759</p>
                  <p className="text-xs font-bold text-rose-600 mt-0.5">
                    8 <span className="font-normal text-gray-500">Units Left</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Performance Table */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF0F3] text-[#800020]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900">Product Performance</h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <AdminIcon
                    name="search"
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    strokeWidth={1.75}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products by name, SKU, or category..."
                    className="w-56 sm:w-72 rounded-xl border border-gray-200 bg-gray-50/60 py-2 pl-9 pr-3 text-xs text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#800020] focus:bg-white focus:ring-1 focus:ring-[#800020]"
                  />
                </div>

                <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:border-gray-300">
                  <span>Columns</span>
                  <AdminIcon name="chevronDown" size={12} strokeWidth={1.75} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF9F9] text-gray-600 font-semibold uppercase tracking-wider border-b border-gray-100">
                  <tr>
                    <th className="py-3 px-3 w-8">
                      <input
                        type="checkbox"
                        checked={
                          selectedIds.length > 0 &&
                          selectedIds.length === filteredProducts.length
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                      />
                    </th>
                    <th className="py-3 px-3 w-8">#</th>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">SKU</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price (₹)</th>
                    <th className="py-3 px-4">Units Sold</th>
                    <th className="py-3 px-4">Revenue (₹)</th>
                    <th className="py-3 px-4">Views</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="12" className="py-8 text-center text-gray-400">
                        No products found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((p) => {
                      const isSelected = selectedIds.includes(p.id);
                      return (
                        <tr
                          key={p.id}
                          className={`transition-colors hover:bg-[#FFF5F7] ${
                            isSelected ? 'bg-[#FFF0F3]' : ''
                          }`}
                        >
                          <td className="py-3.5 px-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(p.id)}
                              className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                            />
                          </td>
                          <td className="py-3.5 px-3 font-medium text-gray-500">{p.id}</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="h-9 w-9 rounded-lg object-cover border border-gray-100 shrink-0"
                              />
                              <span className="font-bold text-gray-900">{p.name}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-gray-500">{p.sku}</td>
                          <td className="py-3.5 px-4 text-gray-600">{p.category}</td>
                          <td className="py-3.5 px-4 font-medium text-gray-800">{p.price}</td>
                          <td className="py-3.5 px-4 font-semibold text-gray-800">{p.unitsSold}</td>
                          <td className="py-3.5 px-4 font-bold text-gray-900">{p.revenue}</td>
                          <td className="py-3.5 px-4 text-gray-600">{p.views}</td>
                          <td className="py-3.5 px-4 font-semibold">
                            <span
                              className={
                                p.stock <= 10 ? 'text-rose-600 font-bold' : 'text-gray-800'
                              }
                            >
                              {p.stock}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => triggerToast(`Viewing details for ${p.name}`)}
                                title="View details"
                                className="rounded-lg p-1 text-gray-400 hover:bg-rose-50 hover:text-[#800020] transition-colors"
                              >
                                <AdminIcon name="eye" size={14} strokeWidth={1.75} />
                              </button>
                              <button
                                onClick={() => triggerToast(`Viewing sales chart for ${p.name}`)}
                                title="Analytics"
                                className="rounded-lg p-1 text-gray-400 hover:bg-rose-50 hover:text-[#800020] transition-colors"
                              >
                                <AdminIcon name="reports" size={14} strokeWidth={1.75} />
                              </button>
                              <button
                                onClick={() => triggerToast(`Options for ${p.name}`)}
                                title="More options"
                                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                              >
                                <AdminIcon name="moreVertical" size={14} strokeWidth={1.75} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
              <span>Showing 1 - 5 of 1,842 products</span>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                >
                  ‹
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#800020] font-bold text-white shadow-sm">
                  1
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50">
                  4
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50">
                  5
                </button>
                <span className="px-1 text-gray-400">...</span>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50">
                  369
                </button>
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                >
                  ›
                </button>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={perPage}
                  onChange={(e) => setPerPage(Number(e.target.value))}
                  className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 outline-none"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column (3 cols) */}
        <div className="xl:col-span-3 space-y-6">
          {/* Filters */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
              <AdminIcon name="filter" size={16} className="text-[#800020]" strokeWidth={1.75} />
              <h3 className="text-sm font-bold text-gray-900">Filters</h3>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-gray-600 mb-1">Date Range</label>
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-gray-700">
                  <AdminIcon name="calendar" size={14} className="text-gray-400" strokeWidth={1.75} />
                  <span>01 Oct 2026 - 31 Oct 2026</span>
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-600 mb-1">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Categories</option>
                  <option>Lace Trims</option>
                  <option>Embroidered Laces</option>
                  <option>Cotton Laces</option>
                  <option>Zari Laces</option>
                  <option>Crochet Laces</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-600 mb-1">Brand</label>
                <select
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Brands</option>
                  <option>ARC LEGACY Exclusive</option>
                  <option>Heritage Crafts</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-600 mb-1">Product Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-600 mb-1">Stock Status</label>
                <select
                  value={stockStatusFilter}
                  onChange={(e) => setStockStatusFilter(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Stock Statuses</option>
                  <option>In Stock</option>
                  <option>Low Stock</option>
                </select>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => triggerToast('Product filters applied')}
                  className="flex-1 rounded-xl bg-[#800020] py-2.5 text-center text-xs font-semibold text-white shadow-sm hover:bg-[#660019] transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleResetFilters}
                  className="rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <AdminIcon name="zap" size={16} className="text-[#800020]" strokeWidth={1.75} />
              <h3 className="text-sm font-bold text-gray-900">Quick Actions</h3>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => triggerToast('Exporting Product Report...')}
                className="flex flex-col items-center justify-center rounded-xl border border-[#FFE4E8] bg-[#FFF8F9] p-3 text-center hover:bg-[#FFF0F3] transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-[#800020] mb-1.5 group-hover:scale-105 transition-transform">
                  <AdminIcon name="download" size={16} strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-semibold text-gray-800">Export Report</span>
              </button>

              <Link
                to="/admin/reports/inventory"
                className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-center hover:bg-gray-100 transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 mb-1.5 group-hover:scale-105 transition-transform">
                  <AdminIcon name="products" size={16} strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-semibold text-gray-800">Inventory Report</span>
              </Link>

              <Link
                to="/admin/products"
                className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-center hover:bg-gray-100 transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 mb-1.5 group-hover:scale-105 transition-transform">
                  <AdminIcon name="settings" size={16} strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-semibold text-gray-800">Manage Products</span>
              </Link>

              <button
                onClick={() => {
                  setStockStatusFilter('Low Stock');
                  triggerToast('Filtered by Low Stock Products');
                }}
                className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-center hover:bg-gray-100 transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-700 mb-1.5 group-hover:scale-105 transition-transform">
                  <AdminIcon name="clock" size={16} strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-semibold text-gray-800">Check Low Stock</span>
              </button>
            </div>
          </div>

          {/* Recent Product Activity */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AdminIcon name="clock" size={16} className="text-[#800020]" strokeWidth={1.75} />
                <h3 className="text-sm font-bold text-gray-900">Recent Product Activity</h3>
              </div>
              <button
                onClick={() => triggerToast('Viewing all product activities')}
                className="text-xs font-semibold text-[#800020] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src="/images/product-1.jpg"
                  alt="Cotton Lace Trim"
                  className="h-9 w-9 rounded-lg object-cover border border-gray-100 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 truncate">
                    Cotton Lace Trim (5m)
                  </p>
                  <p className="text-[11px] text-gray-500">Sold 10 units · <span className="text-gray-400">2 hours ago</span></p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src="/images/product-2.jpg"
                  alt="Embroidered Lace"
                  className="h-9 w-9 rounded-lg object-cover border border-gray-100 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 truncate">
                    New product added
                  </p>
                  <p className="text-[11px] text-gray-500">Embroidered Lace (3m) · <span className="text-gray-400">5 hours ago</span></p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src="/images/product-3.jpg"
                  alt="Zari Lace"
                  className="h-9 w-9 rounded-lg object-cover border border-gray-100 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 truncate">
                    Stock updated
                  </p>
                  <p className="text-[11px] text-gray-500">Zari Lace (5m) · <span className="text-gray-400">1 day ago</span></p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src="/images/product-4.jpg"
                  alt="Crochet Lace"
                  className="h-9 w-9 rounded-lg object-cover border border-gray-100 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 truncate">
                    Price changed
                  </p>
                  <p className="text-[11px] text-gray-500">Crochet Lace (4m) · <span className="text-gray-400">2 days ago</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

