import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const RECENT_ORDERS = [
  {
    id: 1,
    orderId: 'WO-2026-001',
    customer: 'Shree Textiles',
    items: 25,
    orderValue: '₹48,600',
    date: '25 Oct 2026',
    status: 'Processing',
    paymentStatus: 'Paid',
  },
  {
    id: 2,
    orderId: 'WO-2026-002',
    customer: 'Kavya Fashion',
    items: 18,
    orderValue: '₹32,450',
    date: '22 Oct 2026',
    status: 'Delivered',
    paymentStatus: 'Paid',
  },
  {
    id: 3,
    orderId: 'WO-2026-003',
    customer: 'Milan Creations',
    items: 32,
    orderValue: '₹76,200',
    date: '20 Oct 2026',
    status: 'Processing',
    paymentStatus: 'Pending',
  },
  {
    id: 4,
    orderId: 'WO-2026-004',
    customer: 'Raj Laces Hub',
    items: 20,
    orderValue: '₹54,300',
    date: '18 Oct 2026',
    status: 'Delivered',
    paymentStatus: 'Paid',
  },
  {
    id: 5,
    orderId: 'WO-2026-005',
    customer: 'Fashion Mart',
    items: 15,
    orderValue: '₹45,900',
    date: '15 Oct 2026',
    status: 'Cancelled',
    paymentStatus: 'Refunded',
  },
];

const TOP_CUSTOMERS = [
  { id: 1, initials: 'ST', name: 'Shree Textiles', orders: 18, amount: '₹2,18,760', percentage: '26%', color: 'bg-purple-100 text-purple-700' },
  { id: 2, initials: 'KF', name: 'Kavya Fashion', orders: 16, amount: '₹1,45,670', percentage: '17%', color: 'bg-rose-100 text-[#800020]' },
  { id: 3, initials: 'MC', name: 'Milan Creations', orders: 14, amount: '₹1,20,300', percentage: '14%', color: 'bg-blue-100 text-blue-700' },
  { id: 4, initials: 'RLH', name: 'Raj Laces Hub', orders: 12, amount: '₹92,450', percentage: '11%', color: 'bg-rose-100 text-[#800020]' },
  { id: 5, initials: 'FM', name: 'Fashion Mart', orders: 11, amount: '₹68,900', percentage: '8%', color: 'bg-sky-100 text-sky-700' },
];

const TOP_PRODUCTS = [
  { id: 1, name: 'Cotton Lace Trim', sold: '1,250', revenue: '₹1,72,500', image: '/images/product-1.jpg' },
  { id: 2, name: 'Embroidered Lace', sold: '980', revenue: '₹98,000', image: '/images/product-2.jpg' },
  { id: 3, name: 'Designer Lace', sold: '760', revenue: '₹91,200', image: '/images/product-5.jpg' },
  { id: 4, name: 'Zari Lace Trim', sold: '620', revenue: '₹58,900', image: '/images/product-7.jpg' },
  { id: 5, name: 'Mixed Lace Pack', sold: '580', revenue: '₹1,04,400', image: '/images/product-8.jpg' },
];

const TABS = [
  'Sales Overview',
  'Orders',
  'Customers',
  'Products',
  'Quotations',
  'Credit & Payments',
];

