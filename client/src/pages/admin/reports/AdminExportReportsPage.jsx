import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AdminIcon from '../../../components/admin/AdminIcons.jsx';

const INITIAL_REPORTS = [
  {
    id: 1,
    name: 'Sales Report - October 2026',
    type: 'Sales',
    dateRange: '01 Oct - 31 Oct',
    format: 'Excel',
    formatClass: 'bg-[#E2F6EB] text-[#1D8852]',
    generatedOn: '31 Oct 2026, 11:20 AM',
    generatedBy: 'Admin',
    status: 'Completed',
    fileSize: '245 KB',
  },
  {
    id: 2,
    name: 'Product Report - October 2026',
    type: 'Product',
    dateRange: '01 Oct - 31 Oct',
    format: 'Excel',
    formatClass: 'bg-[#E2F6EB] text-[#1D8852]',
    generatedOn: '31 Oct 2026, 10:45 AM',
    generatedBy: 'Admin',
    status: 'Completed',
    fileSize: '182 KB',
  },
  {
    id: 3,
    name: 'Customer Report - October 2026',
    type: 'Customer',
    dateRange: '01 Oct - 31 Oct',
    format: 'CSV',
    formatClass: 'bg-[#E3F1FC] text-[#286EC8]',
    generatedOn: '30 Oct 2026, 04:20 PM',
    generatedBy: 'Admin',
    status: 'Completed',
    fileSize: '96 KB',
  },
  {
    id: 4,
    name: 'Marketing Report - Q4 2026',
    type: 'Marketing',
    dateRange: '01 Oct - 31 Oct',
    format: 'PDF',
    formatClass: 'bg-[#FDEBF1] text-[#C92A52]',
    generatedOn: '30 Oct 2026, 11:10 AM',
    generatedBy: 'Admin',
    status: 'Completed',
    fileSize: '310 KB',
  },
  {
    id: 5,
    name: 'Inventory Report - October 2026',
    type: 'Inventory',
    dateRange: '01 Oct - 31 Oct',
    format: 'Excel',
    formatClass: 'bg-[#E2F6EB] text-[#1D8852]',
    generatedOn: '29 Oct 2026, 06:15 PM',
    generatedBy: 'Admin',
    status: 'Completed',
    fileSize: '128 KB',
  },
  {
    id: 6,
    name: 'Orders Report - October 2026',
    type: 'Orders',
    dateRange: '01 Oct - 31 Oct',
    format: 'Excel',
    formatClass: 'bg-[#E2F6EB] text-[#1D8852]',
    generatedOn: '29 Oct 2026, 02:30 PM',
    generatedBy: 'Staff 1',
    status: 'Completed',
    fileSize: '210 KB',
  },
  {
    id: 7,
    name: 'Low Stock Report',
    type: 'Inventory',
    dateRange: '01 Oct - 31 Oct',
    format: 'CSV',
    formatClass: 'bg-[#E3F1FC] text-[#286EC8]',
    generatedOn: '28 Oct 2026, 11:50 AM',
    generatedBy: 'Admin',
    status: 'Completed',
    fileSize: '54 KB',
  },
  {
    id: 8,
    name: 'Top Selling Products',
    type: 'Product',
    dateRange: '01 Oct - 31 Oct',
    format: 'PDF',
    formatClass: 'bg-[#FDEBF1] text-[#C92A52]',
    generatedOn: '27 Oct 2026, 03:40 PM',
    generatedBy: 'Staff 2',
    status: 'Completed',
    fileSize: '420 KB',
  },
  {
    id: 9,
    name: 'New Customers Report',
    type: 'Customer',
    dateRange: '01 Oct - 31 Oct',
    format: 'Excel',
    formatClass: 'bg-[#E2F6EB] text-[#1D8852]',
    generatedOn: '26 Oct 2026, 01:15 PM',
    generatedBy: 'Admin',
    status: 'Completed',
    fileSize: '86 KB',
  },
  {
    id: 10,
    name: 'Ad Performance Report',
    type: 'Marketing',
    dateRange: '01 Oct - 31 Oct',
    format: 'CSV',
    formatClass: 'bg-[#E3F1FC] text-[#286EC8]',
    generatedOn: '25 Oct 2026, 05:30 PM',
    generatedBy: 'Admin',
    status: 'Completed',
    fileSize: '190 KB',
  },
];

