import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_CAMPAIGNS = [
  {
    id: 1,
    name: 'New Arrivals',
    audience: 'All Customers',
    thumb: '/images/product-1.jpg',
    subject: 'Fresh Picks Just for You!',
    type: 'Promotional',
    typeBg: '#FCE8EE',
    typeColor: '#B8294B',
    sentDate: '18 Oct 2026',
    sentTime: '10:00 AM',
    recipients: '1,240',
    openRate: '48%',
    clickRate: '12%',
    status: 'Sent',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 2,
    name: 'Festival Offer',
    audience: 'VIP Customers',
    thumb: '/images/product-2.jpg',
    subject: 'Exclusive Festive Collection – 20% Off',
    type: 'Promotional',
    typeBg: '#FCE8EE',
    typeColor: '#B8294B',
    sentDate: '15 Oct 2026',
    sentTime: '09:30 AM',
    recipients: '312',
    openRate: '56%',
    clickRate: '14%',
    status: 'Sent',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 3,
    name: 'Back in Stock',
    audience: 'Interested Customers',
    thumb: '/images/product-3.jpg',
    subject: 'Your Favourite Items Are Back!',
    type: 'Transactional',
    typeBg: '#E8F2FC',
    typeColor: '#2563EB',
    sentDate: '12 Oct 2026',
    sentTime: '11:15 AM',
    recipients: '890',
    openRate: '45%',
    clickRate: '10%',
    status: 'Sent',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 4,
    name: 'Cart Abandonment',
    audience: 'Cart Abandoners',
    thumb: '/images/product-4.jpg',
    subject: 'Your Cart is Waiting for You!',
    type: 'Automated',
    typeBg: '#F3EBFF',
    typeColor: '#7C4DFF',
    sentDate: '10 Oct 2026',
    sentTime: '02:00 PM',
    recipients: '420',
    openRate: '52%',
    clickRate: '16%',
    status: 'Active',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 5,
    name: 'Welcome Series',
    audience: 'New Customers',
    thumb: '/images/product-5.jpg',
    subject: 'Welcome to ARC LEGACY!',
    type: 'Automated',
    typeBg: '#F3EBFF',
    typeColor: '#7C4DFF',
    sentDate: '08 Oct 2026',
    sentTime: '09:00 AM',
    recipients: '186',
    openRate: '62%',
    clickRate: '18%',
    status: 'Active',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 6,
    name: 'Customer Feedback',
    audience: 'Recent Buyers',
    thumb: '/images/product-6.jpg',
    subject: 'How Was Your Experience?',
    type: 'Transactional',
    typeBg: '#E8F2FC',
    typeColor: '#2563EB',
    sentDate: '05 Oct 2026',
    sentTime: '05:00 PM',
    recipients: '298',
    openRate: '38%',
    clickRate: '8%',
    status: 'Sent',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 7,
    name: 'Loyalty Program',
    audience: 'Repeat Customers',
    thumb: '/images/product-7.jpg',
    subject: 'Earn More Rewards with ARC Legacy',
    type: 'Promotional',
    typeBg: '#FCE8EE',
    typeColor: '#B8294B',
    sentDate: '01 Oct 2026',
    sentTime: '10:00 AM',
    recipients: '278',
    openRate: '50%',
    clickRate: '11%',
    status: 'Sent',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 8,
    name: 'Product Review Request',
    audience: 'Delivered Orders',
    thumb: '/images/product-8.jpg',
    subject: 'Share Your Review & Get 10% Off',
    type: 'Transactional',
    typeBg: '#E8F2FC',
    typeColor: '#2563EB',
    sentDate: '28 Sep 2026',
    sentTime: '11:30 AM',
    recipients: '520',
    openRate: '40%',
    clickRate: '9%',
    status: 'Sent',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 9,
    name: 'Season End Sale',
    audience: 'All Customers',
    thumb: '/images/product-9.jpg',
    subject: 'Last Chance! Upto 50% Off',
    type: 'Promotional',
    typeBg: '#FCE8EE',
    typeColor: '#B8294B',
    sentDate: '25 Sep 2026',
    sentTime: '04:00 PM',
    recipients: '1,102',
    openRate: '46%',
    clickRate: '13%',
    status: 'Sent',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
  },
  {
    id: 10,
    name: 'Re-engagement',
    audience: 'Inactive Customers',
    thumb: '/images/product-10.jpg',
    subject: "We Miss You! Here's a Special Offer",
    type: 'Promotional',
    typeBg: '#FCE8EE',
    typeColor: '#B8294B',
    sentDate: '20 Sep 2026',
    sentTime: '10:00 AM',
    recipients: '250',
    openRate: '28%',
    clickRate: '5%',
    status: 'Draft',
    statusBg: '#FFF4E5',
    statusColor: '#D9822B',
  },
];

