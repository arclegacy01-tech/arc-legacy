import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminIcon } from '../../../components/admin/AdminIcons.jsx';

const BLOG_TABS = ['All Posts', 'Published', 'Scheduled', 'Drafts', 'Categories', 'Tags'];

const INITIAL_BLOG_ROWS = [
  {
    id: 1,
    title: 'How to Choose the Right Lace for Your Collection',
    thumbnail: '/images/home-story-lace.jpg',
    category: 'Buying Guide',
    categoryBadge: 'bg-[#E8F2FF] text-[#1D5B9E]',
    author: 'Admin',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '18 Oct 2026',
    views: '1,240',
  },
  {
    id: 2,
    title: 'Top 10 Trending Lace Designs for 2026',
    thumbnail: '/images/provided-floral-lace.jpg',
    category: 'Trends',
    categoryBadge: 'bg-[#FCECEF] text-[#B01634]',
    author: 'Admin',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '15 Oct 2026',
    views: '980',
  },
  {
    id: 3,
    title: 'Wholesale Lace Buying Tips for New Businesses',
    thumbnail: '/images/home-mfg-rolls.jpg',
    category: 'Business Tips',
    categoryBadge: 'bg-[#F3EAFF] text-[#6B21A8]',
    author: 'Admin',
    status: 'Scheduled',
    statusBadge: 'bg-[#FEF3D6] text-[#B86E00]',
    publishDate: '20 Oct 2026',
    views: '0',
  },
  {
    id: 4,
    title: 'Different Types of Laces and Their Uses',
    thumbnail: '/images/product-1.jpg',
    category: 'Product Guide',
    categoryBadge: 'bg-[#E8F2FF] text-[#1D5B9E]',
    author: 'Admin',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '12 Oct 2026',
    views: '760',
  },
  {
    id: 5,
    title: 'How to Start a Lace Business in India',
    thumbnail: '/images/product-3.jpg',
    category: 'Business Guide',
    categoryBadge: 'bg-[#E8F2FF] text-[#1D5B9E]',
    author: 'Admin',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '10 Oct 2026',
    views: '1,520',
  },
  {
    id: 6,
    title: 'Net vs Cotton Lace: Which is Better?',
    thumbnail: '/images/provided-pearl-lace.jpg',
    category: 'Comparison',
    categoryBadge: 'bg-[#FFF1E0] text-[#C25E00]',
    author: 'Admin',
    status: 'Draft',
    statusBadge: 'bg-[#F1F5F9] text-[#475569]',
    publishDate: '-',
    views: '0',
  },
  {
    id: 7,
    title: 'Festive Season Lace Collection Ideas',
    thumbnail: '/images/product-12.jpg',
    category: 'Seasonal',
    categoryBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    author: 'Admin',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '05 Oct 2026',
    views: '890',
  },
  {
    id: 8,
    title: 'Caring for Your Lace Products',
    thumbnail: '/images/home-mfg-hands.jpg',
    category: 'Care & Maintenance',
    categoryBadge: 'bg-[#F3EAFF] text-[#6B21A8]',
    author: 'Admin',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '02 Oct 2026',
    views: '670',
  },
  {
    id: 9,
    title: 'Lace Business Success Stories',
    thumbnail: '/images/home-mfg-shelves.jpg',
    category: 'Customer Stories',
    categoryBadge: 'bg-[#F3EAFF] text-[#6B21A8]',
    author: 'Admin',
    status: 'Scheduled',
    statusBadge: 'bg-[#FEF3D6] text-[#B86E00]',
    publishDate: '22 Oct 2026',
    views: '0',
  },
  {
    id: 10,
    title: 'Frequently Asked Questions About Lace',
    thumbnail: '/images/product-7.jpg',
    category: 'FAQs',
    categoryBadge: 'bg-[#F3EAFF] text-[#6B21A8]',
    author: 'Admin',
    status: 'Published',
    statusBadge: 'bg-[#E6F7EC] text-[#1D7F44]',
    publishDate: '28 Sep 2026',
    views: '1,100',
  },
];

const TOP_PERFORMING_POSTS = [
  {
    rank: 1,
    title: 'How to Start a Lace Business in India',
    views: '1,520 views',
    progress: 'w-[90%]',
    thumbnail: '/images/home-story-lace.jpg',
  },
  {
    rank: 2,
    title: 'How to Choose the Right Lace for Your Collection',
    views: '1,240 views',
    progress: 'w-[76%]',
    thumbnail: '/images/provided-pearl-lace.jpg',
  },
  {
    rank: 3,
    title: 'Frequently Asked Questions About Lace',
    views: '1,100 views',
    progress: 'w-[68%]',
    thumbnail: '/images/provided-floral-lace.jpg',
  },
  {
    rank: 4,
    title: 'Top 10 Trending Lace Designs for 2026',
    views: '980 views',
    progress: 'w-[60%]',
    thumbnail: '/images/product-3.jpg',
  },
  {
    rank: 5,
    title: 'Different Types of Laces and Their Uses',
    views: '760 views',
    progress: 'w-[48%]',
    thumbnail: '/images/product-1.jpg',
  },
];

