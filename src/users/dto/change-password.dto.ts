import { PickType } from '@nestjs/mapped-types';
import { ApiSchema } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

@ApiSchema({
  description: 'Change password request',
  name: 'ChangePasswordDto',
})
export class ChangePasswordDto extends PickType(CreateUserDto, [
  'password',
] as const) {}
