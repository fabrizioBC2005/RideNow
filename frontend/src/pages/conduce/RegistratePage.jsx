import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ConduceMenu from "../../components/ConduceMenu";

export default function RegistratePage() {
  return (
    <>
      <Navbar />

      <div className="px-10 py-14">
        <h1 className="text-4xl font-bold mb-4">Regístrate como conductor</h1>
        <p className="text-gray-600 mb-10 max-w-2xl">
          Completa tu información y empieza a generar ingresos conduciendo con RideNow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-xl p-6 border border-transparent hover:border-yellow hover:shadow-lg hover:shadow-yellow/30 transition-all duration-300 hover:-translate-y-1">
            <h2 className="text-xl font-semibold mb-4">Datos personales</h2>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                placeholder="DNI"
                className="border rounded-lg p-3"
              />

              <input
                type="email"
                placeholder="Correo electrónico"
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                placeholder="Número de celular"
                className="border rounded-lg p-3"
              />

              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg">
                Registrarme
              </button>
            </form>
          </div>

          <div className="bg-black text-white rounded-xl p-8 border border-transparent
            hover:border-yellow hover:bg-night-2 hover:shadow-lg hover:shadow-yellow/30
            transition-all duration-300 hover:-translate-y-1">
            <h2 className="text-xl font-semibold mb-4">
              Beneficios de conducir con RideNow
            </h2>

            <ul className="flex flex-col gap-3 text-gray-200">
              <li>✔ Maneja en tus horarios</li>
              <li>✔ Pagos semanales</li>
              <li>✔ Bonos por desempeño</li>
              <li>✔ Mayor demanda en Lima</li>
            </ul>

            <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg">
              Más información
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}