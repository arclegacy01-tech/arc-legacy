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
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProductsPage from './pages/admin/AdminProductsPage.jsx';
import AdminProductFormPage from './pages/admin/AdminProductFormPage.jsx';
import AdminOrdersPage from './pages/admin/AdminOrdersPage.jsx';
import AdminContentHub from './pages/admin/cms/AdminContentHub.jsx';
import AdminBannersPage from './pages/admin/cms/AdminBannersPage.jsx';
import AdminAnnouncementsPage from './pages/admin/cms/AdminAnnouncementsPage.jsx';
import AdminFaqsPage from './pages/admin/cms/AdminFaqsPage.jsx';
import AdminHomepagePage from './pages/admin/cms/AdminHomepagePage.jsx';
import AdminBlogPage from './pages/admin/cms/AdminBlogPage.jsx';
import AdminContactMessagesPage from './pages/admin/cms/AdminContactMessagesPage.jsx';
import AdminWholesalePage from './pages/admin/AdminWholesalePage.jsx';
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
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="account/addresses" element={<AddressesPage />} />
          <Route path="account/settings" element={<AccountSettingsPage />} />
          <Route path="account/notifications" element={<NotificationsPage />} />
          <Route path="account/help" element={<HelpPage />} />
        </Route>
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="products/new" element={<AdminProductFormPage />} />
        <Route path="products/:id/edit" element={<AdminProductFormPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="content" element={<AdminContentHub />} />
        <Route path="content/banners" element={<AdminBannersPage />} />
        <Route path="content/announcements" element={<AdminAnnouncementsPage />} />
        <Route path="content/faqs" element={<AdminFaqsPage />} />
        <Route path="content/homepage" element={<AdminHomepagePage />} />
        <Route path="content/blogs" element={<AdminBlogPage />} />
        <Route path="content/messages" element={<AdminContactMessagesPage />} />
        <Route path="wholesale" element={<AdminWholesalePage />} />
      </Route>
    </Routes>
  );
}
