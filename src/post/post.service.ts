import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Post } from './post.interface';
import { AxiosResponse } from 'axios';
import { PostFilter } from './post-filter.interface';

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
