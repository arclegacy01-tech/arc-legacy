import { useEffect, useState } from 'react';
import { api } from '../../api/client.js';

const STATUSES = ['new', 'contacted', 'quoted', 'closed'];

export default function AdminWholesalePage() {
  const [enquiries, setEnquiries] = useState([]);

  const load = () => api('/wholesale/enquiries').then((d) => setEnquiries(d.enquiries));

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await api(`/wholesale/enquiries/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
    load();
  };

  return (
    <div>
      <h2 className="font-serif text-2xl text-maroon">Wholesale enquiries</h2>
      <div className="mt-6 space-y-4">
        {enquiries.map((e) => (
          <article key={e._id} className="rounded-xl border border-neutral-200 bg-white p-5 text-sm">
            <div className="flex flex-wrap justify-between gap-2">
              <strong>{e.companyName}</strong>
              <select
                className="rounded border px-2 py-1 text-xs capitalize"
                value={e.status}
                onChange={(ev) => updateStatus(e._id, ev.target.value)}
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <p className="text-neutral-600">{e.contactName} · {e.email} · {e.phone}</p>
            {e.productInterest && <p className="mt-1">Interest: {e.productInterest} {e.quantity && `· Qty: ${e.quantity}`}</p>}
            {e.message && <p className="mt-2 text-neutral-700">{e.message}</p>}
            <p className="mt-2 text-xs text-neutral-400">{new Date(e.createdAt).toLocaleString()}</p>
          </article>
        ))}
        {!enquiries.length && <p className="text-neutral-500">No enquiries yet.</p>}
      </div>
    </div>
  );
}
