import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SafeParseReturnType } from 'zod';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envSchema, EnvSchemaType } from './config/env-schema';
import { MongooseConfigService } from './config/mongoose-config.service';
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
          envSchema.safeParse(config);

        if (parsed.error) {
          throw new Error(
            `Config validation error: ${JSON.stringify(parsed.error.format())}`,
          );
        }

        return parsed.data;
      },
    }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
  ],
  providers: [AppService],
})
export class AppModule {}
