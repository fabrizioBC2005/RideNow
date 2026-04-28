import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NegociosPage from './pages/NegociosPage'
import QuienesSomosPage from './pages/QuienesSomosPage'
import ViajePage from './pages/ViajePage'
import Login from './pages/Login';
import Register from './pages/Register';
import ReservaViajePage from './pages/ReservaViajePage'


function App() {
  return (
    <Routes>
      <Route path="/"               element={<HomePage />} />
      <Route path="/negocios"       element={<NegociosPage />} />
      <Route path="/quienes-somos"  element={<QuienesSomosPage />} />
      <Route path="/viaje"          element={<ViajePage />} />
      <Route path="/login"          element={<Login />} />
      <Route path="/register"       element={<Register />} />
      <Route path="/reserva"        element={<ReservaViajePage />} />
      
    </Routes>
  )
}

export default App