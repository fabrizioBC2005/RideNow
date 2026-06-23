import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useViajes } from "../hooks/useViajes";
import MapaViaje from '../components/MapaViaje'

import { MapPin, Clock, Star, Shield, ArrowRight, CreditCard } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { LuCar, LuNavigation, LuMapPin, LuArrowRight } from 'react-icons/lu'

const TIPOS_VIAJE = [
    { icon: '🚗', nombre: 'RideNow X', desc: 'Económico y rápido', tiempo: '3 min', precio: 'S/ 8–12', popular: false },
    { icon: '🚙', nombre: 'RideNow Comfort', desc: 'Más espacio y confort', tiempo: '5 min', precio: 'S/ 14–20', popular: true },
    { icon: '🚐', nombre: 'RideNow Van', desc: 'Hasta 6 pasajeros', tiempo: '7 min', precio: 'S/ 20–30', popular: false },
]

const PASOS = [
    { num: '01', icon: <MapPin size={18} />, title: 'Ingresa tu destino', desc: 'Escribe tu punto de partida y destino. Verás el precio estimado al instante.' },
    { num: '02', icon: <Clock size={18} />, title: 'Elige tu tipo de viaje', desc: 'Selecciona entre RideNow X, Comfort o Van según tu necesidad.' },
    { num: '03', icon: <Star size={18} />, title: 'Conductor asignado', desc: 'Un conductor verificado cerca de ti acepta el viaje en segundos.' },
    { num: '04', icon: <Shield size={18} />, title: 'Viaja con seguridad', desc: 'Seguimiento en tiempo real. Comparte tu viaje con contactos de confianza.' },
    { num: '05', icon: <CreditCard size={18} />, title: 'Paga como prefieras', desc: 'Efectivo, tarjeta o billetera digital. Recibe tu recibo al instante.' },
]

const ZONAS = [
    'Miraflores', 'San Isidro', 'Surco', 'La Molina',
    'San Borja', 'Barranco', 'Magdalena', 'Jesús María',
    'Lince', 'Pueblo Libre', 'San Miguel', 'Callao',
]

