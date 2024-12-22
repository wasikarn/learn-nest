import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { AppModule } from './app.module';
import { CatchEverythingFilter } from './common/filters/catch-everything.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { setupSwaggerDocumentation } from './common/swagger';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService: ConfigService = app.get(ConfigService);

  const httpAdapterHost: HttpAdapterHost = app.get(HttpAdapterHost);

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
