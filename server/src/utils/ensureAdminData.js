import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';
import { Order } from '../models/Order.js';
import { WholesaleEnquiry } from '../models/WholesaleEnquiry.js';

const BASELINE_CUSTOMERS = [
  { name: 'Pooja Shah', email: 'pooja.shah@example.com', phone: '+91 98765 43210', city: 'Mumbai', state: 'Maharashtra', group: 'Wholesale' },
  { name: 'Neha Patel', email: 'neha.patel@example.com', phone: '+91 98765 43211', city: 'Surat', state: 'Gujarat', group: 'Retail' },
  { name: 'Riya Mehta', email: 'riya.mehta@example.com', phone: '+91 98765 43212', city: 'Ahmedabad', state: 'Gujarat', group: 'B2B Partners' },
  { name: 'Aarti Desai', email: 'aarti.desai@example.com', phone: '+91 98765 43213', city: 'Jaipur', state: 'Rajasthan', group: 'Retail' },
  { name: 'Kunal Jain', email: 'kunal.jain@example.com', phone: '+91 98765 43214', city: 'Delhi', state: 'Delhi', group: 'Wholesale' },
  { name: 'Sneha Patel', email: 'sneha.patel@example.com', phone: '+91 98765 43215', city: 'Vadodara', state: 'Gujarat', group: 'Resellers' },
  { name: 'Mehul Trivedi', email: 'mehul.trivedi@example.com', phone: '+91 98765 43216', city: 'Rajkot', state: 'Gujarat', group: 'Retail' },
  { name: 'Pooja Kulkarni', email: 'pooja.kulkarni@example.com', phone: '+91 98765 43217', city: 'Pune', state: 'Maharashtra', group: 'Wholesale' },
  { name: 'Rohan Sharma', email: 'rohan.sharma@example.com', phone: '+91 98765 43218', city: 'Indore', state: 'Madhya Pradesh', group: 'Retail' },
  { name: 'Vidhi Dave', email: 'vidhi.dave@example.com', phone: '+91 98765 43219', city: 'Bhavnagar', state: 'Gujarat', group: 'Wholesale' },
];

const BASELINE_WHOLESALE = [
  { companyName: 'Shree Textiles', contactName: 'Ramesh Patel', email: 'ramesh@shreetextiles.in', phone: '+91 98765 43210', businessType: 'Retailer', gstNumber: '24ABCS1234F1Z5', status: 'pending', city: 'Surat', state: 'Gujarat', annualTurnover: '₹50L - ₹1Cr', orderVolumeExpected: '500+ meters/month' },
  { companyName: 'Kavya Fashion', contactName: 'Priya Shah', email: 'priya@kavyafashion.in', phone: '+91 87654 32109', businessType: 'Boutique', gstNumber: '27AAKFK5678L1Z3', status: 'approved', city: 'Mumbai', state: 'Maharashtra', annualTurnover: '₹1Cr+', orderVolumeExpected: '1000+ meters/month' },
  { companyName: 'Milan Creations', contactName: 'Amit Desai', email: 'amit@milancreations.in', phone: '+91 98765 43211', businessType: 'Manufacturer', gstNumber: '24MCDS9087K1Z8', status: 'pending', city: 'Ahmedabad', state: 'Gujarat', annualTurnover: '₹25L - ₹50L', orderVolumeExpected: '300+ meters/month' },
  { companyName: 'Raj Laces Hub', contactName: 'Neha Trivedi', email: 'neha@rajlaces.in', phone: '+91 87654 32122', businessType: 'Distributor', gstNumber: '27RULH4456P1Z1', status: 'approved', city: 'Nagpur', state: 'Maharashtra', annualTurnover: '₹2Cr+', orderVolumeExpected: '2000+ meters/month' },
  { companyName: 'Fashion Mart', contactName: 'Kunal Jain', email: 'kunal@fashionmart.in', phone: '+91 98765 43213', businessType: 'Retailer', gstNumber: '24FJM1133Q1Z7', status: 'pending', city: 'Delhi', state: 'Delhi', annualTurnover: '₹50L - ₹1Cr', orderVolumeExpected: '400+ meters/month' },
  { companyName: 'Dev Textile Store', contactName: 'Sneha Mehta', email: 'sneha@devtextile.in', phone: '+91 87654 32133', businessType: 'Reseller', gstNumber: '24DTS9987A1Z6', status: 'rejected', city: 'Rajkot', state: 'Gujarat', annualTurnover: 'Under ₹25L', orderVolumeExpected: '50+ meters/month' },
  { companyName: 'Gujarat Lace House', contactName: 'Viren Patel', email: 'viren@gujaratlaces.in', phone: '+91 98765 43214', businessType: 'Wholesaler', gstNumber: '24GLH7721B1Z2', status: 'approved', city: 'Vadodara', state: 'Gujarat', annualTurnover: '₹1Cr+', orderVolumeExpected: '1200+ meters/month' },
];

