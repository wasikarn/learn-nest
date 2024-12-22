import { z } from 'zod';

export const productDtoSchema = z.object({
  details: z.object({
    description: z.string().optional(),
    rating: z.number().optional(),
  }),
  id: z.string(),
  name: z.string(),
  price: z.number(),
});

export type ProductDto = z.infer<typeof productDtoSchema>;
