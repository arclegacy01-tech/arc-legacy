import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import WholesaleEnquiryForm from '../components/WholesaleEnquiryForm.jsx';
import { api } from '../api/client.js';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { addRecentlyViewed } from '../hooks/useRecentlyViewed.js';
import { formatPrice, unitLabel } from '../utils/format.js';
import StarRating from '../components/StarRating.jsx';
import { EMBELLISHMENTS_PRODUCTS } from '../data/embellishmentsData.js';
import { LATKANS_PRODUCTS, LATKANS_FAVOURITES } from '../data/latkansData.js';
import { NEW_ARRIVALS_PRODUCTS, NEW_ARRIVALS_TRENDING } from '../data/newArrivalsData.js';
import { POM_POM_PRODUCTS } from '../data/pomPomData.js';
import { TRIMS_BORDERS_PRODUCTS } from '../data/trimsBordersData.js';
import { WHOLESALE_TRENDING_PRODUCTS } from '../data/wholesaleData.js';
import { GOTA_PATTI_PRODUCTS } from '../data/gotaPattiData.js';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState('');
  const [showWholesale, setShowWholesale] = useState(false);
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  useEffect(() => {
    api(`/products/slug/${slug}`)
      .then((d) => {
        setProduct(d.product);
        addRecentlyViewed(d.product);
      })
      .catch(() => {
        // Check Embellishments
        const embMatch = EMBELLISHMENTS_PRODUCTS.find((p) => p.slug === slug);
        if (embMatch) {
          const p = {
            ...embMatch,
            category: { name: 'Embellishments', slug: 'embellishments' },
            shortDescription: 'Exquisite handcrafted embellishment designed for ethnic wear, bridal couture, blouses, sarees and DIY fashion projects.',
            stock: 25,
            lowStockAlert: 5,
            trackStock: true,
            reviewCount: 24,
          };
          setProduct(p);
          addRecentlyViewed(p);
          return;
        }

        // Check Latkans
        const allLatkans = [...LATKANS_PRODUCTS, ...LATKANS_FAVOURITES];
        const latMatch = allLatkans.find((p) => p.slug === slug);
        if (latMatch) {
          const p = {
            ...latMatch,
            images: latMatch.images || [{ url: latMatch.image, isMain: true }],
            category: { name: 'Latkans', slug: 'latkans' },
            shortDescription: 'Handcrafted premium latkan designed to add movement, charm, and elegance to lehengas, dupattas, blouses, and festive outfits.',
            stock: 30,
            lowStockAlert: 6,
            trackStock: true,
            reviewCount: 18,
          };
          setProduct(p);
          addRecentlyViewed(p);
          return;
        }

        // Check New Arrivals
        const allNewArrivals = [...NEW_ARRIVALS_PRODUCTS, ...NEW_ARRIVALS_TRENDING];
        const naMatch = allNewArrivals.find((p) => p.slug === slug);
        if (naMatch) {
          const p = {
            ...naMatch,
            images: naMatch.images || [{ url: naMatch.image, isMain: true }],
            category: { name: 'New Arrivals', slug: 'new-arrivals' },
            shortDescription: 'Handpicked new arrival crafted for bridal couture, festive outfits, sarees, lehengas, and custom creations.',
            stock: 40,
            lowStockAlert: 5,
            trackStock: true,
            reviewCount: 22,
          };
          setProduct(p);
          addRecentlyViewed(p);
          return;
        }

        // Check Pom Pom Trims
        const pomMatch = POM_POM_PRODUCTS.find((p) => p.slug === slug);
        if (pomMatch) {
          const p = {
            ...pomMatch,
            images: pomMatch.images || [{ url: pomMatch.image, isMain: true }],
            category: { name: 'Pom Pom Trims', slug: 'pom-pom-trims' },
            shortDescription: 'Playful, vibrant handcrafted pom pom trim designed to add a touch of tradition and charm to dupattas, blouses, lehengas, bags, and home décor.',
            stock: 35,
            lowStockAlert: 5,
            trackStock: true,
            reviewCount: 26,
          };
          setProduct(p);
          addRecentlyViewed(p);
          return;
        }

        // Check Trims & Borders
        const trimsMatch = TRIMS_BORDERS_PRODUCTS.find((p) => p.slug === slug);
        if (trimsMatch) {
          const p = {
            ...trimsMatch,
            images: trimsMatch.images || [{ url: trimsMatch.image, isMain: true }],
            category: { name: 'Trims & Borders', slug: 'trims-borders' },
            shortDescription: 'Intricately designed border and trim crafted to elevate ethnic wear, bridal outfits, sarees, lehengas, blouses, and home décor.',
            stock: 40,
            lowStockAlert: 5,
            trackStock: true,
            reviewCount: 29,
          };
          setProduct(p);
          addRecentlyViewed(p);
          return;
        }

        // Check Wholesale Trending Products
        const wsMatch = WHOLESALE_TRENDING_PRODUCTS.find((p) => p.slug === slug);
        if (wsMatch) {
          const p = {
            ...wsMatch,
            rating: 4.8,
            images: wsMatch.images || [{ url: wsMatch.image, isMain: true }],
            category: { name: 'Wholesale Collection', slug: 'wholesale' },
            shortDescription: 'Premium wholesale trim crafted for boutiques, fashion designers, tailors, and resellers.',
            stock: 100,
            lowStockAlert: 10,
            trackStock: true,
            reviewCount: 34,
          };
          setProduct(p);
          addRecentlyViewed(p);
          return;
        }

        // Check Gota Patti Products
        const gotaMatch = GOTA_PATTI_PRODUCTS.find((p) => p.slug === slug);
        if (gotaMatch) {
          const p = {
            ...gotaMatch,
            images: gotaMatch.images || [{ url: gotaMatch.image, isMain: true }],
            category: { name: 'Gota Patti', slug: 'gota-patti' },
            shortDescription: 'Traditional handcrafted gota patti border and trim designed for lehengas, sarees, dupattas, and festive couture.',
            stock: 45,
            lowStockAlert: 5,
            trackStock: true,
            reviewCount: 28,
          };
          setProduct(p);
          addRecentlyViewed(p);
          return;
        }

        setError('Product not found');
      });
  }, [slug]);

  if (error) {
    return <p className="py-20 text-center">{error}</p>;
  }
  if (!product) {
    return <p className="py-20 text-center text-neutral-500">Loading…</p>;
  }

  const images = product.images?.length ? product.images : [{ url: '/images/product-1.jpg', isMain: true }];
  const main = images.find((i) => i.isMain) || images[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-xs text-neutral-500">
        <Link to="/">Home</Link> /{' '}
        <Link to={`/category/${product.category?.slug}`}>{product.category?.name}</Link> / {product.title}
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-2xl bg-blush">
            <img src={main.url} alt={product.title} className="h-full w-full object-cover" />
          </div>
          <div className="flex gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="h-20 w-20 overflow-hidden rounded-lg border border-neutral-200">
                <img src={img.url} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="font-serif text-3xl text-maroon">{product.title}</h1>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-maroon">{formatPrice(product.price)}</span>
            <span className="text-sm text-neutral-500">/ {unitLabel(product.unit)}</span>
            {product.comparePrice && (
              <span className="text-sm text-neutral-400 line-through">{formatPrice(product.comparePrice)}</span>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <StarRating value={product.rating ?? 4.8} />
            <span className="text-xs text-neutral-500">· {product.reviewCount ?? 12} reviews</span>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-neutral-700">{product.shortDescription}</p>

          {product.stock <= product.lowStockAlert && product.trackStock && (
            <p className="mt-4 text-sm text-amber-700">Only {product.stock} left in stock</p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-neutral-200">
              <button type="button" className="px-4 py-2" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="min-w-8 text-center">{qty}</span>
              <button type="button" className="px-4 py-2" onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button type="button" className="btn-primary" onClick={() => addItem(product, qty)}>
              Add to Cart
            </button>
            <button
              type="button"
              className="btn-outline"
              onClick={() => toggleWishlist(product._id)}
            >
              {isWishlisted(product._id) ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
          </div>

          {product.material?.length && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase text-neutral-500">Material</h3>
              <p className="mt-1 text-sm">{product.material.join(', ')}</p>
            </div>
          )}

          <div className="mt-10 rounded-xl border border-gold/30 bg-blush/50 p-4">
            <p className="text-sm font-medium text-maroon">Buying in bulk?</p>
            <p className="text-xs text-neutral-600">Get wholesale pricing for boutiques and designers.</p>
            <button type="button" className="btn-outline mt-3 text-xs" onClick={() => setShowWholesale(!showWholesale)}>
              Enquire for wholesale
            </button>
            {showWholesale && (
              <div className="mt-4">
                <WholesaleEnquiryForm productTitle={product.title} productId={product._id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
