import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { User } from '../users/user.schema';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginResponse } from './login-response.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: User): Promise<LoginResponse> {
    return this.authService.login(user);
  }

  @Post('logout')
  @UseGuards(LocalAuthGuard)
  async logout(@Req() req: Request): Promise<void> {
    return req.logout((err): void => {
      if (err) {
        throw err;
      }
    });
  }
}
