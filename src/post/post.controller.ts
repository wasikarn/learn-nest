import { TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { tags } from 'typia';

import { PostFilter } from './post-filter.interface';
import { Post } from './post.interface';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @TypedRoute.Get(':id')
  public async getPost(
    @TypedParam('id') id: number & tags.Type<'int32'>,
  ): Promise<Post> {
    return this.postService.getPost(id);
  }

  @TypedRoute.Get()
  public async getPosts(@TypedQuery() filter: PostFilter): Promise<Post[]> {
    return this.postService.getPosts(filter);
  }
}