export default function AdminWholesaleReportsPage() {
  const [activeTab, setActiveTab] = useState('Sales Overview');
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] tracking-tight">
              Wholesale Reports
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Get insights into your wholesale business performance, sales, customers, and products.
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
            onClick={() => triggerToast('Exporting Wholesale Report...')}
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
            <span className="text-xs font-medium text-gray-500">Total Wholesale Sales</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <AdminIcon name="orders" size={16} strokeWidth={1.75} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">₹8,42,360</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 28%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Orders</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <AdminIcon name="content" size={16} strokeWidth={1.75} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">126</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 18%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Active Customers</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <AdminIcon name="customers" size={16} strokeWidth={1.75} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">72</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 12%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Average Order Value</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <span className="font-bold text-sm">₹</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">₹6,685</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 9%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 5 */}
        <div className="col-span-2 sm:col-span-1 rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Repeat Purchase Rate</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <span className="font-bold text-sm">%</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">64%</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 6%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
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

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Chart 1: Wholesale Sales Trend (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#800020]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <h2 className="text-sm sm:text-base font-bold text-gray-900">Wholesale Sales Trend</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FB7185]"></span>
              <span>Sales Amount (₹)</span>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="relative h-60 w-full pt-2">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 540 180">
              <line x1="45" y1="20" x2="520" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="45" y1="55" x2="520" y2="55" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="45" y1="90" x2="520" y2="90" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="45" y1="125" x2="520" y2="125" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="45" y1="160" x2="520" y2="160" stroke="#e2e8f0" />

              <text x="38" y="24" textAnchor="end" className="text-[10px] fill-gray-400">₹1,20,000</text>
              <text x="38" y="59" textAnchor="end" className="text-[10px] fill-gray-400">₹90,000</text>
              <text x="38" y="94" textAnchor="end" className="text-[10px] fill-gray-400">₹60,000</text>
              <text x="38" y="129" textAnchor="end" className="text-[10px] fill-gray-400">₹30,000</text>
              <text x="38" y="164" textAnchor="end" className="text-[10px] fill-gray-400">₹0</text>

              {/* Smooth trend curve */}
              <path
                d="M 60 148 Q 120 140, 150 120 T 240 125 T 320 90 T 400 110 T 480 60 T 510 50"
                fill="none"
                stroke="#FB7185"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Nodes */}
              {[
                { x: 60, y: 148 }, { x: 105, y: 140 }, { x: 150, y: 120 }, { x: 195, y: 130 },
                { x: 240, y: 125 }, { x: 285, y: 110 }, { x: 320, y: 90 }, { x: 360, y: 102 },
                { x: 400, y: 110 }, { x: 440, y: 80 }, { x: 480, y: 60 }, { x: 510, y: 50 },
              ].map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill="#FB7185" stroke="#fff" strokeWidth="1.5" />
              ))}

              <text x="60" y="174" textAnchor="middle" className="text-[10px] fill-gray-400">1 Oct</text>
              <text x="135" y="174" textAnchor="middle" className="text-[10px] fill-gray-400">5 Oct</text>
              <text x="210" y="174" textAnchor="middle" className="text-[10px] fill-gray-400">10 Oct</text>
              <text x="285" y="174" textAnchor="middle" className="text-[10px] fill-gray-400">15 Oct</text>
              <text x="360" y="174" textAnchor="middle" className="text-[10px] fill-gray-400">20 Oct</text>
              <text x="435" y="174" textAnchor="middle" className="text-[10px] fill-gray-400">25 Oct</text>
              <text x="510" y="174" textAnchor="middle" className="text-[10px] fill-gray-400">31 Oct</text>
            </svg>
          </div>
        </div>

        {/* Chart 2: Orders by Status (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <AdminIcon name="orders" size={16} className="text-[#800020]" strokeWidth={1.75} />
            <h2 className="text-sm sm:text-base font-bold text-gray-900">Orders by Status</h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-2">
            <div className="relative flex items-center justify-center h-40 w-40 shrink-0">
              <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                {/* Delivered 54% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray="128 238" strokeDashoffset="0" />
                {/* Pending 22% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#38BDF8" strokeWidth="14" strokeDasharray="52 238" strokeDashoffset="-128" />
                {/* Processing 14% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#FB7185" strokeWidth="14" strokeDasharray="33 238" strokeDashoffset="-180" />
                {/* Cancelled 6% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="14" strokeDasharray="14 238" strokeDashoffset="-213" />
                {/* Returned 3% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#A855F7" strokeWidth="14" strokeDasharray="8 238" strokeDashoffset="-227" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold text-gray-900">126</span>
                <span className="text-[10px] font-medium text-gray-400">Total Orders</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs w-full sm:w-auto">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                  <span className="h-2 w-2 rounded-full bg-[#10B981]"></span> Delivered
                </span>
                <span className="font-semibold text-gray-900">68 (54%)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                  <span className="h-2 w-2 rounded-full bg-[#38BDF8]"></span> Pending
                </span>
                <span className="font-semibold text-gray-900">28 (22%)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                  <span className="h-2 w-2 rounded-full bg-[#FB7185]"></span> Processing
                </span>
                <span className="font-semibold text-gray-900">18 (14%)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                  <span className="h-2 w-2 rounded-full bg-[#F59E0B]"></span> Cancelled
                </span>
                <span className="font-semibold text-gray-900">8 (6%)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                  <span className="h-2 w-2 rounded-full bg-[#A855F7]"></span> Returned
                </span>
                <span className="font-semibold text-gray-900">4 (3%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Multi-Column Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {/* Card 1: Top Selling Categories */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Top Selling Categories</h3>
              <button onClick={() => triggerToast('Viewing all categories')} className="text-xs font-semibold text-[#800020] hover:underline">
                View All →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-medium text-gray-700 mb-1">
                  <span>1. Lace Trim</span>
                  <span className="font-bold text-gray-900">₹2,84,560 (34%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#FB7185]" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-gray-700 mb-1">
                  <span>2. Embroidered Lace</span>
                  <span className="font-bold text-gray-900">₹1,82,430 (22%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#10B981]" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-gray-700 mb-1">
                  <span>3. Crochet Lace</span>
                  <span className="font-bold text-gray-900">₹1,26,350 (15%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#38BDF8]" style={{ width: '50%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-gray-700 mb-1">
                  <span>4. Zari Lace</span>
                  <span className="font-bold text-gray-900">₹84,210 (10%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#F59E0B]" style={{ width: '38%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-gray-700 mb-1">
                  <span>5. Net Lace</span>
                  <span className="font-bold text-gray-900">₹67,890 (8%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#A855F7]" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Top Wholesale Customers */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Top Wholesale Customers</h3>
              <button onClick={() => triggerToast('Viewing customers')} className="text-xs font-semibold text-[#800020] hover:underline">
                View All →
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {TOP_CUSTOMERS.map((c) => (
                <div key={c.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[11px] font-bold text-gray-400 w-3">{c.id}</span>
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-bold ${c.color}`}>
                      {c.initials}
                    </div>
                    <span className="font-semibold text-gray-900 truncate max-w-[90px]">{c.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900">{c.amount}</span>
                    <span className="text-[10px] text-gray-400 ml-1">({c.percentage})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Top Wholesale Products */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Top Wholesale Products</h3>
              <button onClick={() => triggerToast('Viewing products')} className="text-xs font-semibold text-[#800020] hover:underline">
                View All →
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {TOP_PRODUCTS.map((p) => (
                <div key={p.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[11px] font-bold text-gray-400 w-3">{p.id}</span>
                    <img src={p.image} alt={p.name} className="h-6 w-6 rounded object-cover border border-gray-100 shrink-0" />
                    <span className="font-semibold text-gray-900 truncate max-w-[95px]">{p.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900">{p.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 4: Sales by Customer Type */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">Sales by Customer Type</h3>

            <div className="flex flex-col items-center py-1">
              <div className="relative flex items-center justify-center h-28 w-28 shrink-0 mb-3">
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                  {/* Retailers 45% */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#FB7185" strokeWidth="14" strokeDasharray="107 238" strokeDashoffset="0" />
                  {/* Boutiques 25% */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray="60 238" strokeDashoffset="-107" />
                  {/* Manufacturers 15% */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#38BDF8" strokeWidth="14" strokeDasharray="36 238" strokeDashoffset="-167" />
                  {/* Distributors 10% */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="14" strokeDasharray="24 238" strokeDashoffset="-203" />
                  {/* Resellers 5% */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#A855F7" strokeWidth="14" strokeDasharray="12 238" strokeDashoffset="-227" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-gray-900">₹8,42,360</span>
                  <span className="text-[8px] text-gray-400">Total Sales</span>
                </div>
              </div>

              <div className="w-full space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#FB7185]"></span> Retailers
                  </span>
                  <span className="font-semibold text-gray-800">45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#10B981]"></span> Boutiques
                  </span>
                  <span className="font-semibold text-gray-800">25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#38BDF8]"></span> Manufacturers
                  </span>
                  <span className="font-semibold text-gray-800">15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#F59E0B]"></span> Distributors
                  </span>
                  <span className="font-semibold text-gray-800">10%</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#A855F7]"></span> Resellers
                  </span>
                  <span className="font-semibold text-gray-800">5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Orders (8 cols) + Reports & Exports (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Wholesale Orders */}
        <div className="lg:col-span-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <AdminIcon name="orders" size={16} className="text-[#800020]" strokeWidth={1.75} />
              <h3 className="text-sm font-bold text-gray-900">Recent Wholesale Orders</h3>
            </div>
            <Link to="/admin/wholesale/bulk-orders" className="text-xs font-semibold text-[#800020] hover:underline">
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
                  <th className="py-2.5 px-2 text-center">Items</th>
                  <th className="py-2.5 px-3">Order Value</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Payment Status</th>
                  <th className="py-2.5 px-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {RECENT_ORDERS.map((o) => (
                  <tr key={o.id} className="hover:bg-[#FFF5F7] transition-colors">
                    <td className="py-2.5 px-2 font-medium text-gray-500">{o.id}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-gray-900">{o.orderId}</td>
                    <td className="py-2.5 px-3 font-semibold text-gray-900">{o.customer}</td>
                    <td className="py-2.5 px-2 text-center font-bold text-gray-700">{o.items}</td>
                    <td className="py-2.5 px-3 font-bold text-gray-900">{o.orderValue}</td>
                    <td className="py-2.5 px-3 text-gray-500 text-[11px] whitespace-nowrap">{o.date}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${
                          o.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-700'
                            : o.status === 'Processing'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${
                          o.paymentStatus === 'Paid'
                            ? 'bg-emerald-50 text-emerald-700'
                            : o.paymentStatus === 'Pending'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => triggerToast(`Viewing ${o.orderId}`)} className="rounded p-1 text-gray-400 hover:text-[#800020]">
                          <AdminIcon name="eye" size={13} strokeWidth={1.75} />
                        </button>
                        <button onClick={() => triggerToast(`Editing ${o.orderId}`)} className="rounded p-1 text-gray-400 hover:text-[#800020]">
                          <AdminIcon name="edit" size={13} strokeWidth={1.75} />
                        </button>
                        <button onClick={() => triggerToast(`Options for ${o.orderId}`)} className="rounded p-1 text-gray-400 hover:text-gray-600">
                          <AdminIcon name="moreVertical" size={13} strokeWidth={1.75} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reports & Exports */}
        <div className="lg:col-span-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AdminIcon name="content" size={16} className="text-[#800020]" strokeWidth={1.75} />
              <h3 className="text-sm font-bold text-gray-900">Reports & Exports</h3>
            </div>
            <p className="text-[11px] text-gray-400 mb-4">Download detailed wholesale reports.</p>

            <div className="space-y-2.5 text-xs">
              <button
                onClick={() => triggerToast('Downloading Sales Report (Excel)...')}
                className="w-full flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-3 hover:bg-[#FFF5F7] hover:border-rose-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <AdminIcon name="content" size={14} strokeWidth={1.75} />
                  </div>
                  <span className="font-semibold text-gray-800">Sales Report (Excel)</span>
                </div>
                <AdminIcon name="download" size={14} className="text-gray-400" strokeWidth={1.75} />
              </button>

              <button
                onClick={() => triggerToast('Downloading Orders Report (Excel)...')}
                className="w-full flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-3 hover:bg-[#FFF5F7] hover:border-rose-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <AdminIcon name="orders" size={14} strokeWidth={1.75} />
                  </div>
                  <span className="font-semibold text-gray-800">Orders Report (Excel)</span>
                </div>
                <AdminIcon name="download" size={14} className="text-gray-400" strokeWidth={1.75} />
              </button>

              <button
                onClick={() => triggerToast('Downloading Customer Report (Excel)...')}
                className="w-full flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-3 hover:bg-[#FFF5F7] hover:border-rose-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                    <AdminIcon name="customers" size={14} strokeWidth={1.75} />
                  </div>
                  <span className="font-semibold text-gray-800">Customer Report (Excel)</span>
                </div>
                <AdminIcon name="download" size={14} className="text-gray-400" strokeWidth={1.75} />
              </button>

              <button
                onClick={() => triggerToast('Downloading Product Report (Excel)...')}
                className="w-full flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-3 hover:bg-[#FFF5F7] hover:border-rose-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <AdminIcon name="products" size={14} strokeWidth={1.75} />
                  </div>
                  <span className="font-semibold text-gray-800">Product Report (Excel)</span>
                </div>
                <AdminIcon name="download" size={14} className="text-gray-400" strokeWidth={1.75} />
              </button>

              <button
                onClick={() => triggerToast('Downloading Credit & Payments Report (PDF)...')}
                className="w-full flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-3 hover:bg-[#FFF5F7] hover:border-rose-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                    <AdminIcon name="content" size={14} strokeWidth={1.75} />
                  </div>
                  <span className="font-semibold text-gray-800">Credit & Payments Report (PDF)</span>
                </div>
                <AdminIcon name="download" size={14} className="text-gray-400" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

