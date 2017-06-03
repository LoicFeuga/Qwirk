import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ChatsService } from '../chats.service';
import { AuthenticationService } from '../authentication.service';
import { UsersService } from '../users.service';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

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

  constructor(private chatsService: ChatsService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal, private auth: AuthenticationService, private usersServices: UsersService) {
    let that = this;
    let idUser = this.auth.getUserID();
    overlay.defaultViewContainer = vcRef;

    this.chatsService.getContact(idUser, function (data) {

      that.contacts = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].id != idUser) {
          that.contacts.push(data[i]);
        }
      }
    });

    this.usersServices.getAllUser(idUser, function (data) {
      that.allUsers = data;
    });

  }

  deleteContact(id: number) {

    this.usersServices.deleteContact(id, function (data) {
      console.log(data);
    });

  }

  toAddContact() {
    this.mode = 1;
  }

  toSeeContact() {
    this.mode = 0;
  }

  invite(id: number) {
    let idUser = this.auth.getUserID();
    let that = this;
    this.chatsService.inviteContact("libelle", "description", idUser, id, function (data) {
      if (!data) return;
      else {
        that.modal.alert()
          .size('sm')
          .isBlocking(false)
          .showClose(false)
          .keyboard(27)
          .title('Informations')
          .body('Utilisateurs ajouté !')
          .open();

      }
    });
  }
  ngOnInit() {
  }

}
