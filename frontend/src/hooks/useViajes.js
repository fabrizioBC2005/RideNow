// ============================================
//  RideNow — Hook para manejar viajes
// ============================================
import { useState, useEffect } from "react";
import { viajesApi } from "../api/viajes.api";

export function useViajes() {
  const [viajes, setViajes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const cargar = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await viajesApi.listar();
      setViajes(res.datos || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  const crearViaje = async (datos) => {
    const res = await viajesApi.crear(datos);
    await cargar(); // refrescar lista
    return res.datos;
  };

  return { viajes, cargando, error, cargar, crearViaje };
}
