import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  username: string;

  @ApiProperty({ example: 'email@example.com' })
  @IsString({ message: 'Email must be a string' })
  email: string;

  @ApiProperty({ example: 'your-password-here' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    { message: 'Password must be strong' },
  )
  password: string;

  refreshToken?: null | string;
}
