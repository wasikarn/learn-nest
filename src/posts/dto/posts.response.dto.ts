import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'PostsResponseDto' })
export class PostsResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  userId!: number;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  body!: string;
}
