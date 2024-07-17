import { z, ZodType } from "zod";
import { IUser } from "../../../Interfaces";

export const EditBioSchema = z.object({
  bio: z.string(),
});
