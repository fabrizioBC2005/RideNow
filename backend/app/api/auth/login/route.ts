import { NextRequest } from "next/server";
import pool from "../../../../lib/db";
import { compararPassword, generarToken } from "../../../../lib/auth";
import { ok, error } from "../../../../lib/response";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return error("Email y password requeridos");

    const [rows]: any = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?", [email]
    );
    if (rows.length === 0) return error("Credenciales incorrectas", 401);

    const usuario = rows[0];
    const valido = await compararPassword(password, usuario.password);
    if (!valido) return error("Credenciales incorrectas", 401);

    const token = generarToken({ id: usuario.id, email: usuario.email, rol: usuario.rol });
    const { password: _, ...usuarioSinPassword } = usuario;

    return ok({ token, usuario: usuarioSinPassword });
  } catch (e) {
    return error("Error interno del servidor", 500);
  }
}
