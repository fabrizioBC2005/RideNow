import Navbar from '../components/Navbar'
import { MapPin, Clock, Star, Shield, ArrowRight, CreditCard } from 'lucide-react'

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
    return (
        <>
            <Navbar />
            <main>

                {/* HERO */}
                <div className="bg-night px-8 md:px-14 py-20 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="tag-yellow mb-5 inline-block">Solicita tu viaje</span>
                        <h1 className="text-5xl md:text-6xl font-black text-white leading-none tracking-tighter mb-4">
                            Tu destino,<br />
                            <span className="text-yellow">en minutos.</span>
                        </h1>
                        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
                            Conectamos pasajeros con conductores verificados cerca de ti.
                            Precio justo, viaje seguro, sin sorpresas.
                        </p>
                        <a href="/register" className="btn-yellow text-sm">
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

                {/* TIPOS DE VIAJE */}
                <div className="bg-white px-8 md:px-14 py-16">
                    <span className="tag-black mb-4 inline-block">Tipos de viaje</span>
                    <h2 className="text-4xl font-black text-night tracking-tight mt-3 mb-2">
                        Elige lo que necesitas
                    </h2>
                    <p className="text-gray-400 text-sm mb-10 max-w-md">
                        Desde el viaje más económico hasta el más cómodo, tenemos la opción perfecta para ti.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                        {TIPOS_VIAJE.map(t => (
                            <div key={t.nombre} className={`border-2 rounded-xl p-6 relative transition-all cursor-pointer hover:border-yellow ${t.popular ? 'border-yellow' : 'border-gray-100'}`}>
                                {t.popular && (
                                    <span className="absolute -top-3 left-6 tag-yellow text-xs">Más popular</span>
                                )}
                                <div className="text-4xl mb-4">{t.icon}</div>
                                <div className="text-lg font-black text-night mb-1">{t.nombre}</div>
                                <div className="text-sm text-gray-400 mb-4">{t.desc}</div>
                                <div className="flex justify-between items-center">
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
                    <div className="grid md:grid-cols-5 gap-0.5">
                        {PASOS.map(p => (
                            <div key={p.num} className="step-card">
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
                <div className="bg-yellow px-8 md:px-14 py-16">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="tag-black mb-4 inline-block">Cobertura</span>
                            <h2 className="text-4xl font-black text-night tracking-tight mt-3 mb-4">
                                Operamos en toda Lima Metropolitana
                            </h2>
                            <p className="text-gray-700 text-sm leading-relaxed mb-6">
                                Más de 30 distritos cubiertos. Si tu zona no aparece, regístrate
                                y te avisamos cuando lleguemos.
                            </p>
                            <a href="/register" className="btn-black text-sm">
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