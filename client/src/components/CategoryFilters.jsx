import { useState } from 'react';

/* ── Generic filter data (for non-embellishment pages) ── */
const PRICE_RANGES = [
  { label: 'Under ₹200', min: 0, max: 200 },
  { label: '₹200 – ₹350', min: 200, max: 350 },
  { label: '₹350 – ₹500', min: 350, max: 500 },
  { label: '₹500 – ₹800', min: 500, max: 800 },
  { label: 'Above ₹800', min: 800, max: 99999 },
];
const COLOURS = [
  { name: 'Gold', bg: '#C6A15B' },
  { name: 'Silver', bg: '#C5C5C5' },
  { name: 'Red', bg: '#8B2432' },
  { name: 'Green', bg: '#2F6B4F' },
  { name: 'Blue', bg: '#2C4C7C' },
  { name: 'Black', bg: '#1C1917' },
  { name: 'Multicolor', bg: 'linear-gradient(135deg,#C6A15B,#8B2432,#2C4C7C,#2F6B4F)' },
];
const WIDTHS = ['Up to 1 cm', '1–2 cm', '2–4 cm', '4–6 cm', 'Above 6 cm'];
const MATERIALS = ['Pearl', 'Beads', 'Thread', 'Metal', 'Fabric', 'Mirror Work'];
const STYLES = ['Bridal', 'Traditional', 'Contemporary', 'Designer', 'Tassel'];

