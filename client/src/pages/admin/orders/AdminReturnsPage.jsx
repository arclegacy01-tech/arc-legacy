import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_RETURN_ORDERS = [
  {
    id: '#1032',
    rowNum: 1,
    customer: 'Pooja Shah',
    phone: '+91 98765 43210',
    email: 'pooja.shah@gmail.com',
    items: ['/images/product-1.jpg', '/images/product-4.jpg'],
    amount: 1240,
    type: 'Return',
    reason: 'Size Issue',
    status: 'Requested',
    requestedDate: '18 Oct 2026',
    requestedTime: '10:24 AM',
    notes: 'Customer requested exchange/return due to border width mismatch.',
  },
  {
    id: '#1029',
    rowNum: 2,
    customer: 'Neha Patel',
    phone: '+91 98765 43211',
    email: 'neha.patel@gmail.com',
    items: ['/images/product-5.jpg', '/images/product-8.jpg'],
    amount: 2580,
    type: 'Refund',
    reason: 'Product Not as Described',
    status: 'Approved',
    requestedDate: '17 Oct 2026',
    requestedTime: '04:18 PM',
    notes: 'Approved for instant bank refund.',
  },
  {
    id: '#1026',
    rowNum: 3,
    customer: 'Riya Mehta',
    phone: '+91 98765 43212',
    email: 'riya.mehta@gmail.com',
    items: ['/images/product-3.jpg', '/images/product-10.jpg'],
    amount: 980,
    type: 'Return',
    reason: 'Damaged Item',
    status: 'Received',
    requestedDate: '16 Oct 2026',
    requestedTime: '02:45 PM',
    notes: 'Return parcel received at Surat QC hub.',
  },
  {
    id: '#1021',
    rowNum: 4,
    customer: 'Aarti Desai',
    phone: '+91 98765 43213',
    email: 'aarti.desai@gmail.com',
    items: ['/images/product-12.jpg', '/images/product-7.jpg'],
    amount: 1860,
    type: 'Refund',
    reason: 'Wrong Item Delivered',
    status: 'Refunded',
    requestedDate: '15 Oct 2026',
    requestedTime: '06:42 PM',
    notes: 'Refund processed via original UPI payment method.',
  },
  {
    id: '#1018',
    rowNum: 5,
    customer: 'Kunal Jain',
    phone: '+91 98765 43214',
    email: 'kunal.jain@gmail.com',
    items: ['/images/product-2.jpg', '/images/product-8.jpg'],
    amount: 650,
    type: 'Return',
    reason: 'Color Not as Expected',
    status: 'In Transit',
    requestedDate: '14 Oct 2026',
    requestedTime: '04:12 PM',
    notes: 'Reverse pickup completed by Delhivery.',
  },
  {
    id: '#1016',
    rowNum: 6,
    customer: 'Sneha Patel',
    phone: '+91 98765 43215',
    email: 'sneha.patel@gmail.com',
    items: ['/images/product-6.jpg', '/images/product-5.jpg'],
    amount: 3120,
    type: 'Refund',
    reason: 'Quality Issue',
    status: 'Approved',
    requestedDate: '13 Oct 2026',
    requestedTime: '03:54 PM',
    notes: 'Approved by QA team for full refund.',
  },
  {
    id: '#1014',
    rowNum: 7,
    customer: 'Mehul Trivedi',
    phone: '+91 98765 43216',
    email: 'mehul.trivedi@gmail.com',
    items: ['/images/product-1.jpg', '/images/product-9.jpg'],
    amount: 1199,
    type: 'Return',
    reason: 'Changed Mind',
    status: 'Received',
    requestedDate: '12 Oct 2026',
    requestedTime: '12:28 PM',
    notes: 'Unopened roll received back in stock.',
  },
  {
    id: '#1011',
    rowNum: 8,
    customer: 'Pooja Kulkarni',
    phone: '+91 98765 43217',
    email: 'pooja.kulkarni@gmail.com',
    items: ['/images/product-3.jpg', '/images/product-10.jpg'],
    amount: 2450,
    type: 'Refund',
    reason: 'Duplicate Order',
    status: 'Refunded',
    requestedDate: '11 Oct 2026',
    requestedTime: '11:16 AM',
    notes: 'Duplicate order amount refunded to customer card.',
  },
  {
    id: '#1009',
    rowNum: 9,
    customer: 'Rohan Sharma',
    phone: '+91 98765 43218',
    email: 'rohan.sharma@gmail.com',
    items: ['/images/product-1.jpg', '/images/product-4.jpg'],
    amount: 899,
    type: 'Return',
    reason: 'Defective Product',
    status: 'Processing',
    requestedDate: '10 Oct 2026',
    requestedTime: '05:48 PM',
    notes: 'Under inspection at warehouse.',
  },
  {
    id: '#1007',
    rowNum: 10,
    customer: 'Vidhi Dave',
    phone: '+91 98765 43219',
    email: 'vidhi.dave@gmail.com',
    items: ['/images/product-5.jpg', '/images/product-12.jpg'],
    amount: 1760,
    type: 'Refund',
    reason: 'Product Not as Expected',
    status: 'Rejected',
    requestedDate: '09 Oct 2026',
    requestedTime: '01:22 PM',
    notes: 'Custom cut trim is non-returnable per store policy.',
  },
];

