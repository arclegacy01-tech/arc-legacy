export function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function unitLabel(unit) {
  const map = { meter: 'Meter', pair: 'Pair', piece: 'Piece', pack: 'Pack' };
  return map[unit] || unit;
}
