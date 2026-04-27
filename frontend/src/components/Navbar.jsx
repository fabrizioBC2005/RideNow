import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const TOP_LINKS = [
  { label: 'Viaje',         href: '/viaje' },
  { label: 'Conduce',       href: '#drivers' },
  { label: 'Negocios',      href: '/negocios' },
  { label: 'Quiénes somos', href: '/quienes-somos' },
]

const SUB_LINKS = [
  { label: 'Regístrate',      href: '#' },
  { label: 'Requisitos',      href: '#requirements' },
  { label: 'Ganancias',       href: '#earnings' },
  { label: 'Tu primer viaje', href: '#how' },
  { label: 'Seguridad',       href: '#safety' },
  {label: 'Opiniones', href: '/#testimonios' },
  { label: 'Contáctanos',     href: '/#contacto' },
  
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
            <Link to="/login" className="text-gray-300 text-sm font-medium no-underline hover:text-white transition-colors">
              Iniciar sesión
            </Link>
            <Link to="/register" className="btn-yellow text-sm py-2 px-4">
              Regístrate
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden bg-transparent border-none cursor-pointer text-yellow p-1"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div className="hidden md:flex items-center justify-between px-8 h-12 bg-white border-b-2 border-yellow">
          <span className="text-night font-extrabold text-sm">Conduce</span>
          <div className="flex items-center gap-5">
            {SUB_LINKS.map(l => (
              <a key={l.label} href={l.href}
                className="text-gray-500 text-xs font-medium no-underline hover:text-night transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>

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
              <Link to="/login"    className="btn-ghost justify-center text-sm">Iniciar sesión</Link>
              <Link to="/register" className="btn-yellow justify-center text-sm">Regístrate</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="h-14 md:h-28" />
    </>
  )
}