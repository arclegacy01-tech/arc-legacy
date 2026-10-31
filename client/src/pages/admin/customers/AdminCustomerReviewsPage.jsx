import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_REVIEWS = [
  {
    id: 1,
    customer: 'Pooja Shah',
    orderId: '#ORD1034',
    initials: 'PS',
    avatarBg: '#FDF2F4',
    avatarColor: '#B8294B',
    product: 'Pearl Drop Earrings',
    sku: 'SKU: PE-001',
    thumb: '/images/product-1.jpg',
    rating: 5,
    title: 'Beautiful Quality!',
    excerpt: 'Absolutely loved it! The quality...',
    status: 'Published',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
    date: '18 Oct 2026',
    time: '10:24 AM',
  },
  {
    id: 2,
    customer: 'Neha Patel',
    orderId: '#ORD1031',
    initials: 'NP',
    avatarBg: '#FFF4E5',
    avatarColor: '#D9822B',
    product: 'Bow Hair Clip Set',
    sku: 'SKU: HC-023',
    thumb: '/images/product-2.jpg',
    rating: 5,
    title: 'Super Cute!',
    excerpt: 'Exactly as shown in the pictures...',
    status: 'Published',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
    date: '17 Oct 2026',
    time: '04:18 PM',
  },
  {
    id: 3,
    customer: 'Riya Mehta',
    orderId: '#ORD1029',
    initials: 'RM',
    avatarBg: '#F3EBFF',
    avatarColor: '#7C4DFF',
    product: 'Silicone Mobile Stand',
    sku: 'SKU: MB-015',
    thumb: '/images/product-3.jpg',
    rating: 4,
    title: 'Very Useful',
    excerpt: 'Sturdy and practical. Great for...',
    status: 'Published',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
    date: '16 Oct 2026',
    time: '02:45 PM',
  },
  {
    id: 4,
    customer: 'Aarti Desai',
    orderId: '#ORD1026',
    initials: 'AD',
    avatarBg: '#E6F6EC',
    avatarColor: '#1E824C',
    product: 'Morandi Gel Pen Set',
    sku: 'SKU: PN-009',
    thumb: '/images/product-4.jpg',
    rating: 5,
    title: 'Amazing Colors!',
    excerpt: 'Loved the pastel shades! Writes...',
    status: 'Published',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
    date: '15 Oct 2026',
    time: '06:42 PM',
  },
  {
    id: 5,
    customer: 'Kunal Jain',
    orderId: '#ORD1023',
    initials: 'KJ',
    avatarBg: '#E8F2FC',
    avatarColor: '#2563EB',
    product: '4 in 1 Fast Charging Cable',
    sku: 'SKU: CB-011',
    thumb: '/images/product-5.jpg',
    rating: 4,
    title: 'Good Product',
    excerpt: 'Works well, fast charging is rea...',
    status: 'Published',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
    date: '14 Oct 2026',
    time: '04:12 PM',
  },
  {
    id: 6,
    customer: 'Sneha Patel',
    orderId: '#ORD1021',
    initials: 'SP',
    avatarBg: '#FDF2F4',
    avatarColor: '#B8294B',
    product: 'Fidget Keyboard Keychain',
    sku: 'SKU: KC-007',
    thumb: '/images/product-6.jpg',
    rating: 5,
    title: 'So Cute!',
    excerpt: 'Such a fun and unique product....',
    status: 'Published',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
    date: '13 Oct 2026',
    time: '03:54 PM',
  },
  {
    id: 7,
    customer: 'Mehul Trivedi',
    orderId: '#ORD1040',
    initials: 'MT',
    avatarBg: '#F1F3F5',
    avatarColor: '#64748B',
    product: 'AC Cover (1.5 Ton)',
    sku: 'SKU: AC-002',
    thumb: '/images/product-7.jpg',
    rating: 3,
    title: 'Average',
    excerpt: 'Good quality but expected a bi...',
    status: 'Pending',
    statusBg: '#FFF4E5',
    statusColor: '#D9822B',
    date: '12 Oct 2026',
    time: '12:28 PM',
  },
  {
    id: 8,
    customer: 'Tanvi Shah',
    orderId: '#ORD1018',
    initials: 'TS',
    avatarBg: '#FFF4E5',
    avatarColor: '#D9822B',
    product: 'Pastel Highlighter Set',
    sku: 'SKU: HL-004',
    thumb: '/images/product-8.jpg',
    rating: 5,
    title: 'Very Happy!',
    excerpt: 'The colors are so pretty. Great ...',
    status: 'Published',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
    date: '11 Oct 2026',
    time: '11:16 AM',
  },
  {
    id: 9,
    customer: 'Rohan Sharma',
    orderId: '#ORD1015',
    initials: 'RS',
    avatarBg: '#E8F2FC',
    avatarColor: '#2563EB',
    product: 'Octopus Phone Holder',
    sku: 'SKU: MB-018',
    thumb: '/images/product-9.jpg',
    rating: 4,
    title: 'Nice Product',
    excerpt: 'Strong grip and very useful. Re...',
    status: 'Published',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
    date: '10 Oct 2026',
    time: '05:48 PM',
  },
  {
    id: 10,
    customer: 'Vidhi Dave',
    orderId: '#ORD1008',
    initials: 'VD',
    avatarBg: '#FCE8EE',
    avatarColor: '#B8294B',
    product: 'Retractable Gel Pen Set',
    sku: 'SKU: PN-001',
    thumb: '/images/product-10.jpg',
    rating: 5,
    title: 'Excellent!',
    excerpt: 'Smooth writing and premium q...',
    status: 'Published',
    statusBg: '#E6F6EC',
    statusColor: '#1E824C',
    date: '09 Oct 2026',
    time: '01:22 PM',
  },
];

