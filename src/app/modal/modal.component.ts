import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() titre : string = "Titre";
  @Input() content : string = "Description";
  @Input() displayed : Boolean = true;

  constructor() { }

  ngOnInit() {
  }

  close(){
    this.displayed = false;
  }

}
