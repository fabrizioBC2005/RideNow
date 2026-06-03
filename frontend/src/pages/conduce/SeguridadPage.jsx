import {
  LuShieldCheck,
  LuTriangleAlert,
  LuMapPin,
  LuHeartHandshake,
} from "react-icons/lu";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SeguridadPage() {
  const cardStyle =
    "bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-3";

  return (
    <>
      <Navbar />

      <div className="px-4 sm:px-6 md:px-10 py-10 md:py-14 max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Seguridad</h1>
          <p className="text-gray-600 max-w-2xl text-sm md:text-base mx-auto md:mx-0">
            RideNow prioriza la seguridad de conductores y pasajeros
            implementando herramientas tecnológicas modernas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className={cardStyle}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-black text-white rounded-lg text-xl shadow-sm flex-shrink-0">
                <LuShieldCheck />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Verificación de usuarios
              </h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base pl-1">
              Los pasajeros deben estar registrados y validados en la plataforma
              con filtros de identidad antes de poder solicitar un servicio.
            </p>
          </div>

          <div className={cardStyle}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-black text-white rounded-lg text-xl shadow-sm flex-shrink-0">
                <LuTriangleAlert />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Botón de emergencia
              </h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base pl-1">
              Acceso directo dentro de la app para alertar a nuestro centro de
              monitoreo o a las autoridades locales ante cualquier incidente en
              tiempo real.
            </p>
          </div>

          <div className={cardStyle}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-black text-white rounded-lg text-xl shadow-sm flex-shrink-0">
                <LuMapPin />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Seguimiento por GPS
              </h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base pl-1">
              Cada viaje es monitoreado satelitalmente de principio a fin, lo
              que permite asegurar que se sigan las rutas recomendadas de forma
              transparente.
            </p>
          </div>

          <div className={cardStyle}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-black text-white rounded-lg text-xl shadow-sm flex-shrink-0">
                <LuHeartHandshake />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Soporte 24/7
              </h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base pl-1">
              Contamos con un equipo especializado disponible en todo momento
              del día para resolver incidencias de rutas, soporte técnico o
              consultas operativas.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
