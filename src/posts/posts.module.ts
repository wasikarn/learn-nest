import { Module } from '@nestjs/common';
import { PostsService } from './application/posts.service';
import { HttpModule } from '@nestjs/axios';
import { PostsController } from './application/posts.controller';

@Module({
  imports: [HttpModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
