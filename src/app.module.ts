import { BullModule } from '@nestjs/bullmq';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule, Params } from 'nestjs-pino';

import { configOptions } from './config/env.validation';
import { MongooseConfigService } from './config/mongoose-config.service';
import { PostModule } from './post/post.module';
import { ProductsModule } from './products/products.module';
import { TrpcModule } from './trpc/trpc.module';
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
    CacheModule.register(),
    ConfigModule.forRoot(configOptions),
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    UsersModule,
    TrpcModule,
    ProductsModule,
    LoggerModule.forRoot(loggerConfig),
  ],
  providers: [],
})
export class AppModule {}
