import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Store } from './store';
import { RequestService } from '../services/request.service';

@Injectable()
export class StoreService {

  private stores : Store[];

  constructor(private http: Http, private requestService : RequestService) { 
    //this.stores = [
    //  new Store({ id: '1', name : 'Store 1'}),
    //  new Store({ id: '2', name : 'Store 2'})
    //];
  }

  getStores() : Observable<Store[]> {
    
    if (this.stores){
      return Observable.of(this.stores);
    }

    var url = "api/store/?$filter=IS_DISABLE eq false&$select=GUID_RECORD,LOCATION_NAME&$expand=CONTACT&$orderby=LOCATION_NAME";

    return this.requestService.get(url)
      .map(r => r.json()
        .Data
        .map(item => new Store({ 
          id: item.GUID_RECORD, 
          name: item.LOCATION_NAME , 
          address: item.CONTACT.ADDRESS })
          ));
  }

}
