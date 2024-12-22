import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { PostModule } from '../post/post.module';
import { UsersModule } from '../users/users.module';

const setupUsersApiDocumentation: (app: INestApplication) => void = (
  app: INestApplication,
): void => {
  const usersApiOptions: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('The Users API description')
    .setVersion('1.0')
    .build();

  const userDocumentFactory: () => OpenAPIObject = (): OpenAPIObject =>
    SwaggerModule.createDocument(app, usersApiOptions, {
      include: [UsersModule],
    });

  SwaggerModule.setup('swagger/users', app, userDocumentFactory);
};

const setupPostsApiDocumentation: (app: INestApplication) => void = (
  app: INestApplication,
): void => {
  const postApiOptions: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Posts API')
    .setDescription('The Post API description')
    .setVersion('1.0')
    .build();

  const postDocumentFactory: () => OpenAPIObject = (): OpenAPIObject =>
    SwaggerModule.createDocument(app, postApiOptions, {
      include: [PostModule],
    });

  SwaggerModule.setup('swagger/posts', app, postDocumentFactory);
};

export const setupSwaggerDocumentation: (app: INestApplication) => void = (
  app: INestApplication,
): void => {
  setupUsersApiDocumentation(app);
  setupPostsApiDocumentation(app);
};
