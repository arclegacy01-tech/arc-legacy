import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../components/admin/AdminIcons.jsx';

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Golden Zari Lace Trim',
    sku: 'GT-1023',
    category: 'Laces',
    price: 180,
    unit: 'Meter',
    stock: 42,
    status: 'Active',
    lastUpdated: '16 Oct 2026 10:24 AM',
    image: '/images/product-1.jpg',
  },
  {
    id: 'prod-2',
    name: 'Red Bridal Latkan',
    sku: 'LT-2045',
    category: 'Latkans',
    price: 320,
    unit: 'Pair',
    stock: 5,
    status: 'Low Stock',
    lastUpdated: '15 Oct 2026 04:18 PM',
    image: '/images/product-2.jpg',
  },
  {
    id: 'prod-3',
    name: 'Multicolour Pom Pom Trim',
    sku: 'PM-3021',
    category: 'Pom Pom Trims',
    price: 150,
    unit: 'Meter',
    stock: 6,
    status: 'Low Stock',
    lastUpdated: '15 Oct 2026 11:03 AM',
    image: '/images/product-3.jpg',
  },
  {
    id: 'prod-4',
    name: 'Scalloped Gota Patti Border',
    sku: 'GP-1108',
    category: 'Gota Patti',
    price: 280,
    unit: 'Meter',
    stock: 28,
    status: 'Active',
    lastUpdated: '14 Oct 2026 03:50 PM',
    image: '/images/product-4.jpg',
  },
  {
    id: 'prod-5',
    name: 'Pearl Beaded Fringe',
    sku: 'TR-5007',
    category: 'Embellishments',
    price: 240,
    unit: 'Meter',
    stock: 0,
    status: 'Out of Stock',
    lastUpdated: '14 Oct 2026 09:12 AM',
    image: '/images/product-5.jpg',
  },
  {
    id: 'prod-6',
    name: 'Mirror Work Border',
    sku: 'MR-1056',
    category: 'Trims & Borders',
    price: 240,
    unit: 'Meter',
    stock: 18,
    status: 'Active',
    lastUpdated: '13 Oct 2026 06:27 PM',
    image: '/images/product-6.jpg',
  },
  {
    id: 'prod-7',
    name: 'Designer Dori Latkan',
    sku: 'LT-3099',
    category: 'Latkans',
    price: 260,
    unit: 'Pair',
    stock: 15,
    status: 'Active',
    lastUpdated: '13 Oct 2026 01:14 PM',
    image: '/images/product-7.jpg',
  },
  {
    id: 'prod-8',
    name: 'Floral Applique Patch',
    sku: 'EM-4412',
    category: 'Embellishments',
    price: 90,
    unit: 'Piece',
    stock: 22,
    status: 'Active',
    lastUpdated: '12 Oct 2026 05:48 PM',
    image: '/images/product-8.jpg',
  },
  {
    id: 'prod-9',
    name: 'Maroon Velvet Latkan',
    sku: 'LT-3320',
    category: 'Latkans',
    price: 330,
    unit: 'Pair',
    stock: 3,
    status: 'Low Stock',
    lastUpdated: '12 Oct 2026 11:36 AM',
    image: '/images/product-9.jpg',
  },
  {
    id: 'prod-10',
    name: 'Crystal Stone Lace Trim',
    sku: 'ST-7781',
    category: 'Trims & Borders',
    price: 420,
    unit: 'Meter',
    stock: 25,
    status: 'Active',
    lastUpdated: '11 Oct 2026 04:09 PM',
    image: '/images/product-10.jpg',
  },
];

