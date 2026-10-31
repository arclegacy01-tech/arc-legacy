import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_BULK_ORDERS = [
  {
    id: 1,
    orderId: '#WHO5201',
    company: 'Shree Textiles',
    tier: 'Platinum Tier',
    items: ['/images/product-1.jpg', '/images/product-2.jpg'],
    totalQty: 250,
    orderValue: '₹48,600',
    status: 'Processing',
    orderDate: '18 Oct 2026 10:24 AM',
  },
  {
    id: 2,
    orderId: '#WHO5200',
    company: 'Dev Textile Store',
    tier: 'Gold Tier',
    items: ['/images/product-3.jpg', '/images/product-4.jpg'],
    totalQty: 520,
    orderValue: '₹3,10,200',
    status: 'Packed',
    orderDate: '17 Oct 2026 04:18 PM',
  },
  {
    id: 3,
    orderId: '#WHO5199',
    company: 'Kavya Fashion',
    tier: 'Gold Tier',
    items: ['/images/product-5.jpg', '/images/product-6.jpg'],
    totalQty: 320,
    orderValue: '₹1,68,420',
    status: 'Shipped',
    orderDate: '16 Oct 2026 02:45 PM',
  },
  {
    id: 4,
    orderId: '#WHO5198',
    company: 'Raj Laces Hub',
    tier: 'Silver Tier',
    items: ['/images/product-7.jpg', '/images/product-8.jpg'],
    totalQty: 420,
    orderValue: '₹1,22,300',
    status: 'Delivered',
    orderDate: '15 Oct 2026 06:42 PM',
  },
  {
    id: 5,
    orderId: '#WHO5197',
    company: 'Trendy Boutique',
    tier: 'Gold Tier',
    items: ['/images/product-9.jpg', '/images/product-10.jpg'],
    totalQty: 280,
    orderValue: '₹1,45,670',
    status: 'Processing',
    orderDate: '14 Oct 2026 04:12 PM',
  },
  {
    id: 6,
    orderId: '#WHO5196',
    company: 'Fashion Mart',
    tier: 'Silver Tier',
    items: ['/images/product-11.jpg', '/images/product-12.jpg'],
    totalQty: 150,
    orderValue: '₹76,540',
    status: 'Pending',
    orderDate: '13 Oct 2026 03:54 PM',
  },
  {
    id: 7,
    orderId: '#WHO5195',
    company: 'Gujarat Lace House',
    tier: 'Silver Tier',
    items: ['/images/product-1.jpg', '/images/product-3.jpg'],
    totalQty: 300,
    orderValue: '₹98,750',
    status: 'Packed',
    orderDate: '12 Oct 2026 12:28 PM',
  },
  {
    id: 8,
    orderId: '#WHO5194',
    company: 'Satyam Fabrics',
    tier: 'Gold Tier',
    items: ['/images/product-2.jpg', '/images/product-4.jpg'],
    totalQty: 200,
    orderValue: '₹68,900',
    status: 'Shipped',
    orderDate: '11 Oct 2026 11:16 AM',
  },
  {
    id: 9,
    orderId: '#WHO5193',
    company: 'Milan Creations',
    tier: 'Silver Tier',
    items: ['/images/product-5.jpg', '/images/product-7.jpg'],
    totalQty: 140,
    orderValue: '₹54,320',
    status: 'Processing',
    orderDate: '10 Oct 2026 05:48 PM',
  },
  {
    id: 10,
    orderId: '#WHO5192',
    company: 'Pooja Collection',
    tier: 'Gold Tier',
    items: ['/images/product-6.jpg', '/images/product-8.jpg'],
    totalQty: 400,
    orderValue: '₹1,10,430',
    status: 'Delivered',
    orderDate: '09 Oct 2026 01:22 PM',
  },
];

const RECENT_SIDEBAR_ORDERS = [
  {
    id: 1,
    orderId: '#WHO5201',
    company: 'Shree Textiles',
    qtyDesc: '250 Items · ₹48,600',
    status: 'Processing',
    image: '/images/product-1.jpg',
  },
  {
    id: 2,
    orderId: '#WHO5200',
    company: 'Dev Textile Store',
    qtyDesc: '520 Items · ₹3,10,200',
    status: 'Packed',
    image: '/images/product-2.jpg',
  },
  {
    id: 3,
    orderId: '#WHO5199',
    company: 'Kavya Fashion',
    qtyDesc: '320 Items · ₹1,68,420',
    status: 'Shipped',
    image: '/images/product-3.jpg',
  },
  {
    id: 4,
    orderId: '#WHO5198',
    company: 'Raj Laces Hub',
    qtyDesc: '420 Items · ₹1,22,300',
    status: 'Delivered',
    image: '/images/product-4.jpg',
  },
  {
    id: 5,
    orderId: '#WHO5197',
    company: 'Trendy Boutique',
    qtyDesc: '280 Items · ₹1,45,670',
    status: 'Processing',
    image: '/images/product-5.jpg',
  },
];

