import { Component, OnInit, Input } from '@angular/core';
import { UsersService} from '../users.service';
declare var RTCMultiConnection: any;

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {
  connection: any = new RTCMultiConnection("https://localhost:9001/",null);
  @Input() idChat: any;
  constructor() {
    this.connection.socketURL = "https://192.168.0.17:9001/";

    this.connection.session = {
      audio: true,
      video: true
    }

    this.connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true

    }
  }

  start() {

    this.connection.openOrJoin('room_' + this.idChat);
    this.connection.onstream = function (event) {
      event.mediaElement.style.width = "365px";
      console.log(event);
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
