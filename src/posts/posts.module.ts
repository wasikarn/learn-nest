import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { HttpModule } from '@nestjs/axios';
import { PostsController } from './adapters/controllers/posts.controller';
import { HttpPostsRepository } from './adapters/api/http-posts.repository';

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
