import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {

  private isAuthenticated: boolean;
   current_user: User;

  constructor(private _user_serv : UserService, private authenticationService : AuthenticationService) {
    this.isAuthenticated = false;
    this._user_serv.current_user.subscribe((user: User) => this.current_user = user);
  }

  ngOnInit() {
    this.authenticationService.isAuthenticated.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

}
