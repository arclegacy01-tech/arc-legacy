import { Category } from '../models/Category.js';

export const DEFAULT_CATEGORY_HIERARCHY = [
  {
    name: 'Laces',
    slug: 'laces',
    sortOrder: 1,
    subcategories: [
      { name: 'Border Lace', slug: 'laces-border-lace', sortOrder: 1 },
      { name: 'Crochet Lace', slug: 'laces-crochet-lace', sortOrder: 2 },
      { name: 'Fancy Lace', slug: 'laces-fancy-lace', sortOrder: 3 },
      { name: 'Cotton Lace', slug: 'laces-cotton-lace', sortOrder: 4 },
      { name: 'Zari Lace', slug: 'laces-zari-lace', sortOrder: 5 },
      { name: 'Velvet Lace', slug: 'laces-velvet-lace', sortOrder: 6 },
      { name: 'Pearl Lace', slug: 'laces-pearl-lace', sortOrder: 7 },
      { name: 'Embroidered Lace', slug: 'laces-embroidered-lace', sortOrder: 8 },
      { name: 'Bridal Lace', slug: 'laces-bridal-lace', sortOrder: 9 },
    ],
  },
  {
    name: 'Latkans',
    slug: 'latkans',
    sortOrder: 2,
    subcategories: [
      { name: 'Traditional Latkans', slug: 'latkans-traditional', sortOrder: 1 },
      { name: 'Designer Latkans', slug: 'latkans-designer', sortOrder: 2 },
      { name: 'Bridal Latkans', slug: 'latkans-bridal', sortOrder: 3 },
      { name: 'Beaded Latkans', slug: 'latkans-beaded', sortOrder: 4 },
      { name: 'Tassel Latkans', slug: 'latkans-tassel', sortOrder: 5 },
      { name: 'Pom-Pom Latkans', slug: 'latkans-pompom', sortOrder: 6 },
      { name: 'Pearl Latkans', slug: 'latkans-pearl', sortOrder: 7 },
      { name: 'Fabric Latkans', slug: 'latkans-fabric', sortOrder: 8 },
      { name: 'Mirror Work Latkans', slug: 'latkans-mirror-work', sortOrder: 9 },
      { name: 'Kundan Latkans', slug: 'latkans-kundan', sortOrder: 10 },
    ],
  },
  {
    name: 'Trims & Borders',
    slug: 'trims-borders',
    sortOrder: 3,
    subcategories: [
      { name: 'Zari Borders', slug: 'tb-zari-borders', sortOrder: 1 },
      { name: 'Sequin Borders', slug: 'tb-sequin-borders', sortOrder: 2 },
      { name: 'Embroidered Borders', slug: 'tb-embroidered-borders', sortOrder: 3 },
      { name: 'Mirror Work Borders', slug: 'tb-mirror-work-borders', sortOrder: 4 },
      { name: 'Gota Patti Borders', slug: 'tb-gota-patti-borders', sortOrder: 5 },
      { name: 'Stone Work Borders', slug: 'tb-stone-work-borders', sortOrder: 6 },
      { name: 'Scalloped Borders', slug: 'tb-scalloped-borders', sortOrder: 7 },
    ],
  },
  {
    name: 'Pom Pom Trims',
    slug: 'pom-pom-trims',
    sortOrder: 4,
    subcategories: [
      { name: 'Multicolour Pom Poms', slug: 'pom-multicolour', sortOrder: 1 },
      { name: 'Mini Pom Pom Lace', slug: 'pom-mini-lace', sortOrder: 2 },
      { name: 'Tassel Pom Pom Trim', slug: 'pom-tassel-trim', sortOrder: 3 },
      { name: 'Shell & Pom Pom Trim', slug: 'pom-shell-trim', sortOrder: 4 },
      { name: 'Metallic Pom Pom', slug: 'pom-metallic', sortOrder: 5 },
      { name: 'Velvet Pom Pom Border', slug: 'pom-velvet-border', sortOrder: 6 },
      { name: 'Bridal Pom Pom Border', slug: 'pom-bridal-border', sortOrder: 7 },
    ],
  },
  {
    name: 'Gota Patti',
    slug: 'gota-patti',
    sortOrder: 5,
    subcategories: [
      { name: 'Gota Patti Lace', slug: 'gp-lace', sortOrder: 1 },
      { name: 'Gota Ribbon', slug: 'gp-ribbon', sortOrder: 2 },
      { name: 'Scalloped Gota Borders', slug: 'gp-scalloped-borders', sortOrder: 3 },
      { name: 'Floral Gota Patti', slug: 'gp-floral', sortOrder: 4 },
      { name: 'Zari & Gota Patti', slug: 'gp-zari-gota', sortOrder: 5 },
      { name: 'Embroidered Gota Border', slug: 'gp-embroidered-border', sortOrder: 6 },
    ],
  },
  {
    name: 'Embellishments',
    slug: 'embellishments',
    sortOrder: 6,
    subcategories: [
      { name: 'Gota Patti', slug: 'emb-gota-patti', sortOrder: 1 },
      { name: 'Sequins', slug: 'emb-sequins', sortOrder: 2 },
      { name: 'Beads', slug: 'emb-beads', sortOrder: 3 },
      { name: 'Zari', slug: 'emb-zari', sortOrder: 4 },
      { name: 'Patches & Motifs', slug: 'emb-patches-motifs', sortOrder: 5 },
      { name: 'Mirrors & Kundan', slug: 'emb-mirrors-kundan', sortOrder: 6 },
      { name: 'Fabric Flowers', slug: 'emb-fabric-flowers', sortOrder: 7 },
    ],
  },
  {
    name: 'New Arrivals',
    slug: 'new-arrivals',
    sortOrder: 7,
    subcategories: [
      { name: 'Designer Specials', slug: 'new-designer-specials', sortOrder: 1 },
      { name: 'Festive Collection', slug: 'new-festive-collection', sortOrder: 2 },
      { name: 'Trending Laces', slug: 'new-trending-laces', sortOrder: 3 },
      { name: 'Latest Latkans', slug: 'new-latest-latkans', sortOrder: 4 },
    ],
  },
];

/**
 * Ensures all standard main categories and their subcategories exist in MongoDB
 * without duplicating any existing records.
 */
export async function ensureCategoriesAndSubcategories() {
  try {
    for (const item of DEFAULT_CATEGORY_HIERARCHY) {
      // Find or create main category
      let parentCat = await Category.findOne({
        $or: [{ slug: item.slug }, { name: item.name, parent: null }],
      });

      if (!parentCat) {
        parentCat = await Category.create({
          name: item.name,
          slug: item.slug,
          parent: null,
          sortOrder: item.sortOrder,
          isActive: true,
        });
      } else {
        // Ensure parent is null for main categories
        if (parentCat.parent) {
          parentCat.parent = null;
          await parentCat.save();
        }
      }

      // Check and insert subcategories
      if (item.subcategories && item.subcategories.length > 0) {
        for (const sub of item.subcategories) {
          const existingSub = await Category.findOne({
            $or: [
              { slug: sub.slug },
              { name: sub.name, parent: parentCat._id },
            ],
          });

          if (!existingSub) {
            await Category.create({
              name: sub.name,
              slug: sub.slug,
              parent: parentCat._id,
              sortOrder: sub.sortOrder,
              isActive: true,
            });
          } else if (!existingSub.parent || existingSub.parent.toString() !== parentCat._id.toString()) {
            existingSub.parent = parentCat._id;
            await existingSub.save();
          }
        }
      }
    }
  } catch (err) {
    console.warn('[ensureCategoriesAndSubcategories] Notice:', err.message);
  }
}

