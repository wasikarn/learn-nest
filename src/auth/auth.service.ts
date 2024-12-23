import { Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from '../users/user.schema';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user: User = await this.userService.findOne(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException(`Invalid password`);
    }

    const { ...result } = user;

    return result;
  }
}
