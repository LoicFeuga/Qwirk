import { Component, OnInit, ViewChild } from '@angular/core';
import { VideoCallComponent } from '../video-call/video-call.component';
import { QBot } from '../classes/bot';
import {AuthenticationService } from '../authentication.service';
import { ItemMessage } from '../classes/itemMessage';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  
  messages: Object[] = [];
  text: string;
  bot:QBot;
  itemMessage : ItemMessage;
  
  //0 = message;
  //1 = audio;
  //2 = video
  modeTimeline = 0;
  @ViewChild(VideoCallComponent) video;

  constructor(public auth : AuthenticationService) {
    this.bot = new QBot(this.messages);

    //this.messages.push({ author: "loic", content: "loremkojaoj oijoiaj ioj" });
    setTimeout(function () {
      let objDiv = document.querySelector("#app-timeline");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 100);
  }

  scrollBot() {
  }



  isChatSelected() {
    return this.modeTimeline == 0;
  }
  isCallSelected() {
    return this.modeTimeline == 1;
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

  joinVideo(){
    this.video.join();
  }

  add() {
    this.messages.push(new ItemMessage("loic",this.text, this.auth.getUserID()).get());
    this.bot.execute();
    setTimeout(function () {
      let objDiv = document.querySelector("#app-timeline");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 1);
    this.text = "";
  }
  ngOnInit() {

  }

}
