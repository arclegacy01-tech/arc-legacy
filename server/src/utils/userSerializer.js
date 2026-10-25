export function serializeUser(user, { full = false } = {}) {
  const base = {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    marketingOptIn: user.marketingOptIn,
  };
  if (!full) return base;
  return {
    ...base,
    addresses: user.addresses || [],
    wishlistIds: (user.wishlist || []).map((id) => id.toString()),
    notificationPreferences: user.notificationPreferences || {},
  };
}
