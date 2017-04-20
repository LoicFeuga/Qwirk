import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../chats.service';
import { AuthenticationService } from '../authentication.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: any[] = [];
  //0 = see
  //1 = create
  mode: number = 0;
  allUsers: any[] = [];
  userFilter: string = "";

  constructor(private chatsService: ChatsService, private auth: AuthenticationService, private usersServices: UsersService) {
    let that = this;
    let idUser = this.auth.getUserID();

    this.chatsService.getContact(idUser, function (data) {

      that.contacts = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].id != idUser) {
          that.contacts.push(data[i]);
        }
      }
    });

    this.usersServices.getAllUser(function (data) {
      that.allUsers = data;
    });

  }

  toAddContact() {
    this.mode = 1;
  }


  invite(id:number){
    let idUser = this.auth.getUserID();
    this.chatsService.inviteContact("libelle","description",idUser,id,function(data){
      console.log(data);
    });
  }
  ngOnInit() {
  }

}
