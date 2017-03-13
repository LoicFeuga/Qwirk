import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { QDate } from './classes/date';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  private url: string = "http://94.247.27.209:8080/SupChat/api/rest/";
  private service: string = "user/";
  private api: string = this.url + this.service;
  private apiLogin: string = this.url + "login";
  private date: QDate = new QDate;

  constructor(private http: Http) {
    this.http = http;
  }

  test() {
    this.http.get(this.api + "").map(res => res.json()).subscribe(data => {
      console.log(data);
    });
  }


  login(login: string, mdp: string, callback: any) {

    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    let options = new RequestOptions({ headers: headers });
    
    this.http.post(this.apiLogin+"?login="+login+"&mdp="+mdp,"", options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }

  signup(login: string, mdp: string, nom: string, prenom: string, callback: any) {

    let dateCreate = this.date.now();

    let headers = new Headers({
      'Authorization': 'Basic 93d56f77-3bd8-41af-a55c-a20af6059c72'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.api + "", { login, mdp, nom, prenom, dateCreate }).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }

}
