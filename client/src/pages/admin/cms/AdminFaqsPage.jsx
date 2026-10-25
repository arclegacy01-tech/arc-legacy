import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../api/client.js';
import CmsEditor from '../../../components/admin/CmsEditor.jsx';

const FIELDS = [
  { name: 'question', label: 'Question', required: true },
  { name: 'answer', label: 'Answer', type: 'textarea', required: true },
  { name: 'category', label: 'Category' },
  { name: 'sortOrder', label: 'Sort order', type: 'number' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }],
  },
];

const empty = { question: '', answer: '', category: 'General', sortOrder: 0, status: 'published' };

export default function AdminFaqsPage() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const load = () => api('/cms/faqs').then((d) => setItems(d.items));
  useEffect(() => { load(); }, []);

  const save = async (form) => {
    const body = { ...form, sortOrder: Number(form.sortOrder) };
    if (editing?._id) await api(`/cms/faqs/${editing._id}`, { method: 'PUT', body: JSON.stringify(body) });
    else await api('/cms/faqs', { method: 'POST', body: JSON.stringify(body) });
    setEditing(null);
    load();
  };

  return (
    <div>
      <Link to="/admin/content" className="text-sm text-maroon">← Content</Link>
      <div className="mt-2 flex justify-between">
        <h2 className="font-serif text-2xl text-maroon">FAQs</h2>
        <button type="button" className="btn-primary text-xs" onClick={() => setEditing({ ...empty })}>Add FAQ</button>
      </div>
      {editing && (
        <div className="mt-6 max-w-xl">
          <CmsEditor title="FAQ" fields={FIELDS} initial={editing} onSave={save} onCancel={() => setEditing(null)} />
        </div>
      )}
      <ul className="mt-8 space-y-3">
        {items.map((f) => (
          <li key={f._id} className="rounded-lg border bg-white p-4">
            <div className="font-medium">{f.question}</div>
            <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{f.answer}</p>
            <div className="mt-2 text-xs">
              <button type="button" className="text-maroon mr-2" onClick={() => setEditing(f)}>Edit</button>
              <button type="button" className="text-red-600" onClick={async () => { await api(`/cms/faqs/${f._id}`, { method: 'DELETE' }); load(); }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
