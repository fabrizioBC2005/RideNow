import { useState } from 'react'

const FAQS = [
  { q: '¿Puedo conducir con RideNow en mi ciudad?',  a: 'RideNow opera actualmente en Lima Metropolitana. Regístrate y te avisaremos cuando lleguemos a tu zona.' },
  { q: '¿Cuáles son los requisitos para conducir?',  a: 'Mayor de 18 años, licencia B-IIb, SOAT, revisión técnica, DNI vigente y pasar el test de confianza. Todo online.' },
  { q: '¿La plataforma RideNow es segura?',          a: 'Sí. Conductores verificados, seguro de accidentes en cada viaje, botón SOS y seguimiento en tiempo real.' },
  { q: '¿Necesito mi propio vehículo?',              a: 'Sí, necesitas un vehículo del año 2015 en adelante en buen estado.' },
  { q: '¿Cuándo y cómo cobro mis ganancias?',        a: 'Pagos semanales a tu cuenta bancaria o billetera digital. También puedes solicitar retiro anticipado desde la app.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item" onClick={() => setOpen(!open)}>
      <div className="faq-row">
        <span className="faq-question">{q}</span>
        <span className={`faq-icon ${open ? 'rotate-45' : ''}`}>+</span>
      </div>
      {open && <div className="faq-answer">{a}</div>}
    </div>
  )
}

export default function FAQSection() {
  return (
    <section>

      {/* FAQ */}
      <div className="bg-white px-14 py-14">
        <h2 className="text-4xl font-black text-night tracking-tight mb-7">
          Preguntas frecuentes
        </h2>
        <div className="max-w-2xl">
          {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>

      {/* CTA split */}
      <div className="grid grid-cols-2">

        {/* Amarillo */}
        <div className="bg-yellow px-14 py-16 flex flex-col justify-center">
          <span className="tag-black mb-5 w-fit">La app</span>
          <h2 className="text-4xl font-black text-night tracking-tight mb-3">
            La app para conductores de RideNow
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-7 max-w-sm">
            Fácil de usar y confiable. Solicitudes, ganancias, mapas
            y soporte en un solo lugar.
          </p>
          <a href="/register?role=driver" className="btn-black w-fit">
            Descargar la app →
          </a>
        </div>

        {/* Negro con mapa */}
        <div className="bg-night-2 flex items-center justify-center px-12 py-16">
          <svg viewBox="0 0 280 200" width={280} height={200}>
            <rect width="280" height="200" fill="#111" rx="16" />
            <line x1="0"   y1="65"  x2="280" y2="65"  stroke="#222" strokeWidth="10" />
            <line x1="0"   y1="130" x2="280" y2="130" stroke="#222" strokeWidth="7" />
            <line x1="85"  y1="0"   x2="85"  y2="200" stroke="#222" strokeWidth="7" />
            <line x1="195" y1="0"   x2="195" y2="200" stroke="#222" strokeWidth="6" />
            <path d="M 42 168 L 42 130 L 85 130 L 85 65 L 195 65"
              fill="none" stroke="#FFD700" strokeWidth="3"
              strokeDasharray="7 3" strokeLinecap="round" />
            <circle cx="42"  cy="168" r="8"  fill="#FFD700" />
            <circle cx="42"  cy="168" r="15" fill="#FFD70025" />
            <circle cx="195" cy="65"  r="8"  fill="#FFD700" />
            <circle cx="195" cy="65"  r="15" fill="#FFD70025" />
            <rect x="154" y="44" width="62" height="22" rx="5" fill="#FFD700" />
            <text x="185" y="59" fontSize="11" textAnchor="middle" fill="#0a0a0a" fontWeight="800">S/ 14.50</text>
            <circle cx="230" cy="150" r="22" fill="#FFD700" />
            <path d="M230 136 L237 158 L230 153 L223 158 Z" fill="#0a0a0a" />
          </svg>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-night px-14 py-7 flex justify-between items-center border-t-2 border-yellow">
        <span className="text-yellow text-lg font-black">RideNow</span>
        <div className="flex gap-5">
          {['Privacidad', 'Términos', 'Ayuda', 'Contacto'].map(l => (
            <a key={l} href="#" className="text-gray-600 text-xs no-underline hover:text-yellow transition-colors">{l}</a>
          ))}
        </div>
        <span className="text-gray-700 text-xs">© 2025 RideNow · Lima, Perú</span>
      </footer>
    </section>
  )
}