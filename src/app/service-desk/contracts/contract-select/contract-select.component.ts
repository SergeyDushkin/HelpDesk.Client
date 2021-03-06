import { Component, OnInit,  Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contract } from '../contract';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-select',
  templateUrl: './contract-select.component.html'
})
export class ContractSelectComponent implements  OnInit {

  private _value: string;
  private _reference: string;
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

  @Input('reference')
    set reference(val: string) {
    this._reference = val;
    
    this.service.get(this._reference).toPromise()
      .then(r => this.source = r)
  }
  get reference() {
    return this._reference;
  }


  constructor(private route: ActivatedRoute, private service: ContractService) { }

  ngOnInit() {
   
  }

  trackById(index, item) {
    return item.id;
  }

}

