import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

const SEARCH_PRODUCTS = [
  {
    _id: 'srch-1',
    slug: 'zari-embroidered-lace-trim',
    title: 'Premium Zari Embroidered Gold Lace (3 cm)',
    price: 280,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 124,
    category: 'Laces',
    material: 'Zari',
    width: '1 – 3 cm',
    color: 'Gold',
    inStock: true,
    image: '/images/product-1.jpg',
    images: [{ url: '/images/product-1.jpg', isMain: true }],
  },
  {
    _id: 'srch-2',
    slug: 'pearl-beaded-fringe-trim',
    title: 'Pearl Beaded Gold Lace (2.5 cm)',
    price: 320,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 96,
    category: 'Laces',
    material: 'Beads & Pearls',
    width: '1 – 3 cm',
    color: 'Gold',
    inStock: true,
    image: '/images/provided-pearl-lace.jpg',
    images: [{ url: '/images/provided-pearl-lace.jpg', isMain: true }],
  },
  {
    _id: 'srch-3',
    slug: 'golden-zari-embroidered-border',
    title: 'Floral Zari Border Trim (4 cm)',
    price: 350,
    unit: 'Meter',
    rating: 4.7,
    reviewCount: 82,
    category: 'Trims & Borders',
    material: 'Zari',
    width: '3 – 5 cm',
    color: 'Gold',
    inStock: true,
    image: '/images/provided-floral-lace.jpg',
    images: [{ url: '/images/provided-floral-lace.jpg', isMain: true }],
  },
  {
    _id: 'srch-4',
    slug: 'kundan-hanging-latkan',
    title: 'Designer Gold Latkan Trim (5 cm)',
    price: 420,
    unit: 'Meter',
    rating: 4.9,
    reviewCount: 110,
    category: 'Latkans',
    material: 'Beads & Pearls',
    width: '3 – 5 cm',
    color: 'Gold',
    inStock: true,
    image: '/images/product-5.jpg',
    images: [{ url: '/images/product-5.jpg', isMain: true }],
  },
  {
    _id: 'srch-5',
    slug: 'mirror-work-border',
    title: 'Mirror Work Gold Lace (3 cm)',
    price: 310,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 74,
    category: 'Laces',
    material: 'Metallic',
    width: '1 – 3 cm',
    color: 'Gold',
    inStock: true,
    image: '/images/product-7.jpg',
    images: [{ url: '/images/product-7.jpg', isMain: true }],
  },
  {
    _id: 'srch-6',
    slug: 'golden-gota-patti-lace',
    title: 'Traditional Gota Patti Lace (2 cm)',
    price: 260,
    unit: 'Meter',
    rating: 4.7,
    reviewCount: 68,
    category: 'Gota Patti',
    material: 'Zari',
    width: '1 – 3 cm',
    color: 'Gold',
    inStock: true,
    image: '/images/product-6.jpg',
    images: [{ url: '/images/product-6.jpg', isMain: true }],
  },
  {
    _id: 'srch-7',
    slug: 'sequin-lace-border',
    title: 'Sequin Embroidered Lace (3.5 cm)',
    price: 290,
    unit: 'Meter',
    rating: 4.7,
    reviewCount: 52,
    category: 'Trims & Borders',
    material: 'Art Silk',
    width: '3 – 5 cm',
    color: 'Maroon',
    inStock: true,
    image: '/images/product-3.jpg',
    images: [{ url: '/images/product-3.jpg', isMain: true }],
  },
  {
    _id: 'srch-8',
    slug: 'maroon-velvet-sequins-border',
    title: 'Velvet Embroidered Border (4 cm)',
    price: 380,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 47,
    category: 'Trims & Borders',
    material: 'Velvet',
    width: '3 – 5 cm',
    color: 'Maroon',
    inStock: true,
    image: '/images/product-12.jpg',
    images: [{ url: '/images/product-12.jpg', isMain: true }],
  },
  {
    _id: 'srch-9',
    slug: 'metallic-gold-pom-pom-fringe',
    title: 'Golden Tassel Fringe Trim (6 cm)',
    price: 450,
    unit: 'Meter',
    rating: 4.9,
    reviewCount: 60,
    category: 'Trims & Borders',
    material: 'Metallic',
    width: 'Above 5 cm',
    color: 'Gold',
    inStock: true,
    image: '/images/provided-crystal-fringe.jpg',
    images: [{ url: '/images/provided-crystal-fringe.jpg', isMain: true }],
  },
  {
    _id: 'srch-10',
    slug: 'bridal-floral-gota-lace',
    title: 'Designer Bead & Zari Lace (3 cm)',
    price: 340,
    unit: 'Meter',
    rating: 4.7,
    reviewCount: 38,
    category: 'Laces',
    material: 'Zari',
    width: '1 – 3 cm',
    color: 'Gold',
    inStock: true,
    image: '/images/product-10.jpg',
    images: [{ url: '/images/product-10.jpg', isMain: true }],
  },
  {
    _id: 'srch-11',
    slug: 'floral-applique-patch',
    title: 'Golden Floral Applique Trim (2.5 cm)',
    price: 275,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 41,
    category: 'Embellishments',
    material: 'Organza',
    width: '1 – 3 cm',
    color: 'Gold',
    inStock: true,
    image: '/images/product-9.jpg',
    images: [{ url: '/images/product-9.jpg', isMain: true }],
  },
  {
    _id: 'srch-12',
    slug: 'narrow-gota-patti-edging',
    title: 'Designer Gold Braid Lace (1.5 cm)',
    price: 220,
    unit: 'Meter',
    rating: 4.7,
    reviewCount: 33,
    category: 'Laces',
    material: 'Zari',
    width: 'Below 1 cm',
    color: 'Gold',
    inStock: true,
    image: '/images/product-2.jpg',
    images: [{ url: '/images/product-2.jpg', isMain: true }],
  },
];

