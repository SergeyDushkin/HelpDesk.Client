import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent implements OnInit {

  private company : Company;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: CompanyService) { }

  ngOnInit() {
    this.company = this.route.snapshot.data['company'];
  }

  onClickBack() {
    this.location.back();
  }

  onDelete() {
    this.service.delete(this.company.id).subscribe(
      (response) => this.router.navigate(['/companys']),
      (err) => console.log("CompanyService delete: error " + err),
      () => console.log("CompanyService delete done"));
  }

  onUpdate() {
    this.service.update(this.company).subscribe(
      (response) => this.router.navigate(['/companys']),
      (err) => console.log("CompanyService update: error " + err),
      () => console.log("CompanyService update done"));
  }

}
