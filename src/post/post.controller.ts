import { TypedBody, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller, HttpCode } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { tags } from 'typia';

import { CreatePost, PostFilter, Posts, UpdatePost } from './post.interface';
import { PostService } from './post.service';

import Delete = TypedRoute.Delete;
import Get = TypedRoute.Get;
import Post = TypedRoute.Post;
import Put = TypedRoute.Put;

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpCode(HttpStatusCode.Created)
  @Post()
  public async createPost(@TypedBody() post: CreatePost): Promise<Posts> {
    return this.postService.createPost(post);
  }

  @Delete(':id')
  @HttpCode(HttpStatusCode.NoContent)
  public async deletePost(@TypedParam('id') id: number): Promise<void> {
    return this.postService.deletePost(id);
  }

  @Get(':id')
  @HttpCode(HttpStatusCode.Ok)
  public async getPost(
    @TypedParam('id') id: number & tags.Type<'int32'>,
  ): Promise<Posts> {
    return this.postService.getPost(id);
  }

  @Get()
  @HttpCode(HttpStatusCode.Ok)
  public async getPosts(@TypedQuery() filter: PostFilter): Promise<Posts[]> {
    return this.postService.getPosts(filter);
  }

  @HttpCode(HttpStatusCode.Ok)
  @Put(':id')
  public async updatePost(
    @TypedParam('id') id: number,
    @TypedBody() post: UpdatePost,
  ): Promise<Posts> {
    return this.postService.updatePost(id, post);
  }
}
