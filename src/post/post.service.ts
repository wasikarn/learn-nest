import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

import { CreatePost, Post, PostFilter, UpdatePost } from './post.interface';

@Injectable()
export class PostService {
  constructor(private readonly httpService: HttpService) {}

  public async createPost(post: CreatePost): Promise<Post> {
    const { data }: AxiosResponse<Post> = await firstValueFrom(
      this.httpService.post<Post>(
        'https://jsonplaceholder.typicode.com/posts',
        post,
      ),
    );

    return data;
  }

  public async deletePost(id: number): Promise<void> {
    await firstValueFrom(
      this.httpService.delete<void>(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      ),
    );
  }

  public async getPost(id: number): Promise<Post> {
    const { data }: AxiosResponse<Post> = await firstValueFrom(
      this.httpService.get<Post>(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      ),
    );

    return data;
  }

  public async getPosts(filter: PostFilter): Promise<Post[]> {
    const { data }: AxiosResponse<Post[]> = await firstValueFrom(
      this.httpService.get<Post[]>(
        'https://jsonplaceholder.typicode.com/posts',
        {
          params: { userId: filter.userId },
        },
      ),
    );

    return data;
  }

  public async updatePost(id: number, post: UpdatePost): Promise<Post> {
    const { data }: AxiosResponse<Post> = await firstValueFrom(
      this.httpService.put<Post>(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        post,
      ),
    );

    return data;
  }
}
