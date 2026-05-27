// ============================================
//  RideNow — API de conductores
// ============================================
import { api } from "./client";

export const conductoresApi = {
  listar:     ()      => api.get("/api/conductores"),
  obtener:    (id)    => api.get(`/api/conductores/${id}`),
  registrar:  (datos) => api.post("/api/conductores", datos),
  actualizar: (id, datos) => api.put(`/api/conductores/${id}`, datos),
};
