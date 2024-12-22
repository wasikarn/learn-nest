import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { NameRequestDto } from './name.request.dto';

@ApiSchema({ description: 'Create user request', name: 'CreateUserRequest' })
export class CreateUserRequestDto {
  @ApiProperty()
  @Type((): typeof NameRequestDto => NameRequestDto)
  public readonly name: NameRequestDto;
}
