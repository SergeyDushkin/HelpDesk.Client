import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { ConfigService } from '../services/config.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class BaseApiService {

  constructor(private http: Http, private configService : ConfigService, private authenticationService : AuthenticationService) { }

  public get(url : string) {

    let baseUrl = this.configService.get("APP_API_URI");
    let token = this.authenticationService.token;
    var headers = new Headers();
    
    headers.append('Authorization', 'Bearer ' +  token);

    var request = this.http.get(baseUrl + url, { headers: headers })

    //request.subscribe(
    //  data => { },
    //  err => { 
    //    if (err.status == 401) { this.authenticationService.logout(); }},
    //  () => console.log('RequestService: done'));

    return request;
  }

  public post(url : string, data : any) {

    let baseUrl = this.configService.get("APP_API_URI");
    let token = this.authenticationService.token;
    var headers = new Headers();
    
    headers.append('Authorization', 'Bearer ' +  token);
    return this.http.post(baseUrl + url, data, { headers: headers });
  }

  public put(url : string, data : any) {

    let baseUrl = this.configService.get("APP_API_URI");
    let token = this.authenticationService.token;
    var headers = new Headers();
    
    headers.append('Authorization', 'Bearer ' +  token);
    return this.http.put(baseUrl + url, data, { headers: headers });
  }

  public delete(url : string) {

    let baseUrl = this.configService.get("APP_API_URI");
    let token = this.authenticationService.token;
    var headers = new Headers();
    
    headers.append('Authorization', 'Bearer ' +  token);
    return this.http.delete(baseUrl + url, { headers: headers });
  }

}
