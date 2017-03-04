import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { QDate } from './classes/date';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  private url: string = "http://94.247.27.209:8080/SupChat/api/rest/";
  private service: string = "user/";
  private api: string = this.url + this.service;
  private date : QDate = new QDate

  constructor(private http: Http) {
    this.http = http;
  }

  test() {
    this.http.get(this.api + "").map(res => res.json()).subscribe(data => {
      console.log(data);
    });
  }

  signup(login: string, mdp: string, nom: string, prenom: string) {
    let dateCreate = this.date.now();
    this.http.post(this.api + "", { login, mdp, nom, prenom, "dateCreate" : dateCreate }).map(res => res.json()).subscribe(data => {
      console.log(data);
    });
  }

  post() {
    let service = this.service;
    this.http.post(this.api + "login", { service }).map(res => res.json()).subscribe(data => {
      console.log(data);
    });
  }
}
