import { BadRequestException, Catch, InternalServerErrorException, NotFoundException, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class CustomRpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException): Observable<any> {
    const err:any = exception.getError();
    if (err instanceof BadRequestException) {
      return throwError(new BadRequestException(err.getResponse()));
    } else if (err instanceof NotFoundException) {
      return throwError(new NotFoundException(err.getResponse()));
    } else {
      return throwError(new InternalServerErrorException(err.getResponse()));
    }
  }
}
