import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: string[] = [];

  constructor() {
    this.contacts.push('loic');
    this.contacts.push('aaa');
    this.contacts.push('zzz');
    this.contacts.push('aazeazaez');

  }

  ngOnInit() {
  }

}
