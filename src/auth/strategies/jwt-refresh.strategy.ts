import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserDocument } from '../../users/user.schema';
import { AuthService } from '../auth.service';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
    });
  }

  async validate(req: Request, payload: TokenPayload): Promise<UserDocument> {
    const bearerToken: string | undefined = req
      .get('Authorization')
      ?.replace('Bearer ', '')
      .trim();

    if (!bearerToken) {
      throw new Error('No bearer token found in Authorization header');
    }

    return this.authService.verifyUserRefreshToken(
      bearerToken || '',
      payload.sub,
    );
  }
}
