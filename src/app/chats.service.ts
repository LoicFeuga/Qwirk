import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientService } from './http-client.service';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatsService {
  private url: string = this.httpClient.url;
  private service: string = this.httpClient.chatService;
  private api: string = this.url + this.service;
  private apiCreate: string = this.api + "";
  private apiContacts: string = this.url + "contact";
  private apijoin: string = this.url + "userHasChat";
  private apiPublic: string = this.api + "/public";
  private headers: Headers = this.httpClient.getHeaders();
  private options: RequestOptions = this.httpClient.getHeadersOptions();

  constructor(private http: Http, private httpClient: HttpClientService, private auth: AuthenticationService) { }

  createChannel(libelle: string, detail: string, callback: any) {
    let type = 2;
    let statut = 1;
    let creator = this.auth.getUserID();

    this.http.post(this.apiCreate, { libelle, detail, type, statut, creator }, this.options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }
  createChat(libelle: string, detail: string, callback: any) {
    let type = 0;
    let statut = 1;
    let creator = this.auth.getUserID();

    this.http.post(this.apiCreate, { libelle, detail, type, statut, creator }, this.options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }

  createGroupe(libelle: string, detail: string, callback: any) {
    let type = 1;
    let statut = 1;
    let creator = this.auth.getUserID();

    this.http.post(this.apiCreate, { libelle, detail, type, statut, creator }, this.options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }

  deleteChat(id: number) {
    this.http.delete(this.api + "/" + id, this.options).map(res => res.json()).subscribe(data => {


    });
  }

  leaveChat(idChat : number, idUser : number){

    this.http.delete(this.apijoin + "/" + idUser + "/" + idChat, this.options).map(res => res.json()).subscribe(data => {
     
    });
  }
  getContact(id: number, callback : any) {
    this.http.get(this.apiContacts + "/" + id, this.options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }

  getAllChannel(callback: any) {
    this.http.get(this.apiPublic + "/", this.options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }


  joinChannel(idUser: number, idChannel: number, callback: any) {
    this.http.post(this.apijoin + "/" + idUser + "/" + idChannel,{}, this.options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }
  /**
   * 
   */
  getAllChats(idUser: number, callback: any) {
    this.options = this.httpClient.getHeadersOptions();
    this.http.get(this.api + "/" + idUser, this.options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }

}
