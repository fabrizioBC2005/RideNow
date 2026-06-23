import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NegociosPage from './pages/NegociosPage'
import QuienesSomosPage from './pages/QuienesSomosPage'
import ViajePage from './pages/ViajePage'
import Login from './pages/Login'
import Register from './pages/Register'
import ReservaViajePage from './pages/ReservaViajePage'
import Testimonios from './components/Testimonios'
import ContactoPage from './pages/ContactoPage'
import RegistratePage from './pages/conduce/RegistratePage'
import RequisitosPage from './pages/conduce/RequisitosPage'
import GananciasPage from './pages/conduce/GananciasPage'
import PrimerViajePage from './pages/conduce/PrimerViajePage'
import SeguridadPage from './pages/conduce/SeguridadPage'
import ContactanosPage from './pages/conduce/ContactanosPage'
import ProtectedRoute from './components/ProtectedRoute'
import PerfilPage from './pages/PerfilPage'
import HistorialPage from './pages/HistorialPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/"                      element={<HomePage />} />
      <Route path="/negocios"              element={<NegociosPage />} />
      <Route path="/quienes-somos"         element={<QuienesSomosPage />} />
      <Route path="/viaje"                 element={<ViajePage />} />
      <Route path="/login"                 element={<Login />} />
      <Route path="/register"              element={<Register />} />
      <Route path="/testimonios"           element={<Testimonios />} />
      <Route path="/contacto"              element={<ContactoPage />} />
      <Route path="/reserva"               element={<ReservaViajePage />} />
      <Route path="/conduce/registrate"    element={<RegistratePage />} />
      <Route path="/conduce/requisitos"    element={<RequisitosPage />} />
      <Route path="/conduce/ganancias"     element={<GananciasPage />} />
      <Route path="/conduce/primer-viaje"  element={<PrimerViajePage />} />
      <Route path="/conduce/seguridad"     element={<SeguridadPage />} />
      <Route path="/conduce/contactanos"   element={<ContactanosPage />} />

      <Route element={<ProtectedRoute />}>
        {/* <Route path="/dashboard"  element={<DashboardPage />} /> */}
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/historial" element={<HistorialPage />} />
        {/* <Route path="/mis-viajes" element={<MisViajesPage />} /> */}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
