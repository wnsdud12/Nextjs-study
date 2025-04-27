import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "@/app/lib/constant";
import { createResponse } from "../../lib/response";

export async function POST(request: Request) {
  const body = await request.json();
  const refreshToken = body.refreshToken;

  if (!refreshToken) {
    createResponse({}, "토큰이 만료되었습니다.", 401)
  }
  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET_KEY) as {
      userId: number;
      email: string;
    };

    // 새로운 accessToken 발급
    const newAccessToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email },
      JWT_SECRET_KEY,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // 새로운 accessToken을 httpOnly 쿠키에 저장
    const cookieStore = await cookies();
    cookieStore.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    return createResponse();
  } catch (err) {
    console.error("Invalid refresh token:", err);
    return createResponse({}, "토큰이 만료되었습니다.", 401);
  }
}
