import { useState } from 'react'
import { 
  LuChevronRight, 
  LuShieldCheck, 
  LuSiren, 
  LuUsers, 
  LuFileText, 
  LuUserCheck, 
  LuRocket,
  LuShieldAlert
} from 'react-icons/lu'

const REQ_COLS = [
  { num: '01', title: 'Requisitos', icon: <LuUserCheck />, items: ['Ser mayor de 18 años', 'Test de confianza aprobado', 'Antecedentes penales limpios'], link: 'Conoce más' },
  { num: '02', title: 'Documentos', icon: <LuFileText />, items: ['Licencia de conducir B-IIb', 'SOAT vigente', 'Revisión técnica al día', 'DNI vigente'], link: 'Ver documentos' },
  { num: '03', title: 'Empieza a manejar', icon: <LuRocket />, items: ['Regístrate en línea', 'Sube tus documentos', 'Activa tu cuenta', '¡Acepta tu primer viaje!'], link: 'Registrarme ahora' },
]

const SAFETY = [
  { icon: <LuSiren />, title: 'Funciones de seguridad', desc: 'Comparte tu ubicación en tiempo real. Botón SOS con un solo toque.' },
  { icon: <LuShieldAlert />, title: 'Soporte inmediato', desc: 'Asistencia en emergencias y soporte 24/7 pensado para tu tranquilidad.' },
  { icon: <LuUsers />, title: 'Comunidad verificada', desc: 'Todos los conductores pasan verificación de antecedentes rigurosa.' },
]

export default function RequirementsSection() {
  const [activeTab, setActiveTab] = useState('Conducir')

  return (
    <section id="requirements" className="w-full">
      <div className="bg-white px-6 md:px-14 pt-16 pb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-night tracking-tight mb-3">
          Qué necesitas para registrarte
        </h2>
        <p className="text-gray-400 text-sm md:text-base mb-10 font-medium max-w-xl">
          Rápido, todo en línea, sin filas.
        </p>

        <div className="flex flex-wrap gap-4 border-b-2 border-gray-100 mb-10">
          {['Conducir', 'Repartir'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-xs md:text-sm font-bold uppercase tracking-widest transition-all relative ${
                activeTab === tab ? 'text-night' : 'text-gray-300 hover:text-gray-500'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-yellow" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {REQ_COLS.map((col) => (
            <div key={col.num} className="flex flex-col group gap-6">
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <span className="text-4xl font-black text-gray-100 group-hover:text-yellow/20 transition-colors">
                  {col.num}
                </span>
                <div className="p-3 bg-gray-50 rounded-2xl text-night group-hover:bg-yellow group-hover:text-night transition-all">
                  {col.icon}
                </div>
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-night mb-4">{col.title}</h3>
              
              <ul className="space-y-4 mb-8 flex-grow text-sm md:text-base leading-relaxed">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600 text-sm leading-tight">
                    <LuChevronRight className="text-yellow mt-0.5 flex-shrink-0" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
              
              <a href="/register" className="flex items-center gap-2 text-xs md:text-sm font-black uppercase tracking-wider text-night hover:text-yellow transition-colors group/link">
                {col.link} 
                <LuChevronRight className="group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div id="safety" className="bg-night px-6 md:px-14 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
                Seguridad <span className="text-yellow">en el camino</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base max-w-md leading-relaxed">
                Tu integridad es nuestra prioridad. Hemos diseñado herramientas para cuidarte en cada kilómetro.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-yellow text-xs font-bold uppercase tracking-tighter">
              <LuShieldCheck size={16} /> Protección 24/7 activada
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAFETY.map((s) => (
              <div key={s.title} className="bg-white/[0.03] border border-white/5 p-6 md:p-8 rounded-[2rem] hover:bg-white/[0.06] transition-all">
                <div className="w-12 h-12 bg-yellow rounded-2xl flex items-center justify-center text-night text-2xl mb-6 shadow-lg shadow-yellow/10">
                  {s.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{s.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}