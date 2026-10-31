import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminIcon } from '../../../components/admin/AdminIcons.jsx';

const FAQ_TABS = ['All FAQs', 'Published', 'Drafts', 'Categories'];

const INITIAL_FAQS = [
  {
    id: 1,
    question: 'What is the minimum order quantity (MOQ) for wholesale orders?',
    category: 'Orders',
    categoryBadge: 'bg-[#FCECEF] text-[#B01634]',
    views: 320,
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    lastUpdated: '18 Oct 2026',
  },
  {
    id: 2,
    question: 'How can I apply for a wholesale account?',
    category: 'Account',
    categoryBadge: 'bg-[#F3EAFF] text-[#6B21A8]',
    views: 280,
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    lastUpdated: '16 Oct 2026',
  },
  {
    id: 3,
    question: 'Do you provide price lists?',
    category: 'Pricing',
    categoryBadge: 'bg-[#FFF1E0] text-[#C25E00]',
    views: 260,
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    lastUpdated: '15 Oct 2026',
  },
  {
    id: 4,
    question: 'What payment methods do you accept?',
    category: 'Payments',
    categoryBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    views: 240,
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    lastUpdated: '12 Oct 2026',
  },
  {
    id: 5,
    question: 'How long does delivery take?',
    category: 'Shipping',
    categoryBadge: 'bg-[#E8F2FF] text-[#1D5B9E]',
    views: 210,
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    lastUpdated: '10 Oct 2026',
  },
  {
    id: 6,
    question: 'Can I get samples before placing a bulk order?',
    category: 'Products',
    categoryBadge: 'bg-[#F3EAFF] text-[#6B21A8]',
    views: 180,
    status: 'Scheduled',
    statusBadge: 'bg-[#FEF3D6] text-[#B86E00]',
    lastUpdated: '08 Oct 2026',
  },
  {
    id: 7,
    question: 'Do you offer custom designs or private labeling?',
    category: 'Customization',
    categoryBadge: 'bg-[#FCECEF] text-[#B01634]',
    views: 160,
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    lastUpdated: '05 Oct 2026',
  },
  {
    id: 8,
    question: 'What is your return or exchange policy for wholesale orders?',
    category: 'Returns',
    categoryBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    views: 140,
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    lastUpdated: '02 Oct 2026',
  },
  {
    id: 9,
    question: 'Do you ship internationally?',
    category: 'Shipping',
    categoryBadge: 'bg-[#E8F2FF] text-[#1D5B9E]',
    views: 120,
    status: 'Draft',
    statusBadge: 'bg-[#F1F5F9] text-[#475569]',
    lastUpdated: '01 Oct 2026',
  },
  {
    id: 10,
    question: 'How can I track my order?',
    category: 'Orders',
    categoryBadge: 'bg-[#FCECEF] text-[#B01634]',
    views: 110,
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    lastUpdated: '28 Sep 2026',
  },
];

const TOP_VIEWED_FAQS = [
  { rank: 1, question: 'What is the minimum order quantity (MOQ)?', views: '320 views', progress: 'w-[90%]' },
  { rank: 2, question: 'How can I apply for a wholesale account?', views: '280 views', progress: 'w-[78%]' },
  { rank: 3, question: 'Do you provide price lists?', views: '260 views', progress: 'w-[70%]' },
  { rank: 4, question: 'What payment methods do you accept?', views: '240 views', progress: 'w-[62%]' },
  { rank: 5, question: 'How long does delivery take?', views: '210 views', progress: 'w-[54%]' },
];

