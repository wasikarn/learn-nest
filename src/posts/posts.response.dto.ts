import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'PostResponse' })
export class Post {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  userId!: number;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  body!: string;
}
