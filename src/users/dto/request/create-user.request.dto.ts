import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { NameRequestDto } from './name.request.dto';

export class CreateUserRequestDto {
  @ApiProperty()
  @Type((): typeof NameRequestDto => NameRequestDto)
  public readonly name: NameRequestDto;
}
