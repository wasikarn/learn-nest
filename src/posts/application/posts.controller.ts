import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Post } from '../domain/entities/post.entity';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOkResponse({
    description: 'The posts were fetched successfully.',
    type: [Post],
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong.',
  })
  async fetchPosts(): Promise<Post[]> {
    return this.postsService.getAllPosts();
  }
}
