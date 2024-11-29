import { Post } from 'src/posts/domain/post';
import { PostsRepository } from '../../domain/ports/posts.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoPostsRepository implements PostsRepository {
  findAll(): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }
}
