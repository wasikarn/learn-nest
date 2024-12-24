import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { FilterQuery, Model } from 'mongoose';

import { CreateUserRequest } from './dto/request/create-user.request';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(request: CreateUserRequest): Promise<User> {
    const createdUser = new this.userModel({
      email: request.email,
      password: await hash(request.password, 10),
    });

    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUser(query: FilterQuery<User>): Promise<User> {
    const user: undefined | User = (
      await this.userModel.findOne(query)
    )?.toObject<User>();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
