import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_PENDING = [
  {
    id: 1,
    orderId: '#1028',
    customer: 'Pooja Shah',
    phone: '+91 98765 43210',
    thumbs: ['/images/product-1.jpg', '/images/product-2.jpg', '/images/product-3.jpg'],
    extraCount: '+1',
    amount: '₹1,240',
    payment: 'Paid',
    paymentBg: '#E6F6EC',
    paymentColor: '#1E824C',
    orderDate: '16 Oct 2026',
    orderTime: '10:24 AM',
    timeSince: '2 hrs',
    timeBg: '#E6F6EC',
    timeColor: '#1E824C',
    source: 'Website',
  },
  {
    id: 2,
    orderId: '#1027',
    customer: 'Neha Patel',
    phone: '+91 98765 43211',
    thumbs: ['/images/product-4.jpg', '/images/product-5.jpg', '/images/product-6.jpg'],
    extraCount: '+2',
    amount: '₹2,580',
    payment: 'COD',
    paymentBg: '#FCE8EE',
    paymentColor: '#C8234B',
    orderDate: '16 Oct 2026',
    orderTime: '09:18 AM',
    timeSince: '5 hrs',
    timeBg: '#E6F6EC',
    timeColor: '#1E824C',
    source: 'Website',
  },
  {
    id: 3,
    orderId: '#1026',
    customer: 'Riya Mehta',
    phone: '+91 98765 43212',
    thumbs: ['/images/product-2.jpg', '/images/product-7.jpg'],
    extraCount: null,
    amount: '₹980',
    payment: 'Paid',
    paymentBg: '#E6F6EC',
    paymentColor: '#1E824C',
    orderDate: '16 Oct 2026',
    orderTime: '08:35 AM',
    timeSince: '7 hrs',
    timeBg: '#FFF4E5',
    timeColor: '#D9822B',
    source: 'Wholesale',
  },
  {
    id: 4,
    orderId: '#1025',
    customer: 'Aarti Desai',
    phone: '+91 98765 43213',
    thumbs: ['/images/product-8.jpg', '/images/product-9.jpg', '/images/product-10.jpg'],
    extraCount: '+1',
    amount: '₹1,860',
    payment: 'COD',
    paymentBg: '#FCE8EE',
    paymentColor: '#C8234B',
    orderDate: '15 Oct 2026',
    orderTime: '06:42 PM',
    timeSince: '16 hrs',
    timeBg: '#FFF4E5',
    timeColor: '#D9822B',
    source: 'Website',
  },
  {
    id: 5,
    orderId: '#1024',
    customer: 'Kunal Jain',
    phone: '+91 98765 43214',
    thumbs: ['/images/product-3.jpg', '/images/product-5.jpg'],
    extraCount: null,
    amount: '₹650',
    payment: 'Paid',
    paymentBg: '#E6F6EC',
    paymentColor: '#1E824C',
    orderDate: '15 Oct 2026',
    orderTime: '04:12 PM',
    timeSince: '18 hrs',
    timeBg: '#FFF4E5',
    timeColor: '#D9822B',
    source: 'Website',
  },
  {
    id: 6,
    orderId: '#1023',
    customer: 'Sneha Patel',
    phone: '+91 98765 43215',
    thumbs: ['/images/product-1.jpg', '/images/product-4.jpg', '/images/product-11.jpg'],
    extraCount: '+3',
    amount: '₹3,120',
    payment: 'COD',
    paymentBg: '#FCE8EE',
    paymentColor: '#C8234B',
    orderDate: '14 Oct 2026',
    orderTime: '03:54 PM',
    timeSince: '1 day',
    timeBg: '#FFF4E5',
    timeColor: '#D9822B',
    source: 'Wholesale',
  },
  {
    id: 7,
    orderId: '#1022',
    customer: 'Mehul Trivedi',
    phone: '+91 98765 43216',
    thumbs: ['/images/product-6.jpg', '/images/product-12.jpg'],
    extraCount: null,
    amount: '₹1,199',
    payment: 'Paid',
    paymentBg: '#E6F6EC',
    paymentColor: '#1E824C',
    orderDate: '14 Oct 2026',
    orderTime: '12:28 PM',
    timeSince: '1 day',
    timeBg: '#FFF4E5',
    timeColor: '#D9822B',
    source: 'Website',
  },
  {
    id: 8,
    orderId: '#1021',
    customer: 'Pooja Kulkarni',
    phone: '+91 98765 43217',
    thumbs: ['/images/product-2.jpg', '/images/product-7.jpg', '/images/product-9.jpg'],
    extraCount: '+1',
    amount: '₹2,450',
    payment: 'COD',
    paymentBg: '#FCE8EE',
    paymentColor: '#C8234B',
    orderDate: '13 Oct 2026',
    orderTime: '11:16 AM',
    timeSince: '1 day',
    timeBg: '#FFF4E5',
    timeColor: '#D9822B',
    source: 'Website',
  },
  {
    id: 9,
    orderId: '#1020',
    customer: 'Rohan Sharma',
    phone: '+91 98765 43218',
    thumbs: ['/images/product-3.jpg', '/images/product-8.jpg'],
    extraCount: null,
    amount: '₹899',
    payment: 'Paid',
    paymentBg: '#E6F6EC',
    paymentColor: '#1E824C',
    orderDate: '12 Oct 2026',
    orderTime: '05:48 PM',
    timeSince: '2 days',
    timeBg: '#FCE8EE',
    timeColor: '#C8234B',
    source: 'Website',
  },
  {
    id: 10,
    orderId: '#1019',
    customer: 'Vidhi Dave',
    phone: '+91 98765 43219',
    thumbs: ['/images/product-1.jpg', '/images/product-4.jpg', '/images/product-10.jpg'],
    extraCount: '+2',
    amount: '₹1,760',
    payment: 'COD',
    paymentBg: '#FCE8EE',
    paymentColor: '#C8234B',
    orderDate: '12 Oct 2026',
    orderTime: '01:22 PM',
    timeSince: '2 days',
    timeBg: '#FCE8EE',
    timeColor: '#C8234B',
    source: 'Wholesale',
  },
];

