/**
 * Category & Subcategory Master Hierarchy for ARC LEGACY
 * Mirrors the MongoDB Category model with parent-child relationships.
 */
export const CATEGORY_HIERARCHY = [
  {
    id: 'laces',
    name: 'Laces',
    slug: 'laces',
    subcategories: [
      { id: 'laces-border-lace', name: 'Border Lace', slug: 'laces-border-lace' },
      { id: 'laces-crochet-lace', name: 'Crochet Lace', slug: 'laces-crochet-lace' },
      { id: 'laces-fancy-lace', name: 'Fancy Lace', slug: 'laces-fancy-lace' },
      { id: 'laces-cotton-lace', name: 'Cotton Lace', slug: 'laces-cotton-lace' },
      { id: 'laces-zari-lace', name: 'Zari Lace', slug: 'laces-zari-lace' },
      { id: 'laces-velvet-lace', name: 'Velvet Lace', slug: 'laces-velvet-lace' },
      { id: 'laces-pearl-lace', name: 'Pearl Lace', slug: 'laces-pearl-lace' },
      { id: 'laces-embroidered-lace', name: 'Embroidered Lace', slug: 'laces-embroidered-lace' },
      { id: 'laces-bridal-lace', name: 'Bridal Lace', slug: 'laces-bridal-lace' },
    ],
  },
  {
    id: 'latkans',
    name: 'Latkans',
    slug: 'latkans',
    subcategories: [
      { id: 'latkans-traditional', name: 'Traditional Latkans', slug: 'latkans-traditional' },
      { id: 'latkans-designer', name: 'Designer Latkans', slug: 'latkans-designer' },
      { id: 'latkans-bridal', name: 'Bridal Latkans', slug: 'latkans-bridal' },
      { id: 'latkans-beaded', name: 'Beaded Latkans', slug: 'latkans-beaded' },
      { id: 'latkans-tassel', name: 'Tassel Latkans', slug: 'latkans-tassel' },
      { id: 'latkans-pompom', name: 'Pom-Pom Latkans', slug: 'latkans-pompom' },
      { id: 'latkans-pearl', name: 'Pearl Latkans', slug: 'latkans-pearl' },
      { id: 'latkans-fabric', name: 'Fabric Latkans', slug: 'latkans-fabric' },
      { id: 'latkans-mirror-work', name: 'Mirror Work Latkans', slug: 'latkans-mirror-work' },
      { id: 'latkans-kundan', name: 'Kundan Latkans', slug: 'latkans-kundan' },
    ],
  },
  {
    id: 'trims-borders',
    name: 'Trims & Borders',
    slug: 'trims-borders',
    subcategories: [
      { id: 'tb-zari-borders', name: 'Zari Borders', slug: 'tb-zari-borders' },
      { id: 'tb-sequin-borders', name: 'Sequin Borders', slug: 'tb-sequin-borders' },
      { id: 'tb-embroidered-borders', name: 'Embroidered Borders', slug: 'tb-embroidered-borders' },
      { id: 'tb-mirror-work-borders', name: 'Mirror Work Borders', slug: 'tb-mirror-work-borders' },
      { id: 'tb-gota-patti-borders', name: 'Gota Patti Borders', slug: 'tb-gota-patti-borders' },
      { id: 'tb-stone-work-borders', name: 'Stone Work Borders', slug: 'tb-stone-work-borders' },
      { id: 'tb-scalloped-borders', name: 'Scalloped Borders', slug: 'tb-scalloped-borders' },
    ],
  },
  {
    id: 'pom-pom-trims',
    name: 'Pom Pom Trims',
    slug: 'pom-pom-trims',
    subcategories: [
      { id: 'pom-multicolour', name: 'Multicolour Pom Poms', slug: 'pom-multicolour' },
      { id: 'pom-mini-lace', name: 'Mini Pom Pom Lace', slug: 'pom-mini-lace' },
      { id: 'pom-tassel-trim', name: 'Tassel Pom Pom Trim', slug: 'pom-tassel-trim' },
      { id: 'pom-shell-trim', name: 'Shell & Pom Pom Trim', slug: 'pom-shell-trim' },
      { id: 'pom-metallic', name: 'Metallic Pom Pom', slug: 'pom-metallic' },
      { id: 'pom-velvet-border', name: 'Velvet Pom Pom Border', slug: 'pom-velvet-border' },
      { id: 'pom-bridal-border', name: 'Bridal Pom Pom Border', slug: 'pom-bridal-border' },
    ],
  },
  {
    id: 'gota-patti',
    name: 'Gota Patti',
    slug: 'gota-patti',
    subcategories: [
      { id: 'gp-lace', name: 'Gota Patti Lace', slug: 'gp-lace' },
      { id: 'gp-ribbon', name: 'Gota Ribbon', slug: 'gp-ribbon' },
      { id: 'gp-scalloped-borders', name: 'Scalloped Gota Borders', slug: 'gp-scalloped-borders' },
      { id: 'gp-floral', name: 'Floral Gota Patti', slug: 'gp-floral' },
      { id: 'gp-zari-gota', name: 'Zari & Gota Patti', slug: 'gp-zari-gota' },
      { id: 'gp-embroidered-border', name: 'Embroidered Gota Border', slug: 'gp-embroidered-border' },
    ],
  },
  {
    id: 'embellishments',
    name: 'Embellishments',
    slug: 'embellishments',
    subcategories: [
      { id: 'emb-gota-patti', name: 'Gota Patti', slug: 'emb-gota-patti' },
      { id: 'emb-sequins', name: 'Sequins', slug: 'emb-sequins' },
      { id: 'emb-beads', name: 'Beads', slug: 'emb-beads' },
      { id: 'emb-zari', name: 'Zari', slug: 'emb-zari' },
      { id: 'emb-patches-motifs', name: 'Patches & Motifs', slug: 'emb-patches-motifs' },
      { id: 'emb-mirrors-kundan', name: 'Mirrors & Kundan', slug: 'emb-mirrors-kundan' },
      { id: 'emb-fabric-flowers', name: 'Fabric Flowers', slug: 'emb-fabric-flowers' },
    ],
  },
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    slug: 'new-arrivals',
    subcategories: [
      { id: 'new-designer-specials', name: 'Designer Specials', slug: 'new-designer-specials' },
      { id: 'new-festive-collection', name: 'Festive Collection', slug: 'new-festive-collection' },
      { id: 'new-trending-laces', name: 'Trending Laces', slug: 'new-trending-laces' },
      { id: 'new-latest-latkans', name: 'Latest Latkans', slug: 'new-latest-latkans' },
    ],
  },
];

/**
 * Normalizes string comparison (e.g., "Laces" vs "laces" vs "Laces & Trims")
 */
function normalize(str) {
  return String(str || '')
    .trim()
    .toLowerCase()
    .replace(/&amp;/g, '&')
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Returns matching category from static hierarchy
 */
export function findCategoryByVal(val) {
  if (!val) return null;
  const n = normalize(val);
  return (
    CATEGORY_HIERARCHY.find(
      (c) => normalize(c.name) === n || normalize(c.slug) === n || normalize(c.id) === n
    ) || null
  );
}

/**
 * Returns subcategories list for a given category name, slug, or ID
 */
export function getSubcategoriesForCategory(categoryVal) {
  const cat = findCategoryByVal(categoryVal);
  return cat ? cat.subcategories : [];
}