const RECENT_SUBSCRIBERS = [
  { initials: 'PS', name: 'Pooja Shah', email: 'pooja.shah@gmail.com', date: '18 Oct 2026' },
  { initials: 'NP', name: 'Neha Patel', email: 'neha.patel@gmail.com', date: '17 Oct 2026' },
  { initials: 'RM', name: 'Riya Mehta', email: 'riya.mehta@gmail.com', date: '16 Oct 2026' },
  { initials: 'AD', name: 'Aarti Desai', email: 'aarti.desai@gmail.com', date: '15 Oct 2026' },
  { initials: 'KJ', name: 'Kunal Jain', email: 'kunal.jain@gmail.com', date: '14 Oct 2026' },
];

const TABS = ['Campaigns', 'Subscribers', 'Templates', 'Automation', 'Analytics'];

export default function AdminEmailMarketingPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [activeTab, setActiveTab] = useState('Campaigns');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Campaign Types');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedIds, setSelectedIds] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    audience: 'All Customers',
    subject: '',
    type: 'Promotional',
  });

  const combinedQuery = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredItems = campaigns.filter((item) => {
    const matchesSearch =
      !combinedQuery ||
      item.name.toLowerCase().includes(combinedQuery) ||
      item.subject.toLowerCase().includes(combinedQuery) ||
      item.audience.toLowerCase().includes(combinedQuery);
    const matchesType =
      (activeTab === 'Automation' ? item.type === 'Automated' : true) &&
      (typeFilter === 'All Campaign Types' || item.type === typeFilter);
    const matchesStatus = statusFilter === 'All Statuses' || item.status === statusFilter;
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

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!newCampaign.name.trim()) return;
    const nextId = campaigns.length + 1;
    setCampaigns((prev) => [
      {
        id: nextId,
        name: newCampaign.name.trim(),
        audience: newCampaign.audience,
        thumb: '/images/product-1.jpg',
        subject: newCampaign.subject.trim() || 'Exclusive Offer from ARC LEGACY',
        type: newCampaign.type,
        typeBg: newCampaign.type === 'Promotional' ? '#FCE8EE' : '#E8F2FC',
        typeColor: newCampaign.type === 'Promotional' ? '#B8294B' : '#2563EB',
        sentDate: '30 Oct 2026',
        sentTime: '11:00 AM',
        recipients: '1,248',
        openRate: '0%',
        clickRate: '0%',
        status: 'Draft',
        statusBg: '#FFF4E5',
        statusColor: '#D9822B',
      },
      ...prev,
    ]);
    setNewCampaign({ name: '', audience: 'All Customers', subject: '', type: 'Promotional' });
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
        <span className="text-[#1E3A5F] font-medium">Email Marketing</span>
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
              Email Marketing
            </h1>
            <p className="text-[12.5px] text-[#4A6B8C] mt-0.5">
              Create, send and manage email campaigns to engage your customers and grow your business.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 bg-white hover:bg-[#FDF2F4] text-[#B8294B] border border-[#E5B8C5] text-[12.5px] font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer"
        >
          <AdminIcon name="plus" size={14} strokeWidth={2.2} />
          <span>Create Email Campaign</span>
        </button>
      </div>

      {/* Main Grid: Left Content + Right Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_285px] gap-5 items-start">
        {/* Left Column */}
        <div className="space-y-4 min-w-0">
          {/* 4 KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Total Subscribers */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FCE8EE] flex items-center justify-center text-[#C8234B] shrink-0">
                <AdminIcon name="mail" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Total Subscribers</p>
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

            {/* Emails Sent */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#E6F6EC] flex items-center justify-center text-[#28A745] shrink-0">
                <AdminIcon name="send" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Emails Sent</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">18,420</span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={11} strokeWidth={2.3} />
                    25%
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">this month</p>
              </div>
            </div>

            {/* Average Open Rate */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FCE8F6] flex items-center justify-center text-[#A8238E] shrink-0">
                <AdminIcon name="reports" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Average Open Rate</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">42%</span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={11} strokeWidth={2.3} />
                    8%
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">industry avg. 21%</p>
              </div>
            </div>

            {/* Average Click Rate */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FCE8EE] flex items-center justify-center text-[#C8234B] shrink-0">
                <AdminIcon name="click" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Average Click Rate</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">8.6%</span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={11} strokeWidth={2.3} />
                    3%
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">industry avg. 2.5%</p>
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
              <div className="relative flex-1 min-w-[220px]">
                <AdminIcon
                  name="search"
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search campaigns by name, subject, or segment..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E5E7EB] text-[12px] text-[#1E3A5F] placeholder:text-[#7A93AC] focus:outline-none focus:border-[#D4A3B0]"
                />
              </div>

              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2 text-[12px] text-[#1E3A5F] font-medium focus:outline-none focus:border-[#D4A3B0] cursor-pointer"
                >
                  <option>All Campaign Types</option>
                  <option>Promotional</option>
                  <option>Transactional</option>
                  <option>Automated</option>
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
                  <option>Sent</option>
                  <option>Active</option>
                  <option>Draft</option>
                </select>
                <AdminIcon
                  name="chevron-down"
                  size={13}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
                />
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[12px] text-[#1E3A5F] font-medium hover:border-[#D4A3B0] cursor-pointer"
              >
                <AdminIcon name="calendar" size={14} className="text-[#4A6B8C]" />
                <span>Select Date Range</span>
                <AdminIcon name="chevron-down" size={13} className="text-[#64748B]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setTypeFilter('All Campaign Types');
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
                    <th className="py-2.5 px-3 min-w-[170px]">Campaign Name</th>
                    <th className="py-2.5 px-3 min-w-[165px]">Subject Line</th>
                    <th className="py-2.5 px-3 text-center">Type</th>
                    <th className="py-2.5 px-3 min-w-[95px]">Sent On</th>
                    <th className="py-2.5 px-3 text-center">Recipients</th>
                    <th className="py-2.5 px-3 text-center">Open Rate</th>
                    <th className="py-2.5 px-3 text-center">Click Rate</th>
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
                          <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#E5E7EB] shrink-0 bg-[#FAF7F5]">
                            <img
                              src={item.thumb}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-[#1E3A5F] leading-snug">{item.name}</p>
                            <p className="text-[10.5px] text-[#6C849D]">{item.audience}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-[#1E3A5F] text-[11.5px] leading-snug">
                        {item.subject}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className="inline-block px-2.5 py-1 rounded-md text-[10.5px] font-semibold"
                          style={{ backgroundColor: item.typeBg, color: item.typeColor }}
                        >
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <p className="text-[11.5px] text-[#1E3A5F]">{item.sentDate}</p>
                        <p className="text-[10.5px] text-[#6C849D]">{item.sentTime}</p>
                      </td>
                      <td className="py-3 px-3 text-center font-medium text-[#1E3A5F]">
                        {item.recipients}
                      </td>
                      <td className="py-3 px-3 text-center font-semibold text-[#1E3A5F]">
                        {item.openRate}
                      </td>
                      <td className="py-3 px-3 text-center font-semibold text-[#1E3A5F]">
                        {item.clickRate}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold"
                          style={{ backgroundColor: item.statusBg, color: item.statusColor }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-center gap-1.5 text-[#C8234B]">
                          <button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            title="Preview Campaign"
                            className="w-7 h-7 rounded-md border border-[#F3E2E6] bg-[#FDF8F9] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="eye" size={13.5} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveTab('Analytics')}
                            title="Campaign Analytics"
                            className="w-7 h-7 rounded-md border border-[#F3E2E6] bg-[#FDF8F9] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="bar-chart" size={13.5} />
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
              <span>Showing 1 – {filteredItems.length} of 24 campaigns</span>

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
          {/* Subscriber Growth Line Chart */}
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
                  Subscriber Growth
                </h3>
              </div>
              <span className="text-[10px] text-[#4A6B8C] border border-[#E5E7EB] rounded px-2 py-0.5">
                Last 6 Months ▾
              </span>
            </div>

            <div className="pt-1">
              <svg viewBox="0 0 240 110" className="w-full h-28 overflow-visible">
                <defs>
                  <linearGradient id="subGrowthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D14B6E" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#D14B6E" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {[15, 35, 55, 75, 92].map((y, idx) => (
                  <g key={y}>
                    <line x1="28" y1={y} x2="232" y2={y} stroke="#F4EAEB" strokeWidth="1" />
                    <text x="23" y={y + 3} textAnchor="end" fontSize="8" fill="#6C849D">
                      {['2,000', '1,500', '1,000', '500', '0'][idx]}
                    </text>
                  </g>
                ))}
                <path
                  d="M36 74 L74 66 L112 56 L150 45 L188 33 L226 19 L226 92 L36 92 Z"
                  fill="url(#subGrowthGrad)"
                />
                <polyline
                  fill="none"
                  stroke="#C8234B"
                  strokeWidth="2"
                  points="36,74 74,66 112,56 150,45 188,33 226,19"
                />
                {[
                  [36, 74, 'Apr'],
                  [74, 66, 'May'],
                  [112, 56, 'Jun'],
                  [150, 45, 'Jul'],
                  [188, 33, 'Aug'],
                  [226, 19, 'Sep'],
                ].map(([cx, cy, label]) => (
                  <g key={label}>
                    <circle cx={cx} cy={cy} r="3" fill="#C8234B" />
                    <text x={cx} y="105" textAnchor="middle" fontSize="8.5" fill="#4A6B8C">
                      {label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Subscribers by Source Donut */}
          <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#C8234B]">
                <AdminIcon name="floral" size={15} />
              </span>
              <h3
                className="text-[13.5px] font-bold text-[#B8294B]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Subscribers by Source
              </h3>
            </div>

            <div className="flex items-center justify-between gap-2.5">
              <div className="relative w-[108px] h-[108px] shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F6EAEE" strokeWidth="4.5" />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#F48FB1"
                    strokeWidth="4.5"
                    strokeDasharray="37 88"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#98DFB2"
                    strokeWidth="4.5"
                    strokeDasharray="24.5 88"
                    strokeDashoffset="-37"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#90CAF9"
                    strokeWidth="4.5"
                    strokeDasharray="13.2 88"
                    strokeDashoffset="-61.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#FFE082"
                    strokeWidth="4.5"
                    strokeDasharray="13.3 88"
                    strokeDashoffset="-74.7"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
                  <span className="text-[15px] font-bold text-[#142C4C]">1,248</span>
                  <span className="text-[9px] text-[#4A6B8C]">Total</span>
                  <span className="text-[9px] text-[#4A6B8C]">Subscribers</span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1 text-[10.5px]">
                {[
                  { label: 'Website Signup', pct: '42%', color: '#F48FB1' },
                  { label: 'Checkout', pct: '28%', color: '#28A745' },
                  { label: 'Email Campaigns', pct: '15%', color: '#90CAF9' },
                  { label: 'Offline Import', pct: '8%', color: '#FFE082' },
                  { label: 'Other', pct: '7%', color: '#CE93D8' },
                ].map((src) => (
                  <div key={src.label} className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: src.color }}
                      />
                      <span className="text-[#1E3A5F] truncate">{src.label}</span>
                    </div>
                    <span className="font-semibold text-[#1E3A5F] shrink-0">{src.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Subscribers */}
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
                  Recent Subscribers
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
              {RECENT_SUBSCRIBERS.map((sub, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 py-1 border-b border-[#F8EEF0] last:border-0"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#FCE8EE] text-[#B8294B] flex items-center justify-center text-[10px] font-bold shrink-0">
                      {sub.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11.5px] font-semibold text-[#1E3A5F] truncate">
                        {sub.name}
                      </p>
                      <p className="text-[10px] text-[#6C849D] truncate">{sub.email}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#6C849D] shrink-0">{sub.date}</span>
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
              Have questions about email marketing? Contact our support team for assistance.
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

      {/* Create Campaign Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#F2E2E6] bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F3E5E8] pb-3 mb-4">
              <h3 className="text-base font-bold text-[#B8294B]" style={{ fontFamily: 'Georgia, serif' }}>
                Create Email Campaign
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[#64748B] hover:text-[#B8294B] text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateCampaign} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#1E3A5F] mb-1">Campaign Name</label>
                <input
                  type="text"
                  required
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  placeholder="e.g., Wedding Collection Launch"
                  className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#B8294B]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#1E3A5F] mb-1">Subject Line</label>
                <input
                  type="text"
                  required
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                  placeholder="e.g., Discover Our Handcrafted Zari Laces"
                  className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#B8294B]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1E3A5F] mb-1">Target Segment</label>
                  <select
                    value={newCampaign.audience}
                    onChange={(e) => setNewCampaign({ ...newCampaign, audience: e.target.value })}
                    className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#B8294B]"
                  >
                    <option>All Customers</option>
                    <option>VIP Customers</option>
                    <option>New Customers</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#1E3A5F] mb-1">Campaign Type</label>
                  <select
                    value={newCampaign.type}
                    onChange={(e) => setNewCampaign({ ...newCampaign, type: e.target.value })}
                    className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#B8294B]"
                  >
                    <option>Promotional</option>
                    <option>Transactional</option>
                    <option>Automated</option>
                  </select>
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
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
