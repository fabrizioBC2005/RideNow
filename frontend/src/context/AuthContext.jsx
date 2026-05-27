// ============================================
//  RideNow â€” Contexto global de autenticaciÃ³n
// ============================================
import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/auth.api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Al montar: verificar si hay token guardado
  useEffect(() => {
    const token = localStorage.getItem("ridenow_token");
    if (token) {
      authApi.me()
        .then((res) => setUsuario(res.datos))
        .catch(() => localStorage.removeItem("ridenow_token"))
        .finally(() => setCargando(false));
    } else {
      setCargando(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await authApi.login(email, password);
    localStorage.setItem("ridenow_token", res.datos.token);
    setUsuario(res.datos.usuario);
    return res.datos.usuario;
  };

  const register = async (datos) => {
    const res = await authApi.register(datos);
    localStorage.setItem("ridenow_token", res.datos.token);
    setUsuario(res.datos.usuario);
    return res.datos.usuario;
  };

  const logout = () => {
    localStorage.removeItem("ridenow_token");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto fÃ¡cilmente
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
