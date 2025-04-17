import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import signinSchema from "@/schema/auth/signinSchema";
import { JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN, JWT_SECRET_KEY } from "@/app/lib/constant";

// 로그인 성공 시 토큰 생성
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Validate form fields
  const validatedFields = signinSchema.safeParse({
    email,
    password,
  });
  if (!validatedFields.success) {
    return NextResponse.json(
      { message: "아이디 또는 비밀번호가 일치하지 않습니다." },
      { status: 400 }
    );
  }
  // 사용자 인증 로직
  const data = [{ id: 1, email: "qwe", password: "qwe" }]; // 예시 데이터

  const user = data.find((user) => user.email === email && user.password === password)
  
  if (user) {
    // 1. accessToken (short-lived) 생성
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET_KEY,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    // 2. refreshToken (long-lived) 생성
    const refreshToken = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET_KEY,
      {
        expiresIn: JWT_REFRESH_EXPIRES_IN,
      }
    );

    // 3. httpOnly 쿠키에 accessToken 저장
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    console.log("refreshToken : ", refreshToken);
    
    // 4. 클라이언트에게 refreshToken 전달
    response.headers.set("Authorization", `Bearer ${refreshToken}`);

    return response;
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
