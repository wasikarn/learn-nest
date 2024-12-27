import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserRequest } from './dto/request/create-user.request';
import { User, UserDocument } from './user.schema';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The records have been successfully retrieved.',
    type: [User],
  })
  @Get()
  @HttpCode(HttpStatusCode.Ok)
  @UseGuards(JwtAuthGuard)
  public async getUsers(): Promise<UserDocument[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @HttpCode(HttpStatusCode.Created)
  @Post()
  createUser(@Body() request: CreateUserRequest): Promise<UserDocument> {
    return this.userService.createUser(request);
  }
}
