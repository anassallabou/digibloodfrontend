import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';


@Injectable()
export class TokenInceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let authService = this.injector.get(AuthenticationService);
    let tokenirezReq = req.clone({
      setHeaders:{
         Authorization: `${authService.getToken()}`
      }
    });

    return next.handle(tokenirezReq)
  }
}
