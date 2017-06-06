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
import { ChatsService } from './chats.service';
import { HttpClientService } from './http-client.service';
import { WebSocketService } from './web-socket.service';
import { AuthenticationService } from './authentication.service';
import { ModalComponent } from './modal/modal.component';
import { NotificationComponent } from './notification/notification.component';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { AddGroupeComponent } from './add-groupe/add-groupe.component';
import { AddChatComponent } from './add-chat/add-chat.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

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
    NotificationComponent,
    AddChannelComponent,
    AddGroupeComponent,
    AddChatComponent,
    VideoCallComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    HttpModule
  ],
  providers: [UsersService,AuthenticationService,ChatsService,HttpClientService,WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
