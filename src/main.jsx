import { StrictMode } from 'react'
import { Provider } from "react-redux";
import store from './store'
import { setAccessToken } from './store/authToken.js';
import './index.css'
// Main entry point for createBrowserRouter
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx'

// Bootstrap access token on app load
(async () => {
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
})();
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Provider store = {store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
