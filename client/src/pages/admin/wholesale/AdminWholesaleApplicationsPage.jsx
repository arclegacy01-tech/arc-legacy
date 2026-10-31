import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_APPLICATIONS = [
  {
    id: 1,
    initials: 'ST',
    color: 'bg-purple-100 text-purple-700',
    applicantName: 'Ramesh Patel',
    email: 'ramesh@shreetextiles.in',
    phone: '+91 98765 43210',
    company: 'Shree Textiles',
    gst: 'GST: 24ABCS1234F1Z5',
    businessType: 'Retailer',
    appliedOn: '18 Oct 2026',
    status: 'Pending',
  },
  {
    id: 2,
    initials: 'KF',
    color: 'bg-rose-100 text-[#800020]',
    applicantName: 'Priya Shah',
    email: 'priya@kavyafashion.in',
    phone: '+91 87654 32109',
    company: 'Kavya Fashion',
    gst: 'GST: 27AAKFK5678L1Z3',
    businessType: 'Boutique',
    appliedOn: '17 Oct 2026',
    status: 'Approved',
  },
  {
    id: 3,
    initials: 'MC',
    color: 'bg-blue-100 text-blue-700',
    applicantName: 'Amit Desai',
    email: 'amit@milancreations.in',
    phone: '+91 98765 43211',
    company: 'Milan Creations',
    gst: 'GST: 24MCDS9087K1Z8',
    businessType: 'Manufacturer',
    appliedOn: '16 Oct 2026',
    status: 'Pending',
  },
  {
    id: 4,
    initials: 'RLH',
    color: 'bg-rose-100 text-[#800020]',
    applicantName: 'Neha Trivedi',
    email: 'neha@rajlaces.in',
    phone: '+91 87654 32122',
    company: 'Raj Laces Hub',
    gst: 'GST: 27RULH4456P1Z1',
    businessType: 'Distributor',
    appliedOn: '15 Oct 2026',
    status: 'Approved',
  },
  {
    id: 5,
    initials: 'FM',
    color: 'bg-sky-100 text-sky-700',
    applicantName: 'Kunal Jain',
    email: 'kunal@fashionmart.in',
    phone: '+91 98765 43213',
    company: 'Fashion Mart',
    gst: 'GST: 24FJM1133Q1Z7',
    businessType: 'Retailer',
    appliedOn: '14 Oct 2026',
    status: 'Pending',
  },
  {
    id: 6,
    initials: 'DT',
    color: 'bg-rose-100 text-[#800020]',
    applicantName: 'Sneha Mehta',
    email: 'sneha@devtextile.in',
    phone: '+91 87654 32133',
    company: 'Dev Textile Store',
    gst: 'GST: 24DTS9987A1Z6',
    businessType: 'Reseller',
    appliedOn: '13 Oct 2026',
    status: 'Rejected',
  },
  {
    id: 7,
    initials: 'GLH',
    color: 'bg-purple-100 text-purple-700',
    applicantName: 'Viren Patel',
    email: 'viren@gujaratlaces.in',
    phone: '+91 98765 43214',
    company: 'Gujarat Lace House',
    gst: 'GST: 24GLH7721B1Z2',
    businessType: 'Wholesaler',
    appliedOn: '12 Oct 2026',
    status: 'Approved',
  },
  {
    id: 8,
    initials: 'TB',
    color: 'bg-rose-100 text-[#800020]',
    applicantName: 'Aarti Desai',
    email: 'aarti@trendyboutique.in',
    phone: '+91 87654 32144',
    company: 'Trendy Boutique',
    gst: 'GST: 27TRB5544C1Z9',
    businessType: 'Boutique',
    appliedOn: '11 Oct 2026',
    status: 'Pending',
  },
  {
    id: 9,
    initials: 'SF',
    color: 'bg-rose-100 text-[#800020]',
    applicantName: 'Mohit Sharma',
    email: 'mohit@satyamfabrics.in',
    phone: '+91 98765 43215',
    company: 'Satyam Fabrics',
    gst: 'GST: 24SFM6622D1Z3',
    businessType: 'Manufacturer',
    appliedOn: '10 Oct 2026',
    status: 'Pending',
  },
  {
    id: 10,
    initials: 'PC',
    color: 'bg-amber-100 text-amber-700',
    applicantName: 'Riya Kulkarni',
    email: 'riya@poojacollection.in',
    phone: '+91 87654 32155',
    company: 'Pooja Collection',
    gst: 'GST: 27PCC3311E1Z4',
    businessType: 'Retailer',
    appliedOn: '09 Oct 2026',
    status: 'Approved',
  },
];

const TOP_LOCATIONS = [
  { id: 1, state: 'Gujarat', count: 42, percentage: '34%' },
  { id: 2, state: 'Maharashtra', count: 28, percentage: '23%' },
  { id: 3, state: 'Delhi', count: 18, percentage: '15%' },
  { id: 4, state: 'Rajasthan', count: 12, percentage: '10%' },
  { id: 5, state: 'Other States', count: 24, percentage: '18%' },
];

export default function AdminWholesaleApplicationsPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [businessTypeFilter, setBusinessTypeFilter] = useState('All Business Types');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchSearch =
        !effectiveSearch ||
        app.applicantName.toLowerCase().includes(effectiveSearch) ||
        app.company.toLowerCase().includes(effectiveSearch) ||
        app.email.toLowerCase().includes(effectiveSearch) ||
        app.gst.toLowerCase().includes(effectiveSearch) ||
        app.phone.includes(effectiveSearch);

      const matchStatus = statusFilter === 'All Statuses' || app.status === statusFilter;
      const matchType =
        businessTypeFilter === 'All Business Types' || app.businessType === businessTypeFilter;

      return matchSearch && matchStatus && matchType;
    });
  }, [applications, effectiveSearch, statusFilter, businessTypeFilter]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredApplications.map((a) => a.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApprove = (id, name) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Approved' } : app))
    );
    triggerToast(`Approved wholesale application for ${name}`);
  };

  const handleReject = (id, name) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Rejected' } : app))
    );
    triggerToast(`Rejected wholesale application for ${name}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
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
        <span className="font-semibold text-[#800020]">Applications</span>
      </div>

      {/* Header Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0F3] text-[#800020] shadow-sm border border-[#FFE4E8]">
            <AdminIcon name="customers" size={24} strokeWidth={1.75} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] tracking-tight">
              Wholesale Applications
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Review and manage wholesale account applications. Approve, reject, or request additional information.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => triggerToast('Opening Manual Application dialog...')}
            className="flex items-center gap-2 rounded-xl bg-[#800020] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#660019] transition-all"
          >
            <AdminIcon name="plus" size={16} strokeWidth={2} />
            <span>Add Application Manually</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
        {/* Card 1 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Total Applications</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#800020]">
              <AdminIcon name="customers" size={16} strokeWidth={1.75} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">124</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 18%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">vs last month</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Pending Review</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FEF3C7] text-amber-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">36</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 12%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">awaiting approval</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Approved</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ECFDF5] text-emerald-700">
              <AdminIcon name="check" size={16} strokeWidth={2} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">72</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              ↑ 28%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">active wholesale customers</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl border border-[#FFE8E8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Rejected</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FEE2E2] text-rose-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">16</span>
            <span className="flex items-center text-xs font-semibold text-rose-600">
              ↓ 11%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">not eligible</p>
        </div>
      </div>

      {/* Main Grid: Left Area (9 cols) + Right Sidebar (3 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column (9 cols) */}
        <div className="xl:col-span-9 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            {/* Filter Bar */}
            <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[240px]">
                <AdminIcon
                  name="search"
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  strokeWidth={1.75}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search applications by name, company, email, GST, or phone..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/60 py-2.5 pl-9 pr-3 text-xs text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#800020] focus:bg-white focus:ring-1 focus:ring-[#800020]"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Statuses</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>

                <select
                  value={businessTypeFilter}
                  onChange={(e) => setBusinessTypeFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Business Types</option>
                  <option>Retailer</option>
                  <option>Boutique</option>
                  <option>Manufacturer</option>
                  <option>Distributor</option>
                  <option>Reseller</option>
                  <option>Wholesaler</option>
                </select>

                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 outline-none focus:border-[#800020]"
                >
                  <option>All Locations</option>
                  <option>Gujarat</option>
                  <option>Maharashtra</option>
                  <option>Delhi</option>
                  <option>Rajasthan</option>
                </select>

                <button
                  onClick={() => triggerToast('Filters applied')}
                  className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-[#FFF5F7] px-3.5 py-2 text-xs font-semibold text-[#800020] hover:bg-[#FFEBF0]"
                >
                  <AdminIcon name="filter" size={14} strokeWidth={1.75} />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF9F9] text-gray-600 font-semibold uppercase tracking-wider border-b border-gray-100">
                  <tr>
                    <th className="py-3 px-3 w-8">
                      <input
                        type="checkbox"
                        checked={
                          selectedIds.length > 0 &&
                          selectedIds.length === filteredApplications.length
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                      />
                    </th>
                    <th className="py-3 px-3 w-8">#</th>
                    <th className="py-3 px-4">Applicant Details</th>
                    <th className="py-3 px-4">Company Name</th>
                    <th className="py-3 px-3">Business Type</th>
                    <th className="py-3 px-3">Applied On</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-8 text-center text-gray-400">
                        No wholesale applications found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((app) => {
                      const isSelected = selectedIds.includes(app.id);
                      return (
                        <tr
                          key={app.id}
                          className={`transition-colors hover:bg-[#FFF5F7] ${
                            isSelected ? 'bg-[#FFF0F3]' : ''
                          }`}
                        >
                          <td className="py-3.5 px-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(app.id)}
                              className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                            />
                          </td>
                          <td className="py-3.5 px-3 font-medium text-gray-500">{app.id}</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${app.color}`}
                              >
                                {app.initials}
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">{app.applicantName}</p>
                                <p className="text-[11px] text-gray-400">{app.email}</p>
                                <p className="text-[11px] text-gray-400">{app.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-gray-900">{app.company}</p>
                            <p className="text-[11px] text-gray-400 font-mono">{app.gst}</p>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-[#800020] border border-rose-100">
                              {app.businessType}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-gray-500 text-[11px] whitespace-nowrap">
                            {app.appliedOn}
                          </td>
                          <td className="py-3.5 px-3">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${getStatusBadge(
                                app.status
                              )}`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => triggerToast(`Viewing details for ${app.company}`)}
                                title="View Application"
                                className="rounded p-1 text-gray-400 hover:text-[#800020] transition-colors"
                              >
                                <AdminIcon name="eye" size={14} strokeWidth={1.75} />
                              </button>
                              <button
                                onClick={() => handleApprove(app.id, app.applicantName)}
                                title="Approve Application"
                                className="rounded p-1 text-emerald-600 hover:bg-emerald-50 transition-colors"
                              >
                                <AdminIcon name="check" size={15} strokeWidth={2} />
                              </button>
                              <button
                                onClick={() => handleReject(app.id, app.applicantName)}
                                title="Reject Application"
                                className="rounded p-1 text-rose-600 hover:bg-rose-50 transition-colors"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                              <button
                                onClick={() => triggerToast(`Options for ${app.company}`)}
                                title="More options"
                                className="rounded p-1 text-gray-400 hover:text-gray-600 transition-colors"
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
              <span>Showing 1 - 10 of 124 applications</span>

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
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50">
                  5
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
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column (3 cols) */}
        <div className="xl:col-span-3 space-y-6">
          {/* Donut Chart: Application Status Distribution */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <AdminIcon name="reports" size={16} className="text-[#800020]" strokeWidth={1.75} />
              <h3 className="text-sm font-bold text-gray-900">Application Status Distribution</h3>
            </div>

            <div className="flex flex-col items-center py-2">
              <div className="relative flex items-center justify-center h-36 w-36 shrink-0 mb-3">
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                  {/* Pending 29% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    strokeDasharray="69 238"
                    strokeDashoffset="0"
                  />
                  {/* Approved 58% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="14"
                    strokeDasharray="138 238"
                    strokeDashoffset="-69"
                  />
                  {/* Rejected 13% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="14"
                    strokeDasharray="31 238"
                    strokeDashoffset="-207"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-gray-900">124</span>
                  <span className="text-[10px] font-medium text-gray-400">Total Applications</span>
                </div>
              </div>

              <div className="w-full space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#F59E0B]"></span> Pending
                  </span>
                  <span className="font-semibold text-gray-900">36 (29%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#10B981]"></span> Approved
                  </span>
                  <span className="font-semibold text-gray-900">72 (58%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#EF4444]"></span> Rejected
                  </span>
                  <span className="font-semibold text-gray-900">16 (13%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#94A3B8]"></span> Expired
                  </span>
                  <span className="font-semibold text-gray-900">4 (3%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Applicant Locations */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AdminIcon name="wholesale" size={16} className="text-[#800020]" strokeWidth={1.75} />
                <h3 className="text-sm font-bold text-gray-900">Top Applicant Locations</h3>
              </div>
              <button
                onClick={() => triggerToast('Viewing all locations')}
                className="text-xs font-semibold text-[#800020] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {TOP_LOCATIONS.map((loc) => (
                <div key={loc.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFF0F3] text-[10px] font-bold text-[#800020]">
                      {loc.id}
                    </span>
                    <div>
                      <p className="font-bold text-gray-900">{loc.state}</p>
                      <p className="text-[10px] text-gray-400">{loc.count} applications</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-800">{loc.percentage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Applications */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AdminIcon name="clock" size={16} className="text-[#800020]" strokeWidth={1.75} />
                <h3 className="text-sm font-bold text-gray-900">Recent Applications</h3>
              </div>
              <button
                onClick={() => triggerToast('Viewing all recent applications')}
                className="text-xs font-semibold text-[#800020] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {applications.slice(0, 5).map((app) => (
                <div key={app.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${app.color}`}
                    >
                      {app.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 truncate">{app.applicantName}</p>
                      <p className="text-[11px] text-gray-400 truncate">{app.company}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold ${getStatusBadge(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-0.5">{app.appliedOn.split(' ').slice(0, 2).join(' ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Need Help */}
          <div className="rounded-2xl border border-rose-100 bg-[#FFF8F9] p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-[#800020]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="text-sm font-bold">Need Help?</h3>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Have questions about wholesale applications? Contact our support team for assistance.
            </p>
            <button
              onClick={() => triggerToast('Contacting Wholesale Support...')}
              className="w-full rounded-xl border border-[#800020] bg-white py-2 text-xs font-semibold text-[#800020] hover:bg-[#800020] hover:text-white transition-colors"
            >
              Contact Support →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

