import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { VideoCallComponent } from '../video-call/video-call.component';
import { QBot } from '../classes/bot';
import { AuthenticationService } from '../authentication.service';
import { ItemMessage } from '../classes/itemMessage';
import { ChatsService } from '../chats.service';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { NgClass, NgStyle} from '@angular/common';


const URL : string = "http://84.246.226.230:8080/SupChat/api/rest/";
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  messages: Object[] = [];
  text: string;
  idChat: number = 0;
  bot: QBot;
  file:any;
  itemMessage: ItemMessage;

  @Output() added: EventEmitter<any> = new EventEmitter<any>();


  //0 = message;
  //1 = audio;
  //2 = video
  modeTimeline = 0;
  @ViewChild(VideoCallComponent) video;

  constructor(public auth: AuthenticationService, public chatsService: ChatsService) {

    this.setChat(this.idChat);
  }

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
  
  scrollBot() {
  }


  getFile(e){
    console.log(this.file);
    console.log( e.srcElement.files);
  }

  /**
   * Permet de modifier le chat 
   * @param id id chat
   */
  setChat(id: number) {
    this.idChat = id;
    this.messages = [];
    let that = this;
    this.chatsService.getChatMessages(id, function (data) {
      that.messages = data;
      setTimeout(function () {
        let objDiv = document.querySelector("#app-timeline");
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 1);
      that.bot = new QBot(that.messages);
    });
  }

  isChatSelected() {
    return this.modeTimeline == 0;
  }
  isCallSelected() {
    return this.modeTimeline == 1;
  }
  isDocumentSelected() {
    return this.modeTimeline == 3;
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

  joinVideo() {
    this.video.join();
  }

  addExt(author: string, text: string, idUser: number) {
    this.messages.push(new ItemMessage(author, text, idUser).get());
    this.bot.execute();
    setTimeout(function () {
      let objDiv = document.querySelector("#app-timeline");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 1);
  }

  add() {
    this.messages.push(new ItemMessage("loic", this.text, this.auth.getUserID()).get());
    this.added.emit(this.formatTextForSocket(this.text, this.idChat, this.auth.getUserID(), this.auth.getUser().prenom));
    this.bot.execute();
    this.text = "";
    setTimeout(function () {
      let objDiv = document.querySelector("#app-timeline");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 1);
  }
  ngOnInit() {

  }

  formatTextForSocket(message: string, id: number, idUser: number, author: string) {
    return {
      id: id,
      content: message,
      type: 1,
      idUser: idUser,
      author: author
    }
  }

}
