import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contract } from '../contract';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-select',
  templateUrl: './contract-select.component.html'
})
export class ContractSelectComponent implements OnChanges, OnInit {

 
  private _client : string;

  @Output() contractChange = new EventEmitter();
  @Input('disabled') _disabled : boolean = false;
  @Input('contract') _contract : Contract;
  @Input('source') _source : Contract[];

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
      this._source = new Array<Contract>();
      return;
    }
    
    this._client = val;
    this.contractService.get(val).toPromise()
      .then(r => this._source = r);
  }

  get contract() {
    return this._contract;
  }

  set contract(val) {
    this._contract = val;
    this.contractChange.emit(this._contract);
  }

  onChange(value){
    //let idx = this._source.findIndex(r => r.id == value);
    //let val = this._source[idx];
    //this.contract = val;
  }

  constructor(private route: ActivatedRoute, private contractService: ContractService) { }

  ngOnInit() {

 
  }

  ngOnChanges(changes) {
  }
  
  trackById(index, item) {
    return item.id;
  }

}
