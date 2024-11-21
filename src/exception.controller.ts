import { Controller, HttpStatus } from '@nestjs/common';
import { TypedException, TypedParam, TypedRoute } from '@nestia/core';
import { TypeGuardError } from 'typia';

@Controller('exception')
export class ExceptionController {
  @TypedRoute.Post(':section/typed')
  @TypedException<TypeGuardError.IProps>({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid request',
  })
  async typed(@TypedParam('section') section: string): Promise<string> {
    return section;
  }
}
