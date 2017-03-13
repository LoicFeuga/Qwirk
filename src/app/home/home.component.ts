import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
  constructor(private authService : AuthenticationService) {
    
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
  toNotification(recup : boolean){
    this.router = 3;
  }

  deconnexion(recup: boolean) {
    this.deco.emit(recup);
  }
}
