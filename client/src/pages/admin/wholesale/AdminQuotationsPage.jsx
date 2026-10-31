import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_QUOTATIONS = [
  {
    id: 1,
    quoteId: 'QT-2026-001',
    initials: 'ST',
    color: 'bg-purple-100 text-purple-700',
    customerName: 'Ramesh Patel',
    phone: '+91 98765 43210',
    company: 'Shree Textiles',
    items: ['/images/product-1.jpg', '/images/product-2.jpg'],
    moreCount: '+5',
    quoteValue: '₹48,600',
    validTill: '25 Oct 2026',
    status: 'Pending',
  },
  {
    id: 2,
    quoteId: 'QT-2026-002',
    initials: 'KF',
    color: 'bg-rose-100 text-[#800020]',
    customerName: 'Priya Shah',
    phone: '+91 87654 32109',
    company: 'Kavya Fashion',
    items: ['/images/product-3.jpg', '/images/product-4.jpg'],
    moreCount: '+3',
    quoteValue: '₹32,450',
    validTill: '22 Oct 2026',
    status: 'Approved',
  },
  {
    id: 3,
    quoteId: 'QT-2026-003',
    initials: 'MC',
    color: 'bg-blue-100 text-blue-700',
    customerName: 'Amit Desai',
    phone: '+91 98765 43211',
    company: 'Milan Creations',
    items: ['/images/product-5.jpg', '/images/product-6.jpg'],
    moreCount: '+8',
    quoteValue: '₹76,200',
    validTill: '20 Oct 2026',
    status: 'Pending',
  },
  {
    id: 4,
    quoteId: 'QT-2026-004',
    initials: 'RLH',
    color: 'bg-rose-100 text-[#800020]',
    customerName: 'Neha Trivedi',
    phone: '+91 87654 32122',
    company: 'Raj Laces Hub',
    items: ['/images/product-7.jpg', '/images/product-8.jpg'],
    moreCount: '+4',
    quoteValue: '₹54,300',
    validTill: '18 Oct 2026',
    status: 'Approved',
  },
  {
    id: 5,
    quoteId: 'QT-2026-005',
    initials: 'FM',
    color: 'bg-sky-100 text-sky-700',
    customerName: 'Kunal Jain',
    phone: '+91 98765 43213',
    company: 'Fashion Mart',
    items: ['/images/product-9.jpg', '/images/product-10.jpg'],
    moreCount: '+6',
    quoteValue: '₹45,900',
    validTill: '15 Oct 2026',
    status: 'Expired',
  },
  {
    id: 6,
    quoteId: 'QT-2026-006',
    initials: 'DT',
    color: 'bg-rose-100 text-[#800020]',
    customerName: 'Sneha Mehta',
    phone: '+91 87654 32133',
    company: 'Dev Textile Store',
    items: ['/images/product-11.jpg', '/images/product-12.jpg'],
    moreCount: '+2',
    quoteValue: '₹28,750',
    validTill: '14 Oct 2026',
    status: 'Pending',
  },
  {
    id: 7,
    quoteId: 'QT-2026-007',
    initials: 'GLH',
    color: 'bg-purple-100 text-purple-700',
    customerName: 'Viren Patel',
    phone: '+91 98765 43214',
    company: 'Gujarat Lace House',
    items: ['/images/product-1.jpg', '/images/product-3.jpg'],
    moreCount: '+7',
    quoteValue: '₹1,22,300',
    validTill: '12 Oct 2026',
    status: 'Approved',
  },
  {
    id: 8,
    quoteId: 'QT-2026-008',
    initials: 'TB',
    color: 'bg-rose-100 text-[#800020]',
    customerName: 'Aarti Desai',
    phone: '+91 87654 32144',
    company: 'Trendy Boutique',
    items: ['/images/product-2.jpg', '/images/product-4.jpg'],
    moreCount: '+5',
    quoteValue: '₹68,900',
    validTill: '10 Oct 2026',
    status: 'Rejected',
  },
  {
    id: 9,
    quoteId: 'QT-2026-009',
    initials: 'SF',
    color: 'bg-rose-100 text-[#800020]',
    customerName: 'Mohit Sharma',
    phone: '+91 98765 43215',
    company: 'Satyam Fabrics',
    items: ['/images/product-5.jpg', '/images/product-7.jpg'],
    moreCount: '+4',
    quoteValue: '₹37,600',
    validTill: '08 Oct 2026',
    status: 'Pending',
  },
  {
    id: 10,
    quoteId: 'QT-2026-010',
    initials: 'PC',
    color: 'bg-amber-100 text-amber-700',
    customerName: 'Riya Kulkarni',
    phone: '+91 87654 32155',
    company: 'Pooja Collection',
    items: ['/images/product-6.jpg', '/images/product-8.jpg'],
    moreCount: '+9',
    quoteValue: '₹95,450',
    validTill: '05 Oct 2026',
    status: 'Approved',
  },
];

