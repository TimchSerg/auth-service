import {
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core';
import { WrongFormatException } from 'src/modules/auth/domain/exceptions'

@Catch(WrongFormatException)
export class DomainExceptionsFilter extends BaseExceptionFilter {

  catch(exception: Error, host: ArgumentsHost): void {
    super.catch(this.convert(exception), host)
  }

  private convert(exception: Error): HttpException {
    if (exception instanceof WrongFormatException) {
      return new BadRequestException(exception.message)
    }
    throw new Error(`Unexpected exception type ${exception.name}`)
  }
}
