import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'arc_cart';
const INIT_KEY = 'arc_cart_seeded_v1';

export const DEFAULT_CART_ITEMS = [
  {
    productId: 'cart-default-1',
    slug: 'pearl-beaded-fringe-trim',
    title: 'Pearl Beaded Gold Lace',
    size: '2.5 cm',
    price: 320,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 96,
    image: '/images/provided-pearl-lace.jpg',
    quantity: 2,
  },
  {
    productId: 'cart-default-2',
    slug: 'golden-zari-embroidered-border',
    title: 'Floral Zari Border Trim',
    size: '4 cm',
    price: 350,
    unit: 'Meter',
    rating: 4.7,
    reviewCount: 82,
    image: '/images/provided-floral-lace.jpg',
    quantity: 1,
  },
  {
    productId: 'cart-default-3',
    slug: 'multicolour-pom-pom-trim',
    title: 'Pom Pom Trim',
    size: '3 cm',
    price: 290,
    unit: 'Meter',
    rating: 4.7,
    reviewCount: 52,
    image: '/images/product-4.jpg',
    quantity: 3,
  },
  {
    productId: 'cart-default-4',
    slug: 'kundan-hanging-latkan',
    title: 'Designer Gold Latkan Trim',
    size: '5 cm',
    price: 420,
    unit: 'Meter',
    rating: 4.9,
    reviewCount: 110,
    image: '/images/product-5.jpg',
    quantity: 1,
  },
];

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const seeded = localStorage.getItem(INIT_KEY);
    if (!seeded && (!raw || raw === '[]')) {
      localStorage.setItem(INIT_KEY, 'true');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CART_ITEMS));
      return DEFAULT_CART_ITEMS;
    }
    return JSON.parse(raw || '[]');
  } catch {
    return DEFAULT_CART_ITEMS;
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const id = product._id || product.productId || product.slug;
      const idx = prev.findIndex((i) => i.productId === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      const image =
        product.image ||
        product.images?.find((img) => img.isMain)?.url ||
        product.images?.[0]?.url ||
        '/images/product-1.jpg';
      return [
        ...prev,
        {
          productId: id,
          slug: product.slug,
          title: product.title,
          size: product.size || '3 cm',
          price: product.price,
          unit: product.unit || 'Meter',
          rating: product.rating || 4.8,
          reviewCount: product.reviewCount || 64,
          image,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const clearCart = () => setItems([]);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const value = useMemo(
    () => ({ items, count, subtotal, addItem, updateQuantity, removeItem, clearCart, setItems }),
    [items, count, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
