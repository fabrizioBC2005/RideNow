import { LuMapPin, LuArrowRight, LuStar, LuUsers } from "react-icons/lu";
import { FaCarSide } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section id="hero" className="w-full">

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px] gap-8">

        <div className="bg-night flex flex-col justify-center px-6 md:px-14 py-16 text-center md:text-left">
          <span className="tag-yellow mb-5 inline-flex items-center gap-2">
            <LuMapPin className="text-night" /> Lima · Perú
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-snug md:leading-tight tracking-tighter mb-4">
            La oportunidad<br />
            está en todas<br />
            <span className="text-yellow">partes.</span>
          </h1>
          
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0 mb-8">
            Aprovecha al máximo tu tiempo en la carretera con la plataforma de transporte que más crece en Lima.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start justify-center md:justify-start">
            <a href="/register" className="btn-yellow text-sm w-full sm:w-auto justify-center flex items-center gap-2 group">
              Regístrate como conductor 
              <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a href="/login" className="text-white text-sm font-medium underline underline-offset-4 hover:text-yellow transition-colors w-full sm:w-auto text-center">
              Inicia sesión
            </a>
          </div>
        </div>

        <div className="hidden md:flex bg-yellow items-end justify-center overflow-hidden relative min-h-[400px]">
          <svg viewBox="0 0 400 460" width={400} height={460} className="absolute bottom-0">
            <ellipse cx="200" cy="500" rx="230" ry="210" fill="#e6b800" />
            <ellipse cx="200" cy="370" rx="115" ry="75" fill="#0a0a0a" />
            <circle cx="200" cy="230" r="72" fill="#c68642" />
            <ellipse cx="200" cy="173" rx="70" ry="40" fill="#1a1a1a" />
            <rect x="130" y="188" width="22" height="52" rx="11" fill="#1a1a1a" />
            <ellipse cx="131" cy="238" rx="13" ry="17" fill="#c68642" />
            <ellipse cx="180" cy="238" rx="9" ry="10" fill="#1a1a1a" />
            <ellipse cx="220" cy="238" rx="9" ry="10" fill="#1a1a1a" />
            <ellipse cx="200" cy="258" rx="5" ry="4" fill="#a0622a" />
            <path d="M186 274 Q200 285 214 274" fill="none" stroke="#a0622a" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="168" y="292" width="64" height="28" rx="4" fill="#111" />
            <polygon points="188,295 200,310 212,295" fill="#FFD700" />
            <ellipse cx="115" cy="350" rx="58" ry="42" fill="#0a0a0a" />
            <ellipse cx="285" cy="350" rx="58" ry="42" fill="#0a0a0a" />
            <circle cx="200" cy="425" r="58" fill="none" stroke="#FFD700" strokeWidth="13" />
            <line x1="200" y1="367" x2="200" y2="305" stroke="#FFD700" strokeWidth="10" strokeLinecap="round" />
            <line x1="142" y1="425" x2="86"  y2="425" stroke="#FFD700" strokeWidth="10" strokeLinecap="round" />
            <line x1="258" y1="425" x2="314" y2="425" stroke="#FFD700" strokeWidth="10" strokeLinecap="round" />
            <circle cx="200" cy="425" r="12" fill="#FFD700" />
            <ellipse cx="200" cy="174" rx="62" ry="33" fill="#FFD700" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="stat-block bg-night border-b md:border-b-0 md:border-r-2 border-white/10 flex flex-col items-center md:items-start px-6 py-8">
          <div className="flex items-center gap-2 text-yellow mb-1">
            <FaCarSide className="text-xl" />
            <span className="stat-value">12,000+</span>
          </div>
          <div className="stat-label text-gray-500">Viajes completados en Lima</div>
        </div>

        <div className="stat-block bg-yellow border-b md:border-b-0 md:border-r-2 border-black/10 flex flex-col items-center md:items-start px-6 py-8">
          <div className="flex items-center gap-2 text-night mb-1">
            <LuStar className="text-xl fill-night" />
            <span className="stat-value">4.9</span>
          </div>
          <div className="stat-label text-night font-semibold">Calificación promedio</div>
        </div>

        <div className="stat-block bg-white flex flex-col items-center md:items-start px-6 py-8">
          <div className="flex items-center gap-2 text-night mb-1">
            <LuUsers className="text-xl" />
            <span className="stat-value">340+</span>
          </div>
          <div className="stat-label text-gray-500">Conductores activos hoy</div>
        </div>
      </div>
    </section>
  );
}