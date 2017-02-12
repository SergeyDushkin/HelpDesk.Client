import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Status } from '../status';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-ticket-status-select',
  templateUrl: './status-select.component.html'
})
export class StatusSelectComponent implements OnChanges, OnInit {

  @Output() statusChange = new EventEmitter();
  @Input('disabled') _disabled : boolean;
  @Input('status') _status : Status;
  @Input('source') _source : Status[];

  get data() {

    if (!this._source) {
      return new Array<Status>(this._status);
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

  get status() {
    return this._status;
  }

  set status(val) {
    this._status = val;
    this.statusChange.emit(this._status);
  }

  onChange(value){
  }

  constructor(private route: ActivatedRoute, private service: StatusService) { }

  ngOnInit() {
    this._source = this.route.snapshot.data['ticket-status'];
    
    if (!this._source)
      this.service.get().toPromise().then(r => this._source = r);
  }

  ngOnChanges(changes) {
  }
  
  trackById(index, item) {
    return item.id;
  }

}


