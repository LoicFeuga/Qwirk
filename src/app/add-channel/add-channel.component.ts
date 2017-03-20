import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../chats.service';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.css']
})
export class AddChannelComponent implements OnInit {
  
  libelle : string ="";
  detail : string ="";

  constructor( public chatsService: ChatsService) { }

  ngOnInit() {
  }

  create(){
    this.chatsService.createChannel(this.libelle,this.detail, function(data){
      console.log(data);
    });
  }
}
