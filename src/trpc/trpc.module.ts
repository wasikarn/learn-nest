import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';

import { AppContext } from './context/app.context';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TrpcPanelController } from './trpc-panel.controller';

@Module({
  controllers: [TrpcPanelController],
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: 'src/trpc/@generated',
      context: AppContext,
    }),
  ],
  providers: [LoggerMiddleware, AppContext],
})
export class TrpcModule {}
