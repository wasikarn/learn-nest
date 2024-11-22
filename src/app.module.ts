import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ParametersController } from '@/parameters.controller';
import { ExceptionController } from '@/exception.controller';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PostsModule],
  controllers: [AppController, ParametersController, ExceptionController],
  providers: [AppService],
})
export class AppModule {}
