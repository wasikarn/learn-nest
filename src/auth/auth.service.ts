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
    const accessTokenExpirationMs: number = this.getConfigInt(
      'JWT_ACCESS_TOKEN_EXPIRATION_KEY',
    );
    const refreshTokenExpirationMs: number = this.getConfigInt(
      'JWT_REFRESH_TOKEN_EXPIRATION_MS',
    );

    const accessTokenExpiryDate: Date = this.calculateExpiry(
      accessTokenExpirationMs,
    );
    const refreshTokenExpiryDate: Date = this.calculateExpiry(
      refreshTokenExpirationMs,
    );

    const tokenPayload: TokenPayload = {
      email: user.email,
      sub: user._id.toHexString(),
    };

    const accessToken: string = this.generateToken(
      tokenPayload,
      accessTokenExpirationMs,
      'JWT_ACCESS_TOKEN_SECRET',
    );
    const refreshToken: string = this.generateToken(
      tokenPayload,
      refreshTokenExpirationMs,
      'JWT_REFRESH_TOKEN_SECRET',
    );

    await this.setUserRefreshToken(user, refreshToken);

    return {
      access_token: {
        expires: accessTokenExpiryDate,
        token: accessToken,
      },
      refresh_token: {
        expires: refreshTokenExpiryDate,
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
    const hashedToken: string = await hash(refreshToken, 10);

    await this.userService.updateUser(
      { _id: user._id },
      { $set: { refreshToken: hashedToken } },
    );
  }

  private async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isAuthenticated: boolean = await compare(password, hashedPassword);

    if (!isAuthenticated) {
      throw new UnauthorizedException('Credentials are invalid');
    }

    return isAuthenticated;
  }

  private async verifyRefreshToken(
    refreshToken: string,
    user: User,
  ): Promise<boolean> {
    if (!user.refreshToken) {
      throw new UnauthorizedException('User has no refresh token');
    }

    const isTokenValid: boolean = await compare(
      refreshToken,
      user.refreshToken,
    );

    if (!isTokenValid) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    return isTokenValid;
  }

  private calculateExpiry(expiryMs: number): Date {
    const expirationDate: Date = new Date();

    expirationDate.setMilliseconds(expirationDate.getMilliseconds() + expiryMs);

    return expirationDate;
  }

  private generateToken(
    payload: TokenPayload,
    expiryMs: number,
    secretKey: string,
  ): string {
    return this.jwtService.sign(payload, {
      expiresIn: `${expiryMs}ms`,
      secret: this.configService.getOrThrow<string>(secretKey),
    });
  }

  private getConfigInt(key: string): number {
    return parseInt(this.configService.getOrThrow<string>(key), 10);
  }
}
