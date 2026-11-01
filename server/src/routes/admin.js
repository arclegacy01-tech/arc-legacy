import { Router } from 'express';
import mongoose from 'mongoose';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';
import { Category } from '../models/Category.js';
import { WholesaleEnquiry } from '../models/WholesaleEnquiry.js';
import { authRequired, adminRequired } from '../middleware/auth.js';
import { realtimeStreamHandler, broadcastAdminEvent } from '../utils/realtime.js';

const router = Router();

// SSE Real-time stream (requires admin authentication or admin query token)
router.get('/realtime-stream', realtimeStreamHandler);

// Public or Admin Dashboard summary endpoint
router.get('/dashboard', async (req, res) => {
  try {
    const [
      orders,
      totalCustomers,
      products,
      wholesaleEnquiries,
    ] = await Promise.all([
      Order.find().sort({ createdAt: -1 }),
      User.countDocuments({ role: { $ne: 'admin' } }),
      Product.find({ isActive: true }).select('title price stock lowStockAlert images category'),
      WholesaleEnquiry.find().sort({ createdAt: -1 }),
    ]);

    // Order statistics calculations
    const totalOrders = orders.length;
    let pendingOrders = 0;
    let processingOrders = 0;
    let shippedOrders = 0;
    let deliveredOrders = 0;
    let cancelledOrders = 0;
    let totalRevenue = 0;

    orders.forEach((o) => {
      const status = (o.status || 'pending').toLowerCase();
      if (status === 'pending') pendingOrders++;
      else if (status === 'processing') processingOrders++;
      else if (status === 'shipped') shippedOrders++;
      else if (status === 'delivered') deliveredOrders++;
      else if (status === 'cancelled') cancelledOrders++;

      if (status !== 'cancelled' && (o.paymentStatus === 'paid' || status === 'delivered')) {
        totalRevenue += Number(o.total || 0);
      }
    });

    // Inventory statistics calculations
    const totalProducts = products.length;
    let totalStockQuantity = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    products.forEach((p) => {
      const stock = Number(p.stock || 0);
      const threshold = Number(p.lowStockAlert || 10);
      totalStockQuantity += stock;
      if (stock <= 0) {
        outOfStockCount++;
      } else if (stock <= threshold) {
        lowStockCount++;
      }
    });

    // Wholesale statistics
    const totalWholesale = wholesaleEnquiries.length;
    let pendingWholesale = 0;
    let approvedWholesale = 0;
    let rejectedWholesale = 0;

    wholesaleEnquiries.forEach((w) => {
      const st = (w.status || 'pending').toLowerCase();
      if (st === 'pending') pendingWholesale++;
      else if (st === 'approved') approvedWholesale++;
      else if (st === 'rejected') rejectedWholesale++;
    });

    // Recent 10 Orders
    const recentOrders = orders.slice(0, 10).map((o) => ({
      id: o._id,
      orderNumber: o.orderNumber ? `#${o.orderNumber}` : `#${String(o._id).slice(-4)}`,
      customerName: o.customerName || (o.shippingAddress?.fullName) || 'Customer',
      customerPhone: o.customerPhone || o.shippingAddress?.phone || '+91 98765 00000',
      amount: Number(o.total || 0),
      itemsCount: Array.isArray(o.items) ? o.items.reduce((acc, i) => acc + (i.quantity || 1), 0) : 1,
      items: (o.items || []).map((i) => ({
        title: i.title,
        image: i.image || '/images/product-1.jpg',
        price: i.price,
        quantity: i.quantity,
      })),
      status: o.status || 'pending',
      paymentMethod: o.paymentMethod || 'cod',
      paymentStatus: o.paymentStatus || 'pending',
      createdAt: o.createdAt,
    }));

    // Recent 5 Customers
    const latestUsers = await User.find({ role: { $ne: 'admin' } })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email phone createdAt');

    // 7-day Sales trend chart
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStr = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      const dayStart = new Date(d.setHours(0, 0, 0, 0));
      const dayEnd = new Date(d.setHours(23, 59, 59, 999));

      let dayTotal = 0;
      let dayOrderCount = 0;

      orders.forEach((o) => {
        const orderDate = new Date(o.createdAt);
        if (orderDate >= dayStart && orderDate <= dayEnd && o.status !== 'cancelled') {
          dayTotal += Number(o.total || 0);
          dayOrderCount++;
        }
      });

      last7Days.push({
        date: dayStr,
        sales: dayTotal,
        orders: dayOrderCount,
      });
    }

    const metricsPayload = {
      totalRevenue,
      totalSales: totalRevenue,
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalCustomers,
      totalProducts,
      totalStock: totalStockQuantity,
      totalStockQuantity,
      lowStockCount,
      outOfStockCount,
      totalWholesale,
      wholesaleEnquiries: totalWholesale,
      wholesalePending: pendingWholesale,
      pendingWholesale,
      approvedWholesale,
      rejectedWholesale,
    };

    res.json({
      metrics: metricsPayload,
      stats: metricsPayload,
      recentOrders,
      recentCustomers: latestUsers,
      recentWholesale: wholesaleEnquiries.slice(0, 5),
      salesTrend: last7Days,
    });
  } catch (err) {
    console.error('[Admin Dashboard API]', err);
    res.status(500).json({ message: 'Failed to fetch dashboard metrics' });
  }
});

