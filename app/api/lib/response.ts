import { NextResponse } from "next/server";

export const createResponse = <T>(
  data: T | object = {},
  message: string = "success",
  code: number = 200
): NextResponse => {
  return NextResponse.json(
    {
      message,
      code,
      data,
    },
    { status: code }
  );
};
