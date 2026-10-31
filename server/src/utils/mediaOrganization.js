export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export const ALLOWED_IMAGE_FORMATS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);

const CATEGORY_NAME = /^[\p{L}\p{N}][\p{L}\p{N}&' .-]{1,48}$/u;

export function validateCategoryName(name) {
  const trimmed = String(name || '').trim().replace(/\s+/g, ' ');
  if (!CATEGORY_NAME.test(trimmed) || trimmed.includes('..') || /[/\\]/.test(trimmed)) {
    return {
      ok: false,
      message: 'Category name must be 2–49 characters and use letters, numbers, spaces, &, apostrophes, or hyphens',
    };
  }
  return { ok: true, name: trimmed };
}

export function assertSafeSlug(slug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(slug || ''))) {
    const error = new Error('Invalid category');
    error.status = 400;
    throw error;
  }
}

export function buildMediaLocation(baseFolder, slug) {
  assertSafeSlug(slug);
  const base = String(baseFolder || 'arc-legacy').replace(/^\/+|\/+$/g, '');
  if (!base || base.includes('..') || !/^[a-zA-Z0-9/_-]+$/.test(base)) {
    const error = new Error('Invalid Cloudinary folder configuration');
    error.status = 500;
    throw error;
  }
  const folder = `${base}/${slug}`;
  const tag = `cat_${slug.replace(/-/g, '_')}`;
  return { folder, tag };
}

export function publicIdMatchesFolder(publicId, folder) {
  if (typeof publicId !== 'string' || typeof folder !== 'string') return false;
  if (publicId.includes('..') || publicId.includes('\\')) return false;
  return publicId.startsWith(`${folder}/`) && publicId.length > folder.length + 1;
}

export function secureUrlMatchesCloud(secureUrl, cloudName) {
  if (!secureUrl || !cloudName) return false;
  try {
    const url = new URL(secureUrl);
    return url.protocol === 'https:' && url.hostname === 'res.cloudinary.com' && url.pathname.startsWith(`/${cloudName}/`);
  } catch {
    return false;
  }
}
