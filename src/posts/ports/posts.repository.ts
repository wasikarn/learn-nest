import { Post } from '../domain/entities/post.entity';

export interface PostsRepository {
  findAll(): Promise<Post[]>;
}
