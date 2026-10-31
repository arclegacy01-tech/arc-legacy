import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_CATALOG = [
  {
    id: 1,
    image: '/images/product-1.jpg',
    name: 'Cotton Lace Trim',
    desc: 'Premium cotton lace',
    sku: 'ACL001',
    category: 'Lace Trim',
    wholesalePrice: '₹45.00',
    minOrderQty: 50,
    stock: 1250,
    status: 'Active',
  },
  {
    id: 2,
    image: '/images/product-2.jpg',
    name: 'Embroidered Lace',
    desc: 'Floral embroidered design',
    sku: 'ACL002',
    category: 'Embroidered',
    wholesalePrice: '₹85.00',
    minOrderQty: 30,
    stock: 680,
    status: 'Active',
  },
  {
    id: 3,
    image: '/images/product-3.jpg',
    name: 'Cotton Crochet Lace',
    desc: 'Handmade crochet style',
    sku: 'ACL003',
    category: 'Crochet',
    wholesalePrice: '₹65.00',
    minOrderQty: 50,
    stock: 920,
    status: 'Active',
  },
  {
    id: 4,
    image: '/images/product-4.jpg',
    name: 'Satin Lace Trim',
    desc: 'Soft satin finish',
    sku: 'ACL004',
    category: 'Satin',
    wholesalePrice: '₹55.00',
    minOrderQty: 100,
    stock: 480,
    status: 'Low Stock',
  },
  {
    id: 5,
    image: '/images/product-5.jpg',
    name: 'Designer Lace',
    desc: 'Premium designer collection',
    sku: 'ACL005',
    category: 'Designer',
    wholesalePrice: '₹120.00',
    minOrderQty: 20,
    stock: 320,
    status: 'Active',
  },
  {
    id: 6,
    image: '/images/product-6.jpg',
    name: 'Net Lace Border',
    desc: 'Lightweight net lace',
    sku: 'ACL006',
    category: 'Net Lace',
    wholesalePrice: '₹70.00',
    minOrderQty: 50,
    stock: 0,
    status: 'Out of Stock',
  },
  {
    id: 7,
    image: '/images/product-7.jpg',
    name: 'Zari Lace Trim',
    desc: 'Golden zari work',
    sku: 'ACL007',
    category: 'Zari',
    wholesalePrice: '₹95.00',
    minOrderQty: 30,
    stock: 540,
    status: 'Active',
  },
  {
    id: 8,
    image: '/images/product-8.jpg',
    name: 'Mixed Lace Pack',
    desc: 'Assorted lace pack (10 pcs)',
    sku: 'ACL008',
    category: 'Combo Pack',
    wholesalePrice: '₹180.00',
    minOrderQty: 25,
    stock: 260,
    status: 'Active',
  },
  {
    id: 9,
    image: '/images/product-9.jpg',
    name: 'Velvet Lace Trim',
    desc: 'Velvet texture lace',
    sku: 'ACL009',
    category: 'Velvet',
    wholesalePrice: '₹110.00',
    minOrderQty: 20,
    stock: 150,
    status: 'Active',
  },
  {
    id: 10,
    image: '/images/product-10.jpg',
    name: 'Sequin Lace Trim',
    desc: 'Sequins embellished',
    sku: 'ACL010',
    category: 'Sequin',
    wholesalePrice: '₹105.00',
    minOrderQty: 25,
    stock: 75,
    status: 'Low Stock',
  },
];

const TOP_SELLING = [
  { id: 1, name: 'Cotton Lace Trim', sku: 'ACL001', sold: '1,250 sold', image: '/images/product-1.jpg' },
  { id: 2, name: 'Embroidered Lace', sku: 'ACL002', sold: '980 sold', image: '/images/product-2.jpg' },
  { id: 3, name: 'Designer Lace', sku: 'ACL005', sold: '760 sold', image: '/images/product-5.jpg' },
  { id: 4, name: 'Zari Lace Trim', sku: 'ACL007', sold: '620 sold', image: '/images/product-7.jpg' },
  { id: 5, name: 'Mixed Lace Pack', sku: 'ACL008', sold: '580 sold', image: '/images/product-8.jpg' },
];

