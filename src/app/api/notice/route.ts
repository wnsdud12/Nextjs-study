// app/api/notice/route.ts
import { NextRequest } from "next/server";
import { getUserFromToken } from "@/app/lib/auth";
import { createResponse } from "../lib/response";

export type Notice = {
  id: number;
  userId: number;
  title: string;
  content: string;
};

const notices: Notice[] = []; // 메모리 저장용

// GET - 공지 목록 조회
export async function GET() {
  console.log("GET /api/notice");
  
  const user = await getUserFromToken();
  console.log("user", user);
  
  if (!user) {
    return createResponse({}, "토큰이 만료되었습니다.", 401);
  }
  return createResponse({ notices })
}

// POST - 공지 작성
export async function POST(req: NextRequest) {
  const user = await getUserFromToken();

  if (!user) {
    return createResponse({}, "토큰이 만료되었습니다.", 401);
  }

  const body = await req.json();
  const { title, content } = body;

  if (!title) {
    return createResponse({}, "제목을 입력해주세요.", 400);
  }
  if (!content) {
    return createResponse({}, "내용을 입력해주세요.", 400);
  }

  const newNotice = {
    id: notices.length + 1,
    userId: user.userId,
    title,
    content,
  };

  notices.push(newNotice);
  return createResponse({ notice: newNotice });
}
