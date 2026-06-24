import { useState, useRef, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useViajes } from "../hooks/useViajes"
import { useAuth } from '../hooks/useAuth'
import { useJsApiLoader, Autocomplete, GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api'
import { GOOGLE_MAPS_LIBRARIES } from '../config/googleMaps'
import ModalCalificacion from '../components/ModalCalificacion'
import ChatViaje from '../components/ChatViaje'
import { LuNavigation, LuCar, LuCircleCheck, LuCircleX, LuClock, LuCalendar, LuMapPin, LuArrowRight } from 'react-icons/lu'
import { ArrowRight, Clock, Calendar, MapPin } from 'lucide-react'

const BENEFICIOS = [
  { icon: <Clock size={20} />, title: 'Viajes sin estres', desc: 'Programa tu viaje con anticipacion y evita esperas de ultimo momento.' },
  { icon: <Calendar size={20} />, title: 'Organiza tu tiempo', desc: 'Elige fecha y hora exacta segun tu agenda o compromisos.' },
  { icon: <MapPin size={20} />, title: 'Ideal para eventos', desc: 'Perfecto para aeropuertos, reuniones o salidas importantes.' },
]

const USOS = ['Traslados al aeropuerto', 'Reuniones de trabajo', 'Eventos especiales', 'Viajes planificados']

const ESTADO_COLOR = { pendiente: 'text-yellow', en_curso: 'text-blue-400', completado: 'text-green-400', cancelado: 'text-red-400' }

export default function ReservaViajePage() {
  const { usuario } = useAuth()
  const { viajes, crearViaje } = useViajes()

  const [origenVal, setOrigenVal] = useState('')
  const [destinoVal, setDestinoVal] = useState('')
  const [directions, setDirections] = useState(null)
  const [distancia, setDistancia] = useState(null)
  const [duracion, setDuracion] = useState(null)
  const [precioEst, setPrecioEst] = useState(null)
  const [modo, setModo] = useState('ahora')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [cargandoViaje, setCargandoViaje] = useState(false)
  const [exitoViaje, setExitoViaje] = useState(false)
  const [buscando, setBuscando] = useState(false)
  const [conductoresSimulados, setConductoresSimulados] = useState([])
  const [conductorElegido, setConductorElegido] = useState(null)
  const [viajeEnCurso, setViajeEnCurso] = useState(false)
  const [mostrarOfertas, setMostrarOfertas] = useState(false)
  const [notificacion, setNotificacion] = useState(null)
  const [viajeActualId, setViajeActualId] = useState(null)
  const [enCamino, setEnCamino] = useState(false)
  const [mostrarCalificacion, setMostrarCalificacion] = useState(false)
  const [conductorCalificar, setConductorCalificar] = useState(null)
  const [mostrarChat, setMostrarChat] = useState(false)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  })

  const [miUbicacion, setMiUbicacion] = useState({ lat: -12.0464, lng: -77.0428 })
  const [misCoordsGPS, setMisCoordsGPS] = useState(null)
  const [seleccionando, setSeleccionando] = useState('origen') // 'origen' | 'destino'
  const geocoderRef = useRef(null)
  const mapRef = useRef(null)
  const centroInicialRef = useRef({ lat: -12.0464, lng: -77.0428 })
  const onMapLoad = (map) => { mapRef.current = map }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude }
          centroInicialRef.current = loc
          setMiUbicacion(loc)
          setMisCoordsGPS(loc)
          if (mapRef.current) mapRef.current.panTo(loc)
          // Geocodificar para mostrar texto en el input pero guardar coords reales
          if (window.google && !origenVal) {
            const geocoder = new window.google.maps.Geocoder()
            geocoder.geocode({ location: loc }, (results, status) => {
              if (status === 'OK' && results[0]) {
                setOrigenVal(results[0].formatted_address)
                if (origenInputRef.current) origenInputRef.current.value = results[0].formatted_address
              }
            })
          }
        },
        () => console.log('No se pudo obtener ubicacion')
      )
    }
  }, [isLoaded])

  const handleMapClick = (e) => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const addr = results[0].formatted_address
        if (seleccionando === 'origen') {
          setOrigenVal(addr)
          if (origenInputRef.current) origenInputRef.current.value = addr
          setSeleccionando('destino')
        } else {
          setDestinoVal(addr)
          if (destinoInputRef.current) destinoInputRef.current.value = addr
          setTimeout(calcularRuta, 100)
        }
      }
    })
  }

  // Blog view states
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [fechaBlog, setFechaBlog] = useState('')
  const [horaBlog, setHoraBlog] = useState('')

  const autoOrigenRef = useRef(null)
  const autoDestinoRef = useRef(null)
  const origenInputRef = useRef(null)
  const destinoInputRef = useRef(null)

  const calcularRuta = () => {
    const o = misCoordsGPS || origenInputRef.current?.value
    const d = destinoInputRef.current?.value
    if (!o || !d) return
    const service = new window.google.maps.DirectionsService()
    service.route({ origin: o, destination: d, travelMode: window.google.maps.TravelMode.DRIVING }, (result, status) => {
      if (status === 'OK') {
        setDirections(result)
        const leg = result.routes[0].legs[0]
        const km = leg.distance.value / 1000
        setDistancia(leg.distance.text)
        setDuracion(leg.duration.text)
        setPrecioEst(Math.max(5, Math.round(km * 1.8 + 3)))
        setOrigenVal(leg.start_address)
        setDestinoVal(leg.end_address)
      }
    })
  }

  const generarConductores = (centro) => {
    const nombres = ['Carlos R.', 'Luis M.', 'Juan P.', 'Pedro A.', 'Miguel S.']
    const autos = ['Toyota Yaris', 'Hyundai i10', 'Kia Rio', 'Suzuki Swift', 'Nissan Versa']
    const avatares = ['C', 'L', 'J', 'P', 'M']
    return Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      nombre: nombres[i],
      auto: autos[i],
      avatar: avatares[i],
      calificacion: (4.5 + Math.random() * 0.5).toFixed(1),
      precio: precioEst ? precioEst + Math.floor(Math.random() * 4 - 1) : 8 + Math.floor(Math.random() * 5),
      tiempo: `${2 + Math.floor(Math.random() * 5)} min`,
      lat: centro.lat + (Math.random() - 0.5) * 0.008,
      lng: centro.lng + (Math.random() - 0.5) * 0.008,
    }))
  }

  const handleReservaApp = async () => {
    if (!origenVal || !destinoVal) return
    setBuscando(true)
    setMostrarOfertas(false)
    const centro = misCoordsGPS || miUbicacion
    setConductoresSimulados(generarConductores(centro))
    try {
      const res = await crearViaje({ origen: origenVal, destino: destinoVal, precio: precioEst })
      if (res?.id) setViajeActualId(res.id)
    } catch (e) { console.error(e) }
    setTimeout(() => setMostrarOfertas(true), 3000)
  }

  const confirmarEnCamino = () => {
    setEnCamino(true)
    setNotificacion({ tipo: 'info', mensaje: 'El conductor sabe que vas en camino. Buen viaje!' })
    setTimeout(() => setNotificacion(null), 4000)
  }

  const cancelarViaje = () => {
    setBuscando(false)
    setMostrarOfertas(false)
    setConductoresSimulados([])
    setViajeEnCurso(false)
    setConductorElegido(null)
    setNotificacion(null)
    setEnCamino(false)
  }

  const elegirConductor = (conductor) => {
    setConductorElegido(conductor)
    setBuscando(false)
    setMostrarOfertas(false)
    setViajeEnCurso(true)
    // Notificacion 1: conductor aceptó
    setNotificacion({ tipo: 'info', mensaje: conductor.nombre + ' aceptó tu viaje. Va en camino...' })
    // Notificacion 2: taxi llegó (6 segundos)
    setTimeout(() => {
      setNotificacion({ tipo: 'alerta', mensaje: conductor.nombre + ' ha llegado a tu ubicacion. Te esta esperando!' })
    }, 6000)
    // Fin del viaje (12 segundos)
    setTimeout(() => {
      setViajeEnCurso(false)
      setNotificacion(null)
      setMostrarChat(false)
      setExitoViaje(true)
      setConductorCalificar(conductorElegido)
      setTimeout(() => {
        setExitoViaje(false)
        setMostrarCalificacion(true)
      }, 1500)
      setConductorElegido(null)
    }, 12000)
  }

  const handleReservaBlog = async () => {
    if (!origen || !destino || !fechaBlog || !horaBlog) return
    try {
      await crearViaje({ origen, destino, precio: null })
      alert('Reserva creada con exito')
    } catch (e) { alert('Error al crear reserva') }
  }

  const mapaURL = destino
    ? `https://www.google.com/maps?q=${encodeURIComponent(origen + ' a ' + destino)}&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(origen || 'Lima, Peru')}&output=embed`

  // VISTA APP - usuario logueado
  if (usuario) return (
    <>
      <Navbar />
      {mostrarChat && (
        <ChatViaje viajeId={null} onClose={() => setMostrarChat(false)} />
      )}

      {mostrarCalificacion && (
        <ModalCalificacion
          viaje={null}
          conductor={conductorCalificar ? { nombre: conductorCalificar.nombre, vehiculo: conductorCalificar.auto } : null}
          onClose={() => setMostrarCalificacion(false)}
        />
      )}

      {viajeEnCurso && (
        <button
          onClick={() => setMostrarChat(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-yellow shadow-2xl shadow-yellow/20 flex items-center justify-center hover:brightness-110 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </button>
      )}

      {/* NOTIFICACION FLOTANTE */}
      {notificacion && (
        <div className={`fixed top-20 right-4 z-50 max-w-xs px-4 py-3 rounded-2xl shadow-2xl border flex flex-col gap-3 transition-all ${notificacion.tipo === 'alerta' ? 'bg-yellow text-night border-yellow/50' : 'bg-night border-white/10 text-white'}`}>
          <div className="flex items-start gap-3">
            <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${notificacion.tipo === 'alerta' ? 'bg-night animate-ping' : 'bg-yellow animate-ping'}`} />
            <p className="text-xs font-bold flex-1">{notificacion.mensaje}</p>
            <button onClick={() => setNotificacion(null)} className="shrink-0 opacity-50 hover:opacity-100 text-sm font-black">✕</button>
          </div>
          {notificacion.tipo === 'alerta' && !enCamino && (
            <div className="flex gap-2 mt-1">
              <button
                onClick={confirmarEnCamino}
                className="flex-1 bg-night text-yellow text-[10px] font-black py-2 rounded-xl hover:bg-night/80 transition-all"
              >
                Voy en camino
              </button>
              <button
                onClick={cancelarViaje}
                className="flex-1 bg-night/20 text-night text-[10px] font-black py-2 rounded-xl hover:bg-night/30 transition-all border border-night/20"
              >
                Cancelar viaje
              </button>
            </div>
          )}
          {notificacion.tipo === 'alerta' && enCamino && (
            <p className="text-[10px] font-bold text-night/70 text-center">En camino al vehiculo</p>
          )}
        </div>
      )}
      <main className="bg-night min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="px-6 md:px-10 py-10 flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">Pide tu viaje</h1>
              <p className="text-gray-500 text-sm mt-1">Hola {usuario.nombre?.split(' ')[0]}, a donde vas hoy?</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setModo('ahora')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${modo === 'ahora' ? 'bg-yellow text-night' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                <LuCar size={14} /> Ahora
              </button>
              <button onClick={() => setModo('programar')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${modo === 'programar' ? 'bg-yellow text-night' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                <LuCalendar size={14} /> Programar
              </button>
            </div>
            <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest">
              <button onClick={() => setSeleccionando('origen')} className={`px-3 py-1.5 rounded-lg transition-all ${seleccionando === 'origen' ? 'bg-yellow/20 text-yellow' : 'text-gray-600'}`}>
                Clic mapa → Origen
              </button>
              <button onClick={() => setSeleccionando('destino')} className={`px-3 py-1.5 rounded-lg transition-all ${seleccionando === 'destino' ? 'bg-red-500/20 text-red-400' : 'text-gray-600'}`}>
                Clic mapa → Destino
              </button>
            </div>
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 space-y-3">
              {isLoaded ? (
                <>
                  <Autocomplete onLoad={a => autoOrigenRef.current = a} onPlaceChanged={() => { const p = autoOrigenRef.current?.getPlace(); if (p?.formatted_address) { setOrigenVal(p.formatted_address); if (origenInputRef.current) origenInputRef.current.value = p.formatted_address } }}>
                    <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                      <LuNavigation className="text-yellow shrink-0" size={15} />
                      <input ref={origenInputRef} placeholder="Punto de origen" className="bg-transparent text-white text-sm outline-none flex-1 placeholder:text-gray-600" />
                    </div>
                  </Autocomplete>
                  <Autocomplete onLoad={a => autoDestinoRef.current = a} onPlaceChanged={() => { const p = autoDestinoRef.current?.getPlace(); if (p?.formatted_address) { setDestinoVal(p.formatted_address); if (destinoInputRef.current) destinoInputRef.current.value = p.formatted_address; setTimeout(calcularRuta, 100) } }}>
                    <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                      <LuMapPin className="text-red-400 shrink-0" size={15} />
                      <input ref={destinoInputRef} placeholder="Punto de destino" className="bg-transparent text-white text-sm outline-none flex-1 placeholder:text-gray-600" />
                    </div>
                  </Autocomplete>
                </>
              ) : <p className="text-gray-500 text-xs">Cargando...</p>}
              {modo === 'programar' && (
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-3 flex-1">
                    <LuCalendar className="text-gray-500" size={14} />
                    <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="bg-transparent text-white text-xs outline-none flex-1" />
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-3 flex-1">
                    <LuClock className="text-gray-500" size={14} />
                    <input type="time" value={hora} onChange={e => setHora(e.target.value)} className="bg-transparent text-white text-xs outline-none flex-1" />
                  </div>
                </div>
              )}
            </div>
            {precioEst && (
              <div className="bg-yellow/5 border border-yellow/20 rounded-2xl p-4 grid grid-cols-3 gap-3">
                <div className="text-center"><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Distancia</p><p className="text-white font-black text-sm">{distancia}</p></div>
                <div className="text-center border-x border-white/5"><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Tiempo</p><p className="text-white font-black text-sm">{duracion}</p></div>
                <div className="text-center"><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Precio est.</p><p className="text-yellow font-black text-sm">S/ {precioEst}</p></div>
              </div>
            )}
            <button onClick={handleReservaApp} disabled={!origenVal || !destinoVal || cargandoViaje} className="w-full bg-yellow disabled:bg-yellow/30 disabled:cursor-not-allowed text-night font-black py-4 rounded-xl text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:brightness-110">
              {cargandoViaje ? 'Procesando...' : exitoViaje ? 'Viaje solicitado!' : modo === 'ahora' ? 'Solicitar viaje' : 'Programar viaje'}
            </button>
            {/* PANEL BUSCANDO */}
            {buscando && (
              <div className="bg-white/[0.03] border border-yellow/20 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow animate-ping" />
                    <p className="text-yellow text-xs font-bold uppercase tracking-widest">
                      {mostrarOfertas ? 'Conductores disponibles' : 'Buscando conductores cerca...'}
                    </p>
                  </div>
                  <button onClick={cancelarViaje} className="text-red-400 text-[10px] font-bold uppercase hover:text-red-300 transition-colors border border-red-400/30 px-2 py-1 rounded-lg">
                    Cancelar
                  </button>
                </div>
                {!mostrarOfertas && (
                  <div className="space-y-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="bg-white/5 rounded-xl px-4 py-3 flex items-center gap-3 animate-pulse">
                        <div className="w-10 h-10 rounded-full bg-white/10" />
                        <div className="flex-1 space-y-2">
                          <div className="h-2 bg-white/10 rounded w-24" />
                          <div className="h-2 bg-white/5 rounded w-16" />
                        </div>
                        <div className="h-4 bg-white/10 rounded w-12" />
                      </div>
                    ))}
                  </div>
                )}
                {mostrarOfertas && conductoresSimulados.map(c => (
                  <div key={c.id} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow/10 border border-yellow/20 flex items-center justify-center shrink-0">
                      <span className="text-yellow font-black text-sm">{c.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-bold">{c.nombre}</p>
                      <p className="text-gray-500 text-[10px]">{c.auto} · ⭐ {c.calificacion}</p>
                      <p className="text-gray-500 text-[10px]">Llega en {c.tiempo}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-yellow font-black text-sm">S/ {c.precio}</p>
                      <button onClick={() => elegirConductor(c)} className="mt-1 bg-yellow text-night text-[10px] font-black px-3 py-1 rounded-lg hover:brightness-110 transition-all">
                        Elegir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PANEL VIAJE EN CURSO */}
            {viajeEnCurso && conductorElegido && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <LuCar className="text-green-400" size={16} />
                  <p className="text-green-400 text-xs font-black uppercase tracking-widest">Conductor en camino</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 font-black">{conductorElegido.avatar}</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{conductorElegido.nombre}</p>
                    <p className="text-gray-400 text-xs">{conductorElegido.auto}</p>
                    <p className="text-green-400 text-xs font-bold">Llega en {conductorElegido.tiempo} · S/ {conductorElegido.precio}</p>
                  </div>
                </div>
              </div>
            )}

          </div>
          <div className="h-[400px] lg:h-auto sticky top-0">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={centroInicialRef.current}
                zoom={14}
                onLoad={onMapLoad}
                onClick={handleMapClick}
                options={{ disableDoubleClickZoom: true, styles: [{elementType:'geometry',stylers:[{color:'#1a1a2e'}]},{elementType:'labels.text.fill',stylers:[{color:'#746855'}]},{featureType:'road',elementType:'geometry',stylers:[{color:'#38414e'}]},{featureType:'water',elementType:'geometry',stylers:[{color:'#17263c'}]}] }}
              >
                {directions && <DirectionsRenderer directions={directions} />}
                {conductoresSimulados.map(c => (
                  <Marker
                    key={c.id}
                    position={{ lat: c.lat, lng: c.lng }}
                    icon={window.google ? {
                      path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                      scale: 5,
                      fillColor: '#FFD700',
                      fillOpacity: 1,
                      strokeColor: '#000',
                      strokeWeight: 1,
                      rotation: Math.random() * 360,
                    } : undefined}
                  />
                ))}
                {!directions && (
                  <Marker
                    position={miUbicacion}
                    icon={window.google ? { path: window.google.maps.SymbolPath.CIRCLE, scale: 10, fillColor: '#FFD700', fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 } : undefined}
                  />
                )}
              </GoogleMap>
            ) : <div className="w-full h-full bg-white/5 flex items-center justify-center"><p className="text-gray-500 text-sm">Cargando mapa...</p></div>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )

  // VISTA BLOG - sin sesion
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-night px-6 md:px-14 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="max-w-xl mx-auto lg:mx-0">
            <span className="tag-yellow mb-5 inline-block">Reserva tu viaje</span>
            <h1 className="text-5xl font-black text-white mb-4">Planifica tu viaje <span className="text-yellow">con anticipacion</span></h1>
            <p className="text-gray-500 mb-6">Programa tu viaje con fecha y hora exacta. Ideal para compromisos importantes donde no puedes fallar.</p>
            <div className="bg-night-2 border border-night-4 rounded-2xl p-6">
              <input className="w-full mb-3 bg-night-3 p-3 rounded-xl text-sm text-gray-300" placeholder="Punto de origen" value={origen} onChange={(e) => setOrigen(e.target.value)} />
              <input className="w-full mb-3 bg-night-3 p-3 rounded-xl text-sm text-gray-300" placeholder="Punto de destino" value={destino} onChange={(e) => setDestino(e.target.value)} />
              <div className="flex gap-2 mb-4">
                <input type="date" className="flex-1 bg-night-3 p-3 rounded-xl text-sm text-gray-300" onChange={(e) => setFechaBlog(e.target.value)} />
                <input type="time" className="flex-1 bg-night-3 p-3 rounded-xl text-sm text-gray-300" onChange={(e) => setHoraBlog(e.target.value)} />
              </div>
              <button onClick={handleReservaBlog} className="btn-yellow w-full text-sm">Confirmar reserva <ArrowRight size={16} /></button>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-night-4 h-[320px] md:h-[520px]">
            <iframe title="mapa" src={mapaURL} className="w-full h-full" />
          </div>
        </div>
        <div className="bg-yellow px-8 md:px-14 py-8">
          <span className="tag-black mb-6 inline-block">Historial de reservas</span>
          {viajes.length === 0 ? <p className="text-black-400 text-sm">Aun no tienes reservas.</p> : (
            <div className="grid md:grid-cols-2 gap-4">
              {viajes.map((viaje, i) => (
                <div key={i} className="card-dark p-4">
                  <p className="text-xs text-gray-400">Origen: {viaje.origen}</p>
                  <p className="text-xs text-gray-400">Destino: {viaje.destino}</p>
                  <p className="text-xs text-yellow font-semibold">Estado: {viaje.estado}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white px-8 md:px-14 py-16">
          <span className="tag-black mb-4 inline-block">Ventajas</span>
          <h2 className="text-4xl font-black text-night tracking-tight mt-3 mb-10">Por que reservar tu viaje?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BENEFICIOS.map(b => (
              <div key={b.title} className="card-dark flex gap-4 items-start p-6 rounded-3xl">
                <div className="icon-yellow">{b.icon}</div>
                <div><div className="text-white font-bold">{b.title}</div><div className="text-xs text-gray-500">{b.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-night px-8 md:px-14 py-16">
          <span className="tag-yellow mb-4 inline-block">Uso ideal</span>
          <h2 className="text-4xl font-black text-white tracking-tight mt-3 mb-10">Perfecto para cada ocasion</h2>
          <div className="flex flex-wrap gap-3">
            {USOS.map(u => <span key={u} className="bg-night-2 px-4 py-2 text-yellow text-xs rounded-md">{u}</span>)}
          </div>
        </div>
        <div className="bg-yellow px-8 md:px-14 py-16 text-center">
          <h2 className="text-4xl font-black text-night tracking-tight mb-4">Programa tu proximo viaje hoy</h2>
          <a href="/register" className="btn-black text-sm mx-auto">Reservar viaje <ArrowRight size={16} /></a>
        </div>
        <Footer />
      </main>
    </>
  )
}
