import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthenticationService } from '../authentication.service';
import { ChatsService } from '../chats.service';

@Component({
  selector: 'app-vmenu',
  templateUrl: './vmenu.component.html',
  styleUrls: ['./vmenu.component.css']
})
export class VMenuComponent implements OnInit {
  @Output() contact: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() settings: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() timeline: EventEmitter<number> = new EventEmitter<number>();
  @Output() notification: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addChannel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addGroupe: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addChat: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() deco: EventEmitter<boolean> = new EventEmitter<boolean>();

  allChannels: any[] = [];
  allGroupes: any[] = [];
  allChats: any[] = [];

  channels: any[] = [];
  groupes: any[] = [];
  chats: any[] = [];

  nom: string = "";
  prenom: string = "";

  isMinimize: boolean = false;

  appName: string = "Qwirk";


  constructor(app: AppComponent, private auth: AuthenticationService, private chatsServices: ChatsService) {
    this.appName = app.appName;

    let user = this.auth.getUser();

    this.nom = user.nom;
    this.prenom = user.prenom;

    this.rebuildChats();
  }

  pushChannel(data: any) {
    this.channels.push(data);
  }

  pushGroupe(data: any) {
    this.groupes.push(data);
  }
  pushChat(data: any) {
    this.chats.push(data);
  }

  rebuildChats() {

    let that = this;
    this.chatsServices.getAllChats(this.auth.getUserID(), function (chats) {
      for (let i = 0; i < chats.length; i++) {
        //en fonction du type de chats
        switch (chats[i].type) {
          case 0:
            that.chats.push(chats[i]);
            break;

          case 1:
            that.groupes.push(chats[i]);
            break;

          case 2:
            that.channels.push(chats[i]);
            break;
        }
      }

      that.minimize();
    });
  }
  toTimeline() {
    this.timeline.emit(1);
  }
  toContact() {
    this.contact.emit(true);
  }
  toSettings() {
    this.settings.emit(true);

  }

  toAddChannel() {
    this.addChannel.emit(true);
  }
  toAddGroupe() {
    this.addGroupe.emit(true);

  }
  toAddChat() {
    this.addChat.emit(true);

  }

  toNotification() {
    this.notification.emit(true);
  }
  deconnexion() {
    this.deco.emit(true);
  }

  minId(id: string) {

    document.getElementById(id).style.width = "calc(100% - 220px)";
    document.getElementById(id).style.marginLeft = "210px";
  }
  maxId(id: string) {

    document.getElementById(id).style.width = "calc(100% - 20px)";
    document.getElementById(id).style.marginLeft = "10px";
  }
  minimize() {
    if (!this.isMinimize) {

      document.getElementById('nav').style.left = "-200px";
      document.getElementById('top-bar').style.left = "0px";//calc(100% - 200px)
      document.getElementById('top-bar').style.width = "100%";
      this.maxId('app-timeline');
      this.isMinimize = !this.isMinimize;
    } else {
      
      document.getElementById('nav').style.left = "0px";
      document.getElementById('top-bar').style.left = "200px";
      document.getElementById('top-bar').style.width = "calc(100% - 200px)";
      this.minId('app-timeline');

      this.isMinimize = !this.isMinimize;

    }
  }

  ngOnInit() {


  }

}
