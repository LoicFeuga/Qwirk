import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ChatsService } from '../chats.service';
import { UsersService } from '../users.service';

import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  chats: any[] = [];
  groupes: any[] = [];
  channels: any[] = [];
  idUser: number = 0;
  @Output() deleted: EventEmitter<any> = new EventEmitter<any>();
  @Output() statutChanged: EventEmitter<any> = new EventEmitter<any>();

  statut = "";
  audio: boolean = false;
  video: boolean = false;

  constructor(private auth: AuthenticationService, public modal: Modal, private chatsService: ChatsService, private usersService: UsersService) {
    let id = this.auth.getUserID();
    this.idUser = id;
    this.rebuildChats();
  }

  updateStatut() {
    let that = this;
    this.usersService.updateStatutUser(this.auth.getUserID(), this.statut, function (data) {
      that.statutChanged.emit(data);
 

    });
  }

  updateAudioVideo() {
    this.usersService.updateAudioVideo(this.auth.getUserID(), { audio: this.audio, video: this.video }, function (data) {
      console.log(data);
    });
  }
  pushFakeItem(array, str: string) {
    array.push({ libelle: "Aucun " + str + " trouvé" });
  }

  /**
   * Permet de build après une requete
   */
  rebuildChats() {
    let that = this;
    let id = this.idUser;
    this.chatsService.getAllChats(id, function (data) {

      that.chats = [];
      that.groupes = [];
      that.channels = [];
      for (let i = 0; i < data.length; i++) {
        switch (data[i].type) {
          case 0:
            that.chats.push(data[i]);
            break;

          case 1:
            that.groupes.push(data[i]);
            break;

          case 2:
            that.channels.push(data[i]);
            break;
        }
      }
      if (that.channels.length <= 0) that.pushFakeItem(that.channels, "channel");
      if (that.chats.length <= 0) that.pushFakeItem(that.chats, "chat");
      if (that.groupes.length <= 0) that.pushFakeItem(that.groupes, "groupe");
    });
  }
  /**
   * Supprimer l'id en paramètre des chats
   */
  rebuildChatsFromIdLess(id: any) {
    let again = true;
    for (let i = 0; i < this.channels.length && again; i++) {
      if (this.channels[i].id == id) {
        this.channels.splice(i, 1);
        again = false;
      }
    }
    for (let i = 0; i < this.chats.length; i++) {
      if (this.chats[i].id == id) {
        this.chats.splice(i, 1);
        again = false;
      }
    }
    for (let i = 0; i < this.groupes.length; i++) {
      if (this.groupes[i].id == id) {
        this.groupes.splice(i, 1);
        again = false;
      }
    }


  }

  deleteChat(id: any) {


    this.chatsService.deleteChat(id);
    this.modal.alert()
      .size('sm')
      .isBlocking(false)
      .showClose(false)
      .keyboard(27)
      .title('Informations')
      .body('Chat supprimé !')
      .open();

    this.rebuildChatsFromIdLess(id);
    this.deleted.emit(id);
  }

  leaveChat(id: any) {
    let idUser = this.auth.getUserID();
    this.chatsService.leaveChat(id, idUser);
    this.modal.alert()
      .size('sm')
      .isBlocking(false)
      .showClose(false)
      .keyboard(27)
      .title('Informations')
      .body('Vous avez quitter ce chat !')
      .open();

    this.rebuildChatsFromIdLess(id);
    this.deleted.emit(id);
  }

  ngOnInit() {
  }

}
