import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

@ApiSchema({ description: 'Create user request', name: 'CreateUserRequest' })
export class CreateUserRequest {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
