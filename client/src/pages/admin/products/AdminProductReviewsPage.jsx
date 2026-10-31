import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_REVIEWS = [
  {
    id: 1,
    rowNum: 1,
    customer: 'Pooja Shah',
    initials: 'PS',
    initialsBg: 'bg-[#D6B5EE] text-[#69249E]',
    productName: 'Bridal Latkan',
    sku: 'LT-2045',
    productImg: '/images/product-2.jpg',
    rating: 5,
    review: 'Beautiful quality and exactly as shown. Loved it!',
    status: 'Published',
    date: '16 Oct 2026',
    time: '10:24 AM',
  },
  {
    id: 2,
    rowNum: 2,
    customer: 'Neha Patel',
    initials: 'NP',
    initialsBg: 'bg-[#CBE4F9] text-[#1E5691]',
    productName: 'Zari Lace Trim',
    sku: 'GT-1023',
    productImg: '/images/product-1.jpg',
    rating: 5,
    review: 'Good quality. Delivery was fast. Very happy!',
    status: 'Published',
    date: '15 Oct 2026',
    time: '04:18 PM',
  },
  {
    id: 3,
    rowNum: 3,
    customer: 'Riya Mehta',
    initials: 'RM',
    initialsBg: 'bg-[#C7E9D7] text-[#186A41]',
    productName: 'Pom Pom Trim',
    sku: 'PM-3021',
    productImg: '/images/product-3.jpg',
    rating: 5,
    review: 'Very cute and bright colors. Perfect for my project.',
    status: 'Published',
    date: '14 Oct 2026',
    time: '02:12 PM',
  },
  {
    id: 4,
    rowNum: 4,
    customer: 'Aarti Desai',
    initials: 'AD',
    initialsBg: 'bg-[#F9D0DC] text-[#931D3F]',
    productName: 'Gota Patti Lace',
    sku: 'GP-4011',
    productImg: '/images/product-8.jpg',
    rating: 5,
    review: 'Nice design and finishing. Value for money.',
    status: 'Published',
    date: '13 Oct 2026',
    time: '05:14 PM',
  },
  {
    id: 5,
    rowNum: 5,
    customer: 'Kunal Jain',
    initials: 'KJ',
    initialsBg: 'bg-[#E5D7F8] text-[#5A2C99]',
    productName: 'Mirror Work Border',
    sku: 'BR-1056',
    productImg: '/images/product-4.jpg',
    rating: 4,
    review: 'Good product but packaging can be better.',
    status: 'Published',
    date: '12 Oct 2026',
    time: '11:38 AM',
  },
  {
    id: 6,
    rowNum: 6,
    customer: 'Sneha Patel',
    initials: 'SP',
    initialsBg: 'bg-[#FCE0CA] text-[#A64A0B]',
    productName: 'Designer Dori Latkan',
    sku: 'LT-5520',
    productImg: '/images/product-9.jpg',
    rating: 5,
    review: 'Absolutely loved it! Great quality and finish.',
    status: 'Published',
    date: '11 Oct 2026',
    time: '01:22 PM',
  },
  {
    id: 7,
    rowNum: 7,
    customer: 'Mehul Trivedi',
    initials: 'MT',
    initialsBg: 'bg-[#CEE9F2] text-[#1A6278]',
    productName: 'Crystal Bead Latkan',
    sku: 'LT-7015',
    productImg: '/images/product-10.jpg',
    rating: 4,
    review: 'Looks premium. Will buy again.',
    status: 'Pending',
    date: '10 Oct 2026',
    time: '09:45 AM',
  },
  {
    id: 8,
    rowNum: 8,
    customer: 'Pooja Kulkarni',
    initials: 'PK',
    initialsBg: 'bg-[#E4D1F7] text-[#69229A]',
    productName: 'Pearl Hanging Latkan',
    sku: 'LT-3066',
    productImg: '/images/product-5.jpg',
    rating: 5,
    review: 'Good product.',
    status: 'Published',
    date: '09 Oct 2026',
    time: '03:18 PM',
  },
  {
    id: 9,
    rowNum: 9,
    customer: 'Rohan Sharma',
    initials: 'RS',
    initialsBg: 'bg-[#E0E2F5] text-[#373E8A]',
    productName: 'Antique Zari Border',
    sku: 'BR-6011',
    productImg: '/images/product-6.jpg',
    rating: 3,
    review: 'Quality is average. Expected better finishing.',
    status: 'Published',
    date: '08 Oct 2026',
    time: '12:05 PM',
  },
  {
    id: 10,
    rowNum: 10,
    customer: 'Vidhi Dave',
    initials: 'VD',
    initialsBg: 'bg-[#D6E0FA] text-[#22449E]',
    productName: 'Embellished Trim',
    sku: 'ET-8032',
    productImg: '/images/product-7.jpg',
    rating: 5,
    review: 'Superb quality! Highly recommended.',
    status: 'Published',
    date: '07 Oct 2026',
    time: '06:42 PM',
  },
];

