import { Controller, Get } from '@nestjs/common';
import { PostsService } from '../../services/posts.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponse } from '../../../common/models/error-response.model';
import { PostsResponseDto } from '../../dto/posts.response.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOkResponse({
    description: 'The posts were fetched successfully.',
    type: [PostsResponseDto],
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong.',
    type: ErrorResponse,
  })
  async fetchPosts(): Promise<PostsResponseDto[]> {
    return this.postsService.getAllPosts();
  }
}
