import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { ConfigService } from '../services/config.service';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class BaseApiService {

  constructor(private http: Http, private configService : ConfigService, private authenticationService: AuthenticationService) { }

  get token() : string { return sessionStorage.getItem('id_token'); }
  get jwt() { return { headers: this.headers }; }
  
  get headers() {

    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' +  this.token);

    return headers;
  }

  public getBaseUrl = () => this.configService.get("APP_API_URI");
  public get = (url : string) : Observable<Response> => this.http.get(this.getBaseUrl() + url, this.jwt).catch(this.unauthorizeHandler.bind(this));
  public post = (url : string, data : any) : Observable<Response> => this.http.post(this.getBaseUrl() + url, data, this.jwt).catch(this.unauthorizeHandler.bind(this));
  public put = (url : string, data : any) : Observable<Response> => this.http.put(this.getBaseUrl() + url, data, this.jwt).catch(this.unauthorizeHandler.bind(this));
  public delete = (url : string) : Observable<Response> => this.http.delete(this.getBaseUrl() + url, this.jwt).catch(this.unauthorizeHandler.bind(this));

  public download = (url : string) : Observable<Response> => this.http.get(this.getBaseUrl() + url, { headers: this.headers, responseType: ResponseContentType.Blob });

  unauthorizeHandler(err: any, caught: Observable<Response>) {
    if (err.status = 401) {
      this.authenticationService.logout();
      return Observable.empty();
    } else {
      throw err;
    }
  }

}