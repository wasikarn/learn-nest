import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

import { PostFilter } from './post-filter.interface';
import { Post } from './post.interface';

@Injectable()
export class PostService {
  constructor(private readonly httpService: HttpService) {}

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
}
