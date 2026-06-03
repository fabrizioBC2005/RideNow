import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ConduceMenu from "../../components/ConduceMenu";

export default function PrimerViajePage() {
  const cardStyle =
    "bg-white shadow-md rounded-xl p-6 border border-transparent hover:border-yellow hover:shadow-lg hover:shadow-yellow/30 transition-all duration-300 hover:-translate-y-1";

  return (
    <>
      <Navbar />

      <div className="px-10 py-14">
        <h1 className="text-4xl font-bold mb-4">Tu primer viaje</h1>
        <p className="text-gray-600 mb-10 max-w-2xl">
          Sigue estos pasos para iniciar tu primer viaje como conductor RideNow.
        </p>

        <div className="space-y-6">
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-2">1. Activa tu cuenta</h2>
            <p className="text-gray-600">
              Completa el registro y espera la validación de documentos.
            </p>
          </div>

          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-2">
              2. Enciende tu disponibilidad
            </h2>
            <p className="text-gray-600">
              Ingresa a la app y cambia tu estado a “Disponible”.
            </p>
          </div>

          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-2">3. Acepta un viaje</h2>
            <p className="text-gray-600">
              Recibirás solicitudes y podrás aceptar o rechazar.
            </p>
          </div>

          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-2">
              4. Recoge al pasajero
            </h2>
            <p className="text-gray-600">
              Sigue el mapa y confirma la identidad del usuario.
            </p>
          </div>

          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-2">5. Finaliza el viaje</h2>
            <p className="text-gray-600">
              Al terminar, califica al pasajero y recibe tu pago.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
