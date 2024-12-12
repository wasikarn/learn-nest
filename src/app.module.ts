import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SafeParseReturnType } from 'zod';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environmentSchema, EnvSchemaType } from './config/environment-schema';
import { PostModule } from './post/post.module';

@Module({
  controllers: [AppController],
  imports: [
    PostModule,
    ConfigModule.forRoot({
      cache: true,
      envFilePath: '.env',
      expandVariables: true,
      isGlobal: true,
      validate: (config: Record<string, any>): EnvSchemaType => {
        const parsed: SafeParseReturnType<EnvSchemaType, EnvSchemaType> =
          environmentSchema.safeParse(config);

        if (parsed.error) {
          throw new Error(
            `Config validation error: ${JSON.stringify(parsed.error.format())}`,
          );
        }

        return parsed.data;
      },
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
