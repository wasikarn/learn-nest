import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import process from 'process';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { CatchEverythingFilter } from './common/filters/catch-everything.filter';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  const httpAdapterHost: HttpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(
    new CatchEverythingFilter(httpAdapterHost),
    new HttpExceptionFilter(),
  );

  await app.listen(process.env['PORT'] ?? 3000);
}

bootstrap().catch(console.error);
