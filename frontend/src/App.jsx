import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NegociosPage from './pages/NegociosPage'
import QuienesSomosPage from './pages/QuienesSomosPage'
import ViajePage from './pages/ViajePage'

function App() {
  return (
    <Routes>
      <Route path="/"               element={<HomePage />} />
      <Route path="/negocios"       element={<NegociosPage />} />
      <Route path="/quienes-somos"  element={<QuienesSomosPage />} />
      <Route path="/viaje"          element={<ViajePage />} />
    </Routes>
  )
}

export default App