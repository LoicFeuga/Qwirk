import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../chats.service';

@Component({
  selector: 'app-add-groupe',
  templateUrl: './add-groupe.component.html',
  styleUrls: ['./add-groupe.component.css']
})
export class AddGroupeComponent implements OnInit {
  libelle: string = "";
  detail: string = "";

  constructor(public chatsService : ChatsService) { }

  ngOnInit() {
  }

  create() {
    alert(this.libelle + this.detail);
    this.chatsService.createGroupe(this.libelle, this.detail, function (data) {
      console.log(data);
    });
  }
}
