// ============================================
//  RideNow — API de autenticación
// ============================================
import { api } from "./client";

export const authApi = {
  login: (email, password) =>
    api.post("/api/auth/login", { email, password }),

  register: (datos) =>
    api.post("/api/auth/register", datos),

  me: () =>
    api.get("/api/auth/me"),
};
