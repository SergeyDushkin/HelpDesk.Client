import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unit } from '../unit';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-unit-select',
  templateUrl: './unit-select.component.html'
})
export class UnitSelectComponent implements OnChanges, OnInit {

  private _client : string;

  @Output() unitChange = new EventEmitter();
  @Input('disabled') _disabled : boolean = false;
  @Input('unit') _unit : Unit;
  @Input('source') _source : Unit[];

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
      this._source = new Array<Unit>();
      return;
    }

    this._client = val;
    this.unitService.get(val).toPromise()
      .then(r => this._source = r)
      .then(r => r[0])
      .then(r => this.unit = r);
  }

  get unit() {
    return this._unit;
  }

  set unit(val) {
    this._unit = val;
    this.unitChange.emit(this._unit);
  }

  onChange(value){
    //let idx = this._source.findIndex(r => r.id == value);
    //let val = this._source[idx];
    //this.unit = val;
  }

  constructor(private route: ActivatedRoute, private unitService: UnitService) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
  }
  
  trackById(index, item) {
    return item.id;
  }

}
