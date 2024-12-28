import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

import { CreateUserRequest } from './dto/request/create-user.request';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @HttpCode(HttpStatusCode.Created)
  @Post()
  create(@Body() createUserDto: CreateUserRequest): Promise<UserDocument> {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Users have been successfully retrieved.',
    type: [User],
  })
  @Get()
  @HttpCode(HttpStatusCode.Ok)
  findAll(): Promise<UserDocument[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User has been successfully retrieved.',
    type: User,
  })
  @Get(':id')
  @HttpCode(HttpStatusCode.Ok)
  findById(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.findById(id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User has been successfully updated.',
    type: User,
  })
  @Get('username/:username')
  @HttpCode(HttpStatusCode.Ok)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiNoContentResponse({
    description: 'User has been successfully deleted.',
  })
  @Delete(':id')
  @HttpCode(HttpStatusCode.NoContent)
  remove(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.remove(id);
  }
}
