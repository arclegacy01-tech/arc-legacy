import { useState, useEffect } from 'react';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../components/admin/AdminIcons.jsx';

const INITIAL_ORDERS = [
  {
    id: 1,
    orderId: '#1028',
    customer: 'Pooja Shah',
    phone: '+91 98765 43210',
    thumbs: ['/images/product-1.jpg', '/images/product-2.jpg', '/images/product-3.jpg'],
    extraCount: '+1',
    itemsCount: '3 items',
    amount: '₹1,240',
    payment: 'Paid',
    paymentBg: '#E6F6EC',
    paymentColor: '#1E824C',
    state: 'Processing',
    stateBg: '#FFF4E5',
    stateColor: '#D9822B',
    date: '16 Oct 2026',
    time: '10:24 AM',
  },
  {
    id: 2,
    orderId: '#1027',
    customer: 'Neha Patel',
    phone: '+91 98765 43211',
    thumbs: ['/images/product-4.jpg', '/images/product-5.jpg', '/images/product-6.jpg'],
    extraCount: '+1',
    itemsCount: '5 items',
    amount: '₹2,580',
    payment: 'Paid',
    paymentBg: '#E6F6EC',
    paymentColor: '#1E824C',
    state: 'Shipped',
    stateBg: '#E6F6EC',
    stateColor: '#1E824C',
    date: '16 Oct 2026',
    time: '09:18 AM',
  },
  {
    id: 3,
    orderId: '#1026',
    customer: 'Riya Mehta',
    phone: '+91 98765 43212',
    thumbs: ['/images/product-2.jpg', '/images/product-7.jpg', '/images/product-8.jpg'],
    extraCount: null,
    itemsCount: '2 items',
    amount: '₹980',
    payment: 'COD',
    paymentBg: '#FCE8EE',
    paymentColor: '#C8234B',
    state: 'Processing',
    stateBg: '#FFF4E5',
    stateColor: '#D9822B',
    date: '16 Oct 2026',
    time: '08:35 AM',
  },
  {
    id: 4,
    orderId: '#1025',
    customer: 'Aarti Desai',
    phone: '+91 98765 43213',
    thumbs: ['/images/product-9.jpg', '/images/product-10.jpg', '/images/product-11.jpg'],
    extraCount: null,
    itemsCount: '4 items',
    amount: '₹1,860',
    payment: 'Paid',
    paymentBg: '#E6F6EC',
    paymentColor: '#1E824C',
    state: 'Delivered',
    stateBg: '#E6F6EC',
    stateColor: '#1E824C',
    date: '15 Oct 2026',
    time: '06:42 PM',
  },
  {
    id: 5,
    orderId: '#1024',
    customer: 'Kunal Jain',
    phone: '+91 98765 43214',
    thumbs: ['/images/product-3.jpg', '/images/product-5.jpg', '/images/product-12.jpg'],
    extraCount: null,
    itemsCount: '1 item',
    amount: '₹650',
    payment: 'Paid',
    paymentBg: '#E6F6EC',
    paymentColor: '#1E824C',
    state: 'Shipped',
    stateBg: '#E6F6EC',
    stateColor: '#1E824C',
    date: '15 Oct 2026',
    time: '04:12 PM',
  },
  {
    id: 6,
    orderId: '#1023',
    customer: 'Sneha Patel',
    phone: '+91 98765 43215',
    thumbs: ['/images/product-1.jpg', '/images/product-4.jpg', '/images/product-8.jpg'],
    extraCount: '+2',
    itemsCount: '6 items',
    amount: '₹3,120',
    payment: 'Paid',
    paymentBg: '#E6F6EC',
    paymentColor: '#1E824C',
    state: 'Pending',
    stateBg: '#FFF4E5',
    stateColor: '#D9822B',
    date: '14 Oct 2026',
    time: '03:54 PM',
  },
  {
    id: 7,
    orderId: '#1022',
    customer: 'Mehul Trivedi',
    phone: '+91 98765 43216',
    thumbs: ['/images/product-6.jpg', '/images/product-7.jpg'],
    extraCount: null,
    itemsCount: '2 items',
    amount: '₹1,199',
    payment: 'COD',
    paymentBg: '#FCE8EE',
    paymentColor: '#C8234B',
    state: 'Shipped',
    stateBg: '#E6F6EC',
    stateColor: '#1E824C',
    date: '14 Oct 2026',
    time: '12:28 PM',
  },
  {
    id: 8,
    orderId: '#1021',
    customer: 'Pooja Kulkarni',
    phone: '+91 98765 43217',
    thumbs: ['/images/product-2.jpg', '/images/product-9.jpg', '/images/product-10.jpg'],
    extraCount: null,
    itemsCount: '4 items',
    amount: '₹2,450',
    payment: 'Paid',
    paymentBg: '#E6F6EC',
    paymentColor: '#1E824C',
    state: 'Delivered',
    stateBg: '#E6F6EC',
    stateColor: '#1E824C',
    date: '13 Oct 2026',
    time: '11:16 AM',
  },
  {
    id: 9,
    orderId: '#1020',
    customer: 'Rohan Sharma',
    phone: '+91 98765 43218',
    thumbs: ['/images/product-1.jpg', '/images/product-3.jpg', '/images/product-11.jpg'],
    extraCount: null,
    itemsCount: '1 item',
    amount: '₹899',
    payment: 'Paid',
    paymentBg: '#E6F6EC',
    paymentColor: '#1E824C',
    state: 'Cancelled',
    stateBg: '#FCE8EE',
    stateColor: '#C8234B',
    date: '12 Oct 2026',
    time: '05:48 PM',
  },
  {
    id: 10,
    orderId: '#1019',
    customer: 'Vidhi Dave',
    phone: '+91 98765 43219',
    thumbs: ['/images/product-4.jpg', '/images/product-8.jpg', '/images/product-12.jpg'],
    extraCount: '+1',
    itemsCount: '3 items',
    amount: '₹1,760',
    payment: 'Paid',
    paymentBg: '#E6F6EC',
    paymentColor: '#1E824C',
    state: 'Delivered',
    stateBg: '#E6F6EC',
    stateColor: '#1E824C',
    date: '12 Oct 2026',
    time: '01:22 PM',
  },
];

