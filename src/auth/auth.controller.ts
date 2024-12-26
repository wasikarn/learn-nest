import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { Request } from 'express';

import { User } from '../users/user.schema';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginResponse } from './interfaces/login-response.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Login successful.',
  })
  @HttpCode(HttpStatusCode.Ok)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: User): Promise<LoginResponse> {
    return this.authService.login(user);
  }

  @ApiOkResponse({
    description: 'Refresh token successful.',
  })
  @HttpCode(HttpStatusCode.Ok)
  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(@CurrentUser() user: User): Promise<LoginResponse> {
    return this.authService.login(user);
  }

  @ApiNoContentResponse({
    description: 'Logout successful.',
  })
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request): Promise<void> {
    return req.logout((err): void => {
      if (err) {
        throw err;
      }
    });
  }
}
