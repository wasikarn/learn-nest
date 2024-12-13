import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validate } from './config/env-schema';
import { MongooseConfigService } from './config/mongoose-config.service';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
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
  providers: [AppService],
})
export class AppModule {}
