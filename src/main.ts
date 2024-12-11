import { NestiaSwaggerComposer } from '@nestia/sdk';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { OpenApi, OpenApiV3, SwaggerV2 } from '@samchon/openapi';
import process from 'process';

import { AppModule } from './app.module';
import { CatchEverythingFilter } from './common/filters/catch-everything.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

type OpenAPIObject =
  | OpenApi.IDocument
  | OpenApiV3.IDocument
  | SwaggerV2.IDocument;

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const document: OpenAPIObject = await NestiaSwaggerComposer.document(app, {
    openapi: '3.1',
    servers: [{ url: 'http://localhost:3000', description: 'Local server' }],
    info: {
      title: 'NestJS API',
      description: 'The NestJS API description',
      version: '1.0',
    },
  });
  SwaggerModule.setup('swagger', app, document as never);

  const httpAdapterHost: HttpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(
    new CatchEverythingFilter(httpAdapterHost),
    new HttpExceptionFilter(),
  );

  await app.listen(process.env['PORT'] ?? 3000);
}

bootstrap().catch(console.error);
