import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from '../supplier';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html'
})
export class SupplierListComponent implements OnInit {

  private suppliers : Supplier[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.suppliers = this.route.snapshot.data['suppliers'];
  }
  
  trackById(index, item) {
    return item.id;
  }

}
