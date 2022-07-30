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

  GetMessagesByChatId(sChat_id: string): Promise<any>{
    return this.ApiService.GetMessagesByChatId(sChat_id).toPromise()
  }

  SendMessage(sMessage: string, sAuthor: User): Promise<any>{
    return this.ApiService.SendMessage(sMessage, sAuthor, this.CurrentChat?._id!).toPromise()
  }

  ChatAlreadyExists(sChat: Chat, sUser_chats: any): Promise<any>{
    return this.ApiService.ChatAlreadyCreated(sChat, sUser_chats).toPromise()
  }
}
