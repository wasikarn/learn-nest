import { PostsController } from './posts.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from '../../services/posts.service';
import { HttpModule } from '@nestjs/axios';
import { Post } from '../../domain/post';
import { HttpPostsRepository } from '../api/http-posts.repository';

describe('PostsController', (): void => {
  let postsController: PostsController;
  let postsService: PostsService;

  beforeEach(async (): Promise<void> => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [PostsController],
      providers: [
        PostsService,
        {
          provide: 'PostsRepository',
          useClass: HttpPostsRepository,
        },
      ],
    }).compile();

    postsService = moduleRef.get<PostsService>(PostsService);
    postsController = moduleRef.get<PostsController>(PostsController);
  });

  describe('fetchPosts', (): void => {
    it('should return an array of posts', async (): Promise<void> => {
      const result: Post[] = [
        {
          id: 1,
          userId: 1,
          title: 'post 1',
          body: 'body 1',
        },
      ];
      jest
        .spyOn(postsService, 'getAllPosts')
        .mockImplementation(async (): Promise<Post[]> => result);

      expect(await postsController.fetchPosts()).toBe(result);
    });
  });
});
