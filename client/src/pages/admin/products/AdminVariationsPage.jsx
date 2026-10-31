import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_VARIATIONS = [
  {
    id: 1,
    name: 'Golden Zari Lace Trim',
    sku: 'GT-1023',
    type: 'Color',
    options: ['Gold', 'Rose Gold', 'Silver'],
    extraCount: 1,
    totalVariations: 4,
    status: 'Active',
    image: '/images/product-1.jpg',
  },
  {
    id: 2,
    name: 'Multicolour Pom Pom Trim',
    sku: 'PM-3021',
    type: 'Color',
    options: ['Red', 'Yellow', 'Blue'],
    extraCount: 2,
    totalVariations: 5,
    status: 'Active',
    image: '/images/product-3.jpg',
  },
  {
    id: 3,
    name: 'Pearl Beaded Fringe',
    sku: 'TR-5007',
    type: 'Size',
    options: ['1mm', '2mm', '3mm'],
    extraCount: 0,
    totalVariations: 3,
    status: 'Active',
    image: '/images/product-5.jpg',
  },
  {
    id: 4,
    name: 'Mirror Work Border',
    sku: 'MR-1056',
    type: 'Size',
    options: ['1 Yard', '2 Yards', '5 Yards'],
    extraCount: 0,
    totalVariations: 3,
    status: 'Active',
    image: '/images/product-4.jpg',
  },
  {
    id: 5,
    name: 'Designer Dori Latkan',
    sku: 'LT-3099',
    type: 'Color',
    options: ['Red', 'Pink', 'Golden'],
    extraCount: 1,
    totalVariations: 4,
    status: 'Active',
    image: '/images/product-7.jpg',
  },
  {
    id: 6,
    name: 'Floral Applique Patch',
    sku: 'EM-4412',
    type: 'Design',
    options: ['Flower', 'Leaf', 'Star'],
    extraCount: 0,
    totalVariations: 3,
    status: 'Active',
    image: '/images/product-8.jpg',
  },
  {
    id: 7,
    name: 'Maroon Velvet Latkan',
    sku: 'LT-3320',
    type: 'Color',
    options: ['Maroon', 'Wine', 'Burgundy'],
    extraCount: 0,
    totalVariations: 3,
    status: 'Active',
    image: '/images/product-9.jpg',
  },
  {
    id: 8,
    name: 'Crystal Stone Lace Trim',
    sku: 'ST-7781',
    type: 'Size',
    options: ['1m', '2m', '3m'],
    extraCount: 0,
    totalVariations: 3,
    status: 'Active',
    image: '/images/product-10.jpg',
  },
];

const TYPE_BADGE = {
  Color: 'bg-[#FDEBF1] text-[#A91D48]',
  Size: 'bg-[#F3ECF9] text-[#8048C5]',
  Design: 'bg-[#E2F6EB] text-[#1D8852]',
  Material: 'bg-[#FFF5E2] text-[#D98218]',
};

