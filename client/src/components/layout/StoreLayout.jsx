import { Outlet } from 'react-router-dom';
import TopBar from './TopBar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import TrustBar from '../TrustBar.jsx';

export default function StoreLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <TrustBar />
      <Footer />
    </div>
  );
}
