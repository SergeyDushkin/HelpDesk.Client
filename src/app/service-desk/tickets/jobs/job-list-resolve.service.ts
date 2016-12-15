import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { JobService } from './job.service';
import { Job } from './job';

@Injectable()
export class JobListResolve implements Resolve<Job[]> {

  constructor(private route: ActivatedRoute, private service : JobService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.get(route.params["ticket_id"])
      .toPromise()
      .then(data => data);
  }

}
