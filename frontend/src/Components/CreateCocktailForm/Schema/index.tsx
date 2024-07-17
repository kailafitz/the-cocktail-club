import { z, ZodType } from "zod";
import { ICocktailUpload } from "../../../Interfaces";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const CocktailCategorySchema = z.union([
  z.literal("Alcoholic"),
  z.literal("Non-alcoholic"),
]);

export const CocktailSchema = z
  .object({
    id: z.number(),
    name: z.string().min(1, { message: "Name is required" }),
    category: CocktailCategorySchema,
    ingredients: z.string().array(),
    instructions: z.string().array(),
    image: z
      .instanceof(File)
      .refine((file) => {
        return !file || file.size <= MAX_FILE_SIZE;
      }, "File size must be less than 3MB")
      .refine((file) => {
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
      }, "File must be a .PNG"),
  })
  .required() satisfies ZodType<ICocktailUpload>;
