import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminIcon } from '../../components/admin/AdminIcons.jsx';

const MEDIA_TABS = [
  'All Files',
  'Images',
  'Videos',
  'Documents',
  'Banners',
  'Product Images',
  'Blog Images',
  'Other',
];

const INITIAL_MEDIA_FILES = [
  {
    id: 1,
    name: 'lace-pink-01.jpg',
    fileType: 'Image',
    meta: 'Image • 2.4 MB • 1200 × 1500',
    thumbnail: '/images/provided-floral-lace.jpg',
    tags: [
      { label: 'Product', cls: 'bg-[#FCECEF] text-[#B01634]' },
      { label: 'Lace Trims', cls: 'bg-[#F3EAFF] text-[#6B21A8]' },
    ],
  },
  {
    id: 2,
    name: 'lace-white-02.jpg',
    fileType: 'Image',
    meta: 'Image • 1.8 MB • 1200 × 1500',
    thumbnail: '/images/provided-pearl-lace.jpg',
    tags: [
      { label: 'Product', cls: 'bg-[#FCECEF] text-[#B01634]' },
      { label: 'Collection', cls: 'bg-[#F3EAFF] text-[#6B21A8]' },
    ],
  },
  {
    id: 3,
    name: 'lace-gold-03.jpg',
    fileType: 'Image',
    meta: 'Image • 2.1 MB • 1200 × 1500',
    thumbnail: '/images/product-1.jpg',
    tags: [
      { label: 'Product', cls: 'bg-[#FCECEF] text-[#B01634]' },
      { label: 'Designer', cls: 'bg-[#E6F7EC] text-[#1D7F44]' },
    ],
  },
  {
    id: 4,
    name: 'new-arrivals-banner.jpg',
    fileType: 'Image',
    meta: 'Image • 1.2 MB • 1200 × 628',
    thumbnail: '/images/home-mfg-rolls.jpg',
    tags: [
      { label: 'Banner', cls: 'bg-[#FCECEF] text-[#B01634]' },
      { label: 'New Arrivals', cls: 'bg-[#E6F7EC] text-[#1D7F44]' },
    ],
  },
  {
    id: 5,
    name: 'lace-video-01.mp4',
    fileType: 'Video',
    meta: 'Video • 18.5 MB • 00:32',
    thumbnail: '/images/home-mfg-hands.jpg',
    tags: [
      { label: 'Product', cls: 'bg-[#FCECEF] text-[#B01634]' },
      { label: 'Video', cls: 'bg-[#E8F2FF] text-[#1D5B9E]' },
    ],
  },
  {
    id: 6,
    name: 'blog-choose-lace.jpg',
    fileType: 'Image',
    meta: 'Image • 1.1 MB • 1200 × 800',
    thumbnail: '/images/home-story-lace.jpg',
    tags: [
      { label: 'Blog', cls: 'bg-[#F3EAFF] text-[#6B21A8]' },
      { label: 'Guide', cls: 'bg-[#E8F2FF] text-[#1D5B9E]' },
    ],
  },
  {
    id: 7,
    name: 'diwali-offer-banner.jpg',
    fileType: 'Image',
    meta: 'Image • 1.4 MB • 1200 × 628',
    thumbnail: '/images/product-12.jpg',
    tags: [
      { label: 'Banner', cls: 'bg-[#FCECEF] text-[#B01634]' },
      { label: 'Offer', cls: 'bg-[#FCECEF] text-[#B01634]' },
    ],
  },
  {
    id: 8,
    name: 'product-showcase.mp4',
    fileType: 'Video',
    meta: 'Video • 24.2 MB • 00:45',
    thumbnail: '/images/product-3.jpg',
    tags: [
      { label: 'Product', cls: 'bg-[#FCECEF] text-[#B01634]' },
      { label: 'Video', cls: 'bg-[#E8F2FF] text-[#1D5B9E]' },
    ],
  },
  {
    id: 9,
    name: 'spring-collection.jpg',
    fileType: 'Image',
    meta: 'Image • 1.3 MB • 1200 × 628',
    thumbnail: '/images/product-7.jpg',
    tags: [
      { label: 'Banner', cls: 'bg-[#FCECEF] text-[#B01634]' },
      { label: 'Seasonal', cls: 'bg-[#E6F7EC] text-[#1D7F44]' },
    ],
  },
  {
    id: 10,
    name: 'price-list-2026.pdf',
    fileType: 'Document',
    docFormat: 'PDF',
    meta: 'Document • 845 KB',
    thumbnail: null,
    tags: [
      { label: 'Price List', cls: 'bg-[#FCECEF] text-[#B01634]' },
      { label: 'Document', cls: 'bg-[#F3EAFF] text-[#6B21A8]' },
    ],
  },
  {
    id: 11,
    name: 'lace-beige-01.jpg',
    fileType: 'Image',
    meta: 'Image • 2.0 MB • 1200 × 1500',
    thumbnail: '/images/product-2.jpg',
    tags: [
      { label: 'Product', cls: 'bg-[#FCECEF] text-[#B01634]' },
      { label: 'Lace Trims', cls: 'bg-[#F3EAFF] text-[#6B21A8]' },
    ],
  },
  {
    id: 12,
    name: 'bulk-packaging.jpg',
    fileType: 'Image',
    meta: 'Image • 1.9 MB • 1200 × 1500',
    thumbnail: '/images/home-mfg-shelves.jpg',
    tags: [
      { label: 'Packaging', cls: 'bg-[#FCECEF] text-[#B01634]' },
      { label: 'Wholesale', cls: 'bg-[#E8F2FF] text-[#1D5B9E]' },
    ],
  },
  {
    id: 13,
    name: 'lace-making-process.mp4',
    fileType: 'Video',
    meta: 'Video • 30.1 MB • 01:12',
    thumbnail: '/images/hero-finishing.jpg',
    tags: [
      { label: 'Process', cls: 'bg-[#FCECEF] text-[#B01634]' },
      { label: 'Video', cls: 'bg-[#E8F2FF] text-[#1D5B9E]' },
    ],
  },
  {
    id: 14,
    name: 'festive-collection.jpg',
    fileType: 'Image',
    meta: 'Image • 1.6 MB • 1200 × 628',
    thumbnail: '/images/product-9.jpg',
    tags: [
      { label: 'Banner', cls: 'bg-[#FCECEF] text-[#B01634]' },
      { label: 'Festive', cls: 'bg-[#E6F7EC] text-[#1D7F44]' },
    ],
  },
  {
    id: 15,
    name: 'care-guide.docx',
    fileType: 'Document',
    docFormat: 'DOCX',
    meta: 'Document • 512 KB',
    thumbnail: null,
    tags: [
      { label: 'Guide', cls: 'bg-[#F3EAFF] text-[#6B21A8]' },
      { label: 'Document', cls: 'bg-[#E8F2FF] text-[#1D5B9E]' },
    ],
  },
];

