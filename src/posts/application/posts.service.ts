import { Inject, Injectable } from '@nestjs/common';
import { PostsRepository } from '../ports/posts.repository';
import { Post } from '../domain/entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @Inject('PostsRepository')
    private readonly postsRepository: PostsRepository,
  ) {}

  public async getAllPosts(): Promise<Post[]> {
    return this.postsRepository.findAll();
  }
}
