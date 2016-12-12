import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {

  private isAuthenticated: boolean;

  constructor(private authenticationService : AuthenticationService) {
    this.isAuthenticated = false;
  }

  ngOnInit() {
    this.authenticationService.isAuthenticated.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

}