export default function ViajePage() {
    const { usuario } = useAuth()
    const { viajes, cargando } = useViajes()
    const viajeActual = viajes[0]

    const ESTADO_COLOR = {
        pendiente:  { text: 'text-yellow', bg: 'bg-yellow/10', border: 'border-yellow/20' },
        en_curso:   { text: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
        completado: { text: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
        cancelado:  { text: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
    }

    const totalGastado = viajes.reduce((acc, v) => acc + (parseFloat(v.precio) || 0), 0)

    const formatFecha = (fecha) => {
        if (!fecha) return '--'
        return new Date(fecha).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
    }

    if (usuario) return (
        <>
            <Navbar />
            <main className="bg-night min-h-screen px-6 py-10">
                <div className="max-w-[900px] mx-auto space-y-6">

                    {/* BIENVENIDA */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight">Bienvenido, {usuario.nombre?.split(' ')[0]}</h1>
                            <p className="text-gray-500 text-sm mt-1">¿A donde vas hoy?</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-yellow/10 border border-yellow/20 flex items-center justify-center">
                            <span className="text-yellow font-black text-lg">{usuario.nombre?.charAt(0).toUpperCase()}</span>
                        </div>
                    </div>

                    {/* ACCION RAPIDA */}
                    <a href="/reserva" className="block bg-yellow rounded-2xl p-5 no-underline hover:brightness-105 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-night font-black text-lg">Pedir un viaje</p>
                                <p className="text-night/60 text-xs mt-1">Conductores disponibles cerca de ti</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-night/10 flex items-center justify-center">
                                <LuCar className="text-night" size={24} />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4 text-night/70 text-xs font-bold">
                            <span>Solicitar ahora</span>
                            <LuArrowRight size={14} />
                        </div>
                    </a>

                    {/* STATS */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Viajes</p>
                            <p className="text-white font-black text-xl">{viajes.length}</p>
                        </div>
                        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Completados</p>
                            <p className="text-green-400 font-black text-xl">{viajes.filter(v => v.estado === 'completado').length}</p>
                        </div>
                        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Gastado</p>
                            <p className="text-yellow font-black text-xl">S/ {totalGastado.toFixed(0)}</p>
                        </div>
                    </div>

                    {/* ULTIMO VIAJE */}
                    {viajeActual && (
                        <div>
                            <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Ultimo viaje</h2>
                            <div className={"bg-white/[0.03] border rounded-2xl p-4 " + (ESTADO_COLOR[viajeActual.estado]?.border || 'border-white/5')}>
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <span className={"text-[10px] font-black uppercase px-2.5 py-1 rounded-lg " + (ESTADO_COLOR[viajeActual.estado]?.bg || '') + " " + (ESTADO_COLOR[viajeActual.estado]?.text || '')}>
                                        {viajeActual.estado}
                                    </span>
                                    <div className="text-right">
                                        <p className="text-yellow font-black text-sm">S/ {viajeActual.precio || '--'}</p>
                                        <p className="text-gray-600 text-[10px]">{formatFecha(viajeActual.creado_en)}</p>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex items-start gap-2">
                                        <LuNavigation className="text-yellow shrink-0 mt-0.5" size={12} />
                                        <p className="text-white text-xs font-medium">{viajeActual.origen}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <LuMapPin className="text-red-400 shrink-0 mt-0.5" size={12} />
                                        <p className="text-white text-xs font-medium">{viajeActual.destino}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TIPOS DE VIAJE */}
                    <div>
                        <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Tipos de viaje disponibles</h2>
                        <div className="grid grid-cols-3 gap-3">
                            {TIPOS_VIAJE.map(t => (
                                <a key={t.nombre} href="/reserva" className={"relative bg-white/[0.03] border rounded-2xl p-4 no-underline hover:bg-white/5 transition-all " + (t.popular ? 'border-yellow/30' : 'border-white/5')}>
                                    {t.popular && <span className="absolute -top-2 left-4 bg-yellow text-night text-[9px] font-black px-2 py-0.5 rounded-full">Popular</span>}
                                    <p className="text-2xl mb-2">{t.icon}</p>
                                    <p className="text-white text-xs font-black">{t.nombre}</p>
                                    <p className="text-gray-500 text-[10px] mt-0.5">{t.desc}</p>
                                    <p className="text-yellow text-xs font-bold mt-2">{t.precio}</p>
                                    <p className="text-gray-600 text-[9px]">{t.tiempo}</p>
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    )
    return (
        <>
            <Navbar />
            <main>

                {/* HERO */}
                <div className="bg-night px-6 md:px-14 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                    <div className="max-w-xl">
                        <span className="tag-yellow mb-5 inline-block">Solicita tu viaje</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter mb-4">
                            Tu destino,<br />
                            <span className="text-yellow">en minutos.</span>
                        </h1>
                        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
                            Conectamos pasajeros con conductores verificados cerca de ti.
                            Precio justo, viaje seguro, sin sorpresas.
                        </p>
                        <a href="/register" className="btn-yellow text-sm inline-flex items-center gap-2">
                            Solicitar viaje ahora <ArrowRight size={16} />
                        </a>
                    </div>

                    {/* Mini form */}
                    <div className="bg-night-2 border border-night-4 rounded-2xl p-6">
                        <p className="text-yellow text-xs font-extrabold uppercase tracking-widest mb-4">¿A dónde vas?</p>
                        <div className="flex items-center gap-3 bg-night-3 rounded-xl px-4 py-3 mb-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Punto de origen"
                                className="bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none flex-1 font-sans"
                            />
                        </div>
                        <div className="flex items-center gap-3 bg-night-3 rounded-xl px-4 py-3 mb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Punto de destino"
                                className="bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none flex-1 font-sans"
                            />
                        </div>
                        <a href="/register" className="btn-yellow w-full justify-center text-sm">
                            Ver precio estimado <ArrowRight size={15} />
                        </a>
                        <p className="text-gray-600 text-xs text-center mt-3">Sin costo de registro · Cancela cuando quieras</p>
                    </div>
                </div>

                {/* VIAJE EN CURSO */}
                <div className="bg-white px-8 md:px-14 py-12">
                    <span className="tag-black mb-4 inline-block">
                        Estado del viaje
                    </span>

                    <h2 className="text-4xl font-black text-night mb-8">
                        Viaje en curso
                    </h2>

                    {cargando && (
                        <p className="text-gray-500">
                        Cargando viajes...
                        </p>
                    )}


                    {!cargando && !viajeActual && (
                        <div className="bg-gray-100 rounded-xl p-6">
                        No tienes viajes activos.
                        </div>
                    )}

                    {!cargando && viajeActual && (
                    <div className="grid md:grid-cols-2 gap-8">

                        <div className="bg-night text-white rounded-xl p-6">
                            <h3 className="text-2xl font-bold mb-4">
                            Información del viaje
                            </h3>

                            <p className="mb-3">
                            <strong>Origen:</strong> {viajeActual.origen}
                            </p>

                            <p className="mb-3">
                            <strong>Destino:</strong> {viajeActual.destino}
                            </p>

                            <p className="mb-3">
                            <strong>Estado:</strong>
                            <span className="text-yellow ml-2">
                                {viajeActual.estado}
                            </span>
                            </p>

                            <p>
                            <strong>Fecha:</strong> {viajeActual.fecha}
                            </p>
                        </div>

                        <MapaViaje
                            origen={{
                                lat: -12.0464,
                                lng: -77.0428,
                            }}
                            destino={{
                                lat: -12.0864,
                                lng: -77.0352,
                            }}
                        />

                    </div>
                    )}
                </div>

                {/* TIPOS DE VIAJE */}
                <div className="bg-white px-8 md:px-14 py-16">
                    <span className="tag-black mb-4 inline-block">Tipos de viaje</span>
                    <h2 className="text-4xl font-black text-night tracking-tight mt-3 mb-2">
                        Elige lo que necesitas
                    </h2>
                    <p className="text-gray-400 text-sm mb-10 max-w-md">
                        Desde el viaje más económico hasta el más cómodo, tenemos la opción perfecta para ti.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {TIPOS_VIAJE.map(t => (
                            <div key={t.nombre} className={`border-2 rounded-2xl p-6 relative transition-all cursor-pointer hover:border-yellow ${t.popular ? 'border-yellow' : 'border-gray-100'}`}>
                                {t.popular && (
                                    <span className="absolute -top-3 left-6 tag-yellow text-xs">Más popular</span>
                                )}
                                <div className="text-4xl mb-4">{t.icon}</div>
                                <div className="text-lg font-black text-night mb-1">{t.nombre}</div>
                                <div className="text-sm text-gray-400 mb-4">{t.desc}</div>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                    <div>
                                        <div className="text-xs text-gray-400">Tiempo estimado</div>
                                        <div className="text-sm font-bold text-night">{t.tiempo}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-gray-400">Precio desde</div>
                                        <div className="text-sm font-black text-yellow">{t.precio}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CÓMO SOLICITAR */}
                <div className="bg-night px-8 md:px-14 py-16">
                    <span className="tag-yellow mb-4 inline-block">Cómo funciona</span>
                    <h2 className="text-4xl font-black text-white tracking-tight mt-3 mb-10">
                        Solicitar un viaje es <span className="text-yellow">muy fácil</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                        {PASOS.map(p => (
                            <div key={p.num} className="step-card rounded-3xl bg-night-2 p-6 border border-night-4">
                                <div className="step-num">{p.num}</div>
                                <div className="yellow-bar mb-4" />
                                <div className="icon-yellow mb-4 text-night">{p.icon}</div>
                                <div className="step-title">{p.title}</div>
                                <div className="step-desc">{p.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ZONAS DE COBERTURA */}
                <div className="bg-yellow px-6 md:px-14 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <div>
                            <span className="tag-black mb-4 inline-block">Cobertura</span>
                            <h2 className="text-4xl font-black text-night tracking-tight mt-3 mb-4">
                                Operamos en toda Lima Metropolitana
                            </h2>
                            <p className="text-gray-700 text-sm leading-relaxed mb-6 max-w-xl">
                                Más de 30 distritos cubiertos. Si tu zona no aparece, regístrate
                                y te avisamos cuando lleguemos.
                            </p>
                            <a href="/register" className="btn-black text-sm inline-flex items-center gap-2">
                                Ver todas las zonas <ArrowRight size={15} />
                            </a>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {ZONAS.map(z => (
                                <span key={z} className="bg-night text-yellow text-xs font-bold px-3 py-1.5 rounded-md">
                                    {z}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-night px-8 md:px-14 py-16 text-center">
                    <h2 className="text-4xl font-black text-white tracking-tight mb-4">
                        ¿Listo para tu primer viaje?
                    </h2>
                    <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
                        Regístrate gratis y solicita tu primer viaje en menos de 2 minutos.
                    </p>
                    <a href="/register" className="btn-yellow text-sm mx-auto">
                        Empezar ahora <ArrowRight size={16} />
                    </a>
                </div>
                <Footer/>
            </main>
        </>
    )
}