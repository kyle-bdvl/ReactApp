import store from '../store';
import { setAccessToken, clearAccessToken } from '../store/authToken';

export async function apiFetch(url, options = {}) {
  let token = store.getState().authToken.accessToken;
  const headers = { ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include'
  });

  if (res.status === 401 || res.status === 403) {
    // Try to refresh
    const refreshRes = await fetch('http://localhost:5000/api/refresh', {
      method: 'POST',
      credentials: 'include'
    });
    if (refreshRes.ok) {
      const data = await refreshRes.json();
      store.dispatch(setAccessToken(data.accessToken));
      headers.Authorization = `Bearer ${data.accessToken}`;
      res = await fetch(url, { ...options, headers, credentials: 'include' });
    } else {
      store.dispatch(clearAccessToken());
      throw new Error('Session expired');
    }
  }
  return res;
}