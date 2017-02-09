import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from '../supplier';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-select',
  templateUrl: './supplier-select.component.html'
})
export class SupplierSelectComponent implements OnChanges, OnInit {

  private data : Supplier[];

  @Output() supplierChange = new EventEmitter();
  @Input('disabled') _disabled : boolean = false;
  @Input('supplier') _supplier : Supplier;

  get disabled() : boolean {
    return this._disabled;
  }

  get supplier() {
    return this._supplier;
  }

  set supplier(val) {
    this._supplier = val;
    this.supplierChange.emit(this._supplier);
  }

  onChange(value){
  }

  constructor(private route: ActivatedRoute, private service: SupplierService) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['suppliers'];
    
    if (!this.data)
      this.service.get().toPromise().then(r => this.data = r); 
  }

  ngOnChanges(changes) {
  }

}
