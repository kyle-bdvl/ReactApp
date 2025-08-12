import { StrictMode } from 'react'
import { Provider } from "react-redux";
import store from './store'
import './index.css'
// Main entry point for createBrowserRouter
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
