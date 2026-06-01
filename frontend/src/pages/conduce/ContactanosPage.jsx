import { useState } from "react";
import { LuUser, LuMail, LuMessageSquare, LuSend } from "react-icons/lu";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactanosPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre completo es obligatorio.";
    } else if (formData.fullName.trim().length < 4) {
      newErrors.fullName = "Ingresa un nombre válido.";
    }

    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje no puede estar vacío.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Por favor, detalla un poco más tu mensaje (mínimo 10 caracteres).";
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
    setSubmitSuccess(false);

    try {
      /* const response = await fetch("https://localhost:3000/api/support/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Error al enviar el mensaje");
      const data = await response.json();
      setSubmitSuccess(true);
      setFormData({ fullName: "", email: "", message: "" });
      */

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({ fullName: "", email: "", message: "" });

    } catch (error) {
      console.error("Backend connection error:", error);
      setErrors({ server: "Hubo un problema al enviar tu mensaje. Inténtalo más tarde." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="px-4 sm:px-6 md:px-10 py-10 md:py-14 max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="w-full max-w-2xl text-center md:text-left mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Si tienes dudas o necesitas soporte, completa el formulario y te responderemos pronto.
          </p>
        </div>

        <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6 sm:p-8 border border-gray-100 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/10 transition-all duration-300">
          
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg font-medium flex items-center gap-2">
              <span>¡Mensaje enviado con éxito! Nos comunicaremos contigo en breve.</span>
            </div>
          )}

          {errors.server && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg font-medium">
              {errors.server}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            
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

            <div className="flex flex-col gap-1">
              <div className="relative flex items-start">
                <LuMessageSquare className="absolute left-3 top-3.5 text-gray-400 text-lg" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Escribe tu mensaje..."
                  className={`w-full border rounded-lg pl-10 pr-3 py-3 text-sm h-32 resize-none transition-colors focus:outline-none focus:ring-2 ${
                    errors.message ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-black/10 focus:border-black"
                  }`}
                ></textarea>
              </div>
              {errors.message && <span className="text-xs text-red-500 font-medium px-1">{errors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-400 text-black font-semibold py-3 rounded-lg text-sm transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
            >
              <LuSend className={`text-base ${isSubmitting ? "animate-pulse" : ""}`} />
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}