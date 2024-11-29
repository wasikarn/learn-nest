import { PostsRepository } from '../ports/posts.repository';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { Post } from '../domain/entities/post.entity';

@Injectable()
export class HttpPostsRepository implements PostsRepository {
  private readonly logger: Logger = new Logger(HttpPostsRepository.name);

  constructor(private readonly httpService: HttpService) {}

  public async findAll(): Promise<Post[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
        .pipe(
          catchError((error: AxiosError): never => {
            this.logger.error(error.response?.status);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }
}
