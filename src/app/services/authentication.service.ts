import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { ConfigService } from '../services/config.service';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { tokenNotExpired, AuthConfig, JwtHelper, AuthHttp } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  
  public isAuthenticated : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public token: string;
  
  jwtHelper: JwtHelper = new JwtHelper();
  refreshSubscription: any;

    constructor(private http: Http, private authHttp: AuthHttp, private configService : ConfigService) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;

        if (this._isAuthenticated){
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

          this.processTokenResponse(response);          
          this.scheduleRefresh();

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
        this.unscheduleRefresh();
    }

    get _isAuthenticated(): boolean {
        if (tokenNotExpired(undefined, sessionStorage.getItem('id_token'))) {
            return true;
        } else {
            return false;
        }
    }
    
    getToken() {
        return sessionStorage.getItem('id_token');
    }

    private getNewJwt() {
      let config = this.configService.get("AuthenticationServer");
      let refreshTokenId = localStorage.getItem('refresh-token-id');
      var header = new Headers();
      
      header.append('Content-Type', 'application/x-www-form-urlencoded');
      let body = 'grant_type=refresh_token'
        + '&refresh_token=' + refreshTokenId
        + '&client_id=' + config.client_id;
      
      return this.http
        .post(config.url + 'connect/token/', body, { headers: header })
        .map((res) => this.processTokenResponse(res));
    }

    private processTokenResponse(res: Response) {
      this.persistTokenInformation(res.json().access_token, res.json().expires_in, res.json().refresh_token);
      return Observable.of(true);
    }
    
    public persistTokenInformation(token: string, tokenExpiry: string, refreshTokenId: string) {
      sessionStorage.setItem('id_token', token);
      sessionStorage.setItem('expires_in', tokenExpiry);
      localStorage.setItem('refresh-token-id', refreshTokenId);
    }

    public scheduleRefresh() {        
        // If the user is authenticated, use the token stream
        // provided by angular2-jwt and flatMap the token
        let source = this.authHttp.tokenStream.flatMap(
            token => {
              token = sessionStorage.getItem('id_token');
              token = this.jwtHelper.decodeToken(token);
                // The delay to generate in this case is the difference
                // between the expiry time and the issued at time                
                let jwtExp = token['exp'];                             
                let iat = token['auth_time'];
                
                //let iat = new Date(sessionStorage.getItem('.issued')).getTime()/1000;                                   
                let refreshTokenThreshold = 10; //seconds
                let delay = ((jwtExp - iat) - refreshTokenThreshold) * 1000;

                delay = 60 * 1000;

                return Observable.interval(delay);
            });

        this.refreshSubscription = source.subscribe(() => {
            this.getNewJwt().subscribe((res) =>  console.log('-> Refreshed...'),(error) => console.log('Refresh error: '+ JSON.stringify(error)))
        });
    }

    public startupTokenRefresh() {
        // If the user is authenticated, use the token stream
        // provided by angular2-jwt and flatMap the token
        if (this._isAuthenticated) {
            let source = this.authHttp.tokenStream.flatMap(
                token => {
                    // Get the expiry time to generate
                    // a delay in milliseconds
                    let now: number = new Date().valueOf()/1000;
                    let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
                    let iat = new Date(sessionStorage.getItem('.issued')).getTime()/1000;

                    let refreshTokenThreshold = 10; //seconds

                    let delay: number = jwtExp - now ;
                    let totalLife: number = (jwtExp - iat); 
                    (delay < refreshTokenThreshold ) ? delay = 1 : delay = delay - refreshTokenThreshold;                    

                    // Use the delay in a timer to
                    // run the refresh at the proper time
                    return Observable.timer(delay*1000);
                });

            // Once the delay time from above is
            // reached, get a new JWT and schedule
            // additional refreshes
            source.subscribe(() => {
                this.getNewJwt().subscribe(
                    (res) => {
                    console.log('-> Refreshed on startup')
                    this.scheduleRefresh();
                    },
                    (error) => console.log('-> Refresh error:'+ JSON.stringify(error)))

            });
        }
    }

    public unscheduleRefresh() {
        // Unsubscribe fromt the refresh
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
}
