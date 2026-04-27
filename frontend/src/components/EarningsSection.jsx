import { useState } from 'react'
import { 
  LuMapPin, 
  LuShieldCheck, 
  LuNavigation, 
  LuStar, 
  LuCircleCheck, 
  LuClock, 
  LuWallet, 
  LuLifeBuoy, 
  LuActivity 
} from 'react-icons/lu'
import { FaCarRear } from 'react-icons/fa6'

const STEPS = [
  { n: '01', icon: <LuMapPin />, title: 'Ingresa destino', desc: 'Escribe origen y destino. Ves el precio antes de confirmar.' },
  { n: '02', icon: <FaCarRear />, title: 'Conductor asignado', desc: 'El sistema asigna al conductor más cercano y verificado.' },
  { n: '03', icon: <LuShieldCheck />, title: 'Viaja seguro', desc: 'Seguimiento en tiempo real. Paga al llegar.' },
  { n: '04', icon: <LuStar />, title: 'Califica', desc: 'Tu opinión mejora el servicio.' },
]

const PERKS = [
  { text: 'Horarios libres', icon: <LuClock className="text-yellow" /> },
  { text: 'Pago semanal', icon: <LuWallet className="text-yellow" /> },
  { text: 'Soporte 24/7', icon: <LuLifeBuoy className="text-yellow" /> },
  { text: 'Seguro incluido', icon: <LuShieldCheck className="text-yellow" /> },
]

export default function EarningsSection() {
  const [hours, setHours] = useState(20)
  const earnings = Math.round(hours * 22.5)
  const pct = ((hours - 5) / (60 - 5)) * 100

  return (
    <section id="earnings" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white border-t border-gray-100">
        
        <div className="p-8 md:p-14 border-b md:border-b-0 md:border-r-2 border-gray-100 flex flex-col justify-center">
          <span className="tag-black mb-4 inline-flex items-center gap-2">
            <LuActivity size={14} /> Ganancias estimadas
          </span>
          <div className="text-5xl md:text-7xl font-black text-night tracking-tighter leading-none mt-4">
            S/ {earnings.toLocaleString()}
            <span className="text-xl md:text-2xl font-normal text-gray-400 tracking-normal block md:inline md:ml-3"> 
              por semana
            </span>
          </div>
          <p className="text-gray-400 text-xs mt-3 mb-8">Basado en tarifas actuales en Lima, Perú</p>
          <div className="bg-gray-50 border-l-4 border-yellow px-5 py-4 text-xs text-gray-600 leading-relaxed rounded-r-xl">
            Calculamos las ganancias a partir de conductores activos en Lima durante las últimas 4 semanas.
          </div>
        </div>

                <div className="p-8 md:p-14 bg-gray-50/50 flex flex-col justify-center">
          <div className="flex justify-between items-end mb-6">
            <span className="tag-black !bg-night text-white font-bold">
              {hours} horas / semana
            </span>
          </div>
          
          <div className="relative mb-8 group">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow transition-all duration-300 ease-out" 
                style={{ width: `${pct}%` }} 
              />
            </div>
            <input 
              type="range" min={5} max={60} step={5} value={hours}
              onChange={e => setHours(Number(e.target.value))}
              className="absolute top-0 w-full h-2 opacity-0 cursor-pointer z-10" 
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-night rounded-full border-4 border-yellow shadow-lg pointer-events-none transition-all duration-300 ease-out"
              style={{ left: `${pct}%` }} 
            />
          </div>

          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-10">
            <span>Mín: 5h</span>
            <span>Máx: 60h</span>
          </div>

          <div className="bg-night rounded-2xl p-6 md:p-8 shadow-xl shadow-night/20">
            <p className="text-yellow text-xs font-black uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
              <LuCircleCheck size={16} /> Por qué RideNow
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PERKS.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white text-sm font-medium">
                  <div className="bg-white/10 p-2 rounded-lg">
                    {item.icon}
                  </div>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="how" className="bg-night px-6 md:px-14 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow/5 skew-x-12 translate-x-20" />
        <div className="relative z-10">
          <span className="tag-yellow mb-4 inline-block">Cómo funciona</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mt-4 mb-4">
            Simple como <span className="text-yellow">1, 2, 3</span>
          </h2>
          <p className="text-gray-500 text-lg mb-12 max-w-md">
            Nuestra tecnología hace que moverte por Lima sea una experiencia sin fricciones.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {STEPS.map(s => (
              <div key={s.n} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/[0.08] transition-colors group">
                <div className="flex justify-between items-start mb-8">
                  <div className="text-yellow text-4xl group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </div>
                  <span className="text-white/20 font-black text-2xl tracking-tighter">
                    {s.n}
                  </span>
                </div>
                <div className="w-10 h-1 bg-yellow mb-6" />
                <h3 className="text-white text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}