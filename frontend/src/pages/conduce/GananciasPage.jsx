import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ConduceMenu from "../../components/ConduceMenu";

export default function GananciasPage() {
  const cardStyle =
  "bg-white shadow-md rounded-xl p-6 border border-transparent hover:border-yellow hover:shadow-lg hover:shadow-yellow/30 transition-all duration-300 hover:-translate-y-1";
  return (
    <>
      <Navbar />

      <div className="px-10 py-14">
        <h1 className="text-4xl font-bold mb-4">Ganancias</h1>
        <p className="text-gray-600 mb-10 max-w-2xl">
          Con RideNow puedes generar ingresos diarios, semanales o mensuales según tu disponibilidad.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black text-white rounded-xl p-8 border border-transparent
            hover:border-yellow hover:bg-night-2 hover:shadow-lg hover:shadow-yellow/30
            transition-all duration-300 hover:-translate-y-1">
              
            <h2 className="text-2xl font-semibold mb-4">
              Genera hasta S/ 250 por día
            </h2>
            <p className="text-gray-300">
              Dependiendo de tus horarios y la demanda en tu zona.
            </p>
          </div>

          <div className={cardStyle}>
            <h2 className="text-2xl font-semibold mb-4">Bonos y recompensas</h2>
            <ul className="text-gray-700 flex flex-col gap-3">
              <li>✔ Bono por viajes completados</li>
              <li>✔ Incentivos por horario nocturno</li>
              <li>✔ Bonificación por calificación alta</li>
              <li>✔ Promociones semanales</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}