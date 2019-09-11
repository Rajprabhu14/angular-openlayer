import { Injectable } from '@angular/core';
import { User } from './../user';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from "moment";
import { map, tap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getLoggedInName = new Subject(); 
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('curentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  // jwt method with django access control
  public login(userInfo: User){
    return this.http.post<User>('/api/token/', userInfo)
    .pipe(tap(res => this.setSession));
  }

  private setSession(authResult) {
    const expiresAt = moment()
  }
  public login1(userInfo: User){
    this.getLoggedInName.next(userInfo.username);
    return localStorage.setItem('ACCESS_TOKEN', "access_token");
  }

  public isLoggedIn(){ 
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    this.getLoggedInName.next('Sign In');
    return localStorage.removeItem('ACCESS_TOKEN');
  }

  loginJWT(userInfo: User){
    return this.http.post<any>(`http://localhost:8000/api/token/`, userInfo)
          .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if(user && user.access){
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
            }
            return user;
          }))
  }

  public get currentUserValue()  {
    return this.currentUserSubject.value;
  }

  refreshAccessToken() {
    return this.http.post<any>('http://localhost:8000/aapi/token/refresh/', 
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
