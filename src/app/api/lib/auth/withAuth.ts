import { NextRequest } from "next/server"
import { getUserFromToken } from "./getUserFromToken"
import { createResponse } from "../response"
import { TokenType } from "../../../../../types"

export function withAuth(handler: (user: TokenType, req: NextRequest) => Promise<Response>) {
  return async function (req: NextRequest) {
    const user = await getUserFromToken()
    if (!user) return createResponse({}, "토큰이 만료되었습니다.", 401)
    return handler(user, req)
  }
}