const RECENT_EXPORTS = [
  { name: 'Sales Report - October 2026', time: '31 Oct 2026, 11:20 AM' },
  { name: 'Product Report - October 2026', time: '31 Oct 2026, 10:45 AM' },
  { name: 'Customer Report - October 2026', time: '30 Oct 2026, 04:20 PM' },
  { name: 'Marketing Report - Q4 2026', time: '30 Oct 2026, 11:10 AM' },
  { name: 'Inventory Report - October 2026', time: '29 Oct 2026, 06:15 PM' },
];

export default function AdminExportReportsPage() {
  const outletCtx = useOutletContext() || {};
  const globalSearch = outletCtx.globalSearch || '';

  const [activeTab, setActiveTab] = useState('All Reports');
  const [searchQuery, setSearchQuery] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState('All Report Types');
  const [formatFilter, setFormatFilter] = useState('All Formats');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  const effectiveSearch = (searchQuery || globalSearch).trim().toLowerCase();

  const filteredReports = useMemo(() => {
    return INITIAL_REPORTS.filter((r) => {
      const matchesSearch =
        !effectiveSearch ||
        r.name.toLowerCase().includes(effectiveSearch) ||
        r.type.toLowerCase().includes(effectiveSearch) ||
        r.generatedBy.toLowerCase().includes(effectiveSearch);

      const matchesTab =
        activeTab === 'All Reports' || r.type.toLowerCase() === activeTab.toLowerCase();

      const matchesType =
        reportTypeFilter === 'All Report Types' || r.type === reportTypeFilter;

      const matchesFormat =
        formatFilter === 'All Formats' || r.format === formatFilter;

      return matchesSearch && matchesTab && matchesType && matchesFormat;
    });
  }, [effectiveSearch, activeTab, reportTypeFilter, formatFilter]);

  const handleDownloadReport = (r) => {
    triggerToast(`Downloading ${r.name} (${r.format})...`);
  };

  // Donut SVG Calculations for Reports by Type (Total: 48)
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const donutSegments = [
    { label: 'Sales Reports', count: 19, pct: 40, color: '#E8638C' },
    { label: 'Product Reports', count: 10, pct: 21, color: '#68C39B' },
    { label: 'Customer Reports', count: 7, pct: 15, color: '#56BBE5' },
    { label: 'Marketing Reports', count: 6, pct: 13, color: '#F7A75C' },
    { label: 'Inventory Reports', count: 4, pct: 8, color: '#9777E5' },
    { label: 'Others', count: 2, pct: 3, color: '#A59196' },
  ];
  let cumulativePct = 0;

  return (
    <div className="space-y-5 pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C1E21] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-[13px] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#249A62]" />
          {toastMsg}
        </div>
      )}

      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#8C7076] mb-1.5">
            <AdminIcon name="chevron-right" size={12} className="text-[#B89CA3]" />
            <Link to="/admin/reports/sales" className="hover:text-[#A91D48] transition-colors">
              Reports
            </Link>
            <AdminIcon name="chevron-right" size={12} className="text-[#B89CA3]" />
            <span className="text-[#4A3439] font-medium">Export Reports</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDF2F5] border border-[#F3DCE2] flex items-center justify-center text-[#A91D48] shrink-0">
              <AdminIcon name="download" size={22} />
            </div>
            <div>
              <h1
                className="text-[24px] font-bold text-[#8E1838] leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Export Reports
              </h1>
              <p className="text-[12.5px] text-[#7A6268] mt-0.5">
                Export, download, and schedule reports for your store data.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#E6D3D8] text-[12px] text-[#4A3439] shadow-xs">
            <AdminIcon name="calendar" size={14} className="text-[#8E1838]" />
            <span className="font-semibold">01 Oct 2026 - 31 Oct 2026</span>
          </div>
          <button
            onClick={() => triggerToast('New custom export created.')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8E1838] text-white text-[12.5px] font-semibold hover:bg-[#77132E] transition-colors shadow-xs cursor-pointer"
          >
            <AdminIcon name="download" size={15} />
            Export Report
          </button>
        </div>
      </div>

      {/* 5 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Total Reports Generated */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#FDEBF1] flex items-center justify-center text-[#B82050] shrink-0">
            <AdminIcon name="draft" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#7A6268]">Total Reports Generated</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[22px] font-bold text-[#2C1E21] leading-none">48</span>
              <span className="text-[10.5px] font-semibold text-[#1D8852] flex items-center">
                <AdminIcon name="arrow-up" size={10} />
                33%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">vs last month</p>
          </div>
        </div>

        {/* Total Downloads */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#E6F7EE] flex items-center justify-center text-[#1D8852] shrink-0">
            <AdminIcon name="cloud-download" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#7A6268]">Total Downloads</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[22px] font-bold text-[#2C1E21] leading-none">126</span>
              <span className="text-[10.5px] font-semibold text-[#1D8852] flex items-center">
                <AdminIcon name="arrow-up" size={10} />
                28%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">vs last month</p>
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#FDEBF1] flex items-center justify-center text-[#B82050] shrink-0">
            <AdminIcon name="clock" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#7A6268]">Scheduled Reports</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[22px] font-bold text-[#2C1E21] leading-none">12</span>
              <span className="text-[10.5px] font-semibold text-[#1D8852] flex items-center">
                <AdminIcon name="arrow-up" size={10} />
                50%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">active schedules</p>
          </div>
        </div>

        {/* Reports Users */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#F3ECF9] flex items-center justify-center text-[#8048C5] shrink-0">
            <AdminIcon name="customers" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#7A6268]">Reports Users</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[22px] font-bold text-[#2C1E21] leading-none">4</span>
              <span className="text-[10.5px] font-semibold text-[#7A6268] flex items-center">
                <AdminIcon name="arrow-up" size={10} />
                0%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">team members</p>
          </div>
        </div>

        {/* Data Size Exported */}
        <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#FFF4E4] flex items-center justify-center text-[#D98218] shrink-0">
            <AdminIcon name="database" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#7A6268]">Data Size Exported</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[20px] font-bold text-[#2C1E21] leading-none">1.8 GB</span>
              <span className="text-[10.5px] font-semibold text-[#1D8852] flex items-center">
                <AdminIcon name="arrow-up" size={10} />
                42%
              </span>
            </div>
            <p className="text-[10px] text-[#8C7076] mt-0.5">this month</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[12px] font-semibold">
        {[
          'All Reports',
          'Sales',
          'Products',
          'Customers',
          'Marketing',
          'Inventory',
          'Orders',
          'Scheduled Reports',
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl transition-colors cursor-pointer shrink-0 ${
              activeTab === tab
                ? 'bg-[#8E1838] text-white shadow-xs'
                : 'bg-white text-[#4A3439] hover:bg-[#FDF5F7] border border-[#EBE0E3]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Grid: Left 9 cols + Right 3 cols */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Column */}
        <div className="xl:col-span-9 space-y-5">
          {/* Middle Row Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Reports Generated Over Time */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[13.5px] font-bold text-[#8E1838] flex items-center gap-1.5">
                    <AdminIcon name="bar-chart" size={15} />
                    Reports Generated Over Time
                  </h3>
                  <p className="text-[11px] text-[#7A6268]">Number of reports generated and downloaded</p>
                </div>
                <select className="px-2.5 py-1 text-[11px] font-semibold rounded-lg border border-[#E8D8DC] bg-white text-[#4A3439] focus:outline-none">
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                </select>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-[11px] text-[#4A3439]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8638C]" />
                  Reports Generated
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#68C39B]" />
                  Reports Downloaded
                </span>
              </div>

              {/* Bar Chart */}
              <div className="h-44 w-full flex items-end gap-2 pt-4 px-2 border-b border-[#F0E4E7]">
                {[
                  { date: '1 Oct', genH: 25, dwnH: 40 },
                  { date: '5 Oct', genH: 35, dwnH: 50 },
                  { date: '10 Oct', genH: 48, dwnH: 60 },
                  { date: '15 Oct', genH: 60, dwnH: 75 },
                  { date: '20 Oct', genH: 68, dwnH: 82 },
                  { date: '25 Oct', genH: 75, dwnH: 90 },
                  { date: '31 Oct', genH: 88, dwnH: 98 },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      <div className="w-3 rounded-t bg-[#E8638C]" style={{ height: `${bar.genH}%` }} />
                      <div className="w-3 rounded-t bg-[#68C39B]" style={{ height: `${bar.dwnH}%` }} />
                    </div>
                    <span className="text-[10px] text-[#8C7076] mt-1">{bar.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reports by Type Donut */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                  <AdminIcon name="sparkle" size={14} />
                </span>
                <h3 className="text-[13.5px] font-bold text-[#8E1838]">
                  Reports by Type
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-[125px] h-[125px] shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 130 130">
                    <circle cx="65" cy="65" r={radius} fill="none" stroke="#F5ECF0" strokeWidth="18" />
                    {donutSegments.map((seg, i) => {
                      const dash = (seg.pct / 100) * circumference;
                      const offset = (cumulativePct / 100) * circumference;
                      cumulativePct += seg.pct;
                      return (
                        <circle
                          key={i}
                          cx="65"
                          cy="65"
                          r={radius}
                          fill="none"
                          stroke={seg.color}
                          strokeWidth="18"
                          strokeDasharray={`${dash} ${circumference - dash}`}
                          strokeDashoffset={-offset}
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[20px] font-bold text-[#2C1E21] leading-none">48</span>
                    <span className="text-[9.5px] text-[#7A6268] mt-0.5">Total Reports</span>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] flex-1">
                  {donutSegments.map((s) => (
                    <div key={s.label} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                        <span className="text-[#4A3439]">{s.label}</span>
                      </span>
                      <span className="font-bold text-[#2C1E21]">{s.pct}% ({s.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Third Row: Generated Reports Table */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] shadow-[0_2px_12px_rgba(142,24,56,0.03)] overflow-hidden">
            <div className="p-3.5 border-b border-[#F3E6EA] flex flex-wrap items-center justify-between gap-2.5">
              <div>
                <h4 className="text-[13.5px] font-bold text-[#8E1838]">Generated Reports</h4>
                <p className="text-[10.5px] text-[#7A6268]">List of all exported reports from your store</p>
              </div>

              <div className="flex items-center gap-2 flex-1 max-w-md justify-end">
                <div className="relative flex-1">
                  <AdminIcon name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8187]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search reports by name, type, or generated by..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[11.5px] text-[#2C1E21] focus:outline-none"
                  />
                </div>
                <select className="px-3 py-1.5 rounded-xl border border-[#E8D8DC] bg-white text-[11.5px] text-[#4A3439] focus:outline-none">
                  <option>Columns</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11.5px]">
                <thead>
                  <tr className="bg-[#FDF7F8] border-b border-[#F1E2E6] font-bold text-[#4A3439]">
                    <th className="py-2.5 pl-4 pr-2 w-8">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === filteredReports.length && filteredReports.length > 0}
                        onChange={() => {
                          if (selectedIds.length === filteredReports.length) setSelectedIds([]);
                          else setSelectedIds(filteredReports.map((r) => r.id));
                        }}
                        className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="py-2.5 px-2">#</th>
                    <th className="py-2.5 px-2.5">Report Name</th>
                    <th className="py-2.5 px-2.5">Report Type</th>
                    <th className="py-2.5 px-2.5">Date Range</th>
                    <th className="py-2.5 px-2.5">Format</th>
                    <th className="py-2.5 px-2.5">Generated On</th>
                    <th className="py-2.5 px-2.5">Generated By</th>
                    <th className="py-2.5 px-2.5">Status</th>
                    <th className="py-2.5 px-2.5">File Size</th>
                    <th className="py-2.5 pl-2.5 pr-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EAEc]">
                  {filteredReports.map((r) => (
                    <tr key={r.id} className="hover:bg-[#FDF9FA] transition-colors">
                      <td className="py-2.5 pl-4 pr-2">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(r.id)}
                          onChange={() => {
                            setSelectedIds(
                              selectedIds.includes(r.id)
                                ? selectedIds.filter((i) => i !== r.id)
                                : [...selectedIds, r.id]
                            );
                          }}
                          className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-[#7A6268]">{r.id}</td>
                      <td className="py-2.5 px-2.5 font-bold text-[#2C1E21] flex items-center gap-2">
                        <AdminIcon name="draft" size={13} className="text-[#8E1838]" />
                        {r.name}
                      </td>
                      <td className="py-2.5 px-2.5 text-[#5E474D]">{r.type}</td>
                      <td className="py-2.5 px-2.5 text-[#5E474D]">{r.dateRange}</td>
                      <td className="py-2.5 px-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${r.formatClass}`}>
                          {r.format}
                        </span>
                      </td>
                      <td className="py-2.5 px-2.5 text-[#5E474D]">{r.generatedOn}</td>
                      <td className="py-2.5 px-2.5 text-[#5E474D]">{r.generatedBy}</td>
                      <td className="py-2.5 px-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E2F6EB] text-[#1D8852]">
                          {r.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-2.5 text-[#5E474D]">{r.fileSize}</td>
                      <td className="py-2.5 pl-2.5 pr-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleDownloadReport(r)}
                            title="Download"
                            className="w-6 h-6 rounded border border-[#EDE0E3] bg-[#FDF9FA] text-[#A91D48] flex items-center justify-center hover:bg-[#FCE8EE] cursor-pointer"
                          >
                            <AdminIcon name="download" size={12} />
                          </button>
                          <button
                            onClick={() => triggerToast(`Options for ${r.name}`)}
                            title="More"
                            className="w-6 h-6 rounded border border-[#EDE0E3] bg-[#FDF9FA] text-[#7A6268] flex items-center justify-center hover:bg-[#FCE8EE] cursor-pointer"
                          >
                            <AdminIcon name="more" size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-4 py-3 border-t border-[#F3E6EA] flex items-center justify-between text-[11.5px] text-[#6E565C]">
              <span>Showing 1 – {filteredReports.length} of 48 reports</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-6 h-6 rounded border border-[#E6D6DA] bg-white flex items-center justify-center cursor-pointer"
                >
                  <AdminIcon name="chevron-left" size={11} />
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-6 h-6 rounded text-[11px] font-bold cursor-pointer ${
                      currentPage === page ? 'bg-[#8E1838] text-white' : 'border border-[#E6D6DA] bg-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                  className="w-6 h-6 rounded border border-[#E6D6DA] bg-white flex items-center justify-center cursor-pointer"
                >
                  <AdminIcon name="chevron-right" size={11} />
                </button>
              </div>
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="px-2 py-1 rounded border border-[#E6D6DA] bg-white text-[11px]"
              >
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Filters + Quick Actions + Recent Exports */}
        <div className="xl:col-span-3 space-y-4">
          {/* Export Filters */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="filter" size={13} />
              </span>
              <h3 className="text-[13.5px] font-bold text-[#8E1838]">Export Filters</h3>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4A3439] mb-1">Date Range</label>
              <select className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#E8D8DC] bg-white text-[#4A3439]">
                <option>01 Oct 2026 - 31 Oct 2026</option>
                <option>Last 30 Days</option>
                <option>This Quarter</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4A3439] mb-1">Report Type</label>
              <select
                value={reportTypeFilter}
                onChange={(e) => setReportTypeFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#E8D8DC] bg-white text-[#4A3439]"
              >
                <option value="All Report Types">All Report Types</option>
                <option value="Sales">Sales</option>
                <option value="Product">Product</option>
                <option value="Customer">Customer</option>
                <option value="Marketing">Marketing</option>
                <option value="Inventory">Inventory</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4A3439] mb-1">File Format</label>
              <select
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#E8D8DC] bg-white text-[#4A3439]"
              >
                <option value="All Formats">All Formats</option>
                <option value="Excel">Excel (.xlsx)</option>
                <option value="CSV">CSV (.csv)</option>
                <option value="PDF">PDF (.pdf)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4A3439] mb-1">Generated By</label>
              <select className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#E8D8DC] bg-white text-[#4A3439]">
                <option>All Users</option>
                <option>Admin</option>
                <option>Staff 1</option>
                <option>Staff 2</option>
              </select>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => triggerToast('Export filters applied.')}
                className="flex-1 py-1.5 rounded-lg bg-[#8E1838] text-white text-[11px] font-bold cursor-pointer"
              >
                Apply Filters
              </button>
              <button
                onClick={() => {
                  setReportTypeFilter('All Report Types');
                  setFormatFilter('All Formats');
                  triggerToast('Export filters reset.');
                }}
                className="px-3 py-1.5 rounded-lg border border-[#E6D6DA] text-[11px] font-semibold text-[#4A3439] cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-2.5">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                <AdminIcon name="sparkle" size={13} />
              </span>
              <h3 className="text-[13.5px] font-bold text-[#8E1838]">Quick Actions</h3>
            </div>

            <div className="space-y-2 text-[11px]">
              <button
                onClick={() => triggerToast('Exporting current view.')}
                className="w-full p-2.5 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] text-[#4A3439] flex items-center gap-2.5 font-bold cursor-pointer"
              >
                <AdminIcon name="download" size={14} className="text-[#A91D48]" />
                <div className="text-left">
                  <p className="leading-tight">Export Current View</p>
                  <span className="text-[9.5px] font-normal text-[#8C7076]">Download current filtered data</span>
                </div>
              </button>

              <button
                onClick={() => triggerToast('Schedule report modal.')}
                className="w-full p-2.5 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] text-[#4A3439] flex items-center gap-2.5 font-bold cursor-pointer"
              >
                <AdminIcon name="clock" size={14} className="text-[#A91D48]" />
                <div className="text-left">
                  <p className="leading-tight">Schedule Report</p>
                  <span className="text-[9.5px] font-normal text-[#8C7076]">Set up recurring reports</span>
                </div>
              </button>

              <button
                onClick={() => triggerToast('Manage schedules.')}
                className="w-full p-2.5 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] text-[#4A3439] flex items-center gap-2.5 font-bold cursor-pointer"
              >
                <AdminIcon name="calendar" size={14} className="text-[#A91D48]" />
                <div className="text-left">
                  <p className="leading-tight">Manage Schedules</p>
                  <span className="text-[9.5px] font-normal text-[#8C7076]">View and edit scheduled exports</span>
                </div>
              </button>

              <button
                onClick={() => triggerToast('Report templates.')}
                className="w-full p-2.5 rounded-xl border border-[#F0DFE3] bg-[#FDF8F9] hover:bg-[#FCECEF] text-[#4A3439] flex items-center gap-2.5 font-bold cursor-pointer"
              >
                <AdminIcon name="draft" size={14} className="text-[#A91D48]" />
                <div className="text-left">
                  <p className="leading-tight">Report Templates</p>
                  <span className="text-[9.5px] font-normal text-[#8C7076]">Use saved templates</span>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Exports */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-4 shadow-[0_2px_10px_rgba(142,24,56,0.03)] space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FDF0F3] text-[#A91D48] flex items-center justify-center">
                  <AdminIcon name="clock" size={13} />
                </span>
                <h3 className="text-[13.5px] font-bold text-[#8E1838]">Recent Exports</h3>
              </div>
              <button
                onClick={() => triggerToast('Viewing all export history.')}
                className="text-[10.5px] font-semibold text-[#A91D48] hover:underline cursor-pointer"
              >
                View All →
              </button>
            </div>

            <div className="space-y-2 text-[11px]">
              {RECENT_EXPORTS.map((e, idx) => (
                <div key={idx} className="flex items-start gap-2 border-b border-[#FAF2F4] pb-1.5 last:border-0">
                  <AdminIcon name="draft" size={13} className="text-[#8E1838] mt-0.5 shrink-0" />
                  <div className="truncate">
                    <p className="font-semibold text-[#2C1E21] leading-tight truncate">{e.name}</p>
                    <span className="text-[9.5px] text-[#8C7076]">{e.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

