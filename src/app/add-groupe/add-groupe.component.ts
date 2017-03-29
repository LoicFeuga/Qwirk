import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ChatsService } from '../chats.service';

@Component({
  selector: 'app-add-groupe',
  templateUrl: './add-groupe.component.html',
  styleUrls: ['./add-groupe.component.css']
})
export class AddGroupeComponent implements OnInit {
  libelle: string = "";
  detail: string = "";
  @Output() created: EventEmitter<any> = new EventEmitter<any>();

  constructor(public chatsService : ChatsService) {


    
  }

  ngOnInit() {
  }

  create() {
    
    let that = this;

    this.chatsService.createGroupe(this.libelle, this.detail, function (data) {

      that.created.emit(data)
    });
  }
}
