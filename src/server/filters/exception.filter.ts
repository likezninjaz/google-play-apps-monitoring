import { Response } from 'express';
import {
  ArgumentsHost,
  ExceptionFilter as BaseExceptionFilter,
  Catch,
  HttpException,
} from '@nestjs/common';

@Catch()
export class ExceptionFilter implements BaseExceptionFilter {
  catch(err: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (err instanceof HttpException) {
      const status = err.getStatus();
      const error = <string | { message: string }>err.getResponse();

      return res.status(status).json({
        statusCode: status,
        message: typeof error === 'string' ? error : error.message,
      });
    }

    res.status(500).json({
      statusCode: 500,
    });
  }
}
