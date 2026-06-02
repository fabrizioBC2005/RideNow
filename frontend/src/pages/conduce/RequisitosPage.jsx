import { LuIdCard, LuCar, LuFileText, LuSmartphone, LuCreditCard, LuUserCheck } from "react-icons/lu";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function RequisitosPage() {
  const cardStyle =
    "bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-3";

  return (
    <>
      <Navbar />

      <div className="px-4 sm:px-6 md:px-10 py-10 md:py-14 max-w-7xl mx-auto">
        
        <div className="text-center md:text-left mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Requisitos para conducir
          </h1>
          <p className="text-gray-600 max-w-2xl text-sm md:text-base mx-auto md:mx-0">
            Para registrarte como conductor en RideNow debes cumplir con los siguientes requisitos indispensables.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className={cardStyle}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-black text-white rounded-lg text-lg shadow-sm flex-shrink-0">
                <LuIdCard />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Licencia vigente</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base pl-1">
              Debes contar con una licencia de conducir válida y sin sanciones vigentes.
            </p>
          </div>

          <div className={cardStyle}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-black text-white rounded-lg text-lg shadow-sm flex-shrink-0">
                <LuCar />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Vehículo en buen estado</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base pl-1">
              Auto de 4 puertas con revisión técnica y mantenimiento mecánico al día.
            </p>
          </div>

          <div className={cardStyle}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-black text-white rounded-lg text-lg shadow-sm flex-shrink-0">
                <LuFileText />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Documentos obligatorios</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base pl-1">
              DNI vigente, SOAT (físico o electrónico) y tarjeta de propiedad del auto.
            </p>
          </div>

          <div className={cardStyle}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-black text-white rounded-lg text-lg shadow-sm flex-shrink-0">
                <LuSmartphone />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Celular con internet</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base pl-1">
              Necesitas un smartphone (Android o iOS) con datos activos para operar la app.
            </p>
          </div>

          <div className={cardStyle}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-black text-white rounded-lg text-lg shadow-sm flex-shrink-0">
                <LuCreditCard />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Cuenta bancaria</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base pl-1">
              Una cuenta a tu nombre para recibir tus transferencias y bonos semanales.
            </p>
          </div>

          <div className={cardStyle}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-black text-white rounded-lg text-lg shadow-sm flex-shrink-0">
                <LuUserCheck />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Edad mínima</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base pl-1">
              Debes tener al menos 18 años cumplidos para registrarte de manera legal.
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}