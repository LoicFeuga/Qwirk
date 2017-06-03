import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  public token: string = "";
  public user: any = {};
  constructor() {

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  /**
   * Permet de set le nouveau local Storage avec les informations du paramètre
   * Actuellement, nom, prenom, id, token
   * @param token Le nouvelle objet qui contient le token 
   */
  setToken(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(user.token));
    this.token = user.token;
    this.user = user;
  }

  /**
   * Return un object nom prenom, id
   */
  getUser() {
    let user = { nom:"", prenom:"",id: -1 };
    try {

      user = JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      user =  { nom:"", prenom:"",id: -1 };
    }
    return user;
  }
  getUserID() {
    let id = 0;

    try {
      id = JSON.parse(localStorage.getItem('user')).id;
    } catch (e) {
      id = -1;
    }
    return id;
  }

  getToken() {
    let token = "";
    try {

      token = JSON.parse(localStorage.getItem('token'));
    } catch (e) {
      token ="";
    }
    return token;
  }
}
