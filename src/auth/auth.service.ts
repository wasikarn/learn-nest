import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user: null | User = await this.userModel
      .findOne({
        username,
      })
      .exec();

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    if (user.password !== password) {
      throw new UnprocessableEntityException(`Invalid password`);
    }

    return user;
  }
}
