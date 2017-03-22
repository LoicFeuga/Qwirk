import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../app.component';
import { UsersService } from '../users.service';
import { AuthenticationService } from '../authentication.service';
import { QDate } from '../classes/date';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @Output() logged: EventEmitter<boolean> = new EventEmitter<boolean>();

  isLogin: number = 1;
  step: number = 1;
  appName: string = "Qwirk";
  loginTitle: string = "Connectez-vous à " + this.appName;
  signinTitle: string = "Inscrivez-vous à " + this.appName;
  isLogged: number = 0;
  email: string = "";
  password: string = "";
  nom: string = "";
  prenom: string = "";

  modalTitre: string = "Titre";
  modalContent: string = "description";
  modalDisplayed: boolean = false;
  date: QDate = new QDate();
  //isLogged: number = 1;

  modalShow(show: boolean) {
    this.modalDisplayed = false;
  }
  constructor(app: AppComponent, public usersService: UsersService, private auth: AuthenticationService) {
    this.appName = app.appName;
  }


  ngOnInit() {
    //this.login();
  }

  login() {
    let dateCreate = new Date();
    let that = this;
    this.usersService.login(this.email, this.password, function (data) {

      if (data.id != null) {
        that.auth.setToken(data);
        that.logged.emit(true);
      } else {
        that.displayNotif("Avertissement", "Mauvaise combinaison email / mot de passe");
      }
    });

  }

  displayNotif(titre: string, description: string) {
    this.modalTitre = titre;
    this.modalContent = description;
    this.modalDisplayed = true;
  }

  signin() {
    this.usersService.signup(this.email, this.password, this.nom, this.prenom, function (data) {
      
    });
    this.isLogged = 0;
    this.initData();
  }

  initData() {
    this.email = "";
    this.password = "";
    this.nom = "";
    this.prenom = "";
  }
  step2() {
    this.step = 2;
  }
  step1() {
    this.step = 1;
  }

  toLogin() {
    this.isLogin = 1;
    this.initData();
  }

  toSignin() {
    this.isLogin = 0;
    this.initData();

  }

}
