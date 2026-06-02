import { Link } from "react-router-dom";

export default function ConduceMenu() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-8 bg-white shadow-sm rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">
          Conduce
        </h2>
        <nav className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-row gap-2 sm:gap-4 justify-center items-center text-center">
          <Link to="/conduce/registrate" className="w-full md:w-auto px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent rounded-md transition-colors">
            Regístrate
          </Link>
          <Link to="/conduce/requisitos" className="w-full md:w-auto px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent rounded-md transition-colors">
            Requisitos
          </Link>
          <Link to="/conduce/ganancias" className="w-full md:w-auto px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent rounded-md transition-colors">
            Ganancias
          </Link>
          <Link to="/conduce/primer-viaje" className="w-full md:w-auto px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent rounded-md transition-colors">
            Tu primer viaje
          </Link>
          <Link to="/conduce/seguridad" className="w-full md:w-auto px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent rounded-md transition-colors">
            Seguridad
          </Link>
          <Link to="/conduce/contactanos" className="w-full md:w-auto px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent rounded-md transition-colors">
            Contáctanos
          </Link>
        </nav>
      </div>
    </div>
  );
}