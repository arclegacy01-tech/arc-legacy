import { Link, NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/content', label: 'Content' },
  { to: '/admin/wholesale', label: 'Wholesale' },
];

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();

  if (loading) return <p className="p-8">Loading…</p>;
  if (!user || user.role !== 'admin') return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-cream">
      <aside className="relative flex min-h-screen w-64 flex-col bg-maroon text-white">
        <div className="border-b border-white/10 p-6">
          <div className="font-serif text-lg text-gold-light">ARC LEGACY</div>
          <div className="text-[10px] uppercase tracking-widest text-white/70">Admin Panel</div>
        </div>
        <nav className="p-4 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-white/15' : 'hover:bg-white/10'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 p-4 text-sm">
          <Link to="/" className="block text-white/80 hover:text-white">View Store</Link>
          <button type="button" className="mt-2 text-white/60 hover:text-white" onClick={logout}>Logout</button>
        </div>
      </aside>
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-8 py-4">
          <h1 className="font-serif text-xl text-maroon">E-commerce Dashboard</h1>
          <span className="text-sm text-neutral-600">{user.name}</span>
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
