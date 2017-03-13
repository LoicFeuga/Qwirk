import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  public token: string = "";

  constructor() {

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  setToken(string : string){
    this.token = string;
  }

  getToken(){
    return this.token;
  }
}
