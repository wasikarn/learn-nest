import { Test, TestingModule } from '@nestjs/testing';

import { PaginatedDto } from '../common/paginated.dto';
import { CreateUserRequest } from './dto/request/create-user.request';
import { UserController } from './user.controller';
import { User } from './user.schema';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userServiceMock: Partial<UserService>;

  beforeEach(async () => {
    userServiceMock = {
      createUser: jest
        .fn()
        .mockResolvedValue({ name: { firstName: 'Jane', lastName: 'Smith' } }),
      findAll: jest
        .fn()
        .mockResolvedValue([{ name: { firstName: 'John', lastName: 'Doe' } }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return a paginated list of users', async () => {
      const result: PaginatedDto<User> = await controller.getUsers();

      expect(result).toBeDefined();
      expect(result.data).toEqual([
        { name: { firstName: 'John', lastName: 'Doe' } },
      ]);
    });
  });

  describe('createUser', () => {
    it('should create a user and return it', async () => {
      const createUserRequestDto: CreateUserRequest = {
        name: { firstName: 'Jane', lastName: 'Smith' },
      };

      const result = await controller.createUser(createUserRequestDto);

      expect(userServiceMock.createUser).toHaveBeenCalledWith(
        createUserRequestDto,
      );
      expect(result).toEqual({
        name: { firstName: 'Jane', lastName: 'Smith' },
      });
    });
  });
});
