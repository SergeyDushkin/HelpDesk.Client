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
    this.service.delete(this.data.id).subscribe(
      (response) => this.router.navigate(['/contracts']),
      (err) => console.log("ContractService delete: error " + err),
      () => console.log("ContractService delete done"));
  }

  onUpdate() {
    this.service.update(this.data).subscribe(
      (response) => this.router.navigate(['/contracts']),
      (err) => console.log("ContractService update: error " + err),
      () => console.log("ContractService update done"));
  }

}
