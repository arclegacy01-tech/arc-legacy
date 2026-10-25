import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../api/client.js';

export default function AdminContactMessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api('/contact').then((d) => setMessages(d.messages));
  }, []);

  return (
    <div>
      <Link to="/admin/content" className="text-sm text-maroon">← Content</Link>
      <h2 className="mt-2 font-serif text-2xl text-maroon">Contact messages</h2>
      <ul className="mt-6 space-y-3">
        {messages.map((m) => (
          <li key={m._id} className="rounded-xl border bg-white p-4 text-sm">
            <div className="flex justify-between">
              <strong>{m.name}</strong>
              <span className="text-xs text-neutral-500">{new Date(m.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-neutral-600">{m.email} · {m.subject}</p>
            <p className="mt-2 text-neutral-700">{m.message}</p>
          </li>
        ))}
        {!messages.length && <p className="text-neutral-500">No messages yet.</p>}
      </ul>
    </div>
  );
}
