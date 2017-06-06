import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public usersService: UsersService) {

    this.usersService.getInvitation(function(data){
      console.log(data);
    });
  }

  ngOnInit() {
  }

}
