import { z } from "zod";

export const EditBioSchema = z.object({
  bio: z.string(),
});
