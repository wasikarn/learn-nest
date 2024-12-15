import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { NameRequestDto } from './name.request.dto';

@ApiSchema({ name: 'CreateUserRequest', description: 'Create user request' })
export class CreateUserRequestDto {
  @ApiProperty()
  @Type((): typeof NameRequestDto => NameRequestDto)
  public readonly name: NameRequestDto;
}
