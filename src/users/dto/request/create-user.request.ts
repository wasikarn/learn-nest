import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

@ApiSchema({ description: 'Create user request', name: 'CreateUserRequest' })
export class CreateUserRequest {
  @ApiProperty({
    example: 'email@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'pybtez-naskoB-8fizmi',
  })
  @IsStrongPassword()
  password: string;
}
