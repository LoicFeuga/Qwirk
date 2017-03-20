import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { QDate } from './classes/date';
import 'rxjs/add/operator/map';


@Injectable()
export class UsersService {
  private url: string = "http://94.247.27.209:8080/SupChat/api/rest/";
  private service: string = "user";
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
    
    this.http.post(this.apiLogin + "?login=" + login + "&mdp=" + mdp, "", options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }

  signup(login: string, mdp: string, nom: string, prenom: string, callback: any) {

    let dateCreate = this.date.now();

    let headers = new Headers({
      "content-type": "application/json"
    });
    let options = new RequestOptions({ headers: headers });
    let obj = {
      "login": login,
      "mdp": mdp,
      "nom": nom,
      "prenom": prenom
    }
    let objS = JSON.stringify(obj);
    let objo = JSON.parse(objS);
    let that = this;

   
    let headers2 = new Headers({
      "Content-Type": "application/json",
    });
    let options2 = new RequestOptions({ headers: headers2 });

    this.http.post(this.api, objo, options2).map(res => res.json()).subscribe(data => {
      callback(data);
    });

  }

}
