import { createResponse, withAuth } from "@/app/api/lib";

export const GET = withAuth(async (user) => {
  return createResponse({ email: user.email });
});
