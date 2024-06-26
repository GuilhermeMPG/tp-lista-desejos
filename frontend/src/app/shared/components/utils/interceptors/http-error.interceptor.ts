
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorMessageService } from '../services/error-message.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorMessageService: ErrorMessageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro.';

        if (error.error instanceof ErrorEvent) {
          // Erro do lado do cliente
          errorMessage = `Erro do lado do cliente: ${error.error.message}`;
        } else {
          // Erro do lado do servidor
          errorMessage = `Código do erro: ${error.status}, Mensagem: ${error.message}`;
        }

        this.errorMessageService.showError(errorMessage);

        return throwError(errorMessage);
      })
    );
  }
}
