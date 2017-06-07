import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ChatsService } from '../chats.service';
import { AuthenticationService } from '../authentication.service';
import { HttpClientService } from '../http-client.service';
import { WebSocketService } from '../web-socket.service';
import { VMenuComponent } from '../vmenu/vmenu.component';
import { TimelineComponent } from '../timeline/timeline.component';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { $WebSocket, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Output() deco: EventEmitter<boolean> = new EventEmitter<boolean>();
  router: number = 0;
  @ViewChild(VMenuComponent) vmenu;
  @ViewChild(TimelineComponent) timeline: TimelineComponent;
  private urlSocket = this.httpService.urlSocket + this.auth.getUserID();
  private ws;
  private socket;
  private connectedToSocket: boolean = false;
  //0 = timelines 
  // 1 = contact
  // 2 = settings
  // 3 = notification
  // 4 = add channel
  // 5 = add groupe
  // 6 = add chat
  constructor(private auth: AuthenticationService, public chatsServices: ChatsService, public webSocket: WebSocketService, public httpService: HttpClientService) {
    this.connectToSocket();
    let that = this;

  }

  connectToSocket() {
    if (!this.connectedToSocket) {

      this.ws = new $WebSocket("ws://" + this.urlSocket);

      this.ws.onMessage(
        (msg: MessageEvent) => {
          console.log("onMessage ", msg.data);
        },
        { autoApply: false }
      );

      this.connectedToSocket = true;
    }
  }

  /**
   * Send
   * @param message json {id_chat : 1, content :""}
   */
  sendToSocket(message: any) {
    this.ws.send(message).publish().connect();

  }

  ngOnInit() {

  }
  chatDeleted(recup: any) {
    this.vmenu.rebuildChatsFromIdLess(recup);
  }
  statutChanged(recup: any) {
    this.vmenu.changeStatut(recup);
  }
  channelCreate(chat: any) {
    this.vmenu.pushChannel(chat);
  }
  groupeCreate(chat: any) {
    this.vmenu.pushGroupe(chat);
  }
  chatCreate(chat: any) {
    this.vmenu.pushChat(chat);
  }

  toContact(recup: boolean) {
    this.router = 1;
  }
  userChanged(recup: any) {
    this.vmenu.setNomPrenom(recup);
  }
  toTimeline(recup: number) {
    if (recup > 0) {

      this.router = 0;
      
      this.timeline.idChat = recup;
    }
  }
  toSettings(recup: boolean) {
    this.router = 2;
  }
  toNotification(recup: boolean) {
    this.router = 3;
  }

  toAddChat(recup: boolean) {
    this.router = 1;
  }

  toAddChannel(recup: boolean) {
    this.router = 4;
  }

  toAddGroupe(recup: boolean) {
    this.router = 5;
  }

  deconnexion(recup: boolean) {
    this.deco.emit(recup);
  }
}
