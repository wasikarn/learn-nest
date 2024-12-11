import { TypedQuery, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { Post } from './post.interface';
import { PostFilter } from './post-filter.interface';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @TypedRoute.Get()
  public async getPosts(@TypedQuery() filter: PostFilter): Promise<Post[]> {
    return this.postService.getPosts(filter);
  }
}
