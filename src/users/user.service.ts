import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

import { CreateUserRequest } from './dto/request/create-user.request';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(request: CreateUserRequest): Promise<UserDocument> {
    const createdUser = new this.userModel({
      email: request.email,
      password: await hash(request.password, 10),
    });

    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async getUser(query: FilterQuery<User>): Promise<UserDocument> {
    const user: undefined | UserDocument = (
      await this.userModel.findOne(query).exec()
    )?.toObject<UserDocument>();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(
    query: FilterQuery<User>,
    data: UpdateQuery<User>,
  ): Promise<UserDocument> {
    const user: undefined | UserDocument = (
      await this.userModel.findOneAndUpdate(query, data).exec()
    )?.toObject<UserDocument>();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
