import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { ArrowRight, Clock, Calendar, MapPin } from 'lucide-react'

const BENEFICIOS = [
  {
    icon: <Clock size={20} />,
    title: 'Viajes sin estrés',
    desc: 'Programa tu viaje con anticipación y evita esperas de último momento.',
  },
  {
    icon: <Calendar size={20} />,
    title: 'Organiza tu tiempo',
    desc: 'Elige fecha y hora exacta según tu agenda o compromisos.',
  },
  {
    icon: <MapPin size={20} />,
    title: 'Ideal para eventos',
    desc: 'Perfecto para aeropuertos, reuniones o salidas importantes.',
  },
]

const USOS = [
  'Traslados al aeropuerto ✈️',
  'Reuniones de trabajo 💼',
  'Eventos especiales 🎉',
  'Viajes planificados 🗓️',
]

export default function ReservaViajePage() {
  return (
    <>
      <Navbar />
      <main>


        {/* HERO */}
        <div className="bg-night px-8 md:px-14 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="tag-yellow mb-5 inline-block">Reserva tu viaje</span>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-none tracking-tighter mb-4">
              Planifica tu viaje<br />
              <span className="text-yellow">con anticipación.</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
              Programa tu viaje con fecha y hora exacta. Ideal para compromisos importantes
              donde no puedes fallar.
            </p>
            <a href="/register" className="btn-yellow text-sm">
              Reservar ahora <ArrowRight size={16} />
            </a>
          </div>
          

          {/* FORMULARIO */}
          <div className="bg-night-2 border border-night-4 rounded-2xl p-6">
            <p className="text-yellow text-xs font-extrabold uppercase tracking-widest mb-4">
              Programa tu viaje
            </p>

            {/* Origen */}
            <div className="flex items-center gap-3 bg-night-3 rounded-xl px-4 py-3 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Punto de origen"
                className="bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none flex-1 font-sans"
              />
            </div>

            {/* Destino */}
            <div className="flex items-center gap-3 bg-night-3 rounded-xl px-4 py-3 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow flex-shrink-0" />
              <input
                type="text"
                placeholder="Punto de destino"
                className="bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none flex-1 font-sans"
              />
            </div>

            {/* Fecha */}
            <div className="flex items-center gap-3 bg-night-3 rounded-xl px-4 py-3 mb-3">
              <input
                type="date"
                className="bg-transparent text-sm text-gray-300 outline-none flex-1 font-sans"
              />
            </div>

            {/* Hora */}
            <div className="flex items-center gap-3 bg-night-3 rounded-xl px-4 py-3 mb-4">
              <input
                type="time"
                className="bg-transparent text-sm text-gray-300 outline-none flex-1 font-sans"
              />
            </div>

            <a href="/register" className="btn-yellow w-full justify-center text-sm">
              Confirmar reserva <ArrowRight size={15} />
            </a>

            <p className="text-gray-600 text-xs text-center mt-3">
              Programa tu viaje con anticipación · Sin compromiso
            </p>
          </div>
        </div>

        {/* BENEFICIOS */}
        <div className="bg-white px-8 md:px-14 py-16">
          <span className="tag-black mb-4 inline-block">Ventajas</span>
          <h2 className="text-4xl font-black text-night tracking-tight mt-3 mb-2">
            ¿Por qué reservar tu viaje?
          </h2>
          <p className="text-gray-400 text-sm mb-10 max-w-md">
            La opción perfecta para quienes necesitan puntualidad y planificación.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {BENEFICIOS.map(b => (
              <div key={b.title} className="card-dark flex gap-4 items-start">
                <div className="icon-yellow flex-shrink-0 text-night">{b.icon}</div>
                <div>
                  <div className="text-sm font-bold text-white mb-1">{b.title}</div>
                  <div className="text-xs text-gray-600 leading-relaxed">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* USOS */}
        <div className="bg-night px-8 md:px-14 py-16">
          <span className="tag-yellow mb-4 inline-block">Uso ideal</span>
          <h2 className="text-4xl font-black text-white tracking-tight mt-3 mb-10">
            Perfecto para cada ocasión
          </h2>

          <div className="flex flex-wrap gap-3">
            {USOS.map(u => (
              <span key={u} className="bg-night-2 border border-night-4 text-yellow text-xs font-bold px-4 py-2 rounded-md">
                {u}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-yellow px-8 md:px-14 py-16 text-center">
          <h2 className="text-4xl font-black text-night tracking-tight mb-4">
            Programa tu próximo viaje hoy
          </h2>
          <p className="text-gray-700 text-sm mb-8 max-w-sm mx-auto">
            Reserva con anticipación y olvídate de las preocupaciones. Tu movilidad, bajo control.
          </p>
          <a href="/register" className="btn-black text-sm mx-auto">
            Reservar viaje <ArrowRight size={16} />
          </a>
        </div>

        <Footer />
      </main>
    </>
  )
}