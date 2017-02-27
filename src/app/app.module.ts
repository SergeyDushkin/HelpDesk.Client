//external module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

/* Feature Modules */
import { AlertModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ServiceDeskModule } from './service-desk/service-desk.module';

let modules = [
  AlertModule,
  DatepickerModule,
  BrowserModule,
  FormsModule,
  HttpModule,
  RouterModule,

  ServiceDeskModule,
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
import { RequestService } from "./services/request.service";
import { SignalRService } from "./services/signalr.service";

import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuard } from './guards/authentication-guard';
import { SettingsService } from './settings/settings.service';


let services =  [
  UserService,
  MessagesService,
  ConfigService,
  RequestService, BaseApiService, SignalRService,
  AuthenticationService,
  AuthenticationGuard,
  SettingsService,
];

import { LoginComponent } from './pages/login/login.component';

let pages = [
  LoginComponent
]

//main bootstrap
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';

//export function configServiceFactory(config: ConfigService) {
//  return function() {
//    return config.load();
//  }
//};

@NgModule({
  declarations: [
    ...widgets,
    ...pages,
    LoginComponent,    
  ],
  imports: [
    ...modules,
    AppRoutingModule
  ],
  providers: [
    ...services
    //, {
    //  provide: APP_INITIALIZER,
    //  useFactory: configServiceFactory,
    //  deps: [ ConfigService ],
    //  multi: true
    //}
    //, {
    //  provide: JwtHttp,
    //  useFactory: getJwtHttp,
    //  deps: [ Http ]
    //}
    , {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    }
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

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

/*
export function configServiceFactory(config: ConfigService) {
  return function() {
    return new ConfigService();
  }
};

export function getJwtHttp(http: Http, options: RequestOptions) {
  let config = new ConfigService().get("AuthenticationServer");
  let url = config.url + 'connect/token/';
  let jwtOptions = {
    endPoint: url,
    // optional
    payload: { type: 'refresh' },
    beforeSeconds: 10, // refresh tokeSn before 10 min
    tokenName: 'refresh_token',
    refreshTokenGetter: (() => localStorage.getItem('refresh_token')),
    tokenSetter: ((res: Response): boolean | Promise<void> => {
      res = res.json();
 
      if (!res['access_token'] || !res['refresh_token']) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
 
        return false;
      }
 
      localStorage.setItem('access_token', res['access_token']);
      localStorage.setItem('refresh_token', res['refresh_token']);
 
      return true;
    })
  };
  let authConfig = new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('access_token')),
  });
 
  return new JwtHttp(
    new JwtConfigService(jwtOptions, authConfig),
    http,
    options
  );
}*/