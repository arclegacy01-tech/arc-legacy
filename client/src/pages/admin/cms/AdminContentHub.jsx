import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../api/client.js';

const LINKS = [
  { to: '/admin/content/banners', label: 'Banners & Sliders', desc: 'Homepage hero and promo banners' },
  { to: '/admin/content/announcements', label: 'Announcements', desc: 'Top bar messages' },
  { to: '/admin/content/faqs', label: 'FAQs', desc: 'Contact and support questions' },
  { to: '/admin/content/homepage', label: 'Homepage Sections', desc: 'Story teaser and blocks' },
  { to: '/admin/content/blogs', label: 'Blogs & Articles', desc: 'Editorial content' },
  { to: '/admin/content/messages', label: 'Contact Messages', desc: 'Customer enquiries' },
];

export default function AdminContentHub() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api('/cms/stats').then(setStats).catch(() => {});
  }, []);

  return (
    <div>
      <h2 className="font-serif text-2xl text-maroon">Content Management</h2>
      <p className="mt-1 text-sm text-neutral-600">Manage banners, FAQs, announcements, and homepage content.</p>
      {stats && (
        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border bg-white p-4">
            <div className="text-xs uppercase text-neutral-500">Total items</div>
            <div className="text-2xl font-semibold text-maroon">{stats.total}</div>
          </div>
          <div className="rounded-xl border bg-white p-4">
            <div className="text-xs uppercase text-neutral-500">Published</div>
            <div className="text-2xl font-semibold text-maroon">{stats.published}</div>
          </div>
          <div className="rounded-xl border bg-white p-4">
            <div className="text-xs uppercase text-neutral-500">Banners</div>
            <div className="text-2xl font-semibold text-maroon">{stats.banners}</div>
          </div>
          <div className="rounded-xl border bg-white p-4">
            <div className="text-xs uppercase text-neutral-500">FAQs</div>
            <div className="text-2xl font-semibold text-maroon">{stats.faqs}</div>
          </div>
        </div>
      )}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-card transition hover:border-maroon/30"
          >
            <div className="font-medium text-maroon">{l.label}</div>
            <p className="mt-1 text-sm text-neutral-600">{l.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
