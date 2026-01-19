import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AgentDashboard from './pages/AgentDashboard.jsx'
import ManagerDashboard from './pages/ManagerDashboard.jsx'
import Report from './pages/Report.jsx'
import Profile from './pages/Profile.jsx'
import AddUser from './pages/AddUser.jsx'
import "leaflet/dist/leaflet.css";
import { AuthProvider } from './context/AuthProvider.jsx'
import { ProtectedRoute } from './context/ProtectedRoute.jsx'
import Unauthorized from './pages/Unauthorized.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/unauthorized",
    element: <Unauthorized/>
  },

  // Rotas de agente
  {
    element: <ProtectedRoute requiredLevel={1} />,
    children: [
      {
        path: "/agente",
        element: <AgentDashboard/>
      }
    ]
  },
  
  // Rotas de Admin
  {
    element: <ProtectedRoute requiredLevel={0}/>,
    children: [
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
      {
          path: "/admin/profile/add",
          element: <AddUser />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
