import { NextRequest } from "next/server";
import { verificarToken } from "./auth";
import { error } from "./response";

export function authMiddleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { usuario: null, respError: error("Token requerido", 401) };
  }
  try {
    const token = authHeader.split(" ")[1];
    const usuario = verificarToken(token);
    return { usuario, respError: null };
  } catch {
    return { usuario: null, respError: error("Token invalido", 401) };
  }
}
