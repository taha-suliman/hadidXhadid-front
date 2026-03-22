import { HashRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './contexts/LangContext'
import { AuthProvider } from './contexts/AuthContext'
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import Layout from './components/layout/Layout';
import VehiclesPage from './pages/VehiclesPage'
import VehicleDetailsPage from './pages/VehicleDetailsPage'
import MechanicsPage from './pages/MechanicsPage';
import MechanicProfilePage from './pages/MechanicProfilePage';
import DashboardPage from './pages/DashboardPage';

import './index.css'

export default function App() {
  return (
    <HashRouter>
      <LangProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login"    element={<AuthPage mode="login" />} />
            <Route path="/register" element={<AuthPage mode="register" />} />
            <Route path="/" element={<Layout><HomePage /></Layout>} /> 
            <Route path="/vehicles" element={<Layout><VehiclesPage /></Layout>} />
            <Route path="/vehicles/:id" element={<Layout><VehicleDetailsPage /></Layout>} />
            <Route path="/mechanics" element={<Layout><MechanicsPage /></Layout>} />
            <Route path="/mechanics/:id" element={<Layout><MechanicProfilePage /></Layout>} />
            <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
          </Routes>
        </AuthProvider>
      </LangProvider>
    </HashRouter>
  )
}
