import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { ConfigService } from '../services/config.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class BaseApiService {

  constructor(private http: Http, private configService : ConfigService, private authenticationService : AuthenticationService) { }

  public getBaseUrl() {
    return this.configService.get("APP_API_URI");
  }

  public getHeaders() {

    let token = this.authenticationService.token;
    var headers = new Headers();
    
    headers.append('Authorization', 'Bearer ' +  token);

    return headers;
  }

  public get(url : string) : Observable<Response> {

    //request.subscribe(
    //  data => { },
    //  err => { 
    //    if (err.status == 401) { this.authenticationService.logout(); }},
    //  () => console.log('RequestService: done'));

    return this.http.get(this.getBaseUrl() + url, { headers: this.getHeaders() });
  }

  public post(url : string, data : any) : Observable<Response> {

    return this.http.post(this.getBaseUrl() + url, data, { headers: this.getHeaders() });
  }

  public put(url : string, data : any) : Observable<Response> {

    return this.http.put(this.getBaseUrl() + url, data, { headers: this.getHeaders() });
  }

  public delete(url : string) : Observable<Response> {

    return this.http.delete(this.getBaseUrl() + url, { headers: this.getHeaders() });
  }

}
