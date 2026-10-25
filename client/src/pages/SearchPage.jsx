import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api/client.js';
import ProductGrid from '../components/ProductGrid.jsx';

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!q) return;
    api(`/products?q=${encodeURIComponent(q)}&limit=24`).then((d) => setProducts(d.products));
  }, [q]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-serif text-2xl text-maroon">Search results for “{q}”</h1>
      <div className="mt-8">
        <ProductGrid products={products} emptyMessage="No matches. Try another search." />
      </div>
    </div>
  );
}
