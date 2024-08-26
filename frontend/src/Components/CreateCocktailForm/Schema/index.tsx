import { z, ZodType } from "zod";
import { ICustomCocktailUpload } from "../../../Interfaces";

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

export const CocktailSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  category: CocktailCategorySchema,
  ingredients: z
    .string()
    .array()
    .min(2, { message: "Must be a min. of 2 ingredients" }),
  instructions: z
    .string()
    .array()
    .min(2, { message: "Must be a min. of 2 steps of instructions" }),
  imageFile: z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= MAX_FILE_SIZE;
    }, "File size must be less than 3MB")
    .refine((file) => {
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, "File must be of type .png, .jpeg, .jpg or .webp")
    .nullable(),
  imageName: z.string().min(1, { message: "Image is required" }),
}) satisfies ZodType<ICustomCocktailUpload>;
