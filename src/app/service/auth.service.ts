import { Injectable } from '@angular/core';
import { User } from './../user';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from './../../environments/environment'

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getLoggedInName = new Subject();
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  private username: string;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('curentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }


  public login(userInfo: User){
    this.getLoggedInName.next(userInfo.username);
    return localStorage.setItem('ACCESS_TOKEN', "access_token");
  }

  public isLoggedIn(){
    if(localStorage.getItem('currentUser') !== null){
      let expired = helper.isTokenExpired(JSON.parse(localStorage.getItem('currentUser'))["access"])
      return !expired;
    }
    return localStorage.getItem('currentUser') !== null;
  }

  public logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userName');
    return true;
  }

  public getUserName() {
    return localStorage.getItem('userName');
  }
  loginJWT(userInfo: User){
    localStorage.setItem('userName', userInfo.username);
    return this.http.post<any>(`${environment.apiUrl}/rest/api/token/`, userInfo)
          .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if(user && user.access){
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(null);
            }
            return user;
          }));
  }

  public get currentUserValue()  {
    return this.currentUserSubject.value;
  }

  refreshAccessToken() {
    return this.http.post<any>(`${environment.apiUrl}/rest/api/token/refresh/`,
            {'refresh': this.currentUserValue.refresh})
            .pipe(
              map(
                token => {
                  if(token.access){
                    localStorage.setItem('currentUser', JSON.stringify(token));
                  }
                  return token;
                }
              )
            );
  }
}
