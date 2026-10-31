import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_INVENTORY_REPORT_ITEMS = [
  {
    id: 1,
    name: 'Cotton Lace Trim (5m)',
    sku: 'AL2761',
    category: 'Lace Trims',
    currentStock: 520,
    lowStockAlert: 50,
    stockValue: '52,000',
    status: 'In Stock',
    lastUpdated: '31 Oct 2026',
    image: '/images/product-1.jpg',
  },
  {
    id: 2,
    name: 'Embroidered Lace (3m)',
    sku: 'AL2760',
    category: 'Embroidered Laces',
    currentStock: 420,
    lowStockAlert: 40,
    stockValue: '42,000',
    status: 'In Stock',
    lastUpdated: '31 Oct 2026',
    image: '/images/product-4.jpg',
  },
  {
    id: 3,
    name: 'Zari Lace (5m)',
    sku: 'AL2759',
    category: 'Zari Laces',
    currentStock: 380,
    lowStockAlert: 30,
    stockValue: '38,000',
    status: 'In Stock',
    lastUpdated: '30 Oct 2026',
    image: '/images/product-2.jpg',
  },
  {
    id: 4,
    name: 'Crochet Lace (4m)',
    sku: 'AL2758',
    category: 'Crochet Laces',
    currentStock: 310,
    lowStockAlert: 30,
    stockValue: '31,000',
    status: 'In Stock',
    lastUpdated: '29 Oct 2026',
    image: '/images/product-3.jpg',
  },
  {
    id: 5,
    name: 'Pearl Lace (5m)',
    sku: 'AL2757',
    category: 'Designer Laces',
    currentStock: 8,
    lowStockAlert: 20,
    stockValue: '800',
    status: 'Low Stock',
    lastUpdated: '28 Oct 2026',
    image: '/images/product-5.jpg',
  },
];

const TOP_STOCKED = [
  { name: 'Cotton Lace Trim (5m)', stock: 520, pct: 90, img: '/images/product-1.jpg' },
  { name: 'Embroidered Lace (3m)', stock: 420, pct: 75, img: '/images/product-4.jpg' },
  { name: 'Zari Lace (5m)', stock: 380, pct: 68, img: '/images/product-2.jpg' },
  { name: 'Crochet Lace (4m)', stock: 310, pct: 55, img: '/images/product-3.jpg' },
  { name: 'Designer Lace Trim (5m)', stock: 280, pct: 50, img: '/images/product-6.jpg' },
];

const LOW_STOCKED = [
  { name: 'Pearl Lace (5m)', stock: 8, pct: 20, img: '/images/product-5.jpg' },
  { name: 'Floral Lace (3m)', stock: 12, pct: 30, img: '/images/product-8.jpg' },
  { name: 'Satin Lace (4m)', stock: 15, pct: 38, img: '/images/product-7.jpg' },
  { name: 'Net Lace (5m)', stock: 18, pct: 45, img: '/images/product-9.jpg' },
  { name: 'Velvet Lace (3m)', stock: 20, pct: 50, img: '/images/product-10.jpg' },
];

const OUT_OF_STOCK = [
  { name: 'Golden Lace (5m)', img: '/images/product-1.jpg' },
  { name: 'Sequin Lace (3m)', img: '/images/product-4.jpg' },
  { name: 'Organza Lace (4m)', img: '/images/product-2.jpg' },
  { name: 'Mirror Lace (5m)', img: '/images/product-6.jpg' },
  { name: 'Stone Lace (3m)', img: '/images/product-10.jpg' },
];

const RECENT_INVENTORY_ACTIVITY = [
  { title: 'Stock received', desc: 'Cotton Lace Trim (5m) +520 units', time: '2 hours ago' },
  { title: 'Stock updated', desc: 'Embroidered Lace (3m) 420 → 480', time: '5 hours ago' },
  { title: 'Low stock alert', desc: 'Pearl Lace (5m) - 8 units left', time: '1 day ago' },
  { title: 'Out of stock', desc: 'Golden Lace (5m) - 0 units', time: '2 days ago' },
];