export default function AdminVariationsPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [variations, setVariations] = useState(INITIAL_VARIATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [productFilter, setProductFilter] = useState('All Products');
  const [typeFilter, setTypeFilter] = useState('All Variation Types');
  const [statusFilter, setStatusFilter] = useState('Status: All');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [toastMsg, setToastMsg] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredVariations = useMemo(() => {
    return variations.filter((item) => {
      const matchesSearch =
        !effectiveSearch ||
        item.name.toLowerCase().includes(effectiveSearch) ||
        item.sku.toLowerCase().includes(effectiveSearch) ||
        item.type.toLowerCase().includes(effectiveSearch) ||
        item.options.some((opt) => opt.toLowerCase().includes(effectiveSearch));

      const matchesProd =
        productFilter === 'All Products' || item.name === productFilter;

      const matchesType =
        typeFilter === 'All Variation Types' || item.type === typeFilter;

      const matchesStatus =
        statusFilter === 'Status: All' || item.status === statusFilter;

      return matchesSearch && matchesProd && matchesType && matchesStatus;
    });
  }, [variations, effectiveSearch, productFilter, typeFilter, statusFilter]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredVariations.length && filteredVariations.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredVariations.map((i) => i.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setProductFilter('All Products');
    setTypeFilter('All Variation Types');
    setStatusFilter('Status: All');
    triggerToast('Filters reset.');
  };

  const handleDuplicate = (item) => {
    const duplicated = {
      ...item,
      id: Date.now(),
      name: `${item.name} (Copy)`,
      sku: `${item.sku}-CP`,
    };
    setVariations([duplicated, ...variations]);
    triggerToast(`Duplicated variation for "${item.name}".`);
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

      {/* Header */}
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
              Manage Variations
            </h1>
            <p className="text-[12.5px] text-[#7A6268] mt-0.5">
              Create and manage product variations like size, color, and more.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8E1838] text-white text-[12.5px] font-semibold hover:bg-[#77132E] transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <AdminIcon name="plus" size={15} />
          Add Variation Group
        </button>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Total Products */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#FDEBF1] flex items-center justify-center text-[#B82050] shrink-0">
            <AdminIcon name="box" size={22} />
          </div>
          <div>
            <p className="text-[11.5px] font-medium text-[#7A6268]">Total Products</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-[24px] font-bold text-[#2C1E21] leading-none">286</span>
              <span className="text-[11px] font-semibold text-[#1D8852] flex items-center gap-0.5">
                <AdminIcon name="arrow-up" size={10} />
                12%
              </span>
            </div>
          </div>
        </div>

        {/* Products with Variations */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#FFF4E4] flex items-center justify-center text-[#D98218] shrink-0">
            <AdminIcon name="grid" size={22} />
          </div>
          <div>
            <p className="text-[11.5px] font-medium text-[#7A6268]">Products with Variations</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-[24px] font-bold text-[#2C1E21] leading-none">142</span>
              <span className="text-[11px] font-semibold text-[#1D8852] flex items-center gap-0.5">
                <AdminIcon name="arrow-up" size={10} />
                8%
              </span>
            </div>
          </div>
        </div>

        {/* Total Variations */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#F3ECF9] flex items-center justify-center text-[#8048C5] shrink-0">
            <AdminIcon name="layers" size={22} />
          </div>
          <div>
            <p className="text-[11.5px] font-medium text-[#7A6268]">Total Variations</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-[24px] font-bold text-[#2C1E21] leading-none">680</span>
              <span className="text-[11px] font-semibold text-[#1D8852] flex items-center gap-0.5">
                <AdminIcon name="arrow-up" size={10} />
                15%
              </span>
            </div>
          </div>
        </div>

        {/* Active Variations */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#E6F7EE] flex items-center justify-center text-[#1D8852] shrink-0">
            <AdminIcon name="check-circle" size={22} />
          </div>
          <div>
            <p className="text-[11.5px] font-medium text-[#7A6268]">Active Variations</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-[24px] font-bold text-[#2C1E21] leading-none">643</span>
              <span className="text-[11px] font-semibold text-[#1D8852] flex items-center gap-0.5">
                <AdminIcon name="arrow-up" size={10} />
                14%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-[#EFE0E4] shadow-[0_2px_12px_rgba(142,24,56,0.03)] overflow-hidden">
        {/* Search & Filter Row */}
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
              placeholder="Search product or variation..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12.5px] text-[#2C1E21] placeholder-[#9A8187] focus:outline-none focus:border-[#A91D48]"
            />
          </div>

          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
          >
            <option value="All Products">All Products</option>
            {variations.map((v) => (
              <option key={v.id} value={v.name}>{v.name}</option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
          >
            <option value="All Variation Types">All Variation Types</option>
            <option value="Color">Color</option>
            <option value="Size">Size</option>
            <option value="Design">Design</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
          >
            <option value="Status: All">Status: All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            onClick={handleClearFilters}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDF5F7] text-[#A91D48] text-[12.5px] font-semibold hover:bg-[#FCE8EE] transition-colors cursor-pointer"
          >
            <AdminIcon name="filter" size={14} className="text-[#A91D48]" />
            Clear Filters
          </button>
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
                      filteredVariations.length > 0 &&
                      selectedIds.length === filteredVariations.length
                    }
                    onChange={toggleSelectAll}
                    className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3">Variation Type</th>
                <th className="py-3 px-3">Options</th>
                <th className="py-3 px-3 text-center">Total Variations</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 pl-3 pr-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EAEc] text-[12px]">
              {filteredVariations.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#FDF9FA] transition-colors group"
                >
                  <td className="py-3.5 pl-4 pr-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelectOne(item.id)}
                      className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                    />
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover border border-[#EFE0E4] shrink-0"
                      />
                      <div>
                        <p className="font-bold text-[#2C1E21] leading-snug">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-[#8C7076] mt-0.5 font-mono">
                          SKU: {item.sku}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                        TYPE_BADGE[item.type] || 'bg-[#FDF2F5] text-[#8E1838]'
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.options.map((opt, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#F7EFF1] border border-[#E8DADC] text-[11px] font-medium text-[#4A3439]"
                        >
                          {opt}
                        </span>
                      ))}
                      {item.extraCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded bg-[#F1E3E6] text-[10.5px] font-bold text-[#8E1838]">
                          +{item.extraCount}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold text-[#2C1E21]">
                    {item.totalVariations}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#1D8852]">
                      <span className="w-2 h-2 rounded-full bg-[#1D8852]" />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 pl-3 pr-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <Link
                        to="/admin/products/new"
                        title="Edit Variations"
                        className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#A91D48] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors"
                      >
                        <AdminIcon name="edit" size={13} />
                      </Link>
                      <button
                        onClick={() => handleDuplicate(item)}
                        title="Duplicate"
                        className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#7A6268] hover:bg-[#FCE8EE] hover:text-[#A91D48] flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <AdminIcon name="copy" size={13} />
                      </button>
                      <button
                        onClick={() => triggerToast(`More options for ${item.sku}`)}
                        title="More Options"
                        className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#7A6268] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <AdminIcon name="more" size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredVariations.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-[#8C7076]">
                    No variations match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-4 py-3.5 border-t border-[#F3E6EA] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#6E565C]">
          <span>
            Showing 1 – {filteredVariations.length} of 142 products
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-7 h-7 rounded-lg border border-[#E6D6DA] bg-white flex items-center justify-center text-[#6E565C] hover:bg-[#FDF5F7] cursor-pointer"
            >
              <AdminIcon name="chevron-left" size={13} />
            </button>
            {[1, 2, 3, 4].map((page) => (
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
              onClick={() => setCurrentPage(18)}
              className="w-7 h-7 rounded-lg border border-[#E6D6DA] bg-white text-[12px] font-semibold text-[#4A3439] hover:bg-[#FDF5F7] cursor-pointer"
            >
              18
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(18, p + 1))}
              className="w-7 h-7 rounded-lg border border-[#E6D6DA] bg-white flex items-center justify-center text-[#6E565C] hover:bg-[#FDF5F7] cursor-pointer"
            >
              <AdminIcon name="chevron-right" size={13} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#6E565C]">Show</span>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="px-3 py-1.5 rounded-lg border border-[#E6D6DA] bg-white text-[12px] text-[#4A3439] focus:outline-none cursor-pointer"
            >
              <option value={8}>8 per page</option>
              <option value={16}>16 per page</option>
              <option value={32}>32 per page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add Variation Group Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#EFE0E4] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F3E6EA] pb-3 mb-4">
              <h3 className="text-[16px] font-bold text-[#8E1838]">
                Add Variation Group
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-lg bg-[#FDF5F7] text-[#8E1838] flex items-center justify-center cursor-pointer"
              >
                <AdminIcon name="x" size={14} />
              </button>
            </div>
            <div className="space-y-3.5 text-[12.5px] text-[#4A3439]">
              <div>
                <label className="block font-semibold mb-1">Select Product</label>
                <select className="w-full px-3 py-2 rounded-xl border border-[#E8D8DC] bg-white">
                  <option>Golden Zari Lace Trim</option>
                  <option>Multicolour Pom Pom Trim</option>
                  <option>Pearl Beaded Fringe</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Variation Type</label>
                <select className="w-full px-3 py-2 rounded-xl border border-[#E8D8DC] bg-white">
                  <option>Color</option>
                  <option>Size / Width</option>
                  <option>Material</option>
                  <option>Design</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Options (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Gold, Silver, Rose Gold"
                  className="w-full px-3 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC]"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl border border-[#E6D6DA] text-[12px] font-semibold text-[#4A3439] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  triggerToast('Variation group added.');
                }}
                className="px-4 py-2 rounded-xl bg-[#8E1838] text-white text-[12px] font-semibold cursor-pointer"
              >
                Save Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

