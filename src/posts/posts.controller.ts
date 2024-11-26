import { Controller, Get } from '@nestjs/common';
import { Effect, pipe } from 'effect';
import { PostsService } from './posts.service';
import { Post } from './posts.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async fetchPosts(): Promise<Post[]> {
    return this.postsService.fetchPosts();
  }

  @Get('titles')
  async fetchPostTitles(): Promise<string[]> {
    return Effect.runPromise(
      pipe(
        Effect.tryPromise(
          (): Promise<Post[]> => this.postsService.fetchPosts(),
        ),
        Effect.map((posts: Post[]): string[] =>
          posts.map((post: Post): string => post.title),
        ),
      ),
    );
  }
}
