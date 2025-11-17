import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AgentDashboard from './pages/AgentDashboard.jsx'
import ManagerDashboard from './pages/ManagerDashboard.jsx'

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
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
