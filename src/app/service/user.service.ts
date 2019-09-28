import { Injectable } from '@angular/core';
import { User } from './../user';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UserService {
S
  constructor(private http: HttpClient) { }
  regsiter(user: User){
    return this.http.post(`${environment.apiUrl}/rest/accounts/create`, user);
  }
}
