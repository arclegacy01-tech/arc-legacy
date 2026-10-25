import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client.js';
import { useAuth } from './AuthContext.jsx';

const WishlistContext = createContext(null);
const GUEST_KEY = 'arc_wishlist_guest';

function loadGuest() {
  try {
    return JSON.parse(localStorage.getItem(GUEST_KEY) || '[]');
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [productIds, setProductIds] = useState(loadGuest);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshProducts = useCallback(async () => {
    if (user) {
      setLoading(true);
      try {
        const data = await api('/users/wishlist');
        setProducts(data.products);
        setProductIds(data.products.map((p) => p._id));
      } finally {
        setLoading(false);
      }
      return;
    }
    const ids = loadGuest();
    setProductIds(ids);
    if (!ids.length) {
      setProducts([]);
      return;
    }
    setLoading(true);
    try {
      const results = await Promise.all(
        ids.map((id) => api(`/products/${id}`).then((d) => d.product).catch(() => null))
      );
      setProducts(results.filter(Boolean));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const guest = loadGuest();
      if (guest.length) {
        api('/users/wishlist/sync', { method: 'PUT', body: JSON.stringify({ productIds: guest }) })
          .then(() => {
            localStorage.removeItem(GUEST_KEY);
            refreshProducts();
          })
          .catch(() => refreshProducts());
      } else {
        refreshProducts();
      }
    } else {
      refreshProducts();
    }
  }, [user, refreshProducts]);

  const isWishlisted = useCallback(
    (productId) => productIds.map(String).includes(String(productId)),
    [productIds]
  );

  const toggleWishlist = useCallback(
    async (productId) => {
      if (user) {
        if (isWishlisted(productId)) {
          await api(`/users/wishlist/${productId}`, { method: 'DELETE' });
        } else {
          await api(`/users/wishlist/${productId}`, { method: 'POST' });
        }
        await refreshProducts();
        return;
      }
      const next = isWishlisted(productId)
        ? productIds.filter((id) => id !== productId)
        : [...productIds, productId];
      setProductIds(next);
      localStorage.setItem(GUEST_KEY, JSON.stringify(next));
      await refreshProducts();
    },
    [user, isWishlisted, productIds, refreshProducts]
  );

  const value = useMemo(
    () => ({
      products,
      count: productIds.length,
      loading,
      isWishlisted,
      toggleWishlist,
      refreshProducts,
    }),
    [products, productIds.length, loading, isWishlisted, toggleWishlist, refreshProducts]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
