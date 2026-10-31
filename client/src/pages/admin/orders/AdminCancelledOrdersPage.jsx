import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_CANCELLED = [
  {
    id: 1,
    orderId: '#1029',
    customer: 'Pooja Shah',
    phone: '+91 98765 43210',
    thumbs: ['/images/product-1.jpg', '/images/product-2.jpg', '/images/product-3.jpg'],
    extraCount: '+1',
    amount: '₹1,740',
    refundAmount: '₹1,740',
    reason: 'Changed Mind',
    reasonBg: '#FCE8EE',
    reasonColor: '#B8294B',
    cancelledDate: '14 Oct 2026',
    cancelledTime: '02:15 PM',
  },
  {
    id: 2,
    orderId: '#1026',
    customer: 'Neha Patel',
    phone: '+91 98765 43211',
    thumbs: ['/images/product-4.jpg', '/images/product-5.jpg', '/images/product-6.jpg'],
    extraCount: null,
    amount: '₹980',
    refundAmount: '₹980',
    reason: 'Payment Issue',
    reasonBg: '#FCE8EE',
    reasonColor: '#C8234B',
    cancelledDate: '13 Oct 2026',
    cancelledTime: '05:42 PM',
  },
  {
    id: 3,
    orderId: '#1023',
    customer: 'Riya Mehta',
    phone: '+91 98765 43212',
    thumbs: ['/images/product-2.jpg', '/images/product-7.jpg', '/images/product-8.jpg'],
    extraCount: null,
    amount: '₹1,860',
    refundAmount: '₹1,860',
    reason: 'Out of Stock',
    reasonBg: '#FFF4E5',
    reasonColor: '#D9822B',
    cancelledDate: '12 Oct 2026',
    cancelledTime: '11:30 AM',
  },
  {
    id: 4,
    orderId: '#1018',
    customer: 'Aarti Desai',
    phone: '+91 98765 43213',
    thumbs: ['/images/product-9.jpg', '/images/product-10.jpg', '/images/product-11.jpg'],
    extraCount: '+1',
    amount: '₹2,450',
    refundAmount: '₹2,450',
    reason: 'Delivery Delay',
    reasonBg: '#FFF4E5',
    reasonColor: '#D9822B',
    cancelledDate: '11 Oct 2026',
    cancelledTime: '06:20 PM',
  },
  {
    id: 5,
    orderId: '#1015',
    customer: 'Kunal Jain',
    phone: '+91 98765 43214',
    thumbs: ['/images/product-3.jpg', '/images/product-5.jpg', '/images/product-12.jpg'],
    extraCount: null,
    amount: '₹650',
    refundAmount: '₹650',
    reason: 'Address Issue',
    reasonBg: '#FCE8EE',
    reasonColor: '#B8294B',
    cancelledDate: '10 Oct 2026',
    cancelledTime: '04:10 PM',
  },
  {
    id: 6,
    orderId: '#1012',
    customer: 'Sneha Patel',
    phone: '+91 98765 43215',
    thumbs: ['/images/product-1.jpg', '/images/product-4.jpg', '/images/product-8.jpg'],
    extraCount: null,
    amount: '₹3,120',
    refundAmount: '₹3,120',
    reason: 'Incorrect Product',
    reasonBg: '#FFF4E5',
    reasonColor: '#D9822B',
    cancelledDate: '09 Oct 2026',
    cancelledTime: '01:25 PM',
  },
  {
    id: 7,
    orderId: '#1007',
    customer: 'Mehul Trivedi',
    phone: '+91 98765 43216',
    thumbs: ['/images/product-6.jpg', '/images/product-7.jpg'],
    extraCount: null,
    amount: '₹1,199',
    refundAmount: '₹1,199',
    reason: 'Price Too High',
    reasonBg: '#FCE8EE',
    reasonColor: '#B8294B',
    cancelledDate: '08 Oct 2026',
    cancelledTime: '03:50 PM',
  },
  {
    id: 8,
    orderId: '#1004',
    customer: 'Pooja Kulkarni',
    phone: '+91 98765 43217',
    thumbs: ['/images/product-2.jpg', '/images/product-9.jpg', '/images/product-10.jpg'],
    extraCount: '+1',
    amount: '₹2,450',
    refundAmount: '₹2,450',
    reason: 'Other Reason',
    reasonBg: '#FCE8EE',
    reasonColor: '#B8294B',
    cancelledDate: '07 Oct 2026',
    cancelledTime: '12:40 PM',
  },
  {
    id: 9,
    orderId: '#1001',
    customer: 'Rohan Sharma',
    phone: '+91 98765 43218',
    thumbs: ['/images/product-1.jpg', '/images/product-3.jpg', '/images/product-11.jpg'],
    extraCount: null,
    amount: '₹899',
    refundAmount: '₹899',
    reason: 'Duplicate Order',
    reasonBg: '#F3EBFF',
    reasonColor: '#7C4DFF',
    cancelledDate: '06 Oct 2026',
    cancelledTime: '05:15 PM',
  },
  {
    id: 10,
    orderId: '#0998',
    customer: 'Vidhi Dave',
    phone: '+91 98765 43219',
    thumbs: ['/images/product-4.jpg', '/images/product-8.jpg', '/images/product-12.jpg'],
    extraCount: '+2',
    amount: '₹1,760',
    refundAmount: '₹1,760',
    reason: 'Changed Mind',
    reasonBg: '#FCE8EE',
    reasonColor: '#B8294B',
    cancelledDate: '05 Oct 2026',
    cancelledTime: '02:10 PM',
  },
];

