import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';

import {
  Comment,
  CreatePost,
  PostFilter,
  Posts,
  UpdatePost,
} from './post.interface';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpCode(HttpStatusCode.Created)
  @Post()
  public async createPost(@Body() post: CreatePost): Promise<Posts> {
    return this.postService.createPost(post);
  }

  @Delete(':id')
  @HttpCode(HttpStatusCode.NoContent)
  public async deletePost(@Param('id') id: number): Promise<void> {
    return this.postService.deletePost(id);
  }

  @Get(':id')
  @HttpCode(HttpStatusCode.Ok)
  public async getPost(@Param('id') id: number): Promise<Posts> {
    return this.postService.getPost(id);
  }

  @Get(':postId/comments')
  @HttpCode(HttpStatusCode.Ok)
  public getPostComments(@Param('postId') postId: number): Promise<Comment[]> {
    return this.postService.getPostComments(postId);
  }

  @Get()
  @HttpCode(HttpStatusCode.Ok)
  public async getPosts(@Query() filter: PostFilter): Promise<Posts[]> {
    return this.postService.getPosts(filter);
  }

  @HttpCode(HttpStatusCode.Ok)
  @Put(':id')
  public async updatePost(
    @Param('id') id: number,
    @Body() post: UpdatePost,
  ): Promise<Posts> {
    return this.postService.updatePost(id, post);
  }
}
