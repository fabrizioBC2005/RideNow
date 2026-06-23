import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useViajes } from '../hooks/useViajes'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { LuUser, LuMail, LuPhone, LuMapPin, LuCreditCard, LuShield, LuCar, LuNavigation, LuCalendar, LuCircleCheck, LuCircleX, LuClock } from 'react-icons/lu'

const ESTADO_COLOR = {
  pendiente:  { text: 'text-yellow', bg: 'bg-yellow/10', border: 'border-yellow/20' },
  en_curso:   { text: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
  completado: { text: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
  cancelado:  { text: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
}

const CONDUCTORES = ['Carlos R.', 'Luis M.', 'Juan P.', 'Pedro A.', 'Miguel S.']
const AUTOS = ['Toyota Yaris', 'Hyundai i10', 'Kia Rio', 'Suzuki Swift', 'Nissan Versa']

export default function PerfilPage() {
  const { usuario } = useAuth()
  const { viajes, cargando } = useViajes()
  const [tab, setTab] = useState('perfil')

  const campos = [
    { icon: <LuUser size={16} />, label: 'Nombre', value: usuario?.nombre },
    { icon: <LuMail size={16} />, label: 'Email', value: usuario?.email },
    { icon: <LuCreditCard size={16} />, label: 'DNI', value: usuario?.dni || 'No registrado' },
    { icon: <LuPhone size={16} />, label: 'Telefono', value: usuario?.telefono || 'No registrado' },
    { icon: <LuMapPin size={16} />, label: 'Direccion', value: usuario?.direccion || 'No registrada' },
    { icon: <LuShield size={16} />, label: 'Rol', value: usuario?.rol || 'pasajero' },
  ]

  const formatFecha = (fecha) => {
    if (!fecha) return "--"
    const d = new Date(fecha)
    return d.toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
  }

  const totalGastado = viajes
    .filter(v => v.estado === "completado" || v.estado === "pendiente")
    .reduce((acc, v) => acc + (parseFloat(v.precio) || 0), 0)

  return (
    <>
      <Navbar />
      <main className="bg-night min-h-screen pt-8 pb-16 px-6">
        <div className="w-full max-w-[520px] mx-auto">

          {/* HEADER */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-yellow/10 border border-yellow/20 flex items-center justify-center">
              <span className="text-yellow text-2xl font-black">{usuario?.nombre?.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h1 className="text-white text-xl font-black tracking-tight">{usuario?.nombre}</h1>
              <span className="text-[10px] text-yellow font-bold uppercase tracking-widest">{usuario?.rol}</span>
            </div>
          </div>

          {/* TABS */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setTab('perfil')}
              className={"px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all " + (tab === 'perfil' ? 'bg-yellow text-night' : 'bg-white/5 text-gray-400 hover:bg-white/10')}
            >
              Mi perfil
            </button>
            <button
              onClick={() => setTab('historial')}
              className={"px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all " + (tab === 'historial' ? 'bg-yellow text-night' : 'bg-white/5 text-gray-400 hover:bg-white/10')}
            >
              Mis viajes
            </button>
          </div>

          {/* TAB PERFIL */}
          {tab === 'perfil' && (
            <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 space-y-4">
              <h2 className="text-white text-xs font-black uppercase tracking-widest mb-4">Informacion de cuenta</h2>
              {campos.map((c, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
                  <span className="text-gray-600 mt-0.5 shrink-0">{c.icon}</span>
                  <div>
                    <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold mb-0.5">{c.label}</p>
                    <p className="text-white text-xs font-medium">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB HISTORIAL */}
          {tab === 'historial' && (
            <div>
              {/* RESUMEN */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Total</p>
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

              {cargando && (
                <div className="space-y-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 animate-pulse">
                      <div className="h-3 bg-white/10 rounded w-32 mb-3" />
                      <div className="h-2 bg-white/5 rounded w-48 mb-2" />
                      <div className="h-2 bg-white/5 rounded w-36" />
                    </div>
                  ))}
                </div>
              )}

              {!cargando && viajes.length === 0 && (
                <div className="text-center py-16">
                  <LuCar className="text-gray-700 mx-auto mb-4" size={40} />
                  <p className="text-gray-500 font-bold text-sm">Aun no tienes viajes</p>
                  <a href="/reserva" className="inline-block mt-4 bg-yellow text-night font-black text-xs px-6 py-3 rounded-xl hover:brightness-110 transition-all">
                    Pedir mi primer viaje
                  </a>
                </div>
              )}

              {!cargando && viajes.length > 0 && (
                <div className="space-y-3">
                  {viajes.map((v, i) => {
                    const estado = ESTADO_COLOR[v.estado] || ESTADO_COLOR.pendiente
                    const conductorIdx = i % CONDUCTORES.length
                    return (
                      <div key={v.id || i} className={"bg-white/[0.03] border rounded-2xl p-4 " + estado.border}>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <span className={"text-[10px] font-black uppercase px-2.5 py-1 rounded-lg " + estado.bg + " " + estado.text}>
                            {v.estado}
                          </span>
                          <div className="text-right">
                            <p className="text-yellow font-black text-sm">S/ {v.precio || "--"}</p>
                            <p className="text-gray-600 text-[10px] mt-0.5">{formatFecha(v.creado_en)}</p>
                          </div>
                        </div>
                        <div className="space-y-1.5 mb-3">
                          <div className="flex items-start gap-2">
                            <LuNavigation className="text-yellow shrink-0 mt-0.5" size={12} />
                            <p className="text-white text-[11px] font-medium leading-snug">{v.origen}</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <LuMapPin className="text-red-400 shrink-0 mt-0.5" size={12} />
                            <p className="text-white text-[11px] font-medium leading-snug">{v.destino}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-yellow/10 border border-yellow/20 flex items-center justify-center">
                              <span className="text-yellow font-black text-[9px]">{CONDUCTORES[conductorIdx][0]}</span>
                            </div>
                            <div>
                              <p className="text-white text-[10px] font-bold">{CONDUCTORES[conductorIdx]}</p>
                              <p className="text-gray-600 text-[9px]">{AUTOS[conductorIdx]}</p>
                            </div>
                          </div>
                          <span className="text-gray-500 text-[10px]">Efectivo</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
