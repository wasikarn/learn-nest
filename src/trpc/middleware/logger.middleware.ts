import { Injectable, Logger } from '@nestjs/common';
import {
  MiddlewareOptions,
  MiddlewareResponse,
  TRPCMiddleware,
} from 'nestjs-trpc';

import { IAppContext } from '../context/context.interface';

@Injectable()
export class LoggerMiddleware implements TRPCMiddleware {
  private readonly logger: Logger = new Logger(LoggerMiddleware.name);

  async use(opts: MiddlewareOptions<IAppContext>): Promise<MiddlewareResponse> {
    const start: number = Date.now();
    const { next, path, type } = opts;
    const { req, res } = opts.ctx;
    const result = await next();
    const meta = {
      path,
      type,
      durationMS: Date.now() - start,
      method: req.method,
      statusCode: res.statusCode,
      ip: req.ip,
      headers: req.headers,
    };

    if (result.ok) {
      this.logger.log('Success', meta);
    } else {
      this.logger.error('Error', meta);
    }

    return result;
  }
}
