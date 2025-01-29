import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { AppModule } from './app.module';
import { CatchEverythingFilter } from './common/filters/catch-everything.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { setupSwaggerDocumentation } from './common/swagger';

async function bootstrap(): Promise<void> {
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(AppModule, {
      bufferLogs: true,
    });

  const configService: ConfigService = app.get(ConfigService);

  const httpAdapterHost: HttpAdapterHost = app.get(HttpAdapterHost);

  /**
   * As a result, query strings like these:
   *
   * ?filter[where][name]=John&filter[where][age]=30
   * ?item[]=1&item[]=2
   */
  app.set('query parser', 'extended');

  app.use(compression());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(
    new CatchEverythingFilter(httpAdapterHost),
    new HttpExceptionFilter(),
  );
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  const port: number = configService.getOrThrow<number>('PORT') ?? 3000;

  setupSwaggerDocumentation(app);

  await app.listen(port);
}

bootstrap().catch(console.error);
