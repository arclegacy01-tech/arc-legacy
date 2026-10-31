import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_PRICE_LISTS = [
  {
    id: 1,
    name: 'Premium Retailers',
    desc: 'Special pricing for premium boutiques',
    customerGroup: 'Platinum',
    products: 450,
    discountType: 'Percentage',
    discountValue: '35%',
    status: 'Active',
    validFromTo: '01 Oct 2026 - 31 Dec 2026',
  },
  {
    id: 2,
    name: 'Regular Wholesalers',
    desc: 'Standard wholesale pricing',
    customerGroup: 'Gold',
    products: 680,
    discountType: 'Percentage',
    discountValue: '25%',
    status: 'Active',
    validFromTo: '01 Oct 2026 - 31 Dec 2026',
  },
  {
    id: 3,
    name: 'New Business Partners',
    desc: 'Introductory pricing for new wholesale customers',
    customerGroup: 'Silver',
    products: 320,
    discountType: 'Percentage',
    discountValue: '20%',
    status: 'Active',
    validFromTo: '01 Oct 2026 - 31 Dec 2026',
  },
  {
    id: 4,
    name: 'Festive Collection',
    desc: 'Special prices for festive items',
    customerGroup: 'Gold',
    products: 150,
    discountType: 'Percentage',
    discountValue: '30%',
    status: 'Active',
    validFromTo: '05 Oct 2026 - 15 Nov 2026',
  },
  {
    id: 5,
    name: 'Bulk Purchase (100+)',
    desc: 'Extra discount on bulk orders',
    customerGroup: 'All Groups',
    products: 220,
    discountType: 'Percentage',
    discountValue: '40%',
    status: 'Active',
    validFromTo: '01 Oct 2026 - 31 Dec 2026',
  },
  {
    id: 6,
    name: 'Clearance Sale',
    desc: 'Limited stock special pricing',
    customerGroup: 'Silver',
    products: 110,
    discountType: 'Percentage',
    discountValue: '50%',
    status: 'Active',
    validFromTo: '01 Oct 2026 - 31 Dec 2026',
  },
  {
    id: 7,
    name: 'Seasonal Essentials',
    desc: 'Core collection wholesale rates',
    customerGroup: 'Gold',
    products: 380,
    discountType: 'Fixed Price',
    discountValue: 'Custom',
    status: 'Active',
    validFromTo: '01 Oct 2026 - 31 Dec 2026',
  },
  {
    id: 8,
    name: 'Exclusive Designs',
    desc: 'Premium designs for top customers',
    customerGroup: 'Platinum',
    products: 95,
    discountType: 'Percentage',
    discountValue: '32%',
    status: 'Active',
    validFromTo: '01 Oct 2026 - 31 Dec 2026',
  },
  {
    id: 9,
    name: 'Export Partners',
    desc: 'Special pricing for export orders',
    customerGroup: 'All Groups',
    products: 210,
    discountType: 'Percentage',
    discountValue: '28%',
    status: 'Active',
    validFromTo: '01 Oct 2026 - 31 Dec 2026',
  },
  {
    id: 10,
    name: 'Sample Order List',
    desc: 'Discounted sample pricing',
    customerGroup: 'Silver',
    products: 60,
    discountType: 'Fixed Price',
    discountValue: 'Custom',
    status: 'Inactive',
    validFromTo: '01 Sep 2026 - 30 Sep 2026',
  },
];

const TOP_PRICE_LISTS = [
  { id: 1, name: 'Regular Wholesalers', products: '680 products' },
  { id: 2, name: 'Premium Retailers', products: '450 products' },
  { id: 3, name: 'Seasonal Essentials', products: '380 products' },
  { id: 4, name: 'New Business Partners', products: '320 products' },
  { id: 5, name: 'Bulk Purchase (100+)', products: '220 products' },
];

