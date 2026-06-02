import { NextRequest } from "next/server";
import pool from "../../../lib/db";
import { authMiddleware } from "../../../lib/authMiddleware";
import { ok, error } from "../../../lib/response";

export async function GET(req: NextRequest) {
  const { respError } = authMiddleware(req);
  if (respError) return respError;

  try {
    const [rows]: any = await pool.query("SELECT * FROM pagos ORDER BY creado_en DESC");
    return ok(rows);
  } catch (e) {
    return error("Error interno del servidor", 500);
  }
}

export async function POST(req: NextRequest) {
  const { respError } = authMiddleware(req);
  if (respError) return respError;

  try {
    const { viaje_id, monto, metodo } = await req.json();
    if (!viaje_id || !monto || !metodo) return error("Campos requeridos faltantes");

    const [result]: any = await pool.query(
      "INSERT INTO pagos (viaje_id, monto, metodo) VALUES (?, ?, ?)",
      [viaje_id, monto, metodo]
    );
    return ok({ id: result.insertId, mensaje: "Pago registrado" }, 201);
  } catch (e) {
    return error("Error interno del servidor", 500);
  }
}
