import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../api/client.js';
import { formatPrice, unitLabel } from '../../utils/format.js';

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState('');

  const load = () => api(`/orders/my/${id}`).then((d) => setOrder(d.order));

  useEffect(() => {
    load().catch(() => setMessage('Order not found'));
  }, [id]);

  const cancel = async () => {
    if (!confirm('Cancel this order?')) return;
    try {
      const { order: updated } = await api(`/orders/my/${id}/cancel`, { method: 'PATCH' });
      setOrder(updated);
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (message && !order) return <p className="text-red-600">{message}</p>;
  if (!order) return <p>Loading…</p>;

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <Link to="/account/orders" className="text-sm text-maroon">← Back to orders</Link>
      <h2 className="mt-4 font-serif text-2xl text-maroon">Order #{order.orderNumber}</h2>
      <p className="text-sm capitalize text-neutral-600">Status: {order.status}</p>
      <ul className="mt-6 space-y-4">
        {order.items.map((item, i) => (
          <li key={i} className="flex gap-4 border-b border-neutral-100 pb-4">
            <img src={item.image} alt="" className="h-16 w-16 rounded-lg object-cover" />
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-neutral-600">
                Qty {item.quantity} · {formatPrice(item.price)} / {unitLabel(item.unit)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <dl className="mt-6 space-y-1 text-sm">
        <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(order.subtotal)}</dd></div>
        <div className="flex justify-between"><dt>Shipping</dt><dd>{order.shipping ? formatPrice(order.shipping) : 'FREE'}</dd></div>
        <div className="flex justify-between font-semibold text-maroon"><dt>Total</dt><dd>{formatPrice(order.total)}</dd></div>
      </dl>
      {order.shippingAddress && (
        <div className="mt-6 text-sm">
          <h3 className="font-medium">Shipping address</h3>
          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.line1}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
        </div>
      )}
      {['pending', 'processing'].includes(order.status) && (
        <button type="button" className="btn-outline mt-6 text-xs" onClick={cancel}>Cancel order</button>
      )}
    </div>
  );
}
