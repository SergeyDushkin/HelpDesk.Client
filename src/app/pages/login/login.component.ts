import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  
  private username : string;
  private password : string;

  constructor(private router: Router, private authenticationService : AuthenticationService) { }

  ngOnInit() {
        this.authenticationService.logout();
  }

  onSign() {
    this.authenticationService.login(this.username, this.password).then(IsAuthenticated => {
      if (IsAuthenticated){
        this.router.navigate(['/']);
      } else {
        alert("Логин или пароль указаны не верно");
      }
    });
  }

}
