import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {
 // connection: RTCMultiConnection = new RTCMultiConnection();

  constructor() {
   // this.connection.socketURL = "https://rtcmulticonnection.herokuapp.com:443/";

    /*this.connection.session = {
      audio: true,
      video: false
    }

    this.connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: false

    }*/
  }

  start() {
    console.log('start');
    /*this.connection.openOrJoin('testvideotestloicsupinfo');
    this.connection.onstream = function (event) {
      document.getElementById('app-timeline').appendChild(event.mediaElement);
    };*/
  }

  join() {
    console.log('join');
  }
  ngOnInit() {
  }

}
