import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { CompanyService } from './company.service';
import { Company } from './company';

@Injectable()
export class CompanyDetailResolve implements Resolve<Company> {

  constructor(private route: ActivatedRoute, private service : CompanyService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getById(route.params["id"])
      .toPromise()
      .then(data => data);
  }

}
