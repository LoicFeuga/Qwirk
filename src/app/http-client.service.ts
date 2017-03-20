import { Injectable } from '@angular/core';
import { Headers , RequestOptions} from '@angular/http';


@Injectable()
export class HttpClientService {
  private urlLocal: string = "http://10.31.18.76:8080/SupChat/api/rest/";
  private urlProd: string = "http://94.247.27.209:8080/SupChat/api/rest/";
  public url: string = this.urlLocal;
  public chatService: string = "chat";
  public userService: string = "user";

  constructor() {
    
  }


  getHeaders(): Headers {
    let user = localStorage.getItem('user');
    let token = JSON.parse(user).token;
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + token);
    headers.append('Content-type', 'application/json');
    return headers;
  }

  getHeadersOptions() : RequestOptions{
    let user = localStorage.getItem('user');
    let token = JSON.parse(user).token;
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + token);
    headers.append('Content-type', 'application/json');
    return new RequestOptions({headers:headers});
  }


}
