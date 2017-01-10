import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Status, StatusEvent } from './status';
import { BaseApiService } from '../services/base-api.service';

@Injectable()
export class StatusService {

  private $referenceId : string;
  private $baseUri : string;

  constructor(private apiService : BaseApiService) { 
  }

  init(referenceId : string, baseUri : string) {
    this.$referenceId = referenceId;
    this.$baseUri = baseUri;
  }

  getCurrent() : Observable<StatusEvent> {

    return this.apiService.get(this.$baseUri)
      .map(r => r.json())
      .map(item => item as StatusEvent);
  }

  getNext() : Observable<Status[]> {
    
    return this.apiService.get(this.$baseUri + `/next`)
      .map(r => r.json()
      .map(item => item as Status));
  }

  setNext(referenceId : string, statusId : string) : Observable<Response> {

    return this.apiService.post(this.$baseUri, { ReferenceId : referenceId, StatusId : statusId });
  }

}
