import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from '../supplier';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-new',
  templateUrl: './supplier-new.component.html'
})
export class SupplierNewComponent implements OnInit {

  private supplier : Supplier;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: SupplierService) { }

  ngOnInit() {
    this.supplier = new Supplier();
  }

  onClickBack() {
    //this.location.back();
    this.router.navigate(['/suppliers']);
  }
  

  onUpdate() {
    this.service.create(this.supplier).subscribe(
      (response) => this.router.navigate(['/suppliers']),
      (err) => console.log("SupplierService create: error " + err),
      () => console.log("SupplierService create done"));
  }

}
