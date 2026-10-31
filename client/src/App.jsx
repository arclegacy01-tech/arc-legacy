import { Routes, Route } from 'react-router-dom';
import StoreLayout from './components/layout/StoreLayout.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import AccountLayout from './components/account/AccountLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import NewArrivalsPage from './pages/NewArrivalsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrderSuccessPage from './pages/OrderSuccessPage.jsx';
import TrackOrderPage from './pages/TrackOrderPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import OurStoryPage from './pages/OurStoryPage.jsx';
import PolicyPage from './pages/PolicyPage.jsx';
import WholesalePage from './pages/WholesalePage.jsx';
import AccountDashboardPage from './pages/account/AccountDashboardPage.jsx';
import MyOrdersPage from './pages/account/MyOrdersPage.jsx';
import OrderDetailPage from './pages/account/OrderDetailPage.jsx';
import WishlistPage from './pages/account/WishlistPage.jsx';
import AddressesPage from './pages/account/AddressesPage.jsx';
import AccountSettingsPage from './pages/account/AccountSettingsPage.jsx';
import NotificationsPage from './pages/account/NotificationsPage.jsx';
import HelpPage from './pages/account/HelpPage.jsx';
import LogoutPage from './pages/account/LogoutPage.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProductsPage from './pages/admin/AdminProductsPage.jsx';
import AdminProductFormPage from './pages/admin/AdminProductFormPage.jsx';
import AdminCategoriesPage from './pages/admin/products/AdminCategoriesPage.jsx';
import AdminInventoryPage from './pages/admin/products/AdminInventoryPage.jsx';
import AdminVariationsPage from './pages/admin/products/AdminVariationsPage.jsx';
import AdminProductReviewsPage from './pages/admin/products/AdminProductReviewsPage.jsx';
import AdminCustomerReportsPage from './pages/admin/reports/AdminCustomerReportsPage.jsx';
import AdminExportReportsPage from './pages/admin/reports/AdminExportReportsPage.jsx';
import AdminInventoryReportsPage from './pages/admin/reports/AdminInventoryReportsPage.jsx';
import AdminMarketingReportsPage from './pages/admin/reports/AdminMarketingReportsPage.jsx';
import AdminProductReportsPage from './pages/admin/reports/AdminProductReportsPage.jsx';
import AdminReportsOverviewPage from './pages/admin/reports/AdminReportsOverviewPage.jsx';
import AdminOrdersPage from './pages/admin/AdminOrdersPage.jsx';
import AdminPendingOrdersPage from './pages/admin/orders/AdminPendingOrdersPage.jsx';
import AdminProcessingOrdersPage from './pages/admin/orders/AdminProcessingOrdersPage.jsx';
import AdminShippedOrdersPage from './pages/admin/orders/AdminShippedOrdersPage.jsx';
import AdminDeliveredOrdersPage from './pages/admin/orders/AdminDeliveredOrdersPage.jsx';
import AdminCancelledOrdersPage from './pages/admin/orders/AdminCancelledOrdersPage.jsx';
import AdminReturnsPage from './pages/admin/orders/AdminReturnsPage.jsx';
import AdminContentHub from './pages/admin/cms/AdminContentHub.jsx';
import AdminBannersPage from './pages/admin/cms/AdminBannersPage.jsx';
import AdminAnnouncementsPage from './pages/admin/cms/AdminAnnouncementsPage.jsx';
import AdminFaqsPage from './pages/admin/cms/AdminFaqsPage.jsx';
import AdminHomepagePage from './pages/admin/cms/AdminHomepagePage.jsx';
import AdminBlogPage from './pages/admin/cms/AdminBlogPage.jsx';
import AdminContactMessagesPage from './pages/admin/cms/AdminContactMessagesPage.jsx';
import AdminWholesaleOverviewPage from './pages/admin/wholesale/AdminWholesaleOverviewPage.jsx';
import AdminWholesaleCustomersPage from './pages/admin/wholesale/AdminWholesaleCustomersPage.jsx';
import AdminBulkOrdersPage from './pages/admin/wholesale/AdminBulkOrdersPage.jsx';
import AdminPriceListsPage from './pages/admin/wholesale/AdminPriceListsPage.jsx';
import AdminWholesaleCatalogPage from './pages/admin/wholesale/AdminWholesaleCatalogPage.jsx';
import AdminQuotationsPage from './pages/admin/wholesale/AdminQuotationsPage.jsx';
import AdminWholesaleApplicationsPage from './pages/admin/wholesale/AdminWholesaleApplicationsPage.jsx';
import AdminCreditPaymentsPage from './pages/admin/wholesale/AdminCreditPaymentsPage.jsx';
import AdminWholesaleReportsPage from './pages/admin/wholesale/AdminWholesaleReportsPage.jsx';
import AdminMediaPage from './pages/admin/AdminMediaPage.jsx';
import AdminCustomersPage from './pages/admin/customers/AdminCustomersPage.jsx';
import AdminCustomerGroupsPage from './pages/admin/customers/AdminCustomerGroupsPage.jsx';
import AdminCustomerReviewsPage from './pages/admin/customers/AdminCustomerReviewsPage.jsx';
import AdminEmailMarketingPage from './pages/admin/customers/AdminEmailMarketingPage.jsx';
import AdminLoyaltyPage from './pages/admin/customers/AdminLoyaltyPage.jsx';
import BlogListPage from './pages/BlogListPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="category/:slug" element={<CategoryPage />} />
        <Route path="new-arrivals" element={<NewArrivalsPage />} />
        <Route path="product/:slug" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order-success" element={<OrderSuccessPage />} />
        <Route path="track-order" element={<TrackOrderPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="our-story" element={<OurStoryPage />} />
        <Route path="blog" element={<BlogListPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="policies/:slug" element={<PolicyPage />} />
        <Route path="wholesale" element={<WholesalePage />} />

        <Route element={<AccountLayout />}>
          <Route path="account" element={<AccountDashboardPage />} />
          <Route path="account/orders" element={<MyOrdersPage />} />
          <Route path="account/orders/:id" element={<OrderDetailPage />} />
          <Route path="account/addresses" element={<AddressesPage />} />
          <Route path="account/settings" element={<AccountSettingsPage />} />
          <Route path="account/notifications" element={<NotificationsPage />} />
          <Route path="account/help" element={<HelpPage />} />
          <Route path="account/logout" element={<LogoutPage />} />
        </Route>
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="products/new" element={<AdminProductFormPage />} />
        <Route path="products/:id/edit" element={<AdminProductFormPage />} />
        <Route path="products/categories" element={<AdminCategoriesPage />} />
        <Route path="products/variations" element={<AdminVariationsPage />} />
        <Route path="products/bulk-upload" element={<AdminProductsPage />} />
        <Route path="products/inventory" element={<AdminInventoryPage />} />
        <Route path="products/reviews" element={<AdminProductReviewsPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="orders/pending" element={<AdminPendingOrdersPage />} />
        <Route path="orders/processing" element={<AdminProcessingOrdersPage />} />
        <Route path="orders/shipped" element={<AdminShippedOrdersPage />} />
        <Route path="orders/delivered" element={<AdminDeliveredOrdersPage />} />
        <Route path="orders/cancelled" element={<AdminCancelledOrdersPage />} />
        <Route path="orders/returns" element={<AdminReturnsPage />} />
        <Route path="customers" element={<AdminCustomersPage />} />
        <Route path="customers/groups" element={<AdminCustomerGroupsPage />} />
        <Route path="customers/reviews" element={<AdminCustomerReviewsPage />} />
        <Route path="customers/email-marketing" element={<AdminEmailMarketingPage />} />
        <Route path="customers/loyalty" element={<AdminLoyaltyPage />} />
        <Route path="content" element={<AdminContentHub />} />
        <Route path="content/banners" element={<AdminBannersPage />} />
        <Route path="content/announcements" element={<AdminAnnouncementsPage />} />
        <Route path="content/faqs" element={<AdminFaqsPage />} />
        <Route path="content/homepage" element={<AdminHomepagePage />} />
        <Route path="content/blogs" element={<AdminBlogPage />} />
        <Route path="content/messages" element={<AdminContactMessagesPage />} />
        <Route path="wholesale" element={<AdminWholesaleOverviewPage />} />
        <Route path="wholesale/overview" element={<AdminWholesaleOverviewPage />} />
        <Route path="wholesale/customers" element={<AdminWholesaleCustomersPage />} />
        <Route path="wholesale/bulk-orders" element={<AdminBulkOrdersPage />} />
        <Route path="wholesale/price-lists" element={<AdminPriceListsPage />} />
        <Route path="wholesale/product-catalog" element={<AdminWholesaleCatalogPage />} />
        <Route path="wholesale/quotations" element={<AdminQuotationsPage />} />
        <Route path="wholesale/applications" element={<AdminWholesaleApplicationsPage />} />
        <Route path="wholesale/credit" element={<AdminCreditPaymentsPage />} />
        <Route path="wholesale/reports" element={<AdminWholesaleReportsPage />} />
        <Route path="media" element={<AdminMediaPage />} />
        <Route path="reports" element={<AdminReportsOverviewPage />} />
        <Route path="reports/sales" element={<AdminReportsOverviewPage />} />
        <Route path="reports/products" element={<AdminProductReportsPage />} />
        <Route path="reports/customers" element={<AdminCustomerReportsPage />} />
        <Route path="reports/marketing" element={<AdminMarketingReportsPage />} />
        <Route path="reports/inventory" element={<AdminInventoryReportsPage />} />
        <Route path="reports/export" element={<AdminExportReportsPage />} />
      </Route>
    </Routes>
  );
}
