import { NextRequest } from "next/server";
import pool from "../../../../lib/db";
import { hashPassword, generarToken } from "../../../../lib/auth";
import { ok, error } from "../../../../lib/response";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const { fullName, dni, email, password, phone, address, latitud, longitud } = await req.json();
    if (!fullName || !email || !password) return error("Campos requeridos faltantes");

    const [existe]: any = await pool.query(
      "SELECT id FROM usuarios WHERE email = ?", [email]
    );
    if (existe.length > 0) return error("El email ya esta registrado", 409);

    const hash = await hashPassword(password);
    const id = `USR-${Date.now()}`;
    await pool.query(
      "INSERT INTO usuarios (id, nombre, dni, email, password, telefono, direccion, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, fullName, dni || "00000000", email, hash, phone || null, address || null, latitud || null, longitud || null]
    );

    const token = generarToken({ id, email, rol: "pasajero" });
    const usuario = { id, nombre: fullName, email, rol: "pasajero" };
    return ok({ token, usuario }, 201);
  } catch (e) {
    console.error("ERROR REGISTER:", e);
    return error("Error interno del servidor", 500);
  }
}
