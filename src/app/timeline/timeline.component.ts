import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { VideoCallComponent } from '../video-call/video-call.component';
import { QBot } from '../classes/bot';
import { AuthenticationService } from '../authentication.service';
import { ItemMessage } from '../classes/itemMessage';
import { ChatsService } from '../chats.service';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { NgClass, NgStyle } from '@angular/common';


const URL: string = "http://84.246.226.230:8888/files/";

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
  file: any;
  itemMessage: ItemMessage;

  @Output() added: EventEmitter<any> = new EventEmitter<any>();
  @Output() botAction: EventEmitter<any> = new EventEmitter<any>();


  //0 = message;
  //1 = audio;
  //2 = video
  modeTimeline = 0;
  @ViewChild(VideoCallComponent) video;

  constructor(public auth: AuthenticationService, public chatsService: ChatsService) {

    this.setChat(this.idChat);
  }

  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  scrollBot() {
  }


  uploadFiles() {

    for (let i = 0; i < this.uploader.queue.length; i++) {

      let messageForDoc = `
        <form method="get" action="`+ URL + this.uploader.queue[i].file.name + `">
        <i class="material-icons">attach_file</i><button type="submit">Nouveau Fichier : `+this.uploader.queue[i].file.name+`</button>
        </form>
      `;
      let parser = new DOMParser();
      let htmlDoc = parser.parseFromString(messageForDoc, "text/html");
      this.messages.push(new ItemMessage(this.auth.getUser().prenom, messageForDoc, this.auth.getUserID(),2).get());
      this.added.emit(this.formatTextForSocket(messageForDoc, this.idChat, this.auth.getUserID(), this.auth.getUser().prenom, 2));
      this.bot.execute();
      this.text = "";
    }

    setTimeout(function () {
      let objDiv = document.querySelector("#app-timeline");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 1);


    this.uploader.uploadAll();
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
      that.bot = new QBot(that.messages,that.chatsService,id,that.botAction,that.auth.getUserID());
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
    this.messages.push(new ItemMessage(author, text, idUser,1).get());
    this.bot.execute();
    setTimeout(function () {
      let objDiv = document.querySelector("#app-timeline");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 1);
  }

  add() {
    this.messages.push(new ItemMessage(this.auth.getUser().prenom, this.text, this.auth.getUserID(),1).get());
    this.added.emit(this.formatTextForSocket(this.text, this.idChat, this.auth.getUserID(), this.auth.getUser().prenom, 1));
    this.bot.execute();
    this.text = "";
    setTimeout(function () {
      let objDiv = document.querySelector("#app-timeline");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 1);
  }
  ngOnInit() {

  }

  formatTextForSocket(message: string, id: number, idUser: number, author: string, type: number) {
    return {
      id: id,
      content: message,
      type: type,
      idUser: idUser,
      author: author
    }
  }

}
