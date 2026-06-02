import { NextRequest } from "next/server";
import pool from "../../../../lib/db";
import { authMiddleware } from "../../../../lib/authMiddleware";
import { ok, error } from "../../../../lib/response";

export async function GET(req: NextRequest) {
  const { usuario, respError } = authMiddleware(req);
  if (respError) return respError;

  try {
    const [rows]: any = await pool.query(
      "SELECT id, nombre, email, telefono, direccion, rol, creado_en FROM usuarios WHERE id = ?",
      [usuario.id]
    );
    if (rows.length === 0) return error("Usuario no encontrado", 404);
    return ok(rows[0]);
  } catch (e) {
    return error("Error interno del servidor", 500);
  }
}
