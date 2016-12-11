//external module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

/* Feature Modules */
import { ServiceDeskModule } from './service-desk/service-desk.module';

let modules = [
  AlertModule,
  DatepickerModule,
  BrowserModule,
  FormsModule,
  HttpModule,
  RouterModule,

  ServiceDeskModule
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

import { BaseApiService } from "./services/base-api.service";
import { RequestService } from "./services/request.service";

import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuard } from './guards/authentication-guard';
import { TicketService } from './tickets/ticket.service';
import { TicketListResolve } from './tickets/ticket-list/ticket-list-resolve.service';
import { TicketDetailResolve } from './tickets/ticket-detail/ticket-detail-resolve.service';

import { ClientService } from './clients/client.service';
import { ClientListResolve } from './clients/client-list-resolve.service';
import { ClientDetailResolve } from './clients/client-detail-resolve.service';

import { UserService as ClientUserService } from './clients/users/user.service';
import { UserListResolve } from './clients/users/user-list-resolve.service';
import { UserDetailResolve } from './clients/users/user-detail-resolve.service';

import { AddressService } from './clients/address/address.service';
import { AddressListResolve } from './clients/address/address-list-resolve.service';
import { AddressDetailResolve } from './clients/address/address-detail-resolve.service';

let services =  [
  UserService,
  MessagesService,
  ConfigService,
  RequestService, BaseApiService,
  AuthenticationService,
  AuthenticationGuard,
  TicketService, TicketListResolve, TicketDetailResolve,
  ClientService, ClientListResolve, ClientDetailResolve,
  ClientUserService, UserListResolve, UserDetailResolve,
  AddressService, AddressListResolve, AddressDetailResolve,
];

import { LoginComponent } from './pages/login/login.component';

let pages = [
  LoginComponent
]

//main bootstrap
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TicketNewComponent } from './tickets/ticket-new/ticket-new.component';
import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { StoreSelectComponent } from './stores/store-select/store-select.component';
import { TicketArchListComponent } from './tickets/ticket-arch-list/ticket-arch-list.component';
import { UserSelectComponent } from './users/user-select/user-select.component';

import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { ClientNewComponent } from './clients/client-new/client-new.component';
import { ClientSelectComponent } from './clients/client-select/client-select.component';

import { TicketDetailComponent as OperatorTicketDetailComponent } from './modules/operator/tickets/ticket-detail/ticket-detail.component';
import { UserListComponent } from './clients/users/user-list/user-list.component';
import { UserDetailComponent } from './clients/users/user-detail/user-detail.component';
import { UserNewComponent } from './clients/users/user-new/user-new.component';
import { UserSelectComponent as ClientUserSelectComponent } from './clients/users/user-select/user-select.component';
import { AddressListComponent } from './clients/address/address-list/address-list.component';
import { AddressDetailComponent } from './clients/address/address-detail/address-detail.component';
import { AddressNewComponent } from './clients/address/address-new/address-new.component';
import { AddressSelectComponent } from './clients/address/address-select/address-select.component';

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
    LoginComponent,
    ClientListComponent,
    ClientDetailComponent,
    ClientNewComponent,
    ClientSelectComponent,
    OperatorTicketDetailComponent,
    UserListComponent,
    UserDetailComponent,
    UserNewComponent,
    ClientUserSelectComponent,
    AddressListComponent,
    AddressDetailComponent,
    AddressNewComponent,
    AddressSelectComponent
  ],
  imports: [
    ...modules,
    AppRoutingModule
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
