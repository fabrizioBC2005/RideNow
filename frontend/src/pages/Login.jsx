import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { LuUser, LuKeyRound, LuEye, LuEyeOff, LuArrowRight, LuCircleAlert, LuMapPin, LuCar, LuShield, LuStar } from 'react-icons/lu'
import Navbar from '../components/Navbar'
import { useAuth } from '../hooks/useAuth'

const loginSchema = z.object({
  email: z.string().min(1, "El correo es requerido").email("Correo invalido"),
  password: z.string().min(6, "Minimo 6 caracteres")
})

const FEATURES = [
  { icon: <LuCar size={16} />, text: 'Conductores verificados cerca de ti' },
  { icon: <LuMapPin size={16} />, text: 'Seguimiento en tiempo real' },
  { icon: <LuShield size={16} />, text: 'Viajes seguros y protegidos' },
  { icon: <LuStar size={16} />, text: 'Calificaciones y resenas reales' },
]

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false)
  const [errorServidor, setErrorServidor] = useState(null)
  const [ubicacion, setUbicacion] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema)
  })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUbicacion({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      )
    }
  }, [])

  const onSubmit = async (data) => {
    setErrorServidor(null)
    try {
      await login(data.email, data.password, ubicacion)
      navigate('/')
    } catch (error) {
      setErrorServidor(error.message)
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-night min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-[900px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">

          {/* LADO IZQUIERDO - BRANDING */}
          <div className="bg-yellow p-10 flex flex-col justify-between hidden lg:flex">
            <div>
              <p className="text-night font-black text-3xl tracking-tight">Ride<span className="text-night/60">Now</span></p>
              <h2 className="text-night font-black text-4xl tracking-tight mt-8 leading-tight">
                Tu viaje,<br />tu manera.
              </h2>
              <p className="text-night/60 text-sm mt-4 max-w-xs">
                Conectamos pasajeros con conductores verificados. Precio justo, sin sorpresas.
              </p>
            </div>

            <div className="space-y-4 mt-10">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-night/10 flex items-center justify-center text-night shrink-0">
                    {f.icon}
                  </div>
                  <p className="text-night/70 text-xs font-bold">{f.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              {ubicacion ? (
                <div className="flex items-center gap-2 bg-night/10 rounded-xl px-3 py-2">
                  <LuMapPin className="text-night" size={14} />
                  <p className="text-night text-[10px] font-bold">Ubicacion detectada</p>
                  <div className="w-2 h-2 rounded-full bg-green-600 ml-auto animate-pulse" />
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-night/10 rounded-xl px-3 py-2">
                  <LuMapPin className="text-night/40" size={14} />
                  <p className="text-night/40 text-[10px] font-bold">Detectando ubicacion...</p>
                </div>
              )}
            </div>
          </div>

          {/* LADO DERECHO - FORMULARIO */}
          <div className="bg-[#0a0a0a] p-8 md:p-10 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-2xl font-black text-white tracking-tighter">
                Bienvenido<span className="text-yellow">.</span>
              </h1>
              <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mt-1">
                Ingresa a tu cuenta
              </p>
            </div>

            {errorServidor && (
              <div className="mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <LuCircleAlert size={14} className="text-red-500 shrink-0" />
                <p className="text-[10px] text-red-400 font-bold">{errorServidor}</p>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="group">
                <div className={"flex items-center gap-3 bg-white/[0.02] border rounded-xl px-4 py-3.5 transition-all " + (errors.email ? 'border-red-500/50' : 'border-white/5 focus-within:border-yellow/50')}>
                  <LuUser className="text-gray-600 group-focus-within:text-yellow transition-colors" size={16} />
                  <input
                    {...register("email")}
                    placeholder="tu@email.com"
                    className="bg-transparent text-white text-xs outline-none flex-1 font-medium placeholder:text-gray-700"
                  />
                </div>
                {errors.email && <p className="text-[10px] text-red-500 mt-1.5 ml-1 font-bold italic">{errors.email.message}</p>}
              </div>

              <div className="group">
                <div className={"flex items-center gap-3 bg-white/[0.02] border rounded-xl px-4 py-3.5 transition-all " + (errors.password ? 'border-red-500/50' : 'border-white/5 focus-within:border-yellow/50')}>
                  <LuKeyRound className="text-gray-600 group-focus-within:text-yellow transition-colors" size={16} />
                  <input
                    {...register("password")}
                    type={showPass ? "text" : "password"}
                    placeholder="Contrasena"
                    className="bg-transparent text-white text-xs outline-none flex-1 font-medium placeholder:text-gray-700"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-700 hover:text-white transition-colors">
                    {showPass ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-[10px] text-red-500 mt-1.5 ml-1 font-bold italic">{errors.password.message}</p>}
              </div>

              <div className="flex justify-end">
                <a href="#" className="text-[10px] font-bold text-gray-600 hover:text-yellow transition-colors uppercase tracking-tighter">
                  Olvidaste tu contrasena?
                </a>
              </div>

              <button
                disabled={isSubmitting}
                className="w-full bg-yellow disabled:bg-yellow/50 disabled:cursor-not-allowed text-night font-black py-4 rounded-xl text-xs uppercase tracking-widest flex justify-center items-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-yellow/10"
              >
                {isSubmitting ? 'Verificando...' : 'Entrar'} <LuArrowRight size={14} />
              </button>
            </form>

            {/* UBICACION EN MOBILE */}
            <div className="lg:hidden mt-4">
              {ubicacion ? (
                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2">
                  <LuMapPin className="text-green-400" size={14} />
                  <p className="text-green-400 text-[10px] font-bold">Ubicacion detectada</p>
                  <div className="w-2 h-2 rounded-full bg-green-400 ml-auto animate-pulse" />
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
                  <LuMapPin className="text-gray-600" size={14} />
                  <p className="text-gray-600 text-[10px] font-bold">Detectando ubicacion...</p>
                </div>
              )}
            </div>

            <p className="text-center mt-8 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              Nuevo aqui? <a href="/register" className="text-white hover:text-yellow underline underline-offset-4 ml-1">Crea una cuenta</a>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
