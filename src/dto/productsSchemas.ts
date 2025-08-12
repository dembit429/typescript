import { z } from "zod";

export const createProductSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  price: z.number().positive(),
  category_id: z.string().uuid(),
});

export const idParamSchema = z.object({
  id: z.string().uuid(),
});

export const updateProductSchema = createProductSchema.partial();
