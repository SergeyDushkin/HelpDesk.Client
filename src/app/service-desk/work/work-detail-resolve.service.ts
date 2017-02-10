import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { WorkService } from './work.service';
import { Work } from './work';

@Injectable()
export class WorkDetailResolve implements Resolve<Work> {

  constructor(private route: ActivatedRoute, private service : WorkService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getById(route.params["id"])
      .toPromise()
      .then(data => data);
  }

}
