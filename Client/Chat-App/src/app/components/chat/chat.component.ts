import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { ChatsService } from 'src/app/services/chats.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChildren('messages') messages: QueryList<any> | undefined;
  @ViewChild('content') content: ElementRef | undefined;
  Messages: any = []
  
  constructor(public ChatsService: ChatsService, private UsersService: UsersService) { }

  ngOnInit(): void {
    setInterval(async () => {
      this.Messages = await this.ChatsService.GetMessagesByChatId(this.ChatsService.CurrentChat?._id!)
    }, 1000);
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.messages!.changes.subscribe(this.scrollToBottom);
  }
  
  scrollToBottom = () => {
    try {
      this.content!.nativeElement.scrollTop = this.content!.nativeElement.scrollHeight;
    } catch (err) {}
  }

  async SendMessage(sMessageText: string){
    await this.ChatsService.SendMessage(sMessageText, this.UsersService.LoggedUserData!)
  }
}
