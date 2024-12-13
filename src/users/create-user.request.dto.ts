import { Type } from 'class-transformer';

import { NameRequestDto } from './name.request.dto';

export class CreateUserRequestDto {
  @Type((): typeof NameRequestDto => NameRequestDto)
  public readonly name: NameRequestDto;
}
