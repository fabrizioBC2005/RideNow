import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { ArrowRight, Building2, Users, BarChart3, Headphones, CheckCircle } from 'lucide-react'

const PLANES = [
    {
        nombre: 'Starter',
        precio: 'S/ 299',
        periodo: '/mes',
        desc: 'Ideal para pequeñas empresas',
        features: ['Hasta 10 empleados', '50 viajes/mes incluidos', 'Facturación centralizada', 'Soporte por email'],
        popular: false,
        cta: 'Comenzar gratis',
    },
    {
        nombre: 'Business',
        precio: 'S/ 799',
        periodo: '/mes',
        desc: 'Para empresas en crecimiento',
        features: ['Hasta 50 empleados', '200 viajes/mes incluidos', 'Dashboard de control', 'Soporte prioritario 24/7', 'Reportes mensuales'],
        popular: true,
        cta: 'Elegir Business',
    },
    {
        nombre: 'Enterprise',
        precio: 'A medida',
        periodo: '',
        desc: 'Soluciones personalizadas',
        features: ['Empleados ilimitados', 'Viajes ilimitados', 'API de integración', 'Gestor de cuenta dedicado', 'SLA garantizado'],
        popular: false,
        cta: 'Contactar ventas',
    },
]

const BENEFICIOS = [
    { icon: <Building2 size={20} />, title: 'Facturación centralizada', desc: 'Un solo recibo para todos los viajes de tu empresa. Simplifica tu contabilidad.' },
    { icon: <Users size={20} />, title: 'Gestión de empleados', desc: 'Añade y administra empleados fácilmente. Asigna límites de gasto por persona.' },
    { icon: <BarChart3 size={20} />, title: 'Reportes en tiempo real', desc: 'Dashboard completo con estadísticas de uso, gastos y rutas más frecuentes.' },
    { icon: <Headphones size={20} />, title: 'Soporte empresarial 24/7', desc: 'Línea directa con nuestro equipo de atención para empresas. Respuesta en minutos.' },
]

const CLIENTES = ['Banco de Lima', 'Constructora Sur', 'Clínica Moderna', 'TechPeru SAC', 'Grupo Andino', 'LogiExpress']

export default function NegociosPage() {
    return (
        <>
            <Navbar />
            <main>

                {/* HERO */}
                <div className="bg-night px-8 md:px-14 py-20 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="tag-yellow mb-5 inline-block">RideNow para empresas</span>
                        <h1 className="text-5xl md:text-6xl font-black text-white leading-none tracking-tighter mb-4">
                            Moviliza tu<br />
                            <span className="text-yellow">equipo sin</span><br />
                            complicaciones.
                        </h1>
                        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
                            Gestiona los viajes de todos tus empleados desde un solo lugar.
                            Facturación centralizada, control total y soporte dedicado.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a href="/register?plan=business" className="btn-yellow text-sm">
                                Solicitar demo <ArrowRight size={16} />
                            </a>
                            <a href="#planes" className="btn-ghost text-sm">
                                Ver planes
                            </a>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { val: '200+', label: 'Empresas activas' },
                            { val: '98%', label: 'Satisfacción de clientes' },
                            { val: 'S/0', label: 'Costo de implementación' },
                            { val: '24/7', label: 'Soporte empresarial' },
                        ].map(s => (
                            <div key={s.label} className="bg-night-2 border border-night-4 rounded-xl p-5">
                                <div className="text-3xl font-black text-yellow tracking-tighter">{s.val}</div>
                                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CLIENTES */}
                <div className="bg-yellow px-8 md:px-14 py-8">
                    <p className="text-night text-xs font-extrabold uppercase tracking-widest text-center mb-5">
                        Empresas que confían en RideNow
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {CLIENTES.map(c => (
                            <span key={c} className="bg-night text-yellow text-xs font-bold px-4 py-2 rounded-md">
                                {c}
                            </span>
                        ))}
                    </div>
                </div>

                {/* BENEFICIOS */}
                <div className="bg-white px-8 md:px-14 py-16">
                    <span className="tag-black mb-4 inline-block">Beneficios</span>
                    <h2 className="text-4xl font-black text-night tracking-tight mt-3 mb-2">
                        Todo lo que tu empresa necesita
                    </h2>
                    <p className="text-gray-400 text-sm mb-10 max-w-md">
                        Diseñado para equipos de trabajo que necesitan movilidad confiable y control total.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
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

                {/* PLANES */}
                <div id="planes" className="bg-night px-8 md:px-14 py-16">
                    <span className="tag-yellow mb-4 inline-block">Planes</span>
                    <h2 className="text-4xl font-black text-white tracking-tight mt-3 mb-2">
                        Elige el plan <span className="text-yellow">ideal</span>
                    </h2>
                    <p className="text-gray-500 text-sm mb-10 max-w-md">
                        Sin contratos anuales obligatorios. Cambia o cancela cuando quieras.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                        {PLANES.map(p => (
                            <div key={p.nombre} className={`rounded-xl p-6 relative border-2 ${p.popular ? 'border-yellow bg-night-2' : 'border-night-4 bg-night-2'}`}>
                                {p.popular && (
                                    <span className="absolute -top-3 left-6 tag-yellow text-xs">Más popular</span>
                                )}
                                <div className="text-xs font-extrabold text-gray-500 uppercase tracking-widest mb-2">{p.nombre}</div>
                                <div className="text-4xl font-black text-white tracking-tighter mb-1">
                                    {p.precio}<span className="text-lg font-normal text-gray-500">{p.periodo}</span>
                                </div>
                                <div className="text-xs text-gray-500 mb-6">{p.desc}</div>
                                <ul className="space-y-2 mb-6">
                                    {p.features.map(f => (
                                        <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                                            <CheckCircle size={13} className="text-yellow flex-shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <a href="/register?plan=business"
                                    className={`w-full justify-center text-sm ${p.popular ? 'btn-yellow' : 'btn-ghost'}`}
                                    style={{ display: 'flex' }}>
                                    {p.cta}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-yellow px-8 md:px-14 py-16 text-center">
                    <h2 className="text-4xl font-black text-night tracking-tight mb-4">
                        ¿Listo para empezar?
                    </h2>
                    <p className="text-gray-700 text-sm mb-8 max-w-sm mx-auto">
                        Agenda una demo gratuita y te mostramos cómo RideNow puede transformar la movilidad de tu empresa.
                    </p>
                    <a href="/register?plan=business" className="btn-black text-sm mx-auto">
                        Solicitar demo gratuita <ArrowRight size={16} />
                    </a>
                </div>
                <Footer/>
            </main>
        </>
    )
}