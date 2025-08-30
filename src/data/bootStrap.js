import { setAccessToken } from '../store/authToken.js';
export default async function bootStrap() {
  try {
    const res = await fetch('http://localhost:5000/api/refresh', {
      method: 'POST',
      credentials: 'include'
    });
    if (res.ok) {
      const data = await res.json();
      setAccessToken(data.accessToken);
    }
  } catch {}
};