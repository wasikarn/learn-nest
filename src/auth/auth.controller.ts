import { Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

import { User, UserDocument } from '../users/user.schema';
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

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Logout successful.',
  })
  @Get('logout')
  @HttpCode(HttpStatusCode.Ok)
  @UseGuards(JwtAuthGuard)
  async logout(@CurrentUser() user: User): Promise<UserDocument> {
    return this.authService.logout(user._id.toHexString());
  }
}
