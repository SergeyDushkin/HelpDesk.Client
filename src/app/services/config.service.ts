import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

declare var APP_SETTINGS;

@Injectable()
export class ConfigService {

  private _config;

  constructor(private http: Http) { 
    console.log('Init ConfigService');

    this._config = APP_SETTINGS;
  }

  /*
  public load() : Promise<void> {
    
    return this.http.get('./config.json')
        .map(res => res.json())
        .toPromise()
        .then(config => this._config = config)
        .catch(err => console.log(err));
  }*/
  
  public get(key : string) : any {
    return this._config[key];
  }
}
