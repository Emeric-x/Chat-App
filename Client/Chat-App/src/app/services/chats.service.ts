import { Injectable } from '@angular/core';
import { Chat } from '../interfaces/chat';
import { User } from '../interfaces/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  CurrentChat: Chat | undefined

  constructor(private ApiService: ApiService) { }

  CreateNewChat(sChat: Chat): Promise<any>{
    return this.ApiService.NewChat(sChat).toPromise()
  }

  GetChatById(sId: string): Promise<any>{
    return this.ApiService.GetChatById(sId).toPromise()
  }

  RefreshCurrentChat(): Promise<any>{
    return this.ApiService.GetChatById(this.CurrentChat?._id!).toPromise()
  }

  SendMessage(sMessage: string, sAuthor: User): Promise<any>{
    return this.ApiService.SendMessage(sMessage, sAuthor, this.CurrentChat?._id!).toPromise()
  }
}
