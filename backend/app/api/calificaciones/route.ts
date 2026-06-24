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

export async function POST(req: NextRequest) {
  const { usuario, respError } = authMiddleware(req);
  if (respError) return respError;
  try {
    const { viaje_id, calificado_id, tipo, estrellas, comentario } = await req.json();
    if (!viaje_id || !calificado_id || !tipo || !estrellas) return error("Campos requeridos faltantes");
    if (estrellas < 1 || estrellas > 5) return error("Estrellas debe ser entre 1 y 5");

    // Verificar que no haya calificado ya este viaje
    const [existe]: any = await pool.query(
      "SELECT id FROM calificaciones WHERE viaje_id = ? AND calificador_id = ? AND tipo = ?",
      [viaje_id, usuario.id, tipo]
    );
    if (existe.length > 0) return error("Ya calificaste este viaje", 400);

    await pool.query(
      "INSERT INTO calificaciones (viaje_id, calificador_id, calificado_id, tipo, estrellas, comentario) VALUES (?, ?, ?, ?, ?, ?)",
      [viaje_id, usuario.id, calificado_id, tipo, estrellas, comentario || null]
    );

    // Actualizar calificacion promedio del conductor si aplica
    if (tipo === 'pasajero_a_conductor') {
      const [rows]: any = await pool.query(
        "SELECT AVG(estrellas) as promedio FROM calificaciones WHERE calificado_id = ? AND tipo = 'pasajero_a_conductor'",
        [calificado_id]
      );
      const promedio = parseFloat(rows[0].promedio).toFixed(2);
      await pool.query(
        "UPDATE conductores SET calificacion = ? WHERE usuario_id = ?",
        [promedio, calificado_id]
      );
    }

    return ok({ mensaje: "Calificacion guardada exitosamente" }, 201);
  } catch (e: any) {
    console.error("ERROR CALIFICACION:", e);
    return error("Error interno del servidor", 500);
  }
}

export async function GET(req: NextRequest) {
  const { usuario, respError } = authMiddleware(req);
  if (respError) return respError;
  try {
    const { searchParams } = new URL(req.url);
    const usuario_id = searchParams.get('usuario_id') || usuario.id;
    const [rows]: any = await pool.query(
      "SELECT c.*, u.nombre as calificador_nombre FROM calificaciones c JOIN usuarios u ON c.calificador_id = u.id WHERE c.calificado_id = ? ORDER BY c.creado_en DESC",
      [usuario_id]
    );
    const [stats]: any = await pool.query(
      "SELECT AVG(estrellas) as promedio, COUNT(*) as total FROM calificaciones WHERE calificado_id = ?",
      [usuario_id]
    );
    return ok({ calificaciones: rows, stats: stats[0] });
  } catch (e) {
    return error("Error interno del servidor", 500);
  }
}
