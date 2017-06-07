import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { VideoCallComponent } from '../video-call/video-call.component';
import { QBot } from '../classes/bot';
import {AuthenticationService } from '../authentication.service';
import { ItemMessage } from '../classes/itemMessage';
import { ChatsService } from '../chats.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  
  messages: Object[] = [];
  text: string;
  idChat : number = 0;
  bot:QBot;
  itemMessage : ItemMessage;
  
  @Output() added: EventEmitter<any> = new EventEmitter<any>();
  
  
  //0 = message;
  //1 = audio;
  //2 = video
  modeTimeline = 0;
  @ViewChild(VideoCallComponent) video;

  constructor(public auth : AuthenticationService, public chatsService : ChatsService) {
    this.bot = new QBot(this.messages);

    //this.messages.push({ author: "loic", content: "loremkojaoj oijoiaj ioj" });
    setTimeout(function () {
      let objDiv = document.querySelector("#app-timeline");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 100);
  }


  scrollBot() {
  }



  /**
   * Permet de modifier le chat 
   * @param id id chat
   */
  setChat(id: number){
    this.idChat = id;
    this.messages = [];
    let that = this;
    this.chatsService.getChatMessages(id,function(data){
      that.messages = data;
    });
    this.bot = new QBot(this.messages);
  }

  isChatSelected() {
    return this.modeTimeline == 0;
  }
  isCallSelected() {
    return this.modeTimeline == 1;
  }

  setMode(mode: number) {
    this.modeTimeline = mode;
  }
  isVideoSelected() {
    return this.modeTimeline == 2;
  }

  startVideo() {
    this.video.start();
  }

  joinVideo(){
    this.video.join();
  }

  addExt(author:string,text:string,idUser:number){
    this.messages.push(new ItemMessage(author,text,idUser).get());
    this.bot.execute();
      setTimeout(function () {
      let objDiv = document.querySelector("#app-timeline");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 1);
  }

  add() {
    this.messages.push(new ItemMessage("loic",this.text, this.auth.getUserID()).get());
    this.added.emit(this.formatTextForSocket(this.text,this.idChat,this.auth.getUserID(),this.auth.getUser().prenom));
    this.bot.execute();
    this.text = "";
    setTimeout(function () {
      let objDiv = document.querySelector("#app-timeline");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 1);
  }
  ngOnInit() {

  }

  formatTextForSocket(message:string,id:number,idUser:number,author:string){
    return {
      id:id,
      content:message,
      type:1,
      idUser:idUser,
      author:author
    }
  }

}