const RECENT_UPLOADS = [
  { name: 'lace-pink-01.jpg', time: '2 minutes ago', thumb: '/images/provided-floral-lace.jpg', type: 'img' },
  { name: 'diwali-offer-banner.jpg', time: '15 minutes ago', thumb: '/images/product-12.jpg', type: 'img' },
  { name: 'lace-video-01.mp4', time: '1 hour ago', thumb: '/images/home-mfg-hands.jpg', type: 'video' },
  { name: 'price-list-2026.pdf', time: '3 hours ago', thumb: null, type: 'pdf' },
  { name: 'spring-collection.jpg', time: '5 hours ago', thumb: '/images/product-7.jpg', type: 'img' },
];

export default function AdminMediaPage() {
  const [files, setFiles] = useState(INITIAL_MEDIA_FILES);
  const [activeTab, setActiveTab] = useState('All Files');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All File Types');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState('');
  const fileInputRef = useRef(null);

  const filteredFiles = files.filter((f) => {
    if (activeTab === 'Images' && f.fileType !== 'Image') return false;
    if (activeTab === 'Videos' && f.fileType !== 'Video') return false;
    if (activeTab === 'Documents' && f.fileType !== 'Document') return false;
    if (activeTab === 'Banners' && !f.tags.some((t) => t.label === 'Banner')) return false;
    if (activeTab === 'Product Images' && !f.tags.some((t) => t.label === 'Product')) return false;
    if (activeTab === 'Blog Images' && !f.tags.some((t) => t.label === 'Blog')) return false;
    if (typeFilter !== 'All File Types' && f.fileType !== typeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        f.name.toLowerCase().includes(q) ||
        f.tags.some((t) => t.label.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const toggleSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleFileUpload = (e) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;
    const added = selected.map((file, idx) => ({
      id: files.length + idx + 1,
      name: file.name,
      fileType: file.type.startsWith('video') ? 'Video' : 'Image',
      meta: `Image • ${(file.size / (1024 * 1024)).toFixed(1)} MB • 1200 × 1500`,
      thumbnail: URL.createObjectURL(file),
      tags: [
        { label: 'Product', cls: 'bg-[#FCECEF] text-[#B01634]' },
        { label: 'Uploaded', cls: 'bg-[#E6F7EC] text-[#1D7F44]' },
      ],
    }));
    setFiles((prev) => [...added, ...prev]);
    setToast(`Uploaded ${added.length} file(s) to Media Library!`);
    setTimeout(() => setToast(''), 3000);
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
        <span className="font-semibold text-[#1E3A5F]">Media Library</span>
      </nav>

      {/* Top Header & Upload Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FCECEF] text-[#B01634]">
            <AdminIcon name="image" className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#B01634] md:text-3xl">
              Media Library
            </h1>
            <p className="mt-0.5 text-xs text-[#2A476E]">
              Manage all your images, videos, and documents used across your wholesale store content.
            </p>
          </div>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8E1428] to-[#D4224E] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            <AdminIcon name="plus" className="h-4 w-4" />
            <span>Upload Media</span>
            <AdminIcon name="chevron-down" className="ml-1 h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {toast && (
        <div className="rounded-xl border border-[#B01634]/20 bg-[#FCECEF] px-4 py-2.5 text-xs font-medium text-[#B01634]">
          {toast}
        </div>
      )}

      {/* Main 2-Column Layout */}
      <div className="grid gap-5 xl:grid-cols-[1fr_290px] xl:items-start">
        {/* Left Main Area */}
        <div className="space-y-4">
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="flex items-center gap-3.5 rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#B01634]">
                <AdminIcon name="image" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Total Files</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">248</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 25%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">vs last month</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E6F7EC] text-[#16A34A]">
                <AdminIcon name="cloud-upload" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Images</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">196</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 28%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">(79%)</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#B01634]">
                <AdminIcon name="video" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Videos</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">28</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 17%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">(11%)</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#B01634]">
                <AdminIcon name="draft" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#475569]">Documents</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A5F]">24</span>
                  <span className="text-[11px] font-semibold text-[#16A34A]">↑ 9%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">(10%)</p>
              </div>
            </div>
          </div>

          {/* 8 Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {MEDIA_TABS.map((tab) => {
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
                placeholder="Search files by name, tags, or type..."
                className="w-full bg-transparent text-xs text-[#1E3A5F] placeholder:text-[#64748B] focus:outline-none"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs font-medium text-[#1E3A5F] focus:outline-none"
            >
              <option value="All File Types">All File Types</option>
              <option value="Image">Image</option>
              <option value="Video">Video</option>
              <option value="Document">Document</option>
            </select>

            <select className="rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs font-medium text-[#1E3A5F] focus:outline-none">
              <option>All Folders</option>
              <option>Product Images</option>
              <option>Banners</option>
              <option>Documents</option>
            </select>

            <select className="rounded-lg border border-[#EAE2E0] bg-white px-3 py-2 text-xs font-medium text-[#1E3A5F] focus:outline-none">
              <option>Sort by Newest</option>
              <option>Sort by Size</option>
              <option>Sort by Name</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setActiveTab('All Files');
                setTypeFilter('All File Types');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5B8C2] bg-[#FCEEEF] px-3.5 py-2 text-xs font-semibold text-[#B01634] transition hover:bg-[#F8DCE0]"
            >
              <AdminIcon name="filter" className="h-3.5 w-3.5" />
              <span>Filters</span>
            </button>
          </div>

          {/* 5x3 Media Card Grid */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-[#EFE3E4] bg-white p-2 shadow-2xs transition hover:border-[#B01634]/40 hover:shadow-md"
                >
                  {/* Top Media Preview */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#FAF5F4]">
                    {file.thumbnail ? (
                      <img
                        src={file.thumbnail}
                        alt={file.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      /* Clean Vector Document Graphic (PDF / DOCX) */
                      <div className="flex h-full w-full items-center justify-center bg-[#FDF8F6]">
                        {file.docFormat === 'PDF' ? (
                          <div className="flex h-14 w-12 flex-col items-center justify-center rounded-lg bg-[#DC2626] text-white shadow-sm">
                            <span className="text-xs font-bold tracking-wider">PDF</span>
                          </div>
                        ) : (
                          <div className="flex h-14 w-12 flex-col items-center justify-center rounded-lg bg-[#2563EB] text-white shadow-sm">
                            <span className="text-base font-bold">W</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Video Play Button Overlay */}
                    {file.fileType === 'Video' && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/65 text-white shadow">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-0.5" fill="currentColor">
                            <polygon points="8 5 19 12 8 19 8 5" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Top-Left Checkbox */}
                    <label className="absolute left-2 top-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded bg-white/95 shadow-2xs">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(file.id)}
                        onChange={() => toggleSelect(file.id)}
                        className="h-3.5 w-3.5 rounded accent-[#B01634]"
                      />
                    </label>

                    {/* Top-Right More Button */}
                    <button
                      type="button"
                      className="absolute right-2 top-2 flex h-6 w-5 items-center justify-center rounded bg-white/95 text-[#B01634] shadow-2xs hover:bg-white"
                      aria-label="More options"
                    >
                      <AdminIcon name="more" className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* File Metadata */}
                  <div className="mt-2 flex flex-1 flex-col justify-between px-0.5">
                    <div>
                      <p className="truncate text-[11px] font-bold text-[#1E3A5F]">{file.name}</p>
                      <p className="mt-0.5 truncate text-[9px] text-[#64748B]">{file.meta}</p>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {file.tags.map((t) => (
                        <span
                          key={t.label}
                          className={`rounded px-2 py-0.5 text-[9px] font-semibold ${t.cls}`}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer & Pagination */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#EFE3E4] pt-4 text-xs text-[#1E3A5F]">
              <span>Showing 1 – 12 of 248 files</span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded border border-[#EAE2E0] bg-white text-[#1E3A5F]"
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
                        : 'border border-[#EAE2E0] bg-white text-[#1E3A5F]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                  className="flex h-7 w-7 items-center justify-center rounded border border-[#EAE2E0] bg-white text-[#1E3A5F]"
                >
                  ›
                </button>
              </div>

              <select className="rounded-lg border border-[#EAE2E0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#1E3A5F]">
                <option>12 per page</option>
                <option>24 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets Column */}
        <div className="space-y-4">
          {/* 1. File Type Distribution Donut Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
              <AdminIcon name="settings" className="h-4 w-4" />
              <h3 className="font-serif text-sm">File Type Distribution</h3>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="relative h-28 w-28 shrink-0">
                <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F3E8EE" strokeWidth="5" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#EC88A4" strokeWidth="5" strokeDasharray="69 88" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#8CE0B5" strokeWidth="5" strokeDasharray="10 88" strokeDashoffset="-69" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F8D08B" strokeWidth="5" strokeDasharray="9 88" strokeDashoffset="-79" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-bold leading-none text-[#1E3A5F]">248</span>
                  <span className="mt-0.5 text-[9px] leading-tight text-[#475569]">Total<br />Files</span>
                </div>
              </div>

              <ul className="space-y-2.5 text-[10px] text-[#1E3A5F]">
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#EC88A4]" />
                  <span><strong>Images</strong><br />196 (79%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#8CE0B5]" />
                  <span><strong>Videos</strong><br />28 (11%)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#F8D08B]" />
                  <span><strong>Documents</strong><br />24 (10%)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Storage Usage Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
                <AdminIcon name="settings" className="h-4 w-4" />
                <h3 className="font-serif text-sm">Storage Usage</h3>
              </div>
              <span className="text-[10px] font-semibold text-[#B01634]">View Details →</span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-bold text-[#1E3A5F]">1.2 GB <span className="font-normal text-[#475569]">of 5 GB used</span></span>
              <span className="font-semibold text-[#475569]">24%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
              <div className="h-full w-[24%] rounded-full bg-gradient-to-r from-[#C81E45] to-[#EC88A4]" />
            </div>
          </div>

          {/* 3. Recent Uploads Card */}
          <div className="rounded-2xl border border-[#EFE3E4] bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B01634]">
                <AdminIcon name="clock" className="h-4 w-4" />
                <h3 className="font-serif text-sm">Recent Uploads</h3>
              </div>
              <span className="text-[10px] font-semibold text-[#B01634]">View All →</span>
            </div>

            <div className="mt-3 space-y-2.5">
              {RECENT_UPLOADS.map((u) => (
                <div key={u.name} className="flex items-center justify-between gap-2 text-[11px]">
                  <div className="flex min-w-0 items-center gap-2.5">
                    {u.thumb ? (
                      <img
                        src={u.thumb}
                        alt={u.name}
                        className="h-8 w-10 shrink-0 rounded object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-10 shrink-0 items-center justify-center rounded bg-[#FEE2E2] text-[9px] font-bold text-[#DC2626]">
                        PDF
                      </div>
                    )}
                    <span className="truncate font-semibold text-[#1E3A5F]">{u.name}</span>
                  </div>
                  <span className="shrink-0 text-[9px] text-[#64748B]">{u.time}</span>
                </div>
              ))}
            </div>
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
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 rounded-xl border border-[#F5DCE0] bg-[#FDF2F4] p-3 text-left text-[#B01634] transition hover:bg-[#FCE4E8]"
              >
                <AdminIcon name="upload" className="h-4 w-4 shrink-0" />
                <span>Upload Files</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-[#D8E6FA] bg-[#F0F6FF] p-3 text-left text-[#1D5B9E] transition hover:bg-[#E2EEFF]"
              >
                <AdminIcon name="folder" className="h-4 w-4 shrink-0" />
                <span>Create Folder</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-[#FDE6C4] bg-[#FFF8EB] p-3 text-left text-[#B86E00] transition hover:bg-[#FEF0D6]"
              >
                <AdminIcon name="folder" className="h-4 w-4 shrink-0" />
                <span>Manage Folders</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setToast('All library images are optimized!');
                  setTimeout(() => setToast(''), 2500);
                }}
                className="flex items-center gap-2 rounded-xl border border-[#D5F0DF] bg-[#EFFAF3] p-3 text-left text-[#1D7F44] transition hover:bg-[#E0F5E9]"
              >
                <AdminIcon name="image" className="h-4 w-4 shrink-0" />
                <span>Optimize Images</span>
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
              Have questions about media files? Contact our support team.
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
