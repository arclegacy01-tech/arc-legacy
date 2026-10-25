import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../api/client.js';
import CmsEditor from '../../../components/admin/CmsEditor.jsx';

const SECTIONS = [
  {
    key: 'story-teaser',
    label: 'Story teaser (homepage)',
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'body', label: 'Body', type: 'textarea' },
      { name: 'imageUrl', label: 'Image URL' },
      { name: 'ctaLabel', label: 'CTA label' },
      { name: 'ctaLink', label: 'CTA link' },
      { name: 'enabled', label: 'Show on homepage', type: 'checkbox' },
    ],
  },
  {
    key: 'promo-banner',
    label: 'Promo banner fallback text',
    fields: [
      { name: 'title', label: 'Title (used if no promo banner CMS item)' },
      { name: 'subtitle', label: 'Subtitle' },
      { name: 'ctaLabel', label: 'CTA label' },
      { name: 'ctaLink', label: 'CTA link' },
      { name: 'enabled', label: 'Enabled', type: 'checkbox' },
    ],
  },
];

export default function AdminHomepagePage() {
  const [data, setData] = useState({});
  const [activeKey, setActiveKey] = useState('story-teaser');

  useEffect(() => {
    api('/cms/homepage-sections').then((d) => {
      const map = {};
      d.items.forEach((i) => { map[i.key] = i; });
      setData(map);
    });
  }, []);

  const section = SECTIONS.find((s) => s.key === activeKey);
  const initial = data[activeKey] || { key: activeKey, enabled: true };

  const save = async (form) => {
    await api(`/cms/homepage-sections/${activeKey}`, { method: 'PUT', body: JSON.stringify({ ...form, key: activeKey }) });
    const d = await api('/cms/homepage-sections');
    const map = {};
    d.items.forEach((i) => { map[i.key] = i; });
    setData(map);
  };

  return (
    <div>
      <Link to="/admin/content" className="text-sm text-maroon">← Content</Link>
      <h2 className="mt-2 font-serif text-2xl text-maroon">Homepage sections</h2>
      <div className="mt-4 flex gap-2">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            type="button"
            className={`rounded-full px-4 py-1 text-xs ${activeKey === s.key ? 'bg-maroon text-white' : 'border'}`}
            onClick={() => setActiveKey(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="mt-6 max-w-xl">
        <CmsEditor title={section.label} fields={section.fields} initial={initial} onSave={save} onCancel={() => {}} />
      </div>
      <p className="mt-4 text-xs text-neutral-500">Hero slides are managed under Banners (placement: Homepage hero). Promo band image uses Banners with placement Homepage promo.</p>
    </div>
  );
}
