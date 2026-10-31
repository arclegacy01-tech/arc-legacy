import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import BrandLogo from '../BrandLogo.jsx';
import { AdminIcon } from './AdminIcons.jsx';

const PRODUCTS_SUBLINKS = [
  { to: '/admin/products', label: 'All Products', end: true },
  { to: '/admin/products/new', label: 'Add New Product' },
  { to: '/admin/products/categories', label: 'Categories' },
  { to: '/admin/products/variations', label: 'Manage Variations' },
  { to: '/admin/products/bulk-upload', label: 'Bulk Upload (Excel)' },
  { to: '/admin/products/inventory', label: 'Inventory / Stock' },
  { to: '/admin/products/reviews', label: 'Product Reviews' },
];

const ORDERS_SUBLINKS = [
  { to: '/admin/orders', label: 'All Orders', end: true },
  { to: '/admin/orders/pending', label: 'Pending Orders' },
  { to: '/admin/orders/processing', label: 'Processing Orders' },
  { to: '/admin/orders/shipped', label: 'Shipped Orders' },
  { to: '/admin/orders/delivered', label: 'Delivered Orders' },
  { to: '/admin/orders/cancelled', label: 'Cancelled Orders' },
  { to: '/admin/orders/returns', label: 'Return & Refunds' },
];

const CUSTOMERS_SUBLINKS = [
  { to: '/admin/customers', label: 'All Customers', end: true },
  { to: '/admin/customers/groups', label: 'Customer Groups' },
  { to: '/admin/customers/reviews', label: 'Customer Reviews' },
  { to: '/admin/customers/email-marketing', label: 'Email Marketing' },
  { to: '/admin/customers/loyalty', label: 'Loyalty & Rewards' },
];

const WHOLESALE_SUBLINKS = [
  { to: '/admin/wholesale', label: 'Overview', end: true },
  { to: '/admin/wholesale/customers', label: 'Wholesale Customers' },
  { to: '/admin/wholesale/bulk-orders', label: 'Bulk Orders' },
  { to: '/admin/wholesale/price-lists', label: 'Price Lists' },
  { to: '/admin/wholesale/product-catalog', label: 'Product Catalog' },
  { to: '/admin/wholesale/quotations', label: 'Quotations' },
  { to: '/admin/wholesale/applications', label: 'Applications' },
  { to: '/admin/wholesale/credit', label: 'Credit & Payments' },
  { to: '/admin/wholesale/reports', label: 'Reports' },
];

const CONTENT_SUBLINKS = [
  { to: '/admin/content/banners', label: 'Banners' },
  { to: '/admin/content/homepage', label: 'Collection Pages' },
  { to: '/admin/content/blogs', label: 'Blogs & Articles' },
  { to: '/admin/content/announcements', label: 'Announcements' },
  { to: '/admin/content/faqs', label: 'FAQs' },
  { to: '/admin/media', label: 'Media Library' },
];

const REPORTS_SUBLINKS = [
  { to: '/admin/reports/sales', label: 'Sales Reports' },
  { to: '/admin/reports/products', label: 'Product Reports' },
  { to: '/admin/reports/customers', label: 'Customer Reports' },
  { to: '/admin/reports/marketing', label: 'Marketing Reports' },
  { to: '/admin/reports/inventory', label: 'Inventory Reports' },
  { to: '/admin/reports/export', label: 'Export Reports' },
];

