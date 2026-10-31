import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_CAMPAIGNS = [
  {
    id: 1,
    name: 'Diwali Special Offer',
    channel: 'Meta Ads',
    adSpend: '3,200',
    revenue: '28,600',
    roas: '8.9x',
    conversions: 142,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Lace Collection',
    channel: 'Google Ads',
    adSpend: '2,800',
    revenue: '18,400',
    roas: '6.6x',
    conversions: 98,
    status: 'Active',
  },
  {
    id: 3,
    name: 'New Arrivals Launch',
    channel: 'Instagram Ads',
    adSpend: '2,150',
    revenue: '12,600',
    roas: '5.9x',
    conversions: 76,
    status: 'Active',
  },
  {
    id: 4,
    name: 'Holiday Sale',
    channel: 'Email Marketing',
    adSpend: '1,200',
    revenue: '9,800',
    roas: '8.2x',
    conversions: 64,
    status: 'Active',
  },
  {
    id: 5,
    name: 'Remarketing Campaign',
    channel: 'Google Ads',
    adSpend: '1,100',
    revenue: '7,400',
    roas: '6.7x',
    conversions: 48,
    status: 'Paused',
  },
];

const TABS = [
  'Overview',
  'Ad Performance',
  'Channel Performance',
  'Campaign Performance',
  'Traffic & Conversions',
  'Customer Acquisition',
  'Email & SMS',
  'Social Media',
];

