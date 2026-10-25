import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../api/client.js';
import CmsEditor from '../../../components/admin/CmsEditor.jsx';

const FIELDS = [
  { name: 'text', label: 'Message text', required: true },
  { name: 'linkUrl', label: 'Optional link (path)' },
  { name: 'sortOrder', label: 'Sort order', type: 'number' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }],
  },
];

const empty = { text: '', linkUrl: '', sortOrder: 0, status: 'published' };

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const load = () => api('/cms/announcements').then((d) => setItems(d.items));
  useEffect(() => { load(); }, []);

  const save = async (form) => {
    const body = { ...form, sortOrder: Number(form.sortOrder) };
    if (editing?._id) await api(`/cms/announcements/${editing._id}`, { method: 'PUT', body: JSON.stringify(body) });
    else await api('/cms/announcements', { method: 'POST', body: JSON.stringify(body) });
    setEditing(null);
    load();
  };

  return (
    <div>
      <Link to="/admin/content" className="text-sm text-maroon">← Content</Link>
      <div className="mt-2 flex justify-between">
        <h2 className="font-serif text-2xl text-maroon">Announcements</h2>
        <button type="button" className="btn-primary text-xs" onClick={() => setEditing({ ...empty })}>Add</button>
      </div>
      {editing && (
        <div className="mt-6 max-w-md">
          <CmsEditor title="Announcement" fields={FIELDS} initial={editing} onSave={save} onCancel={() => setEditing(null)} />
        </div>
      )}
      <ul className="mt-8 space-y-2">
        {items.map((a) => (
          <li key={a._id} className="flex justify-between rounded-lg border bg-white p-3 text-sm">
            <span>{a.text}</span>
            <span>
              <button type="button" className="text-maroon mr-2" onClick={() => setEditing(a)}>Edit</button>
              <button type="button" className="text-red-600" onClick={async () => { await api(`/cms/announcements/${a._id}`, { method: 'DELETE' }); load(); }}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
