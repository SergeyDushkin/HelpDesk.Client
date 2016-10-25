import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Store } from './Store';

@Injectable()
export class StoreService {

  constructor(private http: Http) { 

  }

  getStores() : Observable<Store[]> {
    
    var url = "/helpdesk-rzn/api/store/";

    var token = localStorage.getItem('token');
    var headers = new Headers();

    headers.append('Authorization', 'Bearer ' +  token);

    return this.http.get(url, { headers: headers })
      .map(r => r.json()
        .Data
        .map(item => new Store({ 
          id: item.GUID_RECORD, 
          name: item.LOCATION_NAME })
          ));
  }

}
