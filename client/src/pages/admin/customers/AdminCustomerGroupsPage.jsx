import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_GROUPS = [
  {
    id: 1,
    name: 'VIP Customers',
    code: '#GRP001',
    icon: 'crown',
    iconBg: '#FFF4E5',
    iconColor: '#D9822B',
    description: 'High value repeat customers',
    customers: 312,
    benefitTitle: '10% Off',
    benefitSub: 'on all products',
    type: 'Auto',
    typeBg: '#FCE8EE',
    typeColor: '#B8294B',
    status: 'Active',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
    createdOn: '01 Sep 2026',
  },
  {
    id: 2,
    name: 'Wholesale Buyers',
    code: '#GRP002',
    icon: 'diamond',
    iconBg: '#E8F2FC',
    iconColor: '#2563EB',
    description: 'Bulk purchase customers',
    customers: 186,
    benefitTitle: '15% Off',
    benefitSub: 'on wholesale items',
    type: 'Manual',
    typeBg: '#E8F2FC',
    typeColor: '#2563EB',
    status: 'Active',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
    createdOn: '15 Aug 2026',
  },
  {
    id: 3,
    name: 'New Customers',
    code: '#GRP003',
    icon: 'coupons',
    iconBg: '#FCE8EE',
    iconColor: '#C8234B',
    description: 'First-time customers',
    customers: 210,
    benefitTitle: '5% Off',
    benefitSub: 'on first order',
    type: 'Auto',
    typeBg: '#FCE8EE',
    typeColor: '#B8294B',
    status: 'Active',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
    createdOn: '10 Jul 2026',
  },
  {
    id: 4,
    name: 'Loyal Customers',
    code: '#GRP004',
    icon: 'heart',
    iconBg: '#FCE8EE',
    iconColor: '#E11D48',
    description: 'Repeat customers (2+ orders)',
    customers: 278,
    benefitTitle: 'Free Shipping',
    benefitSub: 'on all orders',
    type: 'Auto',
    typeBg: '#FCE8EE',
    typeColor: '#B8294B',
    status: 'Active',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
    createdOn: '01 Jun 2026',
  },
  {
    id: 5,
    name: 'Festive Shoppers',
    code: '#GRP005',
    icon: 'floral',
    iconBg: '#FCE8F6',
    iconColor: '#A8238E',
    description: 'Seasonal campaign customers',
    customers: 142,
    benefitTitle: '12% Off',
    benefitSub: 'on selected products',
    type: 'Manual',
    typeBg: '#E8F2FC',
    typeColor: '#2563EB',
    status: 'Inactive',
    statusBg: '#FCE8EE',
    statusColor: '#C8234B',
    createdOn: '12 Oct 2026',
  },
  {
    id: 6,
    name: 'Corporate Clients',
    code: '#GRP006',
    icon: 'building',
    iconBg: '#F3EBFF',
    iconColor: '#7C4DFF',
    description: 'Business & corporate orders',
    customers: 120,
    benefitTitle: 'Custom Pricing',
    benefitSub: 'special rates',
    type: 'Manual',
    typeBg: '#E8F2FC',
    typeColor: '#2563EB',
    status: 'Active',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
    createdOn: '05 May 2026',
  },
];

const TOP_GROUPS = [
  { rank: 1, name: 'VIP Customers', count: 312, pct: 85, icon: 'crown', color: '#F48FB1', iconColor: '#D9822B' },
  { rank: 2, name: 'Loyal Customers', count: 278, pct: 74, icon: 'heart', color: '#FFE082', iconColor: '#E11D48' },
  { rank: 3, name: 'New Customers', count: 210, pct: 58, icon: 'coupons', color: '#81C784', iconColor: '#C8234B' },
  { rank: 4, name: 'Wholesale Buyers', count: 186, pct: 50, icon: 'diamond', color: '#90CAF9', iconColor: '#2563EB' },
  { rank: 5, name: 'Festive Shoppers', count: 142, pct: 40, icon: 'floral', color: '#CE93D8', iconColor: '#A8238E' },
];

