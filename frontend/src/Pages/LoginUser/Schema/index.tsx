import { z, ZodType } from "zod";
import { ILogin } from "../../../Interfaces";

export const LoginSchema = z.object({
  id: z.number(),
  email: z.string().email().min(1, { message: "Email cannot be empty" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
}) satisfies ZodType<ILogin>;
