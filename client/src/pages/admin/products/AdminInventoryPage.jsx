import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_INVENTORY = [
  {
    id: 1,
    name: 'Golden Zari Lace Trim',
    subtitle: 'Premium lace trim',
    sku: 'GT-1023',
    category: 'Laces',
    variants: 3,
    totalStock: 120,
    status: 'In Stock',
    lastUpdatedDate: '16 Oct 2026',
    lastUpdatedTime: '10:24 AM',
    image: '/images/product-1.jpg',
  },
  {
    id: 2,
    name: 'Red Bridal Latkan',
    subtitle: 'Designer bridal latkan',
    sku: 'LT-2045',
    category: 'Latkans',
    variants: 4,
    totalStock: 12,
    status: 'Low Stock',
    lastUpdatedDate: '15 Oct 2026',
    lastUpdatedTime: '04:18 PM',
    image: '/images/product-2.jpg',
  },
  {
    id: 3,
    name: 'Mirror Work Border',
    subtitle: 'Embellished border',
    sku: 'BR-1056',
    category: 'Trims & Borders',
    variants: 2,
    totalStock: 0,
    status: 'Out of Stock',
    lastUpdatedDate: '15 Oct 2026',
    lastUpdatedTime: '12:05 PM',
    image: '/images/product-4.jpg',
  },
  {
    id: 4,
    name: 'Multicolor Pom Pom Trim',
    subtitle: 'Colorful pom pom lace',
    sku: 'PM-3021',
    category: 'Pom Pom Trims',
    variants: 5,
    totalStock: 86,
    status: 'In Stock',
    lastUpdatedDate: '14 Oct 2026',
    lastUpdatedTime: '03:42 PM',
    image: '/images/product-3.jpg',
  },
  {
    id: 5,
    name: 'Pearl Hanging Latkan',
    subtitle: 'Elegant pearl latkan',
    sku: 'LT-3066',
    category: 'Latkans',
    variants: 3,
    totalStock: 25,
    status: 'In Stock',
    lastUpdatedDate: '14 Oct 2026',
    lastUpdatedTime: '11:20 AM',
    image: '/images/product-5.jpg',
  },
  {
    id: 6,
    name: 'Gota Patti Lace',
    subtitle: 'Traditional gota patti',
    sku: 'GP-4011',
    category: 'Gota Patti',
    variants: 4,
    totalStock: 8,
    status: 'Low Stock',
    lastUpdatedDate: '13 Oct 2026',
    lastUpdatedTime: '05:14 PM',
    image: '/images/product-8.jpg',
  },
  {
    id: 7,
    name: 'Bridal Pearl Latkan',
    subtitle: 'Heavy bridal latkan',
    sku: 'LT-5032',
    category: 'Latkans',
    variants: 6,
    totalStock: 0,
    status: 'Out of Stock',
    lastUpdatedDate: '12 Oct 2026',
    lastUpdatedTime: '02:37 PM',
    image: '/images/product-7.jpg',
  },
  {
    id: 8,
    name: 'Designer Dori Latkan',
    subtitle: 'Festive latkan',
    sku: 'LT-5520',
    category: 'Latkans',
    variants: 4,
    totalStock: 32,
    status: 'In Stock',
    lastUpdatedDate: '12 Oct 2026',
    lastUpdatedTime: '11:08 AM',
    image: '/images/product-9.jpg',
  },
  {
    id: 9,
    name: 'Antique Zari Border',
    subtitle: 'Traditional border',
    sku: 'BR-6011',
    category: 'Trims & Borders',
    variants: 2,
    totalStock: 5,
    status: 'Low Stock',
    lastUpdatedDate: '11 Oct 2026',
    lastUpdatedTime: '09:45 AM',
    image: '/images/product-6.jpg',
  },
  {
    id: 10,
    name: 'Crystal Bead Latkan',
    subtitle: 'Premium bead latkan',
    sku: 'LT-7015',
    category: 'Latkans',
    variants: 3,
    totalStock: 18,
    status: 'In Stock',
    lastUpdatedDate: '10 Oct 2026',
    lastUpdatedTime: '06:22 PM',
    image: '/images/product-10.jpg',
  },
];

