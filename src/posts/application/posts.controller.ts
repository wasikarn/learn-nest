import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Post } from '../domain/entities/post.entity';
import { ErrorResponse } from '../../common/models/error-response.model';

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
    type: ErrorResponse,
  })
  async fetchPosts(): Promise<Post[]> {
    return this.postsService.getAllPosts();
  }
}
