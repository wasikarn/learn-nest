import { Post } from '../post';

export interface PostsRepository {
  findAll(): Promise<Post[]>;
}
