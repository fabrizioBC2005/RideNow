import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const TOP_LINKS = [
  { label: 'Viaje', href: '/viaje' },
  { label: 'Reserva', href: '/reserva' },
  { label: 'Negocios', href: '/negocios' },
  { label: 'Quiénes somos', href: '/quienes-somos' },
  { label: 'Testimonios', href: '/testimonios' }
]

const SUB_LINKS = [
  { label: 'Regístrate', href: '/conduce/registrate' },
  { label: 'Requisitos', href: '/conduce/requisitos' },
  { label: 'Ganancias', href: '/conduce/ganancias' },
  { label: 'Tu primer viaje', href: '/conduce/primer-viaje' },
  { label: 'Seguridad', href: '/conduce/seguridad' },
  { label: 'Contáctanos', href: '/conduce/contactanos' },

]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { usuario, logout } = useAuth()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">

        <div className={`flex items-center justify-between px-5 md:px-8 h-14 bg-night ${scrolled ? 'border-b border-night-4' : ''}`}>

          <Link to="/" className="text-yellow text-xl font-black tracking-tight no-underline">
            Ride<span className="text-white">Now</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {TOP_LINKS.map(l => (
              <Link key={l.label} to={l.href}
                className="text-gray-400 text-sm font-medium no-underline hover:text-yellow transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {usuario ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-gray-300 text-sm font-medium hover:text-yellow transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-yellow/10 border border-yellow/20 flex items-center justify-center">
                    <span className="text-yellow font-black text-xs">{usuario.nombre?.charAt(0).toUpperCase()}</span>
                  </div>
                  Hola, {usuario.nombre?.split(' ')[0]}
                  <span className="text-[10px] text-gray-600">{dropdownOpen ? '▲' : '▼'}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-10 bg-[#0a0a0a] border border-white/10 rounded-2xl py-2 w-44 shadow-2xl z-50">
                    <Link to="/perfil" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-gray-300 text-xs font-bold no-underline hover:text-yellow hover:bg-white/5 transition-all">
                      Mi perfil
                    </Link>
                    <Link to="/historial" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-gray-300 text-xs font-bold no-underline hover:text-yellow hover:bg-white/5 transition-all">
                      Mis viajes
                    </Link>
                    <div className="border-t border-white/5 my-1" />
                    <button onClick={() => { logout(); setDropdownOpen(false) }} className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-red-400 text-xs font-bold hover:bg-white/5 transition-all">
                      Cerrar sesion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 text-sm font-medium no-underline hover:text-white transition-colors">
                  Iniciar sesión
                </Link>
                <Link to="/register" className="btn-yellow text-sm py-2 px-4">
                  Regístrate
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden bg-transparent border-none cursor-pointer text-yellow p-1"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {!usuario && <div className="hidden md:flex items-center justify-between px-8 h-12 bg-white border-b-2 border-yellow">
          <span className="text-night font-extrabold text-sm">Conduce</span>
          <div className="flex items-center gap-5">
            {SUB_LINKS.map(l => (
              <a key={l.label} href={l.href}
                className="text-gray-500 text-xs font-medium no-underline hover:text-night transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>}

        <div className={`md:hidden bg-night border-b-2 border-yellow overflow-hidden transition-all duration-300 ${open ? 'max-h-screen' : 'max-h-0'}`}>
          <div className="px-5 py-4">
            {TOP_LINKS.map(l => (
              <Link key={l.label} to={l.href} onClick={() => setOpen(false)}
                className="block py-3 text-gray-400 text-sm font-medium border-b border-night-4 no-underline hover:text-yellow">
                {l.label}
              </Link>
            ))}
            {SUB_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                className="block py-3 text-gray-400 text-sm font-medium border-b border-night-4 no-underline hover:text-yellow last:border-0">
                {l.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              {usuario ? (
                <>
                  <Link to="/perfil" onClick={() => setOpen(false)} className="btn-ghost justify-center text-sm">
                    Mi perfil ({usuario.nombre?.split(' ')[0]})
                  </Link>
                  <button
                    onClick={() => { logout(); setOpen(false) }}
                    className="btn-ghost justify-center text-sm"
                  >
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-ghost justify-center text-sm">Iniciar sesión</Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="btn-yellow justify-center text-sm">Regístrate</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className={usuario ? "h-14" : "h-14 md:h-28"} />
    </>
  )
}