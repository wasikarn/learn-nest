import { Controller } from '@nestjs/common';
import { PostService } from './post.service';
import { TypedRoute } from '@nestia/core';
import { Post } from './post.interface';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @TypedRoute.Get()
  public async getPosts(): Promise<Post[]> {
    return this.postService.getPosts();
  }
}
