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
  isLog : number = 1;
  
  
  onLogged(recup : boolean){    
    document.querySelector('.root')['style'].background = "#bbdefb";
    this.isLog = recup == true ? 1 : 0;
  }

  goFiltre(event : any){
    if(event.code == "KeyF" && event.ctrlKey == true ){
      document.getElementById('search').focus();
      return false;
    }
    
  }

  onDeco(recup : boolean){
    this.isLog = 0;  
    localStorage.setItem('user','');
    document.querySelector('.root')['style'].background = "#FFFFFF";


  }
}
