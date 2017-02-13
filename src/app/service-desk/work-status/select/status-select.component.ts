import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Status } from '../status';
import { WorkStatusService } from '../status.service';

@Component({
  selector: 'app-work-status-select',
  templateUrl: './status-select.component.html'
})
export class WorkStatusSelectComponent implements OnChanges, OnInit {

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

  constructor(private route: ActivatedRoute, private service: WorkStatusService) { }

  ngOnInit() {
    this.source = this.route.snapshot.data['work-status'];
    
    if (!this.source)
      this.service.get().toPromise().then(r => this.source = r); 
  }

  ngOnChanges(changes) {
  }
  
  trackById(index, item) {
    return item.id;
  }

  getInfoDisabled () : boolean {
    return false;
  }
}

/*

@Component({
  selector: 'app-work-status-select',
  templateUrl: './status-select.component.html'
})
export class WorkStatusSelectComponent implements OnChanges, OnInit {

  private _status: Status;
  private _source: Status[] = new Array<Status>();
  private _disabled: boolean = false;

  @Output() statusChange = new EventEmitter();
  
  @Input('disabled') 
  set disabled(val: boolean) {
    this._disabled = val;
  }
  get disabled() {
    return this._disabled;
  }

  @Input('status') 
  set status(val: Status) {
    this._status = val;
    this.statusChange.emit(val);
  }
  get status() {
    return this._status;
  }

  @Input('source')
  set source(val: Status[]) {
    this._source = val;
  }
  get source() {
    return this._source;
  }

  constructor(private route: ActivatedRoute, private service: WorkStatusService) { }

  ngOnInit() {
    this.source = this.route.snapshot.data['work-status'];
    
    if (!this.source)
      this.service.get().toPromise().then(r => this.source = r); 
  }

  ngOnChanges(changes) {
  }
  
  trackById(index, item) {
    return item.id;
  }

  getInfoDisabled () : boolean {
    return false;
  }
}
*/