import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule, Params } from 'nestjs-pino';

import { AuthModule } from './auth/auth.module';
import { configOptions } from './config/env.validation';
import { MongooseConfigService } from './config/mongoose-config.service';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';

const loggerConfig: Params = {
  pinoHttp: {
    transport: {
      options: {
        colorize: true,
        singleLine: true,
      },
      target: 'pino-pretty',
    },
  },
};

@Module({
  controllers: [],
  imports: [
    PostModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ConfigModule.forRoot(configOptions),
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    UsersModule,
    LoggerModule.forRoot(loggerConfig),
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
