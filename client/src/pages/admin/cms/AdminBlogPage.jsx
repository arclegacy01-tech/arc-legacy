import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../api/client.js';
import CmsEditor from '../../../components/admin/CmsEditor.jsx';

const FIELDS = [
  { name: 'title', label: 'Title', required: true },
  { name: 'slug', label: 'URL slug' },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
  { name: 'content', label: 'Content (HTML)', type: 'textarea', rows: 8 },
  { name: 'coverImage', label: 'Cover image URL' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }],
  },
];

const empty = { title: '', slug: '', excerpt: '', content: '', coverImage: '/images/product-1.jpg', status: 'draft' };

export default function AdminBlogPage() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const load = () => api('/cms/blogs').then((d) => setItems(d.items));
  useEffect(() => { load(); }, []);

  const save = async (form) => {
    const body = { ...form, publishedAt: form.status === 'published' ? new Date().toISOString() : undefined };
    if (editing?._id) await api(`/cms/blogs/${editing._id}`, { method: 'PUT', body: JSON.stringify(body) });
    else await api('/cms/blogs', { method: 'POST', body: JSON.stringify(body) });
    setEditing(null);
    load();
  };

  return (
    <div>
      <Link to="/admin/content" className="text-sm text-maroon">← Content</Link>
      <div className="mt-2 flex justify-between">
        <h2 className="font-serif text-2xl text-maroon">Blogs & Articles</h2>
        <button type="button" className="btn-primary text-xs" onClick={() => setEditing({ ...empty })}>New post</button>
      </div>
      {editing && (
        <div className="mt-6 max-w-2xl">
          <CmsEditor title="Blog post" fields={FIELDS} initial={editing} onSave={save} onCancel={() => setEditing(null)} />
        </div>
      )}
      <ul className="mt-8 space-y-2">
        {items.map((p) => (
          <li key={p._id} className="flex justify-between rounded-lg border bg-white p-3 text-sm">
            <span>{p.title} <span className="text-neutral-400">({p.status})</span></span>
            <span>
              <button type="button" className="text-maroon mr-2" onClick={() => setEditing(p)}>Edit</button>
              <button type="button" className="text-red-600" onClick={async () => { await api(`/cms/blogs/${p._id}`, { method: 'DELETE' }); load(); }}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
