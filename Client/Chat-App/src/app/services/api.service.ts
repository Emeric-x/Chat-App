import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  SignUpUser(sUser: User){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(sUser);
    return this.http.post(`http://localhost:3000/users/SignUp`, body, {'headers':headers})
  }

  SignInUser(sLogin: string, sPwd: string){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify({
      login: sLogin,
      password: sPwd,
    });
    return this.http.post(`http://localhost:3000/users/SignIn`, body, {'headers':headers})
  }
}
