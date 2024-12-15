import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsString, Length } from 'class-validator';

@ApiSchema({ name: 'NameRequest', description: 'Name request' })
export class NameRequestDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @Length(2, 30, {
    message: 'First name must be between 2 and 30 characters long',
  })
  @Transform(({ value }: TransformFnParams): string => value.trim() as string)
  public readonly firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  public readonly lastName: string;
}
