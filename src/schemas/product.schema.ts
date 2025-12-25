import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(2, "Product name must be at least 2 characters"),

  category: z.string().min(1, "Category is required"),

  price: z.coerce.number().positive("Price must be greater than 0"),

  stock: z.coerce
    .number()
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),

  description: z.string().min(5, "Description must be at least 5 characters"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
