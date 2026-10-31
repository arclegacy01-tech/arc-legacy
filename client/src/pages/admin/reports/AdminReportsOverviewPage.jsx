import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const RECENT_ORDERS = [
  {
    id: 1,
    orderId: '#AL2761',
    customer: 'Shree Traders',
    type: 'Wholesale',
    amount: '₹ 12,450',
    status: 'Delivered',
    date: '31 Oct 2026',
  },
  {
    id: 2,
    orderId: '#AL2760',
    customer: 'Pooja Fashion Hub',
    type: 'Wholesale',
    amount: '₹ 18,900',
    status: 'Processing',
    date: '30 Oct 2026',
  },
  {
    id: 3,
    orderId: '#AL2759',
    customer: 'Riya Lace House',
    type: 'Retail',
    amount: '₹ 2,350',
    status: 'Shipped',
    date: '30 Oct 2026',
  },
  {
    id: 4,
    orderId: '#AL2758',
    customer: 'Meera Textiles',
    type: 'Wholesale',
    amount: '₹ 25,800',
    status: 'Delivered',
    date: '29 Oct 2026',
  },
  {
    id: 5,
    orderId: '#AL2757',
    customer: 'Kavya Creations',
    type: 'Retail',
    amount: '₹ 1,980',
    status: 'Processing',
    date: '28 Oct 2026',
  },
];

const TOP_PRODUCTS = [
  {
    id: 1,
    name: 'Cotton Lace Trim (5m)',
    sold: 420,
    revenue: '₹ 84,000',
    image: '/images/product-1.jpg',
  },
  {
    id: 2,
    name: 'Embroidered Lace (3m)',
    sold: 310,
    revenue: '₹ 74,400',
    image: '/images/product-2.jpg',
  },
  {
    id: 3,
    name: 'Zari Lace (5m)',
    sold: 260,
    revenue: '₹ 62,400',
    image: '/images/product-3.jpg',
  },
  {
    id: 4,
    name: 'Crochet Lace (4m)',
    sold: 232,
    revenue: '₹ 46,400',
    image: '/images/product-4.jpg',
  },
  {
    id: 5,
    name: 'Designer Lace Trim (5m)',
    sold: 210,
    revenue: '₹ 52,500',
    image: '/images/product-5.jpg',
  },
];

const TABS = [
  { label: 'Overview', to: '/admin/reports' },
  { label: 'Sales Reports', to: '/admin/reports/sales' },
  { label: 'Product Reports', to: '/admin/reports/products' },
  { label: 'Customer Reports', to: '/admin/reports/customers' },
  { label: 'Marketing Reports', to: '/admin/reports/marketing' },
  { label: 'Inventory Reports', to: '/admin/reports/inventory' },
  { label: 'Export Reports', to: '/admin/reports/export' },
];

