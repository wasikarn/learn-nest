import { Controller } from '@nestjs/common';
import { TypedParam, TypedRoute } from '@nestia/core';
import { tags } from 'typia';

@Controller('parameters')
export class ParametersController {
  @TypedRoute.Get('uint32/:value')
  async uint32(
    @TypedParam('value') value: (number & tags.Type<'uint32'>) | null,
  ): Promise<(number & tags.Type<'uint32'>) | null> {
    return value;
  }

  @TypedRoute.Get('string/:value')
  async string(@TypedParam('value') value: string): Promise<string> {
    return value;
  }

  @TypedRoute.Get('uuid/:value')
  async uuid(
    @TypedParam('value') value: string & tags.Format<'uuid'>,
  ): Promise<string> {
    return value;
  }
}
