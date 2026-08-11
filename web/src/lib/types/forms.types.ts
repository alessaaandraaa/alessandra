import z from "zod";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "./constants";

export const userFormSchema = z.object({
  name: z.string().min(1, "Please add a name."),
  link: z.url("Please enter a valid URL."),
  image: z
    .any()
    .refine(
      (file) => !file || file?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`,
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
  categories: z.array(z.string()).min(1, "At least one category is required"),
});

export const guestFormSchema = z.object({
  name: z.string().min(1, "Please add a name."),
  link: z.url("Please enter a valid URL."),
  image: z.url("Please enter a valid image URL."),
  categories: z.array(z.string()).min(1, "At least one category is required"),
});
