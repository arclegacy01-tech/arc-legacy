import { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import ProductGrid from '../components/ProductGrid.jsx';

export default function NewArrivalsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api('/products?newArrivals=true&limit=24').then((d) => setProducts(d.products));
  }, []);

  return (
    <>
      <div className="bg-blush py-12 text-center">
        <h1 className="font-serif text-3xl text-maroon">New Arrivals</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <ProductGrid products={products} />
      </div>
    </>
  );
}
