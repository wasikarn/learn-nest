import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@ApiSchema({ description: 'Auth request', name: 'AuthDto' })
export class AuthDto {
  @ApiProperty({ example: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;
}
