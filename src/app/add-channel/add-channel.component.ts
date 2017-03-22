import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { ChatsService } from '../chats.service';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.css']
})
export class AddChannelComponent implements OnInit {
  
  libelle : string ="";
  detail : string ="";
  @Output() created: EventEmitter<any> = new EventEmitter<any>();
  constructor( public chatsService: ChatsService) { }

  ngOnInit() {
  }

  create(){
    let that = this;
    this.chatsService.createChannel(this.libelle,this.detail, function(data){
      that.created.emit(data)
    });
  }
}