const RECENTLY_VIEWED_ITEMS = [
  {
    _id: 'rv-1',
    slug: 'pearl-beaded-fringe-trim',
    title: 'Pearl Beaded Gold Lace',
    size: '2.5 cm',
    price: 320,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 96,
    image: '/images/provided-pearl-lace.jpg',
  },
  {
    _id: 'rv-2',
    slug: 'kundan-hanging-latkan',
    title: 'Designer Gold Latkan Trim',
    size: '5 cm',
    price: 420,
    unit: 'Meter',
    rating: 4.9,
    reviewCount: 110,
    image: '/images/product-5.jpg',
  },
  {
    _id: 'rv-3',
    slug: 'mirror-work-border',
    title: 'Mirror Work Gold Lace',
    size: '3 cm',
    price: 310,
    unit: 'Meter',
    rating: 4.8,
    reviewCount: 74,
    image: '/images/product-7.jpg',
  },
  {
    _id: 'rv-4',
    slug: 'golden-gota-patti-lace',
    title: 'Traditional Gota Patti Lace',
    size: '2 cm',
    price: 260,
    unit: 'Meter',
    rating: 4.7,
    reviewCount: 68,
    image: '/images/product-6.jpg',
  },
];

const RECENT_TAGS = ['gold lace', 'latkans', 'mirror work lace', 'pearl trims'];
const POPULAR_HERO_TAGS = ['latkans', 'mirror work lace', 'pearl trims', 'pom pom trims', 'gota patti'];
const POPULAR_BOTTOM_TAGS = [
  'gold lace',
  'latkans',
  'mirror work lace',
  'pearl trims',
  'pom pom trims',
  'gota patti',
  'embellishments',
  'designer laces',
];

function BotanicalLineart({ className }) {
  return (
    <svg viewBox="0 0 220 400" className={className} fill="none" aria-hidden="true">
      <path d="M110 380 C110 380 60 320 40 250 C20 180 50 120 90 80 C130 40 160 20 180 10" stroke="#C9A227" strokeWidth="0.6" opacity="0.35" />
      <path d="M110 380 C110 380 160 320 180 250 C200 180 170 110 130 80 C90 50 60 30 40 20" stroke="#C9A227" strokeWidth="0.6" opacity="0.35" />
      <ellipse cx="90" cy="180" rx="28" ry="14" transform="rotate(-30 90 180)" stroke="#C9A227" strokeWidth="0.5" opacity="0.3" />
      <ellipse cx="130" cy="200" rx="28" ry="14" transform="rotate(30 130 200)" stroke="#C9A227" strokeWidth="0.5" opacity="0.3" />
      <ellipse cx="75" cy="240" rx="22" ry="11" transform="rotate(-45 75 240)" stroke="#C9A227" strokeWidth="0.5" opacity="0.25" />
      <ellipse cx="145" cy="155" rx="22" ry="11" transform="rotate(45 145 155)" stroke="#C9A227" strokeWidth="0.5" opacity="0.25" />
      <circle cx="110" cy="100" r="6" stroke="#C9A227" strokeWidth="0.6" opacity="0.4" />
    </svg>
  );
}

