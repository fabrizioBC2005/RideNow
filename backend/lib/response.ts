import { NextResponse } from "next/server";

export function ok(datos: any, status = 200) {
  return NextResponse.json({ datos }, { status });
}

export function error(mensaje: string, status = 400) {
  return NextResponse.json({ error: mensaje }, { status });
}
