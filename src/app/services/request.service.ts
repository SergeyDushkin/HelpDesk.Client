import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { ConfigService } from '../services/config.service';

@Injectable()
export class RequestService {

  constructor(private http: Http, private configService : ConfigService) { }

  public get(url : string) {

    let baseUrl = this.configService.get("API_URI");
    let token = localStorage.getItem('client_token');
    var headers = new Headers();
    
    headers.append('Authorization', 'Bearer ' +  token);
    return this.http.get(baseUrl + url, { headers: headers });
  }

  public post(url : string, data : any) {

    let baseUrl = this.configService.get("API_URI");
    let token = localStorage.getItem('client_token');
    var headers = new Headers();
    
    headers.append('Authorization', 'Bearer ' +  token);
    return this.http.post(baseUrl + url, data, { headers: headers });
  }

}
