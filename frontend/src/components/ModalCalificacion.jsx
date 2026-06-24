import { useState } from 'react'
import { LuStar, LuX, LuCircleCheck } from 'react-icons/lu'
import { api } from '../api/client'

export default function ModalCalificacion({ viaje, conductor, onClose }) {
  const [estrellas, setEstrellas] = useState(0)
  const [hover, setHover] = useState(0)
  const [comentario, setComentario] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const LABELS = { 1: 'Muy malo', 2: 'Malo', 3: 'Regular', 4: 'Bueno', 5: 'Excelente' }

  const enviar = async () => {
    if (estrellas === 0) return
    setEnviando(true)
    try {
      await api.post('/api/calificaciones', {
        viaje_id: viaje?.id || 1,
        calificado_id: conductor?.id || 'conductor_simulado',
        tipo: 'pasajero_a_conductor',
        estrellas,
        comentario
      })
      setEnviado(true)
      setTimeout(onClose, 2000)
    } catch (e) {
      console.error(e)
      setEnviado(true)
      setTimeout(onClose, 2000)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-6 w-full max-w-sm shadow-2xl">
        {enviado ? (
          <div className="text-center py-4">
            <LuCircleCheck className="text-green-400 mx-auto mb-3" size={48} />
            <p className="text-white font-black text-lg">Gracias por calificar</p>
            <p className="text-gray-500 text-sm mt-1">Tu opinion ayuda a mejorar el servicio.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white font-black text-lg">Califica tu viaje</h2>
                <p className="text-gray-500 text-xs mt-0.5">Como fue tu experiencia?</p>
              </div>
              <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors">
                <LuX size={20} />
              </button>
            </div>

            {conductor && (
              <div className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-yellow/10 border border-yellow/20 flex items-center justify-center shrink-0">
                  <span className="text-yellow font-black">{conductor.nombre?.charAt(0) || 'C'}</span>
                </div>
                <div>
                  <p className="text-white text-xs font-bold">{conductor.nombre || 'Tu conductor'}</p>
                  <p className="text-gray-500 text-[10px]">{conductor.vehiculo || 'Conductor RideNow'}</p>
                </div>
              </div>
            )}

            <div className="flex justify-center gap-2 mb-3">
              {[1,2,3,4,5].map(i => (
                <button
                  key={i}
                  onClick={() => setEstrellas(i)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform hover:scale-110"
                >
                  <LuStar
                    size={36}
                    className={"transition-colors " + (i <= (hover || estrellas) ? 'text-yellow fill-yellow' : 'text-gray-700')}
                    style={{ fill: i <= (hover || estrellas) ? '#FFD700' : 'transparent' }}
                  />
                </button>
              ))}
            </div>

            {(hover > 0 || estrellas > 0) && (
              <p className="text-center text-yellow text-xs font-black mb-4">{LABELS[hover > 0 ? hover : estrellas]}</p>
            )}

            <textarea
              value={comentario}
              onChange={e => setComentario(e.target.value)}
              placeholder="Comentario opcional..."
              rows={3}
              className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white text-xs outline-none resize-none placeholder:text-gray-700 focus:border-yellow/40 transition-all mb-4"
            />

            <button
              onClick={enviar}
              disabled={estrellas === 0 || enviando}
              className="w-full bg-yellow disabled:bg-yellow/30 disabled:cursor-not-allowed text-night font-black py-3.5 rounded-xl text-xs uppercase tracking-widest hover:brightness-110 transition-all"
            >
              {enviando ? 'Enviando...' : 'Enviar calificacion'}
            </button>

            <button onClick={onClose} className="w-full text-gray-600 text-[10px] font-bold uppercase tracking-widest mt-3 hover:text-gray-400 transition-colors">
              Omitir
            </button>
          </>
        )}
      </div>
    </div>
  )
}
