import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { LuUser, LuKeyRound, LuEye, LuEyeOff, LuArrowRight, LuCircleAlert } from 'react-icons/lu'
import { FcGoogle } from 'react-icons/fc'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../hooks/useAuth'

const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "El usuario o correo es requerido" })
    .email({ message: "Introduce un correo electronico valido" }),
  password: z.string()
    .min(6, { message: "La contrasena debe tener al menos 6 caracteres" })
})

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false)
  const [errorServidor, setErrorServidor] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    setErrorServidor(null)
    try {
      await login(data.email, data.password)
      navigate('/')
    } catch (error) {
      setErrorServidor(error.message)
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-night min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-[400px] bg-[#111] border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-white tracking-tighter">
              Login<span className="text-yellow">.</span>
            </h1>
            <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mt-1">
              Ingresa tus credenciales
            </p>
          </div>

          <button type="button" className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-3 px-4 flex items-center justify-center gap-3 hover:bg-white/[0.06] transition-all mb-6 group">
            <FcGoogle size={18} />
            <span className="text-xs font-bold text-gray-300">Continuar con Google</span>
          </button>

          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-[9px] font-black text-gray-700 uppercase tracking-[0.3em]">O</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          {errorServidor && (
            <div className="mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <LuCircleAlert size={14} className="text-red-500 shrink-0" />
              <p className="text-[10px] text-red-400 font-bold">{errorServidor}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="group">
              <div className={`flex items-center gap-3 bg-white/[0.02] border rounded-xl px-4 py-3 transition-all ${errors.email ? 'border-red-500/50' : 'border-white/5 focus-within:border-yellow/50'}`}>
                <LuUser className={`${errors.email ? 'text-red-500/50' : 'text-gray-600 group-focus-within:text-yellow'} transition-colors`} size={16} />
                <input
                  {...register("email")}
                  placeholder="Email o usuario"
                  className="bg-transparent text-white text-xs outline-none flex-1 font-medium placeholder:text-gray-700"
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-red-500 mt-1.5 ml-1 flex items-center gap-1 font-bold italic">
                  <LuCircleAlert size={12} /> {errors.email.message}
                </p>
              )}
            </div>

            <div className="group">
              <div className={`flex items-center gap-3 bg-white/[0.02] border rounded-xl px-4 py-3 transition-all ${errors.password ? 'border-red-500/50' : 'border-white/5 focus-within:border-yellow/50'}`}>
                <LuKeyRound className={`${errors.password ? 'text-red-500/50' : 'text-gray-600 group-focus-within:text-yellow'} transition-colors`} size={16} />
                <input
                  {...register("password")}
                  type={showPass ? "text" : "password"}
                  placeholder="Contrasena"
                  className="bg-transparent text-white text-xs outline-none flex-1 font-medium placeholder:text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="text-gray-700 hover:text-white transition-colors"
                >
                  {showPass ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-500 mt-1.5 ml-1 flex items-center gap-1 font-bold italic">
                  <LuCircleAlert size={12} /> {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-1">
              <a href="#" className="text-[10px] font-bold text-gray-600 hover:text-yellow transition-colors uppercase tracking-tighter">
                Olvidaste tu contrasena?
              </a>
            </div>

            <button
              disabled={isSubmitting}
              className="w-full bg-yellow disabled:bg-yellow/50 disabled:cursor-not-allowed text-night font-black py-3.5 rounded-xl mt-4 text-xs uppercase tracking-widest flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-yellow/5"
            >
              {isSubmitting ? 'Verificando...' : 'Entrar'} <LuArrowRight size={14} />
            </button>
          </form>

          <p className="text-center mt-8 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            Nuevo aqui? <a href="/register" className="text-white hover:text-yellow underline underline-offset-4 ml-1">Crea una cuenta</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