const STATUS_BADGE = {
  Active: 'bg-[#E2F6EB] text-[#1D8852]',
  'Low Stock': 'bg-[#FFF5E2] text-[#D98218]',
  'Out of Stock': 'bg-[#FDE8EC] text-[#C92A52]',
  Draft: 'bg-[#F2EFF5] text-[#715888]',
};

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [stockStatusFilter, setStockStatusFilter] = useState('All Stock Status');
  const [sortBy, setSortBy] = useState('Newest');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [toastMsg, setToastMsg] = useState('');
  const [showBulkModal, setShowBulkModal] = useState(false);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch =
          !effectiveSearch ||
          p.name.toLowerCase().includes(effectiveSearch) ||
          p.sku.toLowerCase().includes(effectiveSearch) ||
          p.category.toLowerCase().includes(effectiveSearch);

        const matchesCategory =
          categoryFilter === 'All Categories' || p.category === categoryFilter;

        const matchesStock =
          stockStatusFilter === 'All Stock Status' ||
          (stockStatusFilter === 'In Stock' && p.stock > 10) ||
          (stockStatusFilter === 'Low Stock' && p.stock > 0 && p.stock <= 10) ||
          (stockStatusFilter === 'Out of Stock' && p.stock === 0);

        return matchesSearch && matchesCategory && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        if (sortBy === 'Stock: High to Low') return b.stock - a.stock;
        return 0; // default Newest (initial order)
      });
  }, [products, effectiveSearch, categoryFilter, stockStatusFilter, sortBy]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length && filteredProducts.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('All Categories');
    setStockStatusFilter('All Stock Status');
    setSortBy('Newest');
    triggerToast('Filters reset.');
  };

  const handleExportCsv = () => {
    const headers = ['Product Name', 'SKU', 'Category', 'Price', 'Unit', 'Stock', 'Status', 'Last Updated'];
    const rows = filteredProducts.map((p) => [
      `"${p.name}"`,
      p.sku,
      `"${p.category}"`,
      p.price,
      p.unit,
      p.stock,
      p.status,
      `"${p.lastUpdated}"`,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arc-legacy-products.csv';
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Products catalog exported to CSV.');
  };

  const handleDeleteProduct = (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    triggerToast(`Product "${name}" deleted.`);
  };

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C1E21] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-[13px] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#249A62]" />
          {toastMsg}
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FDF2F5] border border-[#F3DCE2] flex items-center justify-center text-[#A91D48] shrink-0">
            <AdminIcon name="mandala" size={22} />
          </div>
          <div>
            <h1
              className="text-[24px] font-bold text-[#8E1838] leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Products
            </h1>
            <p className="text-[12.5px] text-[#7A6268] mt-0.5">
              Manage your catalogue, listings and inventory in one place.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8E1838] text-white text-[12.5px] font-semibold hover:bg-[#77132E] transition-colors shadow-xs"
          >
            <AdminIcon name="plus" size={15} />
            Add New Product
          </Link>
          <button
            onClick={() => setShowBulkModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E6D3D8] text-[#8E1838] text-[12.5px] font-semibold hover:bg-[#FDF5F7] transition-colors shadow-xs cursor-pointer"
          >
            <AdminIcon name="upload" size={15} className="text-[#A91D48]" />
            Bulk Upload
          </button>
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E6D3D8] text-[#8E1838] text-[12.5px] font-semibold hover:bg-[#FDF5F7] transition-colors shadow-xs cursor-pointer"
          >
            <AdminIcon name="download" size={15} className="text-[#A91D48]" />
            Export
          </button>
        </div>
      </div>

      {/* Main Layout: Left 3/4 Area + Right 1/4 Widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Column */}
        <div className="xl:col-span-9 space-y-5">
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Total Products */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#FDEBF1] flex items-center justify-center text-[#B82050] shrink-0">
                <AdminIcon name="box" size={22} />
              </div>
              <div>
                <p className="text-[11.5px] font-medium text-[#7A6268]">Total Products</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[24px] font-bold text-[#2C1E21] leading-none">286</span>
                </div>
              </div>
            </div>

            {/* Active Listings */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#E6F7EE] flex items-center justify-center text-[#1D8852] shrink-0">
                <AdminIcon name="check-circle" size={22} />
              </div>
              <div>
                <p className="text-[11.5px] font-medium text-[#7A6268]">Active Listings</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[24px] font-bold text-[#2C1E21] leading-none">264</span>
                </div>
              </div>
            </div>

            {/* Low Stock */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#FFF4E4] flex items-center justify-center text-[#D98218] shrink-0">
                <AdminIcon name="warning" size={22} />
              </div>
              <div>
                <p className="text-[11.5px] font-medium text-[#7A6268]">Low Stock</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[24px] font-bold text-[#2C1E21] leading-none">12</span>
                </div>
              </div>
            </div>

            {/* Drafts */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#F3ECF9] flex items-center justify-center text-[#8244B8] shrink-0">
                <AdminIcon name="draft" size={22} />
              </div>
              <div>
                <p className="text-[11.5px] font-medium text-[#7A6268]">Drafts</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[24px] font-bold text-[#2C1E21] leading-none">10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter & Table Card */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] shadow-[0_2px_12px_rgba(142,24,56,0.03)] overflow-hidden">
            {/* Search & Filters Row */}
            <div className="p-3.5 border-b border-[#F3E6EA] flex flex-wrap items-center gap-2.5">
              <div className="relative flex-1 min-w-[240px]">
                <AdminIcon
                  name="search"
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A8187]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by product name, SKU or keyword..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12.5px] text-[#2C1E21] placeholder-[#9A8187] focus:outline-none focus:border-[#A91D48]"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
              >
                <option value="All Categories">All Categories</option>
                <option value="Laces">Laces</option>
                <option value="Latkans">Latkans</option>
                <option value="Pom Pom Trims">Pom Pom Trims</option>
                <option value="Gota Patti">Gota Patti</option>
                <option value="Embellishments">Embellishments</option>
                <option value="Trims & Borders">Trims &amp; Borders</option>
              </select>

              <select
                value={stockStatusFilter}
                onChange={(e) => setStockStatusFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
              >
                <option value="All Stock Status">All Stock Status</option>
                <option value="In Stock">In Stock (&gt; 10)</option>
                <option value="Low Stock">Low Stock (1 - 10)</option>
                <option value="Out of Stock">Out of Stock (0)</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
              >
                <option value="Newest">Sort by: Newest</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Stock: High to Low">Stock: High to Low</option>
              </select>

              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDF5F7] text-[#A91D48] text-[12.5px] font-semibold hover:bg-[#FCE8EE] transition-colors cursor-pointer"
              >
                <AdminIcon name="filter" size={14} className="text-[#A91D48]" />
                Clear Filters
              </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FDF7F8] border-b border-[#F1E2E6] text-[11.5px] font-bold text-[#4A3439]">
                    <th className="py-3 pl-4 pr-2 w-8">
                      <input
                        type="checkbox"
                        checked={
                          filteredProducts.length > 0 &&
                          selectedIds.length === filteredProducts.length
                        }
                        onChange={toggleSelectAll}
                        className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-3">Product / SKU</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">Stock</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Last Updated</th>
                    <th className="py-3 pl-3 pr-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EAEc] text-[12px]">
                  {filteredProducts.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-[#FDF9FA] transition-colors group"
                    >
                      <td className="py-3 pl-4 pr-2">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(p.id)}
                          onChange={() => toggleSelectOne(p.id)}
                          className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover border border-[#EFE0E4] shrink-0"
                          />
                          <div>
                            <p className="font-bold text-[#2C1E21] leading-snug">
                              {p.name}
                            </p>
                            <p className="text-[11px] text-[#8C7076] mt-0.5">
                              SKU: {p.sku}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#FDEBF1] text-[#A91D48]">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#2C1E21]">
                        ₹{p.price} / {p.unit}
                      </td>
                      <td className="py-3 px-3 font-bold">
                        <span
                          className={
                            p.stock === 0
                              ? 'text-[#C92A52]'
                              : p.stock <= 10
                              ? 'text-[#D98218]'
                              : 'text-[#1D8852]'
                          }
                        >
                          {p.stock}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                            STATUS_BADGE[p.status] || 'bg-[#F2EFF5] text-[#715888]'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#5E474D] text-[11.5px]">
                        {p.lastUpdated}
                      </td>
                      <td className="py-3 pl-3 pr-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <Link
                            to={`/admin/products/${p.id}/edit`}
                            title="Edit Product"
                            className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#A91D48] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors"
                          >
                            <AdminIcon name="edit" size={13.5} />
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            title="Delete Product"
                            className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#7A6268] hover:bg-[#FCE8EE] hover:text-[#C92A52] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="more" size={13.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-[#8C7076]">
                        No products match your current search and filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-4 py-3.5 border-t border-[#F3E6EA] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#6E565C]">
              <span>
                Showing 1 – {filteredProducts.length} of 286 products
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-7 h-7 rounded-lg border border-[#E6D6DA] bg-white flex items-center justify-center text-[#6E565C] hover:bg-[#FDF5F7] cursor-pointer"
                >
                  <AdminIcon name="chevron-left" size={13} />
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer ${
                      currentPage === page
                        ? 'bg-[#8E1838] text-white shadow-xs'
                        : 'border border-[#E6D6DA] bg-white text-[#4A3439] hover:bg-[#FDF5F7]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="text-[#8C7076] px-0.5">...</span>
                <button
                  onClick={() => setCurrentPage(29)}
                  className="w-7 h-7 rounded-lg border border-[#E6D6DA] bg-white text-[12px] font-semibold text-[#4A3439] hover:bg-[#FDF5F7] cursor-pointer"
                >
                  29
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(29, p + 1))}
                  className="w-7 h-7 rounded-lg border border-[#E6D6DA] bg-white flex items-center justify-center text-[#6E565C] hover:bg-[#FDF5F7] cursor-pointer"
                >
                  <AdminIcon name="chevron-right" size={13} />
                </button>
              </div>

              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="px-3 py-1.5 rounded-lg border border-[#E6D6DA] bg-white text-[12px] text-[#4A3439] focus:outline-none cursor-pointer"
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="xl:col-span-3 space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="sparkle" size={14} />
              </span>
              <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                Quick Actions
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Link
                to="/admin/products/new"
                className="p-3 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] transition-colors flex flex-col items-center text-center group"
              >
                <div className="w-8 h-8 rounded-full border border-[#DCA2B0] text-[#A91D48] flex items-center justify-center mb-1.5 group-hover:bg-[#A91D48] group-hover:text-white transition-colors">
                  <AdminIcon name="plus" size={15} />
                </div>
                <p className="text-[11.5px] font-bold text-[#2C1E21] leading-tight">
                  Add Product
                </p>
                <p className="text-[10px] text-[#7A6268] mt-0.5 leading-tight">
                  Create a new product listing
                </p>
              </Link>

              <Link
                to="/admin/products/categories"
                className="p-3 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] transition-colors flex flex-col items-center text-center group"
              >
                <div className="w-8 h-8 rounded-full border border-[#DCA2B0] text-[#A91D48] flex items-center justify-center mb-1.5 group-hover:bg-[#A91D48] group-hover:text-white transition-colors">
                  <AdminIcon name="grid" size={15} />
                </div>
                <p className="text-[11.5px] font-bold text-[#2C1E21] leading-tight">
                  Create Category
                </p>
                <p className="text-[10px] text-[#7A6268] mt-0.5 leading-tight">
                  Organize your products with categories
                </p>
              </Link>

              <button
                onClick={() => setShowBulkModal(true)}
                className="p-3 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] transition-colors flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full border border-[#DCA2B0] text-[#A91D48] flex items-center justify-center mb-1.5 group-hover:bg-[#A91D48] group-hover:text-white transition-colors">
                  <AdminIcon name="upload" size={15} />
                </div>
                <p className="text-[11.5px] font-bold text-[#2C1E21] leading-tight">
                  Bulk Upload
                </p>
                <p className="text-[10px] text-[#7A6268] mt-0.5 leading-tight">
                  Add multiple products via Excel
                </p>
              </button>

              <button
                onClick={() => setStockStatusFilter('Low Stock')}
                className="p-3 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] transition-colors flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full border border-[#DCA2B0] text-[#A91D48] flex items-center justify-center mb-1.5 group-hover:bg-[#A91D48] group-hover:text-white transition-colors">
                  <AdminIcon name="box" size={15} />
                </div>
                <p className="text-[11.5px] font-bold text-[#2C1E21] leading-tight">
                  Manage Stock
                </p>
                <p className="text-[10px] text-[#7A6268] mt-0.5 leading-tight">
                  Update inventory and stock levels
                </p>
              </button>
            </div>
          </div>

          {/* Listing Tips */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="sparkle" size={14} />
              </span>
              <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                Listing Tips
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#FDF2F5] text-[#A91D48] flex items-center justify-center shrink-0 mt-0.5">
                  <AdminIcon name="camera" size={14} />
                </span>
                <div>
                  <h4 className="text-[12px] font-bold text-[#2C1E21] leading-tight">
                    Use Clear, High-Quality Photos
                  </h4>
                  <p className="text-[11px] text-[#6E565C] mt-0.5 leading-relaxed">
                    Show different angles and close-ups of your product details.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#FDF2F5] text-[#A91D48] flex items-center justify-center shrink-0 mt-0.5">
                  <AdminIcon name="tag" size={14} />
                </span>
                <div>
                  <h4 className="text-[12px] font-bold text-[#2C1E21] leading-tight">
                    Keep SKU Unique
                  </h4>
                  <p className="text-[11px] text-[#6E565C] mt-0.5 leading-relaxed">
                    Use a unique SKU for easy tracking and inventory management.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#FDF2F5] text-[#A91D48] flex items-center justify-center shrink-0 mt-0.5">
                  <AdminIcon name="ruler" size={14} />
                </span>
                <div>
                  <h4 className="text-[12px] font-bold text-[#2C1E21] leading-tight">
                    Add Measurements &amp; Selling Units
                  </h4>
                  <p className="text-[11px] text-[#6E565C] mt-0.5 leading-relaxed">
                    Mention length, width, and unit (e.g., per meter, per piece, per pair).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Need Help? */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="support" size={14} />
              </span>
              <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                Need Help?
              </h3>
            </div>
            <p className="text-[11.5px] text-[#6E565C] leading-relaxed mb-3">
              Facing issues or need assistance with product listing? Our support team is here to help.
            </p>
            <Link
              to="/admin/support"
              className="w-full py-2 rounded-xl border border-[#E5CCD3] bg-[#FDF7F8] text-[#A91D48] text-[12px] font-semibold flex items-center justify-center gap-1.5 hover:bg-[#FCE8EE] transition-colors"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </div>

      {/* Bulk Upload Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#EFE0E4] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F3E6EA] pb-3 mb-4">
              <h3 className="text-[16px] font-bold text-[#8E1838]">
                Bulk Upload Products via Excel
              </h3>
              <button
                onClick={() => setShowBulkModal(false)}
                className="w-8 h-8 rounded-lg bg-[#FDF5F7] text-[#8E1838] flex items-center justify-center cursor-pointer"
              >
                <AdminIcon name="x" size={16} />
              </button>
            </div>
            <div className="space-y-3 text-[12.5px] text-[#4A3439]">
              <p>Upload a spreadsheet (.xlsx, .csv) with product titles, SKUs, prices, categories, and stock quantities.</p>
              <div className="border-2 border-dashed border-[#E3CCD2] rounded-xl p-6 text-center bg-[#FDFBFC]">
                <AdminIcon name="upload" size={28} className="mx-auto text-[#A91D48] mb-2" />
                <p className="font-semibold text-[#2C1E21]">Drag &amp; drop your Excel file here</p>
                <p className="text-[11px] text-[#8C7076] mt-0.5">or browse from your computer</p>
              </div>
              <div className="flex justify-between items-center text-[11.5px] text-[#8E1838] font-medium pt-1">
                <a href="#template" onClick={(e) => { e.preventDefault(); triggerToast('Sample template downloaded.'); }} className="underline">Download Sample Template (.xlsx)</a>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 rounded-xl border border-[#E6D6DA] text-[12.5px] font-semibold text-[#4A3439] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowBulkModal(false);
                  triggerToast('10 products imported successfully.');
                }}
                className="px-4 py-2 rounded-xl bg-[#8E1838] text-white text-[12.5px] font-semibold cursor-pointer"
              >
                Upload &amp; Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
