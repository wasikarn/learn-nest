import { TypedBody, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { tags } from 'typia';

import { CreatePost, Post, PostFilter } from './post.interface';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @TypedRoute.Post()
  public async createPost(@TypedBody() post: CreatePost): Promise<Post> {
    return this.postService.createPost(post);
  }

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
