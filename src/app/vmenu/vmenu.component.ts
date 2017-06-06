import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthenticationService } from '../authentication.service';
import { ChatsService } from '../chats.service';
import { UsersService } from '../users.service';

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

  channelsFiltred: any[] = [];
  groupesFiltred: any[] = [];
  chatsFiltred: any[] = [];

  channels: any[] = [];
  groupes: any[] = [];
  chats: any[] = [];

  textFiltre: string = "";
  nom: string = "";
  prenom: string = "";

  isMinimize: boolean = true;

  //contiendra chaque différent fenetre possible en main
  allFrame: string[] = [];

  appName: string = "Qwirk";
  statut: string;


  constructor(app: AppComponent, private auth: AuthenticationService, private chatsServices: ChatsService, private usersServices: UsersService) {
    this.appName = app.appName;

    let user = this.auth.getUser();

    this.nom = user.nom;
    this.prenom = user.prenom;
    this.statut = "";
    this.MAJStatut();
    this.allFrame.push('app-timeline');
    this.allFrame.push('app-contact');
    this.allFrame.push('app-add-channel');
    this.allFrame.push('app-add-groupe');
    this.allFrame.push('app-add-chat');
    this.allFrame.push('app-setting');
    this.allFrame.push('app-notificafion');

    this.rebuildChats();
  }

  MAJStatut() {
    let that = this;
    this.usersServices.getUser(this.auth.getUserID(), function (data) {
      that.statut = data.statut;
    });
  }

  filtre() {
    this.channelsFiltred = [];
    this.groupesFiltred = [];
    this.chatsFiltred = [];
    if (this.textFiltre == "") {
      this.chatsFiltred = this.chats;
      this.groupesFiltred = this.groupes;
      this.channelsFiltred = this.channels;
    }
    else {
      for (let i = 0; i < this.chats.length; i++) {
        if (this.chats[i].libelle.toLowerCase().indexOf(this.textFiltre.toLowerCase()) > -1) {
          this.chatsFiltred.push(this.chats[i]);
        }
      }

      for (let i = 0; i < this.groupes.length; i++) {
        if (this.groupes[i].libelle.toLowerCase().indexOf(this.textFiltre.toLowerCase()) > -1) {
          this.groupesFiltred.push(this.groupes[i]);
        }
      }

      for (let i = 0; i < this.channels.length; i++) {
        if (this.channels[i].libelle.toLowerCase().indexOf(this.textFiltre.toLowerCase()) > -1) {
          this.channelsFiltred.push(this.channels[i]);
        }
      }
    }
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

    this.chatsServices.getAllChats(that.auth.getUserID(), function (chats) {
      that.chats = [];
      that.channels = [];
      that.groupes = [];
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
      that.filtre();
    });
  }

  rebuildChatsFromIdLess(id: any) {
    let that = this;

    let again = true;
    for (let i = 0; i < this.channels.length && again; i++) {
      if (this.channels[i].id == id) {
        this.channels.splice(i, 1);
        again = false;
      }
    }
    for (let i = 0; i < this.chats.length; i++) {
      if (this.chats[i].id == id) {
        this.chats.splice(i, 1);
        again = false;
      }
    }
    for (let i = 0; i < this.groupes.length; i++) {
      if (this.groupes[i].id == id) {
        this.groupes.splice(i, 1);
        again = false;
      }
    }

    this.filtre();
  }

  toTimeline() {
    this.timeline.emit(1);
    let that = this;
    setTimeout(function () {

      that.adapt();
    });
  }
  toContact() {
    this.contact.emit(true);
    let that = this;
    setTimeout(function () {

      that.adapt();
    });

  }
  toSettings() {
    this.settings.emit(true);
    let that = this;
    setTimeout(function () {

      that.adapt();
    }, 100);

  }

  toAddChannel() {
    this.addChannel.emit(true);
    let that = this;
    setTimeout(function () {

      that.adapt();
    }, 100);
  }
  toAddGroupe() {
    this.addGroupe.emit(true);
    let that = this;
    setTimeout(function () {

      that.adapt();
    }, 100);

  }
  toAddChat() {
    this.addChat.emit(true);
    let that = this;
    setTimeout(function () {

      that.adapt();
    }, 100);

  }

  toNotification() {
    this.notification.emit(true);
    let that = this;
    setTimeout(function () {

      that.adapt();
    });
  }
  deconnexion() {
    this.deco.emit(true);
  }

  minId(id: string) {
    let el = document.getElementById(id);
    if (el != null) {
      el.style.width = "calc(100% - 200px)";
      el.style.marginLeft = "200px";
    }

  }
  maxId(id: string) {

    let el = document.getElementById(id);
    if (el != null) {
      document.getElementById(id).style.width = "calc(100% - 0px)";
      document.getElementById(id).style.marginLeft = "0px";
    }
  }
  adapt() {
    if (this.isMinimize) {
      document.getElementById('nav').style.left = "-200px";
      document.getElementById('top-bar').style.left = "0px";
      document.getElementById('top-bar').style.width = "100%";
      if (document.getElementById('container_bot') != null) {

        document.getElementById('container_bot').style.width = "100%";
      }
      for (let i = 0; i < this.allFrame.length; i++) {
        this.maxId(this.allFrame[i]);
      }

    } else {

      document.getElementById('nav').style.left = "0px";
      document.getElementById('top-bar').style.left = "200px";
      document.getElementById('top-bar').style.width = "calc(100% - 200px)";
      if (document.getElementById('container_bot') != null) {

        document.getElementById('container_bot').style.width = "calc(100% - 200px)";
      }


      for (let i = 0; i < this.allFrame.length; i++) {
        this.minId(this.allFrame[i]);
      }


    }
  }
  minimize() {
    if (!this.isMinimize) {
      document.getElementById('nav').style.left = "-200px";
      document.getElementById('top-bar').style.left = "0px";
      document.getElementById('top-bar').style.width = "100%";

      if (document.getElementById('container_bot') != null) {
        document.getElementById('container_bot').style.width = "100%";
      }

      for (let i = 0; i < this.allFrame.length; i++) {
        this.maxId(this.allFrame[i]);
      }
      this.isMinimize = !this.isMinimize;
    } else {

      document.getElementById('nav').style.left = "0px";
      document.getElementById('top-bar').style.left = "200px";
      document.getElementById('top-bar').style.width = "calc(100% - 200px)";

      if (document.getElementById('container_bot') != null) {
        document.getElementById('container_bot').style.width = "calc(100% - 200px)";
      }

      for (let i = 0; i < this.allFrame.length; i++) {
        this.minId(this.allFrame[i]);
      }
      this.isMinimize = !this.isMinimize;

    }
  }

  ngOnInit() {


  }

}
