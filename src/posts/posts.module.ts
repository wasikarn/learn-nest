import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { HttpModule } from '@nestjs/axios';
import { PostsController } from './posts.controller';

@Module({
  imports: [HttpModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
