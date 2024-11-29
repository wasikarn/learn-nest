import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'ErrorResponse' })
export class ErrorResponse<D> {
  @ApiProperty()
  statusCode!: number;

  @ApiProperty()
  message!: string;

  @ApiProperty()
  timestamp!: string;

  @ApiProperty()
  path!: string;

  @ApiProperty()
  error?: string;

  @ApiProperty()
  details?: D;
}
