import { z } from 'zod';

export type EnvSchemaType = z.infer<typeof environmentSchema>;

export const environmentSchema = z.object({
  MONGO_URI: z.string({
    required_error: 'MONGO_URI is required',
  }),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().transform(Number).default('3000'),
});
