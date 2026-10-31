import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_CUSTOMERS = [
  {
    id: 1,
    initials: 'ST',
    color: 'bg-purple-100 text-purple-700',
    customerName: 'Shree Textiles',
    businessDetails: 'Retailer · Gujarat',
    customerId: 'CUST-001',
    creditLimit: '₹2,00,000',
    outstanding: '₹48,600',
    availableCredit: '₹1,51,400',
    lastPayment: '18 Oct 2026',
    status: 'Active',
  },
  {
    id: 2,
    initials: 'KF',
    color: 'bg-rose-100 text-[#800020]',
    customerName: 'Kavya Fashion',
    businessDetails: 'Boutique · Maharashtra',
    customerId: 'CUST-002',
    creditLimit: '₹1,50,000',
    outstanding: '₹1,20,300',
    availableCredit: '₹29,700',
    lastPayment: '12 Oct 2026',
    status: 'Overdue',
  },
  {
    id: 3,
    initials: 'MC',
    color: 'bg-blue-100 text-blue-700',
    customerName: 'Milan Creations',
    businessDetails: 'Manufacturer · Delhi',
    customerId: 'CUST-003',
    creditLimit: '₹3,00,000',
    outstanding: '₹0',
    availableCredit: '₹3,00,000',
    lastPayment: '20 Oct 2026',
    status: 'Active',
  },
  {
    id: 4,
    initials: 'RLH',
    color: 'bg-rose-100 text-[#800020]',
    customerName: 'Raj Laces Hub',
    businessDetails: 'Distributor · Rajasthan',
    customerId: 'CUST-004',
    creditLimit: '₹2,50,000',
    outstanding: '₹92,450',
    availableCredit: '₹1,57,550',
    lastPayment: '15 Oct 2026',
    status: 'Active',
  },
  {
    id: 5,
    initials: 'FM',
    color: 'bg-sky-100 text-sky-700',
    customerName: 'Fashion Mart',
    businessDetails: 'Retailer · Gujarat',
    customerId: 'CUST-005',
    creditLimit: '₹1,00,000',
    outstanding: '₹68,900',
    availableCredit: '₹31,100',
    lastPayment: '10 Oct 2026',
    status: 'Overdue',
  },
  {
    id: 6,
    initials: 'DT',
    color: 'bg-rose-100 text-[#800020]',
    customerName: 'Dev Textile Store',
    businessDetails: 'Wholesale · Surat',
    customerId: 'CUST-006',
    creditLimit: '₹2,00,000',
    outstanding: '₹1,45,670',
    availableCredit: '₹54,330',
    lastPayment: '08 Oct 2026',
    status: 'Overdue',
  },
  {
    id: 7,
    initials: 'GLH',
    color: 'bg-purple-100 text-purple-700',
    customerName: 'Gujarat Lace House',
    businessDetails: 'Wholesale · Gujarat',
    customerId: 'CUST-007',
    creditLimit: '₹3,50,000',
    outstanding: '₹0',
    availableCredit: '₹3,50,000',
    lastPayment: '21 Oct 2026',
    status: 'Active',
  },
  {
    id: 8,
    initials: 'TB',
    color: 'bg-rose-100 text-[#800020]',
    customerName: 'Trendy Boutique',
    businessDetails: 'Boutique · Madhya Pradesh',
    customerId: 'CUST-008',
    creditLimit: '₹1,20,000',
    outstanding: '₹54,320',
    availableCredit: '₹65,680',
    lastPayment: '16 Oct 2026',
    status: 'Active',
  },
  {
    id: 9,
    initials: 'SF',
    color: 'bg-rose-100 text-[#800020]',
    customerName: 'Satyam Fabrics',
    businessDetails: 'Wholesaler · Delhi',
    customerId: 'CUST-009',
    creditLimit: '₹2,80,000',
    outstanding: '₹2,18,760',
    availableCredit: '₹61,240',
    lastPayment: '05 Oct 2026',
    status: 'Overdue',
  },
  {
    id: 10,
    initials: 'PC',
    color: 'bg-amber-100 text-amber-700',
    customerName: 'Pooja Collection',
    businessDetails: 'Retailer · Gujarat',
    customerId: 'CUST-010',
    creditLimit: '₹1,50,000',
    outstanding: '₹32,450',
    availableCredit: '₹1,17,550',
    lastPayment: '14 Oct 2026',
    status: 'Active',
  },
];

const TABS = [
  'Customer Balances',
  'Invoices',
  'Payments',
  'Credit Limits',
  'Statements',
  'Payment Methods',
];