// Admin Customers List with live order aggregation
router.get('/customers', async (req, res) => {
  try {
    const { q, group } = req.query;
    const filter = { role: { $ne: 'admin' } };

    if (q) {
      filter.$or = [
        { name: new RegExp(q, 'i') },
        { email: new RegExp(q, 'i') },
        { phone: new RegExp(q, 'i') },
      ];
    }

    const [users, orders] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).lean(),
      Order.find().select('user customerName customerEmail total createdAt status').lean(),
    ]);

    // Aggregate orders per customer
    const customerStats = {};
    orders.forEach((o) => {
      const key = o.user ? String(o.user) : (o.customerEmail || '').toLowerCase();
      if (!key) return;
      if (!customerStats[key]) {
        customerStats[key] = { count: 0, totalSpent: 0, lastOrderDate: o.createdAt };
      }
      customerStats[key].count++;
      if (o.status !== 'cancelled') {
        customerStats[key].totalSpent += Number(o.total || 0);
      }
      if (new Date(o.createdAt) > new Date(customerStats[key].lastOrderDate)) {
        customerStats[key].lastOrderDate = o.createdAt;
      }
    });

    const customers = users.map((u) => {
      const idKey = String(u._id);
      const emailKey = (u.email || '').toLowerCase();
      const stats = customerStats[idKey] || customerStats[emailKey] || { count: 0, totalSpent: 0, lastOrderDate: null };

      // Determine customer group
      let customerGroup = 'Retail';
      if (stats.totalSpent >= 50000 || stats.count >= 10) {
        customerGroup = 'Wholesale';
      } else if (stats.totalSpent >= 20000) {
        customerGroup = 'B2B Partners';
      }

      return {
        _id: u._id,
        id: u._id,
        name: u.name || 'Customer',
        email: u.email,
        phone: u.phone || '+91 98765 00000',
        group: customerGroup,
        ordersCount: stats.count,
        totalSpent: stats.totalSpent,
        lastOrder: stats.lastOrderDate,
        createdAt: u.createdAt,
        status: stats.count > 0 ? 'Active' : 'Inactive',
      };
    });

    res.json({ customers });
  } catch (err) {
    console.error('[Admin Customers API]', err);
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
});

