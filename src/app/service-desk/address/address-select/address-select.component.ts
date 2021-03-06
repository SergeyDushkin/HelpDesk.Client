import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from '../address';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-select',
  templateUrl: './address-select.component.html'
})
export class AddressSelectComponent implements OnChanges, OnInit {

  private _client : string;

  @Output() addressChange = new EventEmitter();
  @Input('disabled') _disabled : boolean = false;
  @Input('address') _address : Address;
  @Input('source') _source : Address[];

  get data() {
    return this._source;
  }

  get disabled() : boolean {
    return this._disabled;
  }

  @Input('client')
  get client() {
    return this._client;
  }

  set client(val) {

    if (!val) {
      this._source = new Array<Address>();
      return;
    }

    this._client = val;
    this.addressService.get(val).toPromise()
      .then(r => this._source = r)
      .then(r => r[0])
      .then(r => this.address = r);
  }

  get address() {
    return this._address;
  }

  set address(val) {
    this._address = val;
    this.addressChange.emit(this._address);
  }

  onChange(value){
    //let idx = this._source.findIndex(r => r.id == value);
    //let val = this._source[idx];
    //this.address = val;
  }

  constructor(private route: ActivatedRoute, private addressService: AddressService) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
  }
  
  trackById(index, item) {
    return item.id;
  }

}
