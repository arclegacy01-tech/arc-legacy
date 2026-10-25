export function publishedContentFilter() {
  const now = new Date();
  return {
    status: 'published',
    $and: [
      { $or: [{ publishAt: null }, { publishAt: { $exists: false } }, { publishAt: { $lte: now } }] },
    ],
  };
}

export function activeAnnouncementFilter() {
  const now = new Date();
  return {
    status: 'published',
    placement: 'top-bar',
    $and: [
      { $or: [{ startAt: null }, { startAt: { $exists: false } }, { startAt: { $lte: now } }] },
      { $or: [{ endAt: null }, { endAt: { $exists: false } }, { endAt: { $gte: now } }] },
    ],
  };
}
