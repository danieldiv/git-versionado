import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

export class NotAuthenticadedError {}

@Injectable()
export class MoneyHttpInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

        if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalido()) {

        return from(this.auth.obterNovoAccessToken())
            .pipe(
                mergeMap(() => {
                  if (this.auth.isAccessTokenInvalido()) {
                    throw new NotAuthenticadedError();
                  }
                  req = req.clone({
                      setHeaders: {
                          Authorization: `Bearer ${localStorage.getItem('token')}`
                      }
                  });
                  return next.handle(req);
                })
            );
        }

        return next.handle(req);
    }
}
