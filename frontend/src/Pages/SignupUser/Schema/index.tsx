import { z, ZodType } from "zod";
import { ISignUp } from "../../../Interfaces";

const SignupSchema = z.object({
  id: z.number(),
  email: z.string().email().min(1, { message: "Email cannot be empty" }),
  firstName: z
    .string()
    .min(2, { message: "First name must be more than 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be more than 2 characters" }),
  password: z.string().min(8, { message: "Password cannot be empty" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Confirm password cannot be empty" }),
}) satisfies ZodType<ISignUp>;

export const FullSignupSchema = SignupSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  }
);
