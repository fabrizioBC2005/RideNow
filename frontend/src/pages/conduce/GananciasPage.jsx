import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  FaWallet,
  FaGift,
  FaClock,
  FaCalendarDays,
  FaCircleCheck,
} from "react-icons/fa6";

export default function GananciasPage() {
  const [earnings_data, setEarningsData] = useState({
    pagoPorHora: 25, // S/ 25 por hora estimado
    bonoViajes: 50, // S/ 50 bono base semanal
  });

  const [hoursPerDay, setHoursPerDay] = useState(6);
  const [daysPerMonth, setDaysPerMonth] = useState(20);
  const [estimatedEarnings, setEstimatedEarnings] = useState(0);

  useEffect(() => {
    /*const obtenerDatosGanancias = async () => {
      try {
        const response = await fetch("https://tu-api.com/api/ganancias-config");
        if (!response.ok) throw new Error("Error al obtener datos");
        const data = await response.json();
        setEarningsData({
          pagoPorHora: data.pagoPorHora,
          bonoViajes: data.bonoViajes
        });
      } catch (error) {
        console.error("Error conectando al backend:", error);
      }
    };
    obtenerDatosGanancias();
    */
  }, []);
  useEffect(() => {
    const totalHorasMes = hoursPerDay * daysPerMonth;
    const gananciasPorConduccion = totalHorasMes * earnings_data.pagoPorHora;
    const bonosEstimados =
      daysPerMonth > 15
        ? earnings_data.bonoViajes * 4
        : earnings_data.bonoViajes * 2;
    setEstimatedEarnings(gananciasPorConduccion + bonosEstimados);
  }, [hoursPerDay, daysPerMonth, earnings_data]);

  const cardStyle =
    "bg-white shadow-md rounded-xl p-6 border border-transparent hover:border-yellow hover:shadow-lg hover:shadow-yellow/30 transition-all duration-300 hover:-translate-y-1";

  return (
    <>
      <Navbar />

      <div className="px-4 sm:px-6 md:px-10 py-10 md:py-14 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
          Ganancias
        </h1>
        <p className="text-gray-600 mb-10 max-w-2xl text-center md:text-left text-sm md:text-base">
          Con RideNow puedes generar ingresos diarios, semanales o mensuales
          según tu disponibilidad.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          <div
            className="bg-black text-white rounded-xl p-6 md:p-8 border border-transparent
            hover:border-yellow hover:bg-night-2 hover:shadow-lg hover:shadow-yellow/30
            transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaWallet className="text-yellow-400 text-xl md:text-2xl shrink-0" />
              <h2 className="text-xl md:text-2xl font-semibold">
                Genera hasta S/ 250 por día
              </h2>
            </div>
            <p className="text-gray-300 text-sm md:text-base">
              Dependiendo de tus horarios, la eficiencia de tus rutas y la
              demanda en tu zona.
            </p>
          </div>

          <div className={cardStyle}>
            <div className="flex items-center gap-3 mb-4">
              <FaGift className="text-yellow-500 text-xl md:text-2xl shrink-0" />
              <h2 className="text-xl md:text-2xl font-semibold">
                Bonos y recompensas
              </h2>
            </div>
            <ul className="text-gray-700 flex flex-col gap-3 text-sm md:text-base">
              <li className="flex items-center gap-2">
                <FaCircleCheck className="text-green-500 shrink-0 text-sm" />
                <span>Bono por viajes completados</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCircleCheck className="text-green-500 shrink-0 text-sm" />
                <span>Incentivos por horario nocturno</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCircleCheck className="text-green-500 shrink-0 text-sm" />
                <span>Bonificación por calificación alta</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCircleCheck className="text-green-500 shrink-0 text-sm" />
                <span>Promociones semanales</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 sm:p-8 md:p-10 border border-gray-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 text-center md:text-left">
            Calculadora de Ingresos
          </h2>
          <p className="text-gray-600 mb-8 text-sm md:text-base text-center md:text-left">
            Estima cuánto puedes ganar al mes manejando con RideNow.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
              <div>
                <div className="flex justify-between font-medium mb-2 text-gray-700 text-sm md:text-base items-center">
                  <span className="flex items-center gap-2">
                    <FaClock className="text-gray-400 text-sm" /> Horas de
                    conducción al día:
                  </span>
                  <span className="text-black font-bold bg-gray-200 px-2.5 py-0.5 rounded-full text-sm">
                    {hoursPerDay} hrs
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              <div>
                <div className="flex justify-between font-medium mb-2 text-gray-700 text-sm md:text-base items-center">
                  <span className="flex items-center gap-2">
                    <FaCalendarDays className="text-gray-400 text-sm" /> Días de
                    trabajo al mes:
                  </span>
                  <span className="text-black font-bold bg-gray-200 px-2.5 py-0.5 rounded-full text-sm">
                    {daysPerMonth} días
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="30"
                  step="1"
                  value={daysPerMonth}
                  onChange={(e) => setDaysPerMonth(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>
            </div>

            <div className="bg-black text-white p-6 md:p-8 rounded-xl text-center shadow-xl border border-yellow/20 flex flex-col justify-center items-center min-h-[180px] lg:min-h-auto">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                Ingreso Mensual Estimado
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 break-words">
                S/ {estimatedEarnings.toLocaleString("es-PE")}
              </h3>
              <p className="text-[11px] md:text-xs text-gray-400 max-w-xs">
                Cálculo aproximado basado en una tasa promedio de S/{" "}
                {earnings_data.pagoPorHora}/hr más incentivos dinámicos de
                RideNow.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
