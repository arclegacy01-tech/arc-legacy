import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminIcon } from '../../../components/admin/AdminIcons.jsx';

const COLLECTION_TABS = ['All Collections', 'Published', 'Scheduled', 'Drafts', 'Archived'];

const INITIAL_COLLECTIONS = [
  {
    id: 1,
    name: 'Lace Trims Wholesale',
    handle: 'lace-trims',
    thumbnail: '/images/home-story-lace.jpg',
    products: 86,
    sortOrder: 1,
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    lastUpdated: '18 Oct 2026',
  },
  {
    id: 2,
    name: 'Embroidered Laces',
    handle: 'embroidered-laces',
    thumbnail: '/images/provided-floral-lace.jpg',
    products: 64,
    sortOrder: 2,
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    lastUpdated: '16 Oct 2026',
  },
  {
    id: 3,
    name: 'Zari Laces',
    handle: 'zari-laces',
    thumbnail: '/images/product-1.jpg',
    products: 48,
    sortOrder: 3,
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    lastUpdated: '14 Oct 2026',
  },
  {
    id: 4,
    name: 'Crochet Laces',
    handle: 'crochet-laces',
    thumbnail: '/images/provided-pearl-lace.jpg',
    products: 36,
    sortOrder: 4,
    status: 'Scheduled',
    statusBadge: 'bg-[#FEF3D6] text-[#B86E00]',
    lastUpdated: '12 Oct 2026',
  },
  {
    id: 5,
    name: 'Net Laces',
    handle: 'net-laces',
    thumbnail: '/images/product-7.jpg',
    products: 42,
    sortOrder: 5,
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    lastUpdated: '10 Oct 2026',
  },
  {
    id: 6,
    name: 'Designer Laces',
    handle: 'designer-laces',
    thumbnail: '/images/product-10.jpg',
    products: 38,
    sortOrder: 6,
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    lastUpdated: '08 Oct 2026',
  },
  {
    id: 7,
    name: 'Festival Collection',
    handle: 'festival-collection',
    thumbnail: '/images/product-12.jpg',
    products: 54,
    sortOrder: 7,
    status: 'Draft',
    statusBadge: 'bg-[#F1F5F9] text-[#475569]',
    lastUpdated: '05 Oct 2026',
  },
  {
    id: 8,
    name: 'New Arrivals',
    handle: 'new-arrivals',
    thumbnail: '/images/home-mfg-rolls.jpg',
    products: 72,
    sortOrder: 8,
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    lastUpdated: '02 Oct 2026',
  },
  {
    id: 9,
    name: 'Best Sellers',
    handle: 'best-sellers',
    thumbnail: '/images/home-mfg-hands.jpg',
    products: 60,
    sortOrder: 9,
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    lastUpdated: '28 Sep 2026',
  },
  {
    id: 10,
    name: 'Bulk Packs',
    handle: 'bulk-packs',
    thumbnail: '/images/home-mfg-shelves.jpg',
    products: 28,
    sortOrder: 10,
    status: 'Scheduled',
    statusBadge: 'bg-[#FEF3D6] text-[#B86E00]',
    lastUpdated: '25 Sep 2026',
  },
];

const TOP_COLLECTIONS = [
  {
    rank: 1,
    name: 'Lace Trims Wholesale',
    count: '86 products',
    progress: 'w-[92%]',
    thumbnail: '/images/home-story-lace.jpg',
  },
  {
    rank: 2,
    name: 'New Arrivals',
    count: '72 products',
    progress: 'w-[78%]',
    thumbnail: '/images/home-mfg-rolls.jpg',
  },
  {
    rank: 3,
    name: 'Best Sellers',
    count: '60 products',
    progress: 'w-[66%]',
    thumbnail: '/images/home-mfg-hands.jpg',
  },
  {
    rank: 4,
    name: 'Festival Collection',
    count: '54 products',
    progress: 'w-[58%]',
    thumbnail: '/images/product-12.jpg',
  },
  {
    rank: 5,
    name: 'Embroidered Laces',
    count: '64 products',
    progress: 'w-[70%]',
    thumbnail: '/images/provided-floral-lace.jpg',
  },
];