export default function AdminLayout() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isProductsSection = pathname.startsWith('/admin/products');
  const isOrdersSection = pathname.startsWith('/admin/orders');
  const isCustomersSection = pathname.startsWith('/admin/customers');
  const isContentSection = pathname.startsWith('/admin/content') || pathname.startsWith('/admin/media');
  const isWholesaleSection = pathname.startsWith('/admin/wholesale');
  const isReportsSection = pathname.startsWith('/admin/reports');

  const [productsOpen, setProductsOpen] = useState(isProductsSection);
  const [ordersOpen, setOrdersOpen] = useState(isOrdersSection);
  const [customersOpen, setCustomersOpen] = useState(isCustomersSection);
  const [wholesaleOpen, setWholesaleOpen] = useState(!isProductsSection && !isOrdersSection && !isCustomersSection && !isReportsSection);
  const [contentOpen, setContentOpen] = useState(!isProductsSection && !isOrdersSection && !isCustomersSection && !isReportsSection);
  const [reportsOpen, setReportsOpen] = useState(isReportsSection);
  const [globalSearch, setGlobalSearch] = useState('');

  useEffect(() => {
    setGlobalSearch('');
    if (pathname.startsWith('/admin/products')) {
      setProductsOpen(true);
      setOrdersOpen(false);
      setCustomersOpen(false);
      setWholesaleOpen(false);
      setContentOpen(false);
      setReportsOpen(false);
    } else if (pathname.startsWith('/admin/orders')) {
      setOrdersOpen(true);
      setProductsOpen(false);
      setCustomersOpen(false);
      setWholesaleOpen(false);
      setContentOpen(false);
      setReportsOpen(false);
    } else if (pathname.startsWith('/admin/customers')) {
      setCustomersOpen(true);
      setProductsOpen(false);
      setOrdersOpen(false);
      setWholesaleOpen(false);
      setContentOpen(false);
      setReportsOpen(false);
    } else if (pathname.startsWith('/admin/reports')) {
      setReportsOpen(true);
      setProductsOpen(false);
      setOrdersOpen(false);
      setCustomersOpen(false);
      setWholesaleOpen(false);
      setContentOpen(false);
    } else if (pathname.startsWith('/admin/content') || pathname.startsWith('/admin/media')) {
      setContentOpen(true);
      setWholesaleOpen(true);
      setProductsOpen(false);
      setOrdersOpen(false);
      setCustomersOpen(false);
      setReportsOpen(false);
    } else if (pathname.startsWith('/admin/wholesale')) {
      setWholesaleOpen(true);
      setProductsOpen(false);
      setOrdersOpen(false);
      setCustomersOpen(false);
      setReportsOpen(false);
    }
  }, [pathname]);

  const searchPlaceholder = pathname.includes('/wholesale/applications')
    ? 'Search wholesale applications by name, company, email, GST, or phone...'
    : pathname.includes('/wholesale/bulk-orders')
      ? 'Search bulk orders by order ID, customer name, company, or product...'
      : pathname.includes('/wholesale/credit')
        ? 'Search customers, invoices, payments, order ID, or reference number...'
        : pathname.includes('/wholesale/price-lists')
          ? 'Search price lists by name, customer group, product, or SKU...'
          : pathname.includes('/wholesale/product-catalog')
            ? 'Search wholesale products by name, SKU, category, or price...'
            : pathname.includes('/wholesale/quotations')
              ? 'Search quotations by quote ID, customer name, company, or status...'
              : pathname.includes('/wholesale/reports')
                ? 'Search reports, customers, orders, products, or date range...'
                : pathname.includes('/wholesale/customers')
                  ? 'Search wholesale customers by name, company, GST, email...'
                  : pathname.startsWith('/admin/wholesale')
                    ? 'Search wholesale customers, orders, products, or applications...'
          : pathname.includes('/reports/marketing')
            ? 'Search campaigns, ads, channels, or keywords...'
    : pathname.includes('/reports/products')
      ? 'Search products, SKU, category, or brand...'
      : pathname.includes('/reports/customers')
        ? 'Search customers by name, email, phone, or location...'
        : pathname.includes('/reports/export')
          ? 'Search reports, products, orders, customers...'
          : pathname.includes('/reports/inventory')
            ? 'Search products, SKU, categories, or inventory...'
            : pathname.startsWith('/admin/reports')
              ? 'Search reports, sales, orders, products, or customers...'
          : pathname.includes('/products/categories')
    ? 'Search categories by name...'
    : pathname.includes('/products/inventory')
      ? 'Search products, SKUs, orders, customers...'
      : pathname.includes('/products/variations')
        ? 'Search products, orders, customers...'
        : pathname.includes('/products/reviews')
          ? 'Search products, orders, customers, reviews...'
          : pathname.startsWith('/admin/products')
            ? 'Search products, SKU, categories...'
      : pathname.includes('/orders/delivered')
        ? 'Search orders, customer name, order ID, product, tracking ID...'
    : pathname.includes('/orders/processing')
      ? 'Search orders, customer name, order ID, product, SKU...'
      : pathname.includes('/orders/shipped')
        ? 'Search orders, customer name, order ID, tracking ID...'
        : pathname.includes('/orders/returns')
          ? 'Search orders, customer name, order ID, product, return reason...'
          : pathname.startsWith('/admin/orders')
            ? 'Search orders, customers, products, order ID...'
      : pathname.includes('/customers/groups')
        ? 'Search customers, groups, email, or group ID...'
        : pathname.includes('/customers/reviews')
          ? 'Search reviews, customer name, product name, or order ID...'
          : pathname.includes('/customers/email-marketing')
            ? 'Search campaigns, emails, subscribers, or templates...'
            : pathname.includes('/customers/loyalty')
              ? 'Search loyalty groups, customers, points, rewards...'
              : pathname.startsWith('/admin/customers')
                ? 'Search customers by name, email, phone number, or order ID...'
                : pathname.includes('/announcements')
                  ? 'Search announcements by title, content, type, or status...'
                  : pathname.includes('/blogs')
                    ? 'Search blogs, articles, tags, or keywords...'
                    : pathname.includes('/faqs')
                      ? 'Search FAQs by question, keyword, category, or status...'
                      : pathname.includes('/homepage')
                        ? 'Search collections by name, handle, products, or status...'
                        : pathname.includes('/media')
                          ? 'Search images, videos, documents by name, tags, or type...'
                          : 'Search content by title, type, product, category, or status...';

  const promoSubtext = isProductsSection
    ? 'Track sales, manage products and reach more customers.'
    : isOrdersSection
      ? 'Track sales, manage products and reach more customers.'
      : isCustomersSection
        ? 'Track sales, manage customers and reach more customers.'
      : pathname.includes('/announcements')
        ? 'Keep your wholesale customers updated with important news.'
        : pathname.includes('/blogs')
          ? 'Create engaging content to educate and attract wholesale customers.'
          : pathname.includes('/faqs')
            ? 'Create helpful content to support your wholesale customers.'
            : pathname.includes('/homepage')
              ? 'Create beautiful collection pages to showcase your wholesale range.'
              : pathname.includes('/media')
                ? 'Organize and manage your media files easily for better content.'
                : 'Create engaging wholesale content to inform and attract customers.';

  const handleProductsHeaderClick = () => {
    if (!isProductsSection) {
      setProductsOpen(true);
      navigate('/admin/products');
    } else {
      setProductsOpen((v) => !v);
    }
  };

  const handleOrdersHeaderClick = () => {
    if (!isOrdersSection) {
      setOrdersOpen(true);
      navigate('/admin/orders');
    } else {
      setOrdersOpen((v) => !v);
    }
  };

  const handleCustomersHeaderClick = () => {
    if (!isCustomersSection) {
      setCustomersOpen(true);
      navigate('/admin/customers');
    } else {
      setCustomersOpen((v) => !v);
    }
  };

  const handleWholesaleHeaderClick = () => {
    if (!isWholesaleSection && !isContentSection) {
      setWholesaleOpen(true);
      navigate('/admin/wholesale');
    } else {
      setWholesaleOpen((v) => !v);
    }
  };

  const handleReportsHeaderClick = () => {
    if (!isReportsSection) {
      setReportsOpen(true);
      navigate('/admin/reports');
    } else {
      setReportsOpen((v) => !v);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FDF8F6] text-[#1E3A5F]">
      {/* Left Admin Sidebar */}
      <aside className="flex w-[248px] shrink-0 flex-col justify-between border-r border-[#F0DFE2] bg-[#FAF0EE] px-3.5 py-5">
        <div>
          {/* Brand Logo */}
          <div className="mb-5 flex justify-center">
            <BrandLogo to="/admin" size="admin" />
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1 text-xs">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-medium transition ${
                  isActive
                    ? 'bg-[#F5DCE0] font-semibold text-[#B01634]'
                    : 'text-[#1E3A5F] hover:bg-[#F5E4E6]'
                }`
              }
            >
              <span className="text-[#B01634]">
                <AdminIcon name="dashboard" className="h-4 w-4" />
              </span>
              <span>Dashboard</span>
            </NavLink>

            {/* Collapsible Products Section */}
            <div className="pt-0.5">
              <button
                type="button"
                onClick={handleProductsHeaderClick}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 font-semibold transition cursor-pointer ${
                  isProductsSection
                    ? 'bg-gradient-to-r from-[#8E1428] to-[#C2183B] text-white shadow-sm'
                    : 'text-[#1E3A5F] hover:bg-[#F5E4E6]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={isProductsSection ? 'text-white' : 'text-[#B01634]'}>
                    <AdminIcon name="products" className="h-4 w-4" />
                  </span>
                  <span>Products</span>
                </span>
                <AdminIcon
                  name="chevron-down"
                  className={`h-3.5 w-3.5 transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {productsOpen && (
                <div className="ml-5 mt-1 space-y-0.5 border-l border-[#E6CFD3] pl-3">
                  {PRODUCTS_SUBLINKS.map((sub) => (
                    <NavLink
                      key={sub.to + sub.label}
                      to={sub.to}
                      end={sub.end}
                      className={({ isActive }) =>
                        `block rounded-lg px-2.5 py-1.5 text-[11px] transition ${
                          isActive
                            ? 'bg-[#F6DCE0] font-semibold text-[#B01634]'
                            : 'font-medium text-[#2A476E] hover:bg-[#F5E4E6] hover:text-[#B01634]'
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Collapsible Orders Section */}
            <div className="pt-0.5">
              <button
                type="button"
                onClick={handleOrdersHeaderClick}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 font-semibold transition cursor-pointer ${
                  isOrdersSection
                    ? 'bg-gradient-to-r from-[#8E1428] to-[#C2183B] text-white shadow-sm'
                    : 'text-[#1E3A5F] hover:bg-[#F5E4E6]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={isOrdersSection ? 'text-white' : 'text-[#B01634]'}>
                    <AdminIcon name="orders" className="h-4 w-4" />
                  </span>
                  <span>Orders</span>
                </span>
                <AdminIcon
                  name="chevron-down"
                  className={`h-3.5 w-3.5 transition-transform ${ordersOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {ordersOpen && (
                <div className="ml-5 mt-1 space-y-0.5 border-l border-[#E6CFD3] pl-3">
                  {ORDERS_SUBLINKS.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      end={sub.end}
                      className={({ isActive }) =>
                        `block rounded-lg px-2.5 py-1.5 text-[11px] transition ${
                          isActive
                            ? 'bg-[#F6DCE0] font-semibold text-[#B01634]'
                            : 'font-medium text-[#2A476E] hover:bg-[#F5E4E6] hover:text-[#B01634]'
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Collapsible Customers Section */}
            <div className="pt-0.5">
              <button
                type="button"
                onClick={handleCustomersHeaderClick}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 font-semibold transition cursor-pointer ${
                  isCustomersSection
                    ? 'bg-gradient-to-r from-[#8E1428] to-[#C2183B] text-white shadow-sm'
                    : 'text-[#1E3A5F] hover:bg-[#F5E4E6]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={isCustomersSection ? 'text-white' : 'text-[#B01634]'}>
                    <AdminIcon name="customers" className="h-4 w-4" />
                  </span>
                  <span>Customers</span>
                </span>
                <AdminIcon
                  name="chevron-down"
                  className={`h-3.5 w-3.5 transition-transform ${customersOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {customersOpen && (
                <div className="ml-5 mt-1 space-y-0.5 border-l border-[#E6CFD3] pl-3">
                  {CUSTOMERS_SUBLINKS.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      end={sub.end}
                      className={({ isActive }) =>
                        `block rounded-lg px-2.5 py-1.5 text-[11px] transition ${
                          isActive
                            ? 'bg-[#F6DCE0] font-semibold text-[#B01634]'
                            : 'font-medium text-[#2A476E] hover:bg-[#F5E4E6] hover:text-[#B01634]'
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Collapsible Wholesale Section */}
            <div className="pt-0.5">
              <button
                type="button"
                onClick={handleWholesaleHeaderClick}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 font-semibold transition cursor-pointer ${
                  !isOrdersSection && !isCustomersSection && (isWholesaleSection || isContentSection)
                    ? 'bg-gradient-to-r from-[#8E1428] to-[#C2183B] text-white shadow-sm'
                    : 'text-[#1E3A5F] hover:bg-[#F5E4E6]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={
                      !isOrdersSection && !isCustomersSection && (isWholesaleSection || isContentSection)
                        ? 'text-white'
                        : 'text-[#B01634]'
                    }
                  >
                    <AdminIcon name="wholesale" className="h-4 w-4" />
                  </span>
                  <span>Wholesale</span>
                </span>
                <AdminIcon
                  name="chevron-down"
                  className={`h-3.5 w-3.5 transition-transform ${wholesaleOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {wholesaleOpen && (
                <div className="ml-5 mt-1.5 space-y-0.5 border-l border-[#E6CFD3] pl-3">
                  {WHOLESALE_SUBLINKS.map((sub) => (
                    <NavLink
                      key={sub.to + sub.label}
                      to={sub.to}
                      end={sub.end}
                      className={({ isActive }) =>
                        `block rounded-lg px-2.5 py-1.5 text-[11px] transition ${
                          isActive
                            ? 'bg-[#F6DCE0] font-semibold text-[#B01634]'
                            : 'font-medium text-[#2A476E] hover:bg-[#F5E4E6] hover:text-[#B01634]'
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/admin/customers/loyalty"
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-medium text-[#1E3A5F] transition hover:bg-[#F5E4E6]"
            >
              <span className="text-[#B01634]">
                <AdminIcon name="coupons" className="h-4 w-4" />
              </span>
              <span>Coupons & Offers</span>
            </Link>

            {/* Collapsible Content Section */}
            <div>
              <div className="flex items-center justify-between rounded-xl px-3.5 py-2.5 font-medium text-[#1E3A5F] hover:bg-[#F5E4E6]">
                <Link to="/admin/content" className="flex flex-1 items-center gap-3">
                  <span className="text-[#B01634]">
                    <AdminIcon name="content" className="h-4 w-4" />
                  </span>
                  <span>Content</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setContentOpen((v) => !v)}
                  className="text-neutral-400 cursor-pointer p-0.5"
                  aria-label="Toggle Content Menu"
                >
                  <AdminIcon
                    name="chevron-down"
                    className={`h-3.5 w-3.5 transition-transform ${contentOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              {contentOpen && (
                <div className="ml-5 mt-1 space-y-0.5 border-l border-[#E6CFD3] pl-3">
                  {CONTENT_SUBLINKS.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      className={({ isActive }) =>
                        `block rounded-lg px-2.5 py-1.5 text-[11px] transition ${
                          isActive
                            ? 'bg-[#F6DCE0] font-semibold text-[#B01634]'
                            : 'font-medium text-[#2A476E] hover:bg-[#F5E4E6] hover:text-[#B01634]'
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/admin/content/homepage"
              className="flex items-center justify-between rounded-xl px-3.5 py-2.5 font-medium text-[#1E3A5F] transition hover:bg-[#F5E4E6]"
            >
              <span className="flex items-center gap-3">
                <span className="text-[#B01634]">
                  <AdminIcon name="design" className="h-4 w-4" />
                </span>
                <span>Website Design</span>
              </span>
              <AdminIcon name="chevron-down" className="h-3.5 w-3.5 text-neutral-400" />
            </Link>

            {/* Collapsible Reports Section */}
            <div className="pt-0.5">
              <button
                type="button"
                onClick={handleReportsHeaderClick}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 font-semibold transition cursor-pointer ${
                  isReportsSection
                    ? 'bg-gradient-to-r from-[#8E1428] to-[#C2183B] text-white shadow-sm'
                    : 'text-[#1E3A5F] hover:bg-[#F5E4E6]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={isReportsSection ? 'text-white' : 'text-[#B01634]'}>
                    <AdminIcon name="reports" className="h-4 w-4" />
                  </span>
                  <span>Reports</span>
                </span>
                <AdminIcon
                  name="chevron-down"
                  className={`h-3.5 w-3.5 transition-transform ${reportsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {reportsOpen && (
                <div className="ml-5 mt-1 space-y-0.5 border-l border-[#E6CFD3] pl-3">
                  {REPORTS_SUBLINKS.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      className={({ isActive }) =>
                        `block rounded-lg px-2.5 py-1.5 text-[11px] transition ${
                          isActive
                            ? 'bg-[#F6DCE0] font-semibold text-[#B01634]'
                            : 'font-medium text-[#2A476E] hover:bg-[#F5E4E6] hover:text-[#B01634]'
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/admin/content/messages"
              className="flex items-center justify-between rounded-xl px-3.5 py-2.5 font-medium text-[#1E3A5F] transition hover:bg-[#F5E4E6]"
            >
              <span className="flex items-center gap-3">
                <span className="text-[#B01634]">
                  <AdminIcon name="settings" className="h-4 w-4" />
                </span>
                <span>Settings</span>
              </span>
              <AdminIcon name="chevron-down" className="h-3.5 w-3.5 text-neutral-400" />
            </Link>

            <Link
              to="/admin/customers/email-marketing"
              className="flex items-center justify-between rounded-xl px-3.5 py-2.5 font-medium text-[#1E3A5F] transition hover:bg-[#F5E4E6]"
            >
              <span className="flex items-center gap-3">
                <span className="text-[#B01634]">
                  <AdminIcon name="megaphone" className="h-4 w-4" />
                </span>
                <span>Marketing</span>
              </span>
              <AdminIcon name="chevron-down" className="h-3.5 w-3.5 text-neutral-400" />
            </Link>

            <Link
              to="/admin/content/faqs"
              className="flex items-center justify-between rounded-xl px-3.5 py-2.5 font-medium text-[#1E3A5F] transition hover:bg-[#F5E4E6]"
            >
              <span className="flex items-center gap-3">
                <span className="text-[#B01634]">
                  <AdminIcon name="support" className="h-4 w-4" />
                </span>
                <span>Support / Help</span>
              </span>
              <AdminIcon name="chevron-down" className="h-3.5 w-3.5 text-neutral-400" />
            </Link>
          </nav>
        </div>

        {/* Bottom Grow Your Business Card */}
        <div className="mt-6 rounded-2xl border border-[#F0D5D9] bg-[#FDF5F3] p-4 text-center shadow-2xs">
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#FEF3C7] text-[#D97706]">
            <AdminIcon name="crown" className="h-4 w-4" />
          </div>
          <h4 className="mt-2 font-serif text-sm font-bold text-[#8E1428]">Grow Your Business</h4>
          <p className="mt-1 text-[10px] leading-relaxed text-[#475569]">{promoSubtext}</p>
          <button
            type="button"
            className="mt-3 w-full rounded-lg bg-gradient-to-r from-[#8E1428] to-[#C81E45] py-2 text-[11px] font-semibold text-white shadow-sm transition hover:opacity-95 cursor-pointer"
          >
            Upgrade Plan →
          </button>
        </div>
      </aside>

      {/* Main Right Workspace */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Bar */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EFE3E4] bg-[#FDF9F8] px-6 py-3">
          {/* Global Search Input */}
          <div className="flex w-full max-w-md items-center gap-2.5 rounded-xl border border-[#EAE2E0] bg-[#F4F1F0] px-3.5 py-2">
            <AdminIcon name="search" className="h-4 w-4 text-[#2A476E]" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-xs text-[#1E3A5F] placeholder:text-[#64748B] focus:outline-none"
            />
          </div>

          {/* Right Utilities */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-[#E5B8C2] bg-[#FCEEEF] px-4 py-2 text-xs font-semibold text-[#B01634] transition hover:bg-[#F8DCE0]"
            >
              <AdminIcon name="eye" className="h-4 w-4" />
              <span>View Store</span>
            </Link>

            <Link
              to="/admin/content/announcements"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#1E3A5F] hover:bg-[#F5E4E6]"
              aria-label="Notifications"
            >
              <AdminIcon name="bell" className="h-5 w-5" />
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C81E45] text-[9px] font-bold text-white">
                5
              </span>
            </Link>

            <div className="flex items-center gap-2.5 pl-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D84367] text-xs font-bold text-white">
                AS
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold leading-tight text-[#1E3A5F]">
                  {user?.name || 'Admin'}
                </p>
                <p className="text-[10px] text-[#64748B]">ARC LEGACY</p>
              </div>
              <AdminIcon name="chevron-down" className="h-3.5 w-3.5 text-[#64748B]" />
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 overflow-x-hidden p-6">
          <Outlet context={{ globalSearch, setGlobalSearch }} />
        </main>
      </div>
    </div>
  );
}
