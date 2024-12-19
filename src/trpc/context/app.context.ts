import { Injectable } from '@nestjs/common';
import { ContextOptions, TRPCContext } from 'nestjs-trpc';

@Injectable()
export class AppContext implements TRPCContext {
  async create(opt: ContextOptions): Promise<Record<string, unknown>> {
    return {
      req: opt.req,
      res: opt.res,
    };
  }
}
