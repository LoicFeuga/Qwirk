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

  constructor(public usersService: UsersService, public auth: AuthenticationService) {
    this.connection.socketURL = "https://192.168.0.17:9001/";
    this.connection.enableLogs = false;
    let that = this;


    this.usersService.getParametre(this.auth.getUserID(), function (data) {

      that.connection.session = {
        audio: data.audio,
        video: data.video
      }


      that.connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true

      }

      that.connection.mediaConstraints = {
        audio: true,
        video: data.video
      };
    });

  }

  start() {
    let that = this;
    this.usersService.getParametre(this.auth.getUserID(), function (data) {

      that.connection.session = {
        audio: data.audio,
        video: data.video
      }


      that.connection.mediaConstraints = {
        audio: true,
        video: data.video
      };

      that.connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: false

      }


      that.connection.openOrJoin('room_' + that.idChat);
      that.connection.onstream = function (event) {
        event.mediaElement.style.width = "365px";

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
