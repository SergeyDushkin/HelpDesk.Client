
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Headers, Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { SmtpSettings } from './smtp.settings';
import { BaseApiService } from '../services/base-api.service';


@Injectable()
export class SettingsService {
  
  //private resource_url : string;
  //private resource = (id = "") : string => this.resource_url + id || "";

  constructor(private apiService : BaseApiService) { 

  }

  getSmtpSetting() : Observable<SmtpSettings> {
    
    return this.apiService.get("settings/smtp")
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  putSmtpSetting = (smtpSettings : SmtpSettings) : Observable<Response> =>
    this.apiService.put("settings/smtp", smtpSettings);
   
  extractData(item : any) : SmtpSettings{
    return new SmtpSettings({ 
        server: item.server, 
        port: item.port
      });
  }



}
