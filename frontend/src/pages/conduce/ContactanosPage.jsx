import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ConduceMenu from "../../components/ConduceMenu";

export default function ContactanosPage() {
  return (
    <>
      <Navbar />

      <div className="px-10 py-14">
        <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
        <p className="text-gray-600 mb-10 max-w-2xl">
          Si tienes dudas o necesitas soporte, completa el formulario y te responderemos pronto.
        </p>

        <div className="max-w-2xl bg-white shadow-md rounded-xl p-8 border border-transparent hover:border-yellow hover:shadow-lg hover:shadow-yellow/30 transition-all duration-300 hover:-translate-y-1">
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nombre completo"
              className="border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="Correo"
              className="border rounded-lg p-3"
            />

            <textarea
              placeholder="Escribe tu mensaje..."
              className="border rounded-lg p-3 h-32"
            ></textarea>

            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg">
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}