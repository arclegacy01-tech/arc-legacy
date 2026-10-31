import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_SHIPPED_ORDERS = [
  {
    id: '#1020',
    rowNum: 1,
    customer: 'Pooja Shah',
    phone: '+91 98765 43210',
    email: 'pooja.shah@gmail.com',
    address: '204 Shivalik Plaza, CG Road, Ahmedabad, Gujarat 380009',
    items: ['/images/product-1.jpg', '/images/product-4.jpg', '/images/product-2.jpg'],
    extraItems: 1,
    amount: 1240,
    payment: 'Paid',
    shippingPartner: 'Delhivery',
    trackingId: 'DLV123456789',
    shippedDate: '14 Oct 2026',
    shippedTime: '04:12 PM',
    estDelivery: '17 Oct 2026',
    status: 'In Transit',
  },
  {
    id: '#1018',
    rowNum: 2,
    customer: 'Neha Patel',
    phone: '+91 98765 43211',
    email: 'neha.patel@gmail.com',
    address: '12B Gokul Residency, Vesu, Surat, Gujarat 395007',
    items: ['/images/product-5.jpg', '/images/product-8.jpg', '/images/product-6.jpg'],
    extraItems: 2,
    amount: 2580,
    payment: 'COD',
    shippingPartner: 'Blue Dart',
    trackingId: 'BD123456789',
    shippedDate: '14 Oct 2026',
    shippedTime: '11:20 AM',
    estDelivery: '16 Oct 2026',
    status: 'In Transit',
  },
  {
    id: '#1016',
    rowNum: 3,
    customer: 'Riya Mehta',
    phone: '+91 98765 43212',
    email: 'riya.mehta@gmail.com',
    address: '401 Lotus Enclave, Alkapuri, Vadodara, Gujarat 390007',
    items: ['/images/product-3.jpg', '/images/product-10.jpg', '/images/product-11.jpg'],
    extraItems: 0,
    amount: 980,
    payment: 'Paid',
    shippingPartner: 'Ekart',
    trackingId: 'EK123456789',
    shippedDate: '13 Oct 2026',
    shippedTime: '06:42 PM',
    estDelivery: '16 Oct 2026',
    status: 'In Transit',
  },
  {
    id: '#1014',
    rowNum: 4,
    customer: 'Aarti Desai',
    phone: '+91 98765 43213',
    email: 'aarti.desai@gmail.com',
    address: '78 Heritage Villa, Kalawad Road, Rajkot, Gujarat 360005',
    items: ['/images/product-12.jpg', '/images/product-7.jpg', '/images/product-9.jpg'],
    extraItems: 1,
    amount: 1860,
    payment: 'COD',
    shippingPartner: 'DTDC',
    trackingId: 'DTDC1234567',
    shippedDate: '13 Oct 2026',
    shippedTime: '12:18 PM',
    estDelivery: '16 Oct 2026',
    status: 'In Transit',
  },
  {
    id: '#1012',
    rowNum: 5,
    customer: 'Kunal Jain',
    phone: '+91 98765 43214',
    email: 'kunal.jain@gmail.com',
    address: '902 Orchid Heights, Malad West, Mumbai, Maharashtra 400064',
    items: ['/images/product-2.jpg', '/images/product-8.jpg', '/images/product-4.jpg'],
    extraItems: 0,
    amount: 650,
    payment: 'Paid',
    shippingPartner: 'Delhivery',
    trackingId: 'DLV987654321',
    shippedDate: '12 Oct 2026',
    shippedTime: '05:34 PM',
    estDelivery: '15 Oct 2026',
    status: 'Out for Delivery',
  },
  {
    id: '#1011',
    rowNum: 6,
    customer: 'Sneha Patel',
    phone: '+91 98765 43215',
    email: 'sneha.patel@gmail.com',
    address: '34 Royal Palms, Bodakdev, Ahmedabad, Gujarat 380054',
    items: ['/images/product-6.jpg', '/images/product-5.jpg', '/images/product-11.jpg'],
    extraItems: 3,
    amount: 3120,
    payment: 'Paid',
    shippingPartner: 'Blue Dart',
    trackingId: 'BD987654321',
    shippedDate: '12 Oct 2026',
    shippedTime: '03:42 PM',
    estDelivery: '15 Oct 2026',
    status: 'In Transit',
  },
  {
    id: '#1009',
    rowNum: 7,
    customer: 'Mehul Trivedi',
    phone: '+91 98765 43216',
    email: 'mehul.trivedi@gmail.com',
    address: '15 Surya Complex, Satellite, Ahmedabad, Gujarat 380015',
    items: ['/images/product-1.jpg', '/images/product-9.jpg'],
    extraItems: 0,
    amount: 1199,
    payment: 'Paid',
    shippingPartner: 'Ekart',
    trackingId: 'EK987654321',
    shippedDate: '11 Oct 2026',
    shippedTime: '01:28 PM',
    estDelivery: '14 Oct 2026',
    status: 'Delivered',
  },
  {
    id: '#1007',
    rowNum: 8,
    customer: 'Pooja Kulkarni',
    phone: '+91 98765 43217',
    email: 'pooja.kulkarni@gmail.com',
    address: '502 Kalyani Residency, Kothrud, Pune, Maharashtra 411038',
    items: ['/images/product-3.jpg', '/images/product-10.jpg', '/images/product-7.jpg'],
    extraItems: 1,
    amount: 2450,
    payment: 'COD',
    shippingPartner: 'DTDC',
    trackingId: 'DTDC9876543',
    shippedDate: '11 Oct 2026',
    shippedTime: '10:15 AM',
    estDelivery: '14 Oct 2026',
    status: 'In Transit',
  },
  {
    id: '#1005',
    rowNum: 9,
    customer: 'Rohan Sharma',
    phone: '+91 98765 43218',
    email: 'rohan.sharma@gmail.com',
    address: '88 Pink City Enclave, C-Scheme, Jaipur, Rajasthan 302001',
    items: ['/images/product-1.jpg', '/images/product-4.jpg', '/images/product-2.jpg'],
    extraItems: 0,
    amount: 899,
    payment: 'Paid',
    shippingPartner: 'Delhivery',
    trackingId: 'DLV456789123',
    shippedDate: '10 Oct 2026',
    shippedTime: '04:48 PM',
    estDelivery: '13 Oct 2026',
    status: 'Delivered',
  },
  {
    id: '#1003',
    rowNum: 10,
    customer: 'Vidhi Dave',
    phone: '+91 98765 43219',
    email: 'vidhi.dave@gmail.com',
    address: '19B Ashirwad Bunglows, Prahlad Nagar, Ahmedabad 380015',
    items: ['/images/product-5.jpg', '/images/product-12.jpg', '/images/product-6.jpg'],
    extraItems: 2,
    amount: 1760,
    payment: 'Paid',
    shippingPartner: 'Blue Dart',
    trackingId: 'BD456789123',
    shippedDate: '10 Oct 2026',
    shippedTime: '11:22 AM',
    estDelivery: '13 Oct 2026',
    status: 'In Transit',
  },
];

