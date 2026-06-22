import { useAuth } from '../hooks/useAuth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { LuUser, LuMail, LuPhone, LuMapPin, LuCreditCard, LuShield } from 'react-icons/lu'

export default function PerfilPage() {
  const { usuario } = useAuth()

  const campos = [
    { icon: <LuUser size={16} />, label: 'Nombre', value: usuario?.nombre },
    { icon: <LuMail size={16} />, label: 'Email', value: usuario?.email },
    { icon: <LuCreditCard size={16} />, label: 'DNI', value: usuario?.dni || 'No registrado' },
    { icon: <LuPhone size={16} />, label: 'Teléfono', value: usuario?.telefono || 'No registrado' },
    { icon: <LuMapPin size={16} />, label: 'Dirección', value: usuario?.direccion || 'No registrada' },
    { icon: <LuShield size={16} />, label: 'Rol', value: usuario?.rol || 'pasajero' },
  ]

  return (
    <>
      <Navbar />
      <main className="bg-night min-h-screen pt-16 pb-16 px-6">
        <div className="w-full max-w-[520px] mx-auto">

          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-yellow/10 border border-yellow/20 flex items-center justify-center">
              <span className="text-yellow text-2xl font-black">
                {usuario?.nombre?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-white text-xl font-black tracking-tight">{usuario?.nombre}</h1>
              <span className="text-[10px] text-yellow font-bold uppercase tracking-widest">{usuario?.rol}</span>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 space-y-4">
            <h2 className="text-white text-xs font-black uppercase tracking-widest mb-4">Información de cuenta</h2>
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

        </div>
      </main>
      <Footer />
    </>
  )
}