export default function AdminCustomerGroupsPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Group Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedIds, setSelectedIds] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    benefitTitle: '10% Off',
    benefitSub: 'on all orders',
    type: 'Auto',
  });

  const combinedQuery = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredItems = groups.filter((item) => {
    const matchesSearch =
      !combinedQuery ||
      item.name.toLowerCase().includes(combinedQuery) ||
      item.description.toLowerCase().includes(combinedQuery) ||
      item.code.toLowerCase().includes(combinedQuery);
    const matchesType = typeFilter === 'All Group Types' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
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

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!formState.name.trim()) return;
    const nextId = groups.length + 1;
    const isAuto = formState.type === 'Auto';
    setGroups((prev) => [
      ...prev,
      {
        id: nextId,
        name: formState.name.trim(),
        code: `#GRP00${nextId}`,
        icon: 'crown',
        iconBg: '#FCE8EE',
        iconColor: '#B8294B',
        description: formState.description.trim() || 'Custom customer segment',
        customers: 0,
        benefitTitle: formState.benefitTitle,
        benefitSub: formState.benefitSub,
        type: formState.type,
        typeBg: isAuto ? '#FCE8EE' : '#E8F2FC',
        typeColor: isAuto ? '#B8294B' : '#2563EB',
        status: 'Active',
        statusBg: '#E6F6EC',
        statusColor: '#1E824C',
        createdOn: '30 Oct 2026',
      },
    ]);
    setFormState({
      name: '',
      description: '',
      benefitTitle: '10% Off',
      benefitSub: 'on all orders',
      type: 'Auto',
    });
    setModalOpen(false);
  };

  return (
    <div className="text-[#1E3A5F]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[12px] text-[#4A6B8C] mb-3">
        <AdminIcon name="chevron-right" size={12} className="text-[#7A93AC]" />
        <Link to="/admin/customers" className="hover:text-[#B8294B] transition-colors">
          Customers
        </Link>
        <AdminIcon name="chevron-right" size={12} className="text-[#7A93AC]" />
        <span className="text-[#1E3A5F] font-medium">Customer Groups</span>
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
              Customer Groups
            </h1>
            <p className="text-[12.5px] text-[#4A6B8C] mt-0.5">
              Create and manage customer groups to offer targeted pricing, discounts and personalized offers.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 bg-white hover:bg-[#FDF2F4] text-[#B8294B] border border-[#E5B8C5] text-[12.5px] font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer"
        >
          <AdminIcon name="plus" size={14} strokeWidth={2.2} />
          <span>Create Customer Group</span>
        </button>
      </div>

      {/* Main Grid: Left Content + Right Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_285px] gap-5 items-start">
        {/* Left Column */}
        <div className="space-y-4 min-w-0">
          {/* 4 KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Total Groups */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FCE8EE] flex items-center justify-center text-[#C8234B] shrink-0">
                <AdminIcon name="customers" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Total Groups</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">
                    {groups.length}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={11} strokeWidth={2.3} />
                    20%
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">vs last month</p>
              </div>
            </div>

            {/* Total Customers */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#E6F6EC] flex items-center justify-center text-[#28A745] shrink-0">
                <AdminIcon name="user-plus" size={20} />
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
                <p className="text-[10.5px] text-[#6C849D] mt-1">across all groups</p>
              </div>
            </div>

            {/* Avg. Order Value */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FCE8F6] flex items-center justify-center text-[#A8238E] shrink-0">
                <AdminIcon name="rupee" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Avg. Order Value</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">₹1,260</span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">across all groups</p>
              </div>
            </div>

            {/* Groups with Discounts */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FFF4E5] flex items-center justify-center text-[#D9822B] shrink-0">
                <AdminIcon name="percent" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Groups with Discounts</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">4</span>
                  <span className="text-[11.5px] font-medium text-[#4A6B8C]">67%</span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">of total groups</p>
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
                  placeholder="Search group name, description or group ID..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E5E7EB] text-[12px] text-[#1E3A5F] placeholder:text-[#7A93AC] focus:outline-none focus:border-[#D4A3B0]"
                />
              </div>

              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2 text-[12px] text-[#1E3A5F] font-medium focus:outline-none focus:border-[#D4A3B0] cursor-pointer"
                >
                  <option>All Group Types</option>
                  <option>Auto</option>
                  <option>Manual</option>
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
                  <option>All Status</option>
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
                  setTypeFilter('All Group Types');
                  setStatusFilter('All Status');
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
                    <th className="py-2.5 px-3 min-w-[175px]">Group Name</th>
                    <th className="py-2.5 px-3 min-w-[160px]">Description</th>
                    <th className="py-2.5 px-3 text-center">Customers</th>
                    <th className="py-2.5 px-3 min-w-[140px]">Discount / Benefit</th>
                    <th className="py-2.5 px-3 text-center">Group Type</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3">Created On</th>
                    <th className="py-2.5 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4EAEB] text-[12px]">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FDF8F9]/70 transition-colors">
                      <td className="py-3.5 px-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => toggleOne(item.id)}
                          className="rounded border-[#CBD5E1] text-[#B8294B] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-3.5 px-2 text-[#4A6B8C] font-medium">{item.id}</td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                          >
                            <AdminIcon name={item.icon} size={16} />
                          </div>
                          <div>
                            <p className="font-semibold text-[#1E3A5F] leading-snug">{item.name}</p>
                            <p className="text-[11px] text-[#6C849D]">{item.code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-[#4A6B8C] text-[11.5px] leading-snug">
                        {item.description}
                      </td>
                      <td className="py-3.5 px-3 text-center font-semibold text-[#1E3A5F]">
                        {item.customers}
                      </td>
                      <td className="py-3.5 px-3">
                        <p className="font-semibold text-[#1E3A5F] leading-snug">
                          {item.benefitTitle}
                        </p>
                        <p className="text-[11px] text-[#6C849D]">{item.benefitSub}</p>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span
                          className="inline-block px-3 py-1 rounded-md text-[11px] font-semibold min-w-[60px]"
                          style={{ backgroundColor: item.typeBg, color: item.typeColor }}
                        >
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span
                          className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold"
                          style={{ backgroundColor: item.statusBg, color: item.statusColor }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-[#4A6B8C] text-[11.5px] whitespace-nowrap">
                        {item.createdOn}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center justify-center gap-1.5 text-[#C8234B]">
                          <button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            title="Edit Group"
                            className="w-7 h-7 rounded-md border border-[#F3E2E6] bg-[#FDF8F9] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="edit" size={13.5} />
                          </button>
                          <button
                            type="button"
                            title="More Options"
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
              <span>
                Showing 1 – {filteredItems.length} of {groups.length} customer groups
              </span>

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
                  className="w-7 h-7 rounded-md border border-[#E5E7EB] flex items-center justify-center text-[#64748B] hover:bg-[#F8FAFC] cursor-pointer"
                >
                  <AdminIcon name="chevron-right" size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-4">
          {/* Group Distribution Donut Card */}
          <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#C8234B]">
                <AdminIcon name="floral" size={15} />
              </span>
              <h3
                className="text-[13.5px] font-bold text-[#B8294B]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Group Distribution
              </h3>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="relative w-[114px] h-[114px] shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F6EAEE" strokeWidth="4.5" />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#F48FB1"
                    strokeWidth="4.5"
                    strokeDasharray="22 88"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#90CAF9"
                    strokeWidth="4.5"
                    strokeDasharray="16 88"
                    strokeDashoffset="-22"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#98DFB2"
                    strokeWidth="4.5"
                    strokeDasharray="17 88"
                    strokeDashoffset="-38"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#FFE082"
                    strokeWidth="4.5"
                    strokeDasharray="19 88"
                    strokeDashoffset="-55"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#CE93D8"
                    strokeWidth="4.5"
                    strokeDasharray="14 88"
                    strokeDashoffset="-74"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
                  <span className="text-[15.5px] font-bold text-[#142C4C]">1,248</span>
                  <span className="text-[9.5px] text-[#4A6B8C]">Total</span>
                  <span className="text-[9.5px] text-[#4A6B8C]">Customers</span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1 text-[10.5px]">
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F48FB1] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">VIP Customers</p>
                    <p className="text-[#6C849D] text-[10px]">312 (25%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#90CAF9] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">Wholesale Buyers</p>
                    <p className="text-[#6C849D] text-[10px]">186 (15%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#98DFB2] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">New Customers</p>
                    <p className="text-[#6C849D] text-[10px]">210 (17%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FFE082] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">Loyal Customers</p>
                    <p className="text-[#6C849D] text-[10px]">278 (22%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#CE93D8] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">
                      Festive Shoppers / Corporate
                    </p>
                    <p className="text-[#6C849D] text-[10px]">262 (21%)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Groups by Customers */}
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
                  Top Groups by Customers
                </h3>
              </div>
              <button
                type="button"
                className="text-[10.5px] font-semibold text-[#B8294B] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
              >
                <span>View All</span>
                <AdminIcon name="arrow-right" size={10} />
              </button>
            </div>

            <div className="space-y-3">
              {TOP_GROUPS.map((grp) => (
                <div key={grp.rank} className="flex items-center gap-2.5">
                  <span className="w-4 text-[11px] font-semibold text-[#6C849D]">{grp.rank}</span>
                  <span style={{ color: grp.iconColor }} className="shrink-0">
                    <AdminIcon name={grp.icon} size={15} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[11.5px] mb-1">
                      <span className="font-semibold text-[#1E3A5F] truncate">{grp.name}</span>
                      <span className="font-bold text-[#1E3A5F]">{grp.count}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#F5EEF0] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${grp.pct}%`, backgroundColor: grp.color }}
                      />
                    </div>
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
              Have questions about customer groups? Contact our support team for assistance.
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

      {/* Create Customer Group Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#F2E2E6] bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F3E5E8] pb-3 mb-4">
              <h3 className="text-base font-bold text-[#B8294B]" style={{ fontFamily: 'Georgia, serif' }}>
                Create Customer Group
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[#64748B] hover:text-[#B8294B] text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateGroup} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#1E3A5F] mb-1">Group Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g., Bridal Boutiques"
                  className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#B8294B]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#1E3A5F] mb-1">Description</label>
                <input
                  type="text"
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  placeholder="e.g., High volume bridal studios"
                  className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#B8294B]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1E3A5F] mb-1">Discount / Benefit</label>
                  <input
                    type="text"
                    value={formState.benefitTitle}
                    onChange={(e) => setFormState({ ...formState, benefitTitle: e.target.value })}
                    className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#B8294B]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1E3A5F] mb-1">Group Type</label>
                  <select
                    value={formState.type}
                    onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                    className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#B8294B]"
                  >
                    <option value="Auto">Auto</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg border border-[#E5E7EB] px-4 py-2 font-semibold text-[#4A6B8C] hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#B8294B] px-4 py-2 font-semibold text-white hover:bg-[#9E1F3E] cursor-pointer"
                >
                  Save Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
