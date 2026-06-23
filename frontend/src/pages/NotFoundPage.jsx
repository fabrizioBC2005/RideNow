import { LuCar, LuArrowLeft, LuMapPin } from 'react-icons/lu'
import Navbar from '../components/Navbar'

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <main className="bg-night min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md mx-auto">

          <div className="relative mb-8">
            <p className="text-[120px] font-black text-white/5 leading-none select-none">404</p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-yellow/10 border border-yellow/20 flex items-center justify-center">
                <LuCar className="text-yellow" size={36} />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight mb-2">
            Ruta no encontrada<span className="text-yellow">.</span>
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Parece que este destino no existe en nuestro mapa. El conductor se perdio.
          </p>

          <div className="flex items-center justify-center gap-2 bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3 mb-8 max-w-xs mx-auto">
            <LuMapPin className="text-yellow shrink-0" size={14} />
            <p className="text-gray-500 text-xs">Pagina: <span className="text-white font-bold">{window.location.pathname}</span></p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/" className="flex items-center justify-center gap-2 bg-yellow text-night font-black text-xs px-6 py-3.5 rounded-xl hover:brightness-110 transition-all no-underline">
              <LuArrowLeft size={14} /> Volver al inicio
            </a>
            <a href="/reserva" className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-black text-xs px-6 py-3.5 rounded-xl hover:bg-white/10 transition-all no-underline">
              <LuCar size={14} /> Pedir un viaje
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
