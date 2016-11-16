import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { ConfigService } from '../services/config.service';

@Injectable()
export class AuthenticationService {

  public isAuthenticated : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public token: string;

    constructor(private http: Http, private configService : ConfigService) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;

        if (this.token){
          this.isAuthenticated.next(true);
        }
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
            
            this.isAuthenticated.next(true);
            // return true to indicate successful login
            return true;
          } else {

            this.isAuthenticated.next(false);
            // return false to indicate failed login
            return false;
          }
        });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');

        this.token = null;
        this.isAuthenticated.next(false);
    }

    //isAuthenticated() : Observable<boolean> {
    //  return this.status.asObservable();
    //}
}
