import { Link } from 'react-router-dom';

export default function HomeSectionHeader({ title, viewAllTo }) {
  return (
    <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="font-serif text-2xl text-maroon md:text-3xl">{title}</h2>
      {viewAllTo && (
        <Link to={viewAllTo} className="text-sm font-medium text-maroon hover:underline">
          View All →
        </Link>
      )}
    </div>
  );
}
