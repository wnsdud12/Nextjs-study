"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const createToken = async (id: number, email: string) => {
  const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

  // JWT 토큰 생성
  const token = jwt.sign({ userId: id, email: email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};
export default createToken;
