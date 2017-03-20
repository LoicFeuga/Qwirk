import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../chats.service';

@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.css']
})
export class AddChatComponent implements OnInit {

  libelle: string = "";
  detail: string = "";

  constructor(public chatsService: ChatsService) { }

  ngOnInit() {
  }
  
  create() {
    alert(this.libelle + this.detail);
    this.chatsService.createChat(this.libelle, this.detail, function (data) {
      console.log(data);
    });
  }

}
