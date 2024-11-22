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
}