const TOP_CUSTOMERS = [
  { id: 1, initials: 'ST', name: 'Shree Textiles', quotes: '18 quotations', amount: '₹4,52,300', color: 'bg-purple-100 text-purple-700' },
  { id: 2, initials: 'KF', name: 'Kavya Fashion', quotes: '16 quotations', amount: '₹3,86,450', color: 'bg-rose-100 text-[#800020]' },
  { id: 3, initials: 'MC', name: 'Milan Creations', quotes: '14 quotations', amount: '₹2,98,600', color: 'bg-blue-100 text-blue-700' },
  { id: 4, initials: 'RLH', name: 'Raj Laces Hub', quotes: '12 quotations', amount: '₹2,45,700', color: 'bg-rose-100 text-[#800020]' },
  { id: 5, initials: 'FM', name: 'Fashion Mart', quotes: '11 quotations', amount: '₹2,12,900', color: 'bg-sky-100 text-sky-700' },
];

const RECENT_QUOTES = [
  { id: 1, quoteId: 'QT-2026-001', name: 'Ramesh Patel', date: '18 Oct 2026', status: 'Pending' },
  { id: 2, quoteId: 'QT-2026-002', name: 'Priya Shah', date: '17 Oct 2026', status: 'Approved' },
  { id: 3, quoteId: 'QT-2026-003', name: 'Amit Desai', date: '16 Oct 2026', status: 'Pending' },
  { id: 4, quoteId: 'QT-2026-004', name: 'Neha Trivedi', date: '15 Oct 2026', status: 'Approved' },
  { id: 5, quoteId: 'QT-2026-005', name: 'Kunal Jain', date: '14 Oct 2026', status: 'Expired' },
];

