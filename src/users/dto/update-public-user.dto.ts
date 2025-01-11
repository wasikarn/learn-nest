import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiSchema } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

@ApiSchema({ description: 'Update public user', name: 'UpdatePublicUserDto' })
export class UpdatePublicUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const),
) {}
