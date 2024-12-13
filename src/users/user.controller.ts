import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { HttpStatusCode } from 'axios';

import { CreateUserRequestDto } from './dto/request/create-user.request.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatusCode.Ok)
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(HttpStatusCode.Created)
  createUser(
    @Body() createUserRequestDto: CreateUserRequestDto,
  ): Promise<User> {
    return this.userService.createUser(createUserRequestDto);
  }
}
