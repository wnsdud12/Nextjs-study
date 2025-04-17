// app/lib/auth.ts
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromToken(): Promise<
  | {
      userId: number;
      email: string;
    }
  | null
  | undefined
> {
  const cookieStore = await cookies(); // ✅ async로 변경
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    ) as {
      userId: number;
      email: string;
    };
    return decoded;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
