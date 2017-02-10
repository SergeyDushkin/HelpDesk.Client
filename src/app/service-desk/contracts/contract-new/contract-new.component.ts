import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from '../contract';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-new',
  templateUrl: './contract-new.component.html'
})
export class ContractNewComponent implements OnInit {

  private data : Contract;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: ContractService) { }

  ngOnInit() {
    this.data = new Contract({
      clientId: this.route.snapshot.params["referenceId"],
      referenceId: this.route.snapshot.params["referenceId"],
      resource: this.route.snapshot.params["resource"]
    });
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.create(this.data).toPromise()
      .then(r => 'Contract was created')
      .then(() => this.location.back());
  }

}
