import { Injectable } from '@angular/core';
import { User } from './../user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getLoggedInName = new Subject(); 
  
  constructor() { }
  public login(userInfo: User){
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
