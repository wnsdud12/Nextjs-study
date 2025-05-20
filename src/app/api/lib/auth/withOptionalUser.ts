import { NextRequest } from "next/server"
import { getUserFromToken } from "./getUserFromToken"
import { TokenType } from "../../../../../types"

export function withOptionalUser(handler: (user: TokenType | null, req: NextRequest) => Promise<Response>) {
  return async function (req: NextRequest) {
    const user = await getUserFromToken()
    return handler(user, req)
  }
}
