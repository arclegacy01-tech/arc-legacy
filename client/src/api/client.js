const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function api(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  const token = localStorage.getItem('arc_token');
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}
