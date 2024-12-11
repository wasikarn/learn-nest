import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  imports: [HttpModule],
  providers: [PostService],
})
export class PostModule {}
