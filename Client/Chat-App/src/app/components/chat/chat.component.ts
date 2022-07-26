import { Component, OnInit } from '@angular/core';
import { ChatsService } from 'src/app/services/chats.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(public ChatsService: ChatsService, private UsersService: UsersService) { }

  ngOnInit(): void {
    setInterval(async () => {
      this.ChatsService.CurrentChat = await this.ChatsService.RefreshCurrentChat()
    }, 1000);
  }

  async SendMessage(sMessageText: string){
    await this.ChatsService.SendMessage(sMessageText, this.UsersService.LoggedUserData!)
  }
}
