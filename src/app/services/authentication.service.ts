import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { ConfigService } from '../services/config.service';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { tokenNotExpired, AuthConfig, JwtHelper, AuthHttp } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  
  public isAuthenticated : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  
  private jwtHelper: JwtHelper = new JwtHelper();
  private refreshSubscription: any;
  private config: any;

  //constructor(private http: Http, private authHttp: AuthHttp, private configService : ConfigService) {
  constructor(private http: Http, private authHttp: AuthHttp) {
      
      //this.config = configService.get("AuthenticationServer");
      this.config = {
        "url" : "http://52.178.193.205/authorization/",
        "client_id" : "public",
        "client_secret" : "public"
        };

      this.refreshSubscriptionAction();
      this.scheduleRefresh();
  }

  get requestOptions() {

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return { headers : headers };
  }

  private createToken(username, password) {
    
    var creds = "username=" + username
      + "&password=" + password
      + "&grant_type=" + "password"
      + "&client_id=" + this.config.client_id
      + "&client_secret=" + this.config.client_secret

    return this.http.post(this.config.url + 'connect/token/', creds, this.requestOptions)
  }

  private refreshToken() {

    let refreshTokenId = localStorage.getItem('refresh-token-id');

    //if (!refreshTokenId) {
    //  return Observable.of(false);
   // }

    let body = 'grant_type=refresh_token'
      + '&refresh_token=' + refreshTokenId
      + '&client_id=' + this.config.client_id;
    
    return this.http.post(this.config.url + 'connect/token/', body, this.requestOptions);
  }

  login(username, password) {

    return this.createToken(username, password).toPromise()
      .then(this.createTokenSuccess)
      .then(response => this.scheduleRefresh())
      .then(() => true);
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      localStorage.removeItem('currentUser');      
      sessionStorage.removeItem('id_token');
      sessionStorage.removeItem('expires_in');
      localStorage.removeItem('refresh-token-id');

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
    this.refreshSubscription = Observable.interval(60 * 1000).subscribe(this.refreshSubscriptionAction);
  }

  private refreshSubscriptionAction = () => {
    this.refreshToken().subscribe(
      this.createTokenSuccess,
      this.createTokenFailure,
      () => console.log('-> Token refreshed...'))
  }

  private createTokenSuccess = (response: Response) => {
    this.processTokenResponse(response);
    this.isAuthenticated.next(true);

    return response;
  }

  private createTokenFailure = (error: any) => {
    console.log('Refresh error: ' + JSON.stringify(error)); 
    this.logout();
  }

  public unscheduleRefresh() {
    // Unsubscribe fromt the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

}



/*
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
          this.refreshToken().subscribe(
            (response) => this.processTokenResponse(response),
            (error) => console.log('Refresh error: ' + JSON.stringify(error)),
            () => console.log('-> Token refreshed...'))
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
*/
