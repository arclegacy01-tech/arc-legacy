import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminIcon from '../../components/admin/AdminIcons.jsx';
import { fetchAdminDashboard } from '../../api/adminApi.js';
import { useAdminAutoRefresh } from '../../hooks/useAdminSync.js';
import { formatPrice } from '../../utils/format.js';

export default function AdminDashboard() {
  const { data: dashboard, loading, error, refresh } = useAdminAutoRefresh(
    () => fetchAdminDashboard(),
    ['order_created', 'order_updated', 'inventory_updated', 'wholesale_created', 'wholesale_updated', 'customer_created']
  );

  const m = dashboard?.stats || dashboard?.metrics || {};
  const stats = {
    totalSales: m.totalSales ?? m.totalRevenue ?? 0,
    totalOrders: m.totalOrders ?? 0,
    pendingOrders: m.pendingOrders ?? 0,
    processingOrders: m.processingOrders ?? 0,
    deliveredOrders: m.deliveredOrders ?? 0,
    cancelledOrders: m.cancelledOrders ?? 0,
    totalCustomers: m.totalCustomers ?? 0,
    totalProducts: m.totalProducts ?? 0,
    totalStock: m.totalStock ?? m.totalStockQuantity ?? 0,
    lowStockCount: m.lowStockCount ?? 0,
    outOfStockCount: m.outOfStockCount ?? 0,
    wholesaleEnquiries: m.wholesaleEnquiries ?? m.totalWholesale ?? 0,
    wholesalePending: m.wholesalePending ?? m.pendingWholesale ?? 0,
  };

  const recentOrders = dashboard?.recentOrders || [];
  const recentCustomers = dashboard?.recentCustomers || [];
  const recentWholesale = dashboard?.recentWholesale || [];
  const salesTrend = dashboard?.salesTrend || [];

  const maxTrend = Math.max(...salesTrend.map((t) => t.sales || 0), 1000);

  const getStatusBadge = (status) => {
    switch (String(status).toLowerCase()) {
      case 'delivered':
        return { bg: 'bg-[#E6F6EC]', text: 'text-[#1E824C]', label: 'Delivered' };
      case 'processing':
        return { bg: 'bg-[#FFF4E5]', text: 'text-[#D9822B]', label: 'Processing' };
      case 'shipped':
        return { bg: 'bg-[#EBF5FB]', text: 'text-[#2980B9]', label: 'Shipped' };
      case 'cancelled':
        return { bg: 'bg-[#FCE8EE]', text: 'text-[#C8234B]', label: 'Cancelled' };
      default:
        return { bg: 'bg-[#FFF4E5]', text: 'text-[#D9822B]', label: 'Pending' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header / Live Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-[#8E1838]">Admin Dashboard</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Sync Active
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-1">
            Real-time store metrics, live inventory, and multi-tab database synchronization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refresh()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 shadow-sm transition-colors"
            title="Refresh database records"
          >
            <AdminIcon name="refresh" size={14} className={loading ? 'animate-spin' : ''} />
            <span>Sync Now</span>
          </button>
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8E1838] hover:bg-[#72132D] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <AdminIcon name="plus" size={14} />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">Total Sales</span>
            <div className="w-9 h-9 rounded-lg bg-[#FDF2F5] text-[#8E1838] flex items-center justify-center">
              <AdminIcon name="reports" size={18} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-[#8E1838]">
            {formatPrice(stats.totalSales)}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
            <span className="text-emerald-600 font-semibold">Live Revenue</span>
            <span>across all confirmed orders</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">Total Orders</span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <AdminIcon name="orders" size={18} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-neutral-900">
            {stats.totalOrders}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
              {stats.pendingOrders} Pending
            </span>
            <span className="text-neutral-500">· {stats.processingOrders} Processing</span>
          </div>
        </div>

        {/* Total Customers */}
        <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">Registered Customers</span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <AdminIcon name="customers" size={18} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-neutral-900">
            {stats.totalCustomers}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
            <span className="text-blue-700 font-semibold">MongoDB Atlas</span>
            <span>customer accounts</span>
          </div>
        </div>

        {/* Wholesale Enquiries */}
        <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">Wholesale Enquiries</span>
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <AdminIcon name="wholesale" size={18} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-neutral-900">
            {stats.wholesaleEnquiries}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold">
              {stats.wholesalePending} Awaiting Approval
            </span>
          </div>
        </div>
      </div>

      {/* Secondary Stock & Operational KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Products & In-Stock */}
        <div className="rounded-xl border border-neutral-200/80 bg-white p-4 flex items-center justify-between shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center">
              <AdminIcon name="products" size={20} />
            </div>
            <div>
              <div className="text-xs text-neutral-500 font-medium">Active Catalog Products</div>
              <div className="text-lg font-bold text-neutral-900">{stats.totalProducts} Items</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-neutral-400">Total Units</div>
            <div className="text-sm font-semibold text-emerald-600">{stats.totalStock} in stock</div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <Link
          to="/admin/products/inventory?filter=low"
          className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 flex items-center justify-between hover:bg-amber-50 transition-colors shadow-card"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <AdminIcon name="warning" size={20} />
            </div>
            <div>
              <div className="text-xs text-amber-800 font-semibold">Low Stock Alert</div>
              <div className="text-lg font-bold text-amber-900">{stats.lowStockCount} Products</div>
            </div>
          </div>
          <span className="text-xs font-semibold text-amber-800 underline">Review &rarr;</span>
        </Link>

        {/* Out of Stock Alerts */}
        <Link
          to="/admin/products/inventory?filter=out"
          className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 flex items-center justify-between hover:bg-rose-50 transition-colors shadow-card"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center">
              <AdminIcon name="trash" size={20} />
            </div>
            <div>
              <div className="text-xs text-rose-800 font-semibold">Out of Stock</div>
              <div className="text-lg font-bold text-rose-900">{stats.outOfStockCount} Products</div>
            </div>
          </div>
          <span className="text-xs font-semibold text-rose-800 underline">Restock &rarr;</span>
        </Link>
      </div>

      {/* Sales Trend & Order Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day Sales Trend Chart */}
        <div className="lg:col-span-2 rounded-xl border border-neutral-200 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif font-bold text-lg text-neutral-900">7-Day Sales Activity</h2>
              <p className="text-xs text-neutral-500">Live order revenue by calendar date</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#FDF2F5] text-[#8E1838]">
              MongoDB Live Stream
            </span>
          </div>

          <div className="h-48 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-neutral-100">
            {salesTrend.map((t, idx) => {
              const heightPct = Math.max(12, Math.round(((t.sales || 0) / maxTrend) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                  <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10">
                    {formatPrice(t.sales)} ({t.orders} orders)
                  </div>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full max-w-[42px] rounded-t-md bg-[#8E1838] hover:bg-[#B8294B] transition-all"
                  />
                  <span className="text-[11px] text-neutral-500 font-medium truncate w-full text-center">
                    {t.date}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
            <span>Peak 7-day revenue: <strong>{formatPrice(maxTrend)}</strong></span>
            <Link to="/admin/reports/sales" className="text-[#8E1838] font-semibold hover:underline">
              View Detailed Sales Report &rarr;
            </Link>
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-card flex flex-col justify-between">
          <div>
            <h2 className="font-serif font-bold text-lg text-neutral-900 mb-1">Order Pipeline</h2>
            <p className="text-xs text-neutral-500 mb-4">Real-time breakdown of store orders</p>

            <div className="space-y-3">
              {[
                { label: 'Pending', count: stats.pendingOrders, color: 'bg-amber-400', link: '/admin/orders/pending' },
                { label: 'Processing', count: stats.processingOrders, color: 'bg-blue-400', link: '/admin/orders/processing' },
                { label: 'Delivered', count: stats.deliveredOrders, color: 'bg-emerald-500', link: '/admin/orders/delivered' },
                { label: 'Cancelled', count: stats.cancelledOrders, color: 'bg-rose-400', link: '/admin/orders/cancelled' },
              ].map((s) => {
                const pct = stats.totalOrders > 0 ? Math.round((s.count / stats.totalOrders) * 100) : 0;
                return (
                  <Link key={s.label} to={s.link} className="block group">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-neutral-700 group-hover:text-[#8E1838] transition-colors">{s.label}</span>
                      <span className="text-neutral-500">{s.count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-neutral-100 rounded-full h-2">
                      <div className={`${s.color} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 mt-4">
            <Link
              to="/admin/orders"
              className="w-full py-2 px-3 rounded-lg bg-[#FDF2F5] text-[#8E1838] hover:bg-[#F9E2E8] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Manage All Orders ({stats.totalOrders})</span>
              <AdminIcon name="chevron-right" size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Tables: Recent Orders & Recent Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (2 cols) */}
        <div className="lg:col-span-2 rounded-xl border border-neutral-200 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif font-bold text-lg text-neutral-900">Recent Orders</h2>
              <p className="text-xs text-neutral-500">Live order updates from MongoDB</p>
            </div>
            <Link to="/admin/orders" className="text-xs font-semibold text-[#8E1838] hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 text-neutral-500 border-y border-neutral-100">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Order</th>
                  <th className="py-2.5 px-3 font-semibold">Customer</th>
                  <th className="py-2.5 px-3 font-semibold">Items</th>
                  <th className="py-2.5 px-3 font-semibold">Total</th>
                  <th className="py-2.5 px-3 font-semibold">Payment</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-neutral-400">
                      No orders in database yet.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((o) => {
                    const badge = getStatusBadge(o.status);
                    return (
                      <tr key={o._id} className="hover:bg-neutral-50/80 transition-colors">
                        <td className="py-3 px-3 font-semibold text-[#8E1838]">
                          <Link to="/admin/orders">#{o.orderNumber || o._id.slice(-6)}</Link>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-neutral-900">{o.customerName || 'Customer'}</div>
                          <div className="text-[10px] text-neutral-400">{o.customerEmail || ''}</div>
                        </td>
                        <td className="py-3 px-3 text-neutral-600">
                          {o.items?.length || 1} item{o.items?.length === 1 ? '' : 's'}
                        </td>
                        <td className="py-3 px-3 font-semibold text-neutral-900">
                          {formatPrice(o.total || 0)}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            o.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-600'
                          }`}>
                            {o.paymentMethod || 'Online'}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${badge.bg} ${badge.text}`}>
                            {badge.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Customers & Wholesale Widget (1 col) */}
        <div className="space-y-6">
          {/* Customers */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-serif font-bold text-base text-neutral-900">New Customers</h2>
              <Link to="/admin/customers" className="text-xs font-semibold text-[#8E1838] hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {recentCustomers.length === 0 ? (
                <div className="py-4 text-center text-xs text-neutral-400">No registered customers yet</div>
              ) : (
                recentCustomers.slice(0, 4).map((c) => (
                  <div key={c._id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#FDF2F5] text-[#8E1838] font-bold flex items-center justify-center text-xs">
                        {c.name ? c.name[0].toUpperCase() : 'U'}
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900">{c.name || 'Anonymous'}</div>
                        <div className="text-[10px] text-neutral-400">{c.email}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-400">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Wholesale Enquiries */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-serif font-bold text-base text-neutral-900">Wholesale Leads</h2>
              <Link to="/admin/wholesale" className="text-xs font-semibold text-[#8E1838] hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {recentWholesale.length === 0 ? (
                <div className="py-4 text-center text-xs text-neutral-400">No wholesale enquiries yet</div>
              ) : (
                recentWholesale.slice(0, 3).map((w) => (
                  <div key={w._id} className="flex items-center justify-between text-xs border-b border-neutral-50 pb-2">
                    <div>
                      <div className="font-medium text-neutral-900">{w.businessName || w.contactName}</div>
                      <div className="text-[10px] text-neutral-400">{w.city || w.email}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      w.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {w.status || 'Pending'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
