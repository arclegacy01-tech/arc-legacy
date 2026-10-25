import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { api } from '../api/client.js';
import CategoryFilters from '../components/CategoryFilters.jsx';
import ProductGrid from '../components/ProductGrid.jsx';

const TITLES = {
  laces: 'Premium Laces',
  latkans: 'Premium Latkans',
  'trims-borders': 'Trims & Borders',
  'pom-pom-trims': 'Pom Pom Trims',
  'gota-patti': 'Gota Patti',
  embellishments: 'Embellishments',
};

export default function CategoryPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    material: [],
    style: [],
    inStock: false,
    priceRange: null,
  });

  const page = Number(searchParams.get('page')) || 1;

  const queryString = useMemo(() => {
    const q = new URLSearchParams();
    q.set('categorySlug', slug);
    q.set('page', String(page));
    q.set('limit', '12');
    if (filters.inStock) q.set('inStock', 'true');
    if (filters.priceRange) {
      q.set('minPrice', String(filters.priceRange.min));
      q.set('maxPrice', String(filters.priceRange.max));
    }
    if (filters.material?.length) q.set('material', filters.material.join(','));
    if (filters.style?.length) q.set('style', filters.style.join(','));
    return q.toString();
  }, [slug, page, filters]);

  useEffect(() => {
    setLoading(true);
    api(`/products?${queryString}`)
      .then((data) => {
        setProducts(data.products);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }, [queryString]);

  const title = TITLES[slug] || slug?.replace(/-/g, ' ');

  return (
    <>
      <div className="bg-blush py-12 text-center">
        <h1 className="font-serif text-3xl capitalize text-maroon md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-neutral-600">Handpicked for designers, boutiques & creators</p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[260px_1fr]">
        <CategoryFilters
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters({ material: [], style: [], inStock: false, priceRange: null })}
        />
        <div>
          {loading ? (
            <p className="py-20 text-center text-neutral-500">Loading products…</p>
          ) : (
            <>
              <ProductGrid products={products} />
              {pagination.pages > 1 && (
                <div className="mt-10 flex justify-center gap-2">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setSearchParams({ page: String(p) })}
                      className={`h-9 w-9 rounded-full text-sm ${
                        p === pagination.page ? 'bg-maroon text-white' : 'border border-neutral-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
