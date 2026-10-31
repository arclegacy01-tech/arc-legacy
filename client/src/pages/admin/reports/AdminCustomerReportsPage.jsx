import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_CUSTOMERS = [
  {
    id: 1,
    name: 'Shree Traders',
    email: 'shree@gmail.com',
    phone: '9876543210',
    type: 'Wholesale',
    orders: 24,
    totalSpent: '1,20,500',
    lastOrder: '30 Oct 2026',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Kavya Creations',
    email: 'kavya@gmail.com',
    phone: '9876543211',
    type: 'Wholesale',
    orders: 18,
    totalSpent: '98,400',
    lastOrder: '28 Oct 2026',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Meera Textiles',
    email: 'meera@gmail.com',
    phone: '9876543212',
    type: 'Retail',
    orders: 16,
    totalSpent: '84,200',
    lastOrder: '26 Oct 2026',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Riya Lace House',
    email: 'riya@gmail.com',
    phone: '9876543213',
    type: 'Retail',
    orders: 14,
    totalSpent: '72,600',
    lastOrder: '24 Oct 2026',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Pooja Fashion Hub',
    email: 'pooja@gmail.com',
    phone: '9876543214',
    type: 'Wholesale',
    orders: 12,
    totalSpent: '68,900',
    lastOrder: '22 Oct 2026',
    status: 'Active',
  },
];

const NEW_CUSTOMERS_LIST = [
  { name: 'Anaya Enterprises', location: 'Mumbai', type: 'Wholesale' },
  { name: 'Riddhi Lace Store', location: 'Surat', type: 'Retail' },
  { name: 'Shivam Traders', location: 'Ahmedabad', type: 'Wholesale' },
  { name: 'Elegant Crafts', location: 'Jaipur', type: 'Retail' },
  { name: 'Krisha Boutique', location: 'Delhi', type: 'Retail' },
];

const RECENT_CUSTOMER_ACTIONS = [
  { text: 'Shree Traders placed a new order', time: '2 minutes ago' },
  { text: 'Kavya Creations registered a new account', time: '15 minutes ago' },
  { text: 'Meera Textiles completed payment', time: '1 hour ago' },
  { text: 'Riya Lace House updated profile', time: '3 hours ago' },
  { text: 'Pooja Fashion Hub placed a new order', time: '5 hours ago' },
];

