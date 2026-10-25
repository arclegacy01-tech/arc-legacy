import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api/client.js';
import { formatPrice } from '../utils/format.js';
import PageHero from '../components/PageHero.jsx';

const steps = ['pending', 'processing', 'shipped', 'delivered'];

export default function TrackOrderPage() {
  const [params] = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(params.get('orderNumber') || '');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const track = async (e) => {
    e.preventDefault();
    setError('');
    setOrder(null);
    try {
      const data = await api(`/orders/track?orderNumber=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`);
      setOrder(data.order);
    } catch (err) {
      setError(err.message);
    }
  };

  const stepIndex = order ? steps.indexOf(order.status) : -1;

  return (
    <>
      <PageHero title="Track Your Order" subtitle="Enter your order number and email" breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Track Order' }]} />
      <div className="mx-auto max-w-lg px-4 py-10">
        <form onSubmit={track} className="rounded-xl border border-neutral-200 bg-white p-6 space-y-4">
          <label className="block text-sm">
            Order number
            <input className="input-field mt-1" required value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} placeholder="AL10001" />
          </label>
          <label className="block text-sm">
            Email used for order
            <input className="input-field mt-1" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <button type="submit" className="btn-primary w-full">Track</button>
        </form>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {order && (
          <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6">
            <p className="font-medium">#{order.orderNumber}</p>
            <p className="text-sm capitalize text-maroon">{order.status}</p>
            <p className="mt-2 text-sm">{formatPrice(order.total)} · {order.items.length} items</p>
            <div className="mt-6 flex justify-between text-xs">
              {steps.map((s, i) => (
                <div key={s} className={`flex-1 text-center capitalize ${i <= stepIndex ? 'text-maroon font-medium' : 'text-neutral-400'}`}>
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
