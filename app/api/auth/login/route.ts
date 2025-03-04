import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// 예제 유저 데이터 (실제 프로젝트에서는 DB에서 가져와야 함)
const users = [{ id: 1, email: "qwe", password: "qwe" }];

// 환경 변수에서 가져오는 것이 안전함
const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // JWT 토큰 생성
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // HttpOnly 쿠키로 설정 (보안 강화)
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
