// app/api/notice/route.ts
import { createResponse, withAuth } from "@/app/api/lib";

export type Notice = {
  id: number;
  userId: number;
  title: string;
  content: string;
};

const notices: Notice[] = []; // 메모리 저장용

// GET - 공지 목록 조회
export const GET = withAuth(async () => {
  return createResponse({ notices });
});

// POST - 공지 작성
export const POST = withAuth(async (user, req) => {
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
});
