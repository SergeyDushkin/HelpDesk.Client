import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { JobService } from './job.service';
import { Job } from './job';

@Injectable()
export class JobDetailResolve implements Resolve<Job> {

  constructor(private route: ActivatedRoute, private service : JobService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getById(route.params["ticket_id"], route.params["id"])
      .toPromise()
      .then(data => data);
  }

}
