import { Injectable } from '@angular/core';

import { User } from './../user';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
S
  constructor(private http: HttpClient) { }
  regsiter(user: User){
    return this.http.post(`http://15.206.39.160/rest/accounts/create`, user);
  }
}
