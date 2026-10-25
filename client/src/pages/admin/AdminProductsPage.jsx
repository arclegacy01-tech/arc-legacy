import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client.js';
import { formatPrice, unitLabel } from '../../utils/format.js';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  const load = () => api('/products?limit=100').then((d) => setProducts(d.products));

  useEffect(() => {
    load();
  }, []);

  const deactivate = async (id) => {
    if (!confirm('Hide this product from the store?')) return;
    await api(`/products/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-serif text-2xl text-maroon">Products</h2>
        <Link to="/admin/products/new" className="btn-primary text-xs">Add New Product</Link>
      </div>
      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-cream-dark text-xs uppercase text-neutral-500">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b border-neutral-100">
                <td className="p-3 font-medium">{p.title}</td>
                <td className="p-3">{formatPrice(p.price)} / {unitLabel(p.unit)}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3">{p.isActive ? 'Active' : 'Hidden'}</td>
                <td className="p-3">
                  <Link to={`/admin/products/${p._id}/edit`} className="text-maroon hover:underline mr-3">Edit</Link>
                  <button type="button" className="text-red-600 hover:underline" onClick={() => deactivate(p._id)}>Hide</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
