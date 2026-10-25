import { useEffect, useState } from 'react';
import { api } from '../../api/client.js';
import { formatPrice } from '../../utils/format.js';

const STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');

  const load = () => {
    const q = filter ? `?status=${filter}` : '';
    api(`/orders${q}`).then((d) => setOrders(d.orders));
  };

  useEffect(() => {
    load();
  }, [filter]);

  const updateStatus = async (id, status) => {
    await api(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
    load();
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-serif text-2xl text-maroon">Orders</h2>
        <select className="input-field w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-cream-dark text-xs uppercase text-neutral-500">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-b border-neutral-100">
                <td className="p-3 font-medium">#{o.orderNumber}</td>
                <td className="p-3">{o.customerName || o.customerEmail}</td>
                <td className="p-3">{formatPrice(o.total)}</td>
                <td className="p-3 uppercase text-xs">{o.paymentMethod}</td>
                <td className="p-3">
                  <select
                    className="rounded border border-neutral-200 px-2 py-1 text-xs capitalize"
                    value={o.status}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!orders.length && <p className="p-6 text-center text-neutral-500">No orders</p>}
      </div>
    </div>
  );
}
