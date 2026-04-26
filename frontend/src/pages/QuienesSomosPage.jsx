import Navbar from '../components/Navbar'
import { ArrowRight, Target, Heart, Zap, Globe } from 'lucide-react'

const EQUIPO = [
  { nombre: 'Carlos Mendoza',   rol: 'CEO & Co-founder',       iniciales: 'CM', color: 'bg-yellow' },
  { nombre: 'Ana Quispe',       rol: 'CTO & Co-founder',       iniciales: 'AQ', color: 'bg-yellow' },
  { nombre: 'Luis Paredes',     rol: 'Head of Operations',     iniciales: 'LP', color: 'bg-night-3' },
  { nombre: 'Sofía Ramírez',    rol: 'Head of Design',         iniciales: 'SR', color: 'bg-night-3' },
  { nombre: 'Miguel Torres',    rol: 'Head of Engineering',    iniciales: 'MT', color: 'bg-night-3' },
  { nombre: 'Valeria Chávez',   rol: 'Head of Growth',         iniciales: 'VC', color: 'bg-night-3' },
]

const VALORES = [
  { icon: <Target size={20} />, title: 'Misión',      desc: 'Democratizar el transporte en Lima haciendo que viajar seguro y a precio justo sea accesible para todos.' },
  { icon: <Heart size={20} />,  title: 'Visión',      desc: 'Ser la plataforma de movilidad más confiable de Latinoamérica para el 2030.' },
  { icon: <Zap size={20} />,    title: 'Innovación',  desc: 'Usamos tecnología de punta para conectar pasajeros y conductores en tiempo real con máxima eficiencia.' },
  { icon: <Globe size={20} />,  title: 'Impacto',     desc: 'Generamos ingresos justos para conductores y movilidad segura para miles de familias en Lima.' },
]

const HITOS = [
  { año: '2023', hito: 'Fundación de RideNow en Lima con 10 conductores piloto.' },
  { año: 'Mar 2024', hito: 'Primer viaje oficial. 500 usuarios registrados el primer mes.' },
  { año: 'Jun 2024', hito: '100 conductores activos. Expansión a 15 distritos de Lima.' },
  { año: 'Dic 2024', hito: '5,000 viajes completados. Calificación promedio de 4.9 estrellas.' },
  { año: 'Abr 2025', hito: '340 conductores activos. 12,000+ viajes. Lanzamiento de RideNow Business.' },
]

export default function QuienesSomosPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* HERO */}
        <div className="bg-night px-8 md:px-14 py-20">
          <span className="tag-yellow mb-5 inline-block">Quiénes somos</span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-6 max-w-3xl">
            Movemos Lima<br />
            <span className="text-yellow">con propósito.</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
            Somos un equipo apasionado de Lima que cree que el transporte puede ser
            más justo, más seguro y más accesible para todos.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { val: '2023',   label: 'Año de fundación' },
            { val: '12K+',   label: 'Viajes completados' },
            { val: '340+',   label: 'Conductores activos' },
            { val: '4.9★',   label: 'Calificación promedio' },
          ].map((s, i) => (
            <div key={s.label} className={`stat-block border-r border-night-4 last:border-r-0 ${i % 2 === 0 ? 'bg-yellow' : 'bg-night'}`}>
              <div className={`stat-value ${i % 2 === 0 ? 'text-night' : 'text-yellow'}`}>{s.val}</div>
              <div className={`stat-label ${i % 2 === 0 ? 'text-night font-semibold' : 'text-gray-500'}`}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* MISIÓN Y VALORES */}
        <div className="bg-white px-8 md:px-14 py-16">
          <span className="tag-black mb-4 inline-block">Nuestros valores</span>
          <h2 className="text-4xl font-black text-night tracking-tight mt-3 mb-10">
            Lo que nos mueve
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {VALORES.map(v => (
              <div key={v.title} className="card-dark flex gap-4 items-start">
                <div className="icon-yellow flex-shrink-0 text-night">{v.icon}</div>
                <div>
                  <div className="text-sm font-black text-yellow mb-1">{v.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HISTORIA / HITOS */}
        <div className="bg-night px-8 md:px-14 py-16">
          <span className="tag-yellow mb-4 inline-block">Nuestra historia</span>
          <h2 className="text-4xl font-black text-white tracking-tight mt-3 mb-10">
            Del sueño a la <span className="text-yellow">realidad</span>
          </h2>
          <div className="max-w-2xl space-y-0">
            {HITOS.map((h, i) => (
              <div key={h.año} className="flex gap-6 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center text-night font-black text-xs flex-shrink-0">
                    {i + 1}
                  </div>
                  {i < HITOS.length - 1 && <div className="w-0.5 h-10 bg-night-4 mt-1" />}
                </div>
                <div className="pb-8">
                  <div className="text-yellow text-xs font-extrabold uppercase tracking-wider mb-1">{h.año}</div>
                  <div className="text-gray-400 text-sm leading-relaxed">{h.hito}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EQUIPO */}
        <div className="bg-white px-8 md:px-14 py-16">
          <span className="tag-black mb-4 inline-block">El equipo</span>
          <h2 className="text-4xl font-black text-night tracking-tight mt-3 mb-10">
            Las personas detrás de RideNow
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {EQUIPO.map(m => (
              <div key={m.nombre} className="card-dark flex flex-col items-center text-center p-6">
                <div className={`w-16 h-16 ${m.color} rounded-2xl flex items-center justify-center text-night font-black text-lg mb-4`}>
                  {m.iniciales}
                </div>
                <div className="text-sm font-bold text-white mb-1">{m.nombre}</div>
                <div className="text-xs text-gray-500">{m.rol}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-yellow px-8 md:px-14 py-16 text-center">
          <h2 className="text-4xl font-black text-night tracking-tight mb-4">
            Únete a nuestra historia
          </h2>
          <p className="text-gray-700 text-sm mb-8 max-w-sm mx-auto">
            Sé parte de la plataforma que está cambiando la movilidad en Lima.
            Como pasajero o como conductor.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/register" className="btn-black text-sm">
              Empezar como pasajero <ArrowRight size={16} />
            </a>
            <a href="/register?role=driver" className="btn-black text-sm">
              Unirme como conductor <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="bg-night px-14 py-7 flex flex-col md:flex-row justify-between items-center gap-4 border-t-2 border-yellow">
          <span className="text-yellow text-lg font-black">RideNow</span>
          <div className="flex gap-5">
            {['Privacidad', 'Términos', 'Ayuda', 'Contacto'].map(l => (
              <a key={l} href="#" className="text-gray-600 text-xs no-underline hover:text-yellow transition-colors">{l}</a>
            ))}
          </div>
          <span className="text-gray-700 text-xs">© 2025 RideNow · Lima, Perú</span>
        </footer>
      </main>
    </>
  )
}

