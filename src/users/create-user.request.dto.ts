import { IsString } from 'class-validator';

export class Name {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class CreateUserRequestDto {
  name: Name;
}
