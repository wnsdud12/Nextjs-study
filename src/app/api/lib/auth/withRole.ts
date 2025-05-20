// import { NextRequest } from "next/server"
// import { getUserFromToken } from "./getUserFromToken"
// import { createResponse } from "../response"
// import { TokenType } from "../../../../../types"

// TODO: 아직 role을 설정하지 않아서 주석처리
// export function withRole(requiredRole: string, handler: (user: TokenType, req: NextRequest) => Promise<Response>) {
//   return async function (req: NextRequest) {
//     const user = await getUserFromToken()
//     if (!user || user.role !== requiredRole) {
//       return createResponse({}, "권한이 없습니다.", 403)
//     }
//     return handler(user, req)
//   }
// }
