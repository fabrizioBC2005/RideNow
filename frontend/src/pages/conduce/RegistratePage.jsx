import { useState } from "react";
import {
  LuUser,
  LuMail,
  LuPhone,
  LuTrendingUp,
  LuCalendar,
  LuDollarSign,
  LuAward,
  LuShieldCheck,
  LuHeartHandshake,
  LuPercent,
} from "react-icons/lu";
import { FaRegIdCard, FaIdCard, FaCar, FaCreditCard } from "react-icons/fa6";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function RegistratePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    dni: "",
    email: "",
    phone: "",
    licencia: "", 
    vehiculo: "", 
    placa: "",    
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dniRegex = /^\d{8}$/;
    const phoneRegex = /^9\d{8}$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre completo es obligatorio.";
    } else if (formData.fullName.trim().length < 4) {
      newErrors.fullName = "Ingresa un nombre válido.";
    }

    if (!formData.dni) {
      newErrors.dni = "El DNI es obligatorio.";
    } else if (!dniRegex.test(formData.dni)) {
      newErrors.dni = "El DNI debe tener exactamente 8 dígitos.";
    }

    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ingresa un correo válido.";
    }

    if (!formData.phone) {
      newErrors.phone = "El número de celular es obligatorio.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Debe ser un número de 9 dígitos (9XXXXXXXX).";
    }

    if (!formData.licencia.trim()) {
      newErrors.licencia = "La licencia de conducir es obligatoria.";
    }
    if (!formData.vehiculo.trim()) {
      newErrors.vehiculo = "El modelo del vehículo es obligatorio.";
    }
    if (!formData.placa.trim()) {
      newErrors.placa = "La placa es obligatoria.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setErrors({});
    setSubmitSuccess(false);
  
    try {
      const payload = {
        nombre: formData.fullName,
        email: formData.email,
        password: `Tmp_${formData.dni}`,
        telefono: formData.phone,
        direccion: `DNI: ${formData.dni}`,
        licencia: formData.licencia.toUpperCase(),
        vehiculo: formData.vehiculo,
        placa: formData.placa.toUpperCase(),
      };
      const response = await fetch("http://localhost:3000/api/conductores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const textResponse = await response.text();
      let data = {};
      if (textResponse) {
        data = JSON.parse(textResponse);
      }
      if (!response.ok) {
        throw new Error(data.error || `Error del servidor (Código ${response.status})`);
      }  
      if (data.usuario_id) {
        localStorage.setItem("usuario_id", data.usuario_id);
      }

      setSubmitSuccess(true);
      setFormData({ fullName: "", dni: "", email: "", phone: "", licencia: "", vehiculo: "", placa: "" });
    } catch (error) {
      console.error("Backend connection error:", error);
      setErrors({
        server: error.message || "Hubo un problema con el servidor. Inténtalo más tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Navbar />

      <div className="px-4 sm:px-6 md:px-10 py-10 md:py-14 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
          Regístrate como conductor
        </h1>
        <p className="text-gray-600 mb-10 max-w-2xl text-center md:text-left text-sm md:text-base">
          Completa tu información y empieza a generar ingresos conduciendo con RideNow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:border-yellow-400/50 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Datos personales y del Vehículo
            </h2>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg font-medium">
                ¡Registro exitoso! Ya estás registrado en el sistema.
              </div>
            )}

            {errors.server && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg font-medium">
                {errors.server}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {/* INPUT: Nombre */}
              <div className="flex flex-col gap-1">
                <div className="relative flex items-center">
                  <LuUser className="absolute left-3 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nombre completo"
                    className={`w-full border rounded-lg pl-10 pr-3 py-3 text-sm transition-colors focus:outline-none focus:ring-2 ${
                      errors.fullName ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-black/10 focus:border-black"
                    }`}
                  />
                </div>
                {errors.fullName && <span className="text-xs text-red-500 font-medium px-1">{errors.fullName}</span>}
              </div>

              {/* INPUT: DNI */}
              <div className="flex flex-col gap-1">
                <div className="relative flex items-center">
                  <FaRegIdCard className="absolute left-3 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="dni"
                    maxLength={8}
                    value={formData.dni}
                    onChange={handleChange}
                    placeholder="DNI"
                    className={`w-full border rounded-lg pl-10 pr-3 py-3 text-sm transition-colors focus:outline-none focus:ring-2 ${
                      errors.dni ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-black/10 focus:border-black"
                    }`}
                  />
                </div>
                {errors.dni && <span className="text-xs text-red-500 font-medium px-1">{errors.dni}</span>}
              </div>

              {/* INPUT: Email */}
              <div className="flex flex-col gap-1">
                <div className="relative flex items-center">
                  <LuMail className="absolute left-3 text-gray-400 text-lg" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                    className={`w-full border rounded-lg pl-10 pr-3 py-3 text-sm transition-colors focus:outline-none focus:ring-2 ${
                      errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-black/10 focus:border-black"
                    }`}
                  />
                </div>
                {errors.email && <span className="text-xs text-red-500 font-medium px-1">{errors.email}</span>}
              </div>

              {/* INPUT: Celular */}
              <div className="flex flex-col gap-1">
                <div className="relative flex items-center">
                  <LuPhone className="absolute left-3 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="phone"
                    maxLength={9}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Número de celular"
                    className={`w-full border rounded-lg pl-10 pr-3 py-3 text-sm transition-colors focus:outline-none focus:ring-2 ${
                      errors.phone ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-black/10 focus:border-black"
                    }`}
                  />
                </div>
                {errors.phone && <span className="text-xs text-red-500 font-medium px-1">{errors.phone}</span>}
              </div>

              <hr className="my-2 border-gray-100" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Datos obligatorios del vehículo</p>

              {/* INPUT: Licencia */}
              <div className="flex flex-col gap-1">
                <div className="relative flex items-center">
                  <FaIdCard className="absolute left-3 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="licencia"
                    value={formData.licencia}
                    onChange={handleChange}
                    placeholder="Nº de Licencia de Conducir (Breve)"
                    className={`w-full border rounded-lg pl-10 pr-3 py-3 text-sm transition-colors focus:outline-none focus:ring-2 ${
                      errors.licencia ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-black/10 focus:border-black"
                    }`}
                  />
                </div>
                {errors.licencia && <span className="text-xs text-red-500 font-medium px-1">{errors.licencia}</span>}
              </div>

              {/* INPUT: Vehículo */}
              <div className="flex flex-col gap-1">
                <div className="relative flex items-center">
                  <FaCar className="absolute left-3 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="vehiculo"
                    value={formData.vehiculo}
                    onChange={handleChange}
                    placeholder="Vehículo (Ej: Toyota Yaris 2022)"
                    className={`w-full border rounded-lg pl-10 pr-3 py-3 text-sm transition-colors focus:outline-none focus:ring-2 ${
                      errors.vehiculo ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-black/10 focus:border-black"
                    }`}
                  />
                </div>
                {errors.vehiculo && <span className="text-xs text-red-500 font-medium px-1">{errors.vehiculo}</span>}
              </div>

              {/* INPUT: Placa */}
              <div className="flex flex-col gap-1">
                <div className="relative flex items-center">
                  <FaCreditCard className="absolute left-3 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="placa"
                    value={formData.placa}
                    onChange={handleChange}
                    placeholder="Placa (Ej: ABC-123)"
                    className={`w-full border rounded-lg pl-10 pr-3 py-3 text-sm transition-colors focus:outline-none focus:ring-2 ${
                      errors.placa ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-black/10 focus:border-black"
                    }`}
                  />
                </div>
                {errors.placa && <span className="text-xs text-red-500 font-medium px-1">{errors.placa}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-400 text-black font-semibold py-3 rounded-lg text-sm transition-all shadow-sm active:scale-[0.98] mt-2"
              >
                {isSubmitting ? "Procesando..." : "Registrarme"}
              </button>
            </form>
          </div>

          {/* Sección de beneficios */}
          <div className="bg-black text-white rounded-xl p-6 md:p-8 border border-transparent hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 md:hover:-translate-y-1 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-6">Beneficios de conducir con RideNow</h2>
              <ul className="flex flex-col gap-5 text-gray-200 text-sm md:text-base">
                <li className="flex items-start gap-3">
                  <span className="p-1 bg-yellow-400/10 rounded-lg text-yellow-400 mt-0.5"><LuCalendar className="text-lg" /></span>
                  <div>
                    <p className="font-medium text-white">Maneja en tus horarios</p>
                    <p className="text-xs text-gray-400">Tú decides cuándo y cuánto tiempo deseas conectarte.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="p-1 bg-yellow-400/10 rounded-lg text-yellow-400 mt-0.5"><LuDollarSign className="text-lg" /></span>
                  <div>
                    <p className="font-medium text-white">Pagos semanales</p>
                    <p className="text-xs text-gray-400">Recibe tus ganancias directo en tu cuenta bancaria de manera puntual.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="p-1 bg-yellow-400/10 rounded-lg text-yellow-400 mt-0.5"><LuAward className="text-lg" /></span>
                  <div>
                    <p className="font-medium text-white">Bonos por desempeño</p>
                    <p className="text-xs text-gray-400">Multiplica tus ingresos completando misiones y metas semanales.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="p-1 bg-yellow-400/10 rounded-lg text-yellow-400 mt-0.5"><LuTrendingUp className="text-lg" /></span>
                  <div>
                    <p className="font-medium text-white">Mayor demanda en Lima</p>
                    <p className="text-xs text-gray-400">Accede a las zonas de alta tarifa dinámica y reduce tus tiempos muertos.</p>
                  </div>
                </li>
                {/* NUEVO BENEFICIO 1 */}
                <li className="flex items-start gap-3">
                  <span className="p-1 bg-yellow-400/10 rounded-lg text-yellow-400 mt-0.5"><LuShieldCheck className="text-lg" /></span>
                  <div>
                    <p className="font-medium text-white">Seguridad en cada viaje</p>
                    <p className="text-xs text-gray-400">Pasajeros verificados con DNI y monitoreo por GPS las 24 horas del día.</p>
                  </div>
                </li>
                {/* NUEVO BENEFICIO 2 */}
                <li className="flex items-start gap-3">
                  <span className="p-1 bg-yellow-400/10 rounded-lg text-yellow-400 mt-0.5"><LuHeartHandshake className="text-lg" /></span>
                  <div>
                    <p className="font-medium text-white">Soporte humano 24/7</p>
                    <p className="text-xs text-gray-400">Un equipo de asistencia real listo para ayudarte ante cualquier emergencia.</p>
                  </div>
                </li>
                {/* NUEVO BENEFICIO 3 */}
                <li className="flex items-start gap-3">
                  <span className="p-1 bg-yellow-400/10 rounded-lg text-yellow-400 mt-0.5"><LuPercent className="text-lg" /></span>
                  <div>
                    <p className="font-medium text-white">Descuentos exclusivos</p>
                    <p className="text-xs text-gray-400">Ahorra en combustible, mantenimiento de tu auto y talleres aliados.</p>
                  </div>
                </li>
              </ul>
            </div>
            <button className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg text-sm self-start transition-all active:scale-[0.98] w-full sm:w-auto">
              Más información
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}