import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_LOYALTY_GROUPS = [
  {
    id: 1,
    name: 'VIP Members',
    code: '#LG001',
    icon: 'crown',
    iconBg: '#FFF4E5',
    iconColor: '#D9822B',
    description: 'Our most valued customers',
    members: 312,
    rateTitle: '5 points',
    rateSub: 'per ₹100 spent',
    benefits: ['Early Access to Sales', 'Exclusive Discounts', 'Special Gifts'],
    status: 'Active',
    groupType: 'Tier-Based',
  },
  {
    id: 2,
    name: 'Gold Members',
    code: '#LG002',
    icon: 'diamond',
    iconBg: '#E8F2FC',
    iconColor: '#2563EB',
    description: 'For our loyal shoppers',
    members: 278,
    rateTitle: '3 points',
    rateSub: 'per ₹100 spent',
    benefits: ['10% Extra Discount', 'Free Shipping', 'Birthday Rewards'],
    status: 'Active',
    groupType: 'Tier-Based',
  },
  {
    id: 3,
    name: 'Silver Members',
    code: '#LG003',
    icon: 'award',
    iconBg: '#FCE8EE',
    iconColor: '#C8234B',
    description: 'Growing shoppers',
    members: 420,
    rateTitle: '2 points',
    rateSub: 'per ₹100 spent',
    benefits: ['5% Extra Discount', 'Exclusive Offers', 'Early Sale Access'],
    status: 'Active',
    groupType: 'Tier-Based',
  },
  {
    id: 4,
    name: 'New Customers',
    code: '#LG004',
    icon: 'coupons',
    iconBg: '#FCE8EE',
    iconColor: '#B8294B',
    description: 'First-time customers',
    members: 186,
    rateTitle: '1 point',
    rateSub: 'per ₹100 spent',
    benefits: ['Welcome Points (50)', 'First Order Discount', 'Special Welcome Offer'],
    status: 'Active',
    groupType: 'Tier-Based',
  },
  {
    id: 5,
    name: 'Referral Members',
    code: '#LG005',
    icon: 'heart',
    iconBg: '#FCE8EE',
    iconColor: '#E11D48',
    description: 'Customers who refer friends',
    members: 52,
    rateTitle: 'Extra 100 points',
    rateSub: 'per successful referral',
    benefits: ['Referral Rewards', 'Exclusive Coupons', 'Bonus Points'],
    status: 'Active',
    groupType: 'Referral',
  },
];

const TOP_LOYALTY_GROUPS = [
  { rank: 1, name: 'Silver Members', count: 420, pct: 85, icon: 'award', color: '#F48FB1', iconColor: '#C8234B' },
  { rank: 2, name: 'VIP Members', count: 312, pct: 68, icon: 'crown', color: '#FFE082', iconColor: '#D9822B' },
  { rank: 3, name: 'Gold Members', count: 278, pct: 60, icon: 'diamond', color: '#FFE082', iconColor: '#2563EB' },
  { rank: 4, name: 'New Customers', count: 186, pct: 45, icon: 'award', color: '#90CAF9', iconColor: '#C8234B' },
  { rank: 5, name: 'Referral Members', count: 52, pct: 20, icon: 'coupons', color: '#98DFB2', iconColor: '#C8234B' },
];

const RECENT_POINT_ACTIVITY = [
  { initials: 'PS', name: 'Pooja Shah', detail: 'Order #1023', points: '+250 points', positive: true, date: '18 Oct 2026' },
  { initials: 'NP', name: 'Neha Patel', detail: 'Referral Bonus', points: '+150 points', positive: true, date: '17 Oct 2026' },
  { initials: 'RM', name: 'Riya Mehta', detail: 'Redeemed for ₹300 Off', points: '-300 points', positive: false, date: '16 Oct 2026' },
  { initials: 'AD', name: 'Aarti Desai', detail: 'Order #1018', points: '+100 points', positive: true, date: '15 Oct 2026' },
];

const TABS = ['Loyalty Groups', 'Point Transactions', 'Rewards', 'Member Activity', 'Settings'];

