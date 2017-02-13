import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from '../supplier';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-select',
  templateUrl: './supplier-select.component.html'
})
export class SupplierSelectComponent implements OnInit {

  private _value: string;
  private _source: any[] = new Array<any>();
  private _disabled: boolean = false;

  @Output() statusChange = new EventEmitter();
  
  @Input('disabled') 
  set disabled(val: boolean) {
    this._disabled = val;
  }
  get disabled() {
    return this._disabled;
  }

  @Input('value') 
  set value(val: string) {
    this._value = val;
    this.statusChange.emit(val);
  }
  get value() {
    return this._value;
  }

  @Input('source')
  set source(val: any[]) {
    this._source = val;
  }
  get source() {
    return this._source;
  }

  constructor(private route: ActivatedRoute, private service: SupplierService) { }

  ngOnInit() {
    this.source = this.route.snapshot.data['suppliers'];
    
    if (!this.source)
      this.service.get().toPromise().then(r => this.source = r); 
  }
  
  trackById(index, item) {
    return item.id;
  }

}
