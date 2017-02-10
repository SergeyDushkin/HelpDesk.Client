import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier';

@Injectable()
export class SupplierListResolve implements Resolve<Supplier[]> {

  constructor(private route: ActivatedRoute, private service : SupplierService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.get()
      .toPromise()
      .then(data => data);
  }

}
