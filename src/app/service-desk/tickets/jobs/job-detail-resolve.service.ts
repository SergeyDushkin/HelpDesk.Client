import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { JobService } from './job.service';
import { Job } from './job';

@Injectable()
export class JobDetailResolve implements Resolve<Job> {

  private data : any;

  constructor(private route: ActivatedRoute, private service : JobService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getById(route.params[route.data["parent"]], route.params["id"])
      .toPromise()
      .then(data => data);
  }

}
