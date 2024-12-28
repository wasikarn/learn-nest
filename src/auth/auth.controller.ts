import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserDocument } from '../users/user.schema';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AuthTokens } from './interfaces/auth-token.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ description: 'User credentials', type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  @HttpCode(HttpStatusCode.Created)
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<AuthTokens> {
    return this.authService.signUp(createUserDto);
  }

  @ApiBody({ description: 'User credentials', type: AuthDto })
  @ApiOkResponse({ description: 'User has been successfully logged in.' })
  @HttpCode(HttpStatusCode.Ok)
  @Post('sign-in')
  signIn(@Body() authDto: AuthDto): Promise<AuthTokens> {
    return this.authService.signIn(authDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User has been successfully refreshed token.',
  })
  @Get('refresh')
  @HttpCode(HttpStatusCode.Ok)
  @UseGuards(RefreshTokenGuard)
  refreshTokens(@CurrentUser() user: UserDocument): Promise<AuthTokens> {
    const userId: string = user._id.toString();
    const refreshToken: string = user.refreshToken as string;

    return this.authService.refreshTokens(userId, refreshToken);
  }

  @ApiBearerAuth()
  @ApiNoContentResponse({
    description: 'User has been successfully logged out.',
  })
  @Get('logout')
  @HttpCode(HttpStatusCode.NoContent)
  @UseGuards(AccessTokenGuard)
  async logout(@CurrentUser() user: UserDocument): Promise<void> {
    await this.authService.logout(user._id.toString());
  }
}
