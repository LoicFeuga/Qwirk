import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../app.component';

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
  channels: string[] = [];
  groupes: string[] = [];
  chats: string[] = [];

  nom: string = "";
  prenom: string = "";

  isMinimize: boolean = false;

  appName: string = "Qwirk";


  constructor(app: AppComponent) {
    this.appName = app.appName;

    let user = JSON.parse(localStorage.getItem('user'));

    this.nom = user.nom;
    this.prenom = user.prenom;

    this.channels.push('Channel 1');
    this.channels.push('Channel 2');
    this.groupes.push('groupe 1');
    this.groupes.push('groupe 2');
    this.chats.push('chat 1');
    this.chats.push('chat 2');
    this.chats.push('chat 3');
    this.chats.push('chat 4');

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

  minimize() {
    if (!this.isMinimize) {

      document.getElementById('nav').style.left = "-200px";
      document.getElementById('top-bar').style.left = "0px";//calc(100% - 200px)
      document.getElementById('top-bar').style.width = "100%";
      document.getElementById('all').style.width = "calc(100% - 10px)";
      document.getElementById('all').style.marginLeft = "10px";

      this.isMinimize = true;
    } else {
      document.getElementById('all').style.width = "calc(100% - 220px)";
      document.getElementById('all').style.marginLeft = "210px";
      document.getElementById('nav').style.left = "0px";
      document.getElementById('top-bar').style.left = "200px";
      document.getElementById('top-bar').style.width = "calc(100% - 200px)";

      this.isMinimize = false;

    }
  }

  ngOnInit() {


  }

}
