import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { JWT_SECRET_KEY } from "@/app/lib/constant"

export function middleware(req: NextRequest) {
  
  const token = req.cookies.get("accessToken")?.value

  // ✅ 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    jwt.verify(token, JWT_SECRET_KEY) // 유효한지 검사만 (정보는 필요 없으면 skip)
    return NextResponse.next()
  } catch (err) {
    console.error("Invalid token:", err)
    return NextResponse.redirect(new URL("/login", req.url))
  }
}
export const config = {
  matcher: [
    // (main) 폴더 안의 모든 경로에 적용
    "/(main)/(.*)",
  ],
}