// Admin Inventory List with real stock levels
router.get('/inventory', async (req, res) => {
  try {
    const { q, category, status } = req.query;
    const filter = { isActive: true };

    if (q) {
      filter.$or = [
        { title: new RegExp(q, 'i') },
        { sku: new RegExp(q, 'i') },
      ];
    }

    let products = await Product.find(filter)
      .populate('category', 'name slug')
      .populate('subCategory', 'name slug')
      .sort({ updatedAt: -1 })
      .lean();

    if (category && category !== 'All Categories') {
      products = products.filter(
        (p) => p.category?.name === category || p.category?.slug === category
      );
    }

    let totalStock = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    const items = products.map((p) => {
      const stock = Number(p.stock || 0);
      const threshold = Number(p.lowStockAlert || 10);
      totalStock += stock;

      let stockStatus = 'In Stock';
      if (stock <= 0) {
        stockStatus = 'Out of Stock';
        outOfStockCount++;
      } else if (stock <= threshold) {
        stockStatus = 'Low Stock';
        lowStockCount++;
      }

      return {
        _id: p._id,
        id: p._id,
        name: p.title,
        sku: p.sku || `SKU-${String(p._id).slice(-4)}`,
        category: p.category?.name || 'Laces',
        subCategory: p.subCategory?.name || '',
        variants: p.variations?.length || 1,
        totalStock: stock,
        status: stockStatus,
        lastUpdatedDate: new Date(p.updatedAt || p.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        lastUpdatedTime: new Date(p.updatedAt || p.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        image: p.images?.[0]?.url || '/images/product-1.jpg',
      };
    });

    if (status && status !== 'All Status') {
      items = items.filter((i) => i.status === status);
    }

    res.json({
      metrics: {
        totalProducts: products.length,
        totalStock,
        lowStockCount,
        outOfStockCount,
      },
      items,
    });
  } catch (err) {
    console.error('[Admin Inventory API]', err);
    res.status(500).json({ message: 'Failed to fetch inventory' });
  }
});

// Quick live stock adjustment
router.patch('/inventory/:id/stock', async (req, res) => {
  try {
    const { stock } = req.body;
    if (stock === undefined || isNaN(stock)) {
      return res.status(400).json({ message: 'Valid stock number is required' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock: Math.max(0, Number(stock)), updatedAt: new Date() },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Broadcast real-time stock change
    broadcastAdminEvent('inventory_updated', {
      productId: product._id,
      title: product.title,
      newStock: product.stock,
    });

    res.json({ ok: true, product });
  } catch (err) {
    console.error('[Admin Update Stock API]', err);
    res.status(500).json({ message: 'Failed to update stock' });
  }
});

// Admin Reports Analytics
router.get('/reports', async (req, res) => {
  try {
    const { range, type } = req.query;

    // Determine Date Filter
    let startDate = new Date(0);
    const now = new Date();

    if (range === 'today') {
      startDate = new Date(now.setHours(0, 0, 0, 0));
    } else if (range === 'yesterday') {
      startDate = new Date(now.setDate(now.getDate() - 1));
      startDate.setHours(0, 0, 0, 0);
    } else if (range === '7days') {
      startDate = new Date(Date.now() - 7 * 86400000);
    } else if (range === '30days') {
      startDate = new Date(Date.now() - 30 * 86400000);
    } else if (range === 'thisMonth') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (range === 'lastMonth') {
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    }

    const [orders, products, users, wholesale] = await Promise.all([
      Order.find({ createdAt: { $gte: startDate } }).sort({ createdAt: -1 }).lean(),
      Product.find({ isActive: true }).populate('category', 'name').lean(),
      User.find({ role: { $ne: 'admin' }, createdAt: { $gte: startDate } }).lean(),
      WholesaleEnquiry.find({ createdAt: { $gte: startDate } }).lean(),
    ]);

    let totalRevenue = 0;
    let orderCount = orders.length;
    let paidOrdersCount = 0;

    orders.forEach((o) => {
      if (o.status !== 'cancelled' && (o.paymentStatus === 'paid' || o.status === 'delivered')) {
        totalRevenue += Number(o.total || 0);
        paidOrdersCount++;
      }
    });

    const averageOrderValue = paidOrdersCount > 0 ? Math.round(totalRevenue / paidOrdersCount) : 0;

    // Top products by order volume
    const productSalesMap = {};
    orders.forEach((o) => {
      (o.items || []).forEach((item) => {
        const pId = String(item.product || item.title);
        if (!productSalesMap[pId]) {
          productSalesMap[pId] = { title: item.title, units: 0, revenue: 0, image: item.image };
        }
        productSalesMap[pId].units += Number(item.quantity || 1);
        productSalesMap[pId].revenue += Number(item.price || 0) * Number(item.quantity || 1);
      });
    });

    const topSellingProducts = Object.values(productSalesMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 8);

    // Category breakdown
    const categoryMap = {};
    products.forEach((p) => {
      const catName = p.category?.name || 'General';
      if (!categoryMap[catName]) categoryMap[catName] = { count: 0, totalStock: 0 };
      categoryMap[catName].count++;
      categoryMap[catName].totalStock += Number(p.stock || 0);
    });

    res.json({
      range: range || '30days',
      sales: {
        totalRevenue,
        orderCount,
        paidOrdersCount,
        averageOrderValue,
      },
      customers: {
        newCustomersCount: users.length,
      },
      wholesale: {
        enquiriesCount: wholesale.length,
        approvedCount: wholesale.filter((w) => w.status === 'approved').length,
      },
      topSellingProducts,
      categoryDistribution: categoryMap,
    });
  } catch (err) {
    console.error('[Admin Reports API]', err);
    res.status(500).json({ message: 'Failed to generate reports' });
  }
});

// Admin Wholesale management
router.get('/wholesale', async (req, res) => {
  try {
    const enquiries = await WholesaleEnquiry.find().sort({ createdAt: -1 });

    const metrics = {
      total: enquiries.length,
      pending: enquiries.filter((e) => e.status === 'pending').length,
      approved: enquiries.filter((e) => e.status === 'approved').length,
      rejected: enquiries.filter((e) => e.status === 'rejected').length,
    };

    res.json({ metrics, applications: enquiries });
  } catch (err) {
    console.error('[Admin Wholesale API]', err);
    res.status(500).json({ message: 'Failed to fetch wholesale applications' });
  }
});

// Update wholesale status
router.patch('/wholesale/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await WholesaleEnquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!enquiry) return res.status(404).json({ message: 'Application not found' });

    broadcastAdminEvent('wholesale_updated', {
      id: enquiry._id,
      company: enquiry.companyName,
      status: enquiry.status,
    });

    res.json({ ok: true, enquiry });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update application' });
  }
});

export default router;

