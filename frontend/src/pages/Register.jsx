import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { LuUser, LuMail, LuPhone, LuEye, LuEyeOff, LuArrowRight, LuMapPin, LuCircleAlert, LuLocateFixed, LuCreditCard } from 'react-icons/lu'
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import { GOOGLE_MAPS_LIBRARIES } from '../config/googleMaps'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../hooks/useAuth'

const registerSchema = z.object({
  fullName: z.string().min(1, "Ingresa tu nombre").min(3, "Nombre muy corto"),
  email: z.string().min(1, "Ingresa tu email").email("Email invalido"),
  dni: z.string().min(1, "Ingresa tu DNI").length(8, "El DNI debe tener 8 digitos").regex(/^\d+$/, "Solo numeros"),
  phone: z.string()
    .min(1, "Ingresa tu celular")
    .min(11, "Faltan numeros")
    .regex(/^9/, "Debe iniciar con 9"),
  address: z.string().optional(),
  password: z.string().min(1, "Crea una clave").min(8, "Minimo 8 caracteres"),
  confirmPassword: z.string().min(1, "Confirma tu clave")
}).refine((data) => data.password === data.confirmPassword, {
  message: "No coinciden",
  path: ["confirmPassword"],
})

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false)
  const [errorServidor, setErrorServidor] = useState(null)
  const { register: authRegister } = useAuth()
  const navigate = useNavigate()
  const [autocomplete, setAutocomplete] = useState(null)
  const [coords, setCoords] = useState({ latitud: null, longitud: null })
  const [loadingGeo, setLoadingGeo] = useState(false)

  const usarUbicacionActual = () => {
    if (!navigator.geolocation) return alert("Tu navegador no soporta geolocalización")
    setLoadingGeo(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setCoords({ latitud: latitude, longitud: longitude })
        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
          if (status === "OK" && results[0]) {
            setValue("address", results[0].formatted_address, { shouldValidate: true })
          }
          setLoadingGeo(false)
        })
      },
      () => { alert("No se pudo obtener tu ubicación"); setLoadingGeo(false) }
    )
  }
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  })
  const onLoadAutocomplete = (auto) => setAutocomplete(auto)
  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace()
      if (place.formatted_address) {
        setValue('address', place.formatted_address, { shouldValidate: true })
      }
    }
  }

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, '')
    if (val.length > 9) val = val.slice(0, 9)
    const formatted = val.replace(/(\d{3})(?=\d)/g, '$1 ')
    setValue('phone', formatted, { shouldValidate: true })
  }

  const onSubmit = async (data) => {
    setErrorServidor(null)
    try {
      const { confirmPassword, ...datosParaApi } = data
      datosParaApi.latitud = coords.latitud
      datosParaApi.longitud = coords.longitud
      await authRegister(datosParaApi)
      navigate('/')
    } catch (error) {
      setErrorServidor(error.message)
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-night min-h-screen flex items-center justify-center pt-28 pb-16 px-6">
        <div className="w-full max-w-[520px] mx-auto bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-white tracking-tighter">Registro<span className="text-yellow">.</span></h1>
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold mt-1">Crea tu cuenta de RideNow</p>
          </div>

          {errorServidor && (
            <div className="mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <LuCircleAlert size={14} className="text-red-500 shrink-0" />
              <p className="text-[10px] text-red-400 font-bold">{errorServidor}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="group">
              <div className={`flex items-center gap-3 bg-white/[0.02] border rounded-xl px-4 py-3.5 transition-all ${errors.fullName ? 'border-red-500/40' : 'border-white/5 focus-within:border-yellow/40'}`}>
                <LuUser className="text-gray-600" size={16} />
                <input {...register("fullName")} placeholder="Nombre completo" className="bg-transparent text-white text-xs outline-none flex-1" />
              </div>
              {errors.fullName && <p className="text-[9px] text-red-500 font-bold italic mt-1 ml-1 uppercase">{errors.fullName.message}</p>}
            </div>

            <div className="group">
              <div className={`flex items-center gap-3 bg-white/[0.02] border rounded-xl px-4 py-3.5 transition-all ${errors.email ? 'border-red-500/40' : 'border-white/5 focus-within:border-yellow/40'}`}>
                <LuMail className="text-gray-600" size={16} />
                <input {...register("email")} placeholder="tu@email.com" className="bg-transparent text-white text-xs outline-none flex-1" />
              </div>
              {errors.email && <p className="text-[9px] text-red-500 font-bold italic mt-1 ml-1 uppercase">{errors.email.message}</p>}
            </div>

            <div className="group">
              <div className={`flex items-center gap-3 bg-white/[0.02] border rounded-xl px-4 py-3.5 transition-all ${errors.dni ? 'border-red-500/40' : 'border-white/5 focus-within:border-yellow/40'}`}>
                <LuCreditCard className="text-gray-600" size={16} />
                <input {...register("dni")} placeholder="DNI (8 digitos)" maxLength={8} className="bg-transparent text-white text-xs outline-none flex-1" />
              </div>
              {errors.dni && <p className="text-[9px] text-red-500 font-bold italic mt-1 ml-1 uppercase">{errors.dni.message}</p>}
            </div>
                        <div className="group">
              <div className={`flex items-center gap-3 bg-white/[0.02] border rounded-xl px-4 py-3.5 transition-all ${errors.phone ? 'border-red-500/40' : 'border-white/5 focus-within:border-yellow/40'}`}>
                <LuPhone className="text-gray-600" size={16} />
                <span className="text-[10px] font-black text-gray-800 border-r border-white/5 pr-2">+51</span>
                <input
                  {...register("phone")}
                  onChange={handlePhoneChange}
                  placeholder="999 999 999"
                  className="bg-transparent text-white text-xs outline-none flex-1 tracking-widest font-bold"
                />
              </div>
              {errors.phone && <p className="text-[9px] text-red-500 font-bold italic mt-1 ml-1 uppercase">{errors.phone.message}</p>}
            </div>

            <div className="group">
              <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 focus-within:border-yellow/40 transition-all">
                <LuMapPin className="text-gray-600 shrink-0" size={16} />
                {isLoaded ? (
                  <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
                    <input {...register("address")} placeholder="Direccion (Opcional)" className="bg-transparent text-white text-xs outline-none flex-1" />
                  </Autocomplete>
                ) : (
                  <input {...register("address")} placeholder="Direccion (Opcional)" className="bg-transparent text-white text-xs outline-none flex-1" />
                )}
                <button type="button" onClick={usarUbicacionActual} className="shrink-0 text-gray-600 hover:text-yellow transition-colors" title="Usar mi ubicacion actual">
                  {loadingGeo ? <span className="text-[10px] text-gray-500">...</span> : <LuLocateFixed size={14} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className={`flex items-center gap-2 bg-white/[0.02] border rounded-xl px-4 py-3.5 transition-all ${errors.password ? 'border-red-500/40' : 'border-white/5 focus-within:border-yellow/40'}`}>
                  <input {...register("password")} type={showPass ? "text" : "password"} placeholder="Clave" className="bg-transparent text-white text-[11px] outline-none flex-1" />
                </div>
              </div>
              <div>
                <div className={`flex items-center gap-2 bg-white/[0.02] border rounded-xl px-4 py-3.5 transition-all ${errors.confirmPassword ? 'border-red-500/40' : 'border-white/5 focus-within:border-yellow/40'}`}>
                  <input {...register("confirmPassword")} type={showPass ? "text" : "password"} placeholder="Repetir" className="bg-transparent text-white text-[11px] outline-none flex-1" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-700">
                    {showPass ? <LuEyeOff size={14} /> : <LuEye size={14} />}
                  </button>
                </div>
              </div>
            </div>
            {(errors.password || errors.confirmPassword) && (
              <p className="text-[8px] text-red-500 font-black italic text-center uppercase tracking-tighter">
                {errors.password?.message || errors.confirmPassword?.message}
              </p>
            )}

            <button
              disabled={isSubmitting}
              className="w-full bg-yellow disabled:bg-yellow/50 disabled:cursor-not-allowed text-night font-black py-4 rounded-xl mt-4 text-[11px] uppercase tracking-[0.2em] flex justify-center items-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-yellow/5"
            >
              {isSubmitting ? 'Registrando...' : 'Finalizar Registro'} <LuArrowRight size={14} />
            </button>
          </form>

          <p className="text-center mt-8 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            Ya tienes cuenta? <a href="/login" className="text-white hover:text-yellow transition-colors underline underline-offset-4 ml-1">Entrar</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}













