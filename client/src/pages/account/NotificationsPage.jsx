import { useEffect, useState } from 'react';
import { api } from '../../api/client.js';

const OPTIONS = [
  { key: 'orderUpdates', label: 'Order updates', desc: 'Shipping and delivery notifications' },
  { key: 'newArrivals', label: 'New arrivals', desc: 'Be first to see new collections' },
  { key: 'offers', label: 'Offers & discounts', desc: 'Exclusive deals for members' },
  { key: 'wishlistAlerts', label: 'Wishlist alerts', desc: 'Back in stock and price drops' },
];

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api('/users/profile').then((d) => setPrefs(d.user.notificationPreferences || {}));
  }, []);

  const toggle = async (key) => {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    await api('/users/notifications', { method: 'PATCH', body: JSON.stringify({ [key]: next[key] }) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="font-serif text-2xl text-maroon">Notifications</h2>
      {saved && <p className="mt-2 text-sm text-green-700">Preferences saved</p>}
      <ul className="mt-6 space-y-4">
        {OPTIONS.map((opt) => (
          <li key={opt.key} className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4">
            <div>
              <div className="font-medium text-sm">{opt.label}</div>
              <div className="text-xs text-neutral-500">{opt.desc}</div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={prefs[opt.key]}
              onClick={() => toggle(opt.key)}
              className={`h-7 w-12 rounded-full transition ${prefs[opt.key] ? 'bg-maroon' : 'bg-neutral-300'}`}
            >
              <span
                className={`block h-5 w-5 translate-x-1 rounded-full bg-white transition ${
                  prefs[opt.key] ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
