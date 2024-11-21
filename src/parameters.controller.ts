import { Controller } from '@nestjs/common';
import { TypedParam, TypedRoute } from '@nestia/core';
import type { tags } from 'typia';

@Controller('parameters')
export class ParametersController {
  @TypedRoute.Get('uint32/:value')
  uint32(
    @TypedParam('value') value: (number & tags.Type<'uint32'>) | null,
  ): (number & tags.Type<'uint32'>) | null {
    return value;
  }

  @TypedRoute.Get('string/:value')
  string(@TypedParam('value') value: string): string {
    return value;
  }

  @TypedRoute.Get('uuid/:value')
  uuid(@TypedParam('value') value: string & tags.Format<'uuid'>): string {
    return value;
  }
}
