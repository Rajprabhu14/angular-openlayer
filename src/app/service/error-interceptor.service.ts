import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private authS: AuthService) { }
  
  /*// intercepts and handles an httpRequest or httpResponse
  req: outgoing request object to handle, next: next interceptor in the chain or
  or the backend if no interceptors remain in the chain
  return Observable<HttpEvent<any>>: An observable of the event stream.
  */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if(err.status == 401){
        // auto logout if 401 response returned from api
        this.authS.logout();
        location.reload(true);
        // location is the part of the angular/common modue
        // it allows directly interact with browser URL
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