export default function AdminFaqsPage() {
  const [rows, setRows] = useState(INITIAL_FAQS);
  const [activeTab, setActiveTab] = useState('All FAQs');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFaq, setNewFaq] = useState({
    question: '',
    category: 'Orders',
    status: 'Published',
  });

  const filteredRows = rows.filter((r) => {
    if (activeTab === 'Published' && r.status !== 'Published') return false;
    if (activeTab === 'Drafts' && r.status !== 'Draft') return false;
    if (categoryFilter !== 'All Categories' && r.category !== categoryFilter) return false;
    if (statusFilter !== 'All Statuses' && r.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return r.question.toLowerCase().includes(q) || r.category.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredRows.length) setSelectedIds([]);
    else setSelectedIds(filteredRows.map((r) => r.id));
  };

  const toggleSelectRow = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleCreateFaq = (e) => {
    e.preventDefault();
    if (!newFaq.question.trim()) return;
    const created = {
      id: rows.length + 1,
      question: newFaq.question,
      category: newFaq.category,
      categoryBadge: 'bg-[#FCECEF] text-[#B01634]',
      views: 0,
      status: newFaq.status,
      statusBadge:
        newFaq.status === 'Published'
          ? 'bg-[#E6F7EC] text-[#1D7F44]'
          : 'bg-[#F1F5F9] text-[#475569]',
      lastUpdated: '30 Oct 2026',
    };
    setRows((prev) => [created, ...prev]);
    setNewFaq({ question: '', category: 'Orders', status: 'Published' });
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs font-medium text-[#2A476E]">
        <span>›</span>
        <Link to="/admin/wholesale" className="hover:underline">Wholesale</Link>
        <span>›</span>
        <Link to="/admin/content" className="hover:underline">Content</Link>
        <span>›</span>
        <span className="font-semibold text-[#1E3A5F]">FAQs</span>
      </nav>

      {/* Top Header & Create Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FCECEF] text-[#B01634]">
            <AdminIcon name="help-circle" className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#B01634] md:text-3xl">FAQs</h1>
            <p className="mt-0.5 text-xs text-[#2A476E]">
              Create and manage frequently asked questions to help your wholesale customers.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8E1428] to-[#D4224E] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-95"
        >
          <AdminIcon name="plus" className="h-4 w-4" />
          <span>Create New FAQ</span>
        </button>
      </div>

      {/* Create FAQ Modal */}
      {showCreateModal && (
        <form
          onSubmit={handleCreateFaq}
          className="rounded-2xl border border-[#E5B8C2] bg-white p-5 shadow-md"
        >
          <h3 className="font-serif text-lg font-bold text-[#B01634]">Create New FAQ</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className="block text-xs font-semibold text-[#1E3A5F]">
              Question *
              <input
                type="text"
                required
                value={newFaq.question}
                onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                placeholder="e.g., How do I request wholesale samples?"
                className="mt-1 w-full rounded-lg border border-[#EAE2E0] px-3 py-2 text-xs focus:border-[#B01634] focus:outline-none"
              />
            </label>
            <label className="block text-xs font-semibold text-[#1E3A5F]">
              Category
              <select
                value={newFaq.category}
                onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
                className="mt-1 w-full rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs"
              >
                <option value="Orders">Orders</option>
                <option value="Account">Account</option>
                <option value="Pricing">Pricing</option>
                <option value="Payments">Payments</option>
                <option value="Shipping">Shipping</option>
                <option value="Products">Products</option>
                <option value="Returns">Returns</option>
              </select>
            </label>
            <label className="block text-xs font-semibold text-[#1E3A5F]">
              Status
              <select
                value={newFaq.status}
                onChange={(e) => setNewFaq({ ...newFaq, status: e.target.value })}
                className="mt-1 w-full rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </label>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="rounded-lg border border-[#EAE2E0] px-4 py-2 text-xs font-semibold text-[#475569]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#AC1634] px-5 py-2 text-xs font-semibold text-white"
            >
              Save FAQ
            </button>
          </div>
        </form>
      )}

      {/* Main 2-Column Layout */}
      <div className="grid gap-5 xl:grid-cols-[1fr_290px] xl:items-start">
        {/* Left Main Area */}
        <div className="space-y-4">
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="flex items-center gap-3.5 rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#B01634]">
                <AdminIcon name="chat-help" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Total FAQs</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">32</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 28%</span>
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
                  <span className="text-2xl font-bold text-[#1E3A5F]">26</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 30%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">live on site</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FEF3D6] text-[#D97706]">
                <AdminIcon name="clock" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Drafts</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">4</span>
                  <span className="text-[11px] font-semibold text-[#DC2626]">↓ 20%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">in progress</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#B01634]">
                <AdminIcon name="eye" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Total Views</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">1,842</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 46%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">this month</p>
              </div>
            </div>
          </div>

          {/* 4 Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {FAQ_TABS.map((tab) => {
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
                placeholder="Search FAQs by question, keyword, or answer..."
                className="w-full bg-transparent text-xs text-[#1E3A5F] placeholder:text-[#64748B] focus:outline-none"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs font-medium text-[#1E3A5F] focus:outline-none"
            >
              <option value="All Categories">All Categories</option>
              <option value="Orders">Orders</option>
              <option value="Account">Account</option>
              <option value="Pricing">Pricing</option>
              <option value="Payments">Payments</option>
              <option value="Shipping">Shipping</option>
              <option value="Products">Products</option>
              <option value="Customization">Customization</option>
              <option value="Returns">Returns</option>
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
              <option>Sort by Latest</option>
              <option>Sort by Most Viewed</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setActiveTab('All FAQs');
                setCategoryFilter('All Categories');
                setStatusFilter('All Statuses');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5B8C2] bg-[#FCEEEF] px-3.5 py-2 text-xs font-semibold text-[#B01634] transition hover:bg-[#F8DCE0]"
            >
              <AdminIcon name="filter" className="h-3.5 w-3.5" />
              <span>Filters</span>
            </button>
          </div>

          {/* FAQs Table */}
          <div className="overflow-hidden rounded-2xl border border-[#EFE3E4] bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] text-left text-xs">
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
                    <th className="px-3 py-3.5">Question</th>
                    <th className="px-3 py-3.5 text-center">Category</th>
                    <th className="px-3 py-3.5 text-center">Views</th>
                    <th className="px-3 py-3.5 text-center">Status</th>
                    <th className="px-3 py-3.5">Last Updated</th>
                    <th className="px-4 py-3.5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4EAEB]">
                  {filteredRows.map((row) => (
                    <tr key={row.id} className="transition hover:bg-[#FDF9F8]">
                      <td className="px-4 py-3.5">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(row.id)}
                          onChange={() => toggleSelectRow(row.id)}
                          className="h-3.5 w-3.5 rounded accent-[#B01634]"
                        />
                      </td>
                      <td className="px-2 py-3.5 font-medium text-[#2A476E]">{row.id}</td>
                      <td className="max-w-[260px] px-3 py-3.5 font-semibold text-[#1E3A5F]">
                        {row.question}
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        <span className={`inline-block rounded-md px-3 py-1 text-[10px] font-semibold ${row.categoryBadge}`}>
                          {row.category}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 text-center font-semibold text-[#1E3A5F]">
                        {row.views}
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        <span className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold ${row.statusBadge}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 text-[#2A476E]">{row.lastUpdated}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-center gap-2.5 text-[#B01634]">
                          <Link to="/account/help" title="View" className="rounded p-1 hover:bg-[#FCECEF]">
                            <AdminIcon name="eye" className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setShowCreateModal(true)}
                            title="Edit"
                            className="rounded p-1 hover:bg-[#FCECEF]"
                          >
                            <AdminIcon name="edit" className="h-4 w-4" />
                          </button>
                          <button type="button" title="Duplicate" className="rounded p-1 hover:bg-[#FCECEF]">
                            <AdminIcon name="copy" className="h-4 w-4" />
                          </button>
                          <button type="button" title="More" className="rounded p-1 hover:bg-[#FCECEF]">
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
              <span>Showing 1 – {filteredRows.length} of 32 FAQs</span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded border border-[#EAE2E0] bg-white text-[#1E3A5F]"
                >
                  ‹
                </button>
                {[1, 2, 3, 4].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setCurrentPage(p)}
                    className={`flex h-7 w-7 items-center justify-center rounded text-xs font-semibold ${
                      currentPage === p
                        ? 'bg-[#AC1634] text-white'
                        : 'border border-[#EAE2E0] bg-white text-[#1E3A5F]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(4, p + 1))}
                  className="flex h-7 w-7 items-center justify-center rounded border border-[#EAE2E0] bg-white text-[#1E3A5F]"
                >
                  ›
                </button>
              </div>

              <select className="rounded-lg border border-[#EAE2E0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#1E3A5F]">
                <option>10 per page</option>
                <option>20 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets Column */}
        <div className="space-y-4">
          {/* 1. FAQ Category Distribution Donut Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
              <AdminIcon name="settings" className="h-4 w-4" />
              <h3 className="font-serif text-sm">FAQ Category Distribution</h3>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="relative h-28 w-28 shrink-0">
                <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F3E8EE" strokeWidth="5" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#EC88A4" strokeWidth="5" strokeDasharray="22 88" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#9CC9F8" strokeWidth="5" strokeDasharray="17 88" strokeDashoffset="-22" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F8D08B" strokeWidth="5" strokeDasharray="15 88" strokeDashoffset="-39" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#C5A3F6" strokeWidth="5" strokeDasharray="16 88" strokeDashoffset="-54" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#8CE0B5" strokeWidth="5" strokeDasharray="18 88" strokeDashoffset="-70" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-bold leading-none text-[#1E3A5F]">32</span>
                  <span className="mt-0.5 text-[9px] leading-tight text-[#475569]">Total<br />FAQs</span>
                </div>
              </div>

              <ul className="space-y-1 text-[10px] text-[#1E3A5F]">
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#EC88A4]" />
                  <span><strong>Orders</strong> 8 (25%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#9CC9F8]" />
                  <span><strong>Shipping</strong> 6 (19%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#C5A3F6]" />
                  <span><strong>Products</strong> 5 (16%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#8CE0B5]" />
                  <span><strong>Payments</strong> 4 (13%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#F8D08B]" />
                  <span><strong>Account</strong> 4 (13%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#FCA5A5]" />
                  <span><strong>Returns</strong> 3 (9%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#CBD5E1]" />
                  <span><strong>Others</strong> 2 (5%)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Top Viewed FAQs Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
                <AdminIcon name="reports" className="h-4 w-4" />
                <h3 className="font-serif text-sm">Top Viewed FAQs</h3>
              </div>
              <span className="text-[10px] font-semibold text-[#B01634]">View All →</span>
            </div>

            <div className="mt-3.5 space-y-3">
              {TOP_VIEWED_FAQS.map((item) => (
                <div key={item.rank} className="flex items-start gap-2.5">
                  <span className="mt-0.5 w-3 text-xs font-bold text-[#1E3A5F]">{item.rank}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[10px] font-semibold leading-snug text-[#1E3A5F]">
                        {item.question}
                      </p>
                      <span className="shrink-0 text-[9px] font-medium text-[#475569]">{item.views}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
                      <div className={`h-full rounded-full bg-[#EC88A4] ${item.progress}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Quick Actions Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
              <AdminIcon name="grid" className="h-4 w-4" />
              <h3 className="font-serif text-sm">Quick Actions</h3>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 rounded-xl border border-[#F5DCE0] bg-[#FDF2F4] p-3 text-left text-[#B01634] transition hover:bg-[#FCE4E8]"
              >
                <AdminIcon name="plus" className="h-4 w-4 shrink-0" />
                <span>Create New FAQ</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('Categories')}
                className="flex items-center gap-2 rounded-xl border border-[#D8E6FA] bg-[#F0F6FF] p-3 text-left text-[#1D5B9E] transition hover:bg-[#E2EEFF]"
              >
                <AdminIcon name="folder" className="h-4 w-4 shrink-0" />
                <span>Manage Categories</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-[#D5F0DF] bg-[#EFFAF3] p-3 text-left text-[#1D7F44] transition hover:bg-[#E0F5E9]"
              >
                <AdminIcon name="sort" className="h-4 w-4 shrink-0" />
                <span>Reorder FAQs</span>
              </button>
              <Link
                to="/account/help"
                className="flex items-center gap-2 rounded-xl border border-[#FDE6C4] bg-[#FFF8EB] p-3 text-left text-[#B86E00] transition hover:bg-[#FEF0D6]"
              >
                <AdminIcon name="eye" className="h-4 w-4 shrink-0" />
                <span>View on Store</span>
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
              Have questions about managing FAQs? Contact our support team.
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
