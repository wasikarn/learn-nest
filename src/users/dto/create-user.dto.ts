import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

@ApiSchema({ description: 'Create user request', name: 'CreateUserDto' })
export class CreateUserDto {
  @ApiProperty({ example: 'username' })
  @IsString({ message: 'Username must be a string' })
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
}
