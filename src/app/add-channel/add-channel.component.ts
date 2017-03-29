import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChatsService } from '../chats.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.css']
})
export class AddChannelComponent implements OnInit {

  channels: string[] = [];
  libelle: string = "";
  detail: string = "";
  //0 = see all
  //1 = create
  mode: number = 0;
  @Output() created: EventEmitter<any> = new EventEmitter<any>();
  constructor(public chatsService: ChatsService, private auth: AuthenticationService) {
    let that = this;
    let idUser = auth.getUserID();
    that.chatsService.getAllChats(idUser, function (dataChannel) {

      that.chatsService.getAllChannel(function (data) {
        that.channels = [];
        for (let i = 0; i < data.length; i++) {
          let add = 1;
          for (let j = 0; j < dataChannel.length; j++) {
            if(data[i].id == dataChannel[j].id){
              add = 0;
            }
          }
          if(add == 1){
            that.channels.push(data[i]);
          }
        }
        //that.channels = data;
        console.log(that.channels);
      });
    });
  }

  ngOnInit() {
  }
  toAddChannel() {
    this.mode = 1;
  }

  joinChannel(chat: number) {
    let idUser = this.auth.getUserID();

    this.chatsService.joinChannel(idUser, chat, function (data) {
      console.log(data);
    });
  }

  toJoinChannel() {
    this.mode = 0;
  }
  create() {
    let that = this;
    this.chatsService.createChannel(this.libelle, this.detail, function (data) {
      that.created.emit(data)
    });
  }
}
