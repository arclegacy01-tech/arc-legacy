import ProductCard from './ProductCard.jsx';

export default function ProductGrid({
  products,
  emptyMessage = 'No products found.',
  columns = 4,
  variant = 'default',
}) {
  if (!products?.length) {
    return <p className="py-16 text-center text-neutral-500">{emptyMessage}</p>;
  }

  const colClass =
    columns === 6
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
      : columns === 3
        ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
        : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';

  return (
    <div className={`grid gap-4 md:gap-5 ${colClass}`}>
      {products.map((p) => (
        <ProductCard key={p._id} product={p} variant={variant} />
      ))}
    </div>
  );
}
