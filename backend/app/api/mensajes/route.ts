import { NextRequest } from "next/server";
import pool from "../../../lib/db";
import { authMiddleware } from "../../../lib/authMiddleware";
import { ok, error } from "../../../lib/response";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}

export async function GET(req: NextRequest) {
  const { usuario, respError } = authMiddleware(req);
  if (respError) return respError;
  try {
    const { searchParams } = new URL(req.url);
    const viaje_id = searchParams.get("viaje_id");
    if (!viaje_id) return error("viaje_id requerido");
    const [rows]: any = await pool.query(
      "SELECT m.*, u.nombre as remitente_nombre, u.rol as remitente_rol FROM mensajes m JOIN usuarios u ON m.remitente_id = u.id WHERE m.viaje_id = ? ORDER BY m.creado_en ASC",
      [viaje_id]
    );
    return ok(rows);
  } catch (e) {
    return error("Error interno del servidor", 500);
  }
}

export async function POST(req: NextRequest) {
  const { usuario, respError } = authMiddleware(req);
  if (respError) return respError;
  try {
    const { viaje_id, mensaje } = await req.json();
    if (!viaje_id || !mensaje?.trim()) return error("viaje_id y mensaje requeridos");
    await pool.query(
      "INSERT INTO mensajes (viaje_id, remitente_id, mensaje) VALUES (?, ?, ?)",
      [viaje_id, usuario.id, mensaje.trim()]
    );
    return ok({ mensaje: "Mensaje enviado" }, 201);
  } catch (e) {
    return error("Error interno del servidor", 500);
  }
}
