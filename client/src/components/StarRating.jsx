export default function StarRating({ value = 4.8 }) {
  const full = Math.round(value);
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px]">
      <span className="inline-flex items-center gap-0.5 text-gold" aria-label={`${value.toFixed(1)} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            viewBox="0 0 20 20"
            className="h-3 w-3 shrink-0"
            fill={star <= full ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={star <= full ? '0' : '1.5'}
            aria-hidden="true"
          >
            <path d="M10 1.5l2.45 5.51 5.99.64-4.47 4.02 1.25 5.9-5.22-3-5.22 3 1.25-5.9-4.47-4.02 5.99-.64z" />
          </svg>
        ))}
      </span>
      <span className="text-neutral-500 font-medium">({value.toFixed(1)})</span>
    </span>
  );
}
