// app/api/logout/route.ts
import { cookies } from "next/headers";
import { createResponse } from "@/app/api/lib";

export async function POST() {
  const cookieStore = await cookies();

  // 쿠키 삭제
  cookieStore.delete("accessToken");
  return createResponse();
}