const CANCELLATION_REASONS = [
  { label: 'Changed Mind', pct: 34 },
  { label: 'Payment Issue', pct: 28 },
  { label: 'Out of Stock', pct: 19 },
  { label: 'Delivery Delay', pct: 12 },
  { label: 'Other', pct: 7 },
];

export default function AdminCancelledOrdersPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [reasonFilter, setReasonFilter] = useState('All Reason');
  const [paymentFilter, setPaymentFilter] = useState('All Payment Methods');
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  const combinedQuery = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredItems = INITIAL_CANCELLED.filter((item) => {
    const matchesSearch =
      !combinedQuery ||
      item.orderId.toLowerCase().includes(combinedQuery) ||
      item.customer.toLowerCase().includes(combinedQuery) ||
      item.phone.includes(combinedQuery) ||
      item.reason.toLowerCase().includes(combinedQuery);
    const matchesReason = reasonFilter === 'All Reason' || item.reason === reasonFilter;
    return matchesSearch && matchesReason;
  });

  const toggleAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map((i) => i.id));
    }
  };

  const toggleOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="text-[#1E3A5F]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[12px] text-[#4A6B8C] mb-3">
        <AdminIcon name="chevron-right" size={12} className="text-[#7A93AC]" />
        <Link to="/admin/orders" className="hover:text-[#B8294B] transition-colors">
          Orders
        </Link>
        <AdminIcon name="chevron-right" size={12} className="text-[#7A93AC]" />
        <span className="text-[#1E3A5F] font-medium">Cancelled Orders</span>
      </div>

      {/* Header Row */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#FDF2F4] border border-[#F3D8DF] flex items-center justify-center text-[#D14B6E] shrink-0 mt-0.5">
            <AdminIcon name="floral" size={20} strokeWidth={1.8} />
          </div>
          <div>
            <h1
              className="text-[24px] font-bold text-[#B8294B] leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Cancelled Orders
            </h1>
            <p className="text-[12.5px] text-[#4A6B8C] mt-0.5">
              View and manage orders that have been cancelled by customers or admin.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 bg-white hover:bg-[#FDF2F4] text-[#B8294B] border border-[#E5B8C5] text-[12.5px] font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer"
        >
          <AdminIcon name="download" size={15} />
          <span>Export Cancelled Orders</span>
        </button>
      </div>

      {/* Main Grid: Left Content + Right Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_285px] gap-5 items-start">
        {/* Left Column */}
        <div className="space-y-4 min-w-0">
          {/* 5 KPI Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {/* Cancelled Orders */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-3.5 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FCE8EE] flex items-center justify-center text-[#C8234B] shrink-0">
                <AdminIcon name="cart-x" size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-[#4A6B8C] font-medium truncate">Cancelled Orders</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[20px] font-bold text-[#142C4C] leading-none">32</span>
                  <span className="inline-flex items-center text-[10.5px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={10} strokeWidth={2.3} />
                    12%
                  </span>
                </div>
                <p className="text-[10px] text-[#6C849D] mt-0.5 truncate">vs last month</p>
              </div>
            </div>

            {/* Cancelled Amount */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-3.5 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFF4E5] flex items-center justify-center text-[#D9822B] shrink-0">
                <AdminIcon name="rupee" size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-[#4A6B8C] font-medium truncate">Cancelled Amount</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[20px] font-bold text-[#142C4C] leading-none">₹24,860</span>
                </div>
                <p className="text-[10px] text-[#6C849D] mt-0.5 truncate">total value</p>
              </div>
            </div>

            {/* Cancellation Rate */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-3.5 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FCE8F6] flex items-center justify-center text-[#A8238E] shrink-0">
                <AdminIcon name="percent" size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-[#4A6B8C] font-medium truncate">Cancellation Rate</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[20px] font-bold text-[#142C4C] leading-none">2.8%</span>
                </div>
                <p className="text-[10px] text-[#6C849D] mt-0.5 truncate">of total orders</p>
              </div>
            </div>

            {/* Avg. Refund Amount */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-3.5 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E6F6EC] flex items-center justify-center text-[#28A745] shrink-0">
                <AdminIcon name="undo" size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-[#4A6B8C] font-medium truncate">Avg. Refund Amount</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[20px] font-bold text-[#142C4C] leading-none">₹776</span>
                </div>
                <p className="text-[10px] text-[#6C849D] mt-0.5 truncate">per order</p>
              </div>
            </div>

            {/* Last Cancellation */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-3.5 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FCE8EE] flex items-center justify-center text-[#C8234B] shrink-0">
                <AdminIcon name="calendar" size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-[#4A6B8C] font-medium truncate">Last Cancellation</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[15.5px] font-bold text-[#142C4C] leading-tight">
                    14 Oct 2026
                  </span>
                </div>
                <p className="text-[10px] text-[#6C849D] mt-0.5 truncate">(2 days ago)</p>
              </div>
            </div>
          </div>

          {/* Search & Table Card */}
          <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <div className="relative flex-1 min-w-[230px]">
                <AdminIcon
                  name="search"
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by order ID, customer name, phone number..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E5E7EB] text-[12px] text-[#1E3A5F] placeholder:text-[#7A93AC] focus:outline-none focus:border-[#D4A3B0]"
                />
              </div>

              <div className="relative">
                <select
                  value={reasonFilter}
                  onChange={(e) => setReasonFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2 text-[12px] text-[#1E3A5F] font-medium focus:outline-none focus:border-[#D4A3B0] cursor-pointer"
                >
                  <option>All Reason</option>
                  <option>Changed Mind</option>
                  <option>Payment Issue</option>
                  <option>Out of Stock</option>
                  <option>Delivery Delay</option>
                  <option>Address Issue</option>
                  <option>Incorrect Product</option>
                </select>
                <AdminIcon
                  name="chevron-down"
                  size={13}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
                />
              </div>

              <div className="relative">
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2 text-[12px] text-[#1E3A5F] font-medium focus:outline-none focus:border-[#D4A3B0] cursor-pointer"
                >
                  <option>All Payment Methods</option>
                  <option>Paid</option>
                  <option>COD</option>
                </select>
                <AdminIcon
                  name="chevron-down"
                  size={13}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
                />
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[12px] text-[#6C849D] font-medium hover:border-[#D4A3B0] cursor-pointer"
              >
                <span>Select Date Range</span>
                <AdminIcon name="chevron-down" size={13} className="text-[#64748B]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setReasonFilter('All Reason');
                  setPaymentFilter('All Payment Methods');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#F0D0D8] bg-[#FDF6F8] text-[#B8294B] text-[12px] font-semibold hover:bg-[#FCE8EE] transition-colors cursor-pointer"
              >
                <AdminIcon name="filter" size={13} />
                <span>Filters</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FDF8F9] border-y border-[#F3E5E8] text-[11.5px] font-semibold text-[#1E3A5F]">
                    <th className="py-2.5 px-3 w-8">
                      <input
                        type="checkbox"
                        checked={
                          filteredItems.length > 0 && selectedIds.length === filteredItems.length
                        }
                        onChange={toggleAll}
                        className="rounded border-[#CBD5E1] text-[#B8294B] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="py-2.5 px-2 w-7">#</th>
                    <th className="py-2.5 px-2.5">Order ID</th>
                    <th className="py-2.5 px-3 min-w-[130px]">Customer</th>
                    <th className="py-2.5 px-3 min-w-[135px]">Items</th>
                    <th className="py-2.5 px-2.5">Amount</th>
                    <th className="py-2.5 px-2.5">Refund Amount</th>
                    <th className="py-2.5 px-2.5 text-center">Cancellation Reason</th>
                    <th className="py-2.5 px-2.5 min-w-[95px]">Cancelled On</th>
                    <th className="py-2.5 px-2.5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4EAEB] text-[12px]">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FDF8F9]/70 transition-colors">
                      <td className="py-3 px-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => toggleOne(item.id)}
                          className="rounded border-[#CBD5E1] text-[#B8294B] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-3 px-2 text-[#4A6B8C] font-medium">{item.id}</td>
                      <td className="py-3 px-2.5 font-semibold text-[#1E3A5F]">{item.orderId}</td>
                      <td className="py-3 px-3">
                        <p className="font-semibold text-[#1E3A5F] leading-snug">{item.customer}</p>
                        <p className="text-[10.5px] text-[#6C849D]">{item.phone}</p>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1">
                          {item.thumbs.map((src, i) => (
                            <div
                              key={i}
                              className="w-7 h-7 rounded-md overflow-hidden border border-[#E5E7EB] bg-[#FAF7F5] shrink-0"
                            >
                              <img src={src} alt="" className="w-full h-full object-cover" />
                            </div>
                          ))}
                          {item.extraCount && (
                            <span className="w-6 h-7 rounded-md bg-[#F3EEF0] text-[#4A6B8C] text-[10.5px] font-semibold flex items-center justify-center shrink-0">
                              {item.extraCount}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-2.5 font-semibold text-[#1E3A5F]">{item.amount}</td>
                      <td className="py-3 px-2.5 font-semibold text-[#1E3A5F]">
                        {item.refundAmount}
                      </td>
                      <td className="py-3 px-2.5 text-center">
                        <span
                          className="inline-block px-3 py-1 rounded-md text-[11px] font-semibold min-w-[100px]"
                          style={{ backgroundColor: item.reasonBg, color: item.reasonColor }}
                        >
                          {item.reason}
                        </span>
                      </td>
                      <td className="py-3 px-2.5 whitespace-nowrap">
                        <p className="text-[11px] text-[#1E3A5F]">{item.cancelledDate}</p>
                        <p className="text-[10px] text-[#6C849D]">{item.cancelledTime}</p>
                      </td>
                      <td className="py-3 px-2.5">
                        <div className="flex items-center justify-center gap-1.5 text-[#C8234B]">
                          <button
                            type="button"
                            onClick={() => setActiveOrder(item)}
                            className="px-2.5 py-1 rounded-md border border-[#F0D0D8] bg-white hover:bg-[#FCE8EE] text-[#B8294B] text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            title="More Options"
                            className="w-5 h-6 rounded-md hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="more-vertical" size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-2 border-t border-[#F4EAEB] text-[12px] text-[#4A6B8C]">
              <span>Showing 1 – {filteredItems.length} of 32 cancelled orders</span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="w-7 h-7 rounded-md border border-[#E5E7EB] flex items-center justify-center text-[#64748B] hover:bg-[#F8FAFC] cursor-pointer"
                >
                  <AdminIcon name="chevron-left" size={13} />
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded-md bg-[#B8294B] text-white font-semibold flex items-center justify-center cursor-pointer"
                >
                  1
                </button>
                {[2, 3, 4].map((page) => (
                  <button
                    key={page}
                    type="button"
                    className="w-7 h-7 rounded-md border border-[#E5E7EB] text-[#1E3A5F] hover:bg-[#FDF2F4] font-medium flex items-center justify-center cursor-pointer"
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className="w-7 h-7 rounded-md border border-[#E5E7EB] flex items-center justify-center text-[#64748B] hover:bg-[#F8FAFC] cursor-pointer"
                >
                  <AdminIcon name="chevron-right" size={13} />
                </button>
              </div>

              <div className="relative">
                <select
                  defaultValue="10 per page"
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-7 py-1.5 text-[11.5px] text-[#1E3A5F] font-medium focus:outline-none cursor-pointer"
                >
                  <option>10 per page</option>
                  <option>25 per page</option>
                  <option>50 per page</option>
                </select>
                <AdminIcon
                  name="chevron-down"
                  size={12}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-4">
          {/* Cancellation Overview Donut */}
          <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#C8234B]">
                <AdminIcon name="floral" size={15} />
              </span>
              <h3
                className="text-[13.5px] font-bold text-[#B8294B]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Cancellation Overview
              </h3>
            </div>

            <div className="flex items-center justify-between gap-2.5">
              <div className="relative w-[112px] h-[112px] shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F6EAEE" strokeWidth="4.8" />
                  {/* Customer 62% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#F48FB1"
                    strokeWidth="4.8"
                    strokeDasharray="54.5 88"
                    strokeDashoffset="0"
                  />
                  {/* Admin 25% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#A5D6A7"
                    strokeWidth="4.8"
                    strokeDasharray="22 88"
                    strokeDashoffset="-54.5"
                  />
                  {/* Other 13% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#FFE082"
                    strokeWidth="4.8"
                    strokeDasharray="11.5 88"
                    strokeDashoffset="-76.5"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
                  <span className="text-[16px] font-bold text-[#142C4C]">32</span>
                  <span className="text-[9.5px] text-[#4A6B8C]">Cancelled</span>
                  <span className="text-[9.5px] text-[#4A6B8C]">Orders</span>
                </div>
              </div>

              <div className="space-y-2 flex-1 text-[10.5px]">
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F48FB1] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">Customer</p>
                    <p className="text-[#6C849D] text-[10px]">(62%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#81C784] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">Admin</p>
                    <p className="text-[#6C849D] text-[10px]">(25%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FFE082] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">Other</p>
                    <p className="text-[#6C849D] text-[10px]">(13%)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Cancellation Reasons */}
          <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#C8234B]">
                <AdminIcon name="floral" size={14} />
              </span>
              <h3
                className="text-[13px] font-bold text-[#B8294B]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Top Cancellation Reasons
              </h3>
            </div>

            <div className="space-y-2.5">
              {CANCELLATION_REASONS.map((rsn) => (
                <div key={rsn.label} className="flex items-center gap-2 text-[10.5px]">
                  <span className="w-24 font-medium text-[#1E3A5F] truncate shrink-0">
                    {rsn.label}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-[#F3EEF0] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#E57399]"
                      style={{ width: `${rsn.pct * 2}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-semibold text-[#1E3A5F] shrink-0">
                    {rsn.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Cancellations */}
          <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[#C8234B]">
                  <AdminIcon name="floral" size={14} />
                </span>
                <h3
                  className="text-[12.5px] font-bold text-[#B8294B]"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Recent Cancellations
                </h3>
              </div>
              <Link
                to="/admin/orders"
                className="text-[10.5px] font-semibold text-[#B8294B] hover:underline inline-flex items-center gap-0.5 shrink-0"
              >
                <span>View All</span>
                <AdminIcon name="arrow-right" size={10} />
              </Link>
            </div>

            <div className="space-y-2.5">
              {INITIAL_CANCELLED.slice(0, 3).map((ord) => (
                <div
                  key={ord.orderId}
                  className="flex items-center justify-between gap-2 py-1 border-b border-[#F8EEF0] last:border-0"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#E5E7EB] shrink-0 bg-[#FAF7F5]">
                      <img src={ord.thumbs[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-[#1E3A5F] leading-tight">
                        {ord.orderId}
                      </p>
                      <p className="text-[10px] text-[#6C849D] truncate">{ord.customer}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10.5px] font-medium text-[#1E3A5F]">{ord.cancelledDate}</p>
                    <p className="text-[9.5px] text-[#6C849D]">{ord.cancelledTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Need Help Card */}
          <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[#C8234B]">
                <AdminIcon name="support" size={16} />
              </span>
              <h3
                className="text-[13.5px] font-bold text-[#B8294B]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Need Help?
              </h3>
            </div>
            <p className="text-[11.5px] text-[#4A6B8C] leading-relaxed mb-3">
              Have questions about order cancellations? Contact our support team for assistance.
            </p>
            <Link
              to="/admin/content/messages"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg border border-[#E5B8C5] text-[#B8294B] text-[12px] font-semibold hover:bg-[#FDF2F4] transition-colors"
            >
              <span>Contact Support</span>
              <AdminIcon name="arrow-right" size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Cancelled Order Modal */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#F2E2E6] bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F3E5E8] pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-[#B8294B]" style={{ fontFamily: 'Georgia, serif' }}>
                  Cancelled Order {activeOrder.orderId}
                </h3>
                <p className="text-xs text-[#6C849D]">
                  Cancelled on {activeOrder.cancelledDate} at {activeOrder.cancelledTime}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveOrder(null)}
                className="text-[#64748B] hover:text-[#B8294B] text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#F8EEF0]">
                <span className="text-[#6C849D]">Customer</span>
                <span className="font-semibold text-[#1E3A5F]">{activeOrder.customer}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#F8EEF0]">
                <span className="text-[#6C849D]">Order Amount</span>
                <span className="font-semibold text-[#1E3A5F]">{activeOrder.amount}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#F8EEF0]">
                <span className="text-[#6C849D]">Refund Amount</span>
                <span className="font-bold text-[#1E824C]">{activeOrder.refundAmount}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#6C849D]">Reason</span>
                <span className="font-semibold text-[#B8294B]">{activeOrder.reason}</span>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveOrder(null)}
                className="rounded-lg bg-[#B8294B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#9E1F3E] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

