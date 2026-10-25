const PRICE_RANGES = [
  { label: 'Under ₹200', min: 0, max: 200 },
  { label: '₹200 – ₹350', min: 200, max: 350 },
  { label: '₹350 – ₹500', min: 350, max: 500 },
  { label: 'Above ₹500', min: 500, max: 99999 },
];

const MATERIALS = ['Pearl', 'Beads', 'Thread', 'Metal', 'Fabric', 'Mirror Work'];
const STYLES = ['Bridal', 'Traditional', 'Contemporary', 'Designer', 'Tassel'];

export default function CategoryFilters({ filters, onChange, onClear }) {
  const set = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <aside className="space-y-6 rounded-xl border border-neutral-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg text-maroon">Filters</h3>
        <button type="button" onClick={onClear} className="text-xs text-maroon underline">
          Clear
        </button>
      </div>

      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase text-neutral-500">Price</h4>
        <div className="space-y-2">
          {PRICE_RANGES.map((r) => (
            <label key={r.label} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="price"
                checked={filters.priceRange?.min === r.min && filters.priceRange?.max === r.max}
                onChange={() => onChange({ ...filters, priceRange: { min: r.min, max: r.max } })}
              />
              {r.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase text-neutral-500">Material</h4>
        <div className="space-y-2">
          {MATERIALS.map((m) => (
            <label key={m} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.material?.includes(m)}
                onChange={(e) => {
                  const setMat = new Set(filters.material || []);
                  if (e.target.checked) setMat.add(m);
                  else setMat.delete(m);
                  set('material', [...setMat]);
                }}
              />
              {m}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase text-neutral-500">Style</h4>
        <div className="space-y-2">
          {STYLES.map((s) => (
            <label key={s} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.style?.includes(s)}
                onChange={(e) => {
                  const setSt = new Set(filters.style || []);
                  if (e.target.checked) setSt.add(s);
                  else setSt.delete(s);
                  set('style', [...setSt]);
                }}
              />
              {s}
            </label>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={filters.inStock}
          onChange={(e) => set('inStock', e.target.checked)}
        />
        In stock only
      </label>
    </aside>
  );
}
