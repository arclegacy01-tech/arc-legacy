import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_CUSTOMERS = [
  {
    id: 1,
    code: '#WHO001',
    initials: 'ST',
    color: 'bg-purple-100 text-purple-700',
    company: 'Shree Textiles',
    contactPerson: 'Ramesh Patel',
    phone: '+91 98765 43210',
    tier: 'Platinum',
    totalOrders: 48,
    totalSpent: '₹2,45,600',
    lastOrder: '14 Oct 2026',
    status: 'Active',
  },
  {
    id: 2,
    code: '#WHO002',
    initials: 'KF',
    color: 'bg-rose-100 text-[#800020]',
    company: 'Kavya Fashion',
    contactPerson: 'Priya Shah',
    phone: '+91 87654 32109',
    tier: 'Gold',
    totalOrders: 32,
    totalSpent: '₹1,68,420',
    lastOrder: '12 Oct 2026',
    status: 'Active',
  },
  {
    id: 3,
    code: '#WHO003',
    initials: 'MC',
    color: 'bg-blue-100 text-blue-700',
    company: 'Milan Creations',
    contactPerson: 'Amit Desai',
    phone: '+91 98765 43211',
    tier: 'Silver',
    totalOrders: 18,
    totalSpent: '₹98,750',
    lastOrder: '11 Oct 2026',
    status: 'Active',
  },
  {
    id: 4,
    code: '#WHO004',
    initials: 'RLH',
    color: 'bg-rose-100 text-[#800020]',
    company: 'Raj Laces Hub',
    contactPerson: 'Neha Trivedi',
    phone: '+91 87654 32122',
    tier: 'Gold',
    totalOrders: 26,
    totalSpent: '₹1,22,300',
    lastOrder: '10 Oct 2026',
    status: 'Active',
  },
  {
    id: 5,
    code: '#WHO005',
    initials: 'FM',
    color: 'bg-sky-100 text-sky-700',
    company: 'Fashion Mart',
    contactPerson: 'Kunal Jain',
    phone: '+91 98765 43213',
    tier: 'Silver',
    totalOrders: 14,
    totalSpent: '₹76,540',
    lastOrder: '08 Oct 2026',
    status: 'Pending',
  },
  {
    id: 6,
    code: '#WHO006',
    initials: 'DT',
    color: 'bg-rose-100 text-[#800020]',
    company: 'Dev Textile Store',
    contactPerson: 'Sneha Mehta',
    phone: '+91 87654 32133',
    tier: 'Platinum',
    totalOrders: 52,
    totalSpent: '₹3,10,200',
    lastOrder: '07 Oct 2026',
    status: 'Active',
  },
  {
    id: 7,
    code: '#WHO007',
    initials: 'GLH',
    color: 'bg-purple-100 text-purple-700',
    company: 'Gujarat Lace House',
    contactPerson: 'Viren Patel',
    phone: '+91 98765 43214',
    tier: 'Silver',
    totalOrders: 10,
    totalSpent: '₹54,320',
    lastOrder: '05 Oct 2026',
    status: 'Inactive',
  },
  {
    id: 8,
    code: '#WHO008',
    initials: 'TB',
    color: 'bg-rose-100 text-[#800020]',
    company: 'Trendy Boutique',
    contactPerson: 'Aarti Desai',
    phone: '+91 87654 32144',
    tier: 'Gold',
    totalOrders: 28,
    totalSpent: '₹1,45,670',
    lastOrder: '04 Oct 2026',
    status: 'Active',
  },
  {
    id: 9,
    code: '#WHO009',
    initials: 'SF',
    color: 'bg-rose-100 text-[#800020]',
    company: 'Satyam Fabrics',
    contactPerson: 'Mohit Sharma',
    phone: '+91 98765 43215',
    tier: 'Silver',
    totalOrders: 12,
    totalSpent: '₹68,900',
    lastOrder: '02 Oct 2026',
    status: 'Active',
  },
  {
    id: 10,
    code: '#WHO010',
    initials: 'PC',
    color: 'bg-amber-100 text-amber-700',
    company: 'Pooja Collection',
    contactPerson: 'Riya Kulkarni',
    phone: '+91 87654 32155',
    tier: 'Gold',
    totalOrders: 20,
    totalSpent: '₹1,10,430',
    lastOrder: '01 Oct 2026',
    status: 'Active',
  },
];

