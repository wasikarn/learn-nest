import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PostsRepository } from '../domain/ports/posts.repository';
import { Post } from '../domain/post';

describe('PostsService', (): void => {
  let postsService: PostsService;
  let postsRepository: PostsRepository;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: 'PostsRepository',
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    postsService = module.get<PostsService>(PostsService);
    postsRepository = module.get<PostsRepository>('PostsRepository');
  });

  it('should return an array of posts', async (): Promise<void> => {
    const posts: Post[] = [
      new Post(1, 1, 'Title 1', 'Body 1'),
      new Post(2, 2, 'Title 2', 'Body 2'),
    ];

    jest.spyOn(postsRepository, 'findAll').mockResolvedValue(posts);

    expect(await postsService.getAllPosts()).toEqual(posts);
  });
});