const RECENT_ORDERS = [
  { orderId: '#1028', customer: 'Pooja Shah', amount: '₹1,240', state: 'Processing', stateBg: '#FFF4E5', stateColor: '#D9822B', thumb: '/images/product-1.jpg' },
  { orderId: '#1027', customer: 'Neha Patel', amount: '₹2,580', state: 'Shipped', stateBg: '#E6F6EC', stateColor: '#1E824C', thumb: '/images/product-4.jpg' },
  { orderId: '#1026', customer: 'Riya Mehta', amount: '₹980', state: 'Processing', stateBg: '#FFF4E5', stateColor: '#D9822B', thumb: '/images/product-2.jpg' },
  { orderId: '#1025', customer: 'Aarti Desai', amount: '₹1,860', state: 'Delivered', stateBg: '#E6F6EC', stateColor: '#1E824C', thumb: '/images/product-9.jpg' },
  { orderId: '#1024', customer: 'Kunal Jain', amount: '₹650', state: 'Shipped', stateBg: '#E6F6EC', stateColor: '#1E824C', thumb: '/images/product-5.jpg' },
];

export default function AdminOrdersPage() {
  const { pathname } = useLocation();
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [paymentFilter, setPaymentFilter] = useState('All Payment Methods');
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  // Sync statusFilter when visiting /admin/orders/pending, /admin/orders/processing, /admin/orders/shipped
  useEffect(() => {
    if (pathname.endsWith('/pending')) {
      setStatusFilter('Pending');
    } else if (pathname.endsWith('/processing')) {
      setStatusFilter('Processing');
    } else if (pathname.endsWith('/shipped')) {
      setStatusFilter('Shipped');
    } else {
      setStatusFilter('All Status');
    }
  }, [pathname]);

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
    const matchesStatus = statusFilter === 'All Status' || item.state === statusFilter;
    const matchesPayment =
      paymentFilter === 'All Payment Methods' || item.payment === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
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

  const handleExport = () => {
    const csv = [
      ['Order ID', 'Customer', 'Phone', 'Items', 'Amount', 'Payment', 'State', 'Date'].join(','),
      ...filteredItems.map((o) =>
        [o.orderId, `"${o.customer}"`, `"${o.phone}"`, `"${o.itemsCount}"`, `"${o.amount}"`, o.payment, o.state, `"${o.date} ${o.time}"`].join(',')
      ),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arc-legacy-orders.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Orders exported to CSV.');
  };

  const handleCycleState = (id) => {
    const cycle = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    const styleMap = {
      Pending: { bg: '#FFF4E5', color: '#D9822B' },
      Processing: { bg: '#FFF4E5', color: '#D9822B' },
      Shipped: { bg: '#E6F6EC', color: '#1E824C' },
      Delivered: { bg: '#E6F6EC', color: '#1E824C' },
      Cancelled: { bg: '#FCE8EE', color: '#C8234B' },
    };
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const nextState = cycle[(cycle.indexOf(o.state) + 1) % cycle.length];
        return {
          ...o,
          state: nextState,
          stateBg: styleMap[nextState].bg,
          stateColor: styleMap[nextState].color,
        };
      })
    );
    showToast('Order status updated.');
  };

  const breadcrumbLabel = pathname.endsWith('/pending')
    ? 'Pending Orders'
    : pathname.endsWith('/processing')
      ? 'Processing Orders'
      : pathname.endsWith('/shipped')
        ? 'Shipped Orders'
        : pathname.endsWith('/returns')
          ? 'Return & Refunds'
          : 'All Orders';

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
        <span className="text-[#1E3A5F] font-medium">{breadcrumbLabel}</span>
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
              {breadcrumbLabel === 'All Orders' ? 'Orders' : breadcrumbLabel}
            </h1>
            <p className="text-[12.5px] text-[#4A6B8C] mt-0.5">
              Manage and track all <span className="font-semibold text-[#1E3A5F]">customer orders</span> in one place.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 bg-white hover:bg-[#FDF2F4] text-[#B8294B] border border-[#E5B8C5] text-[12.5px] font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer"
        >
          <AdminIcon name="download" size={15} />
          <span>Export Orders</span>
        </button>
      </div>

      {/* Main Grid: Left Content + Right Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5 items-start">
        {/* Left Column */}
        <div className="space-y-4 min-w-0">
          {/* 6 KPI Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {/* Total Orders */}
            <div
              onClick={() => setStatusFilter('All Status')}
              className="bg-white rounded-xl border border-[#F2E2E6] p-3 shadow-2xs flex items-center gap-2.5 cursor-pointer hover:border-[#D4A3B0] transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#FCE8EE] flex items-center justify-center text-[#C8234B] shrink-0">
                <AdminIcon name="orders" size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-[10.5px] text-[#4A6B8C] font-medium truncate">Total Orders</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[19px] font-bold text-[#142C4C] leading-none">128</span>
                  <span className="inline-flex items-center text-[10px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={9} strokeWidth={2.4} />
                    12%
                  </span>
                </div>
                <p className="text-[9.5px] text-[#6C849D] mt-0.5 truncate">vs last month</p>
              </div>
            </div>

            {/* Pending Orders */}
            <div
              onClick={() => setStatusFilter('Pending')}
              className="bg-white rounded-xl border border-[#F2E2E6] p-3 shadow-2xs flex items-center gap-2.5 cursor-pointer hover:border-[#D4A3B0] transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#FFF4E5] flex items-center justify-center text-[#D9822B] shrink-0">
                <AdminIcon name="clock" size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-[10.5px] text-[#4A6B8C] font-medium truncate">Pending Orders</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[19px] font-bold text-[#142C4C] leading-none">24</span>
                  <span className="inline-flex items-center text-[10px] font-semibold text-[#D94B4B]">
                    <AdminIcon name="arrow-down" size={9} strokeWidth={2.4} />
                    8%
                  </span>
                </div>
                <p className="text-[9.5px] text-[#6C849D] mt-0.5 truncate">awaiting confirmation</p>
              </div>
            </div>

            {/* Processing Orders */}
            <div
              onClick={() => setStatusFilter('Processing')}
              className="bg-white rounded-xl border border-[#F2E2E6] p-3 shadow-2xs flex items-center gap-2.5 cursor-pointer hover:border-[#D4A3B0] transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#FFF4E5] flex items-center justify-center text-[#D9822B] shrink-0">
                <AdminIcon name="products" size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-[10.5px] text-[#4A6B8C] font-medium truncate">Processing Orders</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[19px] font-bold text-[#142C4C] leading-none">18</span>
                  <span className="inline-flex items-center text-[10px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={9} strokeWidth={2.4} />
                    20%
                  </span>
                </div>
                <p className="text-[9.5px] text-[#6C849D] mt-0.5 truncate">being prepared</p>
              </div>
            </div>

            {/* Shipped Orders */}
            <div
              onClick={() => setStatusFilter('Shipped')}
              className="bg-white rounded-xl border border-[#F2E2E6] p-3 shadow-2xs flex items-center gap-2.5 cursor-pointer hover:border-[#D4A3B0] transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#FCE8F6] flex items-center justify-center text-[#A8238E] shrink-0">
                <AdminIcon name="truck" size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-[10.5px] text-[#4A6B8C] font-medium truncate">Shipped Orders</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[19px] font-bold text-[#142C4C] leading-none">46</span>
                  <span className="inline-flex items-center text-[10px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={9} strokeWidth={2.4} />
                    15%
                  </span>
                </div>
                <p className="text-[9.5px] text-[#6C849D] mt-0.5 truncate">in transit</p>
              </div>
            </div>

            {/* Delivered Orders */}
            <Link
              to="/admin/orders/delivered"
              className="bg-white rounded-xl border border-[#F2E2E6] p-3 shadow-2xs flex items-center gap-2.5 hover:border-[#D4A3B0] transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#E6F6EC] flex items-center justify-center text-[#28A745] shrink-0">
                <AdminIcon name="check-circle" size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-[10.5px] text-[#4A6B8C] font-medium truncate">Delivered Orders</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[19px] font-bold text-[#142C4C] leading-none">36</span>
                  <span className="inline-flex items-center text-[10px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={9} strokeWidth={2.4} />
                    28%
                  </span>
                </div>
                <p className="text-[9.5px] text-[#6C849D] mt-0.5 truncate">completed</p>
              </div>
            </Link>

            {/* Cancelled Orders */}
            <Link
              to="/admin/orders/cancelled"
              className="bg-white rounded-xl border border-[#F2E2E6] p-3 shadow-2xs flex items-center gap-2.5 hover:border-[#D4A3B0] transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#FCE8EE] flex items-center justify-center text-[#C8234B] shrink-0">
                <AdminIcon name="x-circle" size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-[10.5px] text-[#4A6B8C] font-medium truncate">Cancelled Orders</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[19px] font-bold text-[#142C4C] leading-none">4</span>
                  <span className="inline-flex items-center text-[10px] font-semibold text-[#D94B4B]">
                    <AdminIcon name="arrow-down" size={9} strokeWidth={2.4} />
                    33%
                  </span>
                </div>
                <p className="text-[9.5px] text-[#6C849D] mt-0.5 truncate">cancelled by customer</p>
              </div>
            </Link>
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
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2 text-[12px] text-[#1E3A5F] font-medium focus:outline-none focus:border-[#D4A3B0] cursor-pointer"
                >
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
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
                <AdminIcon name="calendar" size={14} className="text-[#4A6B8C]" />
                <span>Select Date Range</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('All Status');
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
                    <th className="py-2.5 px-3 min-w-[140px]">Items</th>
                    <th className="py-2.5 px-2.5">Amount</th>
                    <th className="py-2.5 px-2.5">Payment</th>
                    <th className="py-2.5 px-2.5 text-center">Status</th>
                    <th className="py-2.5 px-2.5 text-center">State</th>
                    <th className="py-2.5 px-2.5 min-w-[95px]">Date & Time</th>
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
                      <td className="py-3 px-2.5 text-[#4A6B8C] text-[11.5px]">{item.itemsCount}</td>
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
                          onClick={() => handleCycleState(item.id)}
                          title="Click to update order state"
                          className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold min-w-[68px] cursor-pointer"
                          style={{ backgroundColor: item.stateBg, color: item.stateColor }}
                        >
                          {item.state}
                        </button>
                      </td>
                      <td className="py-3 px-2.5 whitespace-nowrap">
                        <p className="text-[11px] text-[#1E3A5F]">{item.date}</p>
                        <p className="text-[10px] text-[#6C849D]">{item.time}</p>
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
                            onClick={() => setActiveOrder(item)}
                            title="Edit Order"
                            className="w-6 h-6 rounded-md border border-[#F3E2E6] bg-[#FDF8F9] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="edit" size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCycleState(item.id)}
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
              <span>Showing 1 – {filteredItems.length} of 128 orders</span>

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
                {[2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    type="button"
                    className="w-7 h-7 rounded-md border border-[#E5E7EB] text-[#1E3A5F] hover:bg-[#FDF2F4] font-medium flex items-center justify-center cursor-pointer"
                  >
                    {page}
                  </button>
                ))}
                <span className="px-1 text-[#6C849D]">...</span>
                <button
                  type="button"
                  className="w-7 h-7 rounded-md border border-[#E5E7EB] text-[#1E3A5F] hover:bg-[#FDF2F4] font-medium flex items-center justify-center cursor-pointer"
                >
                  13
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
          {/* Order Status Breakdown Donut */}
          <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#C8234B]">
                <AdminIcon name="floral" size={15} />
              </span>
              <h3
                className="text-[13.5px] font-bold text-[#B8294B]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Order Status Breakdown
              </h3>
            </div>

            <div className="flex items-center justify-between gap-2.5">
              <div className="relative w-[112px] h-[112px] shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F6EAEE" strokeWidth="4.8" />
                  {/* Pending 19% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#F48FB1"
                    strokeWidth="4.8"
                    strokeDasharray="16.7 88"
                    strokeDashoffset="0"
                  />
                  {/* Processing 14% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#FFE082"
                    strokeWidth="4.8"
                    strokeDasharray="12.3 88"
                    strokeDashoffset="-16.7"
                  />
                  {/* Shipped 36% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#81C784"
                    strokeWidth="4.8"
                    strokeDasharray="31.7 88"
                    strokeDashoffset="-29"
                  />
                  {/* Delivered 28% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#A5D6A7"
                    strokeWidth="4.8"
                    strokeDasharray="24.6 88"
                    strokeDashoffset="-60.7"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
                  <span className="text-[16px] font-bold text-[#142C4C]">128</span>
                  <span className="text-[9.5px] text-[#4A6B8C]">Total Orders</span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1 text-[10.5px]">
                {[
                  { label: 'Pending', count: '24 (19%)', color: '#F48FB1' },
                  { label: 'Processing', count: '18 (14%)', color: '#FFE082' },
                  { label: 'Shipped', count: '46 (36%)', color: '#66BB6A' },
                  { label: 'Delivered', count: '36 (28%)', color: '#43A047' },
                  { label: 'Cancelled', count: '4 (3%)', color: '#E57373' },
                ].map((s) => (
                  <div key={s.label} className="flex items-start gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full mt-1 shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                    <div>
                      <p className="font-semibold text-[#1E3A5F] leading-tight">{s.label}</p>
                      <p className="text-[#6C849D] text-[10px]">{s.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[#C8234B]">
                  <AdminIcon name="floral" size={14} />
                </span>
                <h3
                  className="text-[13px] font-bold text-[#B8294B]"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Recent Orders
                </h3>
              </div>
              <Link
                to="/admin/orders"
                className="text-[10.5px] font-semibold text-[#B8294B] hover:underline inline-flex items-center gap-0.5"
              >
                <span>View All</span>
                <AdminIcon name="arrow-right" size={10} />
              </Link>
            </div>

            <div className="space-y-2.5">
              {RECENT_ORDERS.map((ord) => (
                <div
                  key={ord.orderId}
                  className="flex items-center justify-between gap-2 py-1 border-b border-[#F8EEF0] last:border-0"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#E5E7EB] shrink-0 bg-[#FAF7F5]">
                      <img src={ord.thumb} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-[#1E3A5F] leading-tight">
                        {ord.orderId}
                      </p>
                      <p className="text-[10px] text-[#6C849D] truncate">{ord.customer}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#1E3A5F] shrink-0">
                    {ord.amount}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-[9.5px] font-semibold shrink-0"
                    style={{ backgroundColor: ord.stateBg, color: ord.stateColor }}
                  >
                    {ord.state}
                  </span>
                </div>
              ))}
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
                onClick={() => showToast('Create Order form opened.')}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#FDF6F8] hover:bg-[#FCE8EE] border border-[#F3E2E6] py-3 px-2 text-center transition-colors cursor-pointer"
              >
                <span className="text-[#B8294B]">
                  <AdminIcon name="plus-circle" size={17} />
                </span>
                <span className="text-[11px] font-semibold text-[#1E3A5F]">Create Order</span>
              </button>

              <button
                type="button"
                onClick={handleExport}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#FDF6F8] hover:bg-[#FCE8EE] border border-[#F3E2E6] py-3 px-2 text-center transition-colors cursor-pointer"
              >
                <span className="text-[#B8294B]">
                  <AdminIcon name="download" size={17} />
                </span>
                <span className="text-[11px] font-semibold text-[#1E3A5F]">Export Orders</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#FDF6F8] hover:bg-[#FCE8EE] border border-[#F3E2E6] py-3 px-2 text-center transition-colors cursor-pointer"
              >
                <span className="text-[#B8294B]">
                  <AdminIcon name="printer" size={17} />
                </span>
                <span className="text-[11px] font-semibold text-[#1E3A5F]">Print Invoices</span>
              </button>

              <Link
                to="/admin/orders/returns"
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#FDF6F8] hover:bg-[#FCE8EE] border border-[#F3E2E6] py-3 px-2 text-center transition-colors"
              >
                <span className="text-[#B8294B]">
                  <AdminIcon name="undo" size={17} />
                </span>
                <span className="text-[11px] font-semibold text-[#1E3A5F]">Manage Returns</span>
              </Link>
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

      {/* Order Detail Modal */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#F2E2E6] bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F3E5E8] pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-[#B8294B]" style={{ fontFamily: 'Georgia, serif' }}>
                  Order {activeOrder.orderId}
                </h3>
                <p className="text-xs text-[#6C849D]">
                  {activeOrder.date} at {activeOrder.time}
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
                <span className="text-[#6C849D]">Items</span>
                <span className="font-semibold text-[#1E3A5F]">{activeOrder.itemsCount}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#F8EEF0]">
                <span className="text-[#6C849D]">Order Amount</span>
                <span className="font-bold text-[#1E3A5F]">{activeOrder.amount}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#F8EEF0]">
                <span className="text-[#6C849D]">Payment Status</span>
                <span className="font-semibold text-[#1E824C]">{activeOrder.payment}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#6C849D]">Fulfillment State</span>
                <span className="font-semibold text-[#B8294B]">{activeOrder.state}</span>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  handleCycleState(activeOrder.id);
                  setActiveOrder(null);
                }}
                className="rounded-lg border border-[#E5B8C5] px-4 py-2 text-xs font-semibold text-[#B8294B] hover:bg-[#FDF2F4] cursor-pointer"
              >
                Advance State
              </button>
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
