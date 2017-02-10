import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from '../contract';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html'
})
export class ContractDetailComponent implements OnInit {

  private data : Contract;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: ContractService) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['contract'];
  }

  onClickBack() {
    this.location.back();
  }

  onDelete() {
    this.service.delete(this.data.id).toPromise()
      .then(r => 'Contract was deleted')
      .then(() => this.location.back());
  }

  onUpdate() {
    this.service.update(this.data).toPromise()
      .then(r => 'Contract was updated')
      .then(() => this.location.back());
  }

}
