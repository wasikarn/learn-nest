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
  async fetchPostTitles(): Promise<string[]> {
    const posts: Post[] = await this.postsService.fetchPosts();
    const titlesGenerator: Generator<string, void, unknown> =
      this.postsService.postTitles(posts);
    const titles: string[] = [];

    for (const title of titlesGenerator) {
      titles.push(title);
    }

    return titles;
  }
}