export default function AdminHomepagePage() {
  const [rows, setRows] = useState(INITIAL_COLLECTIONS);
  const [activeTab, setActiveTab] = useState('All Collections');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCollection, setNewCollection] = useState({
    name: '',
    handle: '',
    status: 'Published',
  });

  const filteredRows = rows.filter((r) => {
    if (activeTab === 'Published' && r.status !== 'Published') return false;
    if (activeTab === 'Scheduled' && r.status !== 'Scheduled') return false;
    if (activeTab === 'Drafts' && r.status !== 'Draft') return false;
    if (activeTab === 'Archived' && r.status !== 'Archived') return false;
    if (statusFilter !== 'All Statuses' && r.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.handle.toLowerCase().includes(q);
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

  const handleCreateCollection = (e) => {
    e.preventDefault();
    if (!newCollection.name.trim()) return;
    const slug =
      newCollection.handle.trim() ||
      newCollection.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const created = {
      id: rows.length + 1,
      name: newCollection.name,
      handle: slug,
      thumbnail: '/images/provided-floral-lace.jpg',
      products: 12,
      sortOrder: rows.length + 1,
      status: newCollection.status,
      statusBadge:
        newCollection.status === 'Published'
          ? 'bg-[#E6F7EC] text-[#1D7F44]'
          : 'bg-[#F1F5F9] text-[#475569]',
      lastUpdated: '30 Oct 2026',
    };
    setRows((prev) => [created, ...prev]);
    setNewCollection({ name: '', handle: '', status: 'Published' });
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
        <span className="font-semibold text-[#1E3A5F]">Collection Pages</span>
      </nav>

      {/* Top Header & Create Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FCECEF] text-[#B01634]">
            <AdminIcon name="content" className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#B01634] md:text-3xl">
              Collection Pages
            </h1>
            <p className="mt-0.5 text-xs text-[#2A476E]">
              Create and manage collection pages to organize wholesale products by categories, themes, or occasions.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8E1428] to-[#D4224E] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-95"
        >
          <AdminIcon name="plus" className="h-4 w-4" />
          <span>Create Collection Page</span>
        </button>
      </div>

      {/* Create Collection Modal */}
      {showCreateModal && (
        <form
          onSubmit={handleCreateCollection}
          className="rounded-2xl border border-[#E5B8C2] bg-white p-5 shadow-md"
        >
          <h3 className="font-serif text-lg font-bold text-[#B01634]">Create Collection Page</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className="block text-xs font-semibold text-[#1E3A5F]">
              Collection Name *
              <input
                type="text"
                required
                value={newCollection.name}
                onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                placeholder="e.g., Bridal Zari Borders"
                className="mt-1 w-full rounded-lg border border-[#EAE2E0] px-3 py-2 text-xs focus:border-[#B01634] focus:outline-none"
              />
            </label>
            <label className="block text-xs font-semibold text-[#1E3A5F]">
              URL Handle
              <input
                type="text"
                value={newCollection.handle}
                onChange={(e) => setNewCollection({ ...newCollection, handle: e.target.value })}
                placeholder="bridal-zari-borders"
                className="mt-1 w-full rounded-lg border border-[#EAE2E0] px-3 py-2 text-xs focus:border-[#B01634] focus:outline-none"
              />
            </label>
            <label className="block text-xs font-semibold text-[#1E3A5F]">
              Status
              <select
                value={newCollection.status}
                onChange={(e) => setNewCollection({ ...newCollection, status: e.target.value })}
                className="mt-1 w-full rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs"
              >
                <option value="Published">Published</option>
                <option value="Scheduled">Scheduled</option>
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
              Save Collection
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
                <AdminIcon name="layers" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Total Collections</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">24</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 26%</span>
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
                  <span className="text-2xl font-bold text-[#1E3A5F]">18</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 20%</span>
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
                  <span className="text-2xl font-bold text-[#1E3A5F]">3</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 50%</span>
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
                  <span className="text-2xl font-bold text-[#1E3A5F]">3</span>
                  <span className="text-[11px] font-semibold text-[#DC2626]">↓ 25%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">in progress</p>
              </div>
            </div>
          </div>

          {/* 5 Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {COLLECTION_TABS.map((tab) => {
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
                placeholder="Search collections by name, handle, or description..."
                className="w-full bg-transparent text-xs text-[#1E3A5F] placeholder:text-[#64748B] focus:outline-none"
              />
            </div>

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
              <option>All Seasons / Themes</option>
              <option>Bridal & Festive</option>
              <option>Everyday Essentials</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setActiveTab('All Collections');
                setStatusFilter('All Statuses');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5B8C2] bg-[#FCEEEF] px-3.5 py-2 text-xs font-semibold text-[#B01634] transition hover:bg-[#F8DCE0]"
            >
              <AdminIcon name="filter" className="h-3.5 w-3.5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Collections Table */}
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
                    <th className="px-3 py-3.5">Collection Name</th>
                    <th className="px-3 py-3.5">Handle</th>
                    <th className="px-3 py-3.5 text-center">Thumbnail</th>
                    <th className="px-3 py-3.5 text-center">Products</th>
                    <th className="px-3 py-3.5 text-center">Sort Order</th>
                    <th className="px-3 py-3.5 text-center">Status</th>
                    <th className="px-3 py-3.5">Last Updated</th>
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
                      <td className="px-3 py-3 font-semibold text-[#1E3A5F]">{row.name}</td>
                      <td className="px-3 py-3 text-[#2A476E]">{row.handle}</td>
                      <td className="px-3 py-3">
                        <div className="mx-auto h-9 w-16 overflow-hidden rounded-md border border-[#E5DEC9] bg-[#F5EFE6]">
                          <img
                            src={row.thumbnail}
                            alt={row.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-3 py-3 text-center font-semibold text-[#1E3A5F]">
                        {row.products}
                      </td>
                      <td className="px-3 py-3 text-center text-[#2A476E]">{row.sortOrder}</td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold ${row.statusBadge}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-[#2A476E]">{row.lastUpdated}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2.5 text-[#B01634]">
                          <Link
                            to={`/category/${row.handle}`}
                            title="View"
                            className="rounded p-1 hover:bg-[#FCECEF]"
                          >
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
              <span>Showing 1 – {filteredRows.length} of 24 collections</span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded border border-[#EAE2E0] bg-white text-[#1E3A5F]"
                >
                  ‹
                </button>
                {[1, 2, 3].map((p) => (
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
                  onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
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
          {/* 1. Collection Status Distribution Donut Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
              <AdminIcon name="settings" className="h-4 w-4" />
              <h3 className="font-serif text-sm">Collection Status Distribution</h3>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="relative h-28 w-28 shrink-0">
                <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F3E8EE" strokeWidth="5" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#8CE0B5" strokeWidth="5" strokeDasharray="66 88" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F8D08B" strokeWidth="5" strokeDasharray="11 88" strokeDashoffset="-66" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#EC88A4" strokeWidth="5" strokeDasharray="11 88" strokeDashoffset="-77" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-bold leading-none text-[#1E3A5F]">24</span>
                  <span className="mt-0.5 text-[9px] leading-tight text-[#475569]">Total<br />Collections</span>
                </div>
              </div>

              <ul className="space-y-2 text-[10px] text-[#1E3A5F]">
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#8CE0B5]" />
                  <span><strong>Published</strong><br />18 (75%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#F8D08B]" />
                  <span><strong>Scheduled</strong><br />3 (12%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#EC88A4]" />
                  <span><strong>Drafts</strong><br />3 (13%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#CBD5E1]" />
                  <span><strong>Archived</strong><br />0 (0%)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Top Collections by Products Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
                <AdminIcon name="reports" className="h-4 w-4" />
                <h3 className="font-serif text-sm">Top Collections by Products</h3>
              </div>
              <span className="text-[10px] font-semibold text-[#B01634]">View All →</span>
            </div>

            <div className="mt-3.5 space-y-3">
              {TOP_COLLECTIONS.map((col) => (
                <div key={col.rank} className="flex items-center gap-2.5">
                  <span className="w-3 text-xs font-bold text-[#1E3A5F]">{col.rank}</span>
                  <img
                    src={col.thumbnail}
                    alt={col.name}
                    className="h-10 w-12 shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-semibold text-[#1E3A5F]">{col.name}</p>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F5F9]">
                        <div className={`h-full rounded-full bg-[#EC88A4] ${col.progress}`} />
                      </div>
                      <span className="shrink-0 text-[9px] font-medium text-[#475569]">{col.count}</span>
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
                <span>Create Collection Page</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-[#D8E6FA] bg-[#F0F6FF] p-3 text-left text-[#1D5B9E] transition hover:bg-[#E2EEFF]"
              >
                <AdminIcon name="sort" className="h-4 w-4 shrink-0" />
                <span>Reorder Collections</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('Published')}
                className="flex items-center gap-2 rounded-xl border border-[#D5F0DF] bg-[#EFFAF3] p-3 text-left text-[#1D7F44] transition hover:bg-[#E0F5E9]"
              >
                <AdminIcon name="check-circle" className="h-4 w-4 shrink-0" />
                <span>Bulk Publish</span>
              </button>
              <Link
                to="/admin/media"
                className="flex items-center gap-2 rounded-xl border border-[#FDE6C4] bg-[#FFF8EB] p-3 text-left text-[#B86E00] transition hover:bg-[#FEF0D6]"
              >
                <AdminIcon name="image" className="h-4 w-4 shrink-0" />
                <span>Manage Collection Images</span>
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
              Have questions about collection pages? Contact our support team.
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