function StarRow({ rating = 4.8, count = 80 }) {
  return (
    <div className="mt-1 flex items-center gap-1">
      <div className="flex items-center text-[#D49A1A]">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className="h-3 w-3"
            fill={i <= Math.round(rating) ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <polygon points="10,1.5 12.6,6.8 18.5,7.6 14.2,11.8 15.2,17.6 10,14.8 4.8,17.6 5.8,11.8 1.5,7.6 7.4,6.8" />
          </svg>
        ))}
      </div>
      <span className="text-[11px] text-neutral-500">({count})</span>
    </div>
  );
}

function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-neutral-200/70 py-3.5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left font-serif text-sm font-semibold text-maroon"
      >
        <span>{title}</span>
        <svg
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 text-maroon transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="mt-2.5 space-y-1.5">{children}</div>}
    </div>
  );
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || 'gold lace';
  const [inputVal, setInputVal] = useState(queryParam);
  const [sort, setSort] = useState('relevance');
  const [page, setPage] = useState(1);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedWidths, setSelectedWidths] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);

  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  useEffect(() => {
    setInputVal(searchParams.get('q') || 'gold lace');
  }, [searchParams]);

  const toggleItem = (list, setList, value) => {
    setList((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPrice(null);
    setSelectedColor(null);
    setSelectedMaterials([]);
    setSelectedWidths([]);
    setSelectedStock(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    setSearchParams(trimmed ? { q: trimmed } : {});
  };

  const selectTag = (tag) => {
    setInputVal(tag);
    setSearchParams({ q: tag });
  };

  const filteredProducts = useMemo(() => {
    let list = [...SEARCH_PRODUCTS];
    if (selectedCategories.length) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedPrice) {
      list = list.filter((p) => p.price >= selectedPrice.min && p.price <= selectedPrice.max);
    }
    if (selectedColor) {
      list = list.filter((p) => p.color === selectedColor);
    }
    if (selectedMaterials.length) {
      list = list.filter((p) => selectedMaterials.includes(p.material));
    }
    if (selectedWidths.length) {
      list = list.filter((p) => selectedWidths.includes(p.width));
    }
    if (selectedStock !== null) {
      list = list.filter((p) => p.inStock === selectedStock);
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    return list;
  }, [selectedCategories, selectedPrice, selectedColor, selectedMaterials, selectedWidths, selectedStock, sort]);

  return (
    <div className="bg-cream">
      {/* ── Top Search Hero Banner ── */}
      <section className="relative overflow-hidden border-b border-neutral-200/80 bg-[#FAF3EB]">
        <img
          src="/images/home-mfg-rolls.jpg"
          alt="Search Results"
          className="absolute right-0 top-0 h-full w-full object-cover object-right md:w-[52%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF3EB] from-[38%] via-[#FAF3EB]/92 via-[58%] to-transparent to-[90%]" />
        <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-full w-28 opacity-45" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
          <p className="text-xs font-medium text-maroon">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-1.5 text-neutral-400">/</span>
            <span>Search results</span>
          </p>

          <h1 className="mt-2 font-serif text-3xl font-medium text-maroon md:text-4xl">
            Search Results for &lsquo;{queryParam}&rsquo;
          </h1>
          <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
            Discover exquisite trims for your next creation.
          </p>

          {/* Search Input Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-4 flex max-w-xl items-center overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-xs"
          >
            <span className="pl-3.5 text-neutral-400">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search for laces, latkans, trims, gota patti..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-xs text-neutral-800 outline-none sm:text-sm"
            />
            {inputVal && (
              <button
                type="button"
                onClick={() => setInputVal('')}
                aria-label="Clear search query"
                className="px-2.5 text-neutral-400 hover:text-maroon"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              aria-label="Search"
              className="flex h-10 w-11 items-center justify-center bg-maroon text-white transition hover:bg-maroon-dark"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
          </form>

          {/* Recent & Popular Searches Pills */}
          <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2.5 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-maroon">Recent Searches:</span>
              {RECENT_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => selectTag(tag)}
                  className="rounded-md border border-neutral-200/90 bg-white/95 px-2.5 py-1 text-[11px] font-medium text-neutral-700 shadow-2xs transition hover:border-maroon hover:text-maroon"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-maroon">Popular Searches:</span>
              {POPULAR_HERO_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => selectTag(tag)}
                  className="rounded-md border border-neutral-200/90 bg-white/95 px-2.5 py-1 text-[11px] font-medium text-neutral-700 shadow-2xs transition hover:border-maroon hover:text-maroon"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content: Sidebar Filters + 4-Col Product Grid ── */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid items-start gap-7 lg:grid-cols-[235px_1fr]">
          {/* Left Sidebar Filters */}
          <aside className="rounded-xl border border-neutral-200/80 bg-[#FFFCF9] p-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3">
              <div className="flex items-center gap-2 font-serif text-base font-semibold text-maroon">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-maroon" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                <span>Filters</span>
              </div>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-[11px] font-semibold text-maroon hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Category */}
            <FilterSection title="Category">
              {[
                { name: 'Laces', count: 18 },
                { name: 'Latkans', count: 6 },
                { name: 'Trims & Borders', count: 12 },
                { name: 'Pom Pom Trims', count: 4 },
                { name: 'Gota Patti', count: 5 },
                { name: 'Embellishments', count: 8 },
              ].map((cat) => (
                <label key={cat.name} className="flex cursor-pointer items-center gap-2 text-xs text-neutral-700">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => toggleItem(selectedCategories, setSelectedCategories, cat.name)}
                    className="h-3.5 w-3.5 rounded border-neutral-300 accent-maroon"
                  />
                  <span>
                    {cat.name} <span className="text-neutral-400">({cat.count})</span>
                  </span>
                </label>
              ))}
            </FilterSection>

            {/* Price (₹) */}
            <FilterSection title="Price (₹)">
              {[
                { label: 'Below ₹100', min: 0, max: 99, count: 8 },
                { label: '₹100 - ₹300', min: 100, max: 300, count: 24 },
                { label: '₹300 - ₹500', min: 300, max: 500, count: 10 },
                { label: '₹500 - ₹1,000', min: 500, max: 1000, count: 5 },
                { label: 'Above ₹1,000', min: 1001, max: 99999, count: 1 },
              ].map((r) => (
                <label key={r.label} className="flex cursor-pointer items-center gap-2 text-xs text-neutral-700">
                  <input
                    type="checkbox"
                    checked={selectedPrice?.label === r.label}
                    onChange={() => setSelectedPrice(selectedPrice?.label === r.label ? null : r)}
                    className="h-3.5 w-3.5 rounded border-neutral-300 accent-maroon"
                  />
                  <span>
                    {r.label} <span className="text-neutral-400">({r.count})</span>
                  </span>
                </label>
              ))}
            </FilterSection>

            {/* Colour */}
            <FilterSection title="Colour">
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {[
                  { name: 'Gold', bg: '#E2B45A' },
                  { name: 'Silver', bg: '#C8CBCF' },
                  { name: 'Pink', bg: '#E07A9B' },
                  { name: 'Maroon', bg: '#A61C3C' },
                  { name: 'Green', bg: '#007944' },
                  { name: 'Blue', bg: '#154C99' },
                  { name: 'Black', bg: '#222222' },
                ].map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    title={c.name}
                    aria-label={c.name}
                    onClick={() => setSelectedColor(selectedColor === c.name ? null : c.name)}
                    className={`h-5 w-5 rounded-full border transition ${
                      selectedColor === c.name
                        ? 'scale-110 border-maroon ring-2 ring-maroon/30'
                        : 'border-neutral-300 hover:border-gold'
                    }`}
                    style={{ background: c.bg }}
                  />
                ))}
              </div>
            </FilterSection>

            {/* Material */}
            <FilterSection title="Material">
              {[
                { name: 'Zari', count: 20 },
                { name: 'Art Silk', count: 8 },
                { name: 'Organza', count: 6 },
                { name: 'Velvet', count: 4 },
                { name: 'Metallic', count: 8 },
                { name: 'Beads & Pearls', count: 6 },
              ].map((m) => (
                <label key={m.name} className="flex cursor-pointer items-center gap-2 text-xs text-neutral-700">
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(m.name)}
                    onChange={() => toggleItem(selectedMaterials, setSelectedMaterials, m.name)}
                    className="h-3.5 w-3.5 rounded border-neutral-300 accent-maroon"
                  />
                  <span>
                    {m.name} <span className="text-neutral-400">({m.count})</span>
                  </span>
                </label>
              ))}
            </FilterSection>

            {/* Width */}
            <FilterSection title="Width">
              {[
                { name: 'Below 1 cm', count: 6 },
                { name: '1 – 3 cm', count: 18 },
                { name: '3 – 5 cm', count: 16 },
                { name: 'Above 5 cm', count: 8 },
              ].map((w) => (
                <label key={w.name} className="flex cursor-pointer items-center gap-2 text-xs text-neutral-700">
                  <input
                    type="checkbox"
                    checked={selectedWidths.includes(w.name)}
                    onChange={() => toggleItem(selectedWidths, setSelectedWidths, w.name)}
                    className="h-3.5 w-3.5 rounded border-neutral-300 accent-maroon"
                  />
                  <span>
                    {w.name} <span className="text-neutral-400">({w.count})</span>
                  </span>
                </label>
              ))}
            </FilterSection>

            {/* Availability */}
            <FilterSection title="Availability">
              {[
                { name: 'In Stock', val: true, count: 45 },
                { name: 'Out of Stock', val: false, count: 3 },
              ].map((a) => (
                <label key={a.name} className="flex cursor-pointer items-center gap-2 text-xs text-neutral-700">
                  <input
                    type="checkbox"
                    checked={selectedStock === a.val}
                    onChange={() => setSelectedStock(selectedStock === a.val ? null : a.val)}
                    className="h-3.5 w-3.5 rounded border-neutral-300 accent-maroon"
                  />
                  <span>
                    {a.name} <span className="text-neutral-400">({a.count})</span>
                  </span>
                </label>
              ))}
            </FilterSection>

            {/* Sidebar Action Buttons */}
            <div className="mt-4 space-y-2">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-1.5 rounded-md bg-maroon py-2 text-xs font-semibold text-white transition hover:bg-maroon-dark"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Apply Filters
              </button>
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex w-full items-center justify-center gap-1.5 rounded-md border border-neutral-300 bg-white py-2 text-xs font-medium text-neutral-700 transition hover:border-maroon hover:text-maroon"
              >
                <span>↻</span> Clear All
              </button>
            </div>
          </aside>

          {/* Right Column: Products + Pagination + Promo Banner */}
          <div>
            {/* Top Count & Sort Bar */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600">
              <span>Showing 1 – {filteredProducts.length} of 48 products</span>
              <label className="flex items-center gap-2">
                <span>Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-800 outline-none focus:border-maroon"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </label>
            </div>

            {/* 4-Column Product Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => {
                const wished = isWishlisted(product._id);
                return (
                  <article
                    key={product._id}
                    className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200/80 bg-white shadow-2xs transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF5EF]">
                      <Link to={`/product/${product.slug}`} className="block h-full w-full">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product)}
                        aria-label="Toggle wishlist"
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-maroon shadow-xs transition hover:scale-105"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5"
                          fill={wished ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-3">
                      <div>
                        <Link
                          to={`/product/${product.slug}`}
                          className="line-clamp-2 text-xs font-semibold leading-snug text-neutral-900 hover:text-maroon"
                        >
                          {product.title}
                        </Link>
                        <p className="mt-1.5 text-xs font-bold text-maroon sm:text-sm">
                          ₹{product.price}{' '}
                          <span className="font-normal text-neutral-500">/ {product.unit}</span>
                        </p>
                        <StarRow rating={product.rating} count={product.reviewCount} />
                      </div>

                      <button
                        type="button"
                        onClick={() => addItem(product, 1)}
                        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded bg-maroon py-2 text-xs font-medium text-white transition hover:bg-maroon-dark active:scale-[0.99]"
                      >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white text-xs text-neutral-600 hover:border-maroon hover:text-maroon"
              >
                «
              </button>
              {[1, 2, 3, 4].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 rounded text-xs font-semibold transition ${
                    page === p
                      ? 'bg-maroon text-white shadow-2xs'
                      : 'border border-neutral-200 bg-white text-neutral-700 hover:border-maroon hover:text-maroon'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(4, p + 1))}
                className="flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white text-xs text-neutral-600 hover:border-maroon hover:text-maroon"
              >
                »
              </button>
            </div>

            {/* Inline Promo Banner ("Find Your Perfect Finish") */}
            <div className="relative mt-7 overflow-hidden rounded-xl border border-gold/30 bg-[#FAF3EB] shadow-xs">
              <img
                src="/images/home-story-lace.jpg"
                alt="Find Your Perfect Finish"
                className="h-44 w-full object-cover object-left sm:h-48 md:w-[55%]"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#FAF3EB] from-[45%] via-[#FAF3EB]/92 via-[62%] to-transparent" />
              <BotanicalLineart className="pointer-events-none absolute right-0 top-0 h-full w-24 -scale-x-100 opacity-45" />
              <div className="absolute inset-y-0 right-0 flex w-full flex-col justify-center px-6 md:w-[58%] md:px-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                  EXPLORE OUR COLLECTION
                </p>
                <h2 className="mt-1 font-serif text-2xl font-medium text-maroon sm:text-3xl">
                  Find Your Perfect Finish
                </h2>
                <p className="mt-1 text-xs text-neutral-600">
                  Explore our handcrafted trims, borders and embellishments.
                </p>
                <Link
                  to="/category/trims-borders"
                  className="btn-primary mt-3.5 w-fit px-4 py-2 text-[11px] tracking-wider"
                >
                  SHOP ALL TRIMS →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom Popular Searches Strip ── */}
      <section className="mx-auto max-w-7xl px-4 pb-6">
        <div className="flex flex-wrap items-center gap-3 border-y border-neutral-200/80 py-4">
          <div className="flex items-center gap-2 font-serif text-lg font-medium text-maroon">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-maroon" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span>Popular Searches</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {POPULAR_BOTTOM_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => selectTag(tag)}
                className="rounded-md border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 shadow-2xs transition hover:border-maroon hover:text-maroon"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recently Viewed (4 Horizontal Cards) ── */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-serif text-lg font-medium text-maroon sm:text-xl">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-maroon" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>Recently Viewed</span>
          </div>
          <Link to="/new-arrivals" className="text-xs font-semibold text-maroon hover:underline">
            View All →
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RECENTLY_VIEWED_ITEMS.map((item) => {
            const wished = isWishlisted(item._id);
            return (
              <div
                key={item._id}
                className="flex items-center gap-3 rounded-lg border border-neutral-200/80 bg-white p-2.5 shadow-2xs transition hover:shadow-md"
              >
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-md bg-[#FAF5EF]">
                  <Link to={`/product/${item.slug}`} className="block h-full w-full">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(item)}
                    aria-label="Toggle wishlist"
                    className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white/95 text-maroon shadow-2xs"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3"
                      fill={wished ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
                    </svg>
                  </button>
                </div>

                <div className="min-w-0 flex-1">
                  <Link
                    to={`/product/${item.slug}`}
                    className="block truncate text-xs font-semibold text-neutral-900 hover:text-maroon"
                  >
                    {item.title}
                  </Link>
                  <p className="text-[11px] text-neutral-500">({item.size})</p>
                  <p className="mt-0.5 text-xs font-bold text-maroon">
                    ₹{item.price} <span className="font-normal text-neutral-500">/ {item.unit}</span>
                  </p>
                  <StarRow rating={item.rating} count={item.reviewCount} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