const RECENT_ORDERS = [
  {
    id: 1,
    orderId: '#WHO5201',
    company: 'Shree Textiles',
    amount: '₹48,600',
    date: '18 Oct 2026',
    status: 'Shipped',
    image: '/images/product-1.jpg',
  },
  {
    id: 2,
    orderId: '#WHO5200',
    company: 'Dev Textile Store',
    amount: '₹76,200',
    date: '17 Oct 2026',
    status: 'Shipped',
    image: '/images/product-2.jpg',
  },
  {
    id: 3,
    orderId: '#WHO5199',
    company: 'Kavya Fashion',
    amount: '₹32,450',
    date: '16 Oct 2026',
    status: 'Shipped',
    image: '/images/product-3.jpg',
  },
  {
    id: 4,
    orderId: '#WHO5198',
    company: 'Raj Laces Hub',
    amount: '₹54,800',
    date: '15 Oct 2026',
    status: 'Shipped',
    image: '/images/product-4.jpg',
  },
  {
    id: 5,
    orderId: '#WHO5197',
    company: 'Fashion Mart',
    amount: '₹21,600',
    date: '14 Oct 2026',
    status: 'Shipped',
    image: '/images/product-5.jpg',
  },
];

export default function AdminWholesaleOverviewPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('All Tiers');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredCustomers = useMemo(() => {
    return INITIAL_CUSTOMERS.filter((c) => {
      const matchSearch =
        !effectiveSearch ||
        c.company.toLowerCase().includes(effectiveSearch) ||
        c.contactPerson.toLowerCase().includes(effectiveSearch) ||
        c.code.toLowerCase().includes(effectiveSearch) ||
        c.phone.includes(effectiveSearch);

      const matchTier = tierFilter === 'All Tiers' || c.tier === tierFilter;
      const matchStatus = statusFilter === 'All Statuses' || c.status === statusFilter;

      return matchSearch && matchTier && matchStatus;
    });
  }, [effectiveSearch, tierFilter, statusFilter]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredCustomers.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getTierBadge = (tier) => {
    switch (tier) {
      case 'Platinum':
        return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'Gold':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Silver':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
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
        <span className="font-semibold text-[#800020]">Overview</span>
      </div>

      {/* Header Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0F3] text-[#800020] shadow-sm border border-[#FFE4E8]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] tracking-tight">
              Wholesale
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Manage your wholesale customers, bulk orders, special pricing and more.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => triggerToast('Opening Add Wholesale Customer form...')}
            className="flex items-center gap-2 rounded-xl bg-[#800020] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#660019] transition-all"
          >
            <AdminIcon name="plus" size={16} strokeWidth={2} />
            <span>Add Wholesale Customer</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
        {/* Card 1 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Wholesale Customers</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <AdminIcon name="customers" size={16} strokeWidth={1.75} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">186</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 24%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Bulk Orders</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FEF3C7] text-amber-700">
              <AdminIcon name="orders" size={16} strokeWidth={1.75} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">420</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 18%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">this month</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Wholesale Revenue</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F3E8FF] text-purple-700">
              <span className="font-bold text-sm">₹</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">₹8,56,240</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 32%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">this month</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Active Price Lists</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <AdminIcon name="coupons" size={16} strokeWidth={1.75} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">12</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 9%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">custom price lists</p>
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
                  placeholder="Search wholesale customers by name, email, company, or GST..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/60 py-2.5 pl-9 pr-3 text-xs text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#800020] focus:bg-white focus:ring-1 focus:ring-[#800020]"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
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

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Inactive</option>
                </select>

                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Locations</option>
                  <option>Gujarat</option>
                  <option>Maharashtra</option>
                  <option>Delhi</option>
                  <option>Rajasthan</option>
                </select>

                <button
                  onClick={() => triggerToast('Filters toggled')}
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
                          selectedIds.length === filteredCustomers.length
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                      />
                    </th>
                    <th className="py-3 px-3 w-8">#</th>
                    <th className="py-3 px-4">Company Name</th>
                    <th className="py-3 px-4">Contact Person</th>
                    <th className="py-3 px-3">Tier</th>
                    <th className="py-3 px-3">Total Orders</th>
                    <th className="py-3 px-4">Total Spent</th>
                    <th className="py-3 px-3">Last Order</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="py-8 text-center text-gray-400">
                        No wholesale customers found.
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((c) => {
                      const isSelected = selectedIds.includes(c.id);
                      return (
                        <tr
                          key={c.id}
                          className={`transition-colors hover:bg-[#FFF5F7] ${
                            isSelected ? 'bg-[#FFF0F3]' : ''
                          }`}
                        >
                          <td className="py-3.5 px-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(c.id)}
                              className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                            />
                          </td>
                          <td className="py-3.5 px-3 font-medium text-gray-500">{c.id}</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${c.color}`}
                              >
                                {c.initials}
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">{c.company}</p>
                                <p className="text-[11px] text-gray-400 font-mono">{c.code}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-gray-800">{c.contactPerson}</p>
                            <p className="text-[11px] text-gray-400">{c.phone}</p>
                          </td>
                          <td className="py-3.5 px-3">
                            <span
                              className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-[11px] font-semibold ${getTierBadge(
                                c.tier
                              )}`}
                            >
                              {c.tier}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 font-semibold text-gray-800">{c.totalOrders}</td>
                          <td className="py-3.5 px-4 font-bold text-gray-900">{c.totalSpent}</td>
                          <td className="py-3.5 px-3 text-gray-500 text-[11px]">{c.lastOrder}</td>
                          <td className="py-3.5 px-3">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                                c.status === 'Active'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : c.status === 'Pending'
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-rose-50 text-rose-700'
                              }`}
                            >
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => triggerToast(`Viewing ${c.company}`)}
                                title="View Customer"
                                className="rounded p-1 text-gray-400 hover:text-[#800020] transition-colors"
                              >
                                <AdminIcon name="eye" size={14} strokeWidth={1.75} />
                              </button>
                              <button
                                onClick={() => triggerToast(`Editing ${c.company}`)}
                                title="Edit Customer"
                                className="rounded p-1 text-gray-400 hover:text-[#800020] transition-colors"
                              >
                                <AdminIcon name="edit" size={14} strokeWidth={1.75} />
                              </button>
                              <button
                                onClick={() => triggerToast(`Options for ${c.company}`)}
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
              <span>Showing 1 - 10 of 186 wholesale customers</span>

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
          {/* Card 1: Wholesale Customer Distribution */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <AdminIcon name="wholesale" size={16} className="text-[#800020]" strokeWidth={1.75} />
              <h3 className="text-sm font-bold text-gray-900">Wholesale Customer Distribution</h3>
            </div>

            <div className="flex flex-col items-center py-2">
              <div className="relative flex items-center justify-center h-36 w-36 shrink-0 mb-3">
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                  {/* Platinum 28% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#A855F7"
                    strokeWidth="14"
                    strokeDasharray="67 238"
                    strokeDashoffset="0"
                  />
                  {/* Gold 37% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    strokeDasharray="88 238"
                    strokeDashoffset="-67"
                  />
                  {/* Silver 25% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="14"
                    strokeDasharray="60 238"
                    strokeDashoffset="-155"
                  />
                  {/* Others 11% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="14"
                    strokeDasharray="23 238"
                    strokeDashoffset="-215"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-gray-900">186</span>
                  <span className="text-[10px] text-gray-400">Total Customers</span>
                </div>
              </div>

              <div className="w-full space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#A855F7]"></span> Platinum
                  </span>
                  <span className="font-semibold text-gray-900">52 (28%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#F59E0B]"></span> Gold
                  </span>
                  <span className="font-semibold text-gray-900">68 (37%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#38BDF8]"></span> Silver
                  </span>
                  <span className="font-semibold text-gray-900">46 (25%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#94A3B8]"></span> Others
                  </span>
                  <span className="font-semibold text-gray-900">20 (11%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Recent Wholesale Orders */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AdminIcon name="orders" size={16} className="text-[#800020]" strokeWidth={1.75} />
                <h3 className="text-sm font-bold text-gray-900">Recent Wholesale Orders</h3>
              </div>
              <Link
                to="/admin/wholesale/bulk-orders"
                className="text-xs font-semibold text-[#800020] hover:underline"
              >
                View All →
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              {RECENT_ORDERS.map((o) => (
                <div key={o.id} className="flex items-center gap-3">
                  <img
                    src={o.image}
                    alt={o.orderId}
                    className="h-10 w-10 rounded-xl object-cover border border-gray-100 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">{o.orderId}</span>
                      <span className="font-bold text-gray-900">{o.amount}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[11px] text-gray-500 truncate">{o.company}</span>
                      <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                        {o.status}
                      </span>
                    </div>
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
              Have questions about wholesale orders, pricing or account setup? Contact our support team for assistance.
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