export default function AdminPendingOrdersPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [orders, setOrders] = useState(INITIAL_PENDING);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('All Payment Methods');
  const [sourceFilter, setSourceFilter] = useState('All Sources');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const combinedQuery = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredItems = orders.filter((item) => {
    const matchesSearch =
      !combinedQuery ||
      item.orderId.toLowerCase().includes(combinedQuery) ||
      item.customer.toLowerCase().includes(combinedQuery) ||
      item.phone.includes(combinedQuery);
    const matchesPayment =
      paymentFilter === 'All Payment Methods' || item.payment === paymentFilter;
    const matchesSource = sourceFilter === 'All Sources' || item.source === sourceFilter;
    return matchesSearch && matchesPayment && matchesSource;
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

  const handleMarkProcessing = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    showToast('Order moved to Processing Orders.');
  };

  const handleExport = () => {
    showToast('Exported pending orders CSV.');
  };

  return (
    <div className="text-[#1E3A5F]">
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-[#1E3A5F] px-4 py-2.5 text-xs font-semibold text-white shadow-lg">
          {toastMsg}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[12px] text-[#4A6B8C] mb-3">
        <AdminIcon name="chevron-right" size={12} className="text-[#7A93AC]" />
        <Link to="/admin/orders" className="hover:text-[#B8294B] transition-colors">
          Orders
        </Link>
        <AdminIcon name="chevron-right" size={12} className="text-[#7A93AC]" />
        <span className="text-[#1E3A5F] font-medium">Pending Orders</span>
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
              Pending Orders
            </h1>
            <p className="text-[12.5px] text-[#4A6B8C] mt-0.5">
              Orders awaiting confirmation, payment or processing. Review and take action.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 bg-white hover:bg-[#FDF2F4] text-[#B8294B] border border-[#E5B8C5] text-[12.5px] font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer"
        >
          <AdminIcon name="download" size={15} />
          <span>Export Pending Orders</span>
        </button>
      </div>

      {/* Main Grid: Left Content + Right Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_285px] gap-5 items-start">
        {/* Left Column */}
        <div className="space-y-4 min-w-0">
          {/* 4 KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Pending Orders */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FFF4E5] flex items-center justify-center text-[#D9822B] shrink-0">
                <AdminIcon name="clock" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Pending Orders</p>
                <div className="flex items-baseline justify-between gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">
                    {orders.length + 14}
                  </span>
                  <span className="text-[10.5px] text-[#6C849D]">orders</span>
                </div>
              </div>
            </div>

            {/* Pending Amount */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FFF4E5] flex items-center justify-center text-[#D9822B] shrink-0">
                <AdminIcon name="rupee" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Pending Amount</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">₹42,680</span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">total value</p>
              </div>
            </div>

            {/* Avg. Order Value */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FCE8F6] flex items-center justify-center text-[#A8238E] shrink-0">
                <AdminIcon name="truck" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Avg. Order Value</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">₹1,778</span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">per order</p>
              </div>
            </div>

            {/* Oldest Pending */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#E6F6EC] flex items-center justify-center text-[#28A745] shrink-0">
                <AdminIcon name="products" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Oldest Pending</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">2 days</span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">since order placed</p>
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

              <div className="relative">
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2 text-[12px] text-[#1E3A5F] font-medium focus:outline-none focus:border-[#D4A3B0] cursor-pointer"
                >
                  <option>All Sources</option>
                  <option>Website</option>
                  <option>Wholesale</option>
                </select>
                <AdminIcon
                  name="chevron-down"
                  size={13}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
                />
              </div>

              <div className="relative">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2 text-[12px] text-[#1E3A5F] font-medium focus:outline-none focus:border-[#D4A3B0] cursor-pointer"
                >
                  <option>All Dates</option>
                  <option>Today</option>
                  <option>Last 2 Days</option>
                </select>
                <AdminIcon
                  name="chevron-down"
                  size={13}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setPaymentFilter('All Payment Methods');
                  setSourceFilter('All Sources');
                  setDateFilter('All Dates');
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
                    <th className="py-2.5 px-2.5 text-center">Payment</th>
                    <th className="py-2.5 px-2.5 min-w-[95px]">Order Date</th>
                    <th className="py-2.5 px-2.5 text-center">Time Since</th>
                    <th className="py-2.5 px-2.5 text-center">Actions</th>
                    <th className="py-2.5 px-2.5 text-center">Action</th>
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
                      <td className="py-3 px-2.5 text-center">
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold min-w-[46px]"
                          style={{ backgroundColor: item.paymentBg, color: item.paymentColor }}
                        >
                          {item.payment}
                        </span>
                      </td>
                      <td className="py-3 px-2.5 whitespace-nowrap">
                        <p className="text-[11px] text-[#1E3A5F]">{item.orderDate}</p>
                        <p className="text-[10px] text-[#6C849D]">{item.orderTime}</p>
                      </td>
                      <td className="py-3 px-2.5 text-center">
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold min-w-[48px]"
                          style={{ backgroundColor: item.timeBg, color: item.timeColor }}
                        >
                          {item.timeSince}
                        </span>
                      </td>
                      <td className="py-3 px-2.5">
                        <div className="flex items-center justify-center gap-1 text-[#C8234B]">
                          <button
                            type="button"
                            onClick={() => setActiveOrder(item)}
                            title="View Order"
                            className="w-6 h-6 rounded-md border border-[#F3E2E6] bg-[#FDF8F9] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="eye" size={13} />
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
                      <td className="py-3 px-2.5 text-center">
                        <button
                          type="button"
                          onClick={() => handleMarkProcessing(item.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#9E1838] hover:bg-[#82122C] text-white text-[10.5px] font-semibold whitespace-nowrap transition-colors cursor-pointer"
                        >
                          Mark as Processing
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-2 border-t border-[#F4EAEB] text-[12px] text-[#4A6B8C]">
              <span>Showing 1 – {filteredItems.length} of 24 pending orders</span>

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
                {[2, 3].map((page) => (
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
          {/* Pending Orders Breakdown Donut */}
          <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#C8234B]">
                <AdminIcon name="floral" size={15} />
              </span>
              <h3
                className="text-[13.5px] font-bold text-[#B8294B]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Pending Orders Breakdown
              </h3>
            </div>

            <div className="flex items-center justify-between gap-2.5">
              <div className="relative w-[112px] h-[112px] shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F6EAEE" strokeWidth="4.8" />
                  {/* Paid 42% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#81C784"
                    strokeWidth="4.8"
                    strokeDasharray="37 88"
                    strokeDashoffset="0"
                  />
                  {/* COD 50% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#F48FB1"
                    strokeWidth="4.8"
                    strokeDasharray="44 88"
                    strokeDashoffset="-37"
                  />
                  {/* Partially Paid 8% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#FFE082"
                    strokeWidth="4.8"
                    strokeDasharray="7 88"
                    strokeDashoffset="-81"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
                  <span className="text-[16px] font-bold text-[#142C4C]">24</span>
                  <span className="text-[9.5px] text-[#4A6B8C]">Pending</span>
                </div>
              </div>

              <div className="space-y-2 flex-1 text-[10.5px]">
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#66BB6A] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">Paid</p>
                    <p className="text-[#6C849D] text-[10px]">10 (42%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F48FB1] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">COD</p>
                    <p className="text-[#6C849D] text-[10px]">12 (50%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FFD54F] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">Partially Paid</p>
                    <p className="text-[#6C849D] text-[10px]">2 (8%)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[#C8234B]">
                <AdminIcon name="floral" size={14} />
              </span>
              <h3
                className="text-[13px] font-bold text-[#B8294B]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Quick Actions
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => showToast('Selected orders confirmed.')}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#FDF6F8] hover:bg-[#FCE8EE] border border-[#F3E2E6] py-3 px-2 text-center transition-colors cursor-pointer"
              >
                <span className="text-[#B8294B]">
                  <AdminIcon name="check-circle" size={17} />
                </span>
                <span className="text-[11px] font-semibold text-[#1E3A5F]">Confirm Selected</span>
              </button>

              <button
                type="button"
                onClick={() => showToast('Selected orders marked as Processing.')}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#FDF6F8] hover:bg-[#FCE8EE] border border-[#F3E2E6] py-3 px-2 text-center transition-colors cursor-pointer"
              >
                <span className="text-[#B8294B]">
                  <AdminIcon name="settings" size={17} />
                </span>
                <span className="text-[11px] font-semibold text-[#1E3A5F]">Mark as Processing</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#FDF6F8] hover:bg-[#FCE8EE] border border-[#F3E2E6] py-3 px-2 text-center transition-colors cursor-pointer"
              >
                <span className="text-[#B8294B]">
                  <AdminIcon name="printer" size={17} />
                </span>
                <span className="text-[11px] font-semibold text-[#1E3A5F]">Print Orders</span>
              </button>

              <button
                type="button"
                onClick={handleExport}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#FDF6F8] hover:bg-[#FCE8EE] border border-[#F3E2E6] py-3 px-2 text-center transition-colors cursor-pointer"
              >
                <span className="text-[#B8294B]">
                  <AdminIcon name="download" size={17} />
                </span>
                <span className="text-[11px] font-semibold text-[#1E3A5F]">Export Pending</span>
              </button>
            </div>
          </div>

          {/* Recent Pending Orders */}
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
                  Recent Pending Orders
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
              {INITIAL_PENDING.slice(0, 5).map((ord) => (
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
                    <p className="text-[11px] font-bold text-[#1E3A5F]">{ord.amount}</p>
                    <p className="text-[9.5px] text-[#6C849D]">{ord.timeSince} ago</p>
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
              Have questions about orders? Contact our support team for assistance.
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

      {/* Pending Order Detail Modal */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#F2E2E6] bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F3E5E8] pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-[#B8294B]" style={{ fontFamily: 'Georgia, serif' }}>
                  Pending Order {activeOrder.orderId}
                </h3>
                <p className="text-xs text-[#6C849D]">
                  Placed {activeOrder.orderDate} at {activeOrder.orderTime} ({activeOrder.timeSince} ago)
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
                <span className="text-[#6C849D]">Phone</span>
                <span className="font-semibold text-[#1E3A5F]">{activeOrder.phone}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#F8EEF0]">
                <span className="text-[#6C849D]">Order Amount</span>
                <span className="font-bold text-[#1E3A5F]">{activeOrder.amount}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#6C849D]">Payment</span>
                <span className="font-semibold text-[#1E824C]">{activeOrder.payment}</span>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  handleMarkProcessing(activeOrder.id);
                  setActiveOrder(null);
                }}
                className="rounded-lg bg-[#B8294B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#9E1F3E] cursor-pointer"
              >
                Mark as Processing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

