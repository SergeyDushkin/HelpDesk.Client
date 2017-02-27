import { Injectable } from '@angular/core';

declare var APP_SETTINGS;

@Injectable()
export class ConfigService {

  private _config;

  constructor() { 
    console.log('Init ConfigService');

    this._config = APP_SETTINGS;
  }
  
  public get(key : string) : any {
    return this._config[key];
  }
}