const RECENT_SHIPPED_ORDERS = [
  { id: '#1020', customer: 'Pooja Shah', status: 'In Transit', time: '14 Oct 2026, 04:12 PM', img: '/images/product-1.jpg' },
  { id: '#1018', customer: 'Neha Patel', status: 'In Transit', time: '14 Oct 2026, 11:20 AM', img: '/images/product-5.jpg' },
  { id: '#1016', customer: 'Riya Mehta', status: 'In Transit', time: '13 Oct 2026, 06:42 PM', img: '/images/product-12.jpg' },
  { id: '#1014', customer: 'Aarti Desai', status: 'In Transit', time: '13 Oct 2026, 12:18 PM', img: '/images/product-3.jpg' },
  { id: '#1012', customer: 'Kunal Jain', status: 'Out for Delivery', time: '12 Oct 2026, 05:34 PM', img: '/images/product-6.jpg' },
];

const STATUS_BADGE = {
  'In Transit': 'bg-[#FFF5E2] text-[#D98218]',
  'Out for Delivery': 'bg-[#EFE6FA] text-[#8048C5]',
  Delivered: 'bg-[#E2F6EB] text-[#1D8852]',
};

const PARTNER_BADGE = {
  Delhivery: 'bg-[#FDEBF3] text-[#C8286E]',
  'Blue Dart': 'bg-[#E3F1FC] text-[#286EC8]',
  Ekart: 'bg-[#FFF5E2] text-[#D98218]',
  DTDC: 'bg-[#EFE6FA] text-[#8048C5]',
};

