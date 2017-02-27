import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RestApi } from './rest-api.interface';
import { ConfigService } from '../services/config.service';

@Injectable()
export class TicketServiceApiService implements RestApi {

  constructor(private http: Http, private configService : ConfigService) { }

  public getBaseUrl = () => this.configService.get("APP_TICKET_SERVICE_API_URI");
  public get = (url : string) : Observable<Response> => this.http.get(this.getBaseUrl() + url, this.jwt);
  public post = (url : string, data : any) : Observable<Response> => this.http.post(this.getBaseUrl() + url, data, this.jwt);
  public put = (url : string, data : any) : Observable<Response> => this.http.put(this.getBaseUrl() + url, data, this.jwt);
  public delete = (url : string) : Observable<Response> => this.http.delete(this.getBaseUrl() + url, this.jwt); 

  get jwt() {

    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' +  this.getToken());

    return { headers: headers };
  }
  
  getToken() {
    return sessionStorage.getItem('id_token');
  }

}
