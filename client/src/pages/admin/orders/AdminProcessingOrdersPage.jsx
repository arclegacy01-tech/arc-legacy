import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_PROCESSING = [
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
    stage: 'Packing',
    stageBg: '#FFF4E5',
    stageColor: '#D9822B',
    expectedShip: '17 Oct 2026',
    daysInProc: '1 day',
    daysBg: '#E6F6EC',
    daysColor: '#1E824C',
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
    stage: 'Picking Items',
    stageBg: '#FCE8F6',
    stageColor: '#A8238E',
    expectedShip: '17 Oct 2026',
    daysInProc: '1 day',
    daysBg: '#E6F6EC',
    daysColor: '#1E824C',
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
    stage: 'Quality Check',
    stageBg: '#E8F2FC',
    stageColor: '#2563EB',
    expectedShip: '18 Oct 2026',
    daysInProc: '1 day',
    daysBg: '#E6F6EC',
    daysColor: '#1E824C',
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
    stage: 'Packing',
    stageBg: '#FFF4E5',
    stageColor: '#D9822B',
    expectedShip: '18 Oct 2026',
    daysInProc: '2 days',
    daysBg: '#FFF4E5',
    daysColor: '#D9822B',
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
    stage: 'Label Created',
    stageBg: '#E6F6EC',
    stageColor: '#1E824C',
    expectedShip: '17 Oct 2026',
    daysInProc: '1 day',
    daysBg: '#E6F6EC',
    daysColor: '#1E824C',
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
    stage: 'Packing',
    stageBg: '#FFF4E5',
    stageColor: '#D9822B',
    expectedShip: '18 Oct 2026',
    daysInProc: '2 days',
    daysBg: '#FFF4E5',
    daysColor: '#D9822B',
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
    stage: 'Picking Items',
    stageBg: '#FCE8F6',
    stageColor: '#A8238E',
    expectedShip: '19 Oct 2026',
    daysInProc: '2 days',
    daysBg: '#FFF4E5',
    daysColor: '#D9822B',
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
    stage: 'Quality Check',
    stageBg: '#E8F2FC',
    stageColor: '#2563EB',
    expectedShip: '18 Oct 2026',
    daysInProc: '2 days',
    daysBg: '#FFF4E5',
    daysColor: '#D9822B',
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
    stage: 'Packing',
    stageBg: '#FFF4E5',
    stageColor: '#D9822B',
    expectedShip: '19 Oct 2026',
    daysInProc: '2 days',
    daysBg: '#FFF4E5',
    daysColor: '#D9822B',
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
    stage: 'Label Created',
    stageBg: '#E6F6EC',
    stageColor: '#1E824C',
    expectedShip: '19 Oct 2026',
    daysInProc: '3 days',
    daysBg: '#FCE8EE',
    daysColor: '#C8234B',
  },
];

