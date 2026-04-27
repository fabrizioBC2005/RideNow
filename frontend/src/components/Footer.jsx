import { IoLogoWhatsapp, IoLogoInstagram, IoMail } from "react-icons/io5";

export default function Footer() {
  const today = new Date();
  
  return (
    <footer className="bg-night px-14 py-10 flex flex-col gap-8 border-t-2 border-yellow">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="max-w-sm">
          <h2 className="text-yellow text-2xl font-black tracking-tighter">
            RideNow
          </h2>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            Infraestructura de transporte inteligente. Optimizando la conexión
            entre conductores y usuarios mediante tecnología de alta precisión.
          </p>
        </div>

        <div className="flex gap-5 text-2xl text-gray-500">
          <a href="#" className="hover:text-yellow transition-colors">
            <IoLogoWhatsapp />
          </a>
          <a href="#" className="hover:text-yellow transition-colors">
            <IoMail />
          </a>
          <a href="#" className="hover:text-yellow transition-colors">
            <IoLogoInstagram />
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-800 gap-4">
        <div className="flex gap-6">
          {['Privacidad', 'Términos', 'Ayuda', 'Contacto'].map((link) => (
            <a 
              key={link} 
              href="#" 
              className="text-gray-500 text-xs no-underline hover:text-yellow transition-colors font-medium"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-gray-600 text-[10px] uppercase tracking-widest font-mono">
            Made by <span className="text-yellow">RideNow</span>
          </span>
          <span className="text-gray-700 text-xs">
            © {today.getFullYear()} RideNow · Lima, Perú
          </span>
        </div>
      </div>
    </footer>
  );
}