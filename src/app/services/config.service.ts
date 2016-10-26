import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ConfigService {

  private _config;

  constructor(private http: Http) { 
  }
  
  public get(key : string) {
    return this.http.get('./config.json').map(data => data.json()[key]);
  }
}