const RATING_BARS = [
  { label: '5 Stars', count: '152 (61%)', pct: 61, color: '#28A745' },
  { label: '4 Stars', count: '66 (27%)', pct: 27, color: '#F48FB1' },
  { label: '3 Stars', count: '18 (7%)', pct: 12, color: '#FFD54F' },
  { label: '2 Stars', count: '8 (3%)', pct: 8, color: '#BA68C8' },
  { label: '1 Star', count: '4 (2%)', pct: 6, color: '#E57373' },
];

function StarRow({ count, size = 12 }) {
  return (
    <div className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={star <= count ? '#F59E0B' : '#E2E8F0'}
          stroke={star <= count ? '#F59E0B' : '#CBD5E1'}
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function AdminCustomerReviewsPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [productFilter, setProductFilter] = useState('All Products');
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeReview, setActiveReview] = useState(null);
  const [replyText, setReplyText] = useState('');

  const combinedQuery = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredItems = reviews.filter((item) => {
    const matchesSearch =
      !combinedQuery ||
      item.customer.toLowerCase().includes(combinedQuery) ||
      item.product.toLowerCase().includes(combinedQuery) ||
      item.title.toLowerCase().includes(combinedQuery) ||
      item.orderId.toLowerCase().includes(combinedQuery);
    const matchesStatus = statusFilter === 'All Statuses' || item.status === statusFilter;
    const matchesRating =
      ratingFilter === 'All Ratings' ||
      (ratingFilter === '5 Stars' && item.rating === 5) ||
      (ratingFilter === '4 Stars' && item.rating === 4) ||
      (ratingFilter === '3 Stars' && item.rating === 3);
    const matchesProduct = productFilter === 'All Products' || item.product === productFilter;
    return matchesSearch && matchesStatus && matchesRating && matchesProduct;
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

  const handleToggleStatus = (id) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const next = r.status === 'Published' ? 'Pending' : 'Published';
        return {
          ...r,
          status: next,
          statusBg: next === 'Published' ? '#E6F6EC' : '#FFF4E5',
          statusColor: next === 'Published' ? '#1E824C' : '#D9822B',
        };
      })
    );
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
        <span className="text-[#1E3A5F] font-medium">Customer Reviews</span>
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
              Customer Reviews
            </h1>
            <p className="text-[12.5px] text-[#4A6B8C] mt-0.5">
              View and manage customer reviews, respond to feedback and maintain your brand reputation.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 bg-white hover:bg-[#FDF2F4] text-[#B8294B] border border-[#E5B8C5] text-[12.5px] font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer"
        >
          <AdminIcon name="download" size={15} />
          <span>Export Reviews</span>
        </button>
      </div>

      {/* Main Grid: Left Content + Right Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_285px] gap-5 items-start">
        {/* Left Column */}
        <div className="space-y-4 min-w-0">
          {/* 4 KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Total Reviews */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FCE8EE] flex items-center justify-center text-[#C8234B] shrink-0">
                <AdminIcon name="chat" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Total Reviews</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">248</span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#1E824C]">
                    <AdminIcon name="arrow-up" size={11} strokeWidth={2.3} />
                    18%
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">vs last month</p>
              </div>
            </div>

            {/* Average Rating */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FFF4E5] flex items-center justify-center text-[#D9822B] shrink-0">
                <AdminIcon name="star" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Average Rating</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">4.6</span>
                  <span className="text-[13px] font-medium text-[#4A6B8C]">/ 5</span>
                </div>
                <div className="mt-1">
                  <StarRow count={5} size={11} />
                </div>
              </div>
            </div>

            {/* Positive Reviews */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FCE8F6] flex items-center justify-center text-[#A8238E] shrink-0">
                <AdminIcon name="thumbs-up" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Positive Reviews</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">218</span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">(88%)</p>
              </div>
            </div>

            {/* Negative Reviews */}
            <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FCE8EE] flex items-center justify-center text-[#C8234B] shrink-0">
                <AdminIcon name="thumbs-down" size={20} />
              </div>
              <div>
                <p className="text-[11.5px] text-[#4A6B8C] font-medium">Negative Reviews</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[22px] font-bold text-[#142C4C] leading-none">30</span>
                </div>
                <p className="text-[10.5px] text-[#6C849D] mt-1">(12%)</p>
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
                  placeholder="Search by customer name, product name, review text, or order ID..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E5E7EB] text-[12px] text-[#1E3A5F] placeholder:text-[#7A93AC] focus:outline-none focus:border-[#D4A3B0]"
                />
              </div>

              <div className="relative">
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2 text-[12px] text-[#1E3A5F] font-medium focus:outline-none focus:border-[#D4A3B0] cursor-pointer"
                >
                  <option>All Ratings</option>
                  <option>5 Stars</option>
                  <option>4 Stars</option>
                  <option>3 Stars</option>
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
                  <option>Published</option>
                  <option>Pending</option>
                </select>
                <AdminIcon
                  name="chevron-down"
                  size={13}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
                />
              </div>

              <div className="relative">
                <select
                  value={productFilter}
                  onChange={(e) => setProductFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2 text-[12px] text-[#1E3A5F] font-medium focus:outline-none focus:border-[#D4A3B0] cursor-pointer"
                >
                  <option>All Products</option>
                  {INITIAL_REVIEWS.map((r) => (
                    <option key={r.id} value={r.product}>
                      {r.product}
                    </option>
                  ))}
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
                  setRatingFilter('All Ratings');
                  setStatusFilter('All Statuses');
                  setProductFilter('All Products');
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
                    <th className="py-2.5 px-3 min-w-[140px]">Customer</th>
                    <th className="py-2.5 px-3 min-w-[185px]">Product</th>
                    <th className="py-2.5 px-3 min-w-[95px]">Rating</th>
                    <th className="py-2.5 px-3 min-w-[185px]">Review</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3 min-w-[100px]">Date</th>
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
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                            style={{ backgroundColor: item.avatarBg, color: item.avatarColor }}
                          >
                            {item.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-[#1E3A5F] leading-snug">
                              {item.customer}
                            </p>
                            <p className="text-[10.5px] text-[#6C849D]">{item.orderId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#E5E7EB] shrink-0 bg-[#FAF7F5]">
                            <img
                              src={item.thumb}
                              alt={item.product}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-[#1E3A5F] leading-snug">
                              {item.product}
                            </p>
                            <p className="text-[10.5px] text-[#6C849D]">{item.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <StarRow count={item.rating} size={12} />
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-semibold text-[#1E3A5F] leading-snug">{item.title}</p>
                        <p className="text-[11px] text-[#6C849D] truncate max-w-[180px]">
                          {item.excerpt}
                        </p>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(item.id)}
                          className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer"
                          style={{ backgroundColor: item.statusBg, color: item.statusColor }}
                        >
                          {item.status}
                        </button>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <p className="text-[11.5px] text-[#1E3A5F]">{item.date}</p>
                        <p className="text-[10.5px] text-[#6C849D]">{item.time}</p>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-center gap-1.5 text-[#C8234B]">
                          <button
                            type="button"
                            onClick={() => setActiveReview(item)}
                            title="View Review"
                            className="w-7 h-7 rounded-md border border-[#F3E2E6] bg-[#FDF8F9] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="eye" size={13.5} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveReview(item)}
                            title="Reply to Review"
                            className="w-7 h-7 rounded-md border border-[#F3E2E6] bg-[#FDF8F9] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="reply" size={13.5} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(item.id)}
                            title="Toggle Status"
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
              <span>Showing 1 – {filteredItems.length} of 248 reviews</span>

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
                {[2, 3, 4, 5].map((page) => (
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
          {/* Review Rating Distribution */}
          <div className="bg-white rounded-xl border border-[#F2E2E6] p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="text-[#C8234B]">
                <AdminIcon name="floral" size={15} />
              </span>
              <h3
                className="text-[13.5px] font-bold text-[#B8294B]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Review Rating Distribution
              </h3>
            </div>

            <div className="space-y-3">
              {RATING_BARS.map((bar) => (
                <div key={bar.label} className="flex items-center gap-2 text-[11px]">
                  <span className="w-11 font-medium text-[#1E3A5F] shrink-0">{bar.label}</span>
                  <div className="flex-1 h-2.5 rounded-full bg-[#F3EEF0] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${bar.pct}%`, backgroundColor: bar.color }}
                    />
                  </div>
                  <span className="w-16 text-right text-[#4A6B8C] font-medium shrink-0">
                    {bar.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
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
                  Recent Reviews
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
              {reviews.slice(0, 5).map((rev) => (
                <div
                  key={rev.id}
                  className="flex items-start gap-2.5 pb-2.5 border-b border-[#F8EEF0] last:border-0 last:pb-0"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#E5E7EB] shrink-0 bg-[#FAF7F5]">
                    <img
                      src={rev.thumb}
                      alt={rev.product}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11.5px] font-bold text-[#1E3A5F] leading-tight">
                      {rev.customer}
                    </p>
                    <div className="my-0.5">
                      <StarRow count={rev.rating} size={10} />
                    </div>
                    <p className="text-[10.5px] text-[#4A6B8C] truncate">
                      <span className="font-semibold text-[#1E3A5F]">{rev.title}</span>{' '}
                      {rev.excerpt}
                    </p>
                    <p className="text-[9.5px] text-[#6C849D] mt-0.5">{rev.date}</p>
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
              Have questions about customer reviews? Contact our support team for assistance.
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

      {/* Review Reply Modal */}
      {activeReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#F2E2E6] bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F3E5E8] pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-[#B8294B]" style={{ fontFamily: 'Georgia, serif' }}>
                  Review Details & Reply
                </h3>
                <p className="text-xs text-[#6C849D]">
                  {activeReview.customer} • {activeReview.orderId}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveReview(null)}
                className="text-[#64748B] hover:text-[#B8294B] text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 rounded-lg bg-[#FDF8F9] p-3">
                <img
                  src={activeReview.thumb}
                  alt={activeReview.product}
                  className="w-11 h-11 rounded-lg object-cover border border-[#E5E7EB]"
                />
                <div>
                  <p className="font-semibold text-[#1E3A5F]">{activeReview.product}</p>
                  <StarRow count={activeReview.rating} size={12} />
                </div>
              </div>
              <div>
                <p className="font-semibold text-[#1E3A5F]">{activeReview.title}</p>
                <p className="text-[#4A6B8C] mt-1">{activeReview.excerpt}</p>
              </div>
              <div>
                <label className="block font-semibold text-[#1E3A5F] mb-1">Admin Response</label>
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a helpful response to this customer..."
                  className="w-full rounded-lg border border-[#E5E7EB] p-2.5 text-[#1E3A5F] focus:outline-none focus:border-[#B8294B]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveReview(null)}
                  className="rounded-lg border border-[#E5E7EB] px-4 py-2 font-semibold text-[#4A6B8C] cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReplyText('');
                    setActiveReview(null);
                  }}
                  className="rounded-lg bg-[#B8294B] px-4 py-2 font-semibold text-white hover:bg-[#9E1F3E] cursor-pointer"
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
