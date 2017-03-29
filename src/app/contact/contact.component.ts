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

  constructor(private chatsService : ChatsService, private auth : AuthenticationService) {
    this.contacts.push('loic');
    this.contacts.push('aaa');
    this.contacts.push('zzz');
    this.contacts.push('aazeazaez');
    let idUser= this.auth.getUserID();
    this.chatsService.getContact(idUser);
    
  }

  ngOnInit() {
  }

}
