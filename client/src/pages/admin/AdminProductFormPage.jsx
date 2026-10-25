import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/client.js';
import CloudinaryUploadField from '../../components/CloudinaryUploadField.jsx';

const empty = {
  title: '',
  price: '',
  comparePrice: '',
  unit: 'meter',
  stock: 42,
  shortDescription: '',
  category: '',
  isFeatured: false,
  isNewArrival: false,
  imageUrl: '/images/product-1.jpg',
};

export default function AdminProductFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/categories').then((d) => setCategories(d.categories));
  }, []);

  useEffect(() => {
    if (!id) return;
    api(`/products/${id}`).then((d) => {
      const p = d.product;
      setForm({
        title: p.title,
        price: p.price,
        comparePrice: p.comparePrice || '',
        unit: p.unit,
        stock: p.stock,
        shortDescription: p.shortDescription || '',
        category: p.category?._id || p.category,
        isFeatured: p.isFeatured,
        isNewArrival: p.isNewArrival,
        imageUrl: p.images?.[0]?.url || '/images/product-1.jpg',
      });
    });
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      title: form.title,
      price: Number(form.price),
      comparePrice: form.comparePrice ? Number(form.comparePrice) : undefined,
      unit: form.unit,
      stock: Number(form.stock),
      shortDescription: form.shortDescription,
      category: form.category,
      isFeatured: form.isFeatured,
      isNewArrival: form.isNewArrival,
      images: [{ url: form.imageUrl, isMain: true }],
      isActive: true,
    };
    try {
      if (isEdit) {
        await api(`/products/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
      } else {
        await api('/products', { method: 'POST', body: JSON.stringify(payload) });
      }
      navigate('/admin/products');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-4 rounded-xl border border-neutral-200 bg-white p-6">
      <h2 className="font-serif text-2xl text-maroon">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <label className="block text-sm">
        Title
        <input className="input-field mt-1" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      </label>
      <label className="block text-sm">
        Category
        <select className="input-field mt-1" required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option value="">Select…</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Price (₹)
          <input className="input-field mt-1" type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </label>
        <label className="block text-sm">
          Stock
          <input className="input-field mt-1" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        </label>
      </div>
      <CloudinaryUploadField
        label="Product image"
        value={form.imageUrl}
        onChange={(url) => setForm({ ...form, imageUrl: url })}
      />
      <label className="block text-sm">
        Short description
        <textarea className="input-field mt-1" rows={3} value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
      </label>
      <div className="flex gap-6 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
          Featured
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.isNewArrival} onChange={(e) => setForm({ ...form, isNewArrival: e.target.checked })} />
          New arrival
        </label>
      </div>
      <button type="submit" className="btn-primary">Save & Publish</button>
    </form>
  );
}
