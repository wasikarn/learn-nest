import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { User } from '../users/user.schema';
import { UserService } from '../users/user.service';
import { LoginResponse } from './login-response.interface';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<LoginResponse> {
    const expiresAccessToken = new Date();

    const jwtExpirationMs: string = this.configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_EXPIRATION_MS',
    );

    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() + parseInt(jwtExpirationMs),
    );

    const tokenPayload: TokenPayload = {
      email: user.email,
      sub: user._id.toHexString(),
    };

    const accessToken: string = this.jwtService.sign(tokenPayload, {
      expiresIn: `${jwtExpirationMs}ms`,
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
    });

    return {
      access_token: accessToken,
      expires_in: parseInt(jwtExpirationMs),
    };
  }

  async verifyUser(email: string, password: string): Promise<User> {
    try {
      const user: User = await this.userService.getUser({ email });

      await this.verifyPassword(password, user.password);

      return user;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  private async verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    const authenticated: boolean = await compare(password, hash);

    if (!authenticated) {
      throw new UnauthorizedException('Credentials are invalid');
    }

    return authenticated;
  }
}