const RECENT_ACTIVITY = [
  { id: 1, initials: 'PS', name: 'Pooja Shah', action: 'Updated Premium Retailers', date: '18 Oct 2026', color: 'bg-rose-100 text-[#800020]' },
  { id: 2, initials: 'NP', name: 'Neha Patel', action: 'Created Festive Collection', date: '17 Oct 2026', color: 'bg-rose-100 text-[#800020]' },
  { id: 3, initials: 'RM', name: 'Riya Mehta', action: 'Updated Regular Wholesalers', date: '16 Oct 2026', color: 'bg-rose-100 text-[#800020]' },
  { id: 4, initials: 'AD', name: 'Aarti Desai', action: 'Deactivated Sample Order List', date: '15 Oct 2026', color: 'bg-rose-100 text-[#800020]' },
  { id: 5, initials: 'KJ', name: 'Kunal Jain', action: 'Added 120 products to Seasonal Essentials', date: '14 Oct 2026', color: 'bg-rose-100 text-[#800020]' },
];

export default function AdminPriceListsPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [customerGroupFilter, setCustomerGroupFilter] = useState('All Customer Groups');
  const [categoryFilter, setCategoryFilter] = useState('All Product Categories');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredPriceLists = useMemo(() => {
    return INITIAL_PRICE_LISTS.filter((p) => {
      const matchSearch =
        !effectiveSearch ||
        p.name.toLowerCase().includes(effectiveSearch) ||
        p.desc.toLowerCase().includes(effectiveSearch) ||
        p.customerGroup.toLowerCase().includes(effectiveSearch);

      const matchStatus = statusFilter === 'All Statuses' || p.status === statusFilter;
      const matchGroup =
        customerGroupFilter === 'All Customer Groups' || p.customerGroup === customerGroupFilter;

      return matchSearch && matchStatus && matchGroup;
    });
  }, [effectiveSearch, statusFilter, customerGroupFilter]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredPriceLists.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getGroupBadge = (group) => {
    switch (group) {
      case 'Platinum':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
      case 'Gold':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Silver':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'All Groups':
        return 'bg-purple-50 text-purple-700 border border-purple-200';
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
        <span className="font-semibold text-[#800020]">Price Lists</span>
      </div>

      {/* Header Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0F3] text-[#800020] shadow-sm border border-[#FFE4E8]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] tracking-tight">
              Price Lists
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Create and manage wholesale price lists for different customer groups, products, and discount levels.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => triggerToast('Opening Create Price List modal...')}
            className="flex items-center gap-2 rounded-xl bg-[#800020] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#660019] transition-all"
          >
            <AdminIcon name="plus" size={16} strokeWidth={2} />
            <span>Create Price List</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
        {/* Card 1 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Price Lists</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">12</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 20%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Active Price Lists</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <AdminIcon name="customers" size={16} strokeWidth={1.75} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">9</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 12%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">currently active</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Products with Wholesale Prices</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F3E8FF] text-purple-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">1,250</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 28%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">across all price lists</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Avg. Wholesale Discount</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <span className="font-bold text-sm">%</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">28%</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 5%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">across active price lists</p>
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
                  placeholder="Search price lists by name, customer group, or description..."
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
                  <option>Inactive</option>
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
                  <option>All Groups</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Product Categories</option>
                  <option>Laces</option>
                  <option>Latkans</option>
                  <option>Borders</option>
                  <option>Embellishments</option>
                </select>

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
                          selectedIds.length === filteredPriceLists.length
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                      />
                    </th>
                    <th className="py-3 px-3 w-8">#</th>
                    <th className="py-3 px-4">Price List Name</th>
                    <th className="py-3 px-3">Customer Group</th>
                    <th className="py-3 px-3">Products</th>
                    <th className="py-3 px-3">Discount Type</th>
                    <th className="py-3 px-3">Discount Value</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4">Valid From - To</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {filteredPriceLists.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="py-8 text-center text-gray-400">
                        No price lists found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredPriceLists.map((p) => {
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
                            <p className="font-bold text-gray-900">{p.name}</p>
                            <p className="text-[11px] text-gray-400">{p.desc}</p>
                          </td>
                          <td className="py-3.5 px-3">
                            <span
                              className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-[11px] font-semibold ${getGroupBadge(
                                p.customerGroup
                              )}`}
                            >
                              {p.customerGroup}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 font-semibold text-gray-800">{p.products}</td>
                          <td className="py-3.5 px-3">
                            <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-[#800020] border border-rose-100">
                              {p.discountType}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 font-bold text-gray-900">{p.discountValue}</td>
                          <td className="py-3.5 px-3">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                                p.status === 'Active'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-gray-500 text-[11px] whitespace-nowrap">
                            {p.validFromTo}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => triggerToast(`Viewing ${p.name}`)}
                                title="View Price List"
                                className="rounded p-1 text-gray-400 hover:text-[#800020] transition-colors"
                              >
                                <AdminIcon name="eye" size={14} strokeWidth={1.75} />
                              </button>
                              <button
                                onClick={() => triggerToast(`Editing ${p.name}`)}
                                title="Edit Price List"
                                className="rounded p-1 text-gray-400 hover:text-[#800020] transition-colors"
                              >
                                <AdminIcon name="edit" size={14} strokeWidth={1.75} />
                              </button>
                              <button
                                onClick={() => triggerToast(`Options for ${p.name}`)}
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
              <span>Showing 1 - 10 of 12 price lists</span>

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
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column (3 cols) */}
        <div className="xl:col-span-3 space-y-6">
          {/* Price List Distribution Donut */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <svg className="w-4 h-4 text-[#800020]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <h3 className="text-sm font-bold text-gray-900">Price List Distribution</h3>
            </div>

            <div className="flex flex-col items-center py-2">
              <div className="relative flex items-center justify-center h-36 w-36 shrink-0 mb-3">
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                  {/* Platinum 25% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#FB7185"
                    strokeWidth="14"
                    strokeDasharray="60 238"
                    strokeDashoffset="0"
                  />
                  {/* Gold 33% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    strokeDasharray="79 238"
                    strokeDashoffset="-60"
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
                    strokeDashoffset="-139"
                  />
                  {/* All Groups 17% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#C084FC"
                    strokeWidth="14"
                    strokeDasharray="39 238"
                    strokeDashoffset="-199"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-gray-900">12</span>
                  <span className="text-[10px] font-medium text-gray-400">Total Price Lists</span>
                </div>
              </div>

              <div className="w-full space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#FB7185]"></span> Platinum
                  </span>
                  <span className="font-semibold text-gray-900">3 (25%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#F59E0B]"></span> Gold
                  </span>
                  <span className="font-semibold text-gray-900">4 (33%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#38BDF8]"></span> Silver
                  </span>
                  <span className="font-semibold text-gray-900">3 (25%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#C084FC]"></span> All Groups
                  </span>
                  <span className="font-semibold text-gray-900">2 (17%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Price Lists by Products */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AdminIcon name="products" size={16} className="text-[#800020]" strokeWidth={1.75} />
                <h3 className="text-sm font-bold text-gray-900">Top Price Lists by Products</h3>
              </div>
              <button
                onClick={() => triggerToast('Viewing all price lists')}
                className="text-xs font-semibold text-[#800020] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {TOP_PRICE_LISTS.map((pl) => (
                <div key={pl.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[11px] font-bold text-gray-400 w-3">{pl.id}</span>
                    <span className="font-semibold text-gray-900 truncate max-w-[140px]">{pl.name}</span>
                  </div>
                  <span className="font-bold text-gray-800 shrink-0">{pl.products}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Price List Activity */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AdminIcon name="clock" size={16} className="text-[#800020]" strokeWidth={1.75} />
                <h3 className="text-sm font-bold text-gray-900">Recent Price List Activity</h3>
              </div>
              <button
                onClick={() => triggerToast('Viewing all activity')}
                className="text-xs font-semibold text-[#800020] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {RECENT_ACTIVITY.map((a) => (
                <div key={a.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${a.color}`}
                    >
                      {a.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{a.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">{a.action}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0">{a.date.split(' ').slice(0, 2).join(' ')}</span>
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
              Have questions about price lists? Contact our wholesale support team for assistance.
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

