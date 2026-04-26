import { useState } from 'react'
import { LuChevronDown, LuDownload, LuCircleHelp } from 'react-icons/lu'
import Footer from './Footer'

const FAQS = [
  { q: '¿Puedo conducir con RideNow en mi ciudad?', a: 'RideNow opera actualmente en Lima Metropolitana. Regístrate y te avisaremos cuando lleguemos a tu zona.' },
  { q: '¿Cuáles son los requisitos para conducir?', a: 'Mayor de 18 años, licencia B-IIb, SOAT, revisión técnica, DNI vigente y pasar el test de confianza.' },
  { q: '¿La plataforma RideNow es segura?', a: 'Sí. Conductores verificados, seguro de accidentes, botón SOS y seguimiento en tiempo real.' },
  { q: '¿Necesito mi propio vehículo?', a: 'Sí, necesitas un vehículo del año 2015 en adelante en buen estado.' },
  { q: '¿Cuándo y cómo cobro mis ganancias?', a: 'Pagos semanales a tu cuenta bancaria o billetera digital. También puedes solicitar retiro anticipado.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div 
      className="border-b border-gray-100 last:border-0 cursor-pointer group py-4 md:py-6" 
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center gap-4">
        <span className={`text-base md:text-lg font-bold transition-colors ${open ? 'text-yellow-600' : 'text-night'}`}>
          {q}
        </span>
        <div className={`p-1 rounded-full transition-all duration-300 ${open ? 'bg-night text-yellow rotate-180' : 'bg-gray-100 text-gray-500'}`}>
          <LuChevronDown size={20} />
        </div>
      </div>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden text-gray-600 text-sm md:text-base leading-relaxed">
          {a}
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  return (
    <section className="w-full">
      <div className="bg-white px-6 md:px-14 py-16 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 text-yellow-500 mb-4">
            <LuCircleHelp size={24} />
            <span className="font-bold uppercase tracking-widest text-xs">Soporte</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-night tracking-tight leading-none mb-6">
            Preguntas <br className="hidden md:block" /> frecuentes
          </h2>
          <p className="text-gray-500 max-w-sm">
            Todo lo que necesitas saber sobre el proceso de registro y el funcionamiento de la app en Lima.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-gray-50/50 rounded-3xl p-2 md:p-8">
            {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="bg-yellow px-6 md:px-20 py-16 md:py-24 flex flex-col justify-center">
          <span className="bg-night text-yellow text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 w-fit mb-6 rounded">
            La app
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-night tracking-tighter mb-4">
            La app para conductores de RideNow
          </h2>
          <p className="text-night/70 text-base md:text-lg leading-relaxed mb-8 max-w-md">
            Fácil de usar y confiable. Solicitudes, ganancias, mapas y soporte en un solo lugar.
          </p>
          <a href="/register?role=driver" className="bg-night text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 w-fit hover:scale-105 transition-transform">
            Descargar la app <LuDownload className="text-yellow" />
          </a>
        </div>

        <div className="bg-night flex items-center justify-center px-8 py-16 md:py-0 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow via-transparent to-transparent"></div>
          </div>
          
          <svg viewBox="0 0 280 200" className="w-full max-w-sm relative z-10 drop-shadow-2xl">
            <rect width="280" height="200" fill="#181818" rx="20" />
            <line x1="0" y1="65" x2="280" y2="65" stroke="#252525" strokeWidth="10" />
            <line x1="0" y1="130" x2="280" y2="130" stroke="#252525" strokeWidth="7" />
            <line x1="85" y1="0" x2="85" y2="200" stroke="#252525" strokeWidth="7" />
            <line x1="195" y1="0" x2="195" y2="200" stroke="#252525" strokeWidth="6" />
            <path d="M 42 168 L 42 130 L 85 130 L 85 65 L 195 65" fill="none" stroke="#FFD700" strokeWidth="3" strokeDasharray="7 3" strokeLinecap="round" />
            <circle cx="42" cy="168" r="8" fill="#FFD700" />
            <circle cx="42" cy="168" r="15" fill="#FFD70025" />
            <circle cx="195" cy="65" r="8" fill="#FFD700" />
            <circle cx="195" cy="65" r="15" fill="#FFD70025" />
            <rect x="154" y="44" width="62" height="22" rx="5" fill="#FFD700" />
            <text x="185" y="59" fontSize="11" textAnchor="middle" fill="#0a0a0a" fontWeight="800">S/ 14.50</text>
            <circle cx="230" cy="150" r="22" fill="#FFD700" />
            <path d="M230 136 L237 158 L230 153 L223 158 Z" fill="#0a0a0a" />
          </svg>
        </div>
      </div>
      <Footer/>
    </section>
  )
}