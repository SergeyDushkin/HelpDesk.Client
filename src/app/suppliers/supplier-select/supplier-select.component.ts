import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from '../supplier';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-select',
  templateUrl: './supplier-select.component.html'
})
export class SupplierSelectComponent implements OnChanges, OnInit {

  @Output() supplierChange = new EventEmitter();
  @Input('disabled') _disabled : boolean = false;
  @Input('supplier') _supplier : Supplier;
  @Input('source') _source : Supplier[];

  get data() {
    return this._source;
  }

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

  constructor(private route: ActivatedRoute, private supplierService: SupplierService) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
  }

}