const RECENT_REVIEWS = [
  { product: 'Bridal Latkan', date: '16 Oct 2026 by Pooja Shah', rating: 5, image: '/images/product-2.jpg' },
  { product: 'Zari Lace Trim', date: '15 Oct 2026 by Neha Patel', rating: 5, image: '/images/product-1.jpg' },
  { product: 'Pom Pom Trim', date: '14 Oct 2026 by Riya Mehta', rating: 5, image: '/images/product-3.jpg' },
];

export default function AdminProductReviewsPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');
  const [productFilter, setProductFilter] = useState('All Products');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [toastMsg, setToastMsg] = useState('');
  const [replyReview, setReplyReview] = useState(null);
  const [replyText, setReplyText] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const matchesSearch =
        !effectiveSearch ||
        r.customer.toLowerCase().includes(effectiveSearch) ||
        r.productName.toLowerCase().includes(effectiveSearch) ||
        r.review.toLowerCase().includes(effectiveSearch) ||
        r.sku.toLowerCase().includes(effectiveSearch);

      const matchesRating =
        ratingFilter === 'All Ratings' ||
        (ratingFilter === '5 Stars' && r.rating === 5) ||
        (ratingFilter === '4 Stars' && r.rating === 4) ||
        (ratingFilter === '3 Stars' && r.rating === 3);

      const matchesProd =
        productFilter === 'All Products' || r.productName === productFilter;

      const matchesStatus =
        statusFilter === 'All Status' || r.status === statusFilter;

      return matchesSearch && matchesRating && matchesProd && matchesStatus;
    });
  }, [reviews, effectiveSearch, ratingFilter, productFilter, statusFilter]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredReviews.length && filteredReviews.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredReviews.map((r) => r.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleApprove = (id) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Published' } : r))
    );
    triggerToast('Review approved & published.');
  };

  const handleExportCsv = () => {
    const headers = ['Customer', 'Product', 'SKU', 'Rating', 'Review', 'Status', 'Date'];
    const rows = filteredReviews.map((r) => [
      `"${r.customer}"`,
      `"${r.productName}"`,
      r.sku,
      r.rating,
      `"${r.review}"`,
      r.status,
      `"${r.date} ${r.time}"`,
    ]);
    const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arc-legacy-product-reviews.csv';
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Product reviews exported to CSV.');
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C1E21] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-[13px] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#249A62]" />
          {toastMsg}
        </div>
      )}

      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#8C7076] mb-1.5">
            <AdminIcon name="chevron-right" size={12} className="text-[#B89CA3]" />
            <Link to="/admin/products" className="hover:text-[#A91D48] transition-colors">
              Products
            </Link>
            <AdminIcon name="chevron-right" size={12} className="text-[#B89CA3]" />
            <span className="text-[#4A3439] font-medium">Product Reviews</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDF2F5] border border-[#F3DCE2] flex items-center justify-center text-[#A91D48] shrink-0">
              <AdminIcon name="mandala" size={22} />
            </div>
            <div>
              <h1
                className="text-[24px] font-bold text-[#8E1838] leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Product Reviews
              </h1>
              <p className="text-[12.5px] text-[#7A6268] mt-0.5">
                View, manage and respond to customer reviews for your products.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E6D3D8] text-[#8E1838] text-[12.5px] font-semibold hover:bg-[#FDF5F7] transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <AdminIcon name="download" size={15} className="text-[#A91D48]" />
          Export Reviews
        </button>
      </div>

      {/* 5 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Total Reviews */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11.5px] font-medium text-[#7A6268]">Total Reviews</span>
            <div className="w-8 h-8 rounded-lg bg-[#FDEBF1] flex items-center justify-center text-[#B82050]">
              <AdminIcon name="star" size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[24px] font-bold text-[#2C1E21] leading-none">428</span>
            <span className="text-[11px] font-semibold text-[#1D8852] flex items-center gap-0.5">
              <AdminIcon name="arrow-up" size={10} />
              12%
            </span>
          </div>
          <p className="text-[10px] text-[#8C7076] mt-1">vs last month</p>
        </div>

        {/* Average Rating */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11.5px] font-medium text-[#7A6268]">Average Rating</span>
            <div className="w-8 h-8 rounded-lg bg-[#E6F7EE] flex items-center justify-center text-[#1D8852]">
              <AdminIcon name="award" size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[24px] font-bold text-[#2C1E21] leading-none">4.6<span className="text-[14px] text-[#8C7076] font-normal"> / 5</span></span>
            <span className="text-[11px] font-semibold text-[#1D8852] flex items-center gap-0.5">
              <AdminIcon name="arrow-up" size={10} />
              0.3
            </span>
          </div>
          <p className="text-[10px] text-[#8C7076] mt-1">based on 428 reviews</p>
        </div>

        {/* Approved Reviews */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11.5px] font-medium text-[#7A6268]">Approved Reviews</span>
            <div className="w-8 h-8 rounded-lg bg-[#FDEBF1] flex items-center justify-center text-[#B82050]">
              <AdminIcon name="check-circle" size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[24px] font-bold text-[#2C1E21] leading-none">402</span>
            <span className="text-[11px] font-semibold text-[#1D8852] flex items-center gap-0.5">
              <AdminIcon name="arrow-up" size={10} />
              94%
            </span>
          </div>
          <p className="text-[10px] text-[#8C7076] mt-1">visible on store</p>
        </div>

        {/* Pending Reviews */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11.5px] font-medium text-[#7A6268]">Pending Reviews</span>
            <div className="w-8 h-8 rounded-lg bg-[#F3ECF9] flex items-center justify-center text-[#8048C5]">
              <AdminIcon name="eye-off" size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[24px] font-bold text-[#2C1E21] leading-none">18</span>
            <span className="text-[11px] font-semibold text-[#8048C5] flex items-center gap-0.5">
              <AdminIcon name="arrow-up" size={10} />
              4%
            </span>
          </div>
          <p className="text-[10px] text-[#8C7076] mt-1">waiting for approval</p>
        </div>

        {/* Spam / Rejected */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11.5px] font-medium text-[#7A6268]">Spam / Rejected</span>
            <div className="w-8 h-8 rounded-lg bg-[#FDE8EC] flex items-center justify-center text-[#C92A52]">
              <AdminIcon name="x-circle" size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[24px] font-bold text-[#2C1E21] leading-none">8</span>
            <span className="text-[11px] font-semibold text-[#C92A52] flex items-center gap-0.5">
              <AdminIcon name="arrow-up" size={10} />
              2%
            </span>
          </div>
          <p className="text-[10px] text-[#8C7076] mt-1">not published</p>
        </div>
      </div>

      {/* Main Grid: Left 8 cols Table + Right 4 cols Side Widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Column: Reviews Table Card */}
        <div className="xl:col-span-8 space-y-5">
          <div className="bg-white rounded-2xl border border-[#EFE0E4] shadow-[0_2px_12px_rgba(142,24,56,0.03)] overflow-hidden">
            {/* Search & Filter Row */}
            <div className="p-3.5 border-b border-[#F3E6EA] flex flex-wrap items-center gap-2.5">
              <div className="relative flex-1 min-w-[240px]">
                <AdminIcon
                  name="search"
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A8187]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by customer name, product name or review text..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12.5px] text-[#2C1E21] placeholder-[#9A8187] focus:outline-none focus:border-[#A91D48]"
                />
              </div>

              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
              >
                <option value="All Ratings">All Ratings</option>
                <option value="5 Stars">5 Stars</option>
                <option value="4 Stars">4 Stars</option>
                <option value="3 Stars">3 Stars</option>
              </select>

              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
              >
                <option value="All Products">All Products</option>
                <option value="Bridal Latkan">Bridal Latkan</option>
                <option value="Zari Lace Trim">Zari Lace Trim</option>
                <option value="Pom Pom Trim">Pom Pom Trim</option>
                <option value="Gota Patti Lace">Gota Patti Lace</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#4A3439] focus:outline-none focus:border-[#A91D48] cursor-pointer"
              >
                <option value="All Status">All Status</option>
                <option value="Published">Published</option>
                <option value="Pending">Pending</option>
              </select>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setRatingFilter('All Ratings');
                  setProductFilter('All Products');
                  setStatusFilter('All Status');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDF5F7] text-[#A91D48] text-[12.5px] font-semibold hover:bg-[#FCE8EE] transition-colors cursor-pointer"
              >
                <AdminIcon name="filter" size={14} className="text-[#A91D48]" />
                Filters
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FDF7F8] border-b border-[#F1E2E6] text-[11.5px] font-bold text-[#4A3439]">
                    <th className="py-3 pl-4 pr-2 w-8">
                      <input
                        type="checkbox"
                        checked={
                          filteredReviews.length > 0 &&
                          selectedIds.length === filteredReviews.length
                        }
                        onChange={toggleSelectAll}
                        className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-2 w-8">#</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Product</th>
                    <th className="py-3 px-2.5">Rating</th>
                    <th className="py-3 px-3">Review</th>
                    <th className="py-3 px-2.5">Status</th>
                    <th className="py-3 px-2.5">Date</th>
                    <th className="py-3 pl-2.5 pr-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EAEc] text-[12px]">
                  {filteredReviews.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-[#FDF9FA] transition-colors group"
                    >
                      <td className="py-3.5 pl-4 pr-2">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(r.id)}
                          onChange={() => toggleSelectOne(r.id)}
                          className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-3.5 px-2 text-[#7A6268] font-medium">
                        {r.rowNum}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-7 h-7 rounded-full text-[10.5px] font-bold flex items-center justify-center shrink-0 ${r.initialsBg}`}
                          >
                            {r.initials}
                          </span>
                          <span className="font-bold text-[#2C1E21] whitespace-nowrap">
                            {r.customer}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={r.productImg}
                            alt={r.productName}
                            className="w-8 h-8 rounded-lg object-cover border border-[#EFE0E4] shrink-0"
                          />
                          <div>
                            <p className="font-bold text-[#2C1E21] leading-tight text-[11.5px]">
                              {r.productName}
                            </p>
                            <p className="text-[10px] text-[#8C7076] font-mono mt-0.5">
                              SKU: {r.sku}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-2.5 whitespace-nowrap">
                        <div className="flex items-center text-[#E02424] text-[12px]">
                          {'★'.repeat(r.rating)}
                          {'☆'.repeat(5 - r.rating)}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-[#4A3439] max-w-[210px] text-[11.5px] leading-relaxed">
                        "{r.review}"
                      </td>
                      <td className="py-3.5 px-2.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10.5px] font-semibold ${
                            r.status === 'Published'
                              ? 'bg-[#E2F6EB] text-[#1D8852]'
                              : 'bg-[#FFF5E2] text-[#D98218]'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-2.5 text-[#5E474D] text-[11px] leading-tight whitespace-nowrap">
                        <p>{r.date}</p>
                        <p className="text-[10px] text-[#8C7076]">{r.time}</p>
                      </td>
                      <td className="py-3.5 pl-2.5 pr-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => triggerToast(`Review by ${r.customer}: "${r.review}"`)}
                            title="View Review"
                            className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#A91D48] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="eye" size={13} />
                          </button>
                          <button
                            onClick={() => setReplyReview(r)}
                            title="Reply to Review"
                            className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#A91D48] hover:bg-[#FCE8EE] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="chat-help" size={13} />
                          </button>
                          <button
                            onClick={() => handleApprove(r.id)}
                            title="Approve / Publish"
                            className="w-7 h-7 rounded-lg border border-[#EDE0E3] bg-[#FDF9FA] text-[#7A6268] hover:bg-[#FCE8EE] hover:text-[#A91D48] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <AdminIcon name="more" size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredReviews.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-10 text-center text-[#8C7076]">
                        No reviews found for your current filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-4 py-3.5 border-t border-[#F3E6EA] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#6E565C]">
              <span>
                Showing 1 – {filteredReviews.length} of 428 reviews
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-7 h-7 rounded-lg border border-[#E6D6DA] bg-white flex items-center justify-center text-[#6E565C] hover:bg-[#FDF5F7] cursor-pointer"
                >
                  <AdminIcon name="chevron-left" size={13} />
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer ${
                      currentPage === page
                        ? 'bg-[#8E1838] text-white shadow-xs'
                        : 'border border-[#E6D6DA] bg-white text-[#4A3439] hover:bg-[#FDF5F7]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="text-[#8C7076] px-0.5">...</span>
                <button
                  onClick={() => setCurrentPage(43)}
                  className="w-7 h-7 rounded-lg border border-[#E6D6DA] bg-white text-[12px] font-semibold text-[#4A3439] hover:bg-[#FDF5F7] cursor-pointer"
                >
                  43
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(43, p + 1))}
                  className="w-7 h-7 rounded-lg border border-[#E6D6DA] bg-white flex items-center justify-center text-[#6E565C] hover:bg-[#FDF5F7] cursor-pointer"
                >
                  <AdminIcon name="chevron-right" size={13} />
                </button>
              </div>

              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="px-3 py-1.5 rounded-lg border border-[#E6D6DA] bg-white text-[12px] text-[#4A3439] focus:outline-none cursor-pointer"
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div className="xl:col-span-4 space-y-4">
          {/* Average Rating & Breakdown */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="star" size={14} />
              </span>
              <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                Average Rating
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[32px] font-extrabold text-[#2C1E21] leading-none">
                4.6<span className="text-[18px] text-[#8C7076] font-normal"> / 5</span>
              </span>
              <div>
                <div className="flex items-center text-[#E02424] text-[15px]">
                  {'★★★★★'}
                </div>
                <p className="text-[10.5px] text-[#7A6268] mt-0.5">Based on 428 reviews</p>
              </div>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="border-t border-[#F5EAEc] pt-3 space-y-2 text-[11.5px]">
              <h4 className="font-bold text-[#8E1838] text-[12px] mb-1.5">Rating Breakdown</h4>
              {[
                { star: '5 Stars', pct: 68 },
                { star: '4 Stars', pct: 18 },
                { star: '3 Stars', pct: 8 },
                { star: '2 Stars', pct: 4 },
                { star: '1 Star', pct: 2 },
              ].map((b) => (
                <div key={b.star} className="flex items-center gap-2">
                  <span className="w-12 text-[#4A3439] font-medium shrink-0">{b.star}</span>
                  <div className="flex-1 h-2 rounded-full bg-[#F5EAEc] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#E02424]"
                      style={{ width: `${b.pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-bold text-[#4A3439] shrink-0">
                    {b.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                  <AdminIcon name="sparkle" size={14} />
                </span>
                <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                  Recent Reviews
                </h3>
              </div>
              <button
                onClick={() => setStatusFilter('All Status')}
                className="text-[11px] font-semibold text-[#A91D48] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {RECENT_REVIEWS.map((r, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 text-[11.5px]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={r.image}
                      alt={r.product}
                      className="w-9 h-9 rounded-lg object-cover border border-[#EFE0E4] shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-bold text-[#2C1E21] leading-tight truncate">
                        {r.product}
                      </p>
                      <p className="text-[10px] text-[#8C7076] mt-0.5 truncate">{r.date}</p>
                    </div>
                  </div>
                  <div className="text-[#E02424] text-[11px] shrink-0">
                    {'★'.repeat(r.rating)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="sparkle" size={14} />
              </span>
              <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                Quick Actions
              </h3>
            </div>

            <button
              onClick={() => {
                setStatusFilter('Pending');
                triggerToast('Filtered by Pending reviews for moderation.');
              }}
              className="w-full py-2 px-3 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] text-[#8E1838] text-[12px] font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <AdminIcon name="eye-off" size={14} />
                Moderate Pending Reviews
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#8E1838] text-white text-[10px] font-bold">
                18
              </span>
            </button>

            <button
              onClick={() => triggerToast('Reviews analytics report view.')}
              className="w-full py-2 px-3 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] text-[#4A3439] text-[12px] font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <AdminIcon name="bar-chart" size={14} />
                View Report
              </span>
              <span>→</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="w-full py-2 px-3 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] text-[#4A3439] text-[12px] font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <AdminIcon name="download" size={14} />
                Export All Reviews
              </span>
              <span>→</span>
            </button>

            <button
              onClick={() => triggerToast('Customer review settings opened.')}
              className="w-full py-2 px-3 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] text-[#4A3439] text-[12px] font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <AdminIcon name="settings" size={14} />
                Review Settings
              </span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reply to Review Modal */}
      {replyReview && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#EFE0E4] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F3E6EA] pb-3 mb-4">
              <h3 className="text-[16px] font-bold text-[#8E1838]">
                Reply to {replyReview.customer}
              </h3>
              <button
                onClick={() => setReplyReview(null)}
                className="w-7 h-7 rounded-lg bg-[#FDF5F7] text-[#8E1838] flex items-center justify-center cursor-pointer"
              >
                <AdminIcon name="x" size={14} />
              </button>
            </div>

            <div className="space-y-3 text-[12.5px] text-[#4A3439]">
              <div className="bg-[#FAF2F4] p-3 rounded-xl border border-[#E8D8DC]">
                <p className="text-[11px] text-[#8C7076]">Product: {replyReview.productName}</p>
                <p className="font-medium text-[#2C1E21] mt-0.5">"{replyReview.review}"</p>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1">
                  Your Public Reply from ARC LEGACY:
                </label>
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Thank you for your feedback! We are thrilled that you loved the lace trim..."
                  className="w-full px-3 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48] resize-none"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setReplyReview(null)}
                className="px-4 py-2 rounded-xl border border-[#E6D6DA] text-[12px] font-semibold text-[#4A3439] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setReplyReview(null);
                  setReplyText('');
                  triggerToast(`Reply sent to ${replyReview.customer}.`);
                }}
                className="px-4 py-2 rounded-xl bg-[#8E1838] text-white text-[12px] font-semibold cursor-pointer"
              >
                Post Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

