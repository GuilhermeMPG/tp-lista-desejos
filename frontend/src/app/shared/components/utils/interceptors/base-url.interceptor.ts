import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../services/app-config.service';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(private appConfig: AppConfigService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl = this.appConfig.getBaseUrl();
    const apiRequest = request.clone({ url: `${baseUrl}/${request.url}` });

    return next.handle(apiRequest);
  }
}
