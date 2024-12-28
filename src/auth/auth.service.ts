import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserDocument } from '../users/user.schema';
import { UserService } from '../users/user.service';
import { AuthDto } from './dto/auth.dto';
import { AuthTokens } from './interfaces/auth-token.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    // Check if user exists
    const userExists: UserDocument = await this.userService.findByUsername(
      createUserDto.username,
    );

    if (userExists) throw new BadRequestException('User already exists');

    // Hash Password
    const hashedPassword: string = await hash(createUserDto.password, 10);
    const newUser: UserDocument = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const createdUserId: string = newUser._id.toString();
    const tokenPayload = { sub: createdUserId, username: newUser.username };

    // Generate tokens
    const tokens: AuthTokens = this.generateTokens(tokenPayload);

    await this.updateRefreshToken(createdUserId, tokens.refreshToken.token);

    return tokens;
  }

  async signIn(authDto: AuthDto): Promise<AuthTokens> {
    // Check if user exists
    const user: UserDocument = await this.userService.findByUsername(
      authDto.username,
    );

    if (!user) throw new BadRequestException('User does not exist');

    await this.verifyPassword(authDto.password, user.password);

    const userId: string = user._id.toString();
    const tokenPayload: JwtPayload = { sub: userId, username: user.username };

    // Generate tokens
    const tokens: AuthTokens = this.generateTokens(tokenPayload);

    await this.updateRefreshToken(userId, tokens.refreshToken.token);

    return tokens;
  }

  async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<AuthTokens> {
    const user: UserDocument = await this.userService.findById(userId);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    await this.verifyRefreshToken(refreshToken, user);

    const tokenPayload: JwtPayload = { sub: userId, username: user.username };

    // Generate tokens
    const tokens: AuthTokens = this.generateTokens(tokenPayload);

    await this.updateRefreshToken(userId, tokens.refreshToken.token);

    return tokens;
  }

  async logout(userId: string): Promise<UserDocument> {
    return this.userService.update(userId, { refreshToken: null });
  }

  async verifyUser(username: string, password: string): Promise<UserDocument> {
    try {
      const user: UserDocument =
        await this.userService.findByUsername(username);

      await this.verifyPassword(password, user.password);

      return user;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  private generateTokens(jwtPayload: JwtPayload): AuthTokens {
    const accessTokenExpirationMs: number = this.getConfigInt(
      'JWT_ACCESS_TOKEN_EXPIRATION_MS',
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
    const accessToken: string = this.generateToken(
      jwtPayload,
      accessTokenExpirationMs,
      'JWT_ACCESS_TOKEN_SECRET',
    );
    const refreshToken: string = this.generateToken(
      jwtPayload,
      refreshTokenExpirationMs,
      'JWT_REFRESH_TOKEN_SECRET',
    );

    return {
      accessToken: {
        expires: accessTokenExpiryDate,
        token: accessToken,
      },
      refreshToken: {
        expires: refreshTokenExpiryDate,
        token: refreshToken,
      },
    };
  }

  private async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userService.update(userId, {
      refreshToken: await hash(refreshToken, 10),
    });
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
    user: UserDocument,
  ): Promise<boolean> {
    if (!user.refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    const isTokenValid: boolean = await compare(
      refreshToken,
      user.refreshToken,
    );

    if (!isTokenValid) {
      throw new ForbiddenException('Access denied');
    }

    return isTokenValid;
  }

  private calculateExpiry(expiryMs: number): Date {
    const expirationDate: Date = new Date();

    expirationDate.setMilliseconds(expirationDate.getMilliseconds() + expiryMs);

    return expirationDate;
  }

  private generateToken(
    payload: JwtPayload,
    expiryMs: number,
    secretKey: string,
  ): string {
    return this.jwtService.sign(payload, {
      expiresIn: `${expiryMs}ms`,
      secret: this.configService.getOrThrow<string>(secretKey),
    });
  }

  private getConfigInt(key: string): number {
    return parseInt(this.configService.getOrThrow<string>(key));
  }
}
