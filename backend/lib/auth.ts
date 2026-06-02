import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET = process.env.JWT_SECRET || "ridenow_secret_key";

export function generarToken(payload: object): string {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verificarToken(token: string): any {
  return jwt.verify(token, SECRET);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function compararPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
