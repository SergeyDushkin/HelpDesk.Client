import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Priority } from '../priority';
import { PriorityService } from '../priority.service';

@Component({
  selector: 'app-ticket-priority-select',
  templateUrl: './priority-select.component.html'
})
export class PrioritySelectComponent implements OnChanges, OnInit {

  @Output() priorityChange = new EventEmitter();
  @Input('disabled') _disabled : boolean;
  @Input('priority') _priority : Priority;
  @Input('source') _source : Priority[];

  get data() {

    if (!this._source) {
      return new Array<Priority>(this._priority);
    }

    return this._source;
  }

  getInfoDisabled () : boolean {
    return false;
  }

  get disabled() : boolean {

    if (!this._disabled) {
      return false;
    }

    return this._disabled;
  }

  get priority() {
    return this._priority;
  }

  set priority(val) {
    this._priority = val;
    this.priorityChange.emit(this._priority);
  }

  onChange(value){
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this._source = this.route.snapshot.data['ticket-priority'];
    this.priority = this._source[0];

  }

  ngOnChanges(changes) {
  }

}


