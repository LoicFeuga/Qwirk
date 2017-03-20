import { Component } from '@angular/core';  
import { LoginComponent } from './login/login.component';
import { VMenuComponent } from './vmenu/vmenu.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName : string = "Qwirk";
  isLog : number = 0;
  
  
  onLogged(recup : boolean){
    console.log('onLogged');
    
    document.querySelector('.root')['style'].background = "#bbdefb";
    this.isLog = recup == true ? 1 : 0;
  }

  onDeco(recup : boolean){
    console.log('ondeco');
    this.isLog = 0;  
    localStorage.setItem('user','');
    document.querySelector('.root')['style'].background = "#FFFFFF";


  }
}
