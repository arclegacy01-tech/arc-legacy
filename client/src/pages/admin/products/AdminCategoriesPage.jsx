import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_CATEGORIES = [
  {
    id: 1,
    rowNum: 1,
    name: 'Laces',
    image: '/images/product-1.jpg',
    products: 68,
    status: 'Active',
    displayOrder: 1,
    createdDate: '16 Oct 2026',
    createdTime: '10:24 AM',
  },
  {
    id: 2,
    rowNum: 2,
    name: 'Latkans',
    image: '/images/product-2.jpg',
    products: 42,
    status: 'Active',
    displayOrder: 2,
    createdDate: '14 Oct 2026',
    createdTime: '03:15 PM',
  },
  {
    id: 3,
    rowNum: 3,
    name: 'Trims & Borders',
    image: '/images/product-4.jpg',
    products: 54,
    status: 'Active',
    displayOrder: 3,
    createdDate: '13 Oct 2026',
    createdTime: '01:40 PM',
  },
  {
    id: 4,
    rowNum: 4,
    name: 'Gota Patti',
    image: '/images/product-8.jpg',
    products: 32,
    status: 'Active',
    displayOrder: 4,
    createdDate: '12 Oct 2026',
    createdTime: '11:20 AM',
  },
  {
    id: 5,
    rowNum: 5,
    name: 'Pom Pom Trims',
    image: '/images/product-3.jpg',
    products: 28,
    status: 'Active',
    displayOrder: 5,
    createdDate: '11 Oct 2026',
    createdTime: '05:08 PM',
  },
  {
    id: 6,
    rowNum: 6,
    name: 'Embellishments',
    image: '/images/product-5.jpg',
    products: 40,
    status: 'Active',
    displayOrder: 6,
    createdDate: '10 Oct 2026',
    createdTime: '12:18 PM',
  },
  {
    id: 7,
    rowNum: 7,
    name: 'Appliques & Patches',
    image: '/images/product-7.jpg',
    products: 18,
    status: 'Active',
    displayOrder: 7,
    createdDate: '09 Oct 2026',
    createdTime: '04:32 PM',
  },
  {
    id: 8,
    rowNum: 8,
    name: 'Designer Collections',
    image: '/images/product-6.jpg',
    products: 12,
    status: 'Active',
    displayOrder: 8,
    createdDate: '09 Oct 2026',
    createdTime: '03:10 PM',
  },
  {
    id: 9,
    rowNum: 9,
    name: 'Festive Collection',
    image: '/images/product-9.jpg',
    products: 16,
    status: 'Active',
    displayOrder: 9,
    createdDate: '07 Oct 2026',
    createdTime: '11:05 AM',
  },
  {
    id: 10,
    rowNum: 10,
    name: 'New Arrivals',
    image: '/images/product-10.jpg',
    products: 8,
    status: 'Active',
    displayOrder: 10,
    createdDate: '06 Oct 2026',
    createdTime: '02:47 PM',
  },
];

