// ============================================
//  RideNow — API de viajes
// ============================================
import { api } from "./client";

export const viajesApi = {
  listar:  ()       => api.get("/api/viajes"),
  obtener: (id)     => api.get(`/api/viajes/${id}`),
  crear:   (datos)  => api.post("/api/viajes", datos),
  actualizar: (id, datos) => api.put(`/api/viajes/${id}`, datos),
};
