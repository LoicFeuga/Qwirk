import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications: any[];

  constructor(public usersService: UsersService) {

    this.getInvitation();
  }

  getInvitation() {
    let that = this;
    this.usersService.getInvitation(function (data) {
      that.notifications = data;
    });
  }
  acceptInvit(id:number){
    let that = this;
    this.usersService.acceptInvitation(id,function(data){
      that.getInvitation();
    });
  }
  refuseInvit(id:number){
    
    let that = this;
    this.usersService.refuseInvitation(id,function(data){
      that.getInvitation();
    });
  }
  ngOnInit() {
  }

}
