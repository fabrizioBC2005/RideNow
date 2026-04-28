
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactoPage = () => {
  return (
    <section id="contacto" className="py-20 bg-neutral-950 text-white border-t border-yellow-500/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-yellow-400 mb-4">¿Tienes dudas?</h2>
          <p className="text-gray-400">Estamos aquí para ayudarte 24/7</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info de contacto */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-400 p-3 rounded-full text-black">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold">Escríbenos</h4>
                <p className="text-gray-400">soporte@ridenow.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-yellow-400 p-3 rounded-full text-black">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold">Llámanos</h4>
                <p className="text-gray-400">+51 987 654 321</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-neutral-900 p-8 rounded-2xl border border-white/10 shadow-xl">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input type="text" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mensaje</label>
                <textarea rows="4" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition" placeholder="¿En qué podemos ayudarte?"></textarea>
              </div>
              <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02]">
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactoPage;