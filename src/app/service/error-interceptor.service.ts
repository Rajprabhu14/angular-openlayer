import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, take, map, switchMap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private authS: AuthService) { }
  private refreshTokenInProgress = false;
  // Refresh Token Subject tracks the current token, or is null if no token is currently
  // available (e.g. refresh pending).
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any> (null);
  /*// intercepts and handles an httpRequest or httpResponse
  req: outgoing request object to handle, next: next interceptor in the chain or
  or the backend if no interceptors remain in the chain
  return Observable<HttpEvent<any>>: An observable of the event stream.
  */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      // We don't want to refresh token for some requests like login or refresh token itself
      // So we verify url and we throw an error if it's the case
      const error = err.error.message || err.statusText;
      if(request.url.includes("token") ||
         request.url.includes("refresh") 
        ){
            // We do another check to see if refresh token failed
            // In this case we want to logout user and to redirect it to login page

            if(request.url.includes("refresh")) {
              this.authS.logout();
            }
          return throwError(error);
        }
      if(err.status == 401){
        // auto logout if 401 response returned from api
        // this.authS.logout();
        // location.reload(true);
        // location is the part of the angular/common modue
        // it allows directly interact with browser URL
        if(this.refreshTokenInProgress){
          return this.refreshTokenSubject.pipe(
            take(1),
          map(result => result !== null),
          switchMap(() => next.handle(this.addAuthenticationToken(request))));
        }else{
          this.refreshTokenInProgress = true;
          // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
          this.refreshTokenSubject.next(null);
           // Call authS.refreshAccessToken(this is an Observable that will be returned)
           return this.authS.refreshAccessToken()
           .pipe(switchMap((token: any) =>{
              //When the call to refreshToken completes we reset the refreshTokenInProgress to false
              // for the next time the token needs to be refreshed
              this.refreshTokenInProgress = false; 
              this.refreshTokenSubject.next(token.access);
              return next.handle(this.addAuthenticationToken(request));
           }),
           catchError((err=> {
             this.refreshTokenInProgress = false;
             this.authS.logout();
             return throwError(err);
           })))
        }
      }
      
      return throwError(error);
    }))
  }

  addAuthenticationToken(request){
    // Get access token from Local Storage
    const accessToken = this.authS.currentUserValue;
    // If access token is null this means that user is not logged in
    // And we return the original request
    if (!accessToken) {
          return request;
      }
    // reference https://itnext.io/angular-tutorial-implement-refresh-token-with-httpinterceptor-bfa27b966f57
    // resend the failed request again
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken.access}`
      }
    })
  }
}
