"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { JWT_SECRET_KEY } from "./constant";
const createToken = async (id: number, email: string) => {

  // JWT 토큰 생성
  const token = jwt.sign({ userId: id, email: email }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  console.log("token : ", token);
  
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  console.log(cookieStore.get("token"));
  
};
export default createToken;
