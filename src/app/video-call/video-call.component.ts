import { Component, OnInit, Input } from '@angular/core';

declare var RTCMultiConnection: any;

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {
  connection: any = new RTCMultiConnection();
  @Input() idChat: any;
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

    this.connection.openOrJoin('room_' + this.idChat);
    this.connection.onstream = function (event) {
      event.mediaElement.style.width = "365px";
      document.getElementById('app-video-call').appendChild(event.mediaElement);
    };
  }

  close() {
    this.connection.attachStreams.forEach(function (localStream) {
      localStream.stop();
    });
    this.connection.close();
  }

  join() {


  }
  ngOnInit() {
  }

}
