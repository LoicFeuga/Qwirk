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
  connection: any = new RTCMultiConnection();
  @Input() idChat: any;
  public isAudio : boolean = false;

  constructor(public usersService: UsersService, public auth: AuthenticationService) {
    this.connection.socketURL = "https://77.203.205.220:9001/";
    this.connection.enableLogs = false;
    let that = this;


    this.usersService.getParametre(this.auth.getUserID(), function (data) {

      that.connection.session = {
        audio: data.audio,
        video: that.isAudio == false ? data.video : false
      }


      that.connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true

      }

      that.connection.mediaConstraints = {
        audio: true,
        video: that.isAudio == false ? data.video : false
      };
    });

  }

  start() {
    let that = this;
    this.usersService.getParametre(this.auth.getUserID(), function (data) {

      that.connection.session = {
        audio: data.audio,
        video: that.isAudio == false ? data.video : false
      }


      that.connection.mediaConstraints = {
        audio: true,
        video: that.isAudio == false ? data.video : false
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
