export default function StarRating({ value = 4.8 }) {
  const full = Math.round(value);
  return (
    <span className="inline-flex items-center gap-1 text-[11px]">
      <span className="text-gold tracking-tight">
        {'★'.repeat(full)}{'☆'.repeat(5 - full)}
      </span>
      <span className="text-neutral-500">{value.toFixed(1)}</span>
    </span>
  );
}
