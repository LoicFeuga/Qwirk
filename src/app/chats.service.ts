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
  private headers: Headers = this.httpClient.getHeaders();
  private options: RequestOptions = this.httpClient.getHeadersOptions();

  constructor(private http: Http, private httpClient: HttpClientService,private auth : AuthenticationService) { }

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
    
    this.http.post(this.apiCreate, { libelle, detail, type, statut }, this.options).map(res => res.json()).subscribe(data => {
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


  /**
   * 
   */
  getAllChats(idUser : number, callback : any){
    this.options = this.httpClient.getHeadersOptions();
    this.http.get(this.api+"/"+idUser,this.options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }

}
