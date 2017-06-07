import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { VMenuComponent } from './vmenu/vmenu.component';
import { UsersService } from './users.service';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName: string = "Qwirk";
  isLog: number = 0;

  constructor(private usersService: UsersService, private auth: AuthenticationService) {

  }

  onLogged(recup: boolean) {
    document.querySelector('.root')['style'].background = "#bbdefb";
    this.isLog = recup == true ? 1 : 0;
  }

  goFiltre(event: any) {
    if (event.code == "KeyF" && event.ctrlKey == true) {
      document.getElementById('search').focus();
      return false;
    }

  }

  onDeco(recup: boolean) {

    let that = this;
    this.usersService.getUser(this.auth.getUserID(), function (data) {
      data.statut = "Hors Ligne";
      that.usersService.updateUser(data, function (data) {
        
      });
    });

    this.isLog = 0;
    localStorage.setItem('user', '');
    document.querySelector('.root')['style'].background = "#FFFFFF";


    window.location.reload();

  }
}
