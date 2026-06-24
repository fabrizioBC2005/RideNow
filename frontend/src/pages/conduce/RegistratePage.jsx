import { useState } from "react"
import { LuUser, LuMail, LuPhone, LuKeyRound, LuCar, LuShield, LuArrowRight, LuCircleAlert, LuCircleCheck, LuCreditCard } from "react-icons/lu"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

function Field({ name, placeholder, icon, type = "text", maxLength, formData, handleChange, errors }) {
  return (
    <div>
      <div className={"flex items-center gap-3 bg-white/[0.02] border rounded-xl px-4 py-3.5 transition-all " + (errors[name] ? "border-red-500/50" : "border-white/5 focus-within:border-yellow/50")}>
        <span className="text-gray-600 shrink-0">{icon}</span>
        <input
          type={type} name={name} value={formData[name]}
          onChange={handleChange} placeholder={placeholder}
          maxLength={maxLength}
          className="bg-transparent text-white text-xs outline-none flex-1 placeholder:text-gray-700"
        />
      </div>
      {errors[name] && <p className="text-[10px] text-red-500 mt-1 ml-1 font-bold italic">{errors[name]}</p>}
    </div>
  )
}

export default function RegistratePage() {
  const [formData, setFormData] = useState({
    fullName: "", dni: "", email: "", phone: "",
    password: "", confirmPassword: "",
    licencia: "", vehiculo: "", placa: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [serverError, setServerError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
  }

  const validate = () => {
    const e = {}
    if (!formData.fullName.trim()) e.fullName = "Nombre requerido"
    if (!/^\d{8}$/.test(formData.dni)) e.dni = "DNI debe tener 8 digitos"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Correo invalido"
    if (!/^9\d{8}$/.test(formData.phone)) e.phone = "Celular invalido (9XXXXXXXX)"
    if (formData.password.length < 8) e.password = "Minimo 8 caracteres"
    if (formData.password !== formData.confirmPassword) e.confirmPassword = "Las contrasenas no coinciden"
    if (!formData.licencia.trim()) e.licencia = "Licencia requerida"
    if (!formData.vehiculo.trim()) e.vehiculo = "Vehiculo requerido"
    if (!formData.placa.trim()) e.placa = "Placa requerida"
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return }
    setIsSubmitting(true)
    setServerError(null)
    try {
      const res = await fetch("http://localhost:3000/api/conductores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.fullName,
          email: formData.email,
          password: formData.password,
          telefono: formData.phone,
          direccion: `DNI: ${formData.dni}`,
          licencia: formData.licencia.toUpperCase(),
          vehiculo: formData.vehiculo,
          placa: formData.placa.toUpperCase(),
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error del servidor")
      setSubmitSuccess(true)
      setFormData({ fullName: "", dni: "", email: "", phone: "", password: "", confirmPassword: "", licencia: "", vehiculo: "", placa: "" })
    } catch (err) {
      setServerError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }



  if (submitSuccess) return (
    <>
      <Navbar />
      <main className="bg-night min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <LuCircleCheck className="text-green-400" size={36} />
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Registro exitoso<span className="text-yellow">.</span></h1>
          <p className="text-gray-500 text-sm mb-8">Ya eres parte de RideNow como conductor. Inicia sesion para acceder a tu panel.</p>
          <a href="/login" className="inline-flex items-center gap-2 bg-yellow text-night font-black text-xs px-6 py-3.5 rounded-xl hover:brightness-110 transition-all no-underline">
            Iniciar sesion <LuArrowRight size={14} />
          </a>
        </div>
      </main>
      <Footer />
    </>
  )

  return (
    <>
      <Navbar />
      <main className="bg-night min-h-screen py-12 px-6">
        <div className="w-full max-w-[560px] mx-auto">

          <div className="mb-8">
            <span className="text-[10px] text-yellow font-black uppercase tracking-widest">Conduce con RideNow</span>
            <h1 className="text-3xl font-black text-white tracking-tight mt-2">Registrate como conductor<span className="text-yellow">.</span></h1>
            <p className="text-gray-500 text-sm mt-2">Completa tus datos y empieza a generar ingresos.</p>
          </div>

          {serverError && (
            <div className="mb-6 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <LuCircleAlert size={14} className="text-red-500 shrink-0" />
              <p className="text-[10px] text-red-400 font-bold">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Datos personales</p>
            <Field name="fullName" placeholder="Nombre completo" icon={<LuUser size={16} />} formData={formData} handleChange={handleChange} errors={errors} />
            <Field name="dni" placeholder="DNI (8 digitos)" icon={<LuCreditCard size={16} />} maxLength={8} formData={formData} handleChange={handleChange} errors={errors} />
            <Field name="email" placeholder="Correo electronico" icon={<LuMail size={16} />} type="email" formData={formData} handleChange={handleChange} errors={errors} />
            <Field name="phone" placeholder="Celular (9XXXXXXXX)" icon={<LuPhone size={16} />} maxLength={9} formData={formData} handleChange={handleChange} errors={errors} />
            <Field name="password" placeholder="Contrasena" icon={<LuKeyRound size={16} />} type="password" formData={formData} handleChange={handleChange} errors={errors} />
            <Field name="confirmPassword" placeholder="Repetir contrasena" icon={<LuKeyRound size={16} />} type="password" formData={formData} handleChange={handleChange} errors={errors} />

            <div className="pt-2">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-4">Datos del vehiculo</p>
              <div className="space-y-4">
                <Field name="licencia" placeholder="N de Licencia de Conducir" icon={<LuShield size={16} />} formData={formData} handleChange={handleChange} errors={errors} />
                <Field name="vehiculo" placeholder="Vehiculo (Ej: Toyota Yaris 2022)" icon={<LuCar size={16} />} formData={formData} handleChange={handleChange} errors={errors} />
                <Field name="placa" placeholder="Placa (Ej: ABC-123)" icon={<LuCreditCard size={16} />} formData={formData} handleChange={handleChange} errors={errors} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow disabled:bg-yellow/50 disabled:cursor-not-allowed text-night font-black py-4 rounded-xl text-xs uppercase tracking-widest flex justify-center items-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all mt-4"
            >
              {isSubmitting ? "Procesando..." : "Registrarme como conductor"} <LuArrowRight size={14} />
            </button>
          </form>

          <p className="text-center mt-6 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            Ya tienes cuenta? <a href="/login" className="text-white hover:text-yellow underline underline-offset-4 ml-1">Iniciar sesion</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
