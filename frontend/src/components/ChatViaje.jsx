import { useState, useEffect, useRef } from 'react'
import { LuSend, LuX, LuMessageCircle } from 'react-icons/lu'
import { useAuth } from '../hooks/useAuth'
import { api } from '../api/client'

const MENSAJES_SIMULADOS = [
  { id: 1, remitente_nombre: 'Carlos R.', remitente_rol: 'conductor', mensaje: 'Hola, ya estoy en camino!', creado_en: new Date(Date.now() - 60000).toISOString() },
  { id: 2, remitente_nombre: 'Tu', remitente_rol: 'pasajero', mensaje: 'Perfecto, te espero afuera', creado_en: new Date(Date.now() - 30000).toISOString() },
]

export default function ChatViaje({ viajeId, onClose }) {
  const { usuario } = useAuth()
  const [mensajes, setMensajes] = useState(MENSAJES_SIMULADOS)
  const [texto, setTexto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const cargarMensajes = async () => {
    if (!viajeId) return
    try {
      const res = await api.get(`/api/mensajes?viaje_id=${viajeId}`)
      if (res.datos?.length > 0) setMensajes(res.datos)
    } catch (e) {}
  }

  useEffect(() => {
    cargarMensajes()
    const intervalo = setInterval(cargarMensajes, 3000)
    return () => clearInterval(intervalo)
  }, [viajeId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  const enviar = async () => {
    if (!texto.trim()) return
    const textoEnviar = texto.trim()
    setTexto('')

    const msgTemp = {
      id: Date.now(),
      remitente_nombre: 'Tu',
      remitente_rol: usuario?.rol || 'pasajero',
      mensaje: textoEnviar,
      creado_en: new Date().toISOString(),
      temp: true
    }
    setMensajes(prev => [...prev, msgTemp])

    setEnviando(true)
    try {
      await api.post('/api/mensajes', { viaje_id: viajeId || 1, mensaje: textoEnviar })
    } catch (e) {}
    finally { setEnviando(false) }
  }

  const formatHora = (fecha) => {
    return new Date(fecha).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
  }

  const esMio = (msg) => {
    if (msg.temp) return true
    return msg.remitente_rol === (usuario?.rol || 'pasajero')
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center px-0 sm:px-4">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-t-[2rem] sm:rounded-[2rem] w-full sm:max-w-md shadow-2xl flex flex-col" style={{ height: '85vh', maxHeight: '600px' }}>

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-yellow/10 border border-yellow/20 flex items-center justify-center">
              <LuMessageCircle className="text-yellow" size={16} />
            </div>
            <div>
              <p className="text-white text-xs font-black">Chat del viaje</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <p className="text-gray-500 text-[10px]">En tiempo real</p>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors">
            <LuX size={20} />
          </button>
        </div>

        {/* MENSAJES */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {mensajes.map((msg, i) => (
            <div key={msg.id || i} className={"flex " + (esMio(msg) ? 'justify-end' : 'justify-start')}>
              <div className={"max-w-[75%] " + (esMio(msg) ? 'items-end' : 'items-start') + " flex flex-col gap-1"}>
                {!esMio(msg) && (
                  <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest ml-1">{msg.remitente_nombre}</p>
                )}
                <div className={"px-4 py-2.5 rounded-2xl " + (esMio(msg) ? 'bg-yellow text-night rounded-br-sm' : 'bg-white/[0.06] text-white rounded-bl-sm')}>
                  <p className="text-xs font-medium leading-relaxed">{msg.mensaje}</p>
                </div>
                <p className="text-gray-700 text-[9px] mx-1">{formatHora(msg.creado_en)}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="px-4 py-4 border-t border-white/5 shrink-0">
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-2 focus-within:border-yellow/30 transition-all">
            <input
              ref={inputRef}
              value={texto}
              onChange={e => setTexto(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && enviar()}
              placeholder="Escribe un mensaje..."
              className="bg-transparent text-white text-xs outline-none flex-1 placeholder:text-gray-700 py-1.5"
            />
            <button
              onClick={enviar}
              disabled={!texto.trim() || enviando}
              className="w-8 h-8 rounded-xl bg-yellow disabled:bg-yellow/30 flex items-center justify-center transition-all hover:brightness-110 shrink-0"
            >
              <LuSend className="text-night" size={14} />
            </button>
          </div>
          <p className="text-gray-700 text-[9px] text-center mt-2">Enter para enviar</p>
        </div>
      </div>
    </div>
  )
}
