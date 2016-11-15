import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';

@Injectable()
export class AuthenticationService {

    public token: string;

    constructor(private http: Http, private configService : ConfigService) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username, password): Observable<boolean> {
      let config = this.configService.get("AuthenticationServer");
      
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      
      var creds = "username=" + username
        + "&password=" + password
        + "&grant_type=" + "password"
        + "&client_id=" + config.client_id
        + "&client_secret=" + config.client_secret

      return this.http.post(config.url + 'connect/token/', creds, { headers : headers })
        .map((response: Response) => {
          // login successful if there's a jwt token in the response
          let token = response.json() && response.json().access_token;
          if (token) {
            // set token property
            this.token = token;
            
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
            
            // return true to indicate successful login
            return true;
          } else {
            // return false to indicate failed login
            return false;
          }
        });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
