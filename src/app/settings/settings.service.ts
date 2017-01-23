
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { SmtpSettings } from './smtp.settings';
import { BaseApiService } from '../services/base-api.service';


@Injectable()
export class SettingsService {

  constructor(private apiService : BaseApiService) { 
  }

  getSmtpSettingValue(id : string) : Observable<SmtpSettings> {
    
    return this.apiService.get("/api/settings/?id=" + id)
      .map(r => r.json().Data)
      .map(item => this.extractData(item));
  }

/*
  getArchivedTickets() : Observable<Ticket[]> {
    
    return this.requestService
      .get("api/tickets/archived/?$orderby=RequestDate desc")
      .map(r => r.json().Data.map(item => this.extractData(item)));
  }

  getTickets() : Observable<Ticket[]> {
    
    return this.requestService
      .get("api/tickets/?$orderby=RequestDate desc")
      .map(r => r.json().Data.map(item => this.extractData(item)));
  }

  createTicket(ticket : any) : Observable<Ticket> {
    
    return this.requestService.post("api/tickets/", ticket)
      .map(r => r.json().Data)
      .map(item => this.extractData(item));
  }

*/

  extractData(item : any) : SmtpSettings{
    return new SmtpSettings({ 
        server: item.server, 
        port: item.port
      });
  }



}
