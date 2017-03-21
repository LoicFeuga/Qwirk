import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { StoreService } from './store.service';

@Injectable()
export class HttpClientService {
  private urlLocal: string = "http://10.31.18.76:8080/SupChat/api/rest/";
  private urlProd: string = "http://94.247.27.209:8080/SupChat/api/rest/";
  public url: string = this.urlProd;
  public chatService: string = "chat";
  public userService: string = "user";

  constructor(private store : StoreService) {

  }


  getHeaders(): Headers {
    let token = this.store.token;
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + token);
    headers.append('Content-type', 'application/json');
    return headers;
  }

  getHeadersOptions(): RequestOptions {    
    let token = this.store.token;
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + token);
    headers.append('Content-type', 'application/json');
    console.log('Basic '+token);
    return new RequestOptions({ headers: headers });
  }


}
