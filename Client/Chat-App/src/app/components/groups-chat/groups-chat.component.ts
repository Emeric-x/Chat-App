import { HttpClient } from '@angular/common/http';
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
  ErrorMsg: string | undefined
  SuccessMsg: string | undefined
  fileToUpload: File | null | undefined;

  constructor(public UsersService: UsersService, private ChatsService: ChatsService, private Router: Router, private http: HttpClient) { }

  async ngOnInit() {
    this.UsersService.LoggedUserData = await this.UsersService.GetUserById(this.UsersService.LoggedUserData?._id!)
  }

  async NewChat(sChatName: string, sChatLogo: string){
    if(sChatName && sChatLogo && this.ChatMembers.length > 1){
      let chat: Chat = {
        name: sChatName,
        logo: sChatLogo,
        users: [] as any
      }

      this.ChatMembers.push(this.UsersService.LoggedUserData)
      if(this.ChatMembers.length > 1){
        this.ChatMembers.forEach((member: any) => {
          chat.users.push({
            user_id: member._id,
            firstname: member.firstname,
            lastname: member.lastname,
            login: member.login,
            avatar: member.avatar
          })
        });

        let resultChat = await this.ChatsService.ChatAlreadyExists(chat, this.UsersService.LoggedUserData?.chats!)
        
        if(!resultChat){
          this.ChatsService.CurrentChat = await this.ChatsService.CreateNewChat(chat)
        } else {
          this.ChatsService.CurrentChat = resultChat
        }

        this.Router.navigate(['/Chat'])
      } else {
        this.ErrorMsg = "You need to add at least one member to create a chat."
      }
    } else {
      this.ErrorMsg = "You must fill all the fields."
    }
  }

  async AddUserByLogin(sUserLogin: string){
    if(sUserLogin !== ""){
      let user = await this.UsersService.GetUserByLogin(sUserLogin)

      if(user){
        if(!this.MemberAlreadyIn(user.login)){
          this.ChatMembers.push(user)
          this.SuccessMsg = `User ${user.login} has been added !`
        } else {
          this.SuccessMsg = ""
          this.ErrorMsg = "This user has already been added."
        }
      } else {
        this.SuccessMsg = ""
        this.ErrorMsg = "This user doesn't exist."
      }
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
