import { Transform, TransformFnParams } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class NameRequestDto {
  @IsString()
  @Length(2, 30, {
    message: 'First name must be between 2 and 30 characters long',
  })
  @Transform(({ value }: TransformFnParams): string => value.trim() as string)
  public readonly firstName: string;

  @IsString()
  public readonly lastName: string;
}