/* ── Shared checkbox row ── */
function Check({ label, checked, onChange, count }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-2 py-0.5 text-sm text-neutral-700 hover:text-maroon transition-colors">
      <span className="flex items-center gap-2">
        <span
          className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition ${
            checked ? 'border-maroon bg-maroon' : 'border-neutral-300 bg-white'
          }`}
        >
          {checked && (
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="2 6 5 9 10 3" />
            </svg>
          )}
        </span>
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
        {label}
      </span>
      {count != null && <span className="text-xs text-neutral-400">({count})</span>}
    </label>
  );
}

/* ── Accordion section ── */
function AccordionSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-200 pb-4">
      <button
        type="button"
        className="flex w-full items-center justify-between py-3 text-sm font-semibold text-maroon"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {title}
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="mt-1 space-y-1.5">{children}</div>}
    </div>
  );
}

/* ── Configurable Accordion Filters (used by Embellishments & Latkans) ── */
function ConfiguredCategoryFilters({ filters, onChange, onClear, config }) {
  const toggle = (key, value) => {
    const current = new Set(filters[key] || []);
    if (current.has(value)) current.delete(value);
    else current.add(value);
    onChange({ ...filters, [key]: [...current] });
  };

  return (
    <aside>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-xl text-maroon">Filters</h3>
        {/* Filter icon */}
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-maroon/60" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      </div>

      <div className="space-y-0">
        {/* Price */}
        {config.priceRanges && (
          <AccordionSection title="Price" defaultOpen={true}>
            {config.priceRanges.map((range) => (
              <Check
                key={range.label}
                label={range.label}
                count={range.count}
                checked={filters.priceRange?.min === range.min && filters.priceRange?.max === range.max}
                onChange={() =>
                  onChange({
                    ...filters,
                    priceRange:
                      filters.priceRange?.min === range.min ? null : { min: range.min, max: range.max },
                  })
                }
              />
            ))}
          </AccordionSection>
        )}

        {/* Colour swatches */}
        {config.colours && (
          <AccordionSection title="Colour" defaultOpen={true}>
            <div className="flex flex-wrap gap-2 pt-1">
              {config.colours.map((colour) => {
                const active = filters.color?.includes(colour.name);
                return (
                  <button
                    key={colour.name}
                    type="button"
                    title={colour.name}
                    aria-label={colour.name}
                    aria-pressed={active}
                    onClick={() => toggle('color', colour.name)}
                    className={`h-6 w-6 rounded-full border-2 transition ${
                      active ? 'border-maroon ring-2 ring-maroon/30 ring-offset-1' : 'border-neutral-300 hover:border-gold'
                    }`}
                    style={{ background: colour.bg }}
                  />
                );
              })}
            </div>
          </AccordionSection>
        )}

        {/* Type (for Embellishments) */}
        {config.types && (
          <AccordionSection title={config.typeTitle || "Type"} defaultOpen={true}>
            {config.types.map((t) => (
              <Check
                key={t.name}
                label={t.name}
                count={t.count}
                checked={filters.type?.includes(t.name)}
                onChange={() => toggle('type', t.name)}
              />
            ))}
          </AccordionSection>
        )}

        {/* Material */}
        {config.materials && (
          <AccordionSection title={config.materialTitle || "Material"} defaultOpen={true}>
            {config.materials.map((m) => (
              <Check
                key={m.name}
                label={m.name}
                count={m.count}
                checked={filters.material?.includes(m.name)}
                onChange={() => toggle('material', m.name)}
              />
            ))}
          </AccordionSection>
        )}

        {/* Style (for Latkans) */}
        {config.styles && (
          <AccordionSection title="Style" defaultOpen={true}>
            {config.styles.map((s) => (
              <Check
                key={s.name}
                label={s.name}
                count={s.count}
                checked={filters.style?.includes(s.name)}
                onChange={() => toggle('style', s.name)}
              />
            ))}
          </AccordionSection>
        )}

        {/* Usage (for Embellishments) */}
        {config.usages && (
          <AccordionSection title="Usage" defaultOpen={true}>
            {config.usages.map((u) => (
              <Check
                key={u.name}
                label={u.name}
                count={u.count}
                checked={filters.usage?.includes(u.name)}
                onChange={() => toggle('usage', u.name)}
              />
            ))}
          </AccordionSection>
        )}

        {/* Availability (for Latkans) */}
        {config.availabilities && (
          <AccordionSection title="Availability" defaultOpen={true}>
            {config.availabilities.map((a) => (
              <Check
                key={a.name}
                label={a.name}
                count={a.count}
                checked={filters.inStock === a.value}
                onChange={() =>
                  onChange({
                    ...filters,
                    inStock: filters.inStock === a.value ? undefined : a.value,
                  })
                }
              />
            ))}
          </AccordionSection>
        )}
      </div>

      <button
        type="button"
        onClick={onClear}
        className="mt-5 w-full rounded bg-maroon py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-maroon/90 active:scale-95"
      >
        Clear Filters
      </button>
    </aside>
  );
}

/* ── Generic category filters (unchanged for other pages) ── */
function GenericFilters({ filters, onChange, onClear, counts }) {
  const toggle = (key, value) => {
    const current = new Set(filters[key] || []);
    if (current.has(value)) current.delete(value);
    else current.add(value);
    onChange({ ...filters, [key]: [...current] });
  };

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl text-maroon">Filters</h3>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-maroon">Price</h4>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <Check
              key={range.label}
              label={range.label}
              count={counts?.price?.[range.label]}
              checked={filters.priceRange?.min === range.min && filters.priceRange?.max === range.max}
              onChange={() =>
                onChange({
                  ...filters,
                  priceRange: filters.priceRange?.min === range.min ? null : { min: range.min, max: range.max },
                })
              }
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-maroon">Colour</h4>
        <div className="flex flex-wrap gap-2">
          {COLOURS.map((colour) => {
            const active = filters.color?.includes(colour.name);
            return (
              <button
                key={colour.name}
                type="button"
                title={colour.name}
                aria-label={colour.name}
                aria-pressed={active}
                onClick={() => toggle('color', colour.name)}
                className={`h-6 w-6 rounded-full border-2 transition ${active ? 'border-maroon ring-2 ring-maroon/30' : 'border-neutral-300'}`}
                style={{ background: colour.bg }}
              />
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-maroon">Width</h4>
        <div className="space-y-2">
          {WIDTHS.map((width) => (
            <Check key={width} label={width} checked={filters.width?.includes(width)} onChange={() => toggle('width', width)} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-maroon">Material</h4>
        <div className="space-y-2">
          {MATERIALS.map((material) => (
            <Check
              key={material}
              label={material}
              count={counts?.material?.[material]}
              checked={filters.material?.includes(material)}
              onChange={() => toggle('material', material)}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-maroon">Style</h4>
        <div className="space-y-2">
          {STYLES.map((style) => (
            <Check
              key={style}
              label={style}
              count={counts?.style?.[style]}
              checked={filters.style?.includes(style)}
              onChange={() => toggle('style', style)}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-maroon">Availability</h4>
        <Check
          label="In stock"
          checked={filters.inStock}
          onChange={() => onChange({ ...filters, inStock: !filters.inStock })}
        />
      </div>

      <button type="button" onClick={onClear} className="text-sm text-maroon underline">
        Clear Filters
      </button>
    </aside>
  );
}

/* ── Export: picks variant automatically ── */
export default function CategoryFilters({ filters, onChange, onClear, counts, variant, config }) {
  if (config) {
    return <ConfiguredCategoryFilters filters={filters} onChange={onChange} onClear={onClear} config={config} />;
  }
  return <GenericFilters filters={filters} onChange={onChange} onClear={onClear} counts={counts} />;
}