export default function AdminBlogPage() {
  const [rows, setRows] = useState(INITIAL_BLOG_ROWS);
  const [activeTab, setActiveTab] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    category: 'Buying Guide',
    status: 'Published',
  });

  const filteredRows = rows.filter((r) => {
    if (activeTab === 'Published' && r.status !== 'Published') return false;
    if (activeTab === 'Scheduled' && r.status !== 'Scheduled') return false;
    if (activeTab === 'Drafts' && r.status !== 'Draft') return false;
    if (categoryFilter !== 'All Categories' && r.category !== categoryFilter) return false;
    if (statusFilter !== 'All Statuses' && r.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q);
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

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim()) return;
    const created = {
      id: rows.length + 1,
      title: newPost.title,
      thumbnail: '/images/home-story-lace.jpg',
      category: newPost.category,
      categoryBadge: 'bg-[#E8F2FF] text-[#1D5B9E]',
      author: 'Admin',
      status: newPost.status,
      statusBadge:
        newPost.status === 'Published'
          ? 'bg-[#E6F7EC] text-[#1D7F44]'
          : 'bg-[#F1F5F9] text-[#475569]',
      publishDate: '30 Oct 2026',
      views: '0',
    };
    setRows((prev) => [created, ...prev]);
    setNewPost({ title: '', category: 'Buying Guide', status: 'Published' });
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
        <span className="font-semibold text-[#1E3A5F]">Blogs & Articles</span>
      </nav>

      {/* Top Header & Create Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FCECEF] text-[#B01634]">
            <AdminIcon name="content" className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#B01634] md:text-3xl">
              Blogs & Articles
            </h1>
            <p className="mt-0.5 text-xs text-[#2A476E]">
              Create, manage, and publish blog posts and articles to educate and engage your wholesale customers.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8E1428] to-[#D4224E] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-95"
        >
          <AdminIcon name="plus" className="h-4 w-4" />
          <span>Create New Post</span>
          <AdminIcon name="chevron-down" className="ml-1 h-3.5 w-3.5" />
        </button>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <form
          onSubmit={handleCreatePost}
          className="rounded-2xl border border-[#E5B8C2] bg-white p-5 shadow-md"
        >
          <h3 className="font-serif text-lg font-bold text-[#B01634]">Write New Blog Post</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className="block text-xs font-semibold text-[#1E3A5F]">
              Post Title *
              <input
                type="text"
                required
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="e.g., Bridal Lace Trends for 2027"
                className="mt-1 w-full rounded-lg border border-[#EAE2E0] px-3 py-2 text-xs focus:border-[#B01634] focus:outline-none"
              />
            </label>
            <label className="block text-xs font-semibold text-[#1E3A5F]">
              Category
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                className="mt-1 w-full rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs"
              >
                <option value="Buying Guide">Buying Guide</option>
                <option value="Trends">Trends</option>
                <option value="Business Tips">Business Tips</option>
                <option value="Product Guide">Product Guide</option>
                <option value="Seasonal">Seasonal</option>
              </select>
            </label>
            <label className="block text-xs font-semibold text-[#1E3A5F]">
              Status
              <select
                value={newPost.status}
                onChange={(e) => setNewPost({ ...newPost, status: e.target.value })}
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
              Publish Post
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
                <AdminIcon name="content" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Total Posts</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">36</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 20%</span>
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
                  <span className="text-2xl font-bold text-[#1E3A5F]">28</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 27%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">live on site</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FEF3D6] text-[#D97706]">
                <AdminIcon name="clock" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Scheduled</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">4</span>
                  <span className="text-[11px] font-semibold text-[#64748B]">↑ 0%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">scheduled for release</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#B01634]">
                <AdminIcon name="edit" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Drafts</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">4</span>
                  <span className="text-[11px] font-semibold text-[#DC2626]">↓ 33%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">in progress</p>
              </div>
            </div>
          </div>

          {/* 6 Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {BLOG_TABS.map((tab) => {
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
                placeholder="Search by title, keyword, or category..."
                className="w-full bg-transparent text-xs text-[#1E3A5F] placeholder:text-[#64748B] focus:outline-none"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs font-medium text-[#1E3A5F] focus:outline-none"
            >
              <option value="All Categories">All Categories</option>
              <option value="Buying Guide">Buying Guide</option>
              <option value="Trends">Trends</option>
              <option value="Business Tips">Business Tips</option>
              <option value="Product Guide">Product Guide</option>
              <option value="Seasonal">Seasonal</option>
            </select>

            <select className="rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs font-medium text-[#1E3A5F] focus:outline-none">
              <option>All Authors</option>
              <option>Admin</option>
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
                setActiveTab('All Posts');
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

          {/* Blogs Table */}
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
                    <th className="px-3 py-3.5 text-center">Featured Image</th>
                    <th className="px-3 py-3.5 text-center">Category</th>
                    <th className="px-3 py-3.5">Author</th>
                    <th className="px-3 py-3.5 text-center">Status</th>
                    <th className="px-3 py-3.5">Publish Date</th>
                    <th className="px-3 py-3.5 text-right">Views</th>
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
                      <td className="px-3 py-3">
                        <div className="mx-auto h-9 w-16 overflow-hidden rounded-md border border-[#E5DEC9] bg-[#F5EFE6]">
                          <img
                            src={row.thumbnail}
                            alt={row.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold ${row.categoryBadge}`}>
                          {row.category}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EC88A4] text-[9px] font-bold text-white">
                            AS
                          </span>
                          <span className="font-medium text-[#2A476E]">{row.author}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold ${row.statusBadge}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-[#2A476E]">{row.publishDate}</td>
                      <td className="px-3 py-3 text-right font-semibold text-[#1E3A5F]">{row.views}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2.5 text-[#B01634]">
                          <Link to="/blog" title="View" className="rounded p-1 hover:bg-[#FCECEF]">
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
              <span>Showing 1 – {filteredRows.length} of 36 posts</span>

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
          {/* 1. Post Category Distribution Donut Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
              <AdminIcon name="settings" className="h-4 w-4" />
              <h3 className="font-serif text-sm">Post Category Distribution</h3>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="relative h-28 w-28 shrink-0">
                <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F3E8EE" strokeWidth="5" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#8CE0B5" strokeWidth="5" strokeDasharray="20 88" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#9CC9F8" strokeWidth="5" strokeDasharray="17 88" strokeDashoffset="-20" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F8D08B" strokeWidth="5" strokeDasharray="17 88" strokeDashoffset="-37" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#EC88A4" strokeWidth="5" strokeDasharray="16 88" strokeDashoffset="-54" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#C5A3F6" strokeWidth="5" strokeDasharray="18 88" strokeDashoffset="-70" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-bold leading-none text-[#1E3A5F]">36</span>
                  <span className="mt-0.5 text-[9px] leading-tight text-[#475569]">Total<br />Posts</span>
                </div>
              </div>

              <ul className="space-y-1.5 text-[10px] text-[#1E3A5F]">
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#8CE0B5]" />
                  <span><strong>Buying Guides</strong><br />8 (22%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#EC88A4]" />
                  <span><strong>Trends</strong><br />6 (17%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#C5A3F6]" />
                  <span><strong>Business Tips</strong><br />6 (17%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#9CC9F8]" />
                  <span><strong>Product Guide</strong><br />5 (14%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#F8D08B]" />
                  <span><strong>Seasonal</strong><br />7 (19%)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Top Performing Posts Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
                <AdminIcon name="reports" className="h-4 w-4" />
                <h3 className="font-serif text-sm">Top Performing Posts</h3>
              </div>
              <span className="text-[10px] font-semibold text-[#B01634]">View All →</span>
            </div>

            <div className="mt-3.5 space-y-3">
              {TOP_PERFORMING_POSTS.map((post) => (
                <div key={post.rank} className="flex items-center gap-2.5">
                  <span className="w-3 text-xs font-bold text-[#1E3A5F]">{post.rank}</span>
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="h-10 w-12 shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-[10px] font-semibold leading-snug text-[#1E3A5F]">
                      {post.title}
                    </p>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F5F9]">
                        <div className={`h-full rounded-full bg-[#EC88A4] ${post.progress}`} />
                      </div>
                      <span className="shrink-0 text-[9px] font-medium text-[#475569]">{post.views}</span>
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
                <span>Write New Post</span>
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
                onClick={() => setActiveTab('Tags')}
                className="flex items-center gap-2 rounded-xl border border-[#FDE6C4] bg-[#FFF8EB] p-3 text-left text-[#B86E00] transition hover:bg-[#FEF0D6]"
              >
                <AdminIcon name="tag" className="h-4 w-4 shrink-0" />
                <span>Manage Tags</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('Drafts')}
                className="flex items-center gap-2 rounded-xl border border-[#D5F0DF] bg-[#EFFAF3] p-3 text-left text-[#1D7F44] transition hover:bg-[#E0F5E9]"
              >
                <AdminIcon name="draft" className="h-4 w-4 shrink-0" />
                <span>View Drafts</span>
              </button>
            </div>
          </div>

          {/* 4. Need Help? Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
              <AdminIcon name="support" className="h-4 w-4" />
              <h3 className="font-serif text-sm">Need Help?</h3>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-[#2A476E]">
              Have questions about blogs or content? Contact our support team.
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
