import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private authS: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let currentUser = this.authS.currentUserValue;
    if(currentUser && currentUser.access){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.access}`
        }
      });
    }
    return next.handle(request);
  }
}
