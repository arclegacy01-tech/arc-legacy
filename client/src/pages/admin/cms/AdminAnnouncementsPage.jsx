import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminIcon } from '../../../components/admin/AdminIcons.jsx';

const ANNOUNCEMENT_TABS = ['All Announcements', 'Published', 'Scheduled', 'Drafts', 'Expired'];

const INITIAL_ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Diwali Wholesale Special Offer',
    type: 'Offer',
    typeBadge: 'bg-[#FCECEF] text-[#B01634]',
    thumbnail: '/images/product-12.jpg',
    audience: 'All Customers',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '10 Oct 2026',
    expiryDate: '20 Oct 2026',
  },
  {
    id: 2,
    title: 'New Collection Launch – Premium Laces',
    type: 'Product Update',
    typeBadge: 'bg-[#E8F2FF] text-[#1D5B9E]',
    thumbnail: '/images/provided-floral-lace.jpg',
    audience: 'All Customers',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '05 Oct 2026',
    expiryDate: '-',
  },
  {
    id: 3,
    title: 'Important Update: Price Revision',
    type: 'Policy Update',
    typeBadge: 'bg-[#FFF1E0] text-[#C25E00]',
    thumbnail: '/images/home-mfg-rolls.jpg',
    audience: 'All Customers',
    status: 'Scheduled',
    statusBadge: 'bg-[#FEF3D6] text-[#B86E00]',
    publishDate: '25 Oct 2026',
    expiryDate: '-',
  },
  {
    id: 4,
    title: 'Bulk Order Discount Extended',
    type: 'Offer',
    typeBadge: 'bg-[#FCECEF] text-[#B01634]',
    thumbnail: '/images/product-1.jpg',
    audience: 'Wholesale Customers',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '01 Oct 2026',
    expiryDate: '31 Oct 2026',
  },
  {
    id: 5,
    title: 'Holiday Shipping Schedule',
    type: 'Operational',
    typeBadge: 'bg-[#F3EAFF] text-[#6B21A8]',
    thumbnail: '/images/home-mfg-shelves.jpg',
    audience: 'All Customers',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '28 Sep 2026',
    expiryDate: '-',
  },
  {
    id: 6,
    title: 'New Payment Options Available',
    type: 'Payment Update',
    typeBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    thumbnail: '/images/product-6.jpg',
    audience: 'All Customers',
    status: 'Draft',
    statusBadge: 'bg-[#F1F5F9] text-[#475569]',
    publishDate: '-',
    expiryDate: '-',
  },
  {
    id: 7,
    title: 'Customer Refer & Earn Program',
    type: 'Offer',
    typeBadge: 'bg-[#FCECEF] text-[#B01634]',
    thumbnail: '/images/product-8.jpg',
    audience: 'All Customers',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '20 Sep 2026',
    expiryDate: '31 Dec 2026',
  },
  {
    id: 8,
    title: 'Upcoming Collection: Festival Season',
    type: 'Product Update',
    typeBadge: 'bg-[#E8F2FF] text-[#1D5B9E]',
    thumbnail: '/images/product-4.jpg',
    audience: 'Wholesale Customers',
    status: 'Scheduled',
    statusBadge: 'bg-[#FEF3D6] text-[#B86E00]',
    publishDate: '18 Oct 2026',
    expiryDate: '-',
  },
  {
    id: 9,
    title: 'System Maintenance Notice',
    type: 'Operational',
    typeBadge: 'bg-[#F3EAFF] text-[#6B21A8]',
    thumbnail: '/images/home-mfg-hands.jpg',
    audience: 'All Customers',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '15 Sep 2026',
    expiryDate: '15 Sep 2026',
  },
  {
    id: 10,
    title: 'New Wholesale Pricing Tier Benefits',
    type: 'Policy Update',
    typeBadge: 'bg-[#FFF1E0] text-[#C25E00]',
    thumbnail: '/images/provided-pearl-lace.jpg',
    audience: 'Wholesale Customers',
    status: 'Expired',
    statusBadge: 'bg-[#FEE2E2] text-[#B91C1C]',
    publishDate: '01 Sep 2026',
    expiryDate: '10 Sep 2026',
  },
];

