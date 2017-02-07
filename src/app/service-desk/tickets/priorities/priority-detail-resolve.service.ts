import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { PriorityService } from './priority.service';
import { Priority } from './priority';

@Injectable()
export class PriorityDetailResolve implements Resolve<Priority> {

  constructor(private route: ActivatedRoute, private service : PriorityService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getById(route.params["ticket_priority_id"])
      .toPromise()
      .then(data => data);
  }

}
