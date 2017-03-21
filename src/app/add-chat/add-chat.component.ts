import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ChatsService } from '../chats.service';

@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.css']
})
export class AddChatComponent implements OnInit {

  libelle: string = "";
  detail: string = "";
  @Output() created: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public chatsService: ChatsService) { }

  ngOnInit() {
  }
  
  
  
  create() {
    this.chatsService.createChat(this.libelle, this.detail, function (data) {
      console.log(data);
      
    });
  }

}
