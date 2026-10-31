import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

const ACCEPT = 'image/jpeg,image/png,image/webp,image/gif,image/avif';

export default function CloudinaryUploadField({ label, value, onChange, categoryId, onUploaded }) {
  const [config, setConfig] = useState({ enabled: false });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api('/uploads/config').then(setConfig).catch(() => setConfig({ enabled: false }));
  }, []);

  const upload = async (file) => {
    if (!file) return;
    setError('');
    setSuccess('');
    if (!categoryId) {
      setError('Select a category before uploading.');
      return;
    }
    const allowed = new Set((config.formats || ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']).map((f) => f.toLowerCase()));
    const ext = file.name.split('.').pop()?.toLowerCase();
    const maxBytes = config.maxBytes || 5 * 1024 * 1024;
    if ((ext && !allowed.has(ext)) || (file.type && !file.type.startsWith('image/'))) {
      setError('Use a JPG, PNG, WEBP, GIF, or AVIF image.');
      return;
    }
    if (file.size > maxBytes) {
      setError('Image must be 5 MB or smaller.');
      return;
    }

    setUploading(true);
    try {
      const sign = await api('/uploads/sign', {
        method: 'POST',
        body: JSON.stringify({ categoryId }),
      });
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', sign.apiKey);
      formData.append('timestamp', String(sign.timestamp));
      formData.append('signature', sign.signature);
      formData.append('folder', sign.folder);
      formData.append('tags', sign.tags);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Upload failed');

      const saved = await api('/uploads/assets', {
        method: 'POST',
        body: JSON.stringify({ publicId: data.public_id, categoryId }),
      });
      onChange(saved.asset.secureUrl);
      onUploaded?.(saved.asset);
      setSuccess('Image uploaded to this category.');
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
            accept={ACCEPT}
            disabled={uploading || !categoryId}
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = '';
              upload(file);
            }}
            className="text-xs"
          />
          {uploading && <span className="ml-2 text-xs text-neutral-500">Uploading…</span>}
          {!categoryId && <p className="mt-1 text-xs text-neutral-500">Select a category before uploading.</p>}
        </div>
      )}
      {!config.enabled && (
        <p className="mt-1 text-xs text-neutral-500">Set Cloudinary env vars on the server to enable direct upload.</p>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {success && <p className="mt-1 text-xs text-green-700">{success}</p>}
      {value && <img src={value} alt="" className="mt-2 h-24 rounded-lg object-cover" />}
    </div>
  );
}
