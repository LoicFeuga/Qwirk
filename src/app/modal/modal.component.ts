import { Component, OnInit, Input , EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() titre : string = "Titre";
  @Input() content : string = "Description";
  @Output() displayed: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  close(){
    this.displayed.emit(false);
  }

}
