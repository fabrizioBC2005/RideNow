import { NextRequest } from "next/server";
import pool from "../../../lib/db";
import { authMiddleware } from "../../../lib/authMiddleware";
import { ok, error } from "../../../lib/response";

export async function GET(req: NextRequest) {
  const { respError } = authMiddleware(req);
  if (respError) return respError;

  try {
    const [rows]: any = await pool.query(
      "SELECT c.*, u.nombre, u.email FROM conductores c JOIN usuarios u ON c.usuario_id = u.id"
    );
    return ok(rows);
  } catch (e) {
    return error("Error interno del servidor", 500);
  }
}

export async function POST(req: NextRequest) {
  const { respError } = authMiddleware(req);
  if (respError) return respError;

  try {
    const { usuario_id, licencia, vehiculo, placa } = await req.json();
    if (!usuario_id || !licencia || !vehiculo || !placa) return error("Campos requeridos faltantes");

    const [result]: any = await pool.query(
      "INSERT INTO conductores (usuario_id, licencia, vehiculo, placa) VALUES (?, ?, ?, ?)",
      [usuario_id, licencia, vehiculo, placa]
    );
    return ok({ id: result.insertId, mensaje: "Conductor registrado" }, 201);
  } catch (e) {
    return error("Error interno del servidor", 500);
  }
}
