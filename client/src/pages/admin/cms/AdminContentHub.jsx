import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminIcon } from '../../../components/admin/AdminIcons.jsx';

const CONTENT_TABS = [
  'All Content',
  'Banners',
  'Collection Pages',
  'Blogs & Articles',
  'Announcements',
  'FAQs',
];

const INITIAL_CONTENT_ROWS = [
  {
    id: 1,
    title: 'New Arrivals - Premium Lace Collection',
    type: 'Banner',
    typeBadge: 'bg-[#FCECEF] text-[#B01634]',
    thumbnail: '/images/home-mfg-rolls.jpg',
    associatedWith: 'Homepage',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '01 Oct 2026',
  },
  {
    id: 2,
    title: 'Diwali Wholesale Special',
    type: 'Banner',
    typeBadge: 'bg-[#FCECEF] text-[#B01634]',
    thumbnail: '/images/product-12.jpg',
    associatedWith: 'Homepage',
    status: 'Scheduled',
    statusBadge: 'bg-[#FEF3D6] text-[#B86E00]',
    publishDate: '20 Oct 2026',
  },
  {
    id: 3,
    title: 'Bulk Order Benefits',
    type: 'Collection Page',
    typeBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    thumbnail: '/images/home-mfg-shelves.jpg',
    associatedWith: 'Wholesale Category',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '15 Sep 2026',
  },
  {
    id: 4,
    title: 'Trending Lace Designs',
    type: 'Collection Page',
    typeBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    thumbnail: '/images/provided-floral-lace.jpg',
    associatedWith: 'Product Catalog',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '10 Sep 2026',
  },
  {
    id: 5,
    title: 'How to Place a Wholesale Order',
    type: 'Blog',
    typeBadge: 'bg-[#F3EAFF] text-[#6B21A8]',
    thumbnail: '/images/home-mfg-hands.jpg',
    associatedWith: 'Resources',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '08 Sep 2026',
  },
  {
    id: 6,
    title: 'Care Guide for Laces',
    type: 'Blog',
    typeBadge: 'bg-[#F3EAFF] text-[#6B21A8]',
    thumbnail: '/images/home-story-lace.jpg',
    associatedWith: 'Resources',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '05 Sep 2026',
  },
  {
    id: 7,
    title: 'Festival Season Order Update',
    type: 'Announcement',
    typeBadge: 'bg-[#FFF1E0] text-[#C25E00]',
    thumbnail: '/images/product-4.jpg',
    associatedWith: 'All Customers',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '01 Oct 2026',
  },
  {
    id: 8,
    title: 'Wholesale FAQs',
    type: 'FAQ',
    typeBadge: 'bg-[#E8F2FF] text-[#1D5B9E]',
    thumbnail: '/images/product-2.jpg',
    associatedWith: 'Support',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '28 Aug 2026',
  },
  {
    id: 9,
    title: 'Contact Our Wholesale Team',
    type: 'Page',
    typeBadge: 'bg-[#F3EAFF] text-[#6B21A8]',
    thumbnail: '/images/hero-finishing.jpg',
    associatedWith: 'Support',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '20 Aug 2026',
  },
  {
    id: 10,
    title: 'Size & Packaging Information',
    type: 'FAQ',
    typeBadge: 'bg-[#E8F2FF] text-[#1D5B9E]',
    thumbnail: '/images/provided-pearl-lace.jpg',
    associatedWith: 'Support',
    status: 'Draft',
    statusBadge: 'bg-[#F1F5F9] text-[#475569]',
    publishDate: '-',
  },
];

const RECENT_CONTENT_ACTIVITY = [
  { text: 'New Arrivals banner published', time: '2 min ago', dot: 'bg-[#C81E45]' },
  { text: 'Wholesale FAQs updated', time: '15 min ago', dot: 'bg-[#6366F1]' },
  { text: 'Diwali offer scheduled', time: '1 hour ago', dot: 'bg-[#F59E0B]' },
  { text: 'Bulk Order page published', time: '3 hours ago', dot: 'bg-[#10B981]' },
  { text: 'Care Guide blog updated', time: '5 hours ago', dot: 'bg-[#F59E0B]' },
  { text: 'Contact page draft created', time: '1 day ago', dot: 'bg-[#8B5CF6]' },
];