const RECENT_RETURN_REQUESTS = [
  { id: '#1032', customer: 'Pooja Shah', reason: 'Size Issue', reasonClass: 'bg-[#FFF5E2] text-[#D98218]', amount: '₹1,240', time: '18 Oct 2026, 10:24 AM', img: '/images/product-1.jpg' },
  { id: '#1029', customer: 'Neha Patel', reason: 'Not as Described', reasonClass: 'bg-[#EFE6FA] text-[#8048C5]', amount: '₹2,580', time: '17 Oct 2026, 04:18 PM', img: '/images/product-5.jpg' },
  { id: '#1026', customer: 'Riya Mehta', reason: 'Damaged Item', reasonClass: 'bg-[#EFE6FA] text-[#8048C5]', amount: '₹980', time: '16 Oct 2026, 02:45 PM', img: '/images/product-12.jpg' },
  { id: '#1021', customer: 'Aarti Desai', reason: 'Wrong Item', reasonClass: 'bg-[#FDEBF1] text-[#C92A52]', amount: '₹1,860', time: '15 Oct 2026, 06:42 PM', img: '/images/product-3.jpg' },
];

const STATUS_BADGE = {
  Requested: 'bg-[#FFF5E2] text-[#D98218]',
  Approved: 'bg-[#E2F6EB] text-[#1D8852]',
  Received: 'bg-[#EFE6FA] text-[#8048C5]',
  Refunded: 'bg-[#E2F6EB] text-[#1D8852]',
  'In Transit': 'bg-[#E3F1FC] text-[#286EC8]',
  Processing: 'bg-[#E3F1FC] text-[#286EC8]',
  Rejected: 'bg-[#FDE8EC] text-[#C92A52]',
};

