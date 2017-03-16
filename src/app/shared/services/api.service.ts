import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  public getBaseUrl = () => "api/v1/";
  public get = (url : string) : Observable<Response> => this.http.get(this.getBaseUrl() + url);
  public post = (url : string, data : any) : Observable<Response> => this.http.post(this.getBaseUrl() + url, data);
  public put = (url : string, data : any) : Observable<Response> => this.http.put(this.getBaseUrl() + url, data);
  public delete = (url : string) : Observable<Response> => this.http.delete(this.getBaseUrl() + url); 
}
