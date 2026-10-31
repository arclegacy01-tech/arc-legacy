import { Link } from 'react-router-dom';

function DiamondStar() {
  return (
    <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 text-gold shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M8 0L9.4 6.6L16 8L9.4 9.4L8 16L6.6 9.4L0 8L6.6 6.6Z" />
    </svg>
  );
}

export default function HomeSectionHeader({ title, viewAllTo }) {
  return (
    <div className="relative mb-8 flex items-center justify-center">
      <div className="flex items-center gap-3 text-gold">
        <span className="hidden h-px w-12 bg-gold/80 sm:block md:w-20" />
        <DiamondStar />
        <h2 className="font-serif text-lg uppercase tracking-[0.22em] text-maroon md:text-2xl">{title}</h2>
        <DiamondStar />
        <span className="hidden h-px w-12 bg-gold/80 sm:block md:w-20" />
      </div>
      {viewAllTo && (
        <Link
          to={viewAllTo}
          className="group absolute right-0 inline-flex items-center gap-1 text-xs font-medium text-maroon hover:underline sm:text-sm"
        >
          <span>View All</span>
          <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </Link>
      )}
    </div>
  );
}
