import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { formatPrice, unitLabel } from '../../utils/format.js';
import ProductGrid from '../../components/ProductGrid.jsx';
import { getRecentlyViewed } from '../../hooks/useRecentlyViewed.js';

export default function WishlistPage() {
  const { products, loading, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const recent = getRecentlyViewed().filter((p) => !products.some((w) => w._id === p._id));

  const moveAllToCart = () => {
    products.forEach((p) => addItem(p, 1));
  };

  return (
    <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-serif text-xl text-maroon">My Wishlist ({products.length} items)</h2>
          {products.length > 0 && (
            <button type="button" className="btn-outline text-xs" onClick={moveAllToCart}>
              Move All to Cart
            </button>
          )}
        </div>
        {loading && <p className="text-neutral-500">Loading…</p>}
        {!loading && !products.length && (
          <p className="rounded-xl border border-dashed py-12 text-center text-neutral-500">
            Your wishlist is empty. <Link to="/" className="text-maroon underline">Browse products</Link>
          </p>
        )}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => {
            const image = p.images?.[0]?.url || '/images/product-1.jpg';
            return (
              <article key={p._id} className="rounded-xl border border-neutral-200 bg-white p-4">
                <div className="relative">
                  <Link to={`/product/${p.slug}`}>
                    <img src={image} alt="" className="aspect-square w-full rounded-lg object-cover" />
                  </Link>
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-maroon"
                    onClick={() => toggleWishlist(p._id)}
                    aria-label="Remove from wishlist"
                  >
                    ♥
                  </button>
                </div>
                <Link to={`/product/${p.slug}`} className="mt-3 block text-sm font-medium hover:text-maroon line-clamp-2">
                  {p.title}
                </Link>
                <p className="text-sm text-maroon">{formatPrice(p.price)} / {unitLabel(p.unit)}</p>
                <button type="button" className="btn-primary mt-3 w-full text-xs" onClick={() => addItem(p, 1)}>
                  Add to Cart
                </button>
                <button type="button" className="mt-2 w-full text-xs text-neutral-500 underline" onClick={() => toggleWishlist(p._id)}>
                  Remove
                </button>
              </article>
            );
          })}
        </div>

        {recent.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-xl text-maroon">Recently Viewed</h2>
            <div className="mt-6">
              <ProductGrid products={recent.map((r) => ({ ...r, images: [{ url: r.image, isMain: true }] }))} />
            </div>
          </section>
        )}
    </div>
  );
}
