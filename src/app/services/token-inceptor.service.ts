import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';


@Injectable()
export class TokenInceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let authService = this.injector.get(AuthenticationService);
    let tokenirezReq = req.clone({
      setHeaders:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${authService.getToken()}`,
      }
    });
    const req1 = req.clone({
      headers: req.headers.set('Authorization', `${authService.getToken()}`),
    });


    return next.handle(req1)
  }
}
