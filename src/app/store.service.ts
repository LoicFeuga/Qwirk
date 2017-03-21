import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {
  public token: string = "";
  public idUser: number = 0;
  public user: any = {};

  constructor() {
    let t = localStorage.getItem('user');
    if (t != null) {
      try {
        this.user = JSON.parse(t);
        this.token = this.user.token;
        this.idUser = this.user.id;
      } catch (e) {
        this.token = "";
      }
    }
  }

  getToken(){
    let user = JSON.parse(localStorage.getItem('user'));
    this.token = user.token;
    this.idUser = user.id;
    this.user = user;
    
  }


  setToken(token: string) {
    localStorage.setItem('user', token);
    let t = localStorage.getItem('user');
    if (t != null) {
      try {
        this.user = JSON.parse(t);
        this.token = this.user.token;
        this.idUser = this.user.id;
      } catch (e) {
        this.token = "";
      }
    }
    
  }


}
