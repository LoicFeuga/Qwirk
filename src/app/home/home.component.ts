import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ChatsService } from '../chats.service';
import { AuthenticationService } from '../authentication.service';
import { VMenuComponent } from '../vmenu/vmenu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output() deco: EventEmitter<boolean> = new EventEmitter<boolean>();
  router: number = 2;
  @ViewChild(VMenuComponent) vmenu;
  //0 = timelines 
  // 1 = contact
  // 2 = settings
  // 3 = notification
  // 4 = add channel
  // 5 = add groupe
  // 6 = add chat
  constructor(private auth: AuthenticationService, public chatsServices: ChatsService) {

  }

  ngOnInit() {

  }
  chatDeleted(recup : any){
    this.vmenu.rebuildChatsFromIdLess(recup);
  }
  channelCreate(chat: any) {
    this.vmenu.pushChannel(chat);
  }
  groupeCreate(chat: any) {
    this.vmenu.pushGroupe(chat);
  }
  chatCreate(chat : any){
    this.vmenu.pushChat(chat);
  }

  toContact(recup: boolean) {
    this.router = 1;
  }
  toTimeline(recup: number) {
    this.router = 0;
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
