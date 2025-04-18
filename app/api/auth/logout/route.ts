// app/api/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  
  // 쿠키 삭제
  cookieStore.delete("accessToken");
  return NextResponse.json({
    message: "Logged out successfully",
    code: 200,
  });
}
