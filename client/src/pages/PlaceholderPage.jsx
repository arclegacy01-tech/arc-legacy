export default function PlaceholderPage({ title, description }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-serif text-3xl text-maroon">{title}</h1>
      <p className="mt-4 text-neutral-600">{description}</p>
    </div>
  );
}
