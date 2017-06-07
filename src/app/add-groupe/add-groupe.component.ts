import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChatsService } from '../chats.service';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-add-groupe',
  templateUrl: './add-groupe.component.html',
  styleUrls: ['./add-groupe.component.css']
})
export class AddGroupeComponent implements OnInit {
  libelle: string = "";
  detail: string = "";
  groupes : any = [];
  mode: number = 0;
  @Output() created: EventEmitter<any> = new EventEmitter<any>();

  constructor(public chatsService: ChatsService, public auth : AuthenticationService) {


    this.getAllGroupe();

  }
  joinGroupe(id :number){
    this.chatsService.joinChannel(this.auth.getUserID(),id,function(data){
      console.log(data);
    });
  }

  getAllGroupe() {
    let that = this;
    this.chatsService.getAllGroupes(this.auth.getUserID(),function (data) {
      that.groupes = data;
    });
  }
  ngOnInit() {
  }
  toCreateGroupe() {
    this.mode = 0;
  }

  toJoinGroupe() {
    this.mode = 1;
  }
  create() {

    let that = this;

    this.chatsService.createGroupe(this.libelle, this.detail, function (data) {

      that.created.emit(data)
    });
  }
}
