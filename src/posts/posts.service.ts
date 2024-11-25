import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Post } from '@/posts/posts.interface';
import { Effect } from 'effect';
import { AxiosResponse } from 'axios';

@Injectable()
export class PostsService {
  constructor(private readonly httpService: HttpService) {}

  async fetchPosts(): Promise<Post[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Post[]>(
        'https://jsonplaceholder.typicode.com/posts',
      ),
    );

    return data;
  }

  async fetchPostsEffect(): Promise<Post[]> {
    const postsEffect = Effect.tryPromise({
      try: (): PromiseLike<Post[]> =>
        this.httpService.axiosRef
          .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
          .then((res: AxiosResponse<Post[]>): Post[] => res.data),
      catch: (err) => new Error(`fetching posts failed: ${err}`),
    });

    return Effect.runPromise(postsEffect);
  }

  *postTitles(posts: Post[]): Generator<string, void, unknown> {
    for (const post of posts) {
      yield post.title;
    }
  }
}
