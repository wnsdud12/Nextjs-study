// app/api/me/route.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized", code: 401, data: null },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { email: string; userId: number };
    return NextResponse.json({
      message: "success",
      code: 200,
      data: { email: decoded.email },
    });
  } catch (err) {
    console.error("Invalid token:", err);
    return NextResponse.json(
      { message: "Invalid token", code: 401, data: null },
      { status: 401 }
    );
  }
}