export default function AdminInventoryReportsPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredItems = useMemo(() => {
    return INITIAL_INVENTORY_REPORT_ITEMS.filter((i) => {
      const matchesSearch =
        !effectiveSearch ||
        i.name.toLowerCase().includes(effectiveSearch) ||
        i.sku.toLowerCase().includes(effectiveSearch) ||
        i.category.toLowerCase().includes(effectiveSearch);

      const matchesCat =
        categoryFilter === 'All Categories' || i.category === categoryFilter;

      const matchesStatus =
        statusFilter === 'All Statuses' || i.status === statusFilter;

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [effectiveSearch, categoryFilter, statusFilter]);

  const handleExportCsv = () => {
    const headers = ['Product', 'SKU', 'Category', 'Current Stock', 'Low Stock Alert', 'Stock Value', 'Status', 'Last Updated'];
    const rows = filteredItems.map((i) => [
      `"${i.name}"`,
      i.sku,
      `"${i.category}"`,
      i.currentStock,
      i.lowStockAlert,
      `"${i.stockValue}"`,
      i.status,
      `"${i.lastUpdated}"`,
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

  // Donut SVG Calculations for Stock Status (Total: 1,842)
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const donutSegments = [
    { label: 'In Stock', count: '1,620 (88%)', pct: 88, color: '#68C39B' },
    { label: 'Low Stock', count: '142 (8%)', pct: 8, color: '#F7A75C' },
    { label: 'Out of Stock', count: '80 (4%)', pct: 4, color: '#E8638C' },
  ];
  let cumulativePct = 0;

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
            <Link to="/admin/reports/sales" className="hover:text-[#A91D48] transition-colors">
              Reports
            </Link>
            <AdminIcon name="chevron-right" size={12} className="text-[#B89CA3]" />
            <span className="text-[#4A3439] font-medium">Inventory Reports</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDF2F5] border border-[#F3DCE2] flex items-center justify-center text-[#A91D48] shrink-0">
              <AdminIcon name="box" size={22} />
            </div>
            <div>
              <h1
                className="text-[24px] font-bold text-[#8E1838] leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Inventory Reports
              </h1>
              <p className="text-[12.5px] text-[#7A6268] mt-0.5">
                Track your stock levels, inventory movement, and product availability.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#E6D3D8] text-[12px] text-[#4A3439] shadow-xs">
            <AdminIcon name="calendar" size={14} className="text-[#8E1838]" />
            <span className="font-semibold">01 Oct 2026 - 31 Oct 2026</span>
          </div>
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8E1838] text-white text-[12.5px] font-semibold hover:bg-[#77132E] transition-colors shadow-xs cursor-pointer"
          >
            <AdminIcon name="download" size={15} />
            Export Report
          </button>
        </div>
      </div>

      {/* 5 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Total Products */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#FDEBF1] flex items-center justify-center text-[#B82050] shrink-0">
            <AdminIcon name="box" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#7A6268]">Total Products</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[22px] font-bold text-[#2C1E21] leading-none">1,842</span>
              <span className="text-[10.5px] font-semibold text-[#1D8852] flex items-center">
                <AdminIcon name="arrow-up" size={10} />
                5%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">vs last month</p>
          </div>
        </div>

        {/* In Stock Products */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#E6F7EE] flex items-center justify-center text-[#1D8852] shrink-0">
            <AdminIcon name="layers" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#7A6268]">In Stock Products</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[22px] font-bold text-[#2C1E21] leading-none">1,620</span>
              <span className="text-[10.5px] font-semibold text-[#1D8852] flex items-center">
                <AdminIcon name="arrow-up" size={10} />
                8%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">88% of total</p>
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#FFF4E4] flex items-center justify-center text-[#D98218] shrink-0">
            <AdminIcon name="warning" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#7A6268]">Low Stock Products</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[22px] font-bold text-[#2C1E21] leading-none">142</span>
              <span className="text-[10.5px] font-semibold text-[#D98218] flex items-center">
                <AdminIcon name="arrow-up" size={10} />
                12%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">need attention</p>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#FDE8EC] flex items-center justify-center text-[#C92A52] shrink-0">
            <AdminIcon name="eye-off" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#7A6268]">Out of Stock</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[22px] font-bold text-[#2C1E21] leading-none">80</span>
              <span className="text-[10.5px] font-semibold text-[#C92A52] flex items-center">
                <AdminIcon name="arrow-up" size={10} />
                20%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">4% of total</p>
          </div>
        </div>

        {/* Total Stock Value */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#F3ECF9] flex items-center justify-center text-[#8048C5] shrink-0">
            <AdminIcon name="rupee" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#7A6268]">Total Stock Value</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[19px] font-bold text-[#2C1E21] leading-none">₹18,42,600</span>
              <span className="text-[10.5px] font-semibold text-[#1D8852] flex items-center">
                <AdminIcon name="arrow-up" size={10} />
                14%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">at cost price</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[12px] font-semibold">
        {[
          'Overview',
          'Stock Levels',
          'Low Stock',
          'Out of Stock',
          'Stock Movement',
          'Stock Value',
          'Category-wise Inventory',
          'Warehouse Inventory',
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl transition-colors cursor-pointer shrink-0 ${
              activeTab === tab
                ? 'bg-[#8E1838] text-white shadow-xs'
                : 'bg-white text-[#4A3439] hover:bg-[#FDF5F7] border border-[#EBE0E3]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Grid: Left 9 cols + Right 3 cols */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Column */}
        <div className="xl:col-span-9 space-y-5">
          {/* Middle Row Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Inventory Trend */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[13.5px] font-bold text-[#8E1838] flex items-center gap-1.5">
                    <AdminIcon name="bar-chart" size={15} />
                    Inventory Trend
                  </h3>
                  <p className="text-[11px] text-[#7A6268]">Total stock quantity over time</p>
                </div>
                <select className="px-2.5 py-1 text-[11px] font-semibold rounded-lg border border-[#E8D8DC] bg-white text-[#4A3439] focus:outline-none">
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                </select>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-[11px] text-[#4A3439]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8638C]" />
                  Stock In
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#68C39B]" />
                  Stock Out
                </span>
              </div>

              {/* Trend Chart (Line + Bars) */}
              <div className="h-44 w-full flex items-end gap-2 pt-4 px-2 border-b border-[#F0E4E7]">
                {[
                  { date: '1 Oct', inH: 30, outH: 40 },
                  { date: '5 Oct', inH: 45, outH: 52 },
                  { date: '10 Oct', inH: 55, outH: 60 },
                  { date: '15 Oct', inH: 65, outH: 70 },
                  { date: '20 Oct', inH: 72, outH: 80 },
                  { date: '25 Oct', inH: 80, outH: 85 },
                  { date: '31 Oct', inH: 92, outH: 95 },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      <div className="w-2.5 rounded-t bg-[#E8638C]" style={{ height: `${bar.inH}%` }} />
                      <div className="w-2.5 rounded-t bg-[#68C39B]" style={{ height: `${bar.outH}%` }} />
                    </div>
                    <span className="text-[10px] text-[#8C7076] mt-1">{bar.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Status Donut */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                  <AdminIcon name="sparkle" size={14} />
                </span>
                <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                  Stock Status
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-[125px] h-[125px] shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 130 130">
                    <circle cx="65" cy="65" r={radius} fill="none" stroke="#F5ECF0" strokeWidth="18" />
                    {donutSegments.map((seg, i) => {
                      const dash = (seg.pct / 100) * circumference;
                      const offset = (cumulativePct / 100) * circumference;
                      cumulativePct += seg.pct;
                      return (
                        <circle
                          key={i}
                          cx="65"
                          cy="65"
                          r={radius}
                          fill="none"
                          stroke={seg.color}
                          strokeWidth="18"
                          strokeDasharray={`${dash} ${circumference - dash}`}
                          strokeDashoffset={-offset}
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[20px] font-bold text-[#2C1E21] leading-none">1,842</span>
                    <span className="text-[9.5px] text-[#7A6268] mt-0.5">Total Products</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px] flex-1">
                  {donutSegments.map((s) => (
                    <div key={s.label} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                        <span className="text-[#4A3439]">{s.label}</span>
                      </span>
                      <span className="font-bold text-[#2C1E21]">{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Third Row: 3 Inventory Summaries */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Top Stocked Products */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-2.5">
              <h4 className="text-[12.5px] font-bold text-[#8E1838] flex items-center gap-1.5">
                <AdminIcon name="box" size={13} />
                Top Stocked Products
              </h4>
              <p className="text-[10px] text-[#8C7076]">Products with highest stock quantity</p>

              <div className="space-y-2.5 text-[11px]">
                {TOP_STOCKED.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2">
                    <img src={p.img} alt={p.name} className="w-6 h-6 rounded object-cover shrink-0" />
                    <span className="truncate flex-1 font-medium text-[#2C1E21]">{p.name}</span>
                    <div className="w-14 h-2 rounded-full bg-[#EBF5EE] overflow-hidden">
                      <div className="h-full rounded-full bg-[#68C39B]" style={{ width: `${p.pct}%` }} />
                    </div>
                    <span className="font-bold text-[#2C1E21] w-7 text-right">{p.stock}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Stock Products */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-2.5">
              <h4 className="text-[12.5px] font-bold text-[#8E1838] flex items-center gap-1.5">
                <AdminIcon name="warning" size={13} />
                Low Stock Products
              </h4>
              <p className="text-[10px] text-[#8C7076]">Products that need restocking</p>

              <div className="space-y-2.5 text-[11px]">
                {LOW_STOCKED.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2">
                    <img src={p.img} alt={p.name} className="w-6 h-6 rounded object-cover shrink-0" />
                    <span className="truncate flex-1 font-medium text-[#2C1E21]">{p.name}</span>
                    <div className="w-14 h-2 rounded-full bg-[#FDF2E8] overflow-hidden">
                      <div className="h-full rounded-full bg-[#F7A75C]" style={{ width: `${p.pct}%` }} />
                    </div>
                    <span className="font-bold text-[#C92A52] w-7 text-right">{p.stock}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Out of Stock Products */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-2.5">
              <h4 className="text-[12.5px] font-bold text-[#8E1838] flex items-center gap-1.5">
                <AdminIcon name="eye-off" size={13} />
                Out of Stock Products
              </h4>
              <p className="text-[10px] text-[#8C7076]">Products that are currently out of stock</p>

              <div className="space-y-2.5 text-[11px]">
                {OUT_OF_STOCK.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2">
                    <img src={p.img} alt={p.name} className="w-6 h-6 rounded object-cover shrink-0" />
                    <span className="truncate flex-1 font-medium text-[#2C1E21]">{p.name}</span>
                    <span className="font-bold text-[#C92A52] w-7 text-right">0</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fourth Row: Inventory Details Table */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] shadow-[0_2px_12px_rgba(142,24,56,0.03)] overflow-hidden">
            <div className="p-3.5 border-b border-[#F3E6EA] flex flex-wrap items-center justify-between gap-2.5">
              <h4 className="text-[13.5px] font-bold text-[#8E1838]">Inventory Details</h4>
              <div className="flex items-center gap-2 flex-1 max-w-md justify-end">
                <div className="relative flex-1">
                  <AdminIcon name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8187]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products by name, SKU, or category..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[11.5px] text-[#2C1E21] focus:outline-none"
                  />
                </div>
                <select className="px-3 py-1.5 rounded-xl border border-[#E8D8DC] bg-white text-[11.5px] text-[#4A3439] focus:outline-none">
                  <option>Columns</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11.5px]">
                <thead>
                  <tr className="bg-[#FDF7F8] border-b border-[#F1E2E6] font-bold text-[#4A3439]">
                    <th className="py-2.5 pl-4 pr-2 w-8">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === filteredItems.length && filteredItems.length > 0}
                        onChange={() => {
                          if (selectedIds.length === filteredItems.length) setSelectedIds([]);
                          else setSelectedIds(filteredItems.map((i) => i.id));
                        }}
                        className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="py-2.5 px-2">#</th>
                    <th className="py-2.5 px-2.5">Product</th>
                    <th className="py-2.5 px-2.5">SKU</th>
                    <th className="py-2.5 px-2.5">Category</th>
                    <th className="py-2.5 px-2.5 text-center">Current Stock</th>
                    <th className="py-2.5 px-2.5 text-center">Low Stock Alert</th>
                    <th className="py-2.5 px-2.5">Stock Value (₹)</th>
                    <th className="py-2.5 px-2.5">Status</th>
                    <th className="py-2.5 px-2.5">Last Updated</th>
                    <th className="py-2.5 pl-2.5 pr-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EAEc]">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FDF9FA] transition-colors">
                      <td className="py-2.5 pl-4 pr-2">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => {
                            setSelectedIds(
                              selectedIds.includes(item.id)
                                ? selectedIds.filter((i) => i !== item.id)
                                : [...selectedIds, item.id]
                            );
                          }}
                          className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-[#7A6268]">{item.id}</td>
                      <td className="py-2.5 px-2.5 font-bold text-[#2C1E21] flex items-center gap-2">
                        <img src={item.image} alt={item.name} className="w-7 h-7 rounded object-cover" />
                        {item.name}
                      </td>
                      <td className="py-2.5 px-2.5 text-[#5E474D] font-mono">{item.sku}</td>
                      <td className="py-2.5 px-2.5 text-[#5E474D]">{item.category}</td>
                      <td className="py-2.5 px-2.5 text-center font-bold text-[#2C1E21]">{item.currentStock}</td>
                      <td className="py-2.5 px-2.5 text-center text-[#7A6268]">{item.lowStockAlert}</td>
                      <td className="py-2.5 px-2.5 font-bold text-[#2C1E21]">{item.stockValue}</td>
                      <td className="py-2.5 px-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            item.status === 'In Stock'
                              ? 'bg-[#E2F6EB] text-[#1D8852]'
                              : 'bg-[#FFF5E2] text-[#D98218]'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-2.5 text-[#5E474D]">{item.lastUpdated}</td>
                      <td className="py-2.5 pl-2.5 pr-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => triggerToast(`Edit stock for ${item.name}`)}
                            title="Edit Stock"
                            className="w-6 h-6 rounded border border-[#EDE0E3] bg-[#FDF9FA] text-[#A91D48] flex items-center justify-center hover:bg-[#FCE8EE] cursor-pointer"
                          >
                            <AdminIcon name="edit" size={11.5} />
                          </button>
                          <button
                            onClick={() => triggerToast(`Trend chart for ${item.name}`)}
                            title="Trend"
                            className="w-6 h-6 rounded border border-[#EDE0E3] bg-[#FDF9FA] text-[#8E1838] flex items-center justify-center hover:bg-[#FCE8EE] cursor-pointer"
                          >
                            <AdminIcon name="bar-chart" size={11.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-4 py-3 border-t border-[#F3E6EA] flex items-center justify-between text-[11.5px] text-[#6E565C]">
              <span>Showing 1 – {filteredItems.length} of 1,842 products</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-6 h-6 rounded border border-[#E6D6DA] bg-white flex items-center justify-center cursor-pointer"
                >
                  <AdminIcon name="chevron-left" size={11} />
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-6 h-6 rounded text-[11px] font-bold cursor-pointer ${
                      currentPage === page ? 'bg-[#8E1838] text-white' : 'border border-[#E6D6DA] bg-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span>...</span>
                <button
                  onClick={() => setCurrentPage(369)}
                  className="w-6 h-6 rounded border border-[#E6D6DA] bg-white text-[11px] font-bold cursor-pointer"
                >
                  369
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(369, p + 1))}
                  className="w-6 h-6 rounded border border-[#E6D6DA] bg-white flex items-center justify-center cursor-pointer"
                >
                  <AdminIcon name="chevron-right" size={11} />
                </button>
              </div>
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="px-2 py-1 rounded border border-[#E6D6DA] bg-white text-[11px]"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Filters + Quick Actions + Recent Inventory Activity */}
        <div className="xl:col-span-3 space-y-4">
          {/* Filters Card */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="filter" size={13} />
              </span>
              <h3 className="text-[13.5px] font-bold text-[#8E1838]">Filters</h3>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4A3439] mb-1">Date Range</label>
              <select className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#E8D8DC] bg-white text-[#4A3439]">
                <option>01 Oct 2026 - 31 Oct 2026</option>
                <option>Last 30 Days</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4A3439] mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#E8D8DC] bg-white text-[#4A3439]"
              >
                <option value="All Categories">All Categories</option>
                <option value="Lace Trims">Lace Trims</option>
                <option value="Embroidered Laces">Embroidered Laces</option>
                <option value="Zari Laces">Zari Laces</option>
                <option value="Designer Laces">Designer Laces</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4A3439] mb-1">Brand</label>
              <select className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#E8D8DC] bg-white text-[#4A3439]">
                <option>All Brands</option>
                <option>ARC LEGACY</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4A3439] mb-1">Supplier</label>
              <select className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#E8D8DC] bg-white text-[#4A3439]">
                <option>All Suppliers</option>
                <option>Surat Mills Hub</option>
                <option>Ahmedabad Textiles</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4A3439] mb-1">Warehouse</label>
              <select className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#E8D8DC] bg-white text-[#4A3439]">
                <option>All Warehouses</option>
                <option>Main Surat Warehouse</option>
                <option>Ahmedabad DC</option>
              </select>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => triggerToast('Inventory filters applied.')}
                className="flex-1 py-1.5 rounded-lg bg-[#8E1838] text-white text-[11px] font-bold cursor-pointer"
              >
                Apply Filters
              </button>
              <button
                onClick={() => {
                  setCategoryFilter('All Categories');
                  setStatusFilter('All Statuses');
                  triggerToast('Inventory filters reset.');
                }}
                className="px-3 py-1.5 rounded-lg border border-[#E6D6DA] text-[11px] font-semibold text-[#4A3439] cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-2.5">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="sparkle" size={13} />
              </span>
              <h3 className="text-[13.5px] font-bold text-[#8E1838]">Quick Actions</h3>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-[10.5px] font-bold">
              <Link
                to="/admin/products/inventory"
                className="p-2.5 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] text-[#4A3439] flex flex-col items-center"
              >
                <AdminIcon name="box" size={14} className="text-[#A91D48] mb-1" />
                Update Stock
              </Link>

              <button
                onClick={() => triggerToast('Import stock sheet.')}
                className="p-2.5 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] text-[#4A3439] flex flex-col items-center cursor-pointer"
              >
                <AdminIcon name="draft" size={14} className="text-[#A91D48] mb-1" />
                Import Inventory
              </button>

              <button
                onClick={handleExportCsv}
                className="p-2.5 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] text-[#4A3439] flex flex-col items-center cursor-pointer"
              >
                <AdminIcon name="download" size={14} className="text-[#A91D48] mb-1" />
                Export Inventory
              </button>

              <button
                onClick={() => triggerToast('Manage supplier relations.')}
                className="p-2.5 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] text-[#4A3439] flex flex-col items-center cursor-pointer"
              >
                <AdminIcon name="truck" size={14} className="text-[#A91D48] mb-1" />
                Manage Suppliers
              </button>
            </div>
          </div>

          {/* Recent Inventory Activity */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                  <AdminIcon name="clock" size={13} />
                </span>
                <h3 className="text-[13.5px] font-bold text-[#8E1838]">Recent Activity</h3>
              </div>
              <button
                onClick={() => triggerToast('Viewing complete stock audit log.')}
                className="text-[10.5px] font-semibold text-[#A91D48] hover:underline cursor-pointer"
              >
                View All →
              </button>
            </div>

            <div className="space-y-2 text-[11px]">
              {RECENT_INVENTORY_ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-start gap-2 border-b border-[#FAF2F4] pb-1.5 last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D8852] mt-1.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#2C1E21] leading-tight">{a.title}</p>
                    <p className="text-[10px] text-[#5E474D] mt-0.5">{a.desc}</p>
                    <span className="text-[9.5px] text-[#8C7076]">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

