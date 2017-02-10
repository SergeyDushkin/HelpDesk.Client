import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { WorkService } from './work.service';
import { Work } from './work';

@Injectable()
export class WorkListResolve implements Resolve<Work[]> {

  constructor(private route: ActivatedRoute, private service : WorkService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.get(route.params["referenceId"])
      .toPromise()
      .then(data => data);
  }

}
