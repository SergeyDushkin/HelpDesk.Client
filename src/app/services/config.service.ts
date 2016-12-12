import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ConfigService {

  private _config;

  constructor(private http: Http) { 
    console.log('Init ConfigService');
  }

  public load() : Promise<void> {
    
    return this.http.get('./config.json')
        .map(res => res.json())
        .toPromise()
        .then(config => this._config = config)
        .catch(err => console.log(err));

        /*
    return new Promise((resolve, reject) => {
      this.http.get('./config.json')
        .map(res => res.json())
        .subscribe(
          (data:any) => {
            this._config = data;
            resolve(true);
          },
          err=>console.log(err)
        );
    });*/
  }
  
  public get(key : string) : any {
    return this._config[key];
  }
}
