const KEY = 'arc_recently_viewed';
const MAX = 8;

export function getRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function addRecentlyViewed(product) {
  if (!product?._id) return;
  const entry = {
    _id: product._id,
    slug: product.slug,
    title: product.title,
    price: product.price,
    unit: product.unit,
    rating: product.rating,
    image: product.images?.find((i) => i.isMain)?.url || product.images?.[0]?.url,
  };
  const list = getRecentlyViewed().filter((p) => p._id !== product._id);
  list.unshift(entry);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
}
