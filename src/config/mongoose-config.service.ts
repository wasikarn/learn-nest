import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import mongooseAutopopulate from 'mongoose-autopopulate';

export const MONGODB_DEFAULT_CONNECTION = 'default';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      connectionFactory: (connection: Connection): void => {
        connection.plugin(mongooseAutopopulate);
      },
      uri: this.configService.get<string>('MONGODB_URI') as string,
    };
  }
}
