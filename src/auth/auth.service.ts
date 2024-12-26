import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

import { User, UserDocument } from '../users/user.schema';
import { UserService } from '../users/user.service';
import { LoginResponse } from './interfaces/login-response.interface';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<LoginResponse> {
    const accessTokenExpirationMs: number = parseInt(
      this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_EXPIRATION_MS'),
    );
    const refreshTokenExpirationMs: number = parseInt(
      this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_EXPIRATION_MS'),
    );

    const expiresAccessToken = new Date();

    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getMilliseconds() + accessTokenExpirationMs,
    );

    const expiresRefreshToken = new Date();

    expiresRefreshToken.setMilliseconds(
      expiresRefreshToken.getMilliseconds() + refreshTokenExpirationMs,
    );

    const tokenPayload: TokenPayload = {
      email: user.email,
      sub: user._id.toHexString(),
    };

    const accessToken: string = this.jwtService.sign(tokenPayload, {
      expiresIn: `${accessTokenExpirationMs}ms`,
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
    const refreshToken = this.jwtService.sign(tokenPayload, {
      expiresIn: `${refreshTokenExpirationMs}ms`,
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
    });

    await this.setUserRefreshToken(user, refreshToken);

    return {
      access_token: {
        expires: expiresAccessToken,
        token: accessToken,
      },
      refresh_token: {
        expires: expiresRefreshToken,
        token: refreshToken,
      },
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

  async verifyUserRefreshToken(
    refreshToken: string,
    userId: string,
  ): Promise<UserDocument> {
    try {
      const user: UserDocument = await this.userService.getUser({
        _id: userId,
      });

      await this.verifyRefreshToken(refreshToken, user);

      return user;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  private async setUserRefreshToken(
    user: User,
    refreshToken: string,
  ): Promise<void> {
    await this.userService.updateUser(
      { _id: user._id },
      { $set: { refreshToken: await hash(refreshToken, 10) } },
    );
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

  private async verifyRefreshToken(
    refreshToken: string,
    user: User,
  ): Promise<boolean> {
    if (!user.refreshToken) {
      throw new UnauthorizedException('User has no refresh token');
    }

    const authenticated: boolean = await compare(
      refreshToken,
      user.refreshToken,
    );

    if (!authenticated) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    return authenticated;
  }
}
