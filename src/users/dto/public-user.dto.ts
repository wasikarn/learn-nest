import { OmitType } from '@nestjs/mapped-types';
import { ApiSchema } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

@ApiSchema({ description: 'Public user', name: 'PublicUserDto' })
export class PublicUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {}