export default function AdminBulkOrdersPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [tierFilter, setTierFilter] = useState('All Tiers');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredOrders = useMemo(() => {
    return INITIAL_BULK_ORDERS.filter((o) => {
      const matchSearch =
        !effectiveSearch ||
        o.orderId.toLowerCase().includes(effectiveSearch) ||
        o.company.toLowerCase().includes(effectiveSearch) ||
        o.tier.toLowerCase().includes(effectiveSearch);

      const matchStatus = statusFilter === 'All Statuses' || o.status === statusFilter;
      const matchTier = tierFilter === 'All Tiers' || o.tier.includes(tierFilter);

      return matchSearch && matchStatus && matchTier;
    });
  }, [effectiveSearch, statusFilter, tierFilter]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredOrders.map((o) => o.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'Packed':
        return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'Shipped':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Delivered':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
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
        <span className="font-semibold text-[#800020]">Bulk Orders</span>
      </div>

      {/* Header Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0F3] text-[#800020] shadow-sm border border-[#FFE4E8]">
            <AdminIcon name="orders" size={24} strokeWidth={1.75} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] tracking-tight">
              Bulk Orders
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              View and manage wholesale bulk orders, track status, and process shipments efficiently.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => triggerToast('Opening Create Bulk Order dialog...')}
            className="flex items-center gap-2 rounded-xl bg-[#800020] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#660019] transition-all"
          >
            <AdminIcon name="plus" size={16} strokeWidth={2} />
            <span>Create Bulk Order</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
        {/* Card 1 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Bulk Orders</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <AdminIcon name="orders" size={16} strokeWidth={1.75} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">420</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 18%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Order Value</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F3E8FF] text-purple-700">
              <span className="font-bold text-sm">₹</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">₹18,56,240</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 32%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">this month</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Items Ordered</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F3E8FF] text-purple-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">12,450</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 21%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">this month</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Pending Orders</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <rect x="1" y="3" width="15" height="13" rx="2" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">28</span>
            <span className="flex items-center text-xs font-semibold text-rose-600">
              ↓ 12%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">awaiting processing</p>
        </div>
      </div>

      {/* Main Grid: Left Area (9 cols) + Right Sidebar (3 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column (9 cols) */}
        <div className="xl:col-span-9 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            {/* Filter Bar */}
            <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[240px]">
                <AdminIcon
                  name="search"
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  strokeWidth={1.75}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by order ID, customer name, company, or product..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/60 py-2.5 pl-9 pr-3 text-xs text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#800020] focus:bg-white focus:ring-1 focus:ring-[#800020]"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Statuses</option>
                  <option>Processing</option>
                  <option>Packed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Pending</option>
                </select>

                <select
                  value={tierFilter}
                  onChange={(e) => setTierFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Tiers</option>
                  <option>Platinum</option>
                  <option>Gold</option>
                  <option>Silver</option>
                </select>

                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700">
                  <AdminIcon name="calendar" size={14} className="text-gray-400" strokeWidth={1.75} />
                  <span>Select Date Range</span>
                  <AdminIcon name="chevronDown" size={12} className="text-gray-400" strokeWidth={1.75} />
                </div>

                <button
                  onClick={() => triggerToast('Filters applied')}
                  className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-[#FFF5F7] px-3.5 py-2 text-xs font-semibold text-[#800020] hover:bg-[#FFEBF0]"
                >
                  <AdminIcon name="filter" size={14} strokeWidth={1.75} />
                  <span>Filters</span>
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
                          selectedIds.length === filteredOrders.length
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                      />
                    </th>
                    <th className="py-3 px-3 w-8">#</th>
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-4">Customer / Company</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-3">Total Quantity</th>
                    <th className="py-3 px-3">Order Value</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4">Order Date</th>
                    <th className="py-3 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="py-8 text-center text-gray-400">
                        No bulk orders found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((o) => {
                      const isSelected = selectedIds.includes(o.id);
                      return (
                        <tr
                          key={o.id}
                          className={`transition-colors hover:bg-[#FFF5F7] ${
                            isSelected ? 'bg-[#FFF0F3]' : ''
                          }`}
                        >
                          <td className="py-3.5 px-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(o.id)}
                              className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                            />
                          </td>
                          <td className="py-3.5 px-3 font-medium text-gray-500">{o.id}</td>
                          <td className="py-3.5 px-3 font-bold text-gray-900 font-mono">
                            {o.orderId}
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-gray-900">{o.company}</p>
                            <span className="inline-block mt-0.5 text-[10px] text-gray-500 font-medium">
                              {o.tier}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              {o.items.map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img}
                                  alt="Item thumbnail"
                                  className="h-8 w-8 rounded-lg object-cover border border-gray-100"
                                />
                              ))}
                            </div>
                          </td>
                          <td className="py-3.5 px-3 font-semibold text-gray-800">{o.totalQty}</td>
                          <td className="py-3.5 px-3 font-bold text-gray-900">{o.orderValue}</td>
                          <td className="py-3.5 px-3">
                            <span
                              className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-[11px] font-semibold ${getStatusBadge(
                                o.status
                              )}`}
                            >
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-gray-500 text-[11px] whitespace-nowrap">
                            {o.orderDate}
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => triggerToast(`Viewing details for ${o.orderId}`)}
                                title="View Order"
                                className="rounded p-1 text-gray-400 hover:text-[#800020] transition-colors"
                              >
                                <AdminIcon name="eye" size={14} strokeWidth={1.75} />
                              </button>
                              <button
                                onClick={() => triggerToast(`Dispatch / Shipment for ${o.orderId}`)}
                                title="Process Shipment"
                                className="rounded p-1 text-gray-400 hover:text-[#800020] transition-colors"
                              >
                                <AdminIcon name="orders" size={14} strokeWidth={1.75} />
                              </button>
                              <button
                                onClick={() => triggerToast(`Options for ${o.orderId}`)}
                                title="More options"
                                className="rounded p-1 text-gray-400 hover:text-gray-600 transition-colors"
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
              <span>Showing 1 - 10 of 420 bulk orders</span>

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
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column (3 cols) */}
        <div className="xl:col-span-3 space-y-6">
          {/* Donut Chart: Order Status Distribution */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <AdminIcon name="orders" size={16} className="text-[#800020]" strokeWidth={1.75} />
              <h3 className="text-sm font-bold text-gray-900">Order Status Distribution</h3>
            </div>

            <div className="flex flex-col items-center py-2">
              <div className="relative flex items-center justify-center h-36 w-36 shrink-0 mb-3">
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                  {/* Processing 23% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#FB7185"
                    strokeWidth="14"
                    strokeDasharray="55 238"
                    strokeDashoffset="0"
                  />
                  {/* Packed 20% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#A855F7"
                    strokeWidth="14"
                    strokeDasharray="48 238"
                    strokeDashoffset="-55"
                  />
                  {/* Shipped 27% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="14"
                    strokeDasharray="64 238"
                    strokeDashoffset="-103"
                  />
                  {/* Delivered 23% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="14"
                    strokeDasharray="55 238"
                    strokeDashoffset="-167"
                  />
                  {/* Pending 7% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    strokeDasharray="16 238"
                    strokeDashoffset="-222"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-gray-900">420</span>
                  <span className="text-[10px] font-medium text-gray-400">Total Bulk Orders</span>
                </div>
              </div>

              <div className="w-full space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#FB7185]"></span> Processing
                  </span>
                  <span className="font-semibold text-gray-900">96 (23%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#A855F7]"></span> Packed
                  </span>
                  <span className="font-semibold text-gray-900">84 (20%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#38BDF8]"></span> Shipped
                  </span>
                  <span className="font-semibold text-gray-900">112 (27%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#10B981]"></span> Delivered
                  </span>
                  <span className="font-semibold text-gray-900">96 (23%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#F59E0B]"></span> Pending
                  </span>
                  <span className="font-semibold text-gray-900">28 (7%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#94A3B8]"></span> Cancelled
                  </span>
                  <span className="font-semibold text-gray-900">4 (0%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Recent Bulk Orders */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AdminIcon name="orders" size={16} className="text-[#800020]" strokeWidth={1.75} />
                <h3 className="text-sm font-bold text-gray-900">Recent Bulk Orders</h3>
              </div>
              <button
                onClick={() => triggerToast('Viewing all bulk orders')}
                className="text-xs font-semibold text-[#800020] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {RECENT_SIDEBAR_ORDERS.map((o) => (
                <div key={o.id} className="flex items-center gap-3">
                  <img
                    src={o.image}
                    alt={o.orderId}
                    className="h-10 w-10 rounded-xl object-cover border border-gray-100 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">{o.orderId}</span>
                      <span
                        className={`inline-flex items-center rounded px-1.5 py-0.2 text-[10px] font-semibold ${getStatusBadge(
                          o.status
                        )}`}
                      >
                        {o.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-600 font-medium truncate mt-0.5">
                      {o.company}
                    </p>
                    <p className="text-[10px] text-gray-400">{o.qtyDesc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Need Help */}
          <div className="rounded-2xl border border-rose-100 bg-[#FFF8F9] p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-[#800020]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="text-sm font-bold">Need Help?</h3>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Have questions about bulk orders? Contact our wholesale support team for assistance.
            </p>
            <button
              onClick={() => triggerToast('Contacting Wholesale Support...')}
              className="w-full rounded-xl border border-[#800020] bg-white py-2 text-xs font-semibold text-[#800020] hover:bg-[#800020] hover:text-white transition-colors"
            >
              Contact Support →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

