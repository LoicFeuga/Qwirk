import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-vmenu',
  templateUrl: './vmenu.component.html',
  styleUrls: ['./vmenu.component.css']
})
export class VMenuComponent implements OnInit {
  @Output() contact : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() settings : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() timeline : EventEmitter<number> = new EventEmitter<number>();

  @Output() deco : EventEmitter<boolean> = new EventEmitter<boolean>();
  channels: string[] = [];
  groupes: string[] = [];
  chats: string[] = [];

  isMinimize : boolean = false;

  appName: string = "Qwirk";


  constructor(app: AppComponent) {
    this.appName = app.appName;

    this.channels.push('Channel 1');
    this.channels.push('Channel 2');
    this.groupes.push('groupe 1');
    this.groupes.push('groupe 2');
    this.chats.push('chat 1');
    this.chats.push('chat 2');
    this.chats.push('chat 3');
    this.chats.push('chat 4');
    
  }

  toTimeline(){
    this.timeline.emit(1);
  }
  toContact(){
    this.contact.emit(true);
  }
  toSettings(){
    this.settings.emit(true);

  }
  deconnexion(){
    this.deco.emit(true);
  }

  minimize(){
    if(!this.isMinimize){

     document.getElementById('nav').style.left = "-200px";
     document.getElementById('top-bar').style.left = "0px";
     document.getElementById('timeline').style.width = "calc(100% - 10px)";
     document.getElementById('timeline').style.marginLeft = "10px";
     
     this.isMinimize = true;
    }else{
     document.getElementById('nav').style.left = "0px";
     document.getElementById('top-bar').style.left = "200px";
     document.getElementById('timeline').style.width = "calc(100% - 220px)";
     document.getElementById('timeline').style.marginLeft = "210px";
     
     this.isMinimize = false;

    }
  }

  ngOnInit() {


  }

}
