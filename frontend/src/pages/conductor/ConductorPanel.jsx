import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api'
import { GOOGLE_MAPS_LIBRARIES } from '../../config/googleMaps'
import { LuCar, LuMapPin, LuNavigation, LuCircleCheck, LuCircleX, LuClock, LuStar, LuTrendingUp, LuWallet, LuBell, LuPhone } from 'react-icons/lu'

const VIAJES_SIMULADOS = [
  { id: 1, origen: 'Av. Pardo 456, Chimbote', destino: 'Hospital La Caleta, Chimbote', precio: 8, pasajero: 'Ana G.', telefono: '987654321', distancia: '2.1 km', tiempo: '6 min', lat_origen: -9.0740, lng_origen: -78.5936, lat_destino: -9.0820, lng_destino: -78.5910 },
  { id: 2, origen: 'Plaza Mayor, Chimbote', destino: 'Mercado Modelo, Chimbote', precio: 6, pasajero: 'Luis M.', telefono: '912345678', distancia: '1.4 km', tiempo: '4 min', lat_origen: -9.0760, lng_origen: -78.5950, lat_destino: -9.0790, lng_destino: -78.5920 },
  { id: 3, origen: 'UNS, Chimbote', destino: 'Mall Aventura, Chimbote', precio: 10, pasajero: 'Rosa T.', telefono: '956781234', distancia: '3.2 km', tiempo: '9 min', lat_origen: -9.0800, lng_origen: -78.5900, lat_destino: -9.0700, lng_destino: -78.5860 },
]

const ESTADOS = ['disponible', 'aceptado', 'en_camino', 'llegue', 'en_viaje', 'completado']
const ESTADO_LABEL = {
  disponible: 'Disponible',
  aceptado: 'Viaje aceptado',
  en_camino: 'En camino al pasajero',
  llegue: 'Llegue al pasajero',
  en_viaje: 'Viaje en curso',
  completado: 'Viaje completado',
}

