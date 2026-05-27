
import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonios = () => {
  const reseñas = [
    {
      nombre: "Thiago Perez",
      rol: "Pasajero frecuente",
      comentario: "Excelente servicio. Los conductores son muy respetuosos y los autos siempre están limpios. ¡Llego a la universidad a tiempo!",
      estrellas: 5
    },
    {
      nombre: "Brandon Pedraza",
      rol: "Conductor RideNow",
      comentario: "Manejar con RideNow me ha permitido aprender ah manejar. La app es súper fácil de usar y los pagos son puntuales. ¡Muy recomendada!",
      estrellas: 5
    },
    {
      nombre: "Luis Alberto",
      rol: "Usuario diario",
      comentario: "Lo que más me gusta es la seguridad. Puedo compartir mi ruta con mi familia mientras voy al centro de Chimbote. Me siento tranquilo.",
      estrellas: 4
    }
  ];

  return (
    <section id="testimonios" className="py-24 bg-black border-t border-yellow-500/10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Cabecera de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-yellow-400 font-bold uppercase tracking-widest mb-4">Comunidad RideNow</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-6">Lo que dicen en Lima</h3>
          <div className="flex justify-center items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <span className="text-gray-400 font-medium">(4.5/5 basado en 100+ reseñas)</span>
          </div>
        </div>

        {/* Rejilla de testimonios */}
        <div className="grid md:grid-cols-3 gap-8">
          {reseñas.map((item, index) => (
            <div key={index} className="bg-neutral-900 p-8 rounded-3xl border border-white/5 relative group hover:border-yellow-400/50 transition-all duration-300">
              <Quote className="absolute top-6 right-8 text-yellow-400/10 group-hover:text-yellow-400/20 transition-colors" size={50} />
              
              <div className="flex mb-4">
                {[...Array(item.estrellas)].map((_, i) => (
                  <Star key={i} size={16} fill="#facc15" className="text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-300 text-lg italic mb-8 relative z-10">
                "{item.comentario}"
              </p>

              <div className="flex flex-col">
                <span className="text-white font-bold text-lg">{item.nombre}</span>
                <span className="text-yellow-500 text-sm">{item.rol}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonios;