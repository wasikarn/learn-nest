import { Injectable, Logger } from '@nestjs/common';
import {
  MiddlewareOptions,
  MiddlewareResponse,
  TRPCMiddleware,
} from 'nestjs-trpc';

@Injectable()
export class LoggerMiddleware implements TRPCMiddleware {
  private readonly logger: Logger = new Logger(LoggerMiddleware.name);

  async use(opts: MiddlewareOptions): Promise<MiddlewareResponse> {
    const start: number = Date.now();
    const { next, path, type } = opts;
    const result = await next();
    const meta = {
      path,
      type,
      durationMS: Date.now() - start,
    };

    if (result.ok) {
      this.logger.log('Success', meta);
    } else {
      this.logger.error('Error', meta);
    }

    return result;
  }
}