export default function AdminLoyaltyPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [loyaltyGroups, setLoyaltyGroups] = useState(INITIAL_LOYALTY_GROUPS);
  const [activeTab, setActiveTab] = useState('Loyalty Groups');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [typeFilter, setTypeFilter] = useState('All Group Types');
  const [selectedIds, setSelectedIds] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTier, setNewTier] = useState({
    name: '',
    description: '',
    rateTitle: '4 points',
    rateSub: 'per ₹100 spent',
    benefit1: '15% Extra Discount',
    benefit2: 'Priority Dispatch',
    benefit3: 'Complimentary Swatches',
  });

  const combinedQuery = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredItems = loyaltyGroups.filter((item) => {
    const matchesSearch =
      !combinedQuery ||
      item.name.toLowerCase().includes(combinedQuery) ||
      item.description.toLowerCase().includes(combinedQuery) ||
      item.code.toLowerCase().includes(combinedQuery);
    const matchesStatus = statusFilter === 'All Statuses' || item.status === statusFilter;
    const matchesType = typeFilter === 'All Group Types' || item.groupType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
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

  const handleCreateTier = (e) => {
    e.preventDefault();
    if (!newTier.name.trim()) return;
    const nextId = loyaltyGroups.length + 1;
    setLoyaltyGroups((prev) => [
      ...prev,
      {
        id: nextId,
        name: newTier.name.trim(),
        code: `#LG00${nextId}`,
        icon: 'crown',
        iconBg: '#FCE8EE',
        iconColor: '#B8294B',
        description: newTier.description.trim() || 'Exclusive loyalty tier',
        members: 0,
        rateTitle: newTier.rateTitle,
        rateSub: newTier.rateSub,
        benefits: [newTier.benefit1, newTier.benefit2, newTier.benefit3].filter(Boolean),
        status: 'Active',
        groupType: 'Tier-Based',
      },
    ]);
    setNewTier({
      name: '',
      description: '',
      rateTitle: '4 points',
      rateSub: 'per ₹100 spent',
      benefit1: '15% Extra Discount',
      benefit2: 'Priority Dispatch',
      benefit3: 'Complimentary Swatches',
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
        <span className="text-[#1E3A5F] font-medium">Loyalty & Rewards</span>
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
              Loyalty & Rewards Groups
            </h1>
            <p className="text-[12.5px] text-[#4A6B8C] mt-0.5">
              Create and manage loyalty groups, reward points, and exclusive benefits to keep your customers coming back.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 bg-white hover:bg-[#FDF2F4] text-[#B8294B] border border-[#E5B8C5] text-[12.5px] font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer"
        >
          <AdminIcon name="plus" size={14} strokeWidth={2.2} />
          <span>Create Loyalty Group</span>
        </button>
      </div>

      {/* Main Grid: Left Content + Right Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_285px] gap-5 items-start">
        {/* Left Column */}
        <div className="space-y-4 min-w-0">
          {/* 4 KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Total Members */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FCE8EE] flex items-center justify-center text-[#C8234B] shrink-0">
                <AdminIcon name="customers" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Total Members</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">1,248</span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={11} strokeWidth={2.3} />
                    18%
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">vs last month</p>
              </div>
            </div>

            {/* Points Issued */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FFF4E5] flex items-center justify-center text-[#D9822B] shrink-0">
                <AdminIcon name="star" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Points Issued</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">86,420</span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={11} strokeWidth={2.3} />
                    25%
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">this month</p>
              </div>
            </div>

            {/* Rewards Redeemed */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FCE8F6] flex items-center justify-center text-[#A8238E] shrink-0">
                <AdminIcon name="coupons" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Rewards Redeemed</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">312</span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={11} strokeWidth={2.3} />
                    28%
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">this month</p>
              </div>
            </div>

            {/* Active Groups */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FFF4E5] flex items-center justify-center text-[#D9822B] shrink-0">
                <AdminIcon name="crown" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Active Groups</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">
                    {loyaltyGroups.length}
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">loyalty tiers</p>
              </div>
            </div>
          </div>

          {/* Tabs + Table Card */}
          <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-6 border-b border-[#F3E5E8] mb-4">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2.5 text-[12.5px] font-semibold transition-all border-b-2 -mb-px cursor-pointer ${
                      isActive
                        ? 'text-[#B8294B] border-[#B8294B]'
                        : 'text-[#4A6B8C] border-transparent hover:text-[#1E3A5F]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Search & Filters */}
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
                  placeholder="Search loyalty groups by name or description..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E5E7EB] text-[12px] text-[#1E3A5F] placeholder:text-[#7A93AC] focus:outline-none focus:border-[#D4A3B0]"
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

              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2 text-[12px] text-[#1E3A5F] font-medium focus:outline-none focus:border-[#D4A3B0] cursor-pointer"
                >
                  <option>All Group Types</option>
                  <option>Tier-Based</option>
                  <option>Referral</option>
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
                  setStatusFilter('All Statuses');
                  setTypeFilter('All Group Types');
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
                    <th className="py-2.5 px-3 min-w-[165px]">Group Name</th>
                    <th className="py-2.5 px-3 min-w-[140px]">Description</th>
                    <th className="py-2.5 px-3 text-center">Members</th>
                    <th className="py-2.5 px-3 min-w-[145px]">Points Earning Rate</th>
                    <th className="py-2.5 px-3 min-w-[185px]">Key Benefits</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4EAEB] text-[12px]">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FDF8F9]/70 transition-colors">
                      <td className="py-4 px-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => toggleOne(item.id)}
                          className="rounded border-[#CBD5E1] text-[#B8294B] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-4 px-2 text-[#4A6B8C] font-medium">{item.id}</td>
                      <td className="py-4 px-3">
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
                      <td className="py-4 px-3 text-[#4A6B8C] text-[11.5px] leading-snug">
                        {item.description}
                      </td>
                      <td className="py-4 px-3 text-center font-semibold text-[#1E3A5F]">
                        {item.members}
                      </td>
                      <td className="py-4 px-3">
                        <p className="font-semibold text-[#1E3A5F] leading-snug">
                          {item.rateTitle}
                        </p>
                        <p className="text-[11px] text-[#6C849D]">{item.rateSub}</p>
                      </td>
                      <td className="py-4 px-3">
                        <ul className="space-y-1">
                          {item.benefits.map((b, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-1.5 text-[11px] text-[#4A6B8C]"
                            >
                              <span className="w-3.5 h-3.5 rounded-full bg-[#FCE8EE] text-[#C8234B] flex items-center justify-center shrink-0">
                                <AdminIcon name="check" size={9} strokeWidth={2.5} />
                              </span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-4 px-3 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#E6F6EC] text-[#1E824C]">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <div className="flex items-center justify-center gap-1.5 text-[#C8234B]">
                          <button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            title="Edit Loyalty Group"
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
                Showing 1 – {filteredItems.length} of {loyaltyGroups.length} loyalty groups
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
          {/* Loyalty Program Overview Donut */}
          <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#C8234B]">
                <AdminIcon name="floral" size={15} />
              </span>
              <h3
                className="text-[13.5px] font-bold text-[#B8294B]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Loyalty Program Overview
              </h3>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="relative w-[112px] h-[112px] shrink-0 flex items-center justify-center">
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
                    strokeDasharray="19.4 88"
                    strokeDashoffset="-22"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#98DFB2"
                    strokeWidth="4.5"
                    strokeDasharray="29.9 88"
                    strokeDashoffset="-41.4"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#FFE082"
                    strokeWidth="4.5"
                    strokeDasharray="16.7 88"
                    strokeDashoffset="-71.3"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
                  <span className="text-[15.5px] font-bold text-[#142C4C]">1,248</span>
                  <span className="text-[9.5px] text-[#4A6B8C]">Total</span>
                  <span className="text-[9.5px] text-[#4A6B8C]">Members</span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1 text-[10.5px]">
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F48FB1] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">VIP Members</p>
                    <p className="text-[#6C849D] text-[10px]">312 (25%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FFE082] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">Gold Members</p>
                    <p className="text-[#6C849D] text-[10px]">278 (22%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#98DFB2] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">Silver Members</p>
                    <p className="text-[#6C849D] text-[10px]">420 (34%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#90CAF9] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">New Customers</p>
                    <p className="text-[#6C849D] text-[10px]">186 (15%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#64B5F6] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] leading-tight">Referral Members</p>
                    <p className="text-[#6C849D] text-[10px]">52 (4%)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Groups by Members */}
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
                  Top Groups by Members
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
              {TOP_LOYALTY_GROUPS.map((grp) => (
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

          {/* Recent Point Activity */}
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
                  Recent Point Activity
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

            <div className="space-y-2.5">
              {RECENT_POINT_ACTIVITY.map((act, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 py-1 border-b border-[#F8EEF0] last:border-0"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#FCE8EE] text-[#B8294B] flex items-center justify-center text-[10px] font-bold shrink-0">
                      {act.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11.5px] font-semibold text-[#1E3A5F] truncate">
                        {act.name}
                      </p>
                      <p className="text-[10px] text-[#6C849D] truncate">{act.detail}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p
                      className={`text-[11px] font-bold ${
                        act.positive ? 'text-[#1E824C]' : 'text-[#C8234B]'
                      }`}
                    >
                      {act.points}
                    </p>
                    <p className="text-[9.5px] text-[#6C849D]">{act.date}</p>
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
              Have questions about loyalty & rewards? Contact our support team for assistance.
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

      {/* Create Loyalty Tier Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#F2E2E6] bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F3E5E8] pb-3 mb-4">
              <h3 className="text-base font-bold text-[#B8294B]" style={{ fontFamily: 'Georgia, serif' }}>
                Create Loyalty Group
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[#64748B] hover:text-[#B8294B] text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateTier} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#1E3A5F] mb-1">Tier / Group Name</label>
                <input
                  type="text"
                  required
                  value={newTier.name}
                  onChange={(e) => setNewTier({ ...newTier, name: e.target.value })}
                  placeholder="e.g., Platinum Designers"
                  className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#B8294B]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#1E3A5F] mb-1">Description</label>
                <input
                  type="text"
                  value={newTier.description}
                  onChange={(e) => setNewTier({ ...newTier, description: e.target.value })}
                  placeholder="e.g., Top boutique & bridal partners"
                  className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#B8294B]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1E3A5F] mb-1">Points Rate</label>
                  <input
                    type="text"
                    value={newTier.rateTitle}
                    onChange={(e) => setNewTier({ ...newTier, rateTitle: e.target.value })}
                    className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#B8294B]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1E3A5F] mb-1">Spend Basis</label>
                  <input
                    type="text"
                    value={newTier.rateSub}
                    onChange={(e) => setNewTier({ ...newTier, rateSub: e.target.value })}
                    className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#B8294B]"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg border border-[#E5E7EB] px-4 py-2 font-semibold text-[#4A6B8C] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#B8294B] px-4 py-2 font-semibold text-white hover:bg-[#9E1F3E] cursor-pointer"
                >
                  Save Loyalty Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
