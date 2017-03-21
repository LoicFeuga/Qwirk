import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  public token: string = "";
  public user: any = {};
  constructor() {

    // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.token = currentUser && currentUser.token;
  }

  /**
   * Permet de set le nouveau local Storage avec les informations du paramètre
   * Actuellement, nom, prenom, id, token
   * @param token Le nouvelle objet qui contient le token 
   */
  setToken(user: any) {
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('token',JSON.stringify(user.token));
    this.token = user.token;
    this.user = user;
  }

  getUser(){

    let user = JSON.parse(localStorage.getItem('user'));
    return user;
  }
  getUserID(){

    let user = JSON.parse(localStorage.getItem('user'));
    return user.id;
  }

  getToken() {
    let token = JSON.parse(localStorage.getItem('token'));
    return token;
  }
}
