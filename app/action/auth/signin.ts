import createToken from "@/app/lib/cookies";
import signinSchema from "@/schema/auth/signinSchema";
import { SigninFormState } from "@/types/authTypes";
import { redirect } from "next/navigation";

// 예제 유저 데이터
const data = [{ id: 1, email: "qwe", password: "qwe" }];
export async function signin(state: SigninFormState, formData: FormData) {
  console.log("begin signin");
  
  // Validate form fields
  const validatedFields = signinSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  console.log("validatedFields : ", validatedFields);
  
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  // const hashedPassword = await bcrypt.hash(password, 10);
  if (data.find((user) => user.email !== email && user.password !== password)) {
    return {
      message: "Invalid email or password.",
    };
  }

  // 3. Insert the user into the database or call an Auth Library's API
  // const data = await db
  //   .insert(users)
  //   .values({
  //     email,
  //     password: hashedPassword,
  //   })
  //   .returning({ id: users.id });

  const user = data[0];

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  // 4. Create user session
  await createToken(user.id, user.email);
  // 5. Redirect user
  redirect("/dashboard");
}