const TOP_OUTSTANDING = [
  { id: 1, initials: 'SF', name: 'Satyam Fabrics', amount: '₹2,18,760', color: 'bg-rose-100 text-[#800020]' },
  { id: 2, initials: 'DT', name: 'Dev Textile Store', amount: '₹1,45,670', color: 'bg-purple-100 text-purple-700' },
  { id: 3, initials: 'KF', name: 'Kavya Fashion', amount: '₹1,20,300', color: 'bg-rose-100 text-[#800020]' },
  { id: 4, initials: 'RLH', name: 'Raj Laces Hub', amount: '₹92,450', color: 'bg-blue-100 text-blue-700' },
  { id: 5, initials: 'FM', name: 'Fashion Mart', amount: '₹68,900', color: 'bg-sky-100 text-sky-700' },
];

const RECENT_PAYMENTS = [
  { id: 1, initials: 'MC', name: 'Milan Creations', amount: '+₹76,200', date: '20 Oct 2026', color: 'bg-blue-100 text-blue-700' },
  { id: 2, initials: 'ST', name: 'Shree Textiles', amount: '+₹48,600', date: '18 Oct 2026', color: 'bg-purple-100 text-purple-700' },
  { id: 3, initials: 'KF', name: 'Kavya Fashion', amount: '+₹32,450', date: '17 Oct 2026', color: 'bg-rose-100 text-[#800020]' },
  { id: 4, initials: 'TB', name: 'Trendy Boutique', amount: '+₹54,320', date: '16 Oct 2026', color: 'bg-rose-100 text-[#800020]' },
  { id: 5, initials: 'PC', name: 'Pooja Collection', amount: '+₹95,450', date: '14 Oct 2026', color: 'bg-amber-100 text-amber-700' },
];

