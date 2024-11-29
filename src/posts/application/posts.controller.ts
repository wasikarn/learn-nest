import { Controller, Get } from '@nestjs/common';
import { Effect, pipe } from 'effect';
import { PostsService } from './posts.service';
import { Post } from '../posts.response.dto';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOkResponse({
    description: 'The posts were fetched successfully.',
    type: [Post],
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong.',
  })
  async fetchPosts(): Promise<Post[]> {
    return this.postsService.fetchPosts();
  }

  @Get('titles')
  @ApiOkResponse({
    description: 'The post titles were fetched successfully.',
    type: [String],
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong.',
  })
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
