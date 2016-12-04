//external module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

let modules = [
  AlertModule,
  DatepickerModule,
  BrowserModule,
  FormsModule,
  HttpModule,
  RouterModule,
];

import { AppHeaderComponent } from "./widgets/app-header";
import { MenuAsideComponent } from "./widgets/menu-aside";
import { MessagesBoxComponent} from "./widgets/messages-box";
import { NotificationBoxComponent } from "./widgets/notification-box";
import { TasksBoxComponent } from "./widgets/tasks-box";
import { UserBoxComponent } from "./widgets/user-box"

let widgets = [
  AppComponent,
  AppHeaderComponent,
  MenuAsideComponent,
  MessagesBoxComponent,
  NotificationBoxComponent,
  TasksBoxComponent,
  UserBoxComponent
];

import { UserService } from "./services/user.service";
import { MessagesService } from "./services/messages.service";
import { ConfigService } from "./services/config.service";
import { RequestService } from "./services/request.service";
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuard } from './guards/authentication-guard';
import { TicketService } from './tickets/ticket.service';
import { TicketListResolve } from './tickets/ticket-list/ticket-list-resolve.service';
import { TicketDetailResolve } from './tickets/ticket-detail/ticket-detail-resolve.service';

let services =  [
  UserService,
  MessagesService,
  ConfigService,
  RequestService,
  AuthenticationService,
  AuthenticationGuard,
  TicketService,
  TicketListResolve,
  TicketDetailResolve,
];

import { LoginComponent } from './pages/login/login.component';

let pages = [
  LoginComponent
]

//main bootstrap
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TicketNewComponent } from './tickets/ticket-new/ticket-new.component';
import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { StoreSelectComponent } from './stores/store-select/store-select.component';
import { TicketArchListComponent } from './tickets/ticket-arch-list/ticket-arch-list.component';
import { UserSelectComponent } from './users/user-select/user-select.component';


@NgModule({
  declarations: [
    ...widgets,
    ...pages,
    TicketListComponent,
    TicketNewComponent,
    TicketDetailComponent,
    StoreSelectComponent,
    TicketArchListComponent,
    UserSelectComponent,
    LoginComponent
  ],
  imports: [
    ...modules,
    routing
  ],
  providers: [
    ...services, {
      provide: APP_INITIALIZER,
      useFactory: (config:ConfigService) => () => config.load(),
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
