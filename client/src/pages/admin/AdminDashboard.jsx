import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client.js';
import { formatPrice } from '../../utils/format.js';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api('/orders').then((d) => setOrders(d.orders));
    api('/products?limit=6').then((d) => setProducts(d.products));
  }, []);

  const totalSales = orders.reduce((s, o) => s + (o.total || 0), 0);

  return (
    <div className="space-y-8">
      <p className="text-neutral-600">Welcome back! Here&apos;s your store at a glance.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Orders', value: orders.length },
          { label: 'Total Sales', value: formatPrice(totalSales) },
          { label: 'Products', value: products.length },
          { label: 'Pending Orders', value: orders.filter((o) => o.status === 'pending').length },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-card">
            <div className="text-xs uppercase text-neutral-500">{card.label}</div>
            <div className="mt-2 text-2xl font-semibold text-maroon">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="mb-4 flex justify-between">
            <h2 className="font-serif text-lg text-maroon">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-maroon">View all</Link>
          </div>
          <ul className="space-y-3 text-sm">
            {orders.slice(0, 5).map((o) => (
              <li key={o._id} className="flex justify-between border-b border-neutral-100 pb-2">
                <span>#{o.orderNumber}</span>
                <span>{formatPrice(o.total)}</span>
              </li>
            ))}
            {!orders.length && <li className="text-neutral-500">No orders yet</li>}
          </ul>
        </section>
        <section className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="mb-4 flex justify-between">
            <h2 className="font-serif text-lg text-maroon">Products</h2>
            <Link to="/admin/products" className="text-sm text-maroon">Manage</Link>
          </div>
          <ul className="space-y-2 text-sm">
            {products.map((p) => (
              <li key={p._id} className="flex justify-between">
                <span className="truncate pr-4">{p.title}</span>
                <span>{formatPrice(p.price)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
