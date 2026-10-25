import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client.js';
import { formatPrice } from '../../utils/format.js';

const TABS = [
  { key: '', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'processing', label: 'Processing' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
];

const statusColor = {
  pending: 'bg-amber-100 text-amber-800',
  processing: 'bg-yellow-100 text-yellow-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function MyOrdersPage() {
  const [tab, setTab] = useState('');
  const [orders, setOrders] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    const query = tab ? `?status=${tab}` : '';
    api(`/orders/my${query}`).then((d) => setOrders(d.orders));
  }, [tab]);

  const filtered = orders.filter(
    (o) =>
      !q ||
      o.orderNumber.toLowerCase().includes(q.toLowerCase()) ||
      o.items.some((i) => i.title?.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div>
      <h2 className="font-serif text-2xl text-maroon">My Orders</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`rounded-full px-3 py-1 text-xs ${
              tab === t.key ? 'bg-maroon text-white' : 'border border-neutral-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <input
        className="input-field mt-4 max-w-md"
        placeholder="Search by order ID or product…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <ul className="mt-6 space-y-4">
        {filtered.map((order) => (
          <li key={order._id} className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <span className="font-medium">#{order.orderNumber}</span>
                <p className="text-xs text-neutral-500">{new Date(order.createdAt).toLocaleString('en-IN')}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${statusColor[order.status]}`}>
                {order.status}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {order.items.slice(0, 3).map((item, i) => (
                <img key={i} src={item.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-lg font-semibold text-maroon">{formatPrice(order.total)}</span>
              <div className="flex gap-2">
                <Link to={`/account/orders/${order._id}`} className="btn-outline text-xs py-1.5">
                  View Details
                </Link>
                <Link to={`/track-order?orderNumber=${order.orderNumber}`} className="text-xs text-maroon underline">
                  Track
                </Link>
              </div>
            </div>
          </li>
        ))}
        {!filtered.length && <p className="text-sm text-neutral-500">No orders in this view.</p>}
      </ul>
    </div>
  );
}
