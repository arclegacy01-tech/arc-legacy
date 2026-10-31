import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'arc_wishlist_items_v1';
const SEEDED_KEY = 'arc_wishlist_seeded_v1';

export const DEFAULT_WISHLIST_ITEMS = [
  {
    _id: 'wish-1',
    slug: 'pearl-beaded-fringe-trim',
    title: 'Pearl Beaded Gold Lace',
    size: '2.5 cm',
    price: 320,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 96,
    image: '/images/provided-pearl-lace.jpg',
    images: [{ url: '/images/provided-pearl-lace.jpg', isMain: true }],
  },
  {
    _id: 'wish-2',
    slug: 'golden-zari-embroidered-border',
    title: 'Floral Zari Border Trim',
    size: '4 cm',
    price: 350,
    unit: 'Meter',
    rating: 4.7,
    reviewCount: 82,
    image: '/images/provided-floral-lace.jpg',
    images: [{ url: '/images/provided-floral-lace.jpg', isMain: true }],
  },
  {
    _id: 'wish-3',
    slug: 'multicolour-pom-pom-trim',
    title: 'Pom Pom Trim',
    size: '3 cm',
    price: 290,
    unit: 'Meter',
    rating: 4.7,
    reviewCount: 52,
    image: '/images/product-4.jpg',
    images: [{ url: '/images/product-4.jpg', isMain: true }],
  },
  {
    _id: 'wish-4',
    slug: 'kundan-hanging-latkan',
    title: 'Designer Gold Latkan Trim',
    size: '5 cm',
    price: 420,
    unit: 'Meter',
    rating: 4.9,
    reviewCount: 110,
    image: '/images/product-5.jpg',
    images: [{ url: '/images/product-5.jpg', isMain: true }],
  },
  {
    _id: 'wish-5',
    slug: 'mirror-work-border',
    title: 'Mirror Work Gold Lace',
    size: '3 cm',
    price: 310,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 74,
    image: '/images/product-7.jpg',
    images: [{ url: '/images/product-7.jpg', isMain: true }],
  },
  {
    _id: 'wish-6',
    slug: 'golden-gota-patti-lace',
    title: 'Traditional Gota Patti Lace',
    size: '2 cm',
    price: 260,
    unit: 'Meter',
    rating: 4.7,
    reviewCount: 68,
    image: '/images/product-6.jpg',
    images: [{ url: '/images/product-6.jpg', isMain: true }],
  },
  {
    _id: 'wish-7',
    slug: 'maroon-velvet-sequins-border',
    title: 'Velvet Embroidered Border',
    size: '4 cm',
    price: 380,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 47,
    image: '/images/product-12.jpg',
    images: [{ url: '/images/product-12.jpg', isMain: true }],
  },
  {
    _id: 'wish-8',
    slug: 'metallic-gold-pom-pom-fringe',
    title: 'Golden Tassel Fringe Trim',
    size: '6 cm',
    price: 450,
    unit: 'Meter',
    rating: 4.9,
    reviewCount: 60,
    image: '/images/provided-crystal-fringe.jpg',
    images: [{ url: '/images/provided-crystal-fringe.jpg', isMain: true }],
  },
];

function loadWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const seeded = localStorage.getItem(SEEDED_KEY);
    if (!seeded && (!raw || raw === '[]')) {
      localStorage.setItem(SEEDED_KEY, 'true');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_WISHLIST_ITEMS));
      return DEFAULT_WISHLIST_ITEMS;
    }
    return JSON.parse(raw || '[]');
  } catch {
    return DEFAULT_WISHLIST_ITEMS;
  }
}

export function WishlistProvider({ children }) {
  const [products, setProducts] = useState(loadWishlist);
  const [loading] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const isWishlisted = useCallback(
    (itemOrId) => {
      const id = typeof itemOrId === 'object' ? itemOrId?._id || itemOrId?.productId : itemOrId;
      return products.some((p) => String(p._id) === String(id) || String(p.slug) === String(id));
    },
    [products]
  );

  const toggleWishlist = useCallback((itemOrId) => {
    setProducts((prev) => {
      const id = typeof itemOrId === 'object' ? itemOrId?._id || itemOrId?.productId || itemOrId?.slug : itemOrId;
      const exists = prev.some((p) => String(p._id) === String(id) || String(p.slug) === String(id));
      if (exists) {
        return prev.filter((p) => String(p._id) !== String(id) && String(p.slug) !== String(id));
      }
      if (typeof itemOrId === 'object' && itemOrId !== null) {
        const image =
          itemOrId.image ||
          itemOrId.images?.find((i) => i.isMain)?.url ||
          itemOrId.images?.[0]?.url ||
          '/images/product-1.jpg';
        return [
          ...prev,
          {
            _id: id,
            slug: itemOrId.slug || String(id),
            title: itemOrId.title || 'ARC LEGACY Trim',
            size: itemOrId.size || '3 cm',
            price: itemOrId.price || 280,
            unit: itemOrId.unit || 'Meter',
            rating: itemOrId.rating || 4.8,
            reviewCount: itemOrId.reviewCount || 64,
            image,
            images: [{ url: image, isMain: true }],
          },
        ];
      }
      return prev;
    });
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => String(p._id) !== String(id) && String(p.slug) !== String(id)));
  }, []);

  const value = useMemo(
    () => ({
      products,
      count: products.length,
      loading,
      isWishlisted,
      toggleWishlist,
      removeFromWishlist,
      setProducts,
    }),
    [products, loading, isWishlisted, toggleWishlist, removeFromWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
