import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

export default function CloudinaryUploadField({ label, value, onChange }) {
  const [config, setConfig] = useState({ enabled: false });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/uploads/config').then(setConfig).catch(() => setConfig({ enabled: false }));
  }, []);

  const upload = async (file) => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const sign = await api('/uploads/sign', { method: 'POST', body: '{}' });
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', sign.apiKey);
      formData.append('timestamp', String(sign.timestamp));
      formData.append('signature', sign.signature);
      formData.append('folder', sign.folder);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Upload failed');
      onChange(data.secure_url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="block text-sm">
      {label}
      <input className="input-field mt-1" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="Image URL" />
      {config.enabled && (
        <div className="mt-2">
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(e) => upload(e.target.files?.[0])}
            className="text-xs"
          />
          {uploading && <span className="ml-2 text-xs text-neutral-500">Uploading…</span>}
        </div>
      )}
      {!config.enabled && (
        <p className="mt-1 text-xs text-neutral-500">Set Cloudinary env vars on the server to enable direct upload.</p>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {value && <img src={value} alt="" className="mt-2 h-24 rounded-lg object-cover" />}
    </div>
  );
}
