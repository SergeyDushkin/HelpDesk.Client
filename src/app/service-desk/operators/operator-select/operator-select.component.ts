import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Operator } from '../operator';
import { OperatorService } from '../operator.service';

@Component({
  selector: 'app-operator-select',
  templateUrl: './operator-select.component.html'
})
export class OperatorSelectComponent implements OnChanges, OnInit {

  @Output() operatorChange = new EventEmitter();
  @Input('disabled') _disabled : boolean = false;
  @Input('operator') _operator : Operator;
  @Input('source') _source : Operator[];

  get data() {
    return this._source;
  }

  get disabled() : boolean {
    return this._disabled;
  }

  get operator() {
    return this._operator;
  }

  set operator(val) {
    this._operator = val;
    this.operatorChange.emit(this._operator);
  }

  onChange(value){
  }

  constructor(private route: ActivatedRoute, private operatorService: OperatorService) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
  }

}
