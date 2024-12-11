import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

import {
  Comment,
  CreatePost,
  PostFilter,
  Posts,
  UpdatePost,
} from './post.interface';

@Injectable()
export class PostService {
  constructor(private readonly httpService: HttpService) {}

  public async createPost(post: CreatePost): Promise<Posts> {
    const { data }: AxiosResponse<Posts> = await firstValueFrom(
      this.httpService.post<Posts>(
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

  public async getPost(id: number): Promise<Posts> {
    const { data }: AxiosResponse<Posts> = await firstValueFrom(
      this.httpService.get<Posts>(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      ),
    );

    return data;
  }

  public async getPostComments(postId: number): Promise<Comment[]> {
    const { data }: AxiosResponse<Comment[]> = await firstValueFrom(
      this.httpService.get<Comment[]>(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
      ),
    );

    return data;
  }

  public async getPosts(filter: PostFilter): Promise<Posts[]> {
    const { data }: AxiosResponse<Posts[]> = await firstValueFrom(
      this.httpService.get<Posts[]>(
        'https://jsonplaceholder.typicode.com/posts',
        {
          params: { userId: filter.userId },
        },
      ),
    );

    return data;
  }

  public async updatePost(id: number, post: UpdatePost): Promise<Posts> {
    const { data }: AxiosResponse<Posts> = await firstValueFrom(
      this.httpService.put<Posts>(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        post,
      ),
    );

    return data;
  }
}
