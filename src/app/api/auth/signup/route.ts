import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "../../lib/response";
import { z } from "zod";
import { PrismaClient } from "@/generated/prisma/client";


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, name } = body;

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1),
  });
  const validation = schema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.flatten();
    console.log(errors.fieldErrors);

    return createResponse({}, "회원가입에 실패했습니다.", 400);
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return createResponse({}, "이미 존재하는 회원입니다.", 400);
    }

    const newUser = await prisma.user.create({
      data: { email, password, name },
    });

    return NextResponse.json(newUser);
  } catch (err) {
    console.error(err);
    return createResponse({}, "회원가입에 실패했습니다.", 500);
  }
}
