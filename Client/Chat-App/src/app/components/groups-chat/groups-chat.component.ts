import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/interfaces/chat';
import { ChatsService } from 'src/app/services/chats.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-groups-chat',
  templateUrl: './groups-chat.component.html',
  styleUrls: ['./groups-chat.component.css']
})
export class GroupsChatComponent implements OnInit {
  NewChatBtn: boolean = false
  ChatMembers: any = []

  constructor(public UsersService: UsersService, private ChatsService: ChatsService, private Router: Router) { }

  ngOnInit(): void {
  }

  async NewChat(sChatName: string, sChatLogo: string){
    let chat: Chat = {
      name: sChatName,
      logo: sChatLogo,
      users: [] as any
    }

    this.ChatMembers.push(this.UsersService.LoggedUserData)

    this.ChatMembers.forEach((member: any) => {
      chat.users.push({
        user_id: member._id,
        firstname: member.firstname,
        lastname: member.lastname,
        login: member.login,
        avatar: member.avatar
      })
    });

    this.ChatsService.CurrentChat = await this.ChatsService.CreateNewChat(chat)
    this.Router.navigate(['/Chat'])
  }

  async GetUserByLogin(sUserLogin: string){
    let user = await this.UsersService.GetUserByLogin(sUserLogin)

    if(!this.MemberAlreadyIn(user.login)){
      this.ChatMembers.push(user)
    }
  }

  async GetChatById(sChat_id: string){
    this.ChatsService.CurrentChat = await this.ChatsService.GetChatById(sChat_id)
    this.Router.navigate(['/Chat'])
  }

  MemberAlreadyIn(sLogin: string): boolean{
    let result: boolean = false

    this.ChatMembers.forEach((user: any) => {
      if(user.login === sLogin){
        result = true
      }
    });
    return result
  }
}
