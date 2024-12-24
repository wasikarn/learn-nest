import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserRequest } from './dto/request/create-user.request';
import { User } from './user.schema';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    description: 'The records have been successfully retrieved.',
    type: [User],
  })
  @Get()
  @HttpCode(HttpStatusCode.Ok)
  @UseGuards(JwtAuthGuard)
  public async getUsers(@CurrentUser() user: User): Promise<User[]> {
    console.log(user);

    return this.userService.findAll();
  }

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    example: {
      email: 'email@email.com',
      password: 'your-strong-password',
    },
    type: User,
  })
  @HttpCode(HttpStatusCode.Created)
  @Post()
  createUser(@Body() request: CreateUserRequest): Promise<User> {
    return this.userService.createUser(request);
  }
}
