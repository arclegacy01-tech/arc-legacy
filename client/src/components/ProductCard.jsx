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
          className={`absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-sm shadow-sm ${
            wished ? 'text-maroon' : 'text-neutral-400'
          }`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product._id);
          }}
          aria-label="Wishlist"
        >
          {wished ? '♥' : '♡'}
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
          className={`btn-primary mt-3 w-full ${isHome ? 'py-2 text-[10px] sm:text-xs' : 'text-xs'}`}
          onClick={() => addItem(product, 1)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