export default function AdminReturnsPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [requests, setRequests] = useState(INITIAL_RETURN_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Return Types');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [dateFilter, setDateFilter] = useState('Select Date Range');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [viewingRequest, setViewingRequest] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchesSearch =
        !effectiveSearch ||
        r.id.toLowerCase().includes(effectiveSearch) ||
        r.customer.toLowerCase().includes(effectiveSearch) ||
        r.reason.toLowerCase().includes(effectiveSearch) ||
        r.type.toLowerCase().includes(effectiveSearch);
      const matchesType =
        typeFilter === 'All Return Types' || r.type === typeFilter;
      const matchesStatus =
        statusFilter === 'All Statuses' || r.status === statusFilter;
      const matchesDate =
        dateFilter === 'Select Date Range' || r.requestedDate === dateFilter;
      return matchesSearch && matchesType && matchesStatus && matchesDate;
    });
  }, [requests, effectiveSearch, typeFilter, statusFilter, dateFilter]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredRequests.length && filteredRequests.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRequests.map((r) => r.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleUpdateStatus = (id, nextStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: nextStatus } : r))
    );
    triggerToast(`Request ${id} updated to ${nextStatus}.`);
  };

  const handleExportCsv = () => {
    const headers = ['Order ID', 'Customer', 'Phone', 'Amount', 'Type', 'Reason', 'Status', 'Requested On'];
    const rows = filteredRequests.map((r) => [
      r.id,
      `"${r.customer}"`,
      `"${r.phone}"`,
      r.amount,
      r.type,
      `"${r.reason}"`,
      r.status,
      `"${r.requestedDate} ${r.requestedTime}"`,
    ]);
    const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arc-legacy-return-refunds.csv';
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Return & refund requests exported to CSV.');
  };

  // SVG Donut Calculations (24 Total Requests: Size Issue 6 (25%), Quality Issue 5 (21%), Changed Mind 4 (17%), Wrong Item 4 (17%), Other 5 (20%))
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const segments = [
    { label: 'Size Issue', count: 6, pct: 25, color: '#F097B1' },
    { label: 'Quality Issue', count: 5, pct: 21, color: '#B49CF2' },
    { label: 'Changed Mind', count: 4, pct: 17, color: '#9CC8F6' },
    { label: 'Wrong Item', count: 4, pct: 17, color: '#F6BA6F' },
    { label: 'Other', count: 5, pct: 20, color: '#9BD5B7' },
  ];
  let cumulativePct = 0;

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C1E21] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-[13px] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#249A62]" />
          {toastMsg}
        </div>
      )}

      {/* Breadcrumb & Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#8C7076] mb-1.5">
            <AdminIcon name="chevron-right" size={12} className="text-[#B89CA3]" />
            <Link to="/admin/orders" className="hover:text-[#A91D48] transition-colors">
              Orders
            </Link>
            <AdminIcon name="chevron-right" size={12} className="text-[#B89CA3]" />
            <span className="text-[#4A3439] font-medium">Return &amp; Refunds</span>
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
                Return &amp; Refunds
              </h1>
              <p className="text-[12.5px] text-[#7A6268] mt-0.5">
                Manage customer return requests, process refunds and track return status.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E6D3D8] text-[#8E1838] text-[12.5px] font-semibold hover:bg-[#FDF5F7] transition-colors shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <AdminIcon name="download" size={15} className="text-[#A91D48]" />
          Export Return &amp; Refunds
        </button>
      </div>

      {/* Main Layout: Left 3/4 Content + Right 1/4 Widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Main Area */}
        <div className="xl:col-span-9 space-y-5">
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Return Requests */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#FDEBF1] flex items-center justify-center text-[#B82050] shrink-0">
                <AdminIcon name="box" size={22} />
              </div>
              <div>
                <p className="text-[11.5px] font-medium text-[#7A6268]">Return Requests</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#2C1E21] leading-none">24</span>
                  <span className="text-[11px] font-semibold text-[#1D8852] flex items-center gap-0.5">
                    <AdminIcon name="arrow-up" size={10} />
                    33%
                  </span>
                </div>
                <p className="text-[10.5px] text-[#9A8187] mt-1">vs last week</p>
              </div>
            </div>

            {/* Refund Amount */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#FFF4E4] flex items-center justify-center text-[#D98218] shrink-0">
                <AdminIcon name="rupee" size={22} />
              </div>
              <div>
                <p className="text-[11.5px] font-medium text-[#7A6268]">Refund Amount</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[22px] font-bold text-[#2C1E21] leading-none">₹18,420</span>
                </div>
                <p className="text-[10.5px] text-[#9A8187] mt-1">total refunded</p>
              </div>
            </div>

            {/* Avg. Refund Value */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#F9EBFA] flex items-center justify-center text-[#A033B8] shrink-0">
                <AdminIcon name="box" size={21} />
              </div>
              <div>
                <p className="text-[11.5px] font-medium text-[#7A6268]">Avg. Refund Value</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[22px] font-bold text-[#2C1E21] leading-none">₹767</span>
                </div>
                <p className="text-[10.5px] text-[#9A8187] mt-1">per order</p>
              </div>
            </div>

            {/* Avg. Resolution Time */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#E6F7EE] flex items-center justify-center text-[#1D8852] shrink-0">
                <AdminIcon name="clock" size={21} />
              </div>
              <div>
                <p className="text-[11.5px] font-medium text-[#7A6268]">Avg. Resolution Time</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[22px] font-bold text-[#2C1E21] leading-none">2.4 days</span>
                </div>
                <p className="text-[10.5px] text-[#9A8187] mt-1">to close request</p>
              </div>
            </div>
          </div>

          {/* Filter & Table Card */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] shadow-[0_2px_12px_rgba(142,24,56,0.03)] overflow-hidden">
            {/* Search & Filters Row */}
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
                  placeholder="Search by order ID, customer name, product, return reason..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12.5px] text-[#2C1E21] placeholder-[#9A8187] focus:outline-none focus:border-[#A91D48]"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
              >
                <option value="All Return Types">All Return Types</option>
                <option value="Return">Return</option>
                <option value="Refund">Refund</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
              >
                <option value="All Statuses">All Statuses</option>
                <option value="Requested">Requested</option>
                <option value="Approved">Approved</option>
                <option value="Received">Received</option>
                <option value="In Transit">In Transit</option>
                <option value="Processing">Processing</option>
                <option value="Refunded">Refunded</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
              >
                <option value="Select Date Range">Select Date Range</option>
                <option value="18 Oct 2026">18 Oct 2026</option>
                <option value="17 Oct 2026">17 Oct 2026</option>
                <option value="16 Oct 2026">16 Oct 2026</option>
                <option value="15 Oct 2026">15 Oct 2026</option>
                <option value="14 Oct 2026">14 Oct 2026</option>
              </select>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setTypeFilter('All Return Types');
                  setStatusFilter('All Statuses');
                  setDateFilter('Select Date Range');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDF5F7] text-[#A91D48] text-[12.5px] font-semibold hover:bg-[#FCE8EE] transition-colors cursor-pointer"
              >
                <AdminIcon name="filter" size={14} className="text-[#A91D48]" />
                Filters
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
                          filteredRequests.length > 0 &&
                          selectedIds.length === filteredRequests.length
                        }
                        onChange={toggleSelectAll}
                        className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-2 w-8">#</th>
                    <th className="py-3 px-2.5">Order ID</th>
                    <th className="py-3 px-2.5">Customer</th>
                    <th className="py-3 px-2.5">Items</th>
                    <th className="py-3 px-2.5">Amount</th>
                    <th className="py-3 px-2.5">Type</th>
                    <th className="py-3 px-2.5">Reason</th>
                    <th className="py-3 px-2.5">Status</th>
                    <th className="py-3 px-2.5">Requested On</th>
                    <th className="py-3 pl-2.5 pr-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EAEc] text-[12px]">
                  {filteredRequests.map((req) => (
                    <tr
                      key={req.id}
                      className="hover:bg-[#FDF9FA] transition-colors group"
                    >
                      <td className="py-3 pl-4 pr-2">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(req.id)}
                          onChange={() => toggleSelectOne(req.id)}
                          className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-3 px-2 text-[#7A6268] font-medium">
                        {req.rowNum}
                      </td>
                      <td className="py-3 px-2.5 font-bold text-[#2C1E21]">
                        {req.id}
                      </td>
                      <td className="py-3 px-2.5">
                        <p className="font-bold text-[#2C1E21] leading-tight">
                          {req.customer}
                        </p>
                        <p className="text-[11px] text-[#8C7076] mt-0.5">
                          {req.phone}
                        </p>
                      </td>
                      <td className="py-3 px-2.5">
                        <div className="flex items-center gap-1">
                          {req.items.map((src, idx) => (
                            <img
                              key={idx}
                              src={src}
                              alt="Product"
                              className="w-7 h-7 rounded-md object-cover border border-[#EAE0E2]"
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-2.5 font-semibold text-[#2C1E21]">
                        ₹{req.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-2.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                            req.type === 'Return'
                              ? 'bg-[#FDEBF1] text-[#C92A52]'
                              : 'bg-[#E3F1FC] text-[#286EC8]'
                          }`}
                        >
                          {req.type}
                        </span>
                      </td>
                      <td className="py-3 px-2.5 text-[#4A3439] text-[11.5px] max-w-[140px]">
                        {req.reason}
                      </td>
                      <td className="py-3 px-2.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                            STATUS_BADGE[req.status] || 'bg-[#FFF5E2] text-[#D98218]'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3 px-2.5 text-[#5E474D] leading-tight">
                        <p>{req.requestedDate}</p>
                        <p className="text-[10.5px] text-[#8C7076]">{req.requestedTime}</p>
                      </td>
                      <td className="py-3 pl-2.5 pr-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setViewingRequest(req)}
                            title="View Return Details"
                            className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#A91D48] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="eye" size={13.5} />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(req.id, 'Approved')}
                            title="Approve / Process Return"
                            className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#A91D48] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="truck" size={13.5} />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(req.id, 'Refunded')}
                            title="Mark as Refunded"
                            className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#7A6268] hover:bg-[#FCE8EE] hover:text-[#A91D48] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="more-vertical" size={13.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredRequests.length === 0 && (
                    <tr>
                      <td colSpan={11} className="py-10 text-center text-[#8C7076]">
                        No return or refund requests match your current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-4 py-3.5 border-t border-[#F3E6EA] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#6E565C]">
              <span>
                Showing 1 – {filteredRequests.length} of 24 return &amp; refund requests
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-7 h-7 rounded-lg border border-[#E6D6DA] bg-white flex items-center justify-center text-[#6E565C] hover:bg-[#FDF5F7] cursor-pointer"
                >
                  <AdminIcon name="chevron-left" size={13} />
                </button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer ${
                      currentPage === page
                        ? 'bg-[#A91D48] text-white shadow-xs'
                        : 'border border-[#E6D6DA] bg-white text-[#4A3439] hover:bg-[#FDF5F7]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
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
          {/* Return Reasons Donut */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="sparkle" size={14} />
              </span>
              <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                Return Reasons
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-[132px] h-[132px] shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke="#F7EEF0"
                    strokeWidth="18"
                  />
                  {segments.map((seg, i) => {
                    const dash = (seg.pct / 100) * circumference;
                    const offset = (cumulativePct / 100) * circumference;
                    cumulativePct += seg.pct;
                    return (
                      <circle
                        key={i}
                        cx="70"
                        cy="70"
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
                  <span className="text-[22px] font-bold text-[#2C1E21] leading-none">
                    24
                  </span>
                  <span className="text-[10px] text-[#7A6268] mt-1 leading-tight">
                    Total
                    <br />
                    Requests
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1 text-[11px]">
                {segments.map((s) => (
                  <div key={s.label} className="flex items-start gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                    <div className="leading-tight">
                      <p className="font-semibold text-[#2C1E21]">{s.label}</p>
                      <p className="text-[#7A6268] text-[10.5px]">
                        {s.count} ({s.pct}%)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Return & Refund Status Breakdown Bars */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="shield-check" size={14} />
              </span>
              <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                Return &amp; Refund Status
              </h3>
            </div>

            <div className="space-y-2.5 text-[11.5px]">
              {[
                { label: 'Requested', count: '6 (25%)', pct: 68, color: '#F2B866', badge: 'bg-[#E2F6EB] text-[#1D8852]' },
                { label: 'Approved', count: '5 (21%)', pct: 56, color: '#7AC79E', badge: 'bg-[#E2F6EB] text-[#1D8852]' },
                { label: 'Received', count: '4 (17%)', pct: 46, color: '#B49CF2', badge: 'bg-[#E3F1FC] text-[#286EC8]' },
                { label: 'In Transit', count: '4 (17%)', pct: 46, color: '#9CC8F6', badge: 'bg-[#EFE6FA] text-[#8048C5]' },
                { label: 'Processing', count: '3 (12%)', pct: 34, color: '#F097B1', badge: 'bg-[#F5EFF1] text-[#6E565C]' },
                { label: 'Refunded', count: '4 (17%)', pct: 46, color: '#7AC79E', badge: 'bg-[#E2F6EB] text-[#1D8852]' },
                { label: 'Rejected', count: '2 (8%)', pct: 24, color: '#E97C96', badge: 'bg-[#FDEBF1] text-[#C92A52]' },
              ].map((item) => (
                <div
                  key={item.label}
                  onClick={() => setStatusFilter(item.label)}
                  className="flex items-center justify-between gap-2 cursor-pointer hover:bg-[#FDF7F8] p-1 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2 w-24 shrink-0">
                    <span className={`w-4 h-4 rounded flex items-center justify-center ${item.badge}`}>
                      <AdminIcon name="check" size={10} />
                    </span>
                    <span className="font-medium text-[#2C1E21]">{item.label}</span>
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-[#F6ECEF] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-[#5E474D] w-14 text-right shrink-0">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Return Requests */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                  <AdminIcon name="orders" size={14} />
                </span>
                <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                  Recent Return Requests
                </h3>
              </div>
              <button
                onClick={() => setStatusFilter('All Statuses')}
                className="text-[11px] font-semibold text-[#A91D48] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {RECENT_RETURN_REQUESTS.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 text-[11.5px]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.img}
                      alt={item.customer}
                      className="w-9 h-9 rounded-lg object-cover border border-[#EADcdf] shrink-0"
                    />
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#2C1E21] leading-tight">
                          {item.id}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9.5px] font-semibold ${item.reasonClass}`}
                        >
                          {item.reason}
                        </span>
                      </div>
                      <p className="text-[#7A6268] text-[10.5px] truncate mt-0.5">
                        {item.customer}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-[#2C1E21]">{item.amount}</p>
                    <p className="text-[9.5px] text-[#9A8187]">{item.time}</p>
                  </div>
                </div>
              ))}
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
              Have questions about returns or refunds? Contact our support team for assistance.
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

      {/* View Return Request Modal */}
      {viewingRequest && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#EFE0E4] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F3E6EA] pb-3 mb-4">
              <div>
                <h3 className="text-[16px] font-bold text-[#8E1838]">
                  {viewingRequest.type} Request {viewingRequest.id}
                </h3>
                <p className="text-[12px] text-[#7A6268]">
                  {viewingRequest.customer} • {viewingRequest.phone}
                </p>
              </div>
              <button
                onClick={() => setViewingRequest(null)}
                className="w-8 h-8 rounded-lg bg-[#FDF5F7] text-[#8E1838] flex items-center justify-center cursor-pointer"
              >
                <AdminIcon name="x" size={16} />
              </button>
            </div>
            <div className="space-y-3 text-[12.5px] text-[#4A3439]">
              <div className="grid grid-cols-2 gap-2 bg-[#FDF8F9] p-3 rounded-xl border border-[#F1E2E6]">
                <div>
                  <span className="text-[11px] text-[#8C7076] block">Request Type</span>
                  <span className="font-bold text-[#8E1838]">{viewingRequest.type}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#8C7076] block">Refund Amount</span>
                  <span className="font-bold text-[#2C1E21]">₹{viewingRequest.amount.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#8C7076] block">Reason</span>
                  <span className="font-semibold">{viewingRequest.reason}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#8C7076] block">Current Status</span>
                  <span className="font-semibold">{viewingRequest.status}</span>
                </div>
              </div>
              <p>
                <span className="font-semibold">Resolution Notes:</span> {viewingRequest.notes}
              </p>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setViewingRequest(null)}
                className="px-4 py-2 rounded-xl border border-[#E6D6DA] text-[12.5px] font-semibold text-[#4A3439] cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleUpdateStatus(viewingRequest.id, 'Approved');
                  setViewingRequest(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#A91D48] text-white text-[12.5px] font-semibold cursor-pointer"
              >
                Approve Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

