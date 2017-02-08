import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { StatusService } from './status.service';
import { Status } from './status';

@Injectable()
export class StatusListResolve implements Resolve<Status[]> {

  constructor(private route: ActivatedRoute, private service : StatusService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.get()
      .toPromise()
      .then(data => data);
  }

}
