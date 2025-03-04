import { z } from "zod";

// const signinSchema =z.object({
//   email: z.string().email(),
//   password: z
//     .string()
//     .min(8, { message: "Be at least 8 characters long" })
//     .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
//     .regex(/[0-9]/, { message: "Contain at least one number." })
//     .regex(/[^a-zA-Z0-9]/, {
//       message: "Contain at least one special character.",
//     }),
// });
const signinSchema = z.object({
  email: z.string().trim().min(3),
  password: z.string().trim().min(3),
});

export default signinSchema;
