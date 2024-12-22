import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

import { CreateUserRequestDto } from './dto/request/create-user.request.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatusCode.Ok)
  @ApiOkResponse({
    description: 'The records have been successfully retrieved.',
    type: [User],
  })
  public async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(HttpStatusCode.Created)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User,
    example: {
      name: {
        firstName: 'John',
        lastName: 'Doe',
      },
      fullName: 'John Doe',
    },
  })
  createUser(
    @Body() createUserRequestDto: CreateUserRequestDto,
  ): Promise<User> {
    return this.userService.createUser(createUserRequestDto);
  }
}
