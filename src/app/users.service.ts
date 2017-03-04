import { Injectable } from '@angular/core';
import { Http   } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  private url: string ="http://94.247.27.209:8080/SupChat/api/rest/";
  private service : string ="user/";
  private api : string = this.url+this.service;

  constructor(private http: Http) {
    this.http = http;
   }

   test(){
     this.http.get(this.api+"").map(res => res.json()).subscribe(data=>{
      console.log(data);
     });
   }

   post(){
     let service = this.service;
     this.http.post(this.api+"login",{service}).map(res => res.json()).subscribe(data => {
       console.log(data);
     });
   }
}
