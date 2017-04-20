import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { QDate } from './classes/date';
import { HttpClientService} from './http-client.service';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/map';


@Injectable()
export class UsersService {
  
  private api: string = this.httpClient.url + this.httpClient.userService;
  private apiLogin: string = this.httpClient.url + "login";
  private date: QDate = new QDate;
  private options: RequestOptions = this.httpClient.getHeadersOptions();
  private optionsForm: RequestOptions = this.httpClient.getHeadersOptionsForm();

  constructor(private http: Http, private httpClient : HttpClientService, private auth :AuthenticationService) {
    }

  getAllUser(callback : any) {
    console.log('HEADERS');
    console.log(this.options);
    this.http.get(this.api + "",this.options).map(res => res.json()).subscribe(data => {
      callback(data);

    });
  }


  login(login: string, mdp: string, callback: any) {
     let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    let options = new RequestOptions({ headers: headers });
    
    this.http.post(this.apiLogin + "?login=" + login + "&mdp=" + mdp, "", this.optionsForm  ).map(res => res.json()).subscribe(data => {
      this.auth.setToken(data);
      callback(data);
    });
  }

  signup(login: string, mdp: string, nom: string, prenom: string, callback: any) {

    let dateCreate = this.date.now();

    let obj = {
      "login": login,
      "mdp": mdp,
      "nom": nom,
      "prenom": prenom
    }
    let objS = JSON.stringify(obj);
    let objo = JSON.parse(objS);
    

   
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":"Basic aazeazeaz"
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.api, objo, options).map(res => res.json()).subscribe(data => {
      callback(data);
    });

  }

}
