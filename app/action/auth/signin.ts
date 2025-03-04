import createToken from "@/app/lib/cookies";
import signinSchema from "@/schema/auth/signinSchema";
import { SigninFormState } from "@/types/authTypes";
import { redirect } from "next/navigation";

// 예제 유저 데이터
const users = [{ id: 1, email: "qwe", password: "qwe" }];

export async function signin(state: SigninFormState, formData: FormData) {
  const validatedFields = signinSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const user = users.find((u) => u.email === "qwe" && u.password === "qwe");

    if (!user) {
      return { message: "Invalid email or password" };
    }

    await createToken(user.id, user.email);

    console.log("Redirecting to /dashboard...");
    redirect("/dashboard"); // 여기서 함수가 종료되므로 return 필요 없음
  } catch (error) {
    console.error(error);
    return { message: "Server error" };
  }
}
