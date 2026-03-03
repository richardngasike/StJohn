const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function apiFetch(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const defaultHeaders = { 'Content-Type': 'application/json' };

  if (typeof window !== 'undefined') {
    const Cookies = (await import('js-cookie')).default;
    const token = Cookies.get('token') || Cookies.get('admin_token');
    if (token) defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'API Error');
  return data;
}

export const api = {
  get:    (endpoint)         => apiFetch(endpoint),
  post:   (endpoint, body)   => apiFetch(endpoint, { method: 'POST',  body: JSON.stringify(body) }),
  patch:  (endpoint, body)   => apiFetch(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint)         => apiFetch(endpoint, { method: 'DELETE' }),
};
