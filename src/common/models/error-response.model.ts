import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'ErrorResponse' })
export class ErrorResponse<D> {
  @ApiProperty()
  details?: D;

  @ApiProperty()
  error?: string;

  @ApiProperty()
  message!: string;

  @ApiProperty()
  path!: string;

  @ApiProperty()
  statusCode!: number;

  @ApiProperty()
  timestamp!: string;
}