export default function AdminProcessingOrdersPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [orders, setOrders] = useState(INITIAL_PROCESSING);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('All Payment Methods');
  const [partnerFilter, setPartnerFilter] = useState('All Shipping Partners');
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
      item.phone.includes(combinedQuery) ||
      item.stage.toLowerCase().includes(combinedQuery);
    const matchesPayment =
      paymentFilter === 'All Payment Methods' || item.payment === paymentFilter;
    return matchesSearch && matchesPayment;
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

  const handleCycleStage = (id) => {
    const stages = [
      { stage: 'Picking Items', bg: '#FCE8F6', color: '#A8238E' },
      { stage: 'Quality Check', bg: '#E8F2FC', color: '#2563EB' },
      { stage: 'Packing', bg: '#FFF4E5', color: '#D9822B' },
      { stage: 'Label Created', bg: '#E6F6EC', color: '#1E824C' },
    ];
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const idx = stages.findIndex((s) => s.stage === o.stage);
        const next = stages[(idx + 1) % stages.length];
        return { ...o, stage: next.stage, stageBg: next.bg, stageColor: next.color };
      })
    );
    showToast('Processing stage updated.');
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
        <span className="text-[#1E3A5F] font-medium">Processing Orders</span>
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
              Processing Orders
            </h1>
            <p className="text-[12.5px] text-[#4A6B8C] mt-0.5">
              Manage orders that are being prepared, packed or ready to ship.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => showToast('Exported processing orders CSV.')}
          className="inline-flex items-center gap-2 bg-white hover:bg-[#FDF2F4] text-[#B8294B] border border-[#E5B8C5] text-[12.5px] font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer"
        >
          <AdminIcon name="download" size={15} />
          <span>Export Processing Orders</span>
        </button>
      </div>

      {/* Main Grid: Left Content + Right Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_285px] gap-5 items-start">
        {/* Left Column */}
        <div className="space-y-4 min-w-0">
          {/* 4 KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Processing Orders */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FCE8EE] flex items-center justify-center text-[#C8234B] shrink-0">
                <AdminIcon name="products" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Processing Orders</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">18</span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={11} strokeWidth={2.3} />
                    20%
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">vs last week</p>
              </div>
            </div>

            {/* Processing Amount */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FFF4E5] flex items-center justify-center text-[#D9822B] shrink-0">
                <AdminIcon name="rupee" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Processing Amount</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">₹32,460</span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">total value</p>
              </div>
            </div>

            {/* Avg. Order Value */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FCE8F6] flex items-center justify-center text-[#A8238E] shrink-0">
                <AdminIcon name="products" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Avg. Order Value</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">₹1,803</span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">per order</p>
              </div>
            </div>

            {/* Avg. Processing Time */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#E6F6EC] flex items-center justify-center text-[#28A745] shrink-0">
                <AdminIcon name="clock" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Avg. Processing Time</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">
                    1.2 days
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">from confirmation</p>
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
                  value={partnerFilter}
                  onChange={(e) => setPartnerFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2 text-[12px] text-[#1E3A5F] font-medium focus:outline-none focus:border-[#D4A3B0] cursor-pointer"
                >
                  <option>All Shipping Partners</option>
                  <option>Delhivery</option>
                  <option>Blue Dart</option>
                  <option>Ekart</option>
                  <option>DTDC</option>
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
                  <option>Tomorrow</option>
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
                  setPartnerFilter('All Shipping Partners');
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
                    <th className="py-2.5 px-2.5 text-center">Processing Stage</th>
                    <th className="py-2.5 px-2.5 min-w-[100px]">Expected Ship Date</th>
                    <th className="py-2.5 px-2.5 text-center">Days in Processing</th>
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
                      <td className="py-3 px-2.5 text-center">
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold min-w-[46px]"
                          style={{ backgroundColor: item.paymentBg, color: item.paymentColor }}
                        >
                          {item.payment}
                        </span>
                      </td>
                      <td className="py-3 px-2.5 text-center">
                        <button
                          type="button"
                          onClick={() => handleCycleStage(item.id)}
                          title="Click to advance processing stage"
                          className="inline-block px-3 py-1 rounded-md text-[11px] font-semibold min-w-[92px] cursor-pointer"
                          style={{ backgroundColor: item.stageBg, color: item.stageColor }}
                        >
                          {item.stage}
                        </button>
                      </td>
                      <td className="py-3 px-2.5 text-[11.5px] text-[#1E3A5F] whitespace-nowrap">
                        {item.expectedShip}
                      </td>
                      <td className="py-3 px-2.5 text-center">
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold min-w-[52px]"
                          style={{ backgroundColor: item.daysBg, color: item.daysColor }}
                        >
                          {item.daysInProc}
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
                            onClick={() => handleCycleStage(item.id)}
                            title="Mark as Shipped"
                            className="w-6 h-6 rounded-md border border-[#F3E2E6] bg-[#FDF8F9] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="truck" size={13} />
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
              <span>Showing 1 – {filteredItems.length} of 18 processing orders</span>

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
                <button
                  type="button"
                  className="w-7 h-7 rounded-md border border-[#E5E7EB] text-[#1E3A5F] hover:bg-[#FDF2F4] font-medium flex items-center justify-center cursor-pointer"
                >
                  2
                </button>
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
          {/* Processing Stage Breakdown Donut */}
          <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#C8234B]">
                <AdminIcon name="floral" size={15} />
              </span>
              <h3
                className="text-[13.5px] font-bold text-[#B8294B]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Processing Stage Breakdown
              </h3>
            </div>

            <div className="flex items-center justify-between gap-2.5">
              <div className="relative w-[112px] h-[112px] shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F6EAEE" strokeWidth="4.8" />
                  {/* Picking Items 28% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#F48FB1"
                    strokeWidth="4.8"
                    strokeDasharray="24.6 88"
                    strokeDashoffset="0"
                  />
                  {/* Quality Check 22% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#CE93D8"
                    strokeWidth="4.8"
                    strokeDasharray="19.4 88"
                    strokeDashoffset="-24.6"
                  />
                  {/* Packing 33% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#FFE082"
                    strokeWidth="4.8"
                    strokeDasharray="29 88"
                    strokeDashoffset="-44"
                  />
                  {/* Label Created 17% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#81C784"
                    strokeWidth="4.8"
                    strokeDasharray="15 88"
                    strokeDashoffset="-73"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
                  <span className="text-[16px] font-bold text-[#142C4C]">18</span>
                  <span className="text-[9.5px] text-[#4A6B8C]">Processing</span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1 text-[10.5px]">
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F48FB1] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">Picking Items</p>
                    <p className="text-[#6C849D] text-[10px]">5 (28%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#CE93D8] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">Quality Check</p>
                    <p className="text-[#6C849D] text-[10px]">4 (22%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FFD54F] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">Packing</p>
                    <p className="text-[#6C849D] text-[10px]">6 (33%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#66BB6A] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">Label Created</p>
                    <p className="text-[#6C849D] text-[10px]">3 (17%)</p>
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
                onClick={() => showToast('Selected orders marked as Shipped.')}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#FDF6F8] hover:bg-[#FCE8EE] border border-[#F3E2E6] py-3 px-2 text-center transition-colors cursor-pointer"
              >
                <span className="text-[#B8294B]">
                  <AdminIcon name="truck" size={17} />
                </span>
                <span className="text-[11px] font-semibold text-[#1E3A5F]">Mark as Shipped</span>
              </button>

              <button
                type="button"
                onClick={() => showToast('Bulk stage update applied.')}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#FDF6F8] hover:bg-[#FCE8EE] border border-[#F3E2E6] py-3 px-2 text-center transition-colors cursor-pointer"
              >
                <span className="text-[#B8294B]">
                  <AdminIcon name="products" size={17} />
                </span>
                <span className="text-[11px] font-semibold text-[#1E3A5F]">Bulk Update Stage</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#FDF6F8] hover:bg-[#FCE8EE] border border-[#F3E2E6] py-3 px-2 text-center transition-colors cursor-pointer"
              >
                <span className="text-[#B8294B]">
                  <AdminIcon name="printer" size={17} />
                </span>
                <span className="text-[11px] font-semibold text-[#1E3A5F]">
                  Print Shipping Labels
                </span>
              </button>

              <button
                type="button"
                onClick={() => showToast('Exported processing orders CSV.')}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#FDF6F8] hover:bg-[#FCE8EE] border border-[#F3E2E6] py-3 px-2 text-center transition-colors cursor-pointer"
              >
                <span className="text-[#B8294B]">
                  <AdminIcon name="download" size={17} />
                </span>
                <span className="text-[10.5px] font-semibold text-[#1E3A5F] leading-tight">
                  Export Processing Orders
                </span>
              </button>
            </div>
          </div>

          {/* Recent Processing Orders */}
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
                  Recent Processing Orders
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
              {orders.slice(0, 5).map((ord) => (
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
                    <span
                      className="inline-block px-2 py-0.5 rounded text-[9.5px] font-semibold"
                      style={{ backgroundColor: ord.stageBg, color: ord.stageColor }}
                    >
                      {ord.stage}
                    </span>
                    <p className="text-[9px] text-[#6C849D] mt-0.5">16 Oct 2026</p>
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
              Have questions about processing orders? Contact our support team for assistance.
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

      {/* Processing Order Detail Modal */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#F2E2E6] bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F3E5E8] pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-[#B8294B]" style={{ fontFamily: 'Georgia, serif' }}>
                  Processing Order {activeOrder.orderId}
                </h3>
                <p className="text-xs text-[#6C849D]">
                  Expected Ship Date: {activeOrder.expectedShip}
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
                <span className="text-[#6C849D]">Current Stage</span>
                <span className="font-semibold text-[#B8294B]">{activeOrder.stage}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#F8EEF0]">
                <span className="text-[#6C849D]">Order Amount</span>
                <span className="font-bold text-[#1E3A5F]">{activeOrder.amount}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#6C849D]">Days in Processing</span>
                <span className="font-semibold text-[#1E824C]">{activeOrder.daysInProc}</span>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  handleCycleStage(activeOrder.id);
                  setActiveOrder(null);
                }}
                className="rounded-lg bg-[#B8294B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#9E1F3E] cursor-pointer"
              >
                Advance Stage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

