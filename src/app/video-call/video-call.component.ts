import { Component, OnInit } from '@angular/core';

declare var RTCMultiConnection : any;

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {
  connection: any = new RTCMultiConnection();

  constructor() {
    this.connection.socketURL = "http://localhost:9001/";

    this.connection.session = {
      audio: true,
      video: false
    }

    this.connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: false

    }
  }

  start() {
    
    this.connection.openOrJoin('testvideotestloicsupinfo');
    this.connection.onstream = function (event) {
      document.getElementById('app-video-call').appendChild(event.mediaElement);
    };
  }

  join() {
    

  }
  ngOnInit() {
  }

}
