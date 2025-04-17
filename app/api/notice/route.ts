// app/api/notice/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/app/lib/auth";

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
    return NextResponse.json({
      message: "Unauthorized",
      code: 401,
      data: {},
    });
  }

  return NextResponse.json({
    message: "success",
    code: 200,
    data: {
      notices,
    },
  });
}

// POST - 공지 작성
export async function POST(req: NextRequest) {
  const user = await getUserFromToken();

  if (!user) {
    return NextResponse.json({
      message: "Unauthorized",
      code: 401,
      data: {},
    });
  }

  const body = await req.json();
  const { title, content } = body;

  if (!title || !content) {
    return NextResponse.json({
      message: "Missing title or content",
      code: 400,
      data: {},
    });
  }

  const newNotice = {
    id: notices.length + 1,
    userId: user.userId,
    title,
    content,
  };

  notices.push(newNotice);

  return NextResponse.json({
    message: "success",
    code: 200,
    data: {
      notice: newNotice,
    },
  });
}
