import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_CUSTOMERS = [
  {
    id: 1,
    name: 'Pooja Shah',
    code: '#CUS001',
    initials: 'PS',
    avatarBg: '#FDF2F4',
    avatarColor: '#B8294B',
    email: 'pooja.shah@gmail.com',
    phone: '+91 98765 43210',
    orders: 12,
    totalSpent: '₹15,620',
    lastOrder: '14 Oct 2026',
    group: 'VIP',
    groupBg: '#FCE8EE',
    groupColor: '#B8294B',
    status: 'Active',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 2,
    name: 'Neha Patel',
    code: '#CUS002',
    initials: 'NP',
    avatarBg: '#FFF4E5',
    avatarColor: '#D9822B',
    email: 'neha.patel@gmail.com',
    phone: '+91 98765 43211',
    orders: 8,
    totalSpent: '₹9,840',
    lastOrder: '13 Oct 2026',
    group: 'Regular',
    groupBg: '#E8F2FC',
    groupColor: '#2563EB',
    status: 'Active',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 3,
    name: 'Riya Mehta',
    code: '#CUS003',
    initials: 'RM',
    avatarBg: '#F3EBFF',
    avatarColor: '#7C4DFF',
    email: 'riya.mehta@gmail.com',
    phone: '+91 98765 43212',
    orders: 5,
    totalSpent: '₹6,520',
    lastOrder: '12 Oct 2026',
    group: 'Regular',
    groupBg: '#E8F2FC',
    groupColor: '#2563EB',
    status: 'Active',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 4,
    name: 'Aarti Desai',
    code: '#CUS004',
    initials: 'AD',
    avatarBg: '#E6F6EC',
    avatarColor: '#1E824C',
    email: 'aarti.desai@gmail.com',
    phone: '+91 98765 43213',
    orders: 3,
    totalSpent: '₹3,980',
    lastOrder: '11 Oct 2026',
    group: 'New',
    groupBg: '#FFF4E5',
    groupColor: '#D9822B',
    status: 'Active',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 5,
    name: 'Kunal Jain',
    code: '#CUS005',
    initials: 'KJ',
    avatarBg: '#E8F2FC',
    avatarColor: '#2563EB',
    email: 'kunal.jain@gmail.com',
    phone: '+91 98765 43214',
    orders: 7,
    totalSpent: '₹8,960',
    lastOrder: '10 Oct 2026',
    group: 'Regular',
    groupBg: '#E8F2FC',
    groupColor: '#2563EB',
    status: 'Active',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 6,
    name: 'Sneha Patel',
    code: '#CUS006',
    initials: 'SP',
    avatarBg: '#FDF2F4',
    avatarColor: '#B8294B',
    email: 'sneha.patel@gmail.com',
    phone: '+91 98765 43215',
    orders: 10,
    totalSpent: '₹12,430',
    lastOrder: '09 Oct 2026',
    group: 'VIP',
    groupBg: '#FCE8EE',
    groupColor: '#B8294B',
    status: 'Active',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 7,
    name: 'Mehul Trivedi',
    code: '#CUS007',
    initials: 'MT',
    avatarBg: '#F1F3F5',
    avatarColor: '#64748B',
    email: 'mehul.trivedi@gmail.com',
    phone: '+91 98765 43216',
    orders: 2,
    totalSpent: '₹2,150',
    lastOrder: '08 Oct 2026',
    group: 'New',
    groupBg: '#FFF4E5',
    groupColor: '#D9822B',
    status: 'Inactive',
    statusBg: '#FCE8EE',
    statusColor: '#C8234B',
  },
  {
    id: 8,
    name: 'Pooja Kulkarni',
    code: '#CUS008',
    initials: 'PK',
    avatarBg: '#FFF4E5',
    avatarColor: '#D9822B',
    email: 'pooja.kulkarni@gmail.com',
    phone: '+91 98765 43217',
    orders: 6,
    totalSpent: '₹7,890',
    lastOrder: '07 Oct 2026',
    group: 'Regular',
    groupBg: '#E8F2FC',
    groupColor: '#2563EB',
    status: 'Active',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 9,
    name: 'Rohan Sharma',
    code: '#CUS009',
    initials: 'RS',
    avatarBg: '#E8F2FC',
    avatarColor: '#2563EB',
    email: 'rohan.sharma@gmail.com',
    phone: '+91 98765 43218',
    orders: 4,
    totalSpent: '₹4,760',
    lastOrder: '06 Oct 2026',
    group: 'Regular',
    groupBg: '#E8F2FC',
    groupColor: '#2563EB',
    status: 'Active',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 10,
    name: 'Vidhi Dave',
    code: '#CUS010',
    initials: 'VD',
    avatarBg: '#FCE8EE',
    avatarColor: '#B8294B',
    email: 'vidhi.dave@gmail.com',
    phone: '+91 98765 43219',
    orders: 9,
    totalSpent: '₹11,240',
    lastOrder: '05 Oct 2026',
    group: 'VIP',
    groupBg: '#FCE8EE',
    groupColor: '#B8294B',
    status: 'Active',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
];

const TOP_CUSTOMERS = [
  { rank: 1, name: 'Pooja Shah', orders: '12 orders', spent: '₹15,620', initials: 'PS', bg: '#FDF2F4', color: '#B8294B' },
  { rank: 2, name: 'Sneha Patel', orders: '10 orders', spent: '₹12,430', initials: 'SP', bg: '#FFF4E5', color: '#D9822B' },
  { rank: 3, name: 'Vidhi Dave', orders: '9 orders', spent: '₹11,240', initials: 'VD', bg: '#F3EBFF', color: '#7C4DFF' },
  { rank: 4, name: 'Neha Patel', orders: '8 orders', spent: '₹9,840', initials: 'NP', bg: '#E6F6EC', color: '#1E824C' },
  { rank: 5, name: 'Kunal Jain', orders: '7 orders', spent: '₹8,960', initials: 'KJ', bg: '#E8F2FC', color: '#2563EB' },
];

const RECENT_CUSTOMERS = [
  { name: 'Aarti Desai', joined: 'Joined 14 Oct 2026', initials: 'AD', bg: '#FDF2F4', color: '#B8294B' },
  { name: 'Rohan Verma', joined: 'Joined 13 Oct 2026', initials: 'RV', bg: '#E8F2FC', color: '#2563EB' },
  { name: 'Kavya Shah', joined: 'Joined 12 Oct 2026', initials: 'KS', bg: '#FFF4E5', color: '#D9822B' },
  { name: 'Tanvi Mehta', joined: 'Joined 12 Oct 2026', initials: 'TM', bg: '#F3EBFF', color: '#7C4DFF' },
  { name: 'Jay Patel', joined: 'Joined 11 Oct 2026', initials: 'JP', bg: '#E6F6EC', color: '#1E824C' },
];

export default function AdminCustomersPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('All Customer Groups');
  const [orderFilter, setOrderFilter] = useState('All Order Count');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeCustomer, setActiveCustomer] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const combinedQuery = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredItems = customers.filter((item) => {
    const matchesSearch =
      !combinedQuery ||
      item.name.toLowerCase().includes(combinedQuery) ||
      item.email.toLowerCase().includes(combinedQuery) ||
      item.phone.includes(combinedQuery) ||
      item.code.toLowerCase().includes(combinedQuery);
    const matchesGroup = groupFilter === 'All Customer Groups' || item.group === groupFilter;
    const matchesStatus = statusFilter === 'All Statuses' || item.status === statusFilter;
    const matchesOrders =
      orderFilter === 'All Order Count' ||
      (orderFilter === '10+ Orders' && item.orders >= 10) ||
      (orderFilter === '5–9 Orders' && item.orders >= 5 && item.orders <= 9) ||
      (orderFilter === '1–4 Orders' && item.orders >= 1 && item.orders <= 4);
    return matchesSearch && matchesGroup && matchesStatus && matchesOrders;
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
    const csvRows = [
      ['ID', 'Name', 'Email', 'Phone', 'Orders', 'Total Spent', 'Group', 'Status'].join(','),
      ...filteredItems.map((c) =>
        [c.code, `"${c.name}"`, c.email, `"${c.phone}"`, c.orders, `"${c.totalSpent}"`, c.group, c.status].join(',')
      ),
    ].join('\n');
    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arc-legacy-customers.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported customers CSV successfully.');
  };

  const handleToggleStatus = (id) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const nextStatus = c.status === 'Active' ? 'Inactive' : 'Active';
        return {
          ...c,
          status: nextStatus,
          statusBg: nextStatus === 'Active' ? '#E6F6EC' : '#FCE8EE',
          statusColor: nextStatus === 'Active' ? '#1E824C' : '#C8234B',
        };
      })
    );
    showToast('Customer status updated.');
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
        <Link to="/admin/customers" className="hover:text-[#B8294B] transition-colors">
          Customers
        </Link>
        <AdminIcon name="chevron-right" size={12} className="text-[#7A93AC]" />
        <span className="text-[#1E3A5F] font-medium">All Customers</span>
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
              All Customers
            </h1>
            <p className="text-[12.5px] text-[#4A6B8C] mt-0.5">
              Manage your customers, view customer details, order history and more.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 bg-white hover:bg-[#FDF2F4] text-[#B8294B] border border-[#E5B8C5] text-[12.5px] font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer"
        >
          <AdminIcon name="download" size={15} />
          <span>Export Customers</span>
        </button>
      </div>

      {/* Main Grid: Left Content + Right Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_285px] gap-5 items-start">
        {/* Left Column */}
        <div className="space-y-4 min-w-0">
          {/* 4 KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Total Customers */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FCE8EE] flex items-center justify-center text-[#C8234B] shrink-0">
                <AdminIcon name="customers" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Total Customers</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">1,248</span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={11} strokeWidth={2.3} />
                    12%
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">vs last month</p>
              </div>
            </div>

            {/* New Customers */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#E6F6EC] flex items-center justify-center text-[#28A745] shrink-0">
                <AdminIcon name="user-plus" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">New Customers</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">186</span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={11} strokeWidth={2.3} />
                    28%
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">this month</p>
              </div>
            </div>

            {/* Repeat Customers */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FCE8F6] flex items-center justify-center text-[#A8238E] shrink-0">
                <AdminIcon name="shopping-bag" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Repeat Customers</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">312</span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={11} strokeWidth={2.3} />
                    18%
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">(2+ orders)</p>
              </div>
            </div>

            {/* Average Order Value */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FFF4E5] flex items-center justify-center text-[#D9822B] shrink-0">
                <AdminIcon name="rupee" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Average Order Value</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">₹1,260</span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={11} strokeWidth={2.3} />
                    25%
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">per customer</p>
              </div>
            </div>
          </div>

          {/* Search & Filters Card */}
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
                  placeholder="Search by name, email, phone number, or customer ID..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E5E7EB] text-[12px] text-[#1E3A5F] placeholder:text-[#7A93AC] focus:outline-none focus:border-[#D4A3B0]"
                />
              </div>

              <div className="relative">
                <select
                  value={groupFilter}
                  onChange={(e) => setGroupFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2 text-[12px] text-[#1E3A5F] font-medium focus:outline-none focus:border-[#D4A3B0] cursor-pointer"
                >
                  <option>All Customer Groups</option>
                  <option>VIP</option>
                  <option>Regular</option>
                  <option>New</option>
                </select>
                <AdminIcon
                  name="chevron-down"
                  size={13}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
                />
              </div>

              <div className="relative">
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2 text-[12px] text-[#1E3A5F] font-medium focus:outline-none focus:border-[#D4A3B0] cursor-pointer"
                >
                  <option>All Order Count</option>
                  <option>10+ Orders</option>
                  <option>5–9 Orders</option>
                  <option>1–4 Orders</option>
                </select>
                <AdminIcon
                  name="chevron-down"
                  size={13}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2 text-[12px] text-[#1E3A5F] font-medium focus:outline-none focus:border-[#D4A3B0] cursor-pointer"
                >
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Inactive</option>
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
                  setGroupFilter('All Customer Groups');
                  setOrderFilter('All Order Count');
                  setStatusFilter('All Statuses');
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
                    <th className="py-2.5 px-2 w-8">#</th>
                    <th className="py-2.5 px-3 min-w-[165px]">Customer</th>
                    <th className="py-2.5 px-3 min-w-[165px]">Contact</th>
                    <th className="py-2.5 px-3 text-center">Orders</th>
                    <th className="py-2.5 px-3">Total Spent</th>
                    <th className="py-2.5 px-3">Last Order</th>
                    <th className="py-2.5 px-3 text-center">Customer Group</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3 text-center">Actions</th>
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
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 border border-black/5"
                            style={{ backgroundColor: item.avatarBg, color: item.avatarColor }}
                          >
                            {item.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-[#1E3A5F] leading-snug">{item.name}</p>
                            <p className="text-[11px] text-[#6C849D]">{item.code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <p className="text-[#4A6B8C] text-[11.5px] leading-snug">{item.email}</p>
                        <p className="text-[#6C849D] text-[11px] mt-0.5">{item.phone}</p>
                      </td>
                      <td className="py-3 px-3 text-center font-semibold text-[#1E3A5F]">
                        {item.orders}
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#1E3A5F]">{item.totalSpent}</td>
                      <td className="py-3 px-3 text-[#4A6B8C] text-[11.5px] whitespace-nowrap">
                        {item.lastOrder}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className="inline-block px-3 py-1 rounded-md text-[11px] font-semibold min-w-[60px]"
                          style={{ backgroundColor: item.groupBg, color: item.groupColor }}
                        >
                          {item.group}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(item.id)}
                          className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer"
                          style={{ backgroundColor: item.statusBg, color: item.statusColor }}
                          title="Click to toggle status"
                        >
                          {item.status}
                        </button>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-center gap-1.5 text-[#C8234B]">
                          <button
                            type="button"
                            onClick={() => setActiveCustomer(item)}
                            title="View Customer"
                            className="w-7 h-7 rounded-md border border-[#F3E2E6] bg-[#FDF8F9] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="eye" size={13.5} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveCustomer(item)}
                            title="Edit Customer"
                            className="w-7 h-7 rounded-md border border-[#F3E2E6] bg-[#FDF8F9] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="edit" size={13.5} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(item.id)}
                            title="Toggle Status"
                            className="w-6 h-7 rounded-md hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="more-vertical" size={13.5} />
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
              <span>Showing 1 – {filteredItems.length} of 1,248 customers</span>

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
          {/* Customer Overview Donut Card */}
          <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#C8234B]">
                <AdminIcon name="floral" size={15} />
              </span>
              <h3
                className="text-[13.5px] font-bold text-[#B8294B]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Customer Overview
              </h3>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="relative w-[116px] h-[116px] shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F6EAEE" strokeWidth="4.5" />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#F48FB1"
                    strokeWidth="4.5"
                    strokeDasharray="13.2 88"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#98DFB2"
                    strokeWidth="4.5"
                    strokeDasharray="52.8 88"
                    strokeDashoffset="-13.2"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#FFE082"
                    strokeWidth="4.5"
                    strokeDasharray="22 88"
                    strokeDashoffset="-66"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
                  <span className="text-[16px] font-bold text-[#142C4C]">1,248</span>
                  <span className="text-[9.5px] text-[#4A6B8C]">Total</span>
                  <span className="text-[9.5px] text-[#4A6B8C]">Customers</span>
                </div>
              </div>

              <div className="space-y-2.5 flex-1 text-[11px]">
                <div className="flex items-start gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F48FB1] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">New</p>
                    <p className="text-[#6C849D] text-[10.5px]">186 (15%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#98DFB2] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">Regular</p>
                    <p className="text-[#6C849D] text-[10.5px]">750 (60%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFE082] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">VIP</p>
                    <p className="text-[#6C849D] text-[10.5px]">312 (25%)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Customers by Total Spend */}
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
                  Top Customers by Total Spend
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setGroupFilter('VIP')}
                className="text-[10.5px] font-semibold text-[#B8294B] hover:underline inline-flex items-center gap-0.5 cursor-pointer shrink-0"
              >
                <span>View All</span>
                <AdminIcon name="arrow-right" size={10} />
              </button>
            </div>

            <div className="space-y-2.5">
              {TOP_CUSTOMERS.map((cust) => (
                <div
                  key={cust.rank}
                  className="flex items-center justify-between gap-2.5 py-1 border-b border-[#F8EEF0] last:border-0"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-4 text-[11px] font-semibold text-[#6C849D]">
                      {cust.rank}
                    </span>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ backgroundColor: cust.bg, color: cust.color }}
                    >
                      {cust.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11.5px] font-semibold text-[#1E3A5F] truncate">
                        {cust.name}
                      </p>
                      <p className="text-[10px] text-[#6C849D]">{cust.orders}</p>
                    </div>
                  </div>
                  <span className="text-[11.5px] font-bold text-[#1E3A5F] shrink-0">
                    {cust.spent}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Customers */}
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
                  Recent Customers
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setGroupFilter('New')}
                className="text-[10.5px] font-semibold text-[#B8294B] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
              >
                <span>View All</span>
                <AdminIcon name="arrow-right" size={10} />
              </button>
            </div>

            <div className="space-y-2.5">
              {RECENT_CUSTOMERS.map((cust, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2.5 py-1 border-b border-[#F8EEF0] last:border-0"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ backgroundColor: cust.bg, color: cust.color }}
                    >
                      {cust.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11.5px] font-semibold text-[#1E3A5F] truncate">
                        {cust.name}
                      </p>
                      <p className="text-[10px] text-[#6C849D]">{cust.joined}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-[#B8294B] hover:bg-[#FDF2F4] p-1 rounded cursor-pointer"
                  >
                    <AdminIcon name="more-vertical" size={12} />
                  </button>
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
              Have questions about customers? Contact our support team for assistance.
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

      {/* Customer Detail Modal */}
      {activeCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#F2E2E6] bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F3E5E8] pb-3 mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: activeCustomer.avatarBg, color: activeCustomer.avatarColor }}
                >
                  {activeCustomer.initials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1E3A5F]">{activeCustomer.name}</h3>
                  <p className="text-xs text-[#6C849D]">{activeCustomer.code}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveCustomer(null)}
                className="text-[#64748B] hover:text-[#B8294B] text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#F8EEF0]">
                <span className="text-[#6C849D]">Email</span>
                <span className="font-semibold text-[#1E3A5F]">{activeCustomer.email}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#F8EEF0]">
                <span className="text-[#6C849D]">Phone</span>
                <span className="font-semibold text-[#1E3A5F]">{activeCustomer.phone}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#F8EEF0]">
                <span className="text-[#6C849D]">Total Orders</span>
                <span className="font-semibold text-[#1E3A5F]">{activeCustomer.orders}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#F8EEF0]">
                <span className="text-[#6C849D]">Total Spent</span>
                <span className="font-semibold text-[#1E3A5F]">{activeCustomer.totalSpent}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#F8EEF0]">
                <span className="text-[#6C849D]">Customer Group</span>
                <span className="font-semibold text-[#B8294B]">{activeCustomer.group}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#6C849D]">Last Order</span>
                <span className="font-semibold text-[#1E3A5F]">{activeCustomer.lastOrder}</span>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveCustomer(null)}
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
