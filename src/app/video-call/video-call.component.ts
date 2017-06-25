import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { AuthenticationService } from '../authentication.service';
declare var RTCMultiConnection: any;

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {
  connection: any = new RTCMultiConnection("https://localhost:9001/", null);
  @Input() idChat: any;
  public isAudio: boolean = false;
  constructor(public auth: AuthenticationService, public user: UsersService) {
    this.connection.socketURL = "https://77.203.205.220:9001/";

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
    let that = this;
    this.user.getParametre(this.auth.getUserID(), function (data) {

      that.connection.mediaConstraints = {
        audio: data.audio,
        video: that.isAudio == false ? data.video : false
      };

      that.connection.openOrJoin('room_' + that.idChat);
      that.connection.onstream = function (event) {
        event.mediaElement.style.width = "365px";
        console.log(event);
        document.getElementById('app-video-call').appendChild(event.mediaElement);
      };
    });
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
