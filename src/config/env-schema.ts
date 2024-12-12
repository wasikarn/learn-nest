import { z } from 'zod';

export type EnvSchemaType = z.infer<typeof envSchema>;

export const envSchema = z.object({
  MONGODB_URI: z.string({
    required_error: 'MONGODB_URI is required',
  }),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().transform(Number).default('3000'),
});
