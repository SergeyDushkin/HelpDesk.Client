import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ClientService } from './client.service';
import { Client } from './client';

@Injectable()
export class ClientDetailResolve implements Resolve<Client> {

  constructor(private route: ActivatedRoute, private service : ClientService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getClientById(route.params["client_id"])
      .toPromise()
      .then(data => data);
  }

}
