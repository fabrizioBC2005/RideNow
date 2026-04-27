import { useState } from 'react'
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
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [historial, setHistorial] = useState([])

  const mapaURL = destino
    ? `https://www.google.com/maps?q=${encodeURIComponent(origen + ' a ' + destino)}&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(origen || 'Lima, Peru')}&output=embed`

  const handleReserva = () => {
    if (!origen || !destino || !fecha || !hora) return

    const nuevaReserva = {
      origen,
      destino,
      fecha,
      hora,
    }

    setHistorial([nuevaReserva, ...historial])

    alert('Reserva creada con éxito ✔️')
  }

  return (
    <>
      <Navbar />
      <main>

        {/* HERO */}
        <div className="bg-night px-8 md:px-14 py-20 grid md:grid-cols-2 gap-12">

          {/* FORM */}
          <div>
            <span className="tag-yellow mb-5 inline-block">Reserva tu viaje</span>

            <h1 className="text-5xl font-black text-white mb-4">
              Planifica tu viaje <span className="text-yellow">con anticipación</span>
            </h1>

            <p className="text-gray-500 mb-6">
              Programa tu viaje con fecha y hora exacta. Ideal para compromisos importantes
              donde no puedes fallar.
            </p>

            <div className="bg-night-2 border border-night-4 rounded-2xl p-6">

              {/* ORIGEN */}
              <input
                className="w-full mb-3 bg-night-3 p-3 rounded-xl text-sm text-gray-300"
                placeholder="Punto de origen"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
              />

              {/* DESTINO */}
              <input
                className="w-full mb-3 bg-night-3 p-3 rounded-xl text-sm text-gray-300"
                placeholder="Punto de destino"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
              />

              <div className="flex gap-2 mb-4">
                <input
                  type="date"
                  className="flex-1 bg-night-3 p-3 rounded-xl text-sm text-gray-300"
                  onChange={(e) => setFecha(e.target.value)}
                />
                <input
                  type="time"
                  className="flex-1 bg-night-3 p-3 rounded-xl text-sm text-gray-300"
                  onChange={(e) => setHora(e.target.value)}
                />
              </div>

              <button
                onClick={handleReserva}
                className="btn-yellow w-full text-sm"
              >
                Confirmar reserva <ArrowRight size={16} />
              </button>
            </div>

            {origen && destino && fecha && hora && (
              <div className="mt-6 bg-night-2 border border-night-4 rounded-xl p-4">
                <h3 className="text-yellow font-bold mb-2">Resumen de reserva</h3>
                <p className="text-xs text-gray-400">Origen: {origen}</p>
                <p className="text-xs text-gray-400">Destino: {destino}</p>
                <p className="text-xs text-gray-400">Fecha: {fecha}</p>
                <p className="text-xs text-gray-400">Hora: {hora}</p>
              </div>
            )}
          </div>

          {/* MAPA */}
          <div className="rounded-2xl overflow-hidden border border-night-4 h-[520px]">
            <iframe
              title="mapa"
              src={mapaURL}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* HISTORIAL */}
          <div className="bg-yellow px-8 md:px-14 py-8">
           <span className="tag-black mb-6 inline-block">
           Historial de reservas
          </span>
          
          {historial.length === 0 ? (
            <p className="text-black-400 text-sm">
              Aún no tienes reservas.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {historial.map((h, i) => (
                <div key={i} className="card-dark p-4">
                  <p className="text-xs text-gray-400">Origen: {h.origen}</p>
                  <p className="text-xs text-gray-400">Destino: {h.destino}</p>
                  <p className="text-xs text-gray-400">Fecha: {h.fecha}</p>
                  <p className="text-xs text-gray-400">Hora: {h.hora}</p>
                </div>
              ))}
            </div>
          )}
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
                <div className="icon-yellow">{b.icon}</div>
                <div>
                  <div className="text-white font-bold">{b.title}</div>
                  <div className="text-xs text-gray-500">{b.desc}</div>
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
              <span key={u} className="bg-night-2 px-4 py-2 text-yellow text-xs rounded-md">
                {u}
              </span>
            ))}
          </div>
        </div>

        

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