export default function AdminCategoriesPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sortBy, setSortBy] = useState('Created (Newest)');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // New category form state
  const [catName, setCatName] = useState('');
  const [parentCat, setParentCat] = useState('None (Main Category)');
  const [catDesc, setCatDesc] = useState('');
  const [catImage, setCatImage] = useState('/images/product-11.jpg');
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    return categories
      .filter((c) => {
        const matchesSearch =
          !effectiveSearch || c.name.toLowerCase().includes(effectiveSearch);
        const matchesStatus =
          statusFilter === 'All Status' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'Display Order') return a.displayOrder - b.displayOrder;
        if (sortBy === 'Most Products') return b.products - a.products;
        if (sortBy === 'Alphabetical') return a.name.localeCompare(b.name);
        return a.id - b.id; // default newest
      });
  }, [categories, effectiveSearch, statusFilter, sortBy]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredCategories.length && filteredCategories.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCategories.map((c) => c.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleStatus = (id) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'Active' ? 'Hidden' : 'Active' }
          : c
      )
    );
  };

  const handleUpdateOrder = (id, newOrder) => {
    const val = parseInt(newOrder, 10) || 0;
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, displayOrder: val } : c))
    );
  };

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;
    setCategories((prev) => prev.filter((c) => c.id !== id));
    triggerToast(`Category "${name}" deleted.`);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!catName.trim()) {
      triggerToast('Please enter category name.');
      return;
    }
    const newCat = {
      id: Date.now(),
      rowNum: categories.length + 1,
      name: catName.trim(),
      image: catImage,
      products: 0,
      status: 'Active',
      displayOrder: categories.length + 1,
      createdDate: '30 Oct 2026',
      createdTime: '10:45 PM',
    };
    setCategories([newCat, ...categories]);
    setCatName('');
    setCatDesc('');
    triggerToast(`Category "${newCat.name}" added successfully.`);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C1E21] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-[13px] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#249A62]" />
          {toastMsg}
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#8C7076] mb-1.5">
            <AdminIcon name="chevron-right" size={12} className="text-[#B89CA3]" />
            <Link to="/admin/products" className="hover:text-[#A91D48] transition-colors">
              Products
            </Link>
            <AdminIcon name="chevron-right" size={12} className="text-[#B89CA3]" />
            <span className="text-[#4A3439] font-medium">Categories</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDF2F5] border border-[#F3DCE2] flex items-center justify-center text-[#A91D48] shrink-0">
              <AdminIcon name="mandala" size={22} />
            </div>
            <div>
              <h1
                className="text-[24px] font-bold text-[#8E1838] leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Product Categories
              </h1>
              <p className="text-[12.5px] text-[#7A6268] mt-0.5">
                Organize your products into categories to make them easy to find for your customers.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            const formInput = document.getElementById('new-cat-name-input');
            formInput?.focus();
            formInput?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8E1838] text-white text-[12.5px] font-semibold hover:bg-[#77132E] transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <AdminIcon name="plus" size={15} />
          Add New Category
        </button>
      </div>

      {/* Main Layout: Left 3/4 Area + Right 1/4 Widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Column */}
        <div className="xl:col-span-8 space-y-5">
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Total Categories */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#FDEBF1] flex items-center justify-center text-[#B82050] shrink-0">
                <AdminIcon name="layers" size={22} />
              </div>
              <div>
                <p className="text-[11.5px] font-medium text-[#7A6268]">Total Categories</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[24px] font-bold text-[#2C1E21] leading-none">18</span>
                </div>
              </div>
            </div>

            {/* Active Categories */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#E6F7EE] flex items-center justify-center text-[#1D8852] shrink-0">
                <AdminIcon name="check-circle" size={22} />
              </div>
              <div>
                <p className="text-[11.5px] font-medium text-[#7A6268]">Active Categories</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[24px] font-bold text-[#2C1E21] leading-none">16</span>
                </div>
              </div>
            </div>

            {/* Hidden Categories */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#FDE8EC] flex items-center justify-center text-[#C92A52] shrink-0">
                <AdminIcon name="eye-off" size={22} />
              </div>
              <div>
                <p className="text-[11.5px] font-medium text-[#7A6268]">Hidden Categories</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[24px] font-bold text-[#2C1E21] leading-none">2</span>
                </div>
              </div>
            </div>

            {/* Total Products */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#F3ECF9] flex items-center justify-center text-[#8244B8] shrink-0">
                <AdminIcon name="box" size={22} />
              </div>
              <div>
                <p className="text-[11.5px] font-medium text-[#7A6268]">Total Products</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[24px] font-bold text-[#2C1E21] leading-none">286</span>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Table Card */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] shadow-[0_2px_12px_rgba(142,24,56,0.03)] overflow-hidden">
            {/* Search & Filters */}
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
                  placeholder="Search categories by name..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12.5px] text-[#2C1E21] placeholder-[#9A8187] focus:outline-none focus:border-[#A91D48]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
              >
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Hidden">Hidden</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
              >
                <option value="Created (Newest)">Sort by: Created (Newest)</option>
                <option value="Display Order">Sort by: Display Order</option>
                <option value="Most Products">Sort by: Most Products</option>
                <option value="Alphabetical">Sort by: Alphabetical</option>
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FDF7F8] border-b border-[#F1E2E6] text-[11.5px] font-bold text-[#4A3439]">
                    <th className="py-3 pl-4 pr-2 w-8">
                      <input
                        type="checkbox"
                        checked={
                          filteredCategories.length > 0 &&
                          selectedIds.length === filteredCategories.length
                        }
                        onChange={toggleSelectAll}
                        className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-2 w-8">#</th>
                    <th className="py-3 px-3">Category Name</th>
                    <th className="py-3 px-3">Image</th>
                    <th className="py-3 px-3">Products</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Display Order</th>
                    <th className="py-3 px-3">Created Date</th>
                    <th className="py-3 pl-3 pr-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EAEc] text-[12px]">
                  {filteredCategories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-[#FDF9FA] transition-colors group"
                    >
                      <td className="py-3 pl-4 pr-2">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(cat.id)}
                          onChange={() => toggleSelectOne(cat.id)}
                          className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-3 px-2 text-[#7A6268] font-medium">
                        {cat.rowNum}
                      </td>
                      <td className="py-3 px-3 font-bold text-[#2C1E21]">
                        {cat.name}
                      </td>
                      <td className="py-3 px-3">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-9 h-9 rounded-lg object-cover border border-[#EAE0E2]"
                        />
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#2C1E21]">
                        {cat.products}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleStatus(cat.id)}
                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              cat.status === 'Active' ? 'bg-[#1D8852]' : 'bg-[#D6C2C6]'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                cat.status === 'Active' ? 'translate-x-4' : 'translate-x-0'
                              }`}
                            />
                          </button>
                          <span
                            className={`text-[11px] font-semibold ${
                              cat.status === 'Active' ? 'text-[#1D8852]' : 'text-[#8C7076]'
                            }`}
                          >
                            {cat.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <input
                          type="number"
                          value={cat.displayOrder}
                          onChange={(e) => handleUpdateOrder(cat.id, e.target.value)}
                          className="w-12 px-2 py-1 text-center rounded-lg border border-[#E5D2D6] bg-[#FDFBFC] text-[12px] font-semibold text-[#2C1E21] focus:outline-none focus:border-[#A91D48]"
                        />
                      </td>
                      <td className="py-3 px-3 text-[#5E474D] text-[11.5px] leading-tight">
                        <p>{cat.createdDate}</p>
                        <p className="text-[10.5px] text-[#8C7076]">{cat.createdTime}</p>
                      </td>
                      <td className="py-3 pl-3 pr-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => {
                              setCatName(cat.name);
                              triggerToast(`Loaded "${cat.name}" into editor.`);
                            }}
                            title="Edit Category"
                            className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#A91D48] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="edit" size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(cat.id, cat.name)}
                            title="Delete Category"
                            className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#7A6268] hover:bg-[#FCE8EE] hover:text-[#C92A52] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="trash" size={13} />
                          </button>
                          <button
                            onClick={() => toggleStatus(cat.id)}
                            title="Toggle Visibility"
                            className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#7A6268] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="more" size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredCategories.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-10 text-center text-[#8C7076]">
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-4 py-3.5 border-t border-[#F3E6EA] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#6E565C]">
              <span>
                Showing 1 – {filteredCategories.length} of 18 categories
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-7 h-7 rounded-lg border border-[#E6D6DA] bg-white flex items-center justify-center text-[#6E565C] hover:bg-[#FDF5F7] cursor-pointer"
                >
                  <AdminIcon name="chevron-left" size={13} />
                </button>
                {[1, 2].map((page) => (
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
                <button
                  onClick={() => setCurrentPage((p) => Math.min(2, p + 1))}
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
                <option value={20}>20 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Form + Tips */}
        <div className="xl:col-span-4 space-y-4">
          {/* Add New Category Form Widget */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-5 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="layers" size={14} />
              </span>
              <h3 className="text-[14px] font-bold text-[#8E1838]">
                Add New Category
              </h3>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3.5">
              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1.5">
                  Category Name <span className="text-[#C92A52]">*</span>
                </label>
                <input
                  id="new-cat-name-input"
                  type="text"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="Enter category name"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12.5px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1.5">
                  Parent Category
                </label>
                <select
                  value={parentCat}
                  onChange={(e) => setParentCat(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48] cursor-pointer"
                >
                  <option value="None (Main Category)">None (Main Category)</option>
                  <option value="Laces">Laces</option>
                  <option value="Trims & Borders">Trims &amp; Borders</option>
                  <option value="Latkans">Latkans</option>
                  <option value="Embellishments">Embellishments</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[12px] font-semibold text-[#4A3439]">
                    Description
                  </label>
                  <span className="text-[11px] text-[#8C7076]">{catDesc.length}/300</span>
                </div>
                <textarea
                  rows={3}
                  value={catDesc}
                  maxLength={300}
                  onChange={(e) => setCatDesc(e.target.value)}
                  placeholder="Enter category description (optional)"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12.5px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48] resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1.5">
                  Category Image
                </label>
                <div
                  onClick={() => {
                    const pool = ['/images/product-1.jpg', '/images/product-2.jpg', '/images/product-3.jpg', '/images/product-4.jpg', '/images/product-5.jpg', '/images/product-6.jpg'];
                    const next = pool[Math.floor(Math.random() * pool.length)];
                    setCatImage(next);
                    triggerToast('Selected category thumbnail.');
                  }}
                  className="border-2 border-dashed border-[#E3CCD2] rounded-xl p-4 text-center bg-[#FDFBFC] hover:bg-[#FDF5F7] transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[95px]"
                >
                  <AdminIcon name="image" size={20} className="text-[#A91D48] mb-1" />
                  <p className="text-[11.5px] font-bold text-[#8E1838]">Upload Category Image</p>
                  <p className="text-[10px] text-[#7A6268] mt-0.5 leading-tight">
                    Click to upload or drag and drop<br />JPG, PNG, WebP (Max 2MB)<br />
                    <span className="text-[#9A8187]">Recommended: 500 × 500 px</span>
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#8E1838] text-white text-[12.5px] font-semibold hover:bg-[#77132E] transition-colors shadow-xs cursor-pointer"
              >
                Save Category
              </button>
            </form>
          </div>

          {/* Category Tips */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="sparkle" size={14} />
              </span>
              <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                Category Tips
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#FDF2F5] text-[#A91D48] flex items-center justify-center shrink-0 mt-0.5">
                  <AdminIcon name="tag" size={14} />
                </span>
                <div>
                  <h4 className="text-[12px] font-bold text-[#2C1E21] leading-tight">
                    Use Clear Names
                  </h4>
                  <p className="text-[11px] text-[#6E565C] mt-0.5 leading-relaxed">
                    Keep category names short and easy to understand.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#FDF2F5] text-[#A91D48] flex items-center justify-center shrink-0 mt-0.5">
                  <AdminIcon name="image" size={14} />
                </span>
                <div>
                  <h4 className="text-[12px] font-bold text-[#2C1E21] leading-tight">
                    Add Relevant Images
                  </h4>
                  <p className="text-[11px] text-[#6E565C] mt-0.5 leading-relaxed">
                    Use high-quality images for better visual navigation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#FDF2F5] text-[#A91D48] flex items-center justify-center shrink-0 mt-0.5">
                  <AdminIcon name="layers" size={14} />
                </span>
                <div>
                  <h4 className="text-[12px] font-bold text-[#2C1E21] leading-tight">
                    Organize with Parent Categories
                  </h4>
                  <p className="text-[11px] text-[#6E565C] mt-0.5 leading-relaxed">
                    Group similar categories under a main category.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#FDF2F5] text-[#A91D48] flex items-center justify-center shrink-0 mt-0.5">
                  <AdminIcon name="sort" size={14} />
                </span>
                <div>
                  <h4 className="text-[12px] font-bold text-[#2C1E21] leading-tight">
                    Set Display Order
                  </h4>
                  <p className="text-[11px] text-[#6E565C] mt-0.5 leading-relaxed">
                    Control the order in which categories appear on your website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

