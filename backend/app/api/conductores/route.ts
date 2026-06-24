import { NextRequest } from "next/server";
import pool from "../../../lib/db";
import { ok, error } from "../../../lib/response";
import { hashPassword } from "../../../lib/auth";
import crypto from "node:crypto";

function idGenerate(longitud = 11): string {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let resultado = "";
  const bytes = crypto.randomBytes(longitud);
  for (let i = 0; i < longitud; i++) {
    resultado += caracteres[bytes[i] % caracteres.length];
  }
  return resultado;
}

export async function GET(req: NextRequest) {
  try {
    const [rows]: any = await pool.query(
      "SELECT c.*, u.nombre, u.email, u.telefono, u.dni FROM conductores c JOIN usuarios u ON c.usuario_id = u.id"
    );
    return ok(rows);
  } catch (e: any) {
    console.error("❌ Error en GET:", e.message);
    return error("Error interno del servidor", 500);
  }
}

export async function POST(req: NextRequest) {
  const connection = await pool.getConnection();
  
  try {
    const { 
      nombre, email, password, telefono, direccion, licencia, vehiculo, placa
    } = await req.json();    
    if (!nombre || !email || !password || !licencia || !vehiculo || !placa) {
      connection.release();
      return error("Campos requeridos faltantes para el registro completo", 400);
    }
    await connection.beginTransaction();
    const nuevoUsuarioId = idGenerate(11);
    const nuevoConductorId = idGenerate(11);
    const hashedPassword = await hashPassword(password); 
    await connection.query(
      `INSERT INTO usuarios (id, nombre, dni, email, password, telefono, direccion, rol) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'conductor')`,
      [nuevoUsuarioId, nombre, direccion.replace("DNI: ", ""), email, hashedPassword, telefono || null, direccion || null]
    );
    await connection.query(
      `INSERT INTO conductores (id, usuario_id, licencia, vehiculo, placa) 
       VALUES (?, ?, ?, ?, ?)`,
      [nuevoConductorId, nuevoUsuarioId, licencia, vehiculo, placa]
    );
    await connection.commit();
    connection.release();
    return ok({ 
      usuario_id: nuevoUsuarioId,
      conductor_id: nuevoConductorId, 
      mensaje: "Usuario y conductor registrados exitosamente." 
    }, 201);
  } catch (e: any) {
    await connection.rollback();
    connection.release();
    console.error("❌ ERROR EN POST:", e);    
    if (e.code === 'ER_DUP_ENTRY') {
      return error("El email, la licencia o la placa ya se encuentran registrados.", 400);
    }
    return error(`Error interno: ${e.message}`, 500);
  }
}