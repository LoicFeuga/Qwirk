import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../app.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @Output() logged : EventEmitter<boolean> = new EventEmitter<boolean>();

  isLogin: number = 1;
  step: number = 1;
  appName: string = "Qwirk";
  loginTitle: string = "Connectez-vous à " + this.appName;
  signinTitle: string = "Inscrivez-vous à " + this.appName;
  isLogged: number = 0;
  //isLogged: number = 1;

  constructor(app: AppComponent, public usersService : UsersService) {
    this.appName = app.appName;
  }


  ngOnInit() {
    //this.login();
  }

  login(){
    this.usersService.test();
    this.logged.emit(true);
  }

  signin(){
    this.isLogged = 0;
  }
  step2() {
    this.step = 2;
  }
  step1() {
    this.step = 1;
  }

  toLogin() {
    this.isLogin = 1;
  }

  toSignin() {
    this.isLogin = 0;

  }

}
