import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import process from 'process';
import { NestiaSwaggerComposer } from '@nestia/sdk';
import { OpenApi, OpenApiV3, SwaggerV2 } from '@samchon/openapi';

type ApiDocument =
  | OpenApi.IDocument
  | OpenApiV3.IDocument
  | SwaggerV2.IDocument;

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const document: ApiDocument = await NestiaSwaggerComposer.document(app, {
    openapi: '3.1',
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Localhost',
      },
    ],
  });
  SwaggerModule.setup('swagger', app, document as OpenAPIObject, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(process.env['PORT'] ?? 3000);
}

bootstrap().catch(console.error);
