import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  messages: Object[] = [];
  text: string;

  constructor() {

    this.messages.push({author:"loic",content:"loremkojaoj oijoiaj ioj"});
    setTimeout(function () {
      let objDiv = document.querySelector("#timeline");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 100);
  }

  scrollBot() {
  }

  add() {
    this.messages.push({ author: "loic", content: this.text });
    setTimeout(function () {
      let objDiv = document.querySelector("#timeline");
      objDiv.scrollTop = objDiv.scrollHeight;
    });
    this.text = "";
  }
  ngOnInit() {

  }

}