export async function ensureAdminBaselineData() {
  try {
    // 1. Ensure baseline customers
    const userCount = await User.countDocuments({ role: { $ne: 'admin' } });
    const userMap = {};

    if (userCount < 5) {
      const defaultPasswordHash = await bcrypt.hash('Customer@123', 10);
      for (const cust of BASELINE_CUSTOMERS) {
        let existing = await User.findOne({ email: cust.email });
        if (!existing) {
          existing = await User.create({
            name: cust.name,
            email: cust.email,
            password: defaultPasswordHash,
            phone: cust.phone,
            role: 'customer',
            addresses: [
              {
                fullName: cust.name,
                phone: cust.phone,
                line1: '101 Textile Market Road',
                city: cust.city,
                state: cust.state,
                pincode: '395002',
                isDefault: true,
              },
            ],
          });
        }
        userMap[cust.name] = existing;
      }
    } else {
      const allUsers = await User.find({ role: { $ne: 'admin' } });
      allUsers.forEach((u) => {
        userMap[u.name] = u;
      });
    }

    // 2. Ensure baseline orders
    const orderCount = await Order.countDocuments();
    if (orderCount < 5) {
      const products = await Product.find({ isActive: true }).limit(10);
      if (products.length > 0) {
        const orderSpecs = [
          { orderNumber: '1028', customerName: 'Pooja Shah', customerEmail: 'pooja.shah@example.com', customerPhone: '+91 98765 43210', itemsCount: 3, total: 1240, paymentMethod: 'paid', paymentStatus: 'paid', status: 'processing', createdAt: new Date(Date.now() - 2 * 3600000) },
          { orderNumber: '1027', customerName: 'Neha Patel', customerEmail: 'neha.patel@example.com', customerPhone: '+91 98765 43211', itemsCount: 5, total: 2580, paymentMethod: 'paid', paymentStatus: 'paid', status: 'shipped', createdAt: new Date(Date.now() - 5 * 3600000) },
          { orderNumber: '1026', customerName: 'Riya Mehta', customerEmail: 'riya.mehta@example.com', customerPhone: '+91 98765 43212', itemsCount: 2, total: 980, paymentMethod: 'cod', paymentStatus: 'pending', status: 'pending', createdAt: new Date(Date.now() - 7 * 3600000) },
          { orderNumber: '1025', customerName: 'Aarti Desai', customerEmail: 'aarti.desai@example.com', customerPhone: '+91 98765 43213', itemsCount: 4, total: 1860, paymentMethod: 'paid', paymentStatus: 'paid', status: 'delivered', createdAt: new Date(Date.now() - 16 * 3600000) },
          { orderNumber: '1024', customerName: 'Kunal Jain', customerEmail: 'kunal.jain@example.com', customerPhone: '+91 98765 43214', itemsCount: 1, total: 650, paymentMethod: 'paid', paymentStatus: 'paid', status: 'shipped', createdAt: new Date(Date.now() - 18 * 3600000) },
          { orderNumber: '1023', customerName: 'Sneha Patel', customerEmail: 'sneha.patel@example.com', customerPhone: '+91 98765 43215', itemsCount: 6, total: 3120, paymentMethod: 'cod', paymentStatus: 'pending', status: 'pending', createdAt: new Date(Date.now() - 24 * 3600000) },
          { orderNumber: '1022', customerName: 'Mehul Trivedi', customerEmail: 'mehul.trivedi@example.com', customerPhone: '+91 98765 43216', itemsCount: 2, total: 1199, paymentMethod: 'cod', paymentStatus: 'pending', status: 'shipped', createdAt: new Date(Date.now() - 28 * 3600000) },
          { orderNumber: '1021', customerName: 'Pooja Kulkarni', customerEmail: 'pooja.kulkarni@example.com', customerPhone: '+91 98765 43217', itemsCount: 4, total: 2450, paymentMethod: 'paid', paymentStatus: 'paid', status: 'delivered', createdAt: new Date(Date.now() - 48 * 3600000) },
          { orderNumber: '1020', customerName: 'Rohan Sharma', customerEmail: 'rohan.sharma@example.com', customerPhone: '+91 98765 43218', itemsCount: 1, total: 899, paymentMethod: 'paid', paymentStatus: 'paid', status: 'cancelled', createdAt: new Date(Date.now() - 52 * 3600000) },
          { orderNumber: '1019', customerName: 'Vidhi Dave', customerEmail: 'vidhi.dave@example.com', customerPhone: '+91 98765 43219', itemsCount: 3, total: 1760, paymentMethod: 'paid', paymentStatus: 'paid', status: 'delivered', createdAt: new Date(Date.now() - 72 * 3600000) },
        ];

        for (const o of orderSpecs) {
          const existing = await Order.findOne({ orderNumber: o.orderNumber });
          if (!existing) {
            const items = products.slice(0, o.itemsCount).map((p) => ({
              product: p._id,
              title: p.title,
              image: p.images?.[0]?.url || '/images/product-1.jpg',
              unit: p.unit || 'meter',
              price: p.price || 180,
              quantity: 1,
            }));

            const matchedUser = userMap[o.customerName] || null;

            await Order.create({
              orderNumber: o.orderNumber,
              user: matchedUser ? matchedUser._id : undefined,
              customerName: o.customerName,
              customerEmail: o.customerEmail,
              customerPhone: o.customerPhone,
              items,
              subtotal: o.total,
              shipping: 0,
              total: o.total,
              paymentMethod: o.paymentMethod,
              paymentStatus: o.paymentStatus,
              status: o.status,
              shippingAddress: {
                fullName: o.customerName,
                phone: o.customerPhone,
                line1: '101 Fashion Hub',
                city: 'Surat',
                state: 'Gujarat',
                pincode: '395002',
              },
              createdAt: o.createdAt,
              updatedAt: o.createdAt,
            });
          }
        }
      }
    }

    // 3. Ensure baseline wholesale enquiries
    const wholesaleCount = await WholesaleEnquiry.countDocuments();
    if (wholesaleCount < 3) {
      for (const w of BASELINE_WHOLESALE) {
        const existing = await WholesaleEnquiry.findOne({ email: w.email });
        if (!existing) {
          await WholesaleEnquiry.create({
            ...w,
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 5 * 86400000)),
          });
        }
      }
    }
  } catch (err) {
    console.warn('[ensureAdminBaselineData] Notice:', err.message);
  }
}

