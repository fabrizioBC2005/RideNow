import { NextRequest } from "next/server";
import pool from "../../../lib/db";
import { authMiddleware } from "../../../lib/authMiddleware";
import { ok, error } from "../../../lib/response";

export async function GET(req: NextRequest) {
  const { respError } = authMiddleware(req);
  if (respError) return respError;

  try {
    const [rows]: any = await pool.query("SELECT * FROM viajes ORDER BY creado_en DESC");
    return ok(rows);
  } catch (e) {
    return error("Error interno del servidor", 500);
  }
}

export async function POST(req: NextRequest) {
  const { usuario, respError } = authMiddleware(req);
  if (respError) return respError;

  try {
    const { origen, destino, precio } = await req.json();
    if (!origen || !destino) return error("Origen y destino requeridos");

    const [result]: any = await pool.query(
      "INSERT INTO viajes (pasajero_id, origen, destino, precio) VALUES (?, ?, ?, ?)",
      [usuario.id, origen, destino, precio || null]
    );
    return ok({ id: result.insertId, mensaje: "Viaje creado" }, 201);
  } catch (e) {
    return error("Error interno del servidor", 500);
  }
}
