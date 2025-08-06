import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Main entry point for createBrowserRouter
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
