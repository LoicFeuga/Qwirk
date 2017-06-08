import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { QDate } from './classes/date';
import { HttpClientService} from './http-client.service';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/map';


@Injectable()
export class UsersService {
  
  private api: string = this.httpClient.url + this.httpClient.userService;
  private apiInvit: string = this.api + "/invit";
  private apiContact : string = this.httpClient.url+ this.httpClient.userService + "/contact";
  private apiParametre : string = this.httpClient.url+ "parametre";
  private apiDeleteContact : string = this.httpClient.url + "contact";
  private apiLogin: string = this.httpClient.url + "login";
  private date: QDate = new QDate;
  private options: RequestOptions = this.httpClient.getHeadersOptions();
  private optionsForm: RequestOptions = this.httpClient.getHeadersOptionsForm();

  constructor(private http: Http, private httpClient : HttpClientService, private auth :AuthenticationService) {
    }

  /**
   * Récupère tous les users qui ne sont pour id_user et pas les contacts de id_user
   * @param id id_user
   * @param callback 
   */
  getAllUser(id:number,callback : any) {
    this.options =  this.httpClient.getHeadersOptions();
    
    this.http.get(this.httpClient.url+"user/notContact" ,this.options).map(res => res.json()).subscribe(data => {
      callback(data);

    });
  }
  getParametre(id:number, callback: any){
    this.options =  this.httpClient.getHeadersOptions();
    this.http.get(this.apiParametre+"/"+id ,this.options).map(res => res.json()).subscribe(data => {
      callback(data);

    });
  }

  updateStatutUser(id:number,statut:string,callback:any){
    this.options =  this.httpClient.getHeadersOptions();
    this.http.put(this.api+"/"+id+"/"+statut,this.options).map(res => res.json()).subscribe(data => {
      callback(data.statut);
    });
  }

  getUser(id:number,callback:any){
    this.options =  this.httpClient.getHeadersOptions();
    this.http.get(this.api+"/"+id, this.options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }

  getInvitation(callback:any){
    this.options =  this.httpClient.getHeadersOptions();

    this.http.get(this.apiInvit, this.options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }
  acceptInvitation(id:number,callback:any){
    this.options =  this.httpClient.getHeadersOptions();
    this.http.put(this.apiInvit+"/"+id+"/1",this.options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }



  updateUser(user:any,callback:any){
    this.options =  this.httpClient.getHeadersOptions();

    this.http.put(this.api,user,this.options).map(res => res.json()).subscribe(data => {
      callback(data);
    });

  }
  refuseInvitation(id:number,callback:any){
    this.options =  this.httpClient.getHeadersOptions();

    this.http.put(this.apiInvit+"/"+id+"/3",this.options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }
  updateAudioVideo(settings : any, callback:any){
    this.options =  this.httpClient.getHeadersOptions();

     this.http.put(this.apiParametre,settings, this.options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }

  deleteContact(id2 : number, callback : any){
    this.options =  this.httpClient.getHeadersOptions();

    this.http.get(this.apiDeleteContact+"/"+id2+"/5", this.options).map(res => res.json()).subscribe(data => {
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