const LOW_STOCK_PRODUCTS = [
  { name: 'Red Bridal Latkan', sku: 'LT-2045', left: '12 left', image: '/images/product-2.jpg' },
  { name: 'Gota Patti Lace', sku: 'GP-4011', left: '8 left', image: '/images/product-8.jpg' },
  { name: 'Antique Zari Border', sku: 'BR-6011', left: '5 left', image: '/images/product-6.jpg' },
  { name: 'Pearl Hanging Latkan', sku: 'LT-3066', left: '10 left', image: '/images/product-5.jpg' },
  { name: 'Designer Dori Latkan', sku: 'LT-5520', left: '7 left', image: '/images/product-9.jpg' },
];

const STOCK_MOVEMENTS = [
  { name: 'Golden Zari Lace Trim', diff: '+20', isPositive: true, time: '16 Oct 2026, 10:24 AM' },
  { name: 'Pearl Hanging Latkan', diff: '-5', isPositive: false, time: '15 Oct 2026, 04:12 PM' },
  { name: 'Multicolor Pom Pom Trim', diff: '+50', isPositive: true, time: '14 Oct 2026, 02:18 PM' },
  { name: 'Gota Patti Lace', diff: '-12', isPositive: false, time: '13 Oct 2026, 11:05 AM' },
  { name: 'Crystal Bead Latkan', diff: '+8', isPositive: true, time: '12 Oct 2026, 09:42 AM' },
];

const STATUS_BADGE = {
  'In Stock': 'bg-[#E2F6EB] text-[#1D8852]',
  'Low Stock': 'bg-[#FFF5E2] text-[#D98218]',
  'Out of Stock': 'bg-[#FDE8EC] text-[#C92A52]',
};

