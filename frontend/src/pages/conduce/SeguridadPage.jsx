import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ConduceMenu from "../../components/ConduceMenu";

export default function SeguridadPage() {
const cardStyle =
  "bg-white shadow-md rounded-xl p-6 border border-transparent hover:border-yellow hover:shadow-lg hover:shadow-yellow/30 transition-all duration-300 hover:-translate-y-1";

  return (
    <>
      <Navbar />

      <div className="px-10 py-14">
        <h1 className="text-4xl font-bold mb-4">Seguridad</h1>
        <p className="text-gray-600 mb-10 max-w-2xl">
          RideNow prioriza la seguridad de conductores y pasajeros con herramientas modernas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-3">Verificación de usuarios</h2>
            <p className="text-gray-600">
              Los pasajeros deben estar registrados y verificados antes de usar el servicio.
            </p>
          </div>

          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-3">Botón de emergencia</h2>
            <p className="text-gray-600">
              Los conductores pueden reportar incidentes en tiempo real.
            </p>
          </div>

          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-3">Seguimiento por GPS</h2>
            <p className="text-gray-600">
              Cada viaje es monitoreado para garantizar rutas seguras.
            </p>
          </div>

          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-3">Soporte 24/7</h2>
            <p className="text-gray-600">
              Atención al conductor ante cualquier problema o consulta.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}