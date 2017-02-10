import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from '../supplier';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html'
})
export class SupplierDetailComponent implements OnInit {

  private supplier : Supplier;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: SupplierService) { }

  ngOnInit() {
    this.supplier = this.route.snapshot.data['supplier'];
  }

  onClickBack() {
    this.location.back();
  }

  onDelete() {
    this.service.delete(this.supplier.id).subscribe(
      (response) => this.router.navigate(['/suppliers']),
      (err) => console.log("SupplierService delete: error " + err),
      () => console.log("SupplierService delete done"));
  }

  onUpdate() {
    this.service.update(this.supplier).subscribe(
      (response) => this.router.navigate(['/suppliers']),
      (err) => console.log("SupplierService update: error " + err),
      () => console.log("SupplierService update done"));
  }

}
