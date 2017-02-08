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
    this.data = new Contract();
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.create(this.data).subscribe(
      (response) => this.router.navigate(['/contracts']),
      (err) => console.log("ContractService create: error " + err),
      () => console.log("ContractService create done"));
  }

}
