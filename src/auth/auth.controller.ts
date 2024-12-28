import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserDocument } from '../users/user.schema';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { AuthDto } from './dto/auth.dto';
import { AuthTokens } from './interfaces/auth-token.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<AuthTokens> {
    return this.authService.signUp(createUserDto);
  }

  @Post('sign-in')
  signIn(@Body() authDto: AuthDto): Promise<AuthTokens> {
    return this.authService.signIn(authDto);
  }

  @Get('logout')
  async logout(@CurrentUser() user: UserDocument): Promise<void> {
    await this.authService.logout(user._id.toString());
  }
}
