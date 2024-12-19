import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { validate } from './config/env.validation';
import { MongooseConfigService } from './config/mongoose-config.service';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [],
  imports: [
    PostModule,
    ConfigModule.forRoot({
      cache: true,
      envFilePath: '.env',
      expandVariables: true,
      isGlobal: true,
      validate: validate,
    }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    UsersModule,
  ],
  providers: [],
})
export class AppModule {}
