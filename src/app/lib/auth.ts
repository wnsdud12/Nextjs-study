// app/lib/auth.ts
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { JWT_SECRET_KEY } from "./constant";
import { TokenType } from "../../../types";

export async function getUserFromToken(): Promise<
  TokenType | null | undefined
> {
  const cookieStore = await cookies(); // ✅ async로 변경
  const token = cookieStore.get("accessToken")?.value;
  console.log("token", token);

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as {
      userId: number;
      email: string;
    };
    return decoded;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
