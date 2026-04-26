import { useState } from 'react'

const STEPS = [
  { n: '01', icon: '📍', title: 'Ingresa destino',    desc: 'Escribe origen y destino. Ves el precio antes de confirmar.' },
  { n: '02', icon: '🚕', title: 'Conductor asignado', desc: 'El sistema asigna al conductor más cercano y verificado.' },
  { n: '03', icon: '✅', title: 'Viaja seguro',       desc: 'Seguimiento en tiempo real. Paga al llegar en efectivo o digital.' },
  { n: '04', icon: '⭐', title: 'Califica',           desc: 'Tu opinión mejora el servicio. Accede a tu historial de viajes.' },
]

const PERKS = ['Horarios libres', 'Pago semanal', 'Soporte 24/7', 'Seguro incluido']

export default function EarningsSection() {
  const [hours, setHours] = useState(20)
  const earnings = Math.round(hours * 22.5)
  const pct = ((hours - 5) / (60 - 5)) * 88 + 6

  return (
    <section id="earnings">

      {/* Calculadora */}
      <div className="grid grid-cols-2 bg-white border-t border-gray-100">

        {/* Izquierda */}
        <div className="p-14 border-r-2 border-gray-100">
          <span className="tag-black mb-4">Ganancias estimadas</span>

          <div className="mt-4 text-6xl font-black text-night tracking-tighter leading-none">
            S/ {earnings.toLocaleString()}
            <span className="text-2xl font-normal text-gray-400 tracking-normal"> por semana</span>
          </div>

          <p className="text-gray-400 text-xs mt-2 mb-6">en Lima, Perú</p>

          <div className="bg-yellow-light border-l-4 border-yellow px-4 py-3 text-xs text-gray-500 leading-relaxed rounded-r-md">
            Calculamos las ganancias a partir de conductores activos en Lima
            durante las últimas 4 semanas. Las ganancias reales pueden variar
            según zona y horario.
          </div>
        </div>

        {/* Derecha — slider */}
        <div className="p-14 bg-gray-50">
          <span className="tag-black mb-5 inline-block">
            Casi {hours} horas / semana
          </span>

          {/* Track visual */}
          <div className="relative h-1 bg-gray-200 rounded mb-2 mt-2">
            <div className="absolute left-0 top-0 h-1 bg-yellow rounded" style={{ width: `${pct}%` }} />
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-night rounded-full border-2 border-yellow"
              style={{ left: `${pct}%` }} />
          </div>

          <input type="range" min={5} max={60} step={5} value={hours}
            onChange={e => setHours(Number(e.target.value))}
            className="w-full mb-1 accent-yellow" />

          <div className="flex justify-between text-xs text-gray-400 mb-7">
            <span>5h / semana</span><span>60h / semana</span>
          </div>

          <div className="bg-night rounded-lg p-5">
            <p className="tag-yellow text-xs mb-3">Por qué conducir con RideNow</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {PERKS.map(item => (
                <div key={item} className="arrow-item">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cómo funciona */}
      <div id="how" className="bg-night px-14 py-16">
        <span className="tag-yellow mb-4 inline-block">Cómo funciona</span>
        <h2 className="text-4xl font-black text-white tracking-tight mt-3 mb-2">
          Simple como <span className="text-yellow">1, 2, 3, 4</span>
        </h2>
        <p className="text-gray-600 text-sm mb-9 max-w-sm">
          Solicita tu viaje en menos de 30 segundos.
        </p>

        <div className="grid grid-cols-4 gap-0.5">
          {STEPS.map(s => (
            <div key={s.n} className="step-card">
              <div className="step-num">{s.n}</div>
              <div className="yellow-bar mb-4" />
              <div className="icon-yellow mb-4">{s.icon}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}