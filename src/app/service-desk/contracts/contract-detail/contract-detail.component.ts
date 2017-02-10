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

  set contractDate(e: any) {
    e = e.split('-');
    let d = new Date(Date.UTC(e[0], e[1]-1, e[2]));
    this.data.date.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }

  get contractDate() {
    return this.data.date.toISOString().substring(0, 10);
  }

  set contractStartDate(e: any) {
    e = e.split('-');
    let d = new Date(Date.UTC(e[0], e[1]-1, e[2]));
    this.data.startDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }

  get contractStartDate() {
    return this.data.startDate.toISOString().substring(0, 10);
  }

  set contractEndDate(e: any) {
    e = e.split('-');
    let d = new Date(Date.UTC(e[0], e[1]-1, e[2]));
    this.data.endDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }

  get contractEndDate() {
    return this.data.endDate.toISOString().substring(0, 10);
  }

}