export default function AdminContentHub() {
  const [rows, setRows] = useState(INITIAL_CONTENT_ROWS);
  const [activeTab, setActiveTab] = useState('All Content');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Content Types');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState('');

  const filteredRows = rows.filter((r) => {
    if (activeTab === 'Banners' && r.type !== 'Banner') return false;
    if (activeTab === 'Collection Pages' && r.type !== 'Collection Page') return false;
    if (activeTab === 'Blogs & Articles' && r.type !== 'Blog') return false;
    if (activeTab === 'Announcements' && r.type !== 'Announcement') return false;
    if (activeTab === 'FAQs' && r.type !== 'FAQ') return false;
    if (typeFilter !== 'All Content Types' && r.type !== typeFilter) return false;
    if (statusFilter !== 'All Statuses' && r.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.associatedWith.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredRows.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRows.map((r) => r.id));
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleDuplicate = (row) => {
    const copy = {
      ...row,
      id: rows.length + 1,
      title: `${row.title} (Copy)`,
      status: 'Draft',
      statusBadge: 'bg-[#F1F5F9] text-[#475569]',
    };
    setRows((prev) => [copy, ...prev]);
    setToast(`Duplicated "${row.title}"`);
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs font-medium text-[#2A476E]">
        <span>›</span>
        <Link to="/admin/wholesale" className="hover:underline">Wholesale</Link>
        <span>›</span>
        <span className="font-semibold text-[#1E3A5F]">Content</span>
      </nav>

      {/* Top Header & Create Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FCECEF] text-[#B01634]">
            <AdminIcon name="content" className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#B01634] md:text-3xl">
              Content Management
            </h1>
            <p className="mt-0.5 text-xs text-[#2A476E]">
              Create and manage banners, collection pages, blogs, announcements and other content for your wholesale store.
            </p>
          </div>
        </div>

        <Link
          to="/admin/content/banners"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8E1428] to-[#D4224E] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-95"
        >
          <AdminIcon name="plus" className="h-4 w-4" />
          <span>Create Content</span>
          <AdminIcon name="chevron-down" className="ml-1 h-3.5 w-3.5" />
        </Link>
      </div>

      {toast && (
        <div className="rounded-xl border border-[#B01634]/20 bg-[#FCECEF] px-4 py-2.5 text-xs font-medium text-[#B01634]">
          {toast}
        </div>
      )}

      {/* Main 2-Column Layout: Left Data Area + Right Sidebar Widgets */}
      <div className="grid gap-5 xl:grid-cols-[1fr_290px] xl:items-start">
        {/* Left Main Area */}
        <div className="space-y-4">
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="flex items-center gap-3.5 rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#B01634]">
                <AdminIcon name="content" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Total Content</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">126</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 18%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">vs last month</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E6F7EC] text-[#16A34A]">
                <AdminIcon name="check-circle" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Published</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">102</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 25%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">live on store</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FEF3D6] text-[#D97706]">
                <AdminIcon name="clock" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Scheduled</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">12</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 20%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">scheduled for release</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#B01634]">
                <AdminIcon name="draft" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Drafts</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">8</span>
                  <span className="text-[11px] font-semibold text-[#DC2626]">↓ 11%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">in progress</p>
              </div>
            </div>
          </div>

          {/* 6 Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CONTENT_TABS.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                    active
                      ? 'bg-[#AC1634] text-white shadow-2xs'
                      : 'border border-[#EAE2E0] bg-[#F5F1F0] text-[#1E3A5F] hover:bg-[#ECE4E2]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Search & Dropdown Filters Bar */}
          <div className="flex flex-wrap items-center gap-2.5 rounded-2xl border border-[#EFE3E4] bg-white p-3 shadow-2xs">
            <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-[#EAE2E0] bg-[#FAF8F7] px-3 py-2">
              <AdminIcon name="search" className="h-4 w-4 text-[#2A476E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search content by title, type, or category..."
                className="w-full bg-transparent text-xs text-[#1E3A5F] placeholder:text-[#64748B] focus:outline-none"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs font-medium text-[#1E3A5F] focus:outline-none"
            >
              <option value="All Content Types">All Content Types</option>
              <option value="Banner">Banner</option>
              <option value="Collection Page">Collection Page</option>
              <option value="Blog">Blog</option>
              <option value="Announcement">Announcement</option>
              <option value="FAQ">FAQ</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs font-medium text-[#1E3A5F] focus:outline-none"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Draft">Draft</option>
            </select>

            <select className="rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs font-medium text-[#1E3A5F] focus:outline-none">
              <option>All Date Ranges</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setActiveTab('All Content');
                setTypeFilter('All Content Types');
                setStatusFilter('All Statuses');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5B8C2] bg-[#FCEEEF] px-3.5 py-2 text-xs font-semibold text-[#B01634] transition hover:bg-[#F8DCE0]"
            >
              <AdminIcon name="filter" className="h-3.5 w-3.5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Content Table */}
          <div className="overflow-hidden rounded-2xl border border-[#EFE3E4] bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EFE3E4] bg-[#FDF6F4] text-[11px] font-bold text-[#1E3A5F]">
                    <th className="w-10 px-4 py-3.5">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === filteredRows.length && filteredRows.length > 0}
                        onChange={toggleSelectAll}
                        className="h-3.5 w-3.5 rounded accent-[#B01634]"
                      />
                    </th>
                    <th className="w-8 px-2 py-3.5">#</th>
                    <th className="px-3 py-3.5">Content Title</th>
                    <th className="px-3 py-3.5 text-center">Type</th>
                    <th className="px-3 py-3.5 text-center">Thumbnail</th>
                    <th className="px-3 py-3.5">Associated With</th>
                    <th className="px-3 py-3.5 text-center">Status</th>
                    <th className="px-3 py-3.5">Publish Date</th>
                    <th className="px-4 py-3.5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4EAEB]">
                  {filteredRows.map((row) => (
                    <tr key={row.id} className="transition hover:bg-[#FDF9F8]">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(row.id)}
                          onChange={() => toggleSelectRow(row.id)}
                          className="h-3.5 w-3.5 rounded accent-[#B01634]"
                        />
                      </td>
                      <td className="px-2 py-3 font-medium text-[#2A476E]">{row.id}</td>
                      <td className="max-w-[200px] px-3 py-3 font-semibold text-[#1E3A5F]">
                        {row.title}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold ${row.typeBadge}`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="mx-auto h-9 w-16 overflow-hidden rounded-md border border-[#E5DEC9] bg-[#F5EFE6]">
                          <img
                            src={row.thumbnail}
                            alt={row.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-3 py-3 font-medium text-[#2A476E]">{row.associatedWith}</td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold ${row.statusBadge}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-[#2A476E]">{row.publishDate}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2.5 text-[#B01634]">
                          <Link
                            to="/"
                            title="Preview"
                            className="rounded p-1 hover:bg-[#FCECEF]"
                          >
                            <AdminIcon name="eye" className="h-4 w-4" />
                          </Link>
                          <Link
                            to="/admin/content/banners"
                            title="Edit"
                            className="rounded p-1 hover:bg-[#FCECEF]"
                          >
                            <AdminIcon name="edit" className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDuplicate(row)}
                            title="Duplicate"
                            className="rounded p-1 hover:bg-[#FCECEF]"
                          >
                            <AdminIcon name="copy" className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            title="More actions"
                            className="rounded p-1 hover:bg-[#FCECEF]"
                          >
                            <AdminIcon name="more" className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer & Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EFE3E4] px-4 py-3.5 text-xs text-[#1E3A5F]">
              <span>Showing 1 – {filteredRows.length} of 126 content items</span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded border border-[#EAE2E0] bg-white text-[#1E3A5F] hover:bg-[#FAF0EE]"
                >
                  ‹
                </button>
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setCurrentPage(p)}
                    className={`flex h-7 w-7 items-center justify-center rounded text-xs font-semibold ${
                      currentPage === p
                        ? 'bg-[#AC1634] text-white'
                        : 'border border-[#EAE2E0] bg-white text-[#1E3A5F] hover:bg-[#FAF0EE]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                  className="flex h-7 w-7 items-center justify-center rounded border border-[#EAE2E0] bg-white text-[#1E3A5F] hover:bg-[#FAF0EE]"
                >
                  ›
                </button>
              </div>

              <select className="rounded-lg border border-[#EAE2E0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#1E3A5F]">
                <option>10 per page</option>
                <option>25 per page</option>
                <option>50 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets Column */}
        <div className="space-y-4">
          {/* 1. Content Type Distribution Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
              <AdminIcon name="settings" className="h-4 w-4" />
              <h3 className="font-serif text-sm">Content Type Distribution</h3>
            </div>

            <div className="mt-4 flex items-center gap-3">
              {/* SVG Multi-Segment Donut Chart */}
              <div className="relative h-28 w-28 shrink-0">
                <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F3E8EE" strokeWidth="5" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#EC88A4" strokeWidth="5" strokeDasharray="22 88" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#C5A3F6" strokeWidth="5" strokeDasharray="19 88" strokeDashoffset="-22" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#8CE0B5" strokeWidth="5" strokeDasharray="17 88" strokeDashoffset="-41" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#9CC9F8" strokeWidth="5" strokeDasharray="14 88" strokeDashoffset="-58" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F8D08B" strokeWidth="5" strokeDasharray="16 88" strokeDashoffset="-72" />
                </svg>
                <div className=" inset-0 absolute flex flex-col items-center justify-center text-center">
                  <span className="text-base font-bold leading-none text-[#1E3A5F]">126</span>
                  <span className="mt-0.5 text-[9px] leading-tight text-[#475569]">Total<br />Content</span>
                </div>
              </div>

              <ul className="space-y-1.5 text-[10px] text-[#1E3A5F]">
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#EC88A4]" />
                  <span><strong>Banners</strong> 32 (25%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#C5A3F6]" />
                  <span><strong>Collection Pages</strong> 28 (22%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#8CE0B5]" />
                  <span><strong>Blogs & Articles</strong> 24 (19%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#F8D08B]" />
                  <span><strong>Announcements</strong> 16 (13%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#9CC9F8]" />
                  <span><strong>FAQs</strong> 16 (13%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#CBD5E1]" />
                  <span><strong>Other Pages</strong> 8 (9%)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Recent Content Activity Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
                <AdminIcon name="clock" className="h-4 w-4" />
                <h3 className="font-serif text-sm">Recent Content Activity</h3>
              </div>
              <Link to="/admin/content" className="text-[10px] font-semibold text-[#B01634] hover:underline">
                View All →
              </Link>
            </div>

            <ul className="mt-3.5 divide-y divide-[#F6ECEE]">
              {RECENT_CONTENT_ACTIVITY.map((act) => (
                <li key={act.text} className="flex items-center justify-between gap-2 py-2.5 text-[11px]">
                  <div className="flex items-center gap-2.5">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${act.dot}`} />
                    <span className="font-medium text-[#1E3A5F]">{act.text}</span>
                  </div>
                  <span className="shrink-0 text-[10px] text-[#64748B]">{act.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Quick Actions Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
              <AdminIcon name="grid" className="h-4 w-4" />
              <h3 className="font-serif text-sm">Quick Actions</h3>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5 text-[11px] font-semibold">
              <Link
                to="/admin/content/banners"
                className="flex items-center gap-2 rounded-xl border border-[#F5DCE0] bg-[#FDF2F4] p-3 text-[#B01634] transition hover:bg-[#FCE4E8]"
              >
                <AdminIcon name="image" className="h-4 w-4 shrink-0" />
                <span>Upload Banner</span>
              </Link>
              <Link
                to="/admin/content/homepage"
                className="flex items-center gap-2 rounded-xl border border-[#D5F0DF] bg-[#EFFAF3] p-3 text-[#1D7F44] transition hover:bg-[#E0F5E9]"
              >
                <AdminIcon name="grid" className="h-4 w-4 shrink-0" />
                <span>Create Collection Page</span>
              </Link>
              <Link
                to="/admin/content/blogs"
                className="flex items-center gap-2 rounded-xl border border-[#E9D8FD] bg-[#F8F2FF] p-3 text-[#6B21A8] transition hover:bg-[#F0E4FF]"
              >
                <AdminIcon name="edit" className="h-4 w-4 shrink-0" />
                <span>Write Blog Post</span>
              </Link>
              <Link
                to="/admin/content/announcements"
                className="flex items-center gap-2 rounded-xl border border-[#FDE6C4] bg-[#FFF8EB] p-3 text-[#B86E00] transition hover:bg-[#FEF0D6]"
              >
                <AdminIcon name="megaphone" className="h-4 w-4 shrink-0" />
                <span>Add Announcement</span>
              </Link>
            </div>
          </div>

          {/* 4. Need Help? Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
              <AdminIcon name="support" className="h-4 w-4" />
              <h3 className="font-serif text-sm">Need Help?</h3>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-[#2A476E]">
              Have questions about managing content? Contact our support team.
            </p>
            <Link
              to="/contact"
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#E5B8C2] bg-[#FCEEEF] py-2 text-xs font-semibold text-[#B01634] transition hover:bg-[#F8DCE0]"
            >
              <span>Contact Support →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
