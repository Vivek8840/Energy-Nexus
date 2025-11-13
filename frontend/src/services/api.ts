const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const resp = await fetch(url, {
    ...options,
    headers,
    credentials: 'include'
  });

  const isJson = resp.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await resp.json() : (await resp.text());

  if (!resp.ok) {
    const message = (isJson && (data as any)?.message) || resp.statusText;
    throw new Error(message);
  }

  return data as T;
}

export const api = {
  get: <T>(path: string, init?: RequestInit) => request<T>(path, { method: 'GET', ...(init || {}) }),
  post: <T>(path: string, body?: unknown, init?: RequestInit) => request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined, ...(init || {}) }),
  put: <T>(path: string, body?: unknown, init?: RequestInit) => request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined, ...(init || {}) }),
  patch: <T>(path: string, body?: unknown, init?: RequestInit) => request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined, ...(init || {}) }),
  delete: <T>(path: string, init?: RequestInit) => request<T>(path, { method: 'DELETE', ...(init || {}) }),
};