export default function AdminCustomerReportsPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [customerTypeFilter, setCustomerTypeFilter] = useState('All Customer Types');
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

  const filteredCustomers = useMemo(() => {
    return INITIAL_CUSTOMERS.filter((c) => {
      const matchesSearch =
        !effectiveSearch ||
        c.name.toLowerCase().includes(effectiveSearch) ||
        c.email.toLowerCase().includes(effectiveSearch) ||
        c.phone.includes(effectiveSearch);

      const matchesType =
        customerTypeFilter === 'All Customer Types' || c.type === customerTypeFilter;

      const matchesStatus =
        statusFilter === 'All Statuses' || c.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [effectiveSearch, customerTypeFilter, statusFilter]);

  const handleExportCsv = () => {
    const headers = ['Customer Name', 'Email', 'Phone', 'Type', 'Total Orders', 'Total Spent', 'Last Order', 'Status'];
    const rows = filteredCustomers.map((c) => [
      `"${c.name}"`,
      `"${c.email}"`,
      c.phone,
      c.type,
      c.orders,
      `"${c.totalSpent}"`,
      `"${c.lastOrder}"`,
      c.status,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arc-legacy-customer-report.csv';
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Customer report exported to CSV.');
  };

  // Donut SVG Calculations for Customers by Type (Total: 524)
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const donutSegments = [
    { label: 'Wholesale', count: 180, pct: 34, color: '#E8638C' },
    { label: 'Retail', count: 156, pct: 30, color: '#68C39B' },
    { label: 'B2B Partners', count: 72, pct: 14, color: '#9777E5' },
    { label: 'Resellers', count: 58, pct: 11, color: '#F7A75C' },
    { label: 'Trial Customers', count: 38, pct: 7, color: '#56BBE5' },
    { label: 'Others', count: 20, pct: 4, color: '#A59196' },
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
            <span className="text-[#4A3439] font-medium">Customer Reports</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDF2F5] border border-[#F3DCE2] flex items-center justify-center text-[#A91D48] shrink-0">
              <AdminIcon name="customers" size={22} />
            </div>
            <div>
              <h1
                className="text-[24px] font-bold text-[#8E1838] leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Customer Reports
              </h1>
              <p className="text-[12.5px] text-[#7A6268] mt-0.5">
                Track and analyze your customers' behavior, growth, and value to make better business decisions.
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
        {/* Total Customers */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#FDEBF1] flex items-center justify-center text-[#B82050] shrink-0">
            <AdminIcon name="customers" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#7A6268]">Total Customers</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[22px] font-bold text-[#2C1E21] leading-none">524</span>
              <span className="text-[10.5px] font-semibold text-[#1D8852] flex items-center">
                <AdminIcon name="arrow-up" size={10} />
                18%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">vs last month</p>
          </div>
        </div>

        {/* New Customers */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#E6F7EE] flex items-center justify-center text-[#1D8852] shrink-0">
            <AdminIcon name="user-plus" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#7A6268]">New Customers</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[22px] font-bold text-[#2C1E21] leading-none">64</span>
              <span className="text-[10.5px] font-semibold text-[#1D8852] flex items-center">
                <AdminIcon name="arrow-up" size={10} />
                33%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">vs last month</p>
          </div>
        </div>

        {/* Active Customers */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#FDEBF1] flex items-center justify-center text-[#B82050] shrink-0">
            <AdminIcon name="crown" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#7A6268]">Active Customers</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[22px] font-bold text-[#2C1E21] leading-none">412</span>
              <span className="text-[10.5px] font-semibold text-[#1D8852] flex items-center">
                <AdminIcon name="arrow-up" size={10} />
                21%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">placed orders</p>
          </div>
        </div>

        {/* Repeat Customers */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#FCE8EE] flex items-center justify-center text-[#C92A52] shrink-0">
            <AdminIcon name="heart" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#7A6268]">Repeat Customers</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[22px] font-bold text-[#2C1E21] leading-none">186</span>
              <span className="text-[10.5px] font-semibold text-[#1D8852] flex items-center">
                <AdminIcon name="arrow-up" size={10} />
                27%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">more than 1 order</p>
          </div>
        </div>

        {/* Avg. Customer Value */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#F3ECF9] flex items-center justify-center text-[#8048C5] shrink-0">
            <AdminIcon name="rupee" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#7A6268]">Avg. Customer Value</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[20px] font-bold text-[#2C1E21] leading-none">₹3,540</span>
              <span className="text-[10.5px] font-semibold text-[#1D8852] flex items-center">
                <AdminIcon name="arrow-up" size={10} />
                12%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">per customer</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[12px] font-semibold">
        {[
          'Overview',
          'New Customers',
          'Repeat Customers',
          'Customer Segments',
          'Top Customers',
          'Geographic Insights',
          'Customer Trends',
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

      {/* Main Grid: Left 8.5 cols + Right 3.5 cols Filters Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Column */}
        <div className="xl:col-span-9 space-y-5">
          {/* Middle Row Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Customer Growth Chart */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[13.5px] font-bold text-[#8E1838] flex items-center gap-1.5">
                    <AdminIcon name="bar-chart" size={15} />
                    Customer Growth
                  </h3>
                  <p className="text-[11px] text-[#7A6268]">New vs. Repeat customers over time</p>
                </div>
                <select className="px-2.5 py-1 text-[11px] font-semibold rounded-lg border border-[#E8D8DC] bg-white text-[#4A3439] focus:outline-none">
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>This Quarter</option>
                </select>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-[11px] text-[#4A3439]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8638C]" />
                  New Customers
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#68C39B]" />
                  Repeat Customers
                </span>
              </div>

              {/* Custom SVG Bar Chart */}
              <div className="h-44 w-full flex items-end gap-2 pt-4 px-2 border-b border-[#F0E4E7]">
                {[
                  { date: '1 Oct', newH: 30, repH: 45 },
                  { date: '5 Oct', newH: 42, repH: 55 },
                  { date: '10 Oct', newH: 58, repH: 48 },
                  { date: '15 Oct', newH: 65, repH: 72 },
                  { date: '20 Oct', newH: 70, repH: 80 },
                  { date: '25 Oct', newH: 75, repH: 88 },
                  { date: '31 Oct', newH: 85, repH: 95 },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      <div
                        className="w-3 rounded-t bg-[#E8638C] transition-all group-hover:opacity-85"
                        style={{ height: `${bar.newH}%` }}
                        title={`New: ${bar.newH}`}
                      />
                      <div
                        className="w-3 rounded-t bg-[#68C39B] transition-all group-hover:opacity-85"
                        style={{ height: `${bar.repH}%` }}
                        title={`Repeat: ${bar.repH}`}
                      />
                    </div>
                    <span className="text-[10px] text-[#8C7076] mt-1">{bar.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customers by Type Donut */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                  <AdminIcon name="sparkle" size={14} />
                </span>
                <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                  Customers by Type
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
                    <span className="text-[20px] font-bold text-[#2C1E21] leading-none">524</span>
                    <span className="text-[9.5px] text-[#7A6268] mt-0.5">Total Customers</span>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] flex-1">
                  {donutSegments.map((s) => (
                    <div key={s.label} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                        <span className="text-[#4A3439]">{s.label}</span>
                      </span>
                      <span className="font-bold text-[#2C1E21]">{s.count} ({s.pct}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Third Row: 3 Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Top Customers by Revenue */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-[12.5px] font-bold text-[#8E1838] flex items-center gap-1.5">
                  <AdminIcon name="crown" size={13} />
                  Top Customers by Revenue
                </h4>
                <button
                  onClick={() => triggerToast('Viewing all high revenue customers.')}
                  className="text-[11px] font-semibold text-[#A91D48] hover:underline cursor-pointer"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-2 text-[11px]">
                {INITIAL_CUSTOMERS.map((c, idx) => (
                  <div key={c.id} className="flex items-center justify-between gap-1.5 py-0.5 border-b border-[#FAF2F4]">
                    <span className="text-[#7A6268] w-3">{idx + 1}</span>
                    <div className="truncate flex-1">
                      <p className="font-bold text-[#2C1E21] leading-tight truncate">{c.name}</p>
                      <span className="text-[10px] text-[#8C7076]">{c.orders} orders</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FDF2F5] text-[#8E1838]">
                      {c.type}
                    </span>
                    <span className="font-bold text-[#2C1E21]">₹{c.totalSpent}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* New Customers This Month */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-[12.5px] font-bold text-[#8E1838] flex items-center gap-1.5">
                  <AdminIcon name="user-plus" size={13} />
                  New Customers This Month
                </h4>
                <button
                  onClick={() => triggerToast('Viewing all newly onboarded customers.')}
                  className="text-[11px] font-semibold text-[#A91D48] hover:underline cursor-pointer"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-2 text-[11px]">
                {NEW_CUSTOMERS_LIST.map((c, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-1.5 py-0.5 border-b border-[#FAF2F4]">
                    <span className="text-[#7A6268] w-3">{idx + 1}</span>
                    <div className="truncate flex-1">
                      <p className="font-bold text-[#2C1E21] leading-tight truncate">{c.name}</p>
                      <span className="text-[10px] text-[#8C7076]">{c.location}</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FDF2F5] text-[#8E1838]">
                      {c.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Segments */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-[12.5px] font-bold text-[#8E1838] flex items-center gap-1.5">
                  <AdminIcon name="layers" size={13} />
                  Customer Segments
                </h4>
                <button
                  onClick={() => triggerToast('Managing segmentation rules.')}
                  className="text-[11px] font-semibold text-[#A91D48] hover:underline cursor-pointer"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-2.5 text-[11px]">
                {[
                  { name: 'High Value (₹50K+)', count: 72, pct: 14, color: '#E8638C' },
                  { name: 'Mid Value (₹10K - ₹50K)', count: 168, pct: 32, color: '#68C39B' },
                  { name: 'Low Value (<₹10K)', count: 214, pct: 41, color: '#F7A75C' },
                  { name: 'Inactive (No orders 60+ d)', count: 70, pct: 13, color: '#9777E5' },
                ].map((seg) => (
                  <div key={seg.name} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-[#4A3439]">{seg.name}</span>
                      <span className="font-bold text-[#2C1E21]">{seg.count} ({seg.pct}%)</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#F5EAEc] overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${seg.pct * 2}%`, backgroundColor: seg.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fourth Row: Customer Details Table */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] shadow-[0_2px_12px_rgba(142,24,56,0.03)] overflow-hidden">
            <div className="p-3.5 border-b border-[#F3E6EA] flex flex-wrap items-center justify-between gap-2.5">
              <h4 className="text-[13px] font-bold text-[#8E1838]">Customer Details</h4>
              <div className="flex items-center gap-2 flex-1 max-w-md justify-end">
                <div className="relative flex-1">
                  <AdminIcon name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8187]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search customers by name, email, or phone..."
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
                        checked={selectedIds.length === filteredCustomers.length && filteredCustomers.length > 0}
                        onChange={() => {
                          if (selectedIds.length === filteredCustomers.length) setSelectedIds([]);
                          else setSelectedIds(filteredCustomers.map((c) => c.id));
                        }}
                        className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="py-2.5 px-2">#</th>
                    <th className="py-2.5 px-2.5">Customer Name</th>
                    <th className="py-2.5 px-2.5">Email</th>
                    <th className="py-2.5 px-2.5">Phone</th>
                    <th className="py-2.5 px-2.5">Type</th>
                    <th className="py-2.5 px-2.5 text-center">Total Orders</th>
                    <th className="py-2.5 px-2.5">Total Spent (₹)</th>
                    <th className="py-2.5 px-2.5">Last Order</th>
                    <th className="py-2.5 px-2.5">Status</th>
                    <th className="py-2.5 pl-2.5 pr-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EAEc]">
                  {filteredCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-[#FDF9FA] transition-colors">
                      <td className="py-2.5 pl-4 pr-2">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(c.id)}
                          onChange={() => {
                            setSelectedIds(
                              selectedIds.includes(c.id)
                                ? selectedIds.filter((i) => i !== c.id)
                                : [...selectedIds, c.id]
                            );
                          }}
                          className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-[#7A6268]">{c.id}</td>
                      <td className="py-2.5 px-2.5 font-bold text-[#2C1E21]">{c.name}</td>
                      <td className="py-2.5 px-2.5 text-[#5E474D]">{c.email}</td>
                      <td className="py-2.5 px-2.5 text-[#5E474D]">{c.phone}</td>
                      <td className="py-2.5 px-2.5">
                        <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-[#FDF2F5] text-[#8E1838]">
                          {c.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-2.5 text-center font-bold text-[#2C1E21]">{c.orders}</td>
                      <td className="py-2.5 px-2.5 font-bold text-[#2C1E21]">{c.totalSpent}</td>
                      <td className="py-2.5 px-2.5 text-[#5E474D]">{c.lastOrder}</td>
                      <td className="py-2.5 px-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E2F6EB] text-[#1D8852]">
                          {c.status}
                        </span>
                      </td>
                      <td className="py-2.5 pl-2.5 pr-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => triggerToast(`Viewing analytics for ${c.name}`)}
                            title="View"
                            className="w-6 h-6 rounded border border-[#EDE0E3] bg-[#FDF9FA] text-[#A91D48] flex items-center justify-center hover:bg-[#FCE8EE] cursor-pointer"
                          >
                            <AdminIcon name="eye" size={11.5} />
                          </button>
                          <button
                            onClick={() => triggerToast(`Editing ${c.name}`)}
                            title="Edit"
                            className="w-6 h-6 rounded border border-[#EDE0E3] bg-[#FDF9FA] text-[#A91D48] flex items-center justify-center hover:bg-[#FCE8EE] cursor-pointer"
                          >
                            <AdminIcon name="edit" size={11.5} />
                          </button>
                          <button
                            onClick={() => triggerToast(`Options for ${c.name}`)}
                            title="More"
                            className="w-6 h-6 rounded border border-[#EDE0E3] bg-[#FDF9FA] text-[#7A6268] flex items-center justify-center hover:bg-[#FCE8EE] cursor-pointer"
                          >
                            <AdminIcon name="more" size={11.5} />
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
              <span>Showing 1 – {filteredCustomers.length} of 524 customers</span>
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
                  onClick={() => setCurrentPage(105)}
                  className="w-6 h-6 rounded border border-[#E6D6DA] bg-white text-[11px] font-bold cursor-pointer"
                >
                  105
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(105, p + 1))}
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

        {/* Right Sidebar: Filters + Quick Actions + Recent Actions */}
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
                <option>This Quarter</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4A3439] mb-1">Customer Type</label>
              <select
                value={customerTypeFilter}
                onChange={(e) => setCustomerTypeFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#E8D8DC] bg-white text-[#4A3439]"
              >
                <option value="All Customer Types">All Customer Types</option>
                <option value="Wholesale">Wholesale</option>
                <option value="Retail">Retail</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4A3439] mb-1">Customer Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#E8D8DC] bg-white text-[#4A3439]"
              >
                <option value="All Statuses">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4A3439] mb-1">Location</label>
              <select className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#E8D8DC] bg-white text-[#4A3439]">
                <option>All Locations</option>
                <option>Mumbai</option>
                <option>Surat</option>
                <option>Ahmedabad</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4A3439] mb-1">Spending Range</label>
              <select className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#E8D8DC] bg-white text-[#4A3439]">
                <option>All Ranges</option>
                <option>&gt; ₹50,000</option>
                <option>₹10,000 - ₹50,000</option>
                <option>&lt; ₹10,000</option>
              </select>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => triggerToast('Filters applied.')}
                className="flex-1 py-1.5 rounded-lg bg-[#8E1838] text-white text-[11px] font-bold cursor-pointer"
              >
                Apply Filters
              </button>
              <button
                onClick={() => {
                  setCustomerTypeFilter('All Customer Types');
                  setStatusFilter('All Statuses');
                  triggerToast('Filters reset.');
                }}
                className="px-3 py-1.5 rounded-lg border border-[#E6D6DA] text-[11px] font-semibold text-[#4A3439] cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-2.5">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="sparkle" size={13} />
              </span>
              <h3 className="text-[13.5px] font-bold text-[#8E1838]">Quick Actions</h3>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-[10.5px] font-bold">
              <Link
                to="/admin/customers"
                className="p-2.5 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] text-[#4A3439] flex flex-col items-center"
              >
                <AdminIcon name="user-plus" size={14} className="text-[#A91D48] mb-1" />
                Add New Customer
              </Link>

              <button
                onClick={() => triggerToast('Import customer file.')}
                className="p-2.5 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] text-[#4A3439] flex flex-col items-center cursor-pointer"
              >
                <AdminIcon name="draft" size={14} className="text-[#A91D48] mb-1" />
                Import Customers
              </button>

              <button
                onClick={handleExportCsv}
                className="p-2.5 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] text-[#4A3439] flex flex-col items-center cursor-pointer"
              >
                <AdminIcon name="download" size={14} className="text-[#A91D48] mb-1" />
                Export Customer Report
              </button>

              <button
                onClick={() => triggerToast('Customer segment rules manager.')}
                className="p-2.5 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] text-[#4A3439] flex flex-col items-center cursor-pointer"
              >
                <AdminIcon name="grid" size={14} className="text-[#A91D48] mb-1" />
                Manage Segments
              </button>
            </div>
          </div>

          {/* Recent Actions */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                  <AdminIcon name="clock" size={13} />
                </span>
                <h3 className="text-[13.5px] font-bold text-[#8E1838]">Recent Actions</h3>
              </div>
              <button
                onClick={() => triggerToast('Full audit log.')}
                className="text-[10.5px] font-semibold text-[#A91D48] hover:underline cursor-pointer"
              >
                View All →
              </button>
            </div>

            <div className="space-y-2 text-[11px]">
              {RECENT_CUSTOMER_ACTIONS.map((a, i) => (
                <div key={i} className="flex items-start gap-2 border-b border-[#FAF2F4] pb-1.5 last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A91D48] mt-1.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#2C1E21] leading-tight">{a.text}</p>
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

