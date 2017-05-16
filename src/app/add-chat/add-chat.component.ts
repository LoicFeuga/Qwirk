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
  @Output() created: EventEmitter<any> = new EventEmitter<any>();

  constructor(public chatsService: ChatsService) { }

  ngOnInit() {
  }
  
  
  
  create() {
    let that = this;
    this.chatsService.createChat(this.libelle, this.detail,1, function (data) {
      that.created.emit(data);
    });
  }

}
