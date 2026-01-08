import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AgentDashboard from './pages/AgentDashboard.jsx'
import ManagerDashboard from './pages/ManagerDashboard.jsx'
import Report from './pages/Report.jsx'
import Profile from './pages/Profile.jsx'
import "leaflet/dist/leaflet.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/agente",
    element: <AgentDashboard/>
  },
  {
    path: "/admin",
    element: <ManagerDashboard/>
  },
  {
      path: "/admin/report",
      element: <Report />
  },
  {
      path: "/admin/profile/:public_id",
      element: <Profile />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
