import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ChatsService } from '../chats.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output() deco: EventEmitter<boolean> = new EventEmitter<boolean>();
  router: number = 0;

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
    this.router = 6;
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