export default function AdminInventoryPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [items, setItems] = useState(INITIAL_INVENTORY);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [stockLevelFilter, setStockLevelFilter] = useState('All Stock Levels');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [editingItem, setEditingItem] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        !effectiveSearch ||
        item.name.toLowerCase().includes(effectiveSearch) ||
        item.sku.toLowerCase().includes(effectiveSearch) ||
        item.category.toLowerCase().includes(effectiveSearch);

      const matchesCat =
        categoryFilter === 'All Categories' || item.category === categoryFilter;

      const matchesStatus =
        statusFilter === 'All Status' || item.status === statusFilter;

      const matchesLevel =
        stockLevelFilter === 'All Stock Levels' ||
        (stockLevelFilter === 'High Stock' && item.totalStock > 50) ||
        (stockLevelFilter === 'Normal' && item.totalStock > 15 && item.totalStock <= 50) ||
        (stockLevelFilter === 'Low' && item.totalStock > 0 && item.totalStock <= 15) ||
        (stockLevelFilter === 'Zero' && item.totalStock === 0);

      return matchesSearch && matchesCat && matchesStatus && matchesLevel;
    });
  }, [items, effectiveSearch, categoryFilter, statusFilter, stockLevelFilter]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredItems.length && filteredItems.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map((i) => i.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleUpdateStock = (newQty) => {
    if (!editingItem) return;
    const qty = parseInt(newQty, 10);
    if (isNaN(qty) || qty < 0) return;
    let nextStatus = 'In Stock';
    if (qty === 0) nextStatus = 'Out of Stock';
    else if (qty <= 15) nextStatus = 'Low Stock';

    setItems((prev) =>
      prev.map((i) =>
        i.id === editingItem.id
          ? { ...i, totalStock: qty, status: nextStatus }
          : i
      )
    );
    triggerToast(`Updated stock for ${editingItem.name} to ${qty}.`);
    setEditingItem(null);
  };

  const handleExportCsv = () => {
    const headers = ['Product', 'SKU', 'Category', 'Variants', 'Total Stock', 'Status', 'Last Updated'];
    const rows = filteredItems.map((i) => [
      `"${i.name}"`,
      i.sku,
      `"${i.category}"`,
      i.variants,
      i.totalStock,
      i.status,
      `"${i.lastUpdatedDate} ${i.lastUpdatedTime}"`,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arc-legacy-inventory-report.csv';
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Inventory report exported to CSV.');
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

      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#8C7076] mb-1.5">
            <AdminIcon name="chevron-right" size={12} className="text-[#B89CA3]" />
            <Link to="/admin/products" className="hover:text-[#A91D48] transition-colors">
              Products
            </Link>
            <AdminIcon name="chevron-right" size={12} className="text-[#B89CA3]" />
            <span className="text-[#4A3439] font-medium">Inventory / Stock</span>
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
                Inventory / Stock
              </h1>
              <p className="text-[12.5px] text-[#7A6268] mt-0.5">
                Track and manage your product stock across all variations in one place.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => triggerToast('Stock alert threshold settings opened.')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E6D3D8] text-[#8E1838] text-[12.5px] font-semibold hover:bg-[#FDF5F7] transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <AdminIcon name="settings" size={15} className="text-[#A91D48]" />
          Manage Stock Settings
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
            <p className="text-[10px] text-[#8C7076] mt-0.5">vs last month</p>
          </div>
        </div>

        {/* Total Stock Quantity */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#E6F7EE] flex items-center justify-center text-[#1D8852] shrink-0">
            <AdminIcon name="grid" size={22} />
          </div>
          <div>
            <p className="text-[11.5px] font-medium text-[#7A6268]">Total Stock Quantity</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-[24px] font-bold text-[#2C1E21] leading-none">3,248</span>
              <span className="text-[11px] font-semibold text-[#1D8852] flex items-center gap-0.5">
                <AdminIcon name="arrow-up" size={10} />
                8%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">in all products</p>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#FFF4E4] flex items-center justify-center text-[#D98218] shrink-0">
            <AdminIcon name="warning" size={22} />
          </div>
          <div>
            <p className="text-[11.5px] font-medium text-[#7A6268]">Low Stock Items</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-[24px] font-bold text-[#2C1E21] leading-none">18</span>
              <span className="text-[11px] font-semibold text-[#D98218] flex items-center gap-0.5">
                <AdminIcon name="arrow-up" size={10} />
                50%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">needs attention</p>
          </div>
        </div>

        {/* Out of Stock Items */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#FDE8EC] flex items-center justify-center text-[#C92A52] shrink-0">
            <AdminIcon name="eye-off" size={22} />
          </div>
          <div>
            <p className="text-[11.5px] font-medium text-[#7A6268]">Out of Stock Items</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-[24px] font-bold text-[#2C1E21] leading-none">6</span>
              <span className="text-[11px] font-semibold text-[#C92A52] flex items-center gap-0.5">
                <AdminIcon name="arrow-up" size={10} />
                20%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">currently unavailable</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left 8 cols Table + Right 4 cols Side Widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Column: Inventory Table */}
        <div className="xl:col-span-8 space-y-5">
          <div className="bg-white rounded-2xl border border-[#EFE0E4] shadow-[0_2px_12px_rgba(142,24,56,0.03)] overflow-hidden">
            {/* Search & Filter Row */}
            <div className="p-3.5 border-b border-[#F3E6EA] flex flex-wrap items-center gap-2.5">
              <div className="relative flex-1 min-w-[230px]">
                <AdminIcon
                  name="search"
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A8187]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by product name, SKU or category..."
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
                <option value="Trims & Borders">Trims &amp; Borders</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
              >
                <option value="All Status">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>

              <select
                value={stockLevelFilter}
                onChange={(e) => setStockLevelFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
              >
                <option value="All Stock Levels">All Stock Levels</option>
                <option value="High Stock">High Stock (&gt; 50)</option>
                <option value="Normal">Normal (16 - 50)</option>
                <option value="Low">Low (&le; 15)</option>
                <option value="Zero">Zero (0)</option>
              </select>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('All Categories');
                  setStatusFilter('All Status');
                  setStockLevelFilter('All Stock Levels');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDF5F7] text-[#A91D48] text-[12.5px] font-semibold hover:bg-[#FCE8EE] transition-colors cursor-pointer"
              >
                <AdminIcon name="filter" size={14} className="text-[#A91D48]" />
                More Filters
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
                          filteredItems.length > 0 &&
                          selectedIds.length === filteredItems.length
                        }
                        onChange={toggleSelectAll}
                        className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-3">Product</th>
                    <th className="py-3 px-2.5">SKU</th>
                    <th className="py-3 px-2.5">Category</th>
                    <th className="py-3 px-2.5 text-center">Variants</th>
                    <th className="py-3 px-2.5">Total Stock</th>
                    <th className="py-3 px-2.5">Status</th>
                    <th className="py-3 px-2.5">Last Updated</th>
                    <th className="py-3 pl-2.5 pr-4 text-center">
                      <button
                        onClick={handleExportCsv}
                        className="text-[11px] font-semibold text-[#8E1838] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        Export Stock Report
                        <AdminIcon name="download" size={12} />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EAEc] text-[12px]">
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#FDF9FA] transition-colors group"
                    >
                      <td className="py-3 pl-4 pr-2">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => toggleSelectOne(item.id)}
                          className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-9 h-9 rounded-lg object-cover border border-[#EFE0E4] shrink-0"
                          />
                          <div>
                            <p className="font-bold text-[#2C1E21] leading-tight">
                              {item.name}
                            </p>
                            <p className="text-[10.5px] text-[#8C7076] mt-0.5">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2.5 font-mono text-[11.5px] text-[#5E474D]">
                        {item.sku}
                      </td>
                      <td className="py-3 px-2.5 text-[#4A3439]">
                        {item.category}
                      </td>
                      <td className="py-3 px-2.5 text-center font-semibold text-[#4A3439]">
                        {item.variants}
                      </td>
                      <td className="py-3 px-2.5 font-bold">
                        <span
                          className={
                            item.totalStock === 0
                              ? 'text-[#C92A52]'
                              : item.totalStock <= 15
                              ? 'text-[#D98218]'
                              : 'text-[#1D8852]'
                          }
                        >
                          {item.totalStock}
                        </span>
                      </td>
                      <td className="py-3 px-2.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10.5px] font-semibold ${
                            STATUS_BADGE[item.status]
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-2.5 text-[#5E474D] text-[11px] leading-tight">
                        <p>{item.lastUpdatedDate}</p>
                        <p className="text-[10px] text-[#8C7076]">{item.lastUpdatedTime}</p>
                      </td>
                      <td className="py-3 pl-2.5 pr-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setEditingItem(item)}
                            title="Edit Stock"
                            className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#A91D48] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="edit" size={13} />
                          </button>
                          <button
                            onClick={() => triggerToast(`Quick inventory options for ${item.sku}`)}
                            title="Options"
                            className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#7A6268] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="more" size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-10 text-center text-[#8C7076]">
                        No products match your current stock filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-4 py-3.5 border-t border-[#F3E6EA] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#6E565C]">
              <span>
                Showing 1 – {filteredItems.length} of 286 products
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

        {/* Right Column: 3 Widgets */}
        <div className="xl:col-span-4 space-y-4">
          {/* Widget 1: Low Stock Products */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                  <AdminIcon name="warning" size={14} />
                </span>
                <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                  Low Stock Products
                </h3>
              </div>
              <button
                onClick={() => setStatusFilter('Low Stock')}
                className="text-[11px] font-semibold text-[#A91D48] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {LOW_STOCK_PRODUCTS.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2.5 text-[11.5px]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-9 h-9 rounded-lg object-cover border border-[#EFE0E4] shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-bold text-[#2C1E21] leading-tight truncate">
                        {p.name}
                      </p>
                      <p className="text-[10.5px] text-[#8C7076] mt-0.5 font-mono">
                        SKU: {p.sku}
                      </p>
                    </div>
                  </div>
                  <span className="text-[#C92A52] font-bold text-[11px] shrink-0">
                    {p.left}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 2: Quick Stock Actions */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="sparkle" size={14} />
              </span>
              <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                Quick Stock Actions
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-center">
              <button
                onClick={() => triggerToast('Bulk stock update mode activated.')}
                className="p-3 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] transition-colors flex flex-col items-center cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full border border-[#DCA2B0] text-[#A91D48] flex items-center justify-center mb-1.5">
                  <AdminIcon name="layers" size={15} />
                </div>
                <p className="text-[11.5px] font-bold text-[#2C1E21] leading-tight">
                  Bulk Update Stock
                </p>
              </button>

              <button
                onClick={() => triggerToast('Select Excel spreadsheet with stock quantities.')}
                className="p-3 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] transition-colors flex flex-col items-center cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full border border-[#DCA2B0] text-[#A91D48] flex items-center justify-center mb-1.5">
                  <AdminIcon name="draft" size={15} />
                </div>
                <p className="text-[11.5px] font-bold text-[#2C1E21] leading-tight">
                  Import from Excel
                </p>
              </button>

              <button
                onClick={handleExportCsv}
                className="p-3 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] transition-colors flex flex-col items-center cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full border border-[#DCA2B0] text-[#A91D48] flex items-center justify-center mb-1.5">
                  <AdminIcon name="download" size={15} />
                </div>
                <p className="text-[11.5px] font-bold text-[#2C1E21] leading-tight">
                  Export Stock Report
                </p>
              </button>

              <button
                onClick={() => triggerToast('Low stock threshold alert modal opened.')}
                className="p-3 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] transition-colors flex flex-col items-center cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full border border-[#DCA2B0] text-[#A91D48] flex items-center justify-center mb-1.5">
                  <AdminIcon name="bell" size={15} />
                </div>
                <p className="text-[11.5px] font-bold text-[#2C1E21] leading-tight">
                  Set Low Stock Alert
                </p>
              </button>
            </div>
          </div>

          {/* Widget 3: Stock Movement (Recent) */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                  <AdminIcon name="sort" size={14} />
                </span>
                <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                  Stock Movement (Recent)
                </h3>
              </div>
              <button
                onClick={() => triggerToast('All stock movement history audit log.')}
                className="text-[11px] font-semibold text-[#A91D48] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {STOCK_MOVEMENTS.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2.5 text-[11.5px]">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-md font-bold text-[11px] flex items-center justify-center shrink-0 ${
                        m.isPositive
                          ? 'bg-[#E2F6EB] text-[#1D8852]'
                          : 'bg-[#FDE8EC] text-[#C92A52]'
                      }`}
                    >
                      {m.diff}
                    </span>
                    <div className="truncate">
                      <p className="font-bold text-[#2C1E21] leading-tight truncate">
                        {m.name}
                      </p>
                      <p className="text-[10px] text-[#8C7076] mt-0.5">{m.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Stock Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-[#EFE0E4] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F3E6EA] pb-3 mb-4">
              <h3 className="text-[15px] font-bold text-[#8E1838]">
                Update Stock Quantity
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="w-7 h-7 rounded-lg bg-[#FDF5F7] text-[#8E1838] flex items-center justify-center cursor-pointer"
              >
                <AdminIcon name="x" size={14} />
              </button>
            </div>

            <div className="space-y-3 text-[12.5px] text-[#4A3439]">
              <p className="font-bold text-[#2C1E21]">{editingItem.name}</p>
              <p className="text-[11px] text-[#8C7076]">SKU: {editingItem.sku} • {editingItem.category}</p>

              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1">
                  New Total Stock Units:
                </label>
                <input
                  id="modal-stock-input"
                  type="number"
                  defaultValue={editingItem.totalStock}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] font-bold text-[#2C1E21] focus:outline-none focus:border-[#A91D48]"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-xl border border-[#E6D6DA] text-[12px] font-semibold text-[#4A3439] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const input = document.getElementById('modal-stock-input');
                  handleUpdateStock(input.value);
                }}
                className="px-4 py-2 rounded-xl bg-[#8E1838] text-white text-[12px] font-semibold cursor-pointer"
              >
                Save Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

