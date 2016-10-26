import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { ConfigService } from '../services/config.service';

@Injectable()
export class RequestService {

  constructor(private http: Http, private configService : ConfigService) { }

  public get(url : string) {

    let sync = this.configService.get("API_URI")
      .toPromise()
      .then(base => {

        var token = localStorage.getItem('token');
        var headers = new Headers();

        headers.append('Authorization', 'Bearer ' +  token);
        return this.http.get(base + url, { headers: headers }).toPromise();
      });

      return Observable.fromPromise(sync);
  }

  public post(url : string, data : any) {
    
    let sync = this.configService.get("API_URI")
      .toPromise()
      .then(base => {

        var token = localStorage.getItem('token');
        var headers = new Headers();

        headers.append('Authorization', 'Bearer ' +  token);
        return this.http.post(base + url, data, { headers: headers }).toPromise();
      });

      return Observable.fromPromise(sync);
  }

}
