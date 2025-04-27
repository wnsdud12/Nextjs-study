// app/api/me/route.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "@/app/lib/constant";
import { createResponse } from "../../lib/response";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return createResponse({}, "토큰이 만료되었습니다.", 401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { email: string; userId: number };
    if (!decoded) {
      return createResponse({}, "토큰이 만료되었습니다.", 401);
    }
    return createResponse({ email: decoded.email });
  } catch (err) {
    console.error("Invalid token:", err);
    return createResponse({}, "토큰이 만료되었습니다.", 401);
  }
}
