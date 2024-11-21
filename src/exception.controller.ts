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
  typed(@TypedParam('section') section: string): string {
    return section;
  }
}
