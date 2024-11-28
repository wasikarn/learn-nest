import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Post } from './posts.response.dto';

@Injectable()
export class PostsService {
  constructor(private readonly httpService: HttpService) {}

  async fetchPosts(): Promise<Post[]> {
    return this.httpService.axiosRef
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response: AxiosResponse<Post[]>): Post[] => response.data);
  }
}
