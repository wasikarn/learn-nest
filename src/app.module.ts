import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';

@Module({
  controllers: [AppController],
  imports: [PostModule],
  providers: [AppService],
})
export class AppModule {}
