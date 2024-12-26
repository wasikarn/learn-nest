import { ConfigModuleOptions } from '@nestjs/config';
import { SafeParseReturnType, z } from 'zod';

export type EnvSchemaType = z.infer<typeof envValidation>;

export const envValidation = z.object({
  JWT_ACCESS_TOKEN_EXPIRATION_MS: z.string({
    required_error: 'JWT_ACCESS_TOKEN_EXPIRATION_MS is required',
  }),
  JWT_ACCESS_TOKEN_SECRET: z.string({
    required_error: 'JWT_SECRET is required',
  }),
  JWT_REFRESH_TOKEN_EXPIRATION_MS: z.string({
    required_error: 'JWT_REFRESH_TOKEN_EXPIRATION_MS is required',
  }),
  JWT_REFRESH_TOKEN_SECRET: z.string({
    required_error: 'JWT_REFRESH_TOKEN_SECRET is required',
  }),
  MONGODB_URI: z.string({
    required_error: 'MONGODB_URI is required',
  }),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().transform(Number).default('3000'),
});

export const configOptions: ConfigModuleOptions = {
  cache: true,
  envFilePath: '.env',
  expandVariables: true,
  isGlobal: true,
  validate: (config: Record<string, unknown>): EnvSchemaType => {
    const parsed: SafeParseReturnType<EnvSchemaType, EnvSchemaType> =
      envValidation.safeParse(config);

    if (parsed.error) {
      throw new Error(
        `Config validation error: ${JSON.stringify(parsed.error.format())}`,
      );
    }

    return parsed.data;
  },
};
