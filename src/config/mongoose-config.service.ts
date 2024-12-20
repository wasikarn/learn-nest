import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import mongooseAutopopulate from 'mongoose-autopopulate';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    return {
      connectionFactory: (connection: Connection): Connection => {
        connection.plugin(mongooseAutopopulate);

        return connection;
      },
      uri: this.configService.getOrThrow<string>('MONGODB_URI'),
    };
  }
}
