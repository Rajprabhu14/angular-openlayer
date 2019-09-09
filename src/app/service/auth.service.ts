import { Injectable } from '@angular/core';
import { User } from './../user';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/share';
import * as moment from "moment";
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getLoggedInName = new Subject(); 
  
  constructor(private http: HttpClient) { }

  // jwt method with django access control
  public login(userInfo: User){
    return this.http.post<User>('/api/token/', {
      email: userInfo.email,
      password:  userInfo.password
    })
    .do(res => this.setSession).share();
  }

  private setSession(authResult) {
    const expiresAt = moment()
  }
  public login1(userInfo: User){
    this.getLoggedInName.next(userInfo.email);
    return localStorage.setItem('ACCESS_TOKEN', "access_token");
  }

  public isLoggedIn(){ 
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    this.getLoggedInName.next('Sign In');
    return localStorage.removeItem('ACCESS_TOKEN');
  }
}
