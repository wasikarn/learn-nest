import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken: string | undefined = req
      .get('Authorization')
      ?.replace('Bearer', '')
      .trim();

    if (!refreshToken) {
      throw new NotFoundException(
        'No refresh token found in Authorization header',
      );
    }

    return { ...payload, refreshToken };
  }
}
