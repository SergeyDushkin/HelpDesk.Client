import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { ConfigService } from '../services/config.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class RequestService {

  constructor(private http: Http, private configService : ConfigService, private authenticationService : AuthenticationService) { }

  public get(url : string) : Observable<Response> {

    let baseUrl = this.configService.get("API_URI");
    let token = this.authenticationService.token;
    var headers = new Headers();
    
    headers.append('Authorization', 'Bearer ' +  token);

    var request = this.http.get(baseUrl + url, { headers: headers })

    request.subscribe(
      data => { },
      err => { 
        if (err.status == 401) { this.authenticationService.logout(); }},
      () => console.log('RequestService: done'));

    return request;
  }

  public post(url : string, data : any) : Observable<Response> {

    let baseUrl = this.configService.get("API_URI");
    let token = this.authenticationService.token;
    var headers = new Headers();
    
    headers.append('Authorization', 'Bearer ' +  token);
    return this.http.post(baseUrl + url, data, { headers: headers });
  }

}
