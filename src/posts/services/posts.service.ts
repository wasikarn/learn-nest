import { Inject, Injectable } from '@nestjs/common';
import { PostsRepository } from '../domain/ports/posts.repository';
import { Post } from '../domain/post';

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
