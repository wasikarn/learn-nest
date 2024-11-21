import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ParametersController } from '@/parameters.controller';

@Module({
  imports: [],
  controllers: [AppController, ParametersController],
  providers: [AppService],
})
export class AppModule {}
