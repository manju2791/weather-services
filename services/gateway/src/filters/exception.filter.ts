import { ArgumentsHost, BadRequestException, ExceptionFilter, HttpStatus, Logger, NotFoundException } from '@nestjs/common';
import { ErrorMessages, ResponseErrorCode } from '../constant/constant';

export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    Logger.error(`${req.method} ${req.url}`, JSON.stringify(exception.response));

    if (exception instanceof BadRequestException || exception.status == 400) {
      return this.handleBadRequestError(exception, res);
    } else if (exception instanceof NotFoundException || exception.status == 404) {
      return this.handleNotFoundError(exception, res);
    } else {
      this.handleUnexpectedError(exception, res);
    }
  }

  handleBadRequestError(error, res) {
    return res.status(HttpStatus.BAD_REQUEST).send({
      code: ResponseErrorCode.BAD_REQUEST,
      message: !!error.response ? error.response.message.toString() : error.message.toString(),
    });
  }
  handleNotFoundError(error, res) {
    return res.status(HttpStatus.NOT_FOUND).send({
      code: ResponseErrorCode.NOTFOUND,
      message: ErrorMessages.NotFound,
    });
  }

  handleUnexpectedError(exception, res) {
    return res.status(500).send({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.toString(),
    });
  }
}
