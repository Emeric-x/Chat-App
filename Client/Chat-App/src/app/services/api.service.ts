import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../interfaces/chat';
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

  GetUserByLogin(sLogin: string){
    return this.http.get(`http://localhost:3000/users/GetByLogin/${sLogin}`)
  }

  NewChat(sChat: Chat){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(sChat);
    return this.http.post(`http://localhost:3000/chats`, body, {'headers':headers})
  }

  GetChatById(sId: string){
    return this.http.get(`http://localhost:3000/chats/${sId}`)
  }

  SendMessage(sMessage: string, sAuthor: User, sChat_id: string){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify({
      chat_id: sChat_id,
      message: sMessage,
      author: sAuthor
    });
    return this.http.post(`http://localhost:3000/chats/messages`, body, {'headers':headers})
  }
}
