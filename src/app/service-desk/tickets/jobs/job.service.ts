import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Job } from './job';
import { BaseApiService } from '../../../services/base-api.service';

@Injectable()
export class JobService {

  constructor(private apiService : BaseApiService) { 
  }

  get(ticketId : string) : Observable<Job[]> {
    
    return this.apiService.get("tickets/" + ticketId + "/jobs/")
      .map(r => r.json()
      .map(item => this.extractData(item)));
  }

  getById(ticketId : string, id : string) : Observable<Job> {
    
    return this.apiService.get("tickets/" + ticketId + "/jobs/" + id)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  create(ticketId : string, job : Job) : Observable<Job> {
    
    return this.apiService.post("tickets/" + ticketId + "/jobs/", job)
      .map(r => r.json())
      .map(item => this.extractData(item));
  }

  update(ticketId : string, job : Job) : Observable<Response> {
    
    return this.apiService.put("tickets/" + ticketId + "/jobs/" + job.id, job);
  }

  delete(ticketId : string, id : string) : Observable<Response> {
    
    return this.apiService.delete("tickets/" + ticketId + "/jobs/" + id);
  }

  extractData(item : any) : Job {
    return item as Job;
  }

}
