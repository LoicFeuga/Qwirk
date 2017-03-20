import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientService } from './http-client.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatsService {
  private url: string = this.httpClient.url;
  private service: string = this.httpClient.chatService;
  private api: string = this.url + this.service;
  private apiCreate: string = this.api + "";
  private headers: Headers = this.httpClient.getHeaders();
  private options: RequestOptions = this.httpClient.getHeadersOptions();

  constructor(private http: Http, private httpClient: HttpClientService) { }

  createChannel(libelle: string, detail: string, callback: any) {
    let type = 2;
    let statut = 1;
    let user = JSON.parse(localStorage.getItem('user'));
    let creator = user.id;

    this.http.post(this.apiCreate, { libelle, detail, type, statut, creator }, this.options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }
  createChat(libelle: string, detail: string, callback: any) {
    let type = 0;
    let statut = 1;
    let token = JSON.parse(localStorage.getItem('user'));


    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": "Basic " + token.token
    });
    let options2 = new RequestOptions({ headers: headers });
    this.http.post(this.apiCreate, { libelle, detail, type, statut }, options2).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }

  createGroupe(libelle: string, detail: string, callback: any) {
    let type = 1;
    let statut = 1;
    let token = JSON.parse(localStorage.getItem('user'));


    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": "Basic " + token.token
    });
    let options2 = new RequestOptions({ headers: headers });
    this.http.post(this.apiCreate, { libelle, detail, type, statut }, options2).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }


  /**
   * 
   */
  getAllChats(idUser : number){
    this.http.get(this.api+"/"+idUser,this.options).map(res => res.json()).subscribe(data => {
      console.log(data);
    });
  }

}
