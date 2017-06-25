import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class HttpClientService {
  private urlLocal: string = "http://10.31.19.47:8080/SupChat/api/rest/";
  private urlProd: string = "http://84.246.226.230:8080/SupChat/api/rest/";
  private urlProdHttps: string = "https://84.246.226.230:8443/SupChat/api/rest/";
  //dans timeline pour le server file
 public urlSocket: string = "//84.246.226.230:8080/SupChat/server/";
  public url: string = this.urlProdHttps;
  public chatService: string = "chat";
  public userService: string = "user";

  constructor(private auth : AuthenticationService) {

  }


  getHeaders(): Headers {
    let token = this.auth.getToken();
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + token);
    headers.append('Content-type', 'application/json');
    headers.append('id',""+this.auth.getUserID());
    return headers;
  }

  getHeadersOptions(): RequestOptions {    
    let token = this.auth.getToken();
    let headers = new Headers();
    
    headers.append('Authorization', 'Basic ' + token);
    headers.append('Content-type', 'application/json');
    headers.append('id',""+this.auth.getUserID());
    return new RequestOptions({ headers: headers });
  }

   getHeadersOptionsForm(): RequestOptions {    
    let token = this.auth.getToken();
    let headers = new Headers();
    
    headers.append('Authorization', 'Basic ' + token);
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    headers.append('id',""+this.auth.getUserID());
    return new RequestOptions({ headers: headers });
  }


}
