import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import {
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  JWT_SECRET_KEY,
} from "@/app/lib/constant";
import { createResponse } from "@/app/api/lib";
import signinSchema from "@/schema/auth/signinSchema";
import { User } from "@prisma/client";
import prisma from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // ✅ 1. 필드 유효성 검사
  const validatedFields = signinSchema.safeParse({ email, password });
  if (!validatedFields.success) {
    return createResponse({}, "아이디 또는 비밀번호가 일치하지 않습니다.", 400);
  }

  // ✅ 2. Prisma로 유저 조회
  const user: User | null = await prisma.user.findUnique({
    where: { email },
  });

  // ✅ 3. 유저 없거나 비밀번호 틀림
  if (!user || user.password !== password) {
    return createResponse({}, "아이디 또는 비밀번호가 일치하지 않습니다.", 400);
  }

  // ✅ 4. accessToken 생성
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET_KEY,
    { expiresIn: JWT_EXPIRES_IN },
  );

  // ✅ 5. refreshToken 생성
  const refreshToken = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET_KEY,
    { expiresIn: JWT_REFRESH_EXPIRES_IN },
  );

  // ✅ 6. 응답 생성 및 쿠키 설정
  const response = createResponse();
  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  response.headers.set("Authorization", `Bearer ${refreshToken}`);

  return response;
}
