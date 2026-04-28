import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ConduceMenu from "../../components/ConduceMenu";

export default function RequisitosPage() {
  const cardStyle =
  "bg-white shadow-md rounded-xl p-6 border border-transparent hover:border-yellow hover:shadow-lg hover:shadow-yellow/30 transition-all duration-300 hover:-translate-y-1";
  
  return (
    <>
      <Navbar />

      <div className="px-10 py-14">
        <h1 className="text-4xl font-bold mb-4">Requisitos para conducir</h1>
        <p className="text-gray-600 mb-10 max-w-2xl">
          Para registrarte como conductor en RideNow debes cumplir con los siguientes requisitos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={cardStyle}>
            <h2 className="text-lg font-semibold mb-2">Licencia vigente</h2>
            <p className="text-gray-600">
              Debes contar con licencia de conducir válida.
            </p>
          </div>

          <div className={cardStyle}>
            <h2 className="text-lg font-semibold mb-2">Vehículo en buen estado</h2>
            <p className="text-gray-600">
              Auto con revisión técnica y mantenimiento al día.
            </p>
          </div>

          <div className={cardStyle}>
            <h2 className="text-lg font-semibold mb-2">Documentos</h2>
            <p className="text-gray-600">
              DNI, SOAT vigente y tarjeta de propiedad.
            </p>
          </div>

          <div className={cardStyle}>
            <h2 className="text-lg font-semibold mb-2">Celular con internet</h2>
            <p className="text-gray-600">
              Necesitas un smartphone para usar la app.
            </p>
          </div>

          <div className={cardStyle}>
            <h2 className="text-lg font-semibold mb-2">Cuenta bancaria</h2>
            <p className="text-gray-600">
              Para recibir tus pagos de forma segura.
            </p>
          </div>

          <div className={cardStyle}>
            <h2 className="text-lg font-semibold mb-2">Edad mínima</h2>
            <p className="text-gray-600">
              Debes tener al menos 18 años.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}