export default function AdminAnnouncementsPage() {
  const [rows, setRows] = useState(INITIAL_ANNOUNCEMENTS);
  const [activeTab, setActiveTab] = useState('All Announcements');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [audienceFilter, setAudienceFilter] = useState('All Target Audience');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newForm, setNewForm] = useState({
    title: '',
    type: 'Offer',
    audience: 'All Customers',
    status: 'Published',
  });

  const filteredRows = rows.filter((r) => {
    if (activeTab === 'Published' && r.status !== 'Published') return false;
    if (activeTab === 'Scheduled' && r.status !== 'Scheduled') return false;
    if (activeTab === 'Drafts' && r.status !== 'Draft') return false;
    if (activeTab === 'Expired' && r.status !== 'Expired') return false;
    if (typeFilter !== 'All Types' && r.type !== typeFilter) return false;
    if (audienceFilter !== 'All Target Audience' && r.audience !== audienceFilter) return false;
    if (statusFilter !== 'All Statuses' && r.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.audience.toLowerCase().includes(q)
      );
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

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newForm.title.trim()) return;
    const nextItem = {
      id: rows.length + 1,
      title: newForm.title,
      type: newForm.type,
      typeBadge: 'bg-[#FCECEF] text-[#B01634]',
      thumbnail: '/images/home-mfg-rolls.jpg',
      audience: newForm.audience,
      status: newForm.status,
      statusBadge:
        newForm.status === 'Published'
          ? 'bg-[#E6F7EC] text-[#1D7F44]'
          : 'bg-[#FEF3D6] text-[#B86E00]',
      publishDate: '30 Oct 2026',
      expiryDate: '-',
    };
    setRows((prev) => [nextItem, ...prev]);
    setNewForm({ title: '', type: 'Offer', audience: 'All Customers', status: 'Published' });
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
        <span className="font-semibold text-[#1E3A5F]">Announcements</span>
      </nav>

      {/* Top Header & Create Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FCECEF] text-[#B01634]">
            <AdminIcon name="megaphone" className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#B01634] md:text-3xl">
              Announcements
            </h1>
            <p className="mt-0.5 text-xs text-[#2A476E]">
              Create and manage important announcements to keep your wholesale customers informed.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8E1428] to-[#D4224E] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-95"
        >
          <AdminIcon name="plus" className="h-4 w-4" />
          <span>Create Announcement</span>
        </button>
      </div>

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <form
          onSubmit={handleCreateSubmit}
          className="rounded-2xl border border-[#E5B8C2] bg-white p-5 shadow-md"
        >
          <h3 className="font-serif text-lg font-bold text-[#B01634]">Create New Announcement</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className="block text-xs font-semibold text-[#1E3A5F]">
              Title *
              <input
                type="text"
                required
                value={newForm.title}
                onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                placeholder="e.g., Festive Wholesale Offer"
                className="mt-1 w-full rounded-lg border border-[#EAE2E0] px-3 py-2 text-xs focus:border-[#B01634] focus:outline-none"
              />
            </label>
            <label className="block text-xs font-semibold text-[#1E3A5F]">
              Type
              <select
                value={newForm.type}
                onChange={(e) => setNewForm({ ...newForm, type: e.target.value })}
                className="mt-1 w-full rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs"
              >
                <option value="Offer">Offer</option>
                <option value="Product Update">Product Update</option>
                <option value="Policy Update">Policy Update</option>
                <option value="Operational">Operational</option>
              </select>
            </label>
            <label className="block text-xs font-semibold text-[#1E3A5F]">
              Target Audience
              <select
                value={newForm.audience}
                onChange={(e) => setNewForm({ ...newForm, audience: e.target.value })}
                className="mt-1 w-full rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs"
              >
                <option value="All Customers">All Customers</option>
                <option value="Wholesale Customers">Wholesale Customers</option>
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
              Save Announcement
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
                <AdminIcon name="megaphone" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Total Announcements</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">12</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 33%</span>
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
                  <span className="text-2xl font-bold text-[#1E3A5F]">9</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 29%</span>
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
                  <span className="text-2xl font-bold text-[#1E3A5F]">2</span>
                  <span className="text-[11px] font-semibold text-[#64748B]">↑ 0%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">scheduled for future</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#B01634]">
                <AdminIcon name="draft" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Drafts</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">1</span>
                  <span className="text-[11px] font-semibold text-[#DC2626]">↓ 50%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">in progress</p>
              </div>
            </div>
          </div>

          {/* 5 Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {ANNOUNCEMENT_TABS.map((tab) => {
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
                placeholder="Search announcements by title, content, or target audience..."
                className="w-full bg-transparent text-xs text-[#1E3A5F] placeholder:text-[#64748B] focus:outline-none"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs font-medium text-[#1E3A5F] focus:outline-none"
            >
              <option value="All Types">All Types</option>
              <option value="Offer">Offer</option>
              <option value="Product Update">Product Update</option>
              <option value="Policy Update">Policy Update</option>
              <option value="Operational">Operational</option>
              <option value="Payment Update">Payment Update</option>
            </select>

            <select
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value)}
              className="rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs font-medium text-[#1E3A5F] focus:outline-none"
            >
              <option value="All Target Audience">All Target Audience</option>
              <option value="All Customers">All Customers</option>
              <option value="Wholesale Customers">Wholesale Customers</option>
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
              <option value="Expired">Expired</option>
            </select>

            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs font-medium text-[#1E3A5F]"
            >
              <AdminIcon name="calendar" className="h-3.5 w-3.5 text-[#1E3A5F]" />
              <span>Select Date Range</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('All Announcements');
                setTypeFilter('All Types');
                setAudienceFilter('All Target Audience');
                setStatusFilter('All Statuses');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5B8C2] bg-[#FCEEEF] px-3.5 py-2 text-xs font-semibold text-[#B01634] transition hover:bg-[#F8DCE0]"
            >
              <AdminIcon name="filter" className="h-3.5 w-3.5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Announcements Table */}
          <div className="overflow-hidden rounded-2xl border border-[#EFE3E4] bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-xs">
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
                    <th className="px-3 py-3.5">Title</th>
                    <th className="px-3 py-3.5 text-center">Type</th>
                    <th className="px-3 py-3.5 text-center">Thumbnail</th>
                    <th className="px-3 py-3.5">Target Audience</th>
                    <th className="px-3 py-3.5 text-center">Status</th>
                    <th className="px-3 py-3.5">Publish Date</th>
                    <th className="px-3 py-3.5">Expiry Date</th>
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
                      <td className="max-w-[190px] px-3 py-3 font-semibold text-[#1E3A5F]">
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
                      <td className="px-3 py-3 font-medium text-[#2A476E]">{row.audience}</td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold ${row.statusBadge}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-[#2A476E]">{row.publishDate}</td>
                      <td className="px-3 py-3 text-[#2A476E]">{row.expiryDate}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2.5 text-[#B01634]">
                          <button type="button" title="View" className="rounded p-1 hover:bg-[#FCECEF]">
                            <AdminIcon name="eye" className="h-4 w-4" />
                          </button>
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
              <span>Showing 1 – {filteredRows.length} of 12 announcements</span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className="flex h-7 w-7 items-center justify-center rounded border border-[#EAE2E0] bg-white text-[#1E3A5F]"
                >
                  ‹
                </button>
                {[1, 2].map((p) => (
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
                  onClick={() => setCurrentPage(2)}
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
          {/* 1. Announcement Types Donut Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
              <AdminIcon name="settings" className="h-4 w-4" />
              <h3 className="font-serif text-sm">Announcement Types</h3>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="relative h-28 w-28 shrink-0">
                <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F3E8EE" strokeWidth="5" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#EC88A4" strokeWidth="5" strokeDasharray="29 88" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#8CE0B5" strokeWidth="5" strokeDasharray="22 88" strokeDashoffset="-29" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F8D08B" strokeWidth="5" strokeDasharray="15 88" strokeDashoffset="-51" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#C5A3F6" strokeWidth="5" strokeDasharray="14 88" strokeDashoffset="-66" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#9CC9F8" strokeWidth="5" strokeDasharray="8 88" strokeDashoffset="-80" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-bold leading-none text-[#1E3A5F]">12</span>
                  <span className="mt-0.5 text-[9px] text-[#475569]">Total</span>
                </div>
              </div>

              <ul className="space-y-1.5 text-[10px] text-[#1E3A5F]">
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#EC88A4]" />
                  <span><strong>Offers</strong> 4 (33%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#8CE0B5]" />
                  <span><strong>Product Updates</strong> 3 (25%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#F8D08B]" />
                  <span><strong>Policy Updates</strong> 2 (17%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#C5A3F6]" />
                  <span><strong>Operational</strong> 2 (16%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#9CC9F8]" />
                  <span><strong>General</strong> 1 (9%)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Upcoming Announcements Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
                <AdminIcon name="calendar" className="h-4 w-4" />
                <h3 className="font-serif text-sm">Upcoming Announcements</h3>
              </div>
              <span className="text-[10px] font-semibold text-[#B01634]">View All →</span>
            </div>

            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-[#F4EAEB] bg-[#FDFBF9] p-2.5">
                <img
                  src="/images/home-mfg-rolls.jpg"
                  alt="Price Revision"
                  className="h-12 w-14 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-bold text-[#1E3A5F]">
                    Important Update: Price Revision
                  </p>
                  <div className="mt-1 flex items-center justify-between gap-1">
                    <span className="text-[10px] text-[#64748B]">25 Oct 2026</span>
                    <span className="rounded bg-[#FEF3D6] px-1.5 py-0.5 text-[9px] font-semibold text-[#B86E00]">
                      Scheduled
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-[#F4EAEB] bg-[#FDFBF9] p-2.5">
                <img
                  src="/images/product-4.jpg"
                  alt="Festival Season"
                  className="h-12 w-14 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-bold text-[#1E3A5F]">
                    Upcoming Collection: Festival Season
                  </p>
                  <div className="mt-1 flex items-center justify-between gap-1">
                    <span className="text-[10px] text-[#64748B]">18 Oct 2026</span>
                    <span className="rounded bg-[#FEF3D6] px-1.5 py-0.5 text-[9px] font-semibold text-[#B86E00]">
                      Scheduled
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Recent Activity Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
                <AdminIcon name="clock" className="h-4 w-4" />
                <h3 className="font-serif text-sm">Recent Activity</h3>
              </div>
              <span className="text-[10px] font-semibold text-[#B01634]">View All →</span>
            </div>

            <ul className="mt-3 divide-y divide-[#F6ECEE] text-[11px]">
              {[
                { title: 'Diwali Wholesale Special Offer', sub: 'published by Admin', time: '2 min ago', dot: 'bg-[#16A34A]' },
                { title: 'Holiday Shipping Schedule', sub: 'updated by Admin', time: '15 min ago', dot: 'bg-[#E11D48]' },
                { title: 'New Payment Options', sub: 'saved as draft', time: '1 hour ago', dot: 'bg-[#6366F1]' },
                { title: 'System Maintenance Notice', sub: 'published', time: '3 hours ago', dot: 'bg-[#16A34A]' },
                { title: 'New Wholesale Pricing Tier', sub: 'expired automatically', time: '5 hours ago', dot: 'bg-[#DC2626]' },
              ].map((item) => (
                <li key={item.title} className="flex items-start justify-between gap-2 py-2.5">
                  <div className="flex items-start gap-2.5">
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.dot}`} />
                    <div>
                      <p className="font-semibold text-[#1E3A5F]">{item.title}</p>
                      <p className="text-[10px] text-[#64748B]">{item.sub}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-[10px] text-[#64748B]">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Quick Actions Card */}
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
                <span>Create Announcement</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-[#D8E6FA] bg-[#F0F6FF] p-3 text-left text-[#1D5B9E] transition hover:bg-[#E2EEFF]"
              >
                <AdminIcon name="folder" className="h-4 w-4 shrink-0" />
                <span>Manage Categories</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('Scheduled')}
                className="flex items-center gap-2 rounded-xl border border-[#FDE6C4] bg-[#FFF8EB] p-3 text-left text-[#B86E00] transition hover:bg-[#FEF0D6]"
              >
                <AdminIcon name="clock" className="h-4 w-4 shrink-0" />
                <span>Schedule Announcement</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('All Announcements')}
                className="flex items-center gap-2 rounded-xl border border-[#D5F0DF] bg-[#EFFAF3] p-3 text-left text-[#1D7F44] transition hover:bg-[#E0F5E9]"
              >
                <AdminIcon name="content" className="h-4 w-4 shrink-0" />
                <span>View All Announcements</span>
              </button>
            </div>
          </div>

          {/* 5. Need Help? Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
              <AdminIcon name="support" className="h-4 w-4" />
              <h3 className="font-serif text-sm">Need Help?</h3>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-[#2A476E]">
              Have questions about announcements? Contact our support team.
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
