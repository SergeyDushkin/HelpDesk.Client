import { Component, OnInit, Output, OnChanges, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from '../address';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html'
})
export class AddressListComponent implements OnInit {

  @Output() countChange = new EventEmitter();
  @Input('count') _count : number = 0;
  @Input('referenceId') referenceId : string = undefined;
  
  get count() {
    return this._count;
  }

  set count(val) {
    this._count = val;
    this.countChange.emit(this._count);
  }

  private address : Address[];

  constructor(private route: ActivatedRoute, private service: AddressService) { }

  ngOnInit() {
    this.address = this.route.snapshot.data['address'];

    if (this.address)
      this.count = this.address.length;

    if (!this.address) 
      this.service.get(this.referenceId).toPromise().then(r => this.address = r).then(r => this.count = r.length);
  }
  
  trackById(index, item) {
    return item.id;
  }

}
