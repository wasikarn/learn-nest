import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { Post } from './posts.response.dto';
import { Data, Effect } from 'effect';
import { catchError, firstValueFrom } from 'rxjs';

class RequestError extends Data.TaggedError('RequestError') {}
class NotOkError extends Data.TaggedError('NotOkError') {}
class NotJsonError extends Data.TaggedError('NotJsonError') {}

@Injectable()
export class PostsService {
  private readonly logger: Logger = new Logger(PostsService.name);
  constructor(private readonly httpService: HttpService) {}

  async fetchPosts(): Promise<Post[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
        .pipe(
          catchError((error: AxiosError): never => {
            this.logger.error(error.response?.data);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }

  effectGetPosts() {
    const getPosts = Effect.tryPromise({
      try: () => fetch('https://jsonplaceholder.typicode.com/posts'),
      catch: () => new RequestError(),
    });
    const effectGenerator = Effect.gen(function* () {
      const response = yield* getPosts;

      if (!response.ok) {
        return yield* Effect.fail(new NotOkError());
      }

      return yield* Effect.tryPromise({
        try: () => response.json(),
        catch: () => new NotJsonError(),
      });
    });

    return Effect.runPromise(effectGenerator);
  }
}
