import { NextRequest } from "next/server";
import pool from "../../../../lib/db";
import { hashPassword, generarToken } from "../../../../lib/auth";
import { ok, error } from "../../../../lib/response";

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, password, phone, address, latitud, longitud } = await req.json();
    if (!fullName || !email || !password) return error("Campos requeridos faltantes");

    const [existe]: any = await pool.query(
      "SELECT id FROM usuarios WHERE email = ?", [email]
    );
    if (existe.length > 0) return error("El email ya está registrado", 409);

    const hash = await hashPassword(password);
    const [result]: any = await pool.query(
      "INSERT INTO usuarios (nombre, email, password, telefono, direccion, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?)",[fullName, email, hash, phone || null, address || null, latitud || null, longitud || null]
    );

    const token = generarToken({ id: result.insertId, email, rol: "pasajero" });
    const usuario = { id: result.insertId, nombre: fullName, email, rol: "pasajero" };

    return ok({ token, usuario }, 201);
  } catch (e) {
    console.error("ERROR REGISTER:", e); return error("Error interno del servidor", 500);
  }
}



