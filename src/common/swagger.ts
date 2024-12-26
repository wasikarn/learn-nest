import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { PostModule } from '../post/post.module';
import { UsersModule } from '../users/users.module';

// API options
const options: DocumentBuilder = new DocumentBuilder().addBearerAuth();

const setupMainApiDocumentation: (app: INestApplication) => void = (
  app: INestApplication,
): void => {
  // Main API options
  const mainOptions: Omit<OpenAPIObject, 'paths'> = options
    .setTitle('Main API')
    .setDescription('The Main API description')
    .setVersion('1.0')
    .build();

  // Create the main API document
  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    mainOptions,
  );

  SwaggerModule.setup('api', app, document, {
    explorer: true,
    jsonDocumentUrl: '/api/swagger.json',
    swaggerOptions: {
      urls: [
        {
          name: '1. API',
          url: 'api/swagger.json',
        },
        {
          name: '2. Users API',
          url: 'api/users/swagger.json',
        },
        {
          name: '3. Posts API',
          url: 'api/posts/swagger.json',
        },
      ],
    },
  });
};

const setupUsersApiDocumentation: (app: INestApplication) => void = (
  app: INestApplication,
): void => {
  const usersApiOptions: Omit<OpenAPIObject, 'paths'> = options
    .setTitle('Users API')
    .setDescription('The Users API description')
    .setVersion('1.0')
    .build();

  const userDocumentFactory: () => OpenAPIObject = (): OpenAPIObject =>
    SwaggerModule.createDocument(app, usersApiOptions, {
      include: [UsersModule],
    });

  SwaggerModule.setup('api/users', app, userDocumentFactory, {
    jsonDocumentUrl: '/api/users/swagger.json',
  });
};

const setupPostsApiDocumentation: (app: INestApplication) => void = (
  app: INestApplication,
): void => {
  const postApiOptions: Omit<OpenAPIObject, 'paths'> = options
    .setTitle('Posts API')
    .setDescription('The Post API description')
    .setVersion('1.0')
    .build();

  const postDocumentFactory: () => OpenAPIObject = (): OpenAPIObject =>
    SwaggerModule.createDocument(app, postApiOptions, {
      include: [PostModule],
    });

  SwaggerModule.setup('api/posts', app, postDocumentFactory, {
    jsonDocumentUrl: '/api/posts/swagger.json',
  });
};

export const setupSwaggerDocumentation: (app: INestApplication) => void = (
  app: INestApplication,
): void => {
  setupMainApiDocumentation(app);
  setupUsersApiDocumentation(app);
  setupPostsApiDocumentation(app);
};
