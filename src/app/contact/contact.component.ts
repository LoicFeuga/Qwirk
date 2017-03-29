import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../chats.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: string[] = [];
  //0 = see
  //1 = create
  mode : number = 0;

  constructor(private chatsService: ChatsService, private auth: AuthenticationService) {
    let that = this;
    let idUser = this.auth.getUserID();
    this.chatsService.getContact(idUser, function (data) {
      console.log(data);
      that.contacts = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].id != idUser) {
          that.contacts.push(data[i]);
        }
      }
    });

  }

  ngOnInit() {
  }

}
