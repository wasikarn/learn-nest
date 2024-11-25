import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Effect, pipe } from 'effect';
import { AxiosResponse } from 'axios';
import { Post } from './posts.interface';

@Injectable()
export class PostsService {
  constructor(private readonly httpService: HttpService) {}

  async fetchPosts(): Promise<Post[]> {
    const pipeEffect = pipe(
      Effect.tryPromise(
        (): Promise<AxiosResponse<Post[]>> =>
          this.httpService.axiosRef.get<Post[]>(
            'https://jsonplaceholder.typicode.com/posts',
          ),
      ),
      Effect.flatMap((response: AxiosResponse<Post[]>) =>
        Effect.try((): Post[] => response.data),
      ),
    );

    return Effect.runPromise(pipeEffect);
  }
}