export default function AdminShippedOrdersPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [orders, setOrders] = useState(INITIAL_SHIPPED_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [partnerFilter, setPartnerFilter] = useState('All Shipping Partners');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [paymentFilter, setPaymentFilter] = useState('All Payment Methods');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        !effectiveSearch ||
        o.id.toLowerCase().includes(effectiveSearch) ||
        o.customer.toLowerCase().includes(effectiveSearch) ||
        o.trackingId.toLowerCase().includes(effectiveSearch) ||
        o.shippingPartner.toLowerCase().includes(effectiveSearch);
      const matchesPartner =
        partnerFilter === 'All Shipping Partners' || o.shippingPartner === partnerFilter;
      const matchesPayment =
        paymentFilter === 'All Payment Methods' || o.payment === paymentFilter;
      const matchesDate =
        dateFilter === 'All Dates' || o.shippedDate === dateFilter;
      return matchesSearch && matchesPartner && matchesPayment && matchesDate;
    });
  }, [orders, effectiveSearch, partnerFilter, paymentFilter, dateFilter]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredOrders.length && filteredOrders.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredOrders.map((o) => o.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleMarkDelivered = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Delivered' } : o))
    );
    triggerToast(`Order ${orderId} updated to Delivered.`);
  };

  const handleExportCsv = () => {
    const headers = ['Order ID', 'Customer', 'Phone', 'Amount', 'Payment', 'Shipping Partner', 'Tracking ID', 'Shipped Date', 'Est. Delivery', 'Status'];
    const rows = filteredOrders.map((o) => [
      o.id,
      `"${o.customer}"`,
      `"${o.phone}"`,
      o.amount,
      o.payment,
      `"${o.shippingPartner}"`,
      o.trackingId,
      `"${o.shippedDate} ${o.shippedTime}"`,
      o.estDelivery,
      o.status,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arc-legacy-shipped-orders.csv';
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Shipped orders exported to CSV.');
  };

  // SVG Donut Calculations (Total 46: In Transit 28 (61%), Out for Delivery 10 (22%), Delivered 8 (17%))
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const segments = [
    { label: 'In Transit', count: 28, pct: 61, color: '#F6BA6F' },
    { label: 'Out for Delivery', count: 10, pct: 22, color: '#B49CF2' },
    { label: 'Delivered', count: 8, pct: 17, color: '#6AC496' },
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
            <span className="text-[#4A3439] font-medium">Shipped Orders</span>
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
                Shipped Orders
              </h1>
              <p className="text-[12.5px] text-[#7A6268] mt-0.5">
                Track shipped orders, shipping partners and estimated delivery dates.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E6D3D8] text-[#8E1838] text-[12.5px] font-semibold hover:bg-[#FDF5F7] transition-colors shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <AdminIcon name="download" size={15} className="text-[#A91D48]" />
          Export Shipped Orders
        </button>
      </div>

      {/* Main Layout: Left 3/4 Content + Right 1/4 Widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Main Area */}
        <div className="xl:col-span-9 space-y-5">
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Shipped Orders */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#FDEBF1] flex items-center justify-center text-[#B82050] shrink-0">
                <AdminIcon name="truck" size={22} />
              </div>
              <div>
                <p className="text-[11.5px] font-medium text-[#7A6268]">Shipped Orders</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#2C1E21] leading-none">46</span>
                  <span className="text-[11px] font-semibold text-[#1D8852] flex items-center gap-0.5">
                    <AdminIcon name="arrow-up" size={10} />
                    28%
                  </span>
                </div>
                <p className="text-[10.5px] text-[#9A8187] mt-1">vs last week</p>
              </div>
            </div>

            {/* Shipped Amount */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#FFF4E4] flex items-center justify-center text-[#D98218] shrink-0">
                <AdminIcon name="rupee" size={22} />
              </div>
              <div>
                <p className="text-[11.5px] font-medium text-[#7A6268]">Shipped Amount</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[22px] font-bold text-[#2C1E21] leading-none">₹78,420</span>
                </div>
                <p className="text-[10.5px] text-[#9A8187] mt-1">total value</p>
              </div>
            </div>

            {/* Avg. Order Value */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#F9EBFA] flex items-center justify-center text-[#A033B8] shrink-0">
                <AdminIcon name="orders" size={21} />
              </div>
              <div>
                <p className="text-[11.5px] font-medium text-[#7A6268]">Avg. Order Value</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[22px] font-bold text-[#2C1E21] leading-none">₹1,705</span>
                </div>
                <p className="text-[10.5px] text-[#9A8187] mt-1">per order</p>
              </div>
            </div>

            {/* Avg. Delivery Time */}
            <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#E6F7EE] flex items-center justify-center text-[#1D8852] shrink-0">
                <AdminIcon name="clock" size={21} />
              </div>
              <div>
                <p className="text-[11.5px] font-medium text-[#7A6268]">Avg. Delivery Time</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[22px] font-bold text-[#2C1E21] leading-none">2.8 days</span>
                </div>
                <p className="text-[10.5px] text-[#9A8187] mt-1">to customer</p>
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
                  placeholder="Search by order ID, customer name, tracking ID..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12.5px] text-[#2C1E21] placeholder-[#9A8187] focus:outline-none focus:border-[#A91D48]"
                />
              </div>

              <select
                value={partnerFilter}
                onChange={(e) => setPartnerFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
              >
                <option value="All Shipping Partners">All Shipping Partners</option>
                <option value="Delhivery">Delhivery</option>
                <option value="Blue Dart">Blue Dart</option>
                <option value="Ekart">Ekart</option>
                <option value="DTDC">DTDC</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
              >
                <option value="All Dates">All Dates</option>
                <option value="14 Oct 2026">14 Oct 2026</option>
                <option value="13 Oct 2026">13 Oct 2026</option>
                <option value="12 Oct 2026">12 Oct 2026</option>
                <option value="11 Oct 2026">11 Oct 2026</option>
                <option value="10 Oct 2026">10 Oct 2026</option>
              </select>

              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
              >
                <option value="All Payment Methods">All Payment Methods</option>
                <option value="Paid">Paid</option>
                <option value="COD">COD</option>
              </select>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setPartnerFilter('All Shipping Partners');
                  setDateFilter('All Dates');
                  setPaymentFilter('All Payment Methods');
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
                          filteredOrders.length > 0 &&
                          selectedIds.length === filteredOrders.length
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
                    <th className="py-3 px-2.5">Payment</th>
                    <th className="py-3 px-2.5">Shipping Partner</th>
                    <th className="py-3 px-2.5">Tracking ID</th>
                    <th className="py-3 px-2.5">Shipped Date</th>
                    <th className="py-3 px-2.5">Est. Delivery</th>
                    <th className="py-3 px-2.5">Status</th>
                    <th className="py-3 pl-2.5 pr-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EAEc] text-[12px]">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-[#FDF9FA] transition-colors group"
                    >
                      <td className="py-3 pl-4 pr-2">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(order.id)}
                          onChange={() => toggleSelectOne(order.id)}
                          className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-3 px-2 text-[#7A6268] font-medium">
                        {order.rowNum}
                      </td>
                      <td className="py-3 px-2.5 font-bold text-[#2C1E21]">
                        {order.id}
                      </td>
                      <td className="py-3 px-2.5">
                        <p className="font-bold text-[#2C1E21] leading-tight">
                          {order.customer}
                        </p>
                        <p className="text-[11px] text-[#8C7076] mt-0.5">
                          {order.phone}
                        </p>
                      </td>
                      <td className="py-3 px-2.5">
                        <div className="flex items-center gap-1">
                          {order.items.map((src, idx) => (
                            <img
                              key={idx}
                              src={src}
                              alt="Product"
                              className="w-7 h-7 rounded-md object-cover border border-[#EAE0E2]"
                            />
                          ))}
                          {order.extraItems > 0 && (
                            <span className="w-6 h-6 rounded-md bg-[#F7EFF1] border border-[#E6D6DA] text-[10.5px] font-semibold text-[#6E565C] flex items-center justify-center">
                              +{order.extraItems}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-2.5 font-semibold text-[#2C1E21]">
                        ₹{order.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-2.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                            order.payment === 'Paid'
                              ? 'bg-[#E2F6EB] text-[#1D8852]'
                              : 'bg-[#FDEBF1] text-[#C92A52]'
                          }`}
                        >
                          {order.payment}
                        </span>
                      </td>
                      <td className="py-3 px-2.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                            PARTNER_BADGE[order.shippingPartner] || 'bg-[#F5EFF1] text-[#6E565C]'
                          }`}
                        >
                          {order.shippingPartner}
                        </span>
                      </td>
                      <td className="py-3 px-2.5 text-[#5E474D] text-[11.5px] font-mono">
                        {order.trackingId}
                      </td>
                      <td className="py-3 px-2.5 text-[#5E474D] leading-tight">
                        <p>{order.shippedDate}</p>
                        <p className="text-[10.5px] text-[#8C7076]">{order.shippedTime}</p>
                      </td>
                      <td className="py-3 px-2.5 text-[#5E474D] text-[11.5px]">
                        {order.estDelivery}
                      </td>
                      <td className="py-3 px-2.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                            STATUS_BADGE[order.status] || 'bg-[#FFF5E2] text-[#D98218]'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 pl-2.5 pr-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setViewingOrder(order)}
                            title="View Shipment Details"
                            className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#A91D48] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="eye" size={13.5} />
                          </button>
                          <button
                            onClick={() => setTrackingOrder(order)}
                            title="Track Shipment"
                            className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#A91D48] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="truck" size={13.5} />
                          </button>
                          <button
                            onClick={() => handleMarkDelivered(order.id)}
                            title="Mark as Delivered"
                            className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#7A6268] hover:bg-[#FCE8EE] hover:text-[#A91D48] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="more-vertical" size={13.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan={13} className="py-10 text-center text-[#8C7076]">
                        No shipped orders match your current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-4 py-3.5 border-t border-[#F3E6EA] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#6E565C]">
              <span>
                Showing 1 – {filteredOrders.length} of 46 shipped orders
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
                        ? 'bg-[#A91D48] text-white shadow-xs'
                        : 'border border-[#E6D6DA] bg-white text-[#4A3439] hover:bg-[#FDF5F7]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
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
          {/* Shipment Status Breakdown */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="sparkle" size={14} />
              </span>
              <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                Shipment Status Breakdown
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
                    46
                  </span>
                  <span className="text-[10.5px] text-[#7A6268] mt-1">
                    Shipped Orders
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 flex-1 text-[11.5px]">
                {segments.map((s) => (
                  <div key={s.label} className="flex items-start gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                    <div className="leading-tight">
                      <p className="font-semibold text-[#2C1E21]">{s.label}</p>
                      <p className="text-[#7A6268] text-[11px]">
                        {s.count} ({s.pct}%)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Shipping Partners */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="truck" size={14} />
              </span>
              <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                Top Shipping Partners
              </h3>
            </div>

            <div className="space-y-2.5 text-[12px]">
              {[
                { name: 'Delhivery', count: '16 (35%)', badge: 'bg-[#FDEBF3] text-[#C8286E]' },
                { name: 'Blue Dart', count: '12 (26%)', badge: 'bg-[#E3F1FC] text-[#286EC8]' },
                { name: 'Ekart', count: '8 (17%)', badge: 'bg-[#FFF5E2] text-[#D98218]' },
                { name: 'DTDC', count: '6 (13%)', badge: 'bg-[#EFE6FA] text-[#8048C5]' },
                { name: 'Others', count: '4 (9%)', badge: 'bg-[#E2F6EB] text-[#1D8852]' },
              ].map((partner) => (
                <div
                  key={partner.name}
                  onClick={() =>
                    setPartnerFilter(
                      partner.name === 'Others' ? 'All Shipping Partners' : partner.name
                    )
                  }
                  className="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-[#FDF7F8] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center ${partner.badge}`}
                    >
                      <AdminIcon name="truck" size={11} />
                    </span>
                    <span className="font-medium text-[#2C1E21]">{partner.name}</span>
                  </div>
                  <span className="text-[11.5px] font-semibold text-[#5E474D]">
                    {partner.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Shipped Orders */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                  <AdminIcon name="orders" size={14} />
                </span>
                <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                  Recent Shipped Orders
                </h3>
              </div>
              <Link
                to="/admin/orders"
                className="text-[11px] font-semibold text-[#A91D48] hover:underline flex items-center gap-0.5"
              >
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {RECENT_SHIPPED_ORDERS.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2.5 text-[11.5px]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.img}
                      alt={item.customer}
                      className="w-9 h-9 rounded-lg object-cover border border-[#EADcdf] shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-bold text-[#2C1E21] leading-tight">
                        {item.id}
                      </p>
                      <p className="text-[#7A6268] text-[11px] truncate">
                        {item.customer}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        STATUS_BADGE[item.status]
                      }`}
                    >
                      {item.status}
                    </span>
                    <p className="text-[9.5px] text-[#9A8187] mt-0.5">{item.time}</p>
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
              Have questions about shipped orders? Contact our support team for assistance.
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

      {/* View Shipment Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#EFE0E4] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F3E6EA] pb-3 mb-4">
              <div>
                <h3 className="text-[16px] font-bold text-[#8E1838]">
                  Shipped Order {viewingOrder.id}
                </h3>
                <p className="text-[12px] text-[#7A6268]">
                  {viewingOrder.customer} • {viewingOrder.phone}
                </p>
              </div>
              <button
                onClick={() => setViewingOrder(null)}
                className="w-8 h-8 rounded-lg bg-[#FDF5F7] text-[#8E1838] flex items-center justify-center cursor-pointer"
              >
                <AdminIcon name="x" size={16} />
              </button>
            </div>
            <div className="space-y-3 text-[12.5px] text-[#4A3439]">
              <p>
                <span className="font-semibold">Delivery Address:</span> {viewingOrder.address}
              </p>
              <div className="grid grid-cols-2 gap-2 bg-[#FDF8F9] p-3 rounded-xl border border-[#F1E2E6]">
                <div>
                  <span className="text-[11px] text-[#8C7076] block">Courier Partner</span>
                  <span className="font-bold text-[#8E1838]">{viewingOrder.shippingPartner}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#8C7076] block">Tracking ID</span>
                  <span className="font-mono font-bold text-[#2C1E21]">{viewingOrder.trackingId}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#8C7076] block">Shipped On</span>
                  <span className="font-semibold">{viewingOrder.shippedDate}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#8C7076] block">Est. Delivery</span>
                  <span className="font-semibold">{viewingOrder.estDelivery}</span>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setViewingOrder(null)}
                className="px-4 py-2 rounded-xl border border-[#E6D6DA] text-[12.5px] font-semibold text-[#4A3439] cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleMarkDelivered(viewingOrder.id);
                  setViewingOrder(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#A91D48] text-white text-[12.5px] font-semibold cursor-pointer"
              >
                Mark as Delivered
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Tracking Modal */}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#EFE0E4] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F3E6EA] pb-3 mb-4">
              <div>
                <h3 className="text-[16px] font-bold text-[#8E1838]">
                  Live Tracking — {trackingOrder.id}
                </h3>
                <p className="text-[12px] text-[#7A6268]">
                  {trackingOrder.shippingPartner} • AWB: {trackingOrder.trackingId}
                </p>
              </div>
              <button
                onClick={() => setTrackingOrder(null)}
                className="w-8 h-8 rounded-lg bg-[#FDF5F7] text-[#8E1838] flex items-center justify-center cursor-pointer"
              >
                <AdminIcon name="x" size={16} />
              </button>
            </div>
            <div className="space-y-3 text-[12.5px] text-[#4A3439]">
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1D8852] mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-[#2C1E21]">Dispatched from ARC Legacy Surat Hub</p>
                  <p className="text-[11px] text-[#8C7076]">{trackingOrder.shippedDate}, {trackingOrder.shippedTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D98218] mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-[#2C1E21]">Current Status: {trackingOrder.status}</p>
                  <p className="text-[11px] text-[#8C7076]">Estimated Delivery: {trackingOrder.estDelivery}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setTrackingOrder(null)}
                className="px-4 py-2 rounded-xl bg-[#A91D48] text-white text-[12.5px] font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