export default function AdminReportsOverviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const outletCtx = useOutletContext() || {};

  const isSalesRoute = location.pathname.includes('/reports/sales');
  const [activeTab, setActiveTab] = useState(isSalesRoute ? 'Sales Reports' : 'Overview');
  const [reportTypeFilter, setReportTypeFilter] = useState('Sales Report');
  const [channelFilter, setChannelFilter] = useState('All Channels');
  const [customerTypeFilter, setCustomerTypeFilter] = useState('All Customers');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab.label);
    if (tab.to) {
      navigate(tab.to);
    }
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
        <span className="font-semibold text-[#800020]">Reports</span>
      </div>

      {/* Header Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0F3] text-[#800020] shadow-sm border border-[#FFE4E8]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] tracking-tight">
              Reports
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Get insights into your wholesale store's performance, sales, customers, and more.
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
            onClick={() => triggerToast('Exporting Comprehensive Report...')}
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
        {/* Card 1: Total Sales */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Sales</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <span className="font-bold text-sm">₹</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">₹4,85,320</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 28%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 2: Total Orders */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Orders</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ECFDF5] text-emerald-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 3h2.5l2.2 11.2a2 2 0 002 1.6h8.8a2 2 0 001.9-1.4L22 7H6" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">276</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 24%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 3: New Customers */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">New Customers</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F3E8FF] text-purple-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">64</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 33%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 4: Avg Order Value */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Avg. Order Value</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FEF3C7] text-amber-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">₹1,758</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 12%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 5: Total Products Sold */}
        <div className="col-span-2 sm:col-span-1 rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Products Sold</span>
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
      </div>

      {/* Tabs */}
      <div className="mb-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {TABS.map((tab) => {
          const isActive =
            (tab.label === 'Overview' && location.pathname === '/admin/reports') ||
            (tab.label === 'Sales Reports' && location.pathname.includes('/reports/sales')) ||
            activeTab === tab.label;

          return (
            <button
              key={tab.label}
              onClick={() => handleTabClick(tab)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-[#800020] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-[#FFF0F3] hover:text-[#800020] border border-gray-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Left Area (9 cols) + Right Sidebar (3 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column (9 cols) */}
        <div className="xl:col-span-9 space-y-6">
          {/* Top Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart 1: Sales Overview (7 cols) */}
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
                      Sales Overview
                    </h2>
                    <p className="text-[11px] text-gray-500">
                      Total sales and orders over time
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1.5 font-medium text-gray-600">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FB7185]"></span>
                      Sales (₹)
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-gray-600">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]"></span>
                      Orders
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
                  <text x="32" y="24" textAnchor="end" className="text-[10px] fill-gray-400">2L</text>
                  <text x="32" y="64" textAnchor="end" className="text-[10px] fill-gray-400">1.5L</text>
                  <text x="32" y="104" textAnchor="end" className="text-[10px] fill-gray-400">1L</text>
                  <text x="32" y="144" textAnchor="end" className="text-[10px] fill-gray-400">50K</text>
                  <text x="32" y="184" textAnchor="end" className="text-[10px] fill-gray-400">0</text>

                  {/* Bar Columns (Sales) */}
                  {[
                    { x: 55, h: 48 }, { x: 75, h: 56 }, { x: 95, h: 62 }, { x: 115, h: 60 },
                    { x: 135, h: 68 }, { x: 155, h: 76 }, { x: 175, h: 72 }, { x: 195, h: 84 },
                    { x: 215, h: 92 }, { x: 235, h: 86 }, { x: 255, h: 95 }, { x: 275, h: 104 },
                    { x: 295, h: 98 }, { x: 315, h: 112 }, { x: 335, h: 122 }, { x: 355, h: 118 },
                    { x: 375, h: 128 }, { x: 395, h: 136 }, { x: 415, h: 130 }, { x: 435, h: 144 },
                    { x: 455, h: 150 }, { x: 475, h: 158 }, { x: 495, h: 165 },
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

                  {/* Orders Trend Line */}
                  <path
                    d="M 55 142 Q 120 132, 180 118 T 300 84 T 420 46 T 495 22"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Nodes */}
                  <circle cx="55" cy="142" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="120" cy="132" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="180" cy="118" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="240" cy="102" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="300" cy="84" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="360" cy="65" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="420" cy="46" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="495" cy="22" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />

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

            {/* Chart 2: Order Status Donut (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF0F3] text-[#800020]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-gray-900">Order Status</h2>
                </div>
                <p className="text-[11px] text-gray-500 mb-4">Distribution of orders by status</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-2">
                {/* Donut graphic */}
                <div className="relative flex items-center justify-center h-44 w-44 shrink-0">
                  <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                    {/* Delivered 57% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="14"
                      strokeDasharray="136 238"
                      strokeDashoffset="0"
                    />
                    {/* Processing 22% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#FB7185"
                      strokeWidth="14"
                      strokeDasharray="52 238"
                      strokeDashoffset="-136"
                    />
                    {/* Shipped 14% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#38BDF8"
                      strokeWidth="14"
                      strokeDasharray="33 238"
                      strokeDashoffset="-188"
                    />
                    {/* Cancelled 8% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="14"
                      strokeDasharray="19 238"
                      strokeDashoffset="-221"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-bold text-gray-900 leading-tight">276</span>
                    <span className="text-[10px] font-medium text-gray-400">Total Orders</span>
                  </div>
                </div>

                {/* Legend list */}
                <div className="space-y-1.5 text-xs w-full sm:w-auto">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#10B981]"></span> Delivered
                    </span>
                    <span className="text-gray-900 font-semibold">156 (57%)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#FB7185]"></span> Processing
                    </span>
                    <span className="text-gray-900 font-semibold">62 (22%)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#38BDF8]"></span> Shipped
                    </span>
                    <span className="text-gray-900 font-semibold">38 (14%)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#F59E0B]"></span> Cancelled
                    </span>
                    <span className="text-gray-900 font-semibold">12 (8%)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#64748B]"></span> Returned
                    </span>
                    <span className="text-gray-900 font-semibold">8 (3%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row: 3 Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Top Selling Categories */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Top Selling Categories</h3>
                <p className="text-[11px] text-gray-500 mb-3">Based on quantity sold</p>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between font-medium text-gray-700 mb-1">
                      <span>Lace Trims</span>
                      <span className="font-bold text-gray-900">620</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-[#FB7185]" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium text-gray-700 mb-1">
                      <span>Embroidered Laces</span>
                      <span className="font-bold text-gray-900">420</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-[#10B981]" style={{ width: '68%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium text-gray-700 mb-1">
                      <span>Cotton Laces</span>
                      <span className="font-bold text-gray-900">310</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-[#FB7185]" style={{ width: '50%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium text-gray-700 mb-1">
                      <span>Zari Laces</span>
                      <span className="font-bold text-gray-900">260</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-[#C084FC]" style={{ width: '42%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium text-gray-700 mb-1">
                      <span>Crochet Laces</span>
                      <span className="font-bold text-gray-900">232</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-[#38BDF8]" style={{ width: '37%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Sales by Channel */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Sales by Channel</h3>
                <p className="text-[11px] text-gray-500 mb-2">Orders distribution by sales channel</p>

                <div className="flex flex-col items-center py-1">
                  <div className="relative flex items-center justify-center h-28 w-28 shrink-0 mb-3">
                    <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                      {/* Website 51% */}
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#FB7185" strokeWidth="14" strokeDasharray="121 238" strokeDashoffset="0" />
                      {/* Wholesale Direct 25% */}
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray="60 238" strokeDashoffset="-121" />
                      {/* Marketplace 15% */}
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#38BDF8" strokeWidth="14" strokeDasharray="36 238" strokeDashoffset="-181" />
                      {/* Offline 9% */}
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="14" strokeDasharray="21 238" strokeDashoffset="-217" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-sm font-bold text-gray-900">276</span>
                      <span className="text-[9px] text-gray-400">Total Orders</span>
                    </div>
                  </div>

                  <div className="w-full space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1.5 text-gray-600">
                        <span className="h-2 w-2 rounded-full bg-[#FB7185]"></span> Website
                      </span>
                      <span className="font-semibold text-gray-800">142 (51%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1.5 text-gray-600">
                        <span className="h-2 w-2 rounded-full bg-[#10B981]"></span> Wholesale Direct
                      </span>
                      <span className="font-semibold text-gray-800">68 (25%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1.5 text-gray-600">
                        <span className="h-2 w-2 rounded-full bg-[#38BDF8]"></span> Marketplace
                      </span>
                      <span className="font-semibold text-gray-800">42 (15%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1.5 text-gray-600">
                        <span className="h-2 w-2 rounded-full bg-[#F59E0B]"></span> Offline
                      </span>
                      <span className="font-semibold text-gray-800">24 (9%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Customer Type */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Customer Type</h3>
                <p className="text-[11px] text-gray-500 mb-2">Orders by customer type</p>

                <div className="flex flex-col items-center py-1">
                  <div className="relative flex items-center justify-center h-28 w-28 shrink-0 mb-3">
                    <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                      {/* Wholesale 65% */}
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#FB7185" strokeWidth="14" strokeDasharray="155 238" strokeDashoffset="0" />
                      {/* Retail 35% */}
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray="83 238" strokeDashoffset="-155" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-sm font-bold text-gray-900">276</span>
                      <span className="text-[9px] text-gray-400">Total Orders</span>
                    </div>
                  </div>

                  <div className="w-full space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1.5 text-gray-600">
                        <span className="h-2 w-2 rounded-full bg-[#FB7185]"></span> Wholesale
                      </span>
                      <span className="font-semibold text-gray-800">180 (65%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1.5 text-gray-600">
                        <span className="h-2 w-2 rounded-full bg-[#10B981]"></span> Retail
                      </span>
                      <span className="font-semibold text-gray-800">96 (35%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Recent Orders (Left) + Top Products (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Recent Orders (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF0F3] text-[#800020]">
                    <AdminIcon name="orders" size={14} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Recent Orders</h3>
                    <p className="text-[11px] text-gray-500">Latest 5 orders from your store</p>
                  </div>
                </div>
                <Link
                  to="/admin/orders"
                  className="text-xs font-semibold text-[#800020] hover:underline"
                >
                  View All →
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FFF9F9] text-gray-600 font-semibold uppercase tracking-wider border-b border-gray-100">
                    <tr>
                      <th className="py-2.5 px-2">#</th>
                      <th className="py-2.5 px-3">Order ID</th>
                      <th className="py-2.5 px-3">Customer Name</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {RECENT_ORDERS.map((o) => (
                      <tr key={o.id} className="hover:bg-[#FFF5F7] transition-colors">
                        <td className="py-2.5 px-2 font-medium text-gray-500">{o.id}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-gray-900">{o.orderId}</td>
                        <td className="py-2.5 px-3 font-semibold text-gray-800">{o.customer}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                              o.type === 'Wholesale'
                                ? 'bg-[#FFF0F3] text-[#800020]'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {o.type}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-bold text-gray-900">{o.amount}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                              o.status === 'Delivered'
                                ? 'bg-emerald-50 text-emerald-700'
                                : o.status === 'Processing'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-blue-50 text-blue-700'
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-gray-500 text-[11px]">{o.date}</td>
                        <td className="py-2.5 px-2 text-center">
                          <button
                            onClick={() => triggerToast(`Viewing order ${o.orderId}`)}
                            title="View order"
                            className="rounded p-1 text-gray-400 hover:text-[#800020]"
                          >
                            <AdminIcon name="eye" size={13} strokeWidth={1.75} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF0F3] text-[#800020]">
                    <AdminIcon name="products" size={14} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Top Products</h3>
                    <p className="text-[11px] text-gray-500">Best performing products this period</p>
                  </div>
                </div>
                <Link
                  to="/admin/reports/products"
                  className="text-xs font-semibold text-[#800020] hover:underline"
                >
                  View All →
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FFF9F9] text-gray-600 font-semibold uppercase tracking-wider border-b border-gray-100">
                    <tr>
                      <th className="py-2.5 px-2">#</th>
                      <th className="py-2.5 px-3">Product</th>
                      <th className="py-2.5 px-3 text-center">Sold</th>
                      <th className="py-2.5 px-3 text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {TOP_PRODUCTS.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FFF5F7] transition-colors">
                        <td className="py-2.5 px-2 font-medium text-gray-500">{p.id}</td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-7 w-7 rounded object-cover border border-gray-100 shrink-0"
                            />
                            <span className="font-semibold text-gray-900 truncate max-w-[140px]">
                              {p.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-center font-bold text-gray-800">{p.sold}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-gray-900">{p.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column (3 cols) */}
        <div className="xl:col-span-3 space-y-6">
          {/* Report Filters */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
              <AdminIcon name="filter" size={16} className="text-[#800020]" strokeWidth={1.75} />
              <h3 className="text-sm font-bold text-gray-900">Report Filters</h3>
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
                <label className="block font-medium text-gray-600 mb-1">Report Type</label>
                <select
                  value={reportTypeFilter}
                  onChange={(e) => setReportTypeFilter(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>Sales Report</option>
                  <option>Orders Report</option>
                  <option>Customer Report</option>
                  <option>Product Report</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-600 mb-1">Sales Channel</label>
                <select
                  value={channelFilter}
                  onChange={(e) => setChannelFilter(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Channels</option>
                  <option>Website</option>
                  <option>Wholesale Direct</option>
                  <option>Marketplace</option>
                  <option>Offline</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-600 mb-1">Customer Type</label>
                <select
                  value={customerTypeFilter}
                  onChange={(e) => setCustomerTypeFilter(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Customers</option>
                  <option>Wholesale</option>
                  <option>Retail</option>
                </select>
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

              <div className="pt-2">
                <button
                  onClick={() => triggerToast('Report filters applied')}
                  className="w-full rounded-xl bg-[#800020] py-2.5 text-center text-xs font-semibold text-white shadow-sm hover:bg-[#660019] transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Quick Export */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <AdminIcon name="download" size={16} className="text-[#800020]" strokeWidth={1.75} />
              <h3 className="text-sm font-bold text-gray-900">Quick Export</h3>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => triggerToast('Exporting Sales Report PDF...')}
                className="flex flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50/50 p-3 text-center hover:bg-red-50 transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-700 mb-1.5 group-hover:scale-105 transition-transform">
                  <AdminIcon name="content" size={16} strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-semibold text-gray-800">Sales Report PDF</span>
              </button>

              <button
                onClick={() => triggerToast('Exporting Orders Report Excel...')}
                className="flex flex-col items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 text-center hover:bg-emerald-50 transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 mb-1.5 group-hover:scale-105 transition-transform">
                  <AdminIcon name="orders" size={16} strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-semibold text-gray-800">Orders Report Excel</span>
              </button>

              <button
                onClick={() => triggerToast('Exporting Product Report Excel...')}
                className="flex flex-col items-center justify-center rounded-xl border border-blue-100 bg-blue-50/50 p-3 text-center hover:bg-blue-50 transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 mb-1.5 group-hover:scale-105 transition-transform">
                  <AdminIcon name="products" size={16} strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-semibold text-gray-800">Product Report Excel</span>
              </button>

              <button
                onClick={() => triggerToast('Exporting Customer Report PDF...')}
                className="flex flex-col items-center justify-center rounded-xl border border-amber-100 bg-amber-50/50 p-3 text-center hover:bg-amber-50 transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700 mb-1.5 group-hover:scale-105 transition-transform">
                  <AdminIcon name="customers" size={16} strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-semibold text-gray-800">Customer Report PDF</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AdminIcon name="clock" size={16} className="text-[#800020]" strokeWidth={1.75} />
                <h3 className="text-sm font-bold text-gray-900">Recent Activity</h3>
              </div>
              <button
                onClick={() => triggerToast('Viewing all report activity')}
                className="text-xs font-semibold text-[#800020] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-[#800020]">
                  <AdminIcon name="orders" size={14} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 leading-snug">
                    New wholesale order received #AL2761 - ₹ 12,450
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">31 Oct 2026, 02:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <AdminIcon name="reports" size={14} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 leading-snug">
                    Sales report generated October 2026
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">31 Oct 2026, 11:20 AM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <AdminIcon name="download" size={14} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 leading-snug">
                    Inventory report exported Excel file
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">30 Oct 2026, 06:15 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-[#800020]">
                  <AdminIcon name="customers" size={14} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 leading-snug">
                    New customer registered Shree Traders (Wholesale)
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">30 Oct 2026, 04:10 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

