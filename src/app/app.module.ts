//external module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

/* Feature Modules */
import { ServiceDeskModule } from './service-desk/service-desk.module';
import { OperatorModule } from './service-desk/operators/operator.module';
import { ClientModule } from './clients/client.module';
import { SupplierModule } from './suppliers/supplier.module';
import { ServiceModule } from './service/service.module';
import { StatusModule as WorkStatusModule } from './works/status/status.module';
import { ContractModule } from './contracts/contract.module';

let modules = [
  AlertModule,
  DatepickerModule,
  BrowserModule,
  FormsModule,
  HttpModule,
  RouterModule,

  ServiceDeskModule,
  OperatorModule,
  ClientModule,
  SupplierModule,
  ServiceModule,
  WorkStatusModule,
  ContractModule
];

import { AppHeaderComponent } from "./widgets/app-header/app-header.component";
import { MenuAsideComponent } from "./widgets/menu-aside/menu-aside.component";
import { MessagesBoxComponent} from "./widgets/messages-box/messages-box.component";
import { NotificationBoxComponent } from "./widgets/notification-box/notification-box.component";
import { TasksBoxComponent } from "./widgets/tasks-box/tasks-box.component";
import { UserBoxComponent } from "./widgets/user-box/user-box.component";
import { SmtpSettingsComponent } from "./settings/smtp.settings.component";

let widgets = [
  AppComponent,
  AppHeaderComponent,
  MenuAsideComponent,
  MessagesBoxComponent,
  NotificationBoxComponent,
  TasksBoxComponent,
  UserBoxComponent,
  SmtpSettingsComponent
];

import { UserService } from "./services/user.service";
import { MessagesService } from "./services/messages.service";
import { ConfigService } from "./services/config.service";

import { BaseApiService } from "./services/base-api.service";
import { TicketServiceApiService } from "./services/ticket-service-api.service";
import { RequestService } from "./services/request.service";
import { SignalRService } from "./services/signalr.service";

import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuard } from './guards/authentication-guard';
import { TicketService } from './tickets/ticket.service';
import { TicketListResolve } from './tickets/ticket-list/ticket-list-resolve.service';
import { TicketDetailResolve } from './tickets/ticket-detail/ticket-detail-resolve.service';
import { SettingsService } from './settings/settings.service';


let services =  [
  UserService,
  MessagesService,
  ConfigService,
  RequestService, BaseApiService, SignalRService,
  AuthenticationService,
  AuthenticationGuard,
  TicketService, TicketListResolve, TicketDetailResolve,SettingsService,
  TicketServiceApiService
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
 

import { TicketDetailComponent as OperatorTicketDetailComponent } from './modules/operator/tickets/ticket-detail/ticket-detail.component';


//export function configServiceFactory(config: ConfigService) {
//  return function() {
//    return config.load();
//  }
//};

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
    OperatorTicketDetailComponent,
    
  ],
  imports: [
    ...modules,
    AppRoutingModule
  ],
  providers: [
    ...services
      //, {
      //provide: APP_INITIALIZER,
      //useFactory: configServiceFactory,
      //deps: [ConfigService],
      //multi: true
     //}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
