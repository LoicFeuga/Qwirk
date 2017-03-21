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

  constructor(private http: Http, private httpClient : HttpClientService, private auth :AuthenticationService) {
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
