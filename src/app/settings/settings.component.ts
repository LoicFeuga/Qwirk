import { Component, EventEmitter, Output, OnInit, ViewContainerRef } from '@angular/core';
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
  @Output() userChanged: EventEmitter<any> = new EventEmitter<any>();

  editModeChat = 0;
  editModeGroupe = 0;
  editModeChannel = 0;
  statut = "";
  audio: boolean = false;
  video: boolean = false;
  user: any = {
    nom: "",
    prenom: "",
    email: "",
    bio: "",
    dateNaiss: ""
  };

  constructor(private auth: AuthenticationService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal, private chatsService: ChatsService, private usersService: UsersService) {
    let id = this.auth.getUserID();
    this.idUser = id;
    this.rebuildChats();

    overlay.defaultViewContainer = vcRef;
    this.getParametre();
    this.getUserDetail();
  }

  updateUser() {
    let that = this;
    this.usersService.updateUser(this.user, function (data) {
      that.userChanged.emit(data);
      that.modal.alert()
        .size('sm')
        .isBlocking(false)
        .showClose(false)
        .keyboard(27)
        .title('Informations')
        .body('Paramètre utilisateur modifié !')
        .open();
    });
  }

  toEditChat() {
    this.editModeChat = 1;
  }

  valideEditChat() {
    this.editModeChat = 0;
  }
  toEditGroupe() {
    this.editModeGroupe = 1;
  }

  valideEditGroupe() {
    this.editModeGroupe = 0;
  }
  toEditChannel() {
    this.editModeChannel = 1;
  }

  valideEditChannel() {
    this.editModeChannel = 0;
  }
  getUserDetail() {

    let that = this;


    this.usersService.getUser(this.auth.getUserID(), function (data) {
      that.user = data;
    });
  }

  getParametre() {

    let that = this;


    this.usersService.getParametre(this.auth.getUserID(), function (data) {
      that.audio = data.audio;
      that.video = data.video;
    });
  }

  updateStatut() {
    let that = this;


    this.usersService.updateStatutUser(this.auth.getUserID(), this.statut, function (data) {
      that.statutChanged.emit(data);

      that.modal.alert()
        .size('sm')
        .isBlocking(false)
        .showClose(false)
        .keyboard(27)
        .title('Informations')
        .body('Statut modifié !')
        .open();

    });
  }

  updateAudioVideo() {
    let that = this;
    this.usersService.getParametre(this.auth.getUserID(), function (data) {

      data.video = that.video;
      data.audio = that.audio;

      that.usersService.updateAudioVideo(data, function (res) {

        that.modal.alert()
          .size('sm')
          .isBlocking(false)
          .showClose(false)
          .keyboard(27)
          .title('Informations')
          .body('Paramètre modifié !')
          .open();
      });
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
      that.updateLibelle();
      if (that.channels.length <= 0) that.pushFakeItem(that.channels, "channel");
      if (that.chats.length <= 0) that.pushFakeItem(that.chats, "chat");
      if (that.groupes.length <= 0) that.pushFakeItem(that.groupes, "groupe");
    });
  }

  renameChat(libelle: string, uhc: any) {
    for (let i = 0; i < uhc.length; i++) {
      if (uhc[i].user.id == this.auth.getUserID()) {
        this.chatsService.renameChat(uhc[i].id, libelle, function (data) {
          console.log(data);
        });
      }
    }
  }
  updateLibelle() {
    let id = this.auth.getUserID();
    for (let i = 0; i < this.channels.length; i++) {

      for (let j = 0; j < this.channels[i].userHasChats.length; j++) {
        if (this.channels[i].userHasChats[j].user.id == id) {
          this.channels[i].libelle = this.channels[i].userHasChats[j].chat.libelle;
        }
      }
    }
    for (let i = 0; i < this.chats.length; i++) {

      for (let j = 0; j < this.chats[i].userHasChats.length; j++) {
        if (this.chats[i].userHasChats[j].user.id == id) {
          this.chats[i].libelle = this.chats[i].userHasChats[j].chat.libelle;
        }
      }
    }
    for (let i = 0; i < this.groupes.length; i++) {

      for (let j = 0; j < this.groupes[i].userHasChats.length; j++) {
        if (this.groupes[i].userHasChats[j].user.id == id) {
          this.groupes[i].libelle = this.groupes[i].userHasChats[j].chat.libelle;
        }
      }

    }

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