export default function ConductorPanel() {
  const { usuario } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('disponibles')
  const [viajesAceptados, setViajesAceptados] = useState([])
  const [disponibles, setDisponibles] = useState(VIAJES_SIMULADOS)
  const [activo, setActivo] = useState(true)
  const [viajeActivo, setViajeActivo] = useState(null)
  const [estadoViaje, setEstadoViaje] = useState('disponible')
  const [miUbicacion, setMiUbicacion] = useState({ lat: -9.0740, lng: -78.5936 })
  const [directions, setDirections] = useState(null)
  const [notificacion, setNotificacion] = useState(null)
  const mapRef = useRef(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  })

  useEffect(() => {
    if (!usuario) navigate('/login')
    else if (usuario.rol !== 'conductor') navigate('/')
  }, [usuario])

  useEffect(() => {
    if (navigator.geolocation) {
      const watch = navigator.geolocation.watchPosition(
        (pos) => setMiUbicacion({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      )
      return () => navigator.geolocation.clearWatch(watch)
    }
  }, [])

  const mostrarNotificacion = (msg, tipo = 'info') => {
    setNotificacion({ msg, tipo })
    setTimeout(() => setNotificacion(null), 4000)
  }

  const calcularRuta = (origen, destino) => {
    if (!window.google) return
    const service = new window.google.maps.DirectionsService()
    service.route({
      origin: origen,
      destination: destino,
      travelMode: window.google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === 'OK') setDirections(result)
    })
  }

  const aceptar = (viaje) => {
    setViajeActivo(viaje)
    setEstadoViaje('aceptado')
    setDisponibles(prev => prev.filter(v => v.id !== viaje.id))
    setTab('mapa')
    calcularRuta(
      { lat: miUbicacion.lat, lng: miUbicacion.lng },
      { lat: viaje.lat_origen, lng: viaje.lng_origen }
    )
    mostrarNotificacion('Viaje aceptado. Ve al punto de origen.', 'success')
  }

  const rechazar = (viaje) => {
    setDisponibles(prev => prev.filter(v => v.id !== viaje.id))
  }

  const avanzarEstado = () => {
    const idx = ESTADOS.indexOf(estadoViaje)
    if (idx >= ESTADOS.length - 1) return
    const siguiente = ESTADOS[idx + 1]
    setEstadoViaje(siguiente)

    if (siguiente === 'en_camino') {
      calcularRuta(miUbicacion, { lat: viajeActivo.lat_origen, lng: viajeActivo.lng_origen })
      mostrarNotificacion('En camino al pasajero.', 'info')
    } else if (siguiente === 'llegue') {
      setDirections(null)
      mostrarNotificacion('Has llegado al punto de recogida. El pasajero fue notificado.', 'success')
    } else if (siguiente === 'en_viaje') {
      calcularRuta(
        { lat: viajeActivo.lat_origen, lng: viajeActivo.lng_origen },
        { lat: viajeActivo.lat_destino, lng: viajeActivo.lng_destino }
      )
      mostrarNotificacion('Viaje en curso hacia el destino.', 'info')
    } else if (siguiente === 'completado') {
      setDirections(null)
      setViajesAceptados(prev => [...prev, { ...viajeActivo, fecha: new Date().toLocaleDateString('es-PE') }])
      mostrarNotificacion('Viaje completado. S/ ' + viajeActivo.precio + ' ganados.', 'success')
      setTimeout(() => {
        setViajeActivo(null)
        setEstadoViaje('disponible')
        setTab('disponibles')
        setDisponibles(VIAJES_SIMULADOS)
      }, 3000)
    }
  }

  const totalGanado = viajesAceptados.reduce((acc, v) => acc + v.precio, 0)

  const BTN_ESTADO = {
    aceptado: { label: 'Ir al pasajero', color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
    en_camino: { label: 'He llegado', color: 'bg-yellow/10 border-yellow/20 text-yellow' },
    llegue: { label: 'Iniciar viaje', color: 'bg-green-500/10 border-green-500/20 text-green-400' },
    en_viaje: { label: 'Completar viaje', color: 'bg-green-500/10 border-green-500/20 text-green-400' },
  }

  if (!usuario || usuario.rol !== 'conductor') return null

  return (
    <>
      <Navbar />

      {notificacion && (
        <div className={`fixed top-20 right-4 z-50 max-w-xs px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 ${notificacion.tipo === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-night border-white/10 text-white'}`}>
          <LuBell size={14} className="shrink-0" />
          <p className="text-xs font-bold">{notificacion.msg}</p>
        </div>
      )}

      <main className="bg-night min-h-screen px-6 py-8">
        <div className="max-w-[900px] mx-auto space-y-6">

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Panel del conductor</h1>
              <p className="text-gray-500 text-sm mt-1">Bienvenido, {usuario.nombre?.split(' ')[0]}</p>
            </div>
            <button onClick={() => setActivo(!activo)} className={"px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all " + (activo ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-gray-500 border border-white/10')}>
              {activo ? 'Activo' : 'Inactivo'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Viajes hoy</p>
              <p className="text-white font-black text-xl">{viajesAceptados.length}</p>
            </div>
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Ganancias</p>
              <p className="text-yellow font-black text-xl">S/ {totalGanado}</p>
            </div>
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Calificacion</p>
              <p className="text-white font-black text-xl flex items-center justify-center gap-1"><LuStar className="text-yellow" size={14} /> 5.0</p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {['disponibles', 'mapa', 'historial', 'ganancias'].map(t => (
              <button key={t} onClick={() => setTab(t)} className={"px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all " + (tab === t ? 'bg-yellow text-night' : 'bg-white/5 text-gray-400 hover:bg-white/10')}>
                {t === 'disponibles' ? 'Disponibles' : t === 'mapa' ? 'Mapa en vivo' : t === 'historial' ? 'Historial' : 'Ganancias'}
                {t === 'mapa' && viajeActivo && <span className="ml-1 w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />}
              </button>
            ))}
          </div>

          {tab === 'disponibles' && (
            <div className="space-y-3">
              {!activo && <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-center"><p className="text-gray-500 text-sm font-bold">Estas inactivo. Activa tu estado para recibir viajes.</p></div>}
              {activo && disponibles.length === 0 && <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-center"><LuCar className="text-gray-700 mx-auto mb-3" size={36} /><p className="text-gray-500 text-sm font-bold">No hay viajes disponibles ahora.</p></div>}
              {activo && disponibles.map(v => (
                <div key={v.id} className="bg-white/[0.03] border border-yellow/20 rounded-2xl p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-white text-xs font-bold">Pasajero: {v.pasajero}</p>
                      <p className="text-gray-500 text-[10px]">{v.distancia} · {v.tiempo}</p>
                    </div>
                    <p className="text-yellow font-black text-lg">S/ {v.precio}</p>
                  </div>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-start gap-2"><LuNavigation className="text-yellow shrink-0 mt-0.5" size={12} /><p className="text-white text-[11px]">{v.origen}</p></div>
                    <div className="flex items-start gap-2"><LuMapPin className="text-red-400 shrink-0 mt-0.5" size={12} /><p className="text-white text-[11px]">{v.destino}</p></div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => aceptar(v)} className="flex-1 flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black py-2.5 rounded-xl hover:bg-green-500/20 transition-all"><LuCircleCheck size={14} /> Aceptar</button>
                    <button onClick={() => rechazar(v)} className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black py-2.5 rounded-xl hover:bg-red-500/20 transition-all"><LuCircleX size={14} /> Rechazar</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'mapa' && (
            <div className="space-y-4">
              {!viajeActivo ? (
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-center">
                  <LuMapPin className="text-gray-700 mx-auto mb-3" size={36} />
                  <p className="text-gray-500 text-sm font-bold">Acepta un viaje para ver el mapa en vivo.</p>
                </div>
              ) : (
                <>
                  <div className={"bg-white/[0.03] border rounded-2xl p-4 " + (estadoViaje === 'completado' ? 'border-green-500/20' : 'border-yellow/20')}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="text-white text-xs font-bold">Pasajero: {viajeActivo.pasajero}</p>
                        <p className={"text-[10px] font-black uppercase " + (estadoViaje === 'completado' ? 'text-green-400' : 'text-yellow')}>{ESTADO_LABEL[estadoViaje]}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-yellow font-black">S/ {viajeActivo.precio}</p>
                        <a href={"tel:" + viajeActivo.telefono} className="flex items-center gap-1 text-gray-500 text-[10px] hover:text-yellow transition-colors no-underline mt-1">
                          <LuPhone size={10} /> {viajeActivo.telefono}
                        </a>
                      </div>
                    </div>
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-start gap-2"><LuNavigation className="text-yellow shrink-0 mt-0.5" size={12} /><p className="text-white text-[11px]">{viajeActivo.origen}</p></div>
                      <div className="flex items-start gap-2"><LuMapPin className="text-red-400 shrink-0 mt-0.5" size={12} /><p className="text-white text-[11px]">{viajeActivo.destino}</p></div>
                    </div>
                    {BTN_ESTADO[estadoViaje] && (
                      <button onClick={avanzarEstado} className={"w-full flex items-center justify-center gap-2 border text-xs font-black py-3 rounded-xl transition-all " + BTN_ESTADO[estadoViaje].color}>
                        {BTN_ESTADO[estadoViaje].label}
                      </button>
                    )}
                  </div>

                  {isLoaded && (
                    <div className="rounded-2xl overflow-hidden h-[400px]">
                      <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={miUbicacion}
                        zoom={14}
                        onLoad={map => mapRef.current = map}
                        options={{ styles: [{elementType:'geometry',stylers:[{color:'#1a1a2e'}]},{elementType:'labels.text.fill',stylers:[{color:'#746855'}]},{featureType:'road',elementType:'geometry',stylers:[{color:'#38414e'}]},{featureType:'water',elementType:'geometry',stylers:[{color:'#17263c'}]}] }}
                      >
                        <Marker position={miUbicacion} icon={window.google ? { path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 6, fillColor: '#FFD700', fillOpacity: 1, strokeColor: '#000', strokeWeight: 1, rotation: 0 } : undefined} />
                        {estadoViaje !== 'en_viaje' && estadoViaje !== 'completado' && (
                          <Marker position={{ lat: viajeActivo.lat_origen, lng: viajeActivo.lng_origen }} icon={window.google ? { path: window.google.maps.SymbolPath.CIRCLE, scale: 8, fillColor: '#22c55e', fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 } : undefined} />
                        )}
                        {(estadoViaje === 'en_viaje' || estadoViaje === 'llegue') && (
                          <Marker position={{ lat: viajeActivo.lat_destino, lng: viajeActivo.lng_destino }} icon={window.google ? { path: window.google.maps.SymbolPath.CIRCLE, scale: 8, fillColor: '#ef4444', fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 } : undefined} />
                        )}
                        {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />}
                      </GoogleMap>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {tab === 'historial' && (
            <div className="space-y-3">
              {/* RESUMEN */}
              {viajesAceptados.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-2">
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-3 text-center">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Completados</p>
                    <p className="text-white font-black text-lg">{viajesAceptados.length}</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-3 text-center">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Ganado</p>
                    <p className="text-yellow font-black text-lg">S/ {totalGanado}</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-3 text-center">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Promedio</p>
                    <p className="text-white font-black text-lg">S/ {(totalGanado / viajesAceptados.length).toFixed(0)}</p>
                  </div>
                </div>
              )}

              {viajesAceptados.length === 0 ? (
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-center">
                  <LuClock className="text-gray-700 mx-auto mb-3" size={36} />
                  <p className="text-gray-500 text-sm font-bold">Aun no tienes viajes completados.</p>
                  <button onClick={() => setTab('disponibles')} className="mt-4 bg-yellow text-night text-xs font-black px-4 py-2 rounded-xl hover:brightness-110 transition-all">Ver viajes disponibles</button>
                </div>
              ) : viajesAceptados.map((v, i) => (
                <div key={i} className="bg-white/[0.03] border border-green-500/20 rounded-2xl p-4">
                  {/* HEADER */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-yellow/10 border border-yellow/20 flex items-center justify-center shrink-0">
                        <span className="text-yellow font-black text-xs">{v.pasajero?.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-white text-xs font-bold">{v.pasajero}</p>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg bg-green-500/10 text-green-400">Completado</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-yellow font-black text-sm">S/ {v.precio}</p>
                      <p className="text-gray-600 text-[10px] mt-0.5">{v.fecha}</p>
                    </div>
                  </div>

                  {/* RUTA */}
                  <div className="bg-white/[0.02] rounded-xl p-3 space-y-2 mb-3">
                    <div className="flex items-start gap-2">
                      <LuNavigation className="text-yellow shrink-0 mt-0.5" size={12} />
                      <div>
                        <p className="text-[9px] text-gray-600 uppercase tracking-widest">Origen</p>
                        <p className="text-white text-[11px] font-medium">{v.origen}</p>
                      </div>
                    </div>
                    <div className="border-l border-white/5 ml-1.5 pl-4 py-0.5">
                      <p className="text-gray-600 text-[9px]">{v.distancia} · {v.tiempo}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <LuMapPin className="text-red-400 shrink-0 mt-0.5" size={12} />
                      <div>
                        <p className="text-[9px] text-gray-600 uppercase tracking-widest">Destino</p>
                        <p className="text-white text-[11px] font-medium">{v.destino}</p>
                      </div>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1 text-gray-500 text-[10px]">
                      <LuStar className="text-yellow" size={11} />
                      <span>5.0 calificacion</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-[10px]">
                      <LuPhone size={10} />
                      <span>{v.telefono}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'ganancias' && (
            <div className="space-y-4">
              <div className="bg-yellow/5 border border-yellow/20 rounded-2xl p-6 text-center">
                <LuWallet className="text-yellow mx-auto mb-2" size={32} />
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Total ganado hoy</p>
                <p className="text-yellow font-black text-4xl">S/ {totalGanado}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center"><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Viajes</p><p className="text-white font-black text-2xl">{viajesAceptados.length}</p></div>
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center"><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Promedio</p><p className="text-white font-black text-2xl">S/ {viajesAceptados.length ? (totalGanado / viajesAceptados.length).toFixed(0) : 0}</p></div>
              </div>
              <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3"><LuTrendingUp className="text-yellow" size={16} /><p className="text-white text-xs font-black uppercase tracking-widest">Desglose</p></div>
                {viajesAceptados.length === 0 ? <p className="text-gray-600 text-xs text-center py-4">Acepta viajes para ver tus ganancias</p> : viajesAceptados.map((v, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <p className="text-gray-400 text-[11px] truncate flex-1">{v.destino}</p>
                    <p className="text-yellow font-black text-xs ml-3">S/ {v.precio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