export default function AdminMarketingReportsPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState('All Channels');
  const [campaignFilter, setCampaignFilter] = useState('All Campaigns');
  const [platformFilter, setPlatformFilter] = useState('All Platforms');
  const [deviceFilter, setDeviceFilter] = useState('All Devices');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredCampaigns = useMemo(() => {
    return INITIAL_CAMPAIGNS.filter((c) => {
      const matchSearch =
        !effectiveSearch ||
        c.name.toLowerCase().includes(effectiveSearch) ||
        c.channel.toLowerCase().includes(effectiveSearch);

      const matchChannel =
        channelFilter === 'All Channels' ||
        c.channel.toLowerCase().includes(channelFilter.toLowerCase());

      const matchCampaign =
        campaignFilter === 'All Campaigns' || c.name === campaignFilter;

      return matchSearch && matchChannel && matchCampaign;
    });
  }, [effectiveSearch, channelFilter, campaignFilter]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredCampaigns.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setChannelFilter('All Channels');
    setCampaignFilter('All Campaigns');
    setPlatformFilter('All Platforms');
    setDeviceFilter('All Devices');
    setSearchQuery('');
    triggerToast('Marketing filters reset');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F6] p-4 sm:p-6 lg:p-8 font-sans text-gray-800">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-[#800020] px-4 py-2.5 text-sm font-medium text-white shadow-xl flex items-center gap-2 animate-fade-in">
          <AdminIcon name="check" size={16} strokeWidth={2} />
          {toastMsg}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <Link to="/admin" className="hover:text-[#800020] transition-colors">
          Admin
        </Link>
        <span>›</span>
        <Link to="/admin/wholesale" className="hover:text-[#800020] transition-colors">
          Wholesale
        </Link>
        <span>›</span>
        <Link to="/admin/reports" className="hover:text-[#800020] transition-colors">
          Reports
        </Link>
        <span>›</span>
        <span className="font-semibold text-[#800020]">Marketing Reports</span>
      </div>

      {/* Header Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0F3] text-[#800020] shadow-sm border border-[#FFE4E8]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] tracking-tight">
              Marketing Reports
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Track the performance of your marketing campaigns, channels, and customer acquisition efforts.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:border-[#800020] transition-colors">
            <AdminIcon name="calendar" size={16} className="text-gray-500" strokeWidth={1.75} />
            <span>01 Oct 2026 - 31 Oct 2026</span>
            <AdminIcon name="chevronDown" size={14} className="text-gray-400" strokeWidth={1.75} />
          </div>

          <button
            onClick={() => triggerToast('Exporting Marketing Report...')}
            className="flex items-center gap-2 rounded-xl bg-[#800020] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#660019] transition-all"
          >
            <AdminIcon name="download" size={16} strokeWidth={1.75} />
            <span>Export Report</span>
            <AdminIcon name="chevronDown" size={14} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
        {/* Card 1 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Ad Spend</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">₹12,450</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 24%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Ad Revenue</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">₹84,600</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 36%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">ROAS</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 3h2.5l2.2 11.2a2 2 0 002 1.6h8.8a2 2 0 001.9-1.4L22 7H6" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">6.8x</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 28%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">Return on Ad Spend</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">New Customers</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F3E8FF] text-purple-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">64</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 33%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">from marketing</p>
        </div>

        {/* Card 5 */}
        <div className="col-span-2 sm:col-span-1 rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Impressions</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">1,24,000</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 41%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">across all channels</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
              activeTab === tab
                ? 'bg-[#800020] text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-[#FFF0F3] hover:text-[#800020] border border-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Grid: Left Dashboard Area (8 cols) + Right Sidebar (4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column (xl:col-span-8 or 9) */}
        <div className="xl:col-span-9 space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart 1: Ad Spend vs Revenue (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF0F3] text-[#800020]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-gray-900">
                      Ad Spend vs Revenue
                    </h2>
                    <p className="text-[11px] text-gray-500">
                      Compare your marketing spend with the revenue generated.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1.5 font-medium text-gray-600">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FB7185]"></span>
                      Ad Spend (₹)
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-gray-600">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]"></span>
                      Revenue (₹)
                    </span>
                  </div>
                  <select className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 outline-none focus:border-[#800020]">
                    <option>Last 30 Days</option>
                    <option>Last 7 Days</option>
                    <option>This Month</option>
                  </select>
                </div>
              </div>

              {/* Chart SVG */}
              <div className="relative h-64 w-full pt-4">
                <svg className="h-full w-full overflow-visible" viewBox="0 0 540 200">
                  {/* Grid lines */}
                  <line x1="40" y1="20" x2="520" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="40" y1="60" x2="520" y2="60" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="40" y1="100" x2="520" y2="100" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="40" y1="140" x2="520" y2="140" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="40" y1="180" x2="520" y2="180" stroke="#e2e8f0" />

                  {/* Y Axis Labels */}
                  <text x="32" y="24" textAnchor="end" className="text-[10px] fill-gray-400">40K</text>
                  <text x="32" y="64" textAnchor="end" className="text-[10px] fill-gray-400">30K</text>
                  <text x="32" y="104" textAnchor="end" className="text-[10px] fill-gray-400">20K</text>
                  <text x="32" y="144" textAnchor="end" className="text-[10px] fill-gray-400">10K</text>
                  <text x="32" y="184" textAnchor="end" className="text-[10px] fill-gray-400">0</text>

                  {/* Bar Chart Columns (Ad Spend) */}
                  {[
                    { x: 55, h: 45 }, { x: 75, h: 52 }, { x: 95, h: 60 }, { x: 115, h: 58 },
                    { x: 135, h: 65 }, { x: 155, h: 72 }, { x: 175, h: 68 }, { x: 195, h: 80 },
                    { x: 215, h: 85 }, { x: 235, h: 78 }, { x: 255, h: 90 }, { x: 275, h: 95 },
                    { x: 295, h: 88 }, { x: 315, h: 102 }, { x: 335, h: 110 }, { x: 355, h: 105 },
                    { x: 375, h: 118 }, { x: 395, h: 125 }, { x: 415, h: 120 }, { x: 435, h: 135 },
                    { x: 455, h: 140 }, { x: 475, h: 148 }, { x: 495, h: 155 },
                  ].map((bar, i) => (
                    <rect
                      key={i}
                      x={bar.x}
                      y={180 - bar.h}
                      width="10"
                      height={bar.h}
                      rx="3"
                      fill="#FDA4AF"
                      className="hover:fill-[#FB7185] transition-colors cursor-pointer"
                    />
                  ))}

                  {/* Line Chart (Revenue Trend) */}
                  <path
                    d="M 55 155 Q 120 140, 180 125 T 300 95 T 420 50 T 495 28"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Line Nodes */}
                  <circle cx="55" cy="155" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="120" cy="140" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="180" cy="125" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="240" cy="110" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="300" cy="95" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="360" cy="72" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="420" cy="50" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <circle cx="495" cy="28" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />

                  {/* X Axis Labels */}
                  <text x="55" y="196" textAnchor="middle" className="text-[10px] fill-gray-400">1 Oct</text>
                  <text x="135" y="196" textAnchor="middle" className="text-[10px] fill-gray-400">5 Oct</text>
                  <text x="215" y="196" textAnchor="middle" className="text-[10px] fill-gray-400">10 Oct</text>
                  <text x="295" y="196" textAnchor="middle" className="text-[10px] fill-gray-400">15 Oct</text>
                  <text x="375" y="196" textAnchor="middle" className="text-[10px] fill-gray-400">20 Oct</text>
                  <text x="445" y="196" textAnchor="middle" className="text-[10px] fill-gray-400">25 Oct</text>
                  <text x="500" y="196" textAnchor="middle" className="text-[10px] fill-gray-400">31 Oct</text>
                </svg>
              </div>
            </div>

            {/* Chart 2: Traffic by Channel (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF0F3] text-[#800020]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-gray-900">Traffic by Channel</h2>
                </div>
                <p className="text-[11px] text-gray-500 mb-4">Website visitors from different marketing channels.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-2">
                {/* Donut graphic */}
                <div className="relative flex items-center justify-center h-44 w-44 shrink-0">
                  <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                    {/* Paid Ads 36% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#FB7185"
                      strokeWidth="14"
                      strokeDasharray="86 238"
                      strokeDashoffset="0"
                    />
                    {/* Organic Search 25% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="14"
                      strokeDasharray="60 238"
                      strokeDashoffset="-86"
                    />
                    {/* Social Media 20% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="14"
                      strokeDasharray="48 238"
                      strokeDashoffset="-146"
                    />
                    {/* Direct 11% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="14"
                      strokeDasharray="26 238"
                      strokeDashoffset="-194"
                    />
                    {/* Email 5% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="14"
                      strokeDasharray="12 238"
                      strokeDashoffset="-220"
                    />
                    {/* Others 3% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="14"
                      strokeDasharray="8 238"
                      strokeDashoffset="-232"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-bold text-gray-900 leading-tight">24,580</span>
                    <span className="text-[10px] font-medium text-gray-400">Total Visitors</span>
                  </div>
                </div>

                {/* Legend list */}
                <div className="space-y-1.5 text-xs w-full sm:w-auto">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#FB7185]"></span> Paid Ads
                    </span>
                    <span className="text-gray-900 font-semibold">8,960 (36%)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#10B981]"></span> Organic Search
                    </span>
                    <span className="text-gray-900 font-semibold">6,200 (25%)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#8B5CF6]"></span> Social Media
                    </span>
                    <span className="text-gray-900 font-semibold">4,880 (20%)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#3B82F6]"></span> Direct
                    </span>
                    <span className="text-gray-900 font-semibold">2,760 (11%)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#06B6D4]"></span> Email
                    </span>
                    <span className="text-gray-900 font-semibold">1,120 (5%)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#94A3B8]"></span> Others
                    </span>
                    <span className="text-gray-900 font-semibold">660 (3%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Highlight Summary Cards in a row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Top Channel */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500">Top Marketing Channel</span>
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  Best Performing
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Google Ads</h4>
                  <p className="text-xs text-gray-500">Revenue: <strong className="text-gray-800">₹42,800</strong></p>
                  <p className="text-[11px] text-gray-400">ROAS: 7.2x</p>
                </div>
              </div>
            </div>

            {/* Card 2: Top Campaign */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500">Top Campaign</span>
                <span className="rounded-md bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
                  Highest Revenue
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/images/product-1.jpg"
                  alt="Diwali Special"
                  className="h-10 w-10 shrink-0 rounded-xl object-cover border border-gray-100"
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Diwali Special Offer</h4>
                  <p className="text-xs text-gray-500">Revenue: <strong className="text-gray-800">₹28,600</strong></p>
                  <p className="text-[11px] text-gray-400">ROAS: 6.8x</p>
                </div>
              </div>
            </div>

            {/* Card 3: Top Ad Set */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500">Top Ad Set</span>
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  Best ROAS
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/images/product-2.jpg"
                  alt="Lace Collection"
                  className="h-10 w-10 shrink-0 rounded-xl object-cover border border-gray-100"
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Lace Collection Ads</h4>
                  <p className="text-xs text-gray-500">Revenue: <strong className="text-gray-800">₹18,400</strong></p>
                  <p className="text-[11px] text-gray-400">ROAS: 5.9x</p>
                </div>
              </div>
            </div>

            {/* Card 4: Top Audience */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500">Top Audience</span>
                <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-700">
                  Highest Conversions
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Women 25-34</h4>
                  <p className="text-xs text-gray-500">Revenue: <strong className="text-gray-800">₹32,600</strong></p>
                  <p className="text-[11px] text-gray-400">Conversions: 186</p>
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Performance Table */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF0F3] text-[#800020]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900">Campaign Performance</h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <AdminIcon
                    name="search"
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    strokeWidth={1.75}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search campaigns, ad sets, or channels..."
                    className="w-56 sm:w-72 rounded-xl border border-gray-200 bg-gray-50/60 py-2 pl-9 pr-3 text-xs text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#800020] focus:bg-white focus:ring-1 focus:ring-[#800020]"
                  />
                </div>

                <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:border-gray-300">
                  <span>Columns</span>
                  <AdminIcon name="chevronDown" size={12} strokeWidth={1.75} />
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF9F9] text-gray-600 font-semibold uppercase tracking-wider border-b border-gray-100">
                  <tr>
                    <th className="py-3 px-3 w-8">
                      <input
                        type="checkbox"
                        checked={
                          selectedIds.length > 0 &&
                          selectedIds.length === filteredCampaigns.length
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                      />
                    </th>
                    <th className="py-3 px-3 w-8">#</th>
                    <th className="py-3 px-4">Campaign Name</th>
                    <th className="py-3 px-4">Channel</th>
                    <th className="py-3 px-4">Ad Spend (₹)</th>
                    <th className="py-3 px-4">Revenue (₹)</th>
                    <th className="py-3 px-4">ROAS</th>
                    <th className="py-3 px-4">Conversions</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {filteredCampaigns.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="py-8 text-center text-gray-400">
                        No campaigns found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredCampaigns.map((c) => {
                      const isSelected = selectedIds.includes(c.id);
                      return (
                        <tr
                          key={c.id}
                          className={`transition-colors hover:bg-[#FFF5F7] ${
                            isSelected ? 'bg-[#FFF0F3]' : ''
                          }`}
                        >
                          <td className="py-3.5 px-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(c.id)}
                              className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                            />
                          </td>
                          <td className="py-3.5 px-3 font-medium text-gray-500">{c.id}</td>
                          <td className="py-3.5 px-4 font-bold text-gray-900">{c.name}</td>
                          <td className="py-3.5 px-4 text-gray-600">{c.channel}</td>
                          <td className="py-3.5 px-4 font-semibold text-gray-800">{c.adSpend}</td>
                          <td className="py-3.5 px-4 font-semibold text-gray-800">{c.revenue}</td>
                          <td className="py-3.5 px-4 font-bold text-emerald-600">{c.roas}</td>
                          <td className="py-3.5 px-4 font-semibold text-gray-800">{c.conversions}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                                c.status === 'Active'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => triggerToast(`Viewing analytics for ${c.name}`)}
                                title="View Insights"
                                className="rounded-lg p-1 text-gray-400 hover:bg-rose-50 hover:text-[#800020] transition-colors"
                              >
                                <AdminIcon name="reports" size={14} strokeWidth={1.75} />
                              </button>
                              <button
                                onClick={() => triggerToast(`Actions menu for ${c.name}`)}
                                title="More options"
                                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                              >
                                <AdminIcon name="moreVertical" size={14} strokeWidth={1.75} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
              <span>Showing 1 - 5 of 18 campaigns</span>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                >
                  ‹
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#800020] font-bold text-white shadow-sm">
                  1
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50">
                  4
                </button>
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                >
                  ›
                </button>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={perPage}
                  onChange={(e) => setPerPage(Number(e.target.value))}
                  className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 outline-none"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column (xl:col-span-3) */}
        <div className="xl:col-span-3 space-y-6">
          {/* Card 1: Filters */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
              <AdminIcon name="filter" size={16} className="text-[#800020]" strokeWidth={1.75} />
              <h3 className="text-sm font-bold text-gray-900">Filters</h3>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-gray-600 mb-1">Date Range</label>
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-gray-700">
                  <AdminIcon name="calendar" size={14} className="text-gray-400" strokeWidth={1.75} />
                  <span>01 Oct 2026 - 31 Oct 2026</span>
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-600 mb-1">Marketing Channel</label>
                <select
                  value={channelFilter}
                  onChange={(e) => setChannelFilter(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Channels</option>
                  <option>Google Ads</option>
                  <option>Meta Ads</option>
                  <option>Instagram Ads</option>
                  <option>Email Marketing</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-600 mb-1">Campaign</label>
                <select
                  value={campaignFilter}
                  onChange={(e) => setCampaignFilter(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Campaigns</option>
                  <option>Diwali Special Offer</option>
                  <option>Lace Collection</option>
                  <option>New Arrivals Launch</option>
                  <option>Holiday Sale</option>
                  <option>Remarketing Campaign</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-600 mb-1">Ad Platform</label>
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Platforms</option>
                  <option>Google Search</option>
                  <option>Facebook Feeds</option>
                  <option>Instagram Stories</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-600 mb-1">Device Type</label>
                <select
                  value={deviceFilter}
                  onChange={(e) => setDeviceFilter(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Devices</option>
                  <option>Mobile</option>
                  <option>Desktop</option>
                  <option>Tablet</option>
                </select>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => triggerToast('Marketing filters applied')}
                  className="flex-1 rounded-xl bg-[#800020] py-2.5 text-center text-xs font-semibold text-white shadow-sm hover:bg-[#660019] transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleResetFilters}
                  className="rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Quick Actions */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <AdminIcon name="zap" size={16} className="text-[#800020]" strokeWidth={1.75} />
              <h3 className="text-sm font-bold text-gray-900">Quick Actions</h3>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => triggerToast('Opening campaign creator...')}
                className="flex flex-col items-center justify-center rounded-xl border border-[#FFE4E8] bg-[#FFF8F9] p-3 text-center hover:bg-[#FFF0F3] transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-[#800020] mb-1.5 group-hover:scale-105 transition-transform">
                  <AdminIcon name="plus" size={16} strokeWidth={2} />
                </div>
                <span className="text-[11px] font-semibold text-gray-800">Create Campaign</span>
              </button>

              <button
                onClick={() => triggerToast('Opening Ads Manager...')}
                className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-center hover:bg-gray-100 transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 mb-1.5 group-hover:scale-105 transition-transform">
                  <AdminIcon name="settings" size={16} strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-semibold text-gray-800">Manage Ads</span>
              </button>

              <button
                onClick={() => triggerToast('Opening Analytics & Insights...')}
                className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-center hover:bg-gray-100 transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 mb-1.5 group-hover:scale-105 transition-transform">
                  <AdminIcon name="reports" size={16} strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-semibold text-gray-800">View Insights</span>
              </button>

              <button
                onClick={() => triggerToast('Exporting summary report...')}
                className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-center hover:bg-gray-100 transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700 mb-1.5 group-hover:scale-105 transition-transform">
                  <AdminIcon name="download" size={16} strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-semibold text-gray-800">Export Report</span>
              </button>
            </div>
          </div>

          {/* Card 3: Recent Marketing Activity */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AdminIcon name="bell" size={16} className="text-[#800020]" strokeWidth={1.75} />
                <h3 className="text-sm font-bold text-gray-900">Recent Marketing Activity</h3>
              </div>
              <button
                onClick={() => triggerToast('Viewing all marketing activities')}
                className="text-xs font-semibold text-[#800020] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-[#800020]">
                  <AdminIcon name="bell" size={14} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 leading-snug">
                    Diwali Special Offer campaign started
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <AdminIcon name="image" size={14} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 leading-snug">
                    New ad creative published
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <AdminIcon name="wholesale" size={14} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 leading-snug">
                    Budget increased for Lace Collection
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">1 day ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <AdminIcon name="mail" size={14} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 leading-snug">
                    Email campaign sent (New Arrivals)
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">1 day ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <AdminIcon name="clock" size={14} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 leading-snug">
                    Instagram ad paused
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

