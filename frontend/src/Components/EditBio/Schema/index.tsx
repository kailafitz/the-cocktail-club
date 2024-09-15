import { z } from "zod";

export const EditBioSchema = z.object({
  bio: z.string().max(255, "Max length is 255 characters"),
});
