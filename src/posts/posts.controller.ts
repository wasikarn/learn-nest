import {
  BadRequestException,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from '@/posts/posts.service';
import { Post } from '@/posts/posts.interface';
import { TypedException, TypedRoute } from '@nestia/core';
import { Effect, pipe } from 'effect';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @TypedRoute.Get()
  @TypedException<BadRequestException>({
    status: HttpStatus.BAD_REQUEST,
  })
  @TypedException<NotFoundException>({
    status: HttpStatus.NOT_FOUND,
  })
  @TypedException<InternalServerErrorException>({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async fetchPosts(): Promise<Post[]> {
    return this.postsService.fetchPosts();
  }

  @TypedRoute.Get('titles')
  @TypedException<BadRequestException>({
    status: HttpStatus.BAD_REQUEST,
  })
  @TypedException<NotFoundException>({
    status: HttpStatus.NOT_FOUND,
  })
  @TypedException<InternalServerErrorException>({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
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