const RECENT_PRODUCT_ACTIVITY = [
  { id: 1, initials: 'PS', name: 'Pooja Shah', action: 'Added new product ACL010', date: '18 Oct 2026', color: 'bg-rose-100 text-[#800020]' },
  { id: 2, initials: 'NP', name: 'Neha Patel', action: 'Updated price for ACL005', date: '17 Oct 2026', color: 'bg-rose-100 text-[#800020]' },
  { id: 3, initials: 'RM', name: 'Riya Mehta', action: 'Updated stock for ACL002', date: '16 Oct 2026', color: 'bg-rose-100 text-[#800020]' },
  { id: 4, initials: 'AD', name: 'Aarti Desai', action: 'Deactivated product ACL009', date: '15 Oct 2026', color: 'bg-rose-100 text-[#800020]' },
  { id: 5, initials: 'KJ', name: 'Kunal Jain', action: 'Added new category Sequin', date: '14 Oct 2026', color: 'bg-rose-100 text-[#800020]' },
];

export default function AdminWholesaleCatalogPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [tierFilter, setTierFilter] = useState('All Price Tiers');
  const [stockFilter, setStockFilter] = useState('All Stock Status');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredCatalog = useMemo(() => {
    return INITIAL_CATALOG.filter((p) => {
      const matchSearch =
        !effectiveSearch ||
        p.name.toLowerCase().includes(effectiveSearch) ||
        p.sku.toLowerCase().includes(effectiveSearch) ||
        p.category.toLowerCase().includes(effectiveSearch) ||
        p.desc.toLowerCase().includes(effectiveSearch);

      const matchCategory =
        categoryFilter === 'All Categories' || p.category === categoryFilter;

      const matchStock =
        stockFilter === 'All Stock Status' || p.status === stockFilter;

      return matchSearch && matchCategory && matchStock;
    });
  }, [effectiveSearch, categoryFilter, stockFilter]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredCatalog.map((p) => p.id));
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
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Low Stock':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Out of Stock':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
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
        <span className="font-semibold text-[#800020]">Product Catalog</span>
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
              Product Catalog
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Manage wholesale products, set tiered pricing, stock levels, and bulk availability for your wholesale customers.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => triggerToast('Opening Add Wholesale Product modal...')}
            className="flex items-center gap-2 rounded-xl bg-[#800020] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#660019] transition-all"
          >
            <AdminIcon name="plus" size={16} strokeWidth={2} />
            <span>Add Wholesale Product</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
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
            <span className="text-xl sm:text-2xl font-bold text-gray-900">1,250</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 18%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Active Products</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FEF3C7] text-amber-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">1,120</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 22%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">currently active</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Out of Stock</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F3E8FF] text-purple-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">48</span>
            <span className="flex items-center text-xs font-semibold text-rose-600">
              ↓ 12%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">need restock</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Wholesale Categories</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <AdminIcon name="wholesale" size={16} strokeWidth={1.75} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">24</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 9%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">across catalog</p>
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
                  placeholder="Search products by name, SKU, or description..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/60 py-2.5 pl-9 pr-3 text-xs text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#800020] focus:bg-white focus:ring-1 focus:ring-[#800020]"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Categories</option>
                  <option>Lace Trim</option>
                  <option>Embroidered</option>
                  <option>Crochet</option>
                  <option>Satin</option>
                  <option>Designer</option>
                  <option>Net Lace</option>
                  <option>Zari</option>
                </select>

                <select
                  value={tierFilter}
                  onChange={(e) => setTierFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Price Tiers</option>
                  <option>Tier 1</option>
                  <option>Tier 2</option>
                  <option>Tier 3</option>
                </select>

                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Stock Status</option>
                  <option>Active</option>
                  <option>Low Stock</option>
                  <option>Out of Stock</option>
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
                          selectedIds.length === filteredCatalog.length
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                      />
                    </th>
                    <th className="py-3 px-3 w-8">#</th>
                    <th className="py-3 px-3">Product Image</th>
                    <th className="py-3 px-4">Product Name</th>
                    <th className="py-3 px-3">SKU</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Wholesale Price</th>
                    <th className="py-3 px-3">Min. Order Qty</th>
                    <th className="py-3 px-3">Stock</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {filteredCatalog.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="py-8 text-center text-gray-400">
                        No wholesale products found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredCatalog.map((p) => {
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
                          <td className="py-3.5 px-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-10 w-10 rounded-lg object-cover border border-gray-100"
                            />
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-gray-900">{p.name}</p>
                            <p className="text-[11px] text-gray-400">{p.desc}</p>
                          </td>
                          <td className="py-3.5 px-3 font-mono text-gray-500">{p.sku}</td>
                          <td className="py-3.5 px-3">
                            <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-[#800020] border border-rose-100">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 font-bold text-gray-900">{p.wholesalePrice}</td>
                          <td className="py-3.5 px-3 font-semibold text-gray-800">{p.minOrderQty}</td>
                          <td className="py-3.5 px-3 font-semibold">
                            <span
                              className={
                                p.stock === 0
                                  ? 'text-rose-600 font-bold'
                                  : p.stock < 100
                                  ? 'text-amber-600 font-bold'
                                  : 'text-gray-800'
                              }
                            >
                              {p.stock}
                            </span>
                          </td>
                          <td className="py-3.5 px-3">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${getStatusBadge(
                                p.status
                              )}`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => triggerToast(`Viewing ${p.name}`)}
                                title="View Product"
                                className="rounded p-1 text-gray-400 hover:text-[#800020] transition-colors"
                              >
                                <AdminIcon name="eye" size={14} strokeWidth={1.75} />
                              </button>
                              <button
                                onClick={() => triggerToast(`Editing ${p.name}`)}
                                title="Edit Product"
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
              <span>Showing 1 - 10 of 1,250 products</span>

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
          {/* Category Distribution Donut */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <svg className="w-4 h-4 text-[#800020]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              <h3 className="text-sm font-bold text-gray-900">Product Category Distribution</h3>
            </div>

            <div className="flex flex-col items-center py-2">
              <div className="relative flex items-center justify-center h-36 w-36 shrink-0 mb-3">
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                  {/* Lace Trim 26% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#FB7185"
                    strokeWidth="14"
                    strokeDasharray="62 238"
                    strokeDashoffset="0"
                  />
                  {/* Embroidered 22% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    strokeDasharray="52 238"
                    strokeDashoffset="-62"
                  />
                  {/* Crochet 17% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="14"
                    strokeDasharray="40 238"
                    strokeDashoffset="-114"
                  />
                  {/* Satin 13% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#C084FC"
                    strokeWidth="14"
                    strokeDasharray="31 238"
                    strokeDashoffset="-154"
                  />
                  {/* Others 22% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="14"
                    strokeDasharray="52 238"
                    strokeDashoffset="-185"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-gray-900">1,250</span>
                  <span className="text-[10px] font-medium text-gray-400">Total Products</span>
                </div>
              </div>

              <div className="w-full space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#FB7185]"></span> Lace Trim
                  </span>
                  <span className="font-semibold text-gray-900">320 (26%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#F59E0B]"></span> Embroidered
                  </span>
                  <span className="font-semibold text-gray-900">280 (22%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#38BDF8]"></span> Crochet
                  </span>
                  <span className="font-semibold text-gray-900">210 (17%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#C084FC]"></span> Satin
                  </span>
                  <span className="font-semibold text-gray-900">160 (13%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#94A3B8]"></span> Others
                  </span>
                  <span className="font-semibold text-gray-900">280 (22%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Selling Wholesale Products */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AdminIcon name="star" size={16} className="text-[#800020]" strokeWidth={1.75} />
                <h3 className="text-sm font-bold text-gray-900">Top Selling Products</h3>
              </div>
              <button
                onClick={() => triggerToast('Viewing top products')}
                className="text-xs font-semibold text-[#800020] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {TOP_SELLING.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-gray-400 w-3">{p.id}</span>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-9 w-9 rounded-lg object-cover border border-gray-100 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-900 truncate">{p.name}</p>
                    <p className="text-[10px] text-gray-400 font-mono">{p.sku}</p>
                  </div>
                  <span className="font-bold text-gray-800 text-[11px] shrink-0">{p.sold}</span>
                </div>
              ))}
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
                onClick={() => triggerToast('Viewing all product activity')}
                className="text-xs font-semibold text-[#800020] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {RECENT_PRODUCT_ACTIVITY.map((a) => (
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
              Have questions about wholesale products? Contact our wholesale support team for assistance.
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

