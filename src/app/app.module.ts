import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { VMenuComponent } from './vmenu/vmenu.component';
import { TimelineComponent } from './timeline/timeline.component';
import { MessageComponent } from './message/message.component';
import { ContactComponent } from './contact/contact.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersService } from './users.service';
import { AuthenticationService } from './authentication.service';
import { ModalComponent } from './modal/modal.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    VMenuComponent,
    TimelineComponent,
    MessageComponent,
    ContactComponent,
    SettingsComponent,
    ModalComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [UsersService,AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
