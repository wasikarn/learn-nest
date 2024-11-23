import { Controller } from '@nestjs/common';
import { PostsService } from '@/posts/posts.service';
import { Post } from '@/posts/posts.interface';
import { TypedRoute } from '@nestia/core';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @TypedRoute.Get()
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
