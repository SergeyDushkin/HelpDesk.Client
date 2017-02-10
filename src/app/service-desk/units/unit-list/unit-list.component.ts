import { Component, OnInit, Output, OnChanges, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unit } from '../unit';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html'
})
export class UnitListComponent implements OnInit {

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

  private unit : Unit[];

  constructor(private route: ActivatedRoute, private service: UnitService) { }

  ngOnInit() {
    this.unit = this.route.snapshot.data['unit'];

    if (this.unit)
      this.count = this.unit.length;


    if (!this.unit) 
      this.service.get(this.referenceId).toPromise().then(r => this.unit = r).then(r => this.count = r.length);
  }

}
