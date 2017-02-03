import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ContractService } from './contract.service';
import { Contract } from './contract';

@Injectable()
export class ContractDetailResolve implements Resolve<Contract> {

  constructor(private route: ActivatedRoute, private service : ContractService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getById(route.params["work_contract_id"])
      .toPromise()
      .then(data => data);
  }

}
