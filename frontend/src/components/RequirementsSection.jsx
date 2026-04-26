const REQ_COLS = [
  { num: '01', title: 'Requisitos',        items: ['Ser mayor de 18 años', 'Test de confianza aprobado', 'Antecedentes penales limpios'], link: 'Conoce más' },
  { num: '02', title: 'Documentos',        items: ['Licencia de conducir B-IIb', 'SOAT vigente', 'Revisión técnica al día', 'DNI vigente'], link: 'Ver documentos' },
  { num: '03', title: 'Empieza a manejar', items: ['Regístrate en línea', 'Sube tus documentos', 'Activa tu cuenta', '¡Acepta tu primer viaje!'], link: 'Registrarme ahora' },
]

const SAFETY = [
  { icon: '🛡️', title: 'Funciones de seguridad',     desc: 'Comparte tu ubicación en tiempo real. Botón SOS con un solo toque para pedir ayuda.' },
  { icon: '💬', title: 'Soporte cuando lo necesites', desc: 'Asistencia en emergencias y soporte 24/7 pensado para tu tranquilidad desde el primer viaje.' },
  { icon: '🤝', title: 'Comunidad verificada',        desc: 'Todos los conductores pasan verificación de antecedentes y siguen nuestras guías comunitarias.' },
]

export default function RequirementsSection() {
  return (
    <section id="requirements">

      {/* Requisitos */}
      <div className="bg-white px-14 pt-14 pb-12">
        <h2 className="text-4xl font-black text-night tracking-tight mb-1">
          Qué necesitas para registrarte
        </h2>
        <p className="text-sm text-gray-400 mb-7">Rápido, todo en línea, sin filas.</p>

        {/* Tabs */}
        <div className="flex border-b-2 border-gray-100 mb-9">
          {['Conducir', 'Repartir'].map((tab, i) => (
            <div key={tab}
              className={`px-6 py-2.5 text-sm cursor-pointer -mb-0.5 border-b-[3px] transition-colors ${
                i === 0
                  ? 'font-bold text-night border-yellow'
                  : 'font-medium text-gray-400 border-transparent'
              }`}>
              {tab}
            </div>
          ))}
        </div>

        {/* 3 columnas */}
        <div className="grid grid-cols-3 gap-0.5 bg-gray-200">
          {REQ_COLS.map(col => (
            <div key={col.num} className="req-col">
              <div className="req-num">{col.num}</div>
              <div className="req-title">{col.title}</div>
              <ul className="list-none p-0 mb-4">
                {col.items.map(item => (
                  <li key={item} className="req-item">
                    <span className="absolute left-0 text-yellow font-bold">→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="/register" className="text-xs font-bold text-night underline underline-offset-2 hover:text-yellow transition-colors">
                {col.link}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Seguridad */}
      <div id="safety" className="bg-night px-14 py-14">
        <h2 className="text-4xl font-black text-white tracking-tight mb-1">
          Seguridad en el camino
        </h2>
        <p className="text-sm text-gray-600 mb-9">Siéntete tranquilo donde quiera que vayas.</p>

        <div className="grid grid-cols-3 gap-4">
          {SAFETY.map(s => (
            <div key={s.title} className="card-dark">
              <div className="icon-yellow mb-4">{s.icon}</div>
              <div className="text-sm font-bold text-white mb-2">{s.title}</div>
              <div className="text-xs text-gray-600 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}