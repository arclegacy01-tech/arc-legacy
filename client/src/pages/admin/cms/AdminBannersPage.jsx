import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../api/client.js';
import CmsEditor from '../../../components/admin/CmsEditor.jsx';
import CloudinaryUploadField from '../../../components/CloudinaryUploadField.jsx';

const FIELDS = [
  { name: 'title', label: 'Title', required: true },
  { name: 'subtitle', label: 'Subtitle' },
  { name: 'imageUrl', label: 'Image URL (Cloudinary)', required: true },
  { name: 'ctaLabel', label: 'Button label' },
  { name: 'ctaLink', label: 'Button link' },
  {
    name: 'placement',
    label: 'Placement',
    type: 'select',
    options: [
      { value: 'homepage-hero', label: 'Homepage hero' },
      { value: 'homepage-promo', label: 'Homepage promo band' },
      { value: 'wholesale', label: 'Wholesale' },
    ],
  },
  { name: 'sortOrder', label: 'Sort order', type: 'number' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'draft', label: 'Draft' },
      { value: 'published', label: 'Published' },
      { value: 'scheduled', label: 'Scheduled' },
    ],
  },
];

const empty = {
  title: '',
  subtitle: '',
  imageUrl: '/images/product-1.jpg',
  ctaLabel: 'Shop Now',
  ctaLink: '/',
  placement: 'homepage-hero',
  sortOrder: 0,
  status: 'draft',
};

export default function AdminBannersPage() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imageCategory, setImageCategory] = useState('');

  const load = () => api('/cms/banners').then((d) => setItems(d.items));

  useEffect(() => {
    load();
    api('/categories').then((d) => setCategories(d.categories)).catch(() => {});
  }, []);

  const save = async (form) => {
    if (editing?._id) {
      await api(`/cms/banners/${editing._id}`, { method: 'PUT', body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder) }) });
    } else {
      await api('/cms/banners', { method: 'POST', body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder) }) });
    }
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete banner?')) return;
    await api(`/cms/banners/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <Link to="/admin/content" className="text-sm text-maroon">← Content</Link>
      <div className="mt-2 flex justify-between">
        <h2 className="font-serif text-2xl text-maroon">Banners</h2>
        <button type="button" className="btn-primary text-xs" onClick={() => setEditing({ ...empty })}>Add banner</button>
      </div>
      {editing && (
        <div className="mt-6 max-w-xl space-y-4">
          <label className="block text-sm">
            Image category
            <select className="input-field mt-1" value={imageCategory} onChange={(e) => setImageCategory(e.target.value)}>
              <option value="">Select…</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </label>
          <CloudinaryUploadField
            label="Banner image"
            value={editing.imageUrl}
            categoryId={imageCategory}
            onChange={(url) => setEditing({ ...editing, imageUrl: url })}
          />
          <CmsEditor
            title={editing._id ? 'Edit banner' : 'New banner'}
            fields={FIELDS.filter((f) => f.name !== 'imageUrl')}
            initial={editing}
            onSave={save}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}
      <table className="mt-8 w-full text-left text-sm">
        <thead className="border-b text-xs uppercase text-neutral-500">
          <tr><th className="p-2">Preview</th><th>Title</th><th>Placement</th><th>Status</th><th /></tr>
        </thead>
        <tbody>
          {items.map((b) => (
            <tr key={b._id} className="border-b">
              <td className="p-2"><img src={b.imageUrl} alt="" className="h-12 w-20 rounded object-cover" /></td>
              <td>{b.title}</td>
              <td>{b.placement}</td>
              <td className="capitalize">{b.status}</td>
              <td className="p-2 text-right">
                <button type="button" className="text-maroon mr-2" onClick={() => setEditing(b)}>Edit</button>
                <button type="button" className="text-red-600" onClick={() => remove(b._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