export default function AdminCreditPaymentsPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [activeTab, setActiveTab] = useState('Customer Balances');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [customerGroupFilter, setCustomerGroupFilter] = useState('All Customer Groups');
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
        c.customerName.toLowerCase().includes(effectiveSearch) ||
        c.customerId.toLowerCase().includes(effectiveSearch) ||
        c.businessDetails.toLowerCase().includes(effectiveSearch);

      const matchStatus = statusFilter === 'All Statuses' || c.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [effectiveSearch, statusFilter]);

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
        <span className="font-semibold text-[#800020]">Credit & Payments</span>
      </div>

      {/* Header Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0F3] text-[#800020] shadow-sm border border-[#FFE4E8]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] tracking-tight">
              Credit & Payments
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Manage wholesale customer credit limits, outstanding balances, invoices, and payments.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => triggerToast('Opening Record Payment form...')}
            className="flex items-center gap-2 rounded-xl bg-[#800020] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#660019] transition-all"
          >
            <AdminIcon name="plus" size={16} strokeWidth={2} />
            <span>Record Payment</span>
            <AdminIcon name="chevronDown" size={14} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
        {/* Card 1 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Credit Limit</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">₹28,50,000</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 18%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">across 86 customers</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Outstanding</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FEE2E2] text-rose-700">
              <AdminIcon name="content" size={16} strokeWidth={1.75} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">₹8,42,360</span>
            <span className="flex items-center text-xs font-semibold text-rose-600">
              ↑ 12%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">across 42 customers</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Collected (This Month)</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F3E8FF] text-purple-700">
              <span className="font-bold text-sm">₹</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">₹6,25,480</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 28%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Overdue Payments</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FEE2E2] text-rose-700">
              <AdminIcon name="clock" size={16} strokeWidth={1.75} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">₹2,18,760</span>
            <span className="flex items-center text-xs font-semibold text-rose-600">
              ↑ 16%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">from 12 customers</p>
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
                  placeholder="Search by customer name, email, GST, or customer ID..."
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
                  <option>Active</option>
                  <option>Overdue</option>
                </select>

                <select
                  value={customerGroupFilter}
                  onChange={(e) => setCustomerGroupFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Customer Groups</option>
                  <option>Retailers</option>
                  <option>Boutiques</option>
                  <option>Manufacturers</option>
                  <option>Distributors</option>
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
                          selectedIds.length === filteredCustomers.length
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                      />
                    </th>
                    <th className="py-3 px-3 w-8">#</th>
                    <th className="py-3 px-4">Customer Name</th>
                    <th className="py-3 px-3">Customer ID</th>
                    <th className="py-3 px-3">Credit Limit</th>
                    <th className="py-3 px-3">Outstanding</th>
                    <th className="py-3 px-3">Available Credit</th>
                    <th className="py-3 px-3">Last Payment</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="py-8 text-center text-gray-400">
                        No credit accounts found matching criteria.
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
                                <p className="font-bold text-gray-900">{c.customerName}</p>
                                <p className="text-[11px] text-gray-400">{c.businessDetails}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 font-mono font-medium text-gray-700">
                            {c.customerId}
                          </td>
                          <td className="py-3.5 px-3 font-semibold text-gray-900">{c.creditLimit}</td>
                          <td className="py-3.5 px-3">
                            <span
                              className={`font-bold ${
                                c.outstanding === '₹0'
                                  ? 'text-gray-400 font-normal'
                                  : c.status === 'Overdue'
                                  ? 'text-rose-600'
                                  : 'text-gray-900'
                              }`}
                            >
                              {c.outstanding}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 font-semibold text-emerald-700">
                            {c.availableCredit}
                          </td>
                          <td className="py-3.5 px-3 text-gray-500 text-[11px] whitespace-nowrap">
                            {c.lastPayment}
                          </td>
                          <td className="py-3.5 px-3">
                            <span
                              className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-[11px] font-semibold ${
                                c.status === 'Active'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => triggerToast(`Viewing ledger for ${c.customerName}`)}
                                title="View Customer Ledger"
                                className="rounded p-1 text-gray-400 hover:text-[#800020] transition-colors"
                              >
                                <AdminIcon name="eye" size={14} strokeWidth={1.75} />
                              </button>
                              <button
                                onClick={() => triggerToast(`Recording payment for ${c.customerName}`)}
                                title="Record Payment"
                                className="rounded p-1 text-gray-400 hover:text-[#800020] transition-colors"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                                  <rect x="2" y="5" width="20" height="14" rx="2" />
                                  <line x1="2" y1="10" x2="22" y2="10" />
                                </svg>
                              </button>
                              <button
                                onClick={() => triggerToast(`Options for ${c.customerName}`)}
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
              <span>Showing 1 - 10 of 86 customers</span>

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
          {/* Outstanding Amount by Status Donut */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <svg className="w-4 h-4 text-[#800020]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              <h3 className="text-sm font-bold text-gray-900">Outstanding Amount by Status</h3>
            </div>

            <div className="flex flex-col items-center py-2">
              <div className="relative flex items-center justify-center h-36 w-36 shrink-0 mb-3">
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                  {/* Current 37% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="14"
                    strokeDasharray="88 238"
                    strokeDashoffset="0"
                  />
                  {/* 1-30 Days 30% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="14"
                    strokeDasharray="71 238"
                    strokeDashoffset="-88"
                  />
                  {/* 31-60 Days 17% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    strokeDasharray="40 238"
                    strokeDashoffset="-159"
                  />
                  {/* 61+ Days 16% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="14"
                    strokeDasharray="38 238"
                    strokeDashoffset="-199"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-1">
                  <span className="text-sm font-bold text-gray-900 leading-tight">₹8,42,360</span>
                  <span className="text-[9px] font-medium text-gray-400">Total Outstanding</span>
                </div>
              </div>

              <div className="w-full space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#10B981]"></span> Current
                  </span>
                  <span className="font-semibold text-gray-900">₹3,12,450 (37%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#38BDF8]"></span> 1-30 Days
                  </span>
                  <span className="font-semibold text-gray-900">₹2,50,300 (30%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#F59E0B]"></span> 31-60 Days
                  </span>
                  <span className="font-semibold text-gray-900">₹1,45,670 (17%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#EF4444]"></span> 61+ Days
                  </span>
                  <span className="font-semibold text-gray-900">₹1,33,940 (16%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Outstanding Customers */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#800020]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-sm font-bold text-gray-900">Top Outstanding Customers</h3>
              </div>
              <button
                onClick={() => triggerToast('Viewing all outstanding customers')}
                className="text-xs font-semibold text-[#800020] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {TOP_OUTSTANDING.map((cust) => (
                <div key={cust.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[11px] font-bold text-gray-400 w-3">{cust.id}</span>
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${cust.color}`}
                    >
                      {cust.initials}
                    </div>
                    <span className="font-semibold text-gray-900 truncate max-w-[120px]">
                      {cust.name}
                    </span>
                  </div>
                  <span className="font-bold text-rose-600 shrink-0">{cust.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Payments */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AdminIcon name="check" size={16} className="text-[#800020]" strokeWidth={2} />
                <h3 className="text-sm font-bold text-gray-900">Recent Payments</h3>
              </div>
              <button
                onClick={() => triggerToast('Viewing all payments')}
                className="text-xs font-semibold text-[#800020] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {RECENT_PAYMENTS.map((pmt) => (
                <div key={pmt.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${pmt.color}`}
                    >
                      {pmt.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{pmt.name}</p>
                      <p className="text-[10px] text-gray-400">Payment Received</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-emerald-600">{pmt.amount}</span>
                    <p className="text-[10px] text-gray-400 mt-0.5">{pmt.date.split(' ').slice(0, 2).join(' ')}</p>
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
              Have questions about credit limits, payments or invoices? Contact our wholesale support team.
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

