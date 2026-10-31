import { Link } from 'react-router-dom';
import { formatPrice, unitLabel } from '../utils/format.js';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import StarRating from './StarRating.jsx';

export default function ProductCard({ product, variant = 'default' }) {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wished = isWishlisted(product._id);
  const image = product.images?.find((i) => i.isMain)?.url || product.images?.[0]?.url || '/images/product-1.jpg';
  const rating = product.rating ?? 4.8;
  const isHome = variant === 'home';

  return (
    <article
      className={`group flex flex-col overflow-hidden bg-white transition hover:-translate-y-0.5 ${
        isHome ? 'rounded-lg border border-neutral-200/90 shadow-sm hover:shadow-md' : 'rounded-xl border border-neutral-200/80 shadow-card hover:shadow-lg'
      }`}
    >
      <Link to={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-blush">
        <button
          type="button"
          className={`absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:scale-110 ${
            wished ? 'text-maroon' : 'text-neutral-400 hover:text-maroon'
          }`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product._id);
          }}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill={wished ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={wished ? '0' : '1.8'}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <img
          src={image}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className={`flex flex-1 flex-col ${isHome ? 'p-3' : 'p-4'}`}>
        <Link
          to={`/product/${product.slug}`}
          className={`font-medium text-neutral-800 hover:text-maroon line-clamp-2 ${isHome ? 'text-xs sm:text-sm' : ''}`}
        >
          {product.title}
        </Link>
        <div className={`mt-1 font-semibold text-maroon ${isHome ? 'text-sm' : ''}`}>
          {formatPrice(product.price)}{' '}
          <span className="text-xs font-normal text-neutral-500">/ {unitLabel(product.unit)}</span>
        </div>
        <div className="mt-1">
          <StarRating value={rating} />
        </div>
        <button
          type="button"
          className={`btn-primary mt-3 w-full inline-flex items-center justify-center gap-1.5 ${isHome ? 'py-2 text-[10px] sm:text-xs' : 'text-xs'}`}
          onClick={() => addItem(product, 1)}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span>Add to Cart</span>
        </button>
      </div>
    </article>
  );
}
