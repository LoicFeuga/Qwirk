import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatsService {
  private url: string = "http://94.247.27.209:8080/SupChat/api/rest/";
  private service: string = "chat";
  private api: string = this.url + this.service;
  private apiCreate: string = this.api + "";

  constructor(private http: Http) { }

  createChannel(libelle : string, detail : string, callback:any){
    let type = 2;
    let statut = 1;
    let token = JSON.parse(localStorage.getItem('user'));

   
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": "Basic "+token.token
    });
    let options2 = new RequestOptions({ headers: headers });

    this.http.post(this.apiCreate, {libelle,detail,type,statut} ,options2).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }
  createChat(libelle : string, detail : string, callback:any){
    let type = 0;
    let statut = 1;
    let token = JSON.parse(localStorage.getItem('user'));

   
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": "Basic "+token.token
    });
    let options2 = new RequestOptions({ headers: headers });
    this.http.post(this.apiCreate, {libelle,detail,type,statut} , options2).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }

  createGroupe(libelle : string, detail : string, callback:any){
    let type = 1;
    let statut = 1;
    let token = JSON.parse(localStorage.getItem('user'));

   
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": "Basic "+token.token
    });
    let options2 = new RequestOptions({ headers: headers });
    this.http.post(this.apiCreate, {libelle,detail,type,statut} ,options2).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }

}
