import { Module } from '@nestjs/common';
import { PostsService } from '../application/posts.service';
import { HttpModule } from '@nestjs/axios';
import { PostsController } from '../application/posts.controller';
import { HttpPostsRepository } from '../adapters/http-posts.repository';

@Module({
  imports: [HttpModule],
  controllers: [PostsController],
  providers: [
    PostsService,
    {
      provide: 'PostsRepository',
      useClass: HttpPostsRepository,
    },
  ],
})
export class PostsModule {}