export default function AdminQuotationsPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [customerGroupFilter, setCustomerGroupFilter] = useState('All Customer Groups');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredQuotes = useMemo(() => {
    return INITIAL_QUOTATIONS.filter((q) => {
      const matchSearch =
        !effectiveSearch ||
        q.quoteId.toLowerCase().includes(effectiveSearch) ||
        q.customerName.toLowerCase().includes(effectiveSearch) ||
        q.company.toLowerCase().includes(effectiveSearch);

      const matchStatus = statusFilter === 'All Statuses' || q.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [effectiveSearch, statusFilter]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredQuotes.map((q) => q.id));
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
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
      case 'Expired':
        return 'bg-rose-50 text-rose-600 border border-rose-100';
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
        <span className="font-semibold text-[#800020]">Quotations</span>
      </div>

      {/* Header Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0F3] text-[#800020] shadow-sm border border-[#FFE4E8]">
            <AdminIcon name="content" size={24} strokeWidth={1.75} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] tracking-tight">
              Quotations
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Create, manage, and track wholesale quotations for your customers. Convert approved quotations into orders.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => triggerToast('Opening Create Quotation form...')}
            className="flex items-center gap-2 rounded-xl bg-[#800020] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#660019] transition-all"
          >
            <AdminIcon name="plus" size={16} strokeWidth={2} />
            <span>Create Quotation</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
        {/* Card 1 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Quotations</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <AdminIcon name="content" size={16} strokeWidth={1.75} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">286</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 18%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Pending Quotes</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FEF3C7] text-amber-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">68</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 12%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">awaiting customer response</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Approved Quotes</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ECFDF5] text-emerald-700">
              <AdminIcon name="check" size={16} strokeWidth={2} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">142</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 28%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">converted to orders</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Rejected Quotes</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FEE2E2] text-rose-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">32</span>
            <span className="flex items-center text-xs font-semibold text-rose-600">
              ↓ 16%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">not converted</p>
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
                  placeholder="Search by quotation ID, customer name, company, or product..."
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
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                  <option>Expired</option>
                </select>

                <select
                  value={customerGroupFilter}
                  onChange={(e) => setCustomerGroupFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Customer Groups</option>
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
                          selectedIds.length === filteredQuotes.length
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                      />
                    </th>
                    <th className="py-3 px-3 w-8">#</th>
                    <th className="py-3 px-3">Quotation ID</th>
                    <th className="py-3 px-4">Customer Name</th>
                    <th className="py-3 px-4">Company</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-3">Quote Value</th>
                    <th className="py-3 px-3">Valid Till</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {filteredQuotes.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="py-8 text-center text-gray-400">
                        No quotations found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredQuotes.map((q) => {
                      const isSelected = selectedIds.includes(q.id);
                      return (
                        <tr
                          key={q.id}
                          className={`transition-colors hover:bg-[#FFF5F7] ${
                            isSelected ? 'bg-[#FFF0F3]' : ''
                          }`}
                        >
                          <td className="py-3.5 px-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(q.id)}
                              className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                            />
                          </td>
                          <td className="py-3.5 px-3 font-medium text-gray-500">{q.id}</td>
                          <td className="py-3.5 px-3 font-mono font-bold text-gray-900">{q.quoteId}</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${q.color}`}
                              >
                                {q.initials}
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">{q.customerName}</p>
                                <p className="text-[11px] text-gray-400">{q.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-gray-800">{q.company}</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              {q.items.map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img}
                                  alt="Item thumbnail"
                                  className="h-8 w-8 rounded-lg object-cover border border-gray-100"
                                />
                              ))}
                              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-[10px] font-bold text-gray-600">
                                {q.moreCount}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 font-bold text-gray-900">{q.quoteValue}</td>
                          <td className="py-3.5 px-3 text-gray-500 text-[11px] whitespace-nowrap">
                            {q.validTill}
                          </td>
                          <td className="py-3.5 px-3">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${getStatusBadge(
                                q.status
                              )}`}
                            >
                              {q.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => triggerToast(`Viewing ${q.quoteId}`)}
                                title="View Quotation"
                                className="rounded p-1 text-gray-400 hover:text-[#800020] transition-colors"
                              >
                                <AdminIcon name="eye" size={14} strokeWidth={1.75} />
                              </button>
                              <button
                                onClick={() => triggerToast(`Editing ${q.quoteId}`)}
                                title="Edit Quotation"
                                className="rounded p-1 text-gray-400 hover:text-[#800020] transition-colors"
                              >
                                <AdminIcon name="edit" size={14} strokeWidth={1.75} />
                              </button>
                              <button
                                onClick={() => triggerToast(`Converting ${q.quoteId} to Bulk Order...`)}
                                title="Convert to Order"
                                className="rounded p-1 text-gray-400 hover:text-[#800020] transition-colors"
                              >
                                <AdminIcon name="orders" size={14} strokeWidth={1.75} />
                              </button>
                              <button
                                onClick={() => triggerToast(`Options for ${q.quoteId}`)}
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
              <span>Showing 1 - 10 of 286 quotations</span>

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
          {/* Quotation Status Distribution Donut */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <svg className="w-4 h-4 text-[#800020]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              <h3 className="text-sm font-bold text-gray-900">Quotation Status Distribution</h3>
            </div>

            <div className="flex flex-col items-center py-2">
              <div className="relative flex items-center justify-center h-36 w-36 shrink-0 mb-3">
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                  {/* Pending 24% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    strokeDasharray="57 238"
                    strokeDashoffset="0"
                  />
                  {/* Approved 50% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="14"
                    strokeDasharray="119 238"
                    strokeDashoffset="-57"
                  />
                  {/* Rejected 11% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="14"
                    strokeDasharray="26 238"
                    strokeDashoffset="-176"
                  />
                  {/* Expired 15% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#C084FC"
                    strokeWidth="14"
                    strokeDasharray="36 238"
                    strokeDashoffset="-202"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-gray-900">286</span>
                  <span className="text-[10px] font-medium text-gray-400">Total Quotations</span>
                </div>
              </div>

              <div className="w-full space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#F59E0B]"></span> Pending
                  </span>
                  <span className="font-semibold text-gray-900">68 (24%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#10B981]"></span> Approved
                  </span>
                  <span className="font-semibold text-gray-900">142 (50%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#EF4444]"></span> Rejected
                  </span>
                  <span className="font-semibold text-gray-900">32 (11%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#C084FC]"></span> Expired
                  </span>
                  <span className="font-semibold text-gray-900">44 (15%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Quotation Customers */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AdminIcon name="wholesale" size={16} className="text-[#800020]" strokeWidth={1.75} />
                <h3 className="text-sm font-bold text-gray-900">Top Quotation Customers</h3>
              </div>
              <button
                onClick={() => triggerToast('Viewing top customers')}
                className="text-xs font-semibold text-[#800020] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {TOP_CUSTOMERS.map((c) => (
                <div key={c.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[11px] font-bold text-gray-400 w-3">{c.id}</span>
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${c.color}`}
                    >
                      {c.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate max-w-[120px]">{c.name}</p>
                      <p className="text-[10px] text-gray-400">{c.quotes}</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900 shrink-0">{c.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Quotations */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AdminIcon name="clock" size={16} className="text-[#800020]" strokeWidth={1.75} />
                <h3 className="text-sm font-bold text-gray-900">Recent Quotations</h3>
              </div>
              <button
                onClick={() => triggerToast('Viewing all quotes')}
                className="text-xs font-semibold text-[#800020] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {RECENT_QUOTES.map((q) => (
                <div key={q.id} className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-gray-900 font-mono text-[11px]">{q.quoteId}</p>
                    <p className="text-[11px] text-gray-500">{q.name}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold ${getStatusBadge(
                        q.status
                      )}`}
                    >
                      {q.status}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-0.5">{q.date.split(' ').slice(0, 2).join(' ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Need Help */}
          <div className="rounded-2xl border border-rose-100 bg-[#FFF8F9] p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-[#800020]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="text-sm font-bold">Need Help?</h3>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Have questions about quotations? Contact our wholesale support team.
